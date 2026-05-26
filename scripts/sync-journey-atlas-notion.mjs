#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const mode = process.argv[2]
const root = process.cwd()
const dataPath = path.join(
  root,
  "src/data/journey-atlas/versions/mandate-lifecycle-v05.2026-05.json"
)
const exportPath = path.join(
  root,
  "src/data/journey-atlas/versions/mandate-lifecycle-v05.2026-05.notion-export.json"
)

const notionApiKey = process.env.NOTION_API_KEY
const notionDatabaseId = process.env.NOTION_JOURNEY_ATLAS_DATABASE_ID
const notionVersion = "2022-06-28"

function assertEnv() {
  if (!notionApiKey || !notionDatabaseId) {
    throw new Error(
      "Missing NOTION_API_KEY or NOTION_JOURNEY_ATLAS_DATABASE_ID environment variables."
    )
  }
}

async function notionRequest(endpoint, options = {}) {
  const response = await fetch(`https://api.notion.com/v1${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${notionApiKey}`,
      "Notion-Version": notionVersion,
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`Notion API error (${response.status}): ${message}`)
  }

  return response.json()
}

function titleProperty(value) {
  return {
    title: [
      {
        text: {
          content: value,
        },
      },
    ],
  }
}

function richTextProperty(value) {
  return {
    rich_text: [
      {
        text: {
          content: value,
        },
      },
    ],
  }
}

function numberProperty(value) {
  return { number: value }
}

function selectProperty(value) {
  if (!value) {
    return { select: null }
  }

  return { select: { name: value } }
}

function multiSelectProperty(values) {
  return {
    multi_select: values.map((value) => ({ name: value })),
  }
}

async function pushJsonToNotion() {
  assertEnv()
  const raw = await readFile(dataPath, "utf8")
  const atlas = JSON.parse(raw)

  for (const item of atlas.items) {
    const payload = {
      parent: { database_id: notionDatabaseId },
      properties: {
        Title: titleProperty(item.text),
        "Item ID": richTextProperty(item.id),
        Lane: selectProperty(item.laneId),
        Handoff: multiSelectProperty(item.handoffIds),
        Tag: richTextProperty(item.tag),
        Severity: selectProperty(item.severity ?? null),
        Impact: selectProperty(item.impact ?? null),
        Status: selectProperty(item.status ?? null),
        Tier: selectProperty(item.tier ?? null),
        Archetype: multiSelectProperty(item.archetypes ?? []),
        "Mention count": numberProperty(item.evidence.mentionCount),
        Version: selectProperty(atlas.meta.version),
      },
    }

    // Stub behavior: always creates pages. P2 can add upsert by Item ID.
    await notionRequest("/pages", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  console.log(`Pushed ${atlas.items.length} journey items to Notion database.`)
}

async function pullNotionToJson() {
  assertEnv()

  const payload = {
    page_size: 100,
  }

  const result = await notionRequest(`/databases/${notionDatabaseId}/query`, {
    method: "POST",
    body: JSON.stringify(payload),
  })

  const exportItems = result.results.map((page) => {
    const properties = page.properties ?? {}
    return {
      notionPageId: page.id,
      itemId:
        properties["Item ID"]?.rich_text?.[0]?.plain_text ??
        properties["Item ID"]?.rich_text?.[0]?.text?.content ??
        null,
      title:
        properties.Title?.title?.[0]?.plain_text ??
        properties.Title?.title?.[0]?.text?.content ??
        "",
      lane: properties.Lane?.select?.name ?? null,
      handoff: (properties.Handoff?.multi_select ?? []).map((entry) => entry.name),
      status: properties.Status?.select?.name ?? null,
      tier: properties.Tier?.select?.name ?? null,
      mentionCount: properties["Mention count"]?.number ?? null,
      raw: page,
    }
  })

  await writeFile(exportPath, JSON.stringify(exportItems, null, 2), "utf8")
  console.log(
    `Pulled ${exportItems.length} rows from Notion into ${path.relative(root, exportPath)}`
  )
}

async function main() {
  if (mode !== "push" && mode !== "pull") {
    console.error(
      "Usage: node scripts/sync-journey-atlas-notion.mjs <push|pull>"
    )
    process.exit(1)
  }

  if (mode === "push") {
    await pushJsonToNotion()
    return
  }

  await pullNotionToJson()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
