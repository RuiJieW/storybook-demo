# Journey Atlas data

## Versioning model

- `versions/mandate-lifecycle-v05.2026-05.json` is the frozen snapshot for the May 2026 synthesis cycle.
- Do not mutate this file for subsequent cycles.
- For the next version, copy the file to a new versioned name (for example `mandate-lifecycle-v06.2026-06.json`) and update `meta.version`, `meta.synthesisAsOf`, and `meta.frozenAt`.

## Schema contract

- Canonical schema: `schema/journey-atlas.schema.json`
- Top-level shape:
  - `meta`
  - `stages` (six mandate lifecycle phases)
  - `handoffs` (seven columns; each maps to one lifecycle stage via `lifecycleStageId`)
  - `lanes` (eight disclosure lanes)
  - `items` (multi-handoff mappings via `handoffIds[]`)
  - `kpis` (one qualitative + one quantitative signal per handoff)

## Lifecycle stage → column mapping (V05)

Columns are still the **seven handoffs**. Each column header shows **stage + handoff**. Left-to-right follows mandate lifecycle order.

| Stage | Column (handoff) |
|-------|------------------|
| 01 Discover / Align | Sales → Implementation |
| 02 Design & Prototype | Design → AI/Data |
| 03 Build & Integrate | Design → Dev |
| 03 Build & Integrate | AI/Data Science → Dev |
| 04 Validate & Ship | Dev → Infra/DevOps |
| 05 Operate & Learn | AI Skill → Teammate |
| 06 Evolve & Extend | Project → EOP / Retro / Upsell |

Build has two handoff columns because synthesis treats Design→Dev and AI→Dev as distinct alignment surfaces in the same phase.

## Notion mapping

This repo includes a sync stub script:

- `npm run journey:notion:push`
- `npm run journey:notion:pull`

Required environment variables:

- `NOTION_API_KEY`
- `NOTION_JOURNEY_ATLAS_DATABASE_ID`

Recommended Notion database properties:

- `Title` (title)
- `Item ID` (rich text, unique key used for future upsert logic)
- `Lane` (select)
- `Handoff` (multi-select)
- `Tag` (rich text)
- `Severity` (select)
- `Impact` (select)
- `Status` (select)
- `Tier` (select)
- `Archetype` (multi-select)
- `Mention count` (number)
- `Version` (select)

## Notion embed workflow

1. Deploy the app and copy the full `/user-journey` URL.
2. Add an Embed block in Notion with that URL.
3. Use Notion DB edits for field-level updates.
4. Pull back to repo JSON (`journey:notion:pull`) before preparing a version bump PR.

## P2 backlog notes

- Add Item ID upsert behavior in `sync-journey-atlas-notion.mjs` to prevent duplicate rows.
- Add bidirectional conflict strategy (Notion-wins vs git-wins by field).
- Add per-mandate atlas generation template from retros.
- Replace stub flow routes with React Flow detail pages.
- Replace static KPI values with connected metrics from analytics and delivery systems.
