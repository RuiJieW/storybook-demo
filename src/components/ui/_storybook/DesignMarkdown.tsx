import { marked } from "marked"

type DesignMarkdownProps = {
  source: string
}

function splitDesignDoc(source: string): {
  frontmatter: string | null
  body: string
} {
  if (!source.startsWith("---")) {
    return { frontmatter: null, body: source }
  }

  const end = source.indexOf("\n---", 3)
  if (end === -1) {
    return { frontmatter: null, body: source }
  }

  return {
    frontmatter: source.slice(3, end).trim(),
    body: source.slice(end + 4).trimStart(),
  }
}

export function DesignMarkdown({ source }: DesignMarkdownProps) {
  const { frontmatter, body } = splitDesignDoc(source)
  const html = String(marked.parse(body, { async: false }))

  return (
    <article className="sb-design-doc mx-auto max-w-3xl px-6 py-8 text-foreground">
      {frontmatter ? (
        <details className="mb-8 rounded-lg border border-border bg-muted/30">
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
            Machine-readable spec (YAML frontmatter)
          </summary>
          <pre className="max-h-80 overflow-auto border-t border-border p-4 font-mono text-xs leading-relaxed text-muted-foreground">
            {frontmatter}
          </pre>
        </details>
      ) : null}
      <div
        className="sb-design-doc-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  )
}
