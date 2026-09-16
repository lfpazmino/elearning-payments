import type { Block } from "@/content";

// Renders each block type to the same DOM the prototype produced. Content strings
// are developer-authored and validated by the Zod schema, and carry inline HTML
// (<em>, <code>, <a>, <strong>) that the prototype rendered via innerHTML.

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case "h":
      return <h3 dangerouslySetInnerHTML={{ __html: block.v }} />;
    case "p":
      return <p dangerouslySetInnerHTML={{ __html: block.v }} />;
    case "note":
      return <p className="note" dangerouslySetInnerHTML={{ __html: block.v }} />;
    case "ul":
      return (
        <ul>
          {block.v.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.v.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ol>
      );
    case "callout":
      return (
        <div className="callout">
          <span className="ct" dangerouslySetInnerHTML={{ __html: block.title }} />
          <p dangerouslySetInnerHTML={{ __html: block.v }} />
        </div>
      );
    case "table":
      return (
        <div className="tblock">
          <div className="tscroll">
            <table>
              <thead>
                <tr>
                  {block.head.map((h, i) => (
                    <th key={i} dangerouslySetInnerHTML={{ __html: h }} />
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((c, ci) => (
                      <td key={ci} dangerouslySetInnerHTML={{ __html: c }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="tcards">
            {block.rows.map((row, ri) => (
              <div className="tcard" key={ri}>
                <h4 dangerouslySetInnerHTML={{ __html: row[0] }} />
                <dl>
                  {row.slice(1).map((c, ci) => (
                    <div key={ci}>
                      <dt dangerouslySetInnerHTML={{ __html: block.head[ci + 1] }} />
                      <dd dangerouslySetInnerHTML={{ __html: c }} />
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      );
    case "stats":
      return (
        <div className="stats">
          {block.v.map((s, i) => (
            <div key={i} className={"stat" + (s.hi ? " hi" : "")}>
              <b dangerouslySetInnerHTML={{ __html: s.n }} />
              <span className="c" dangerouslySetInnerHTML={{ __html: s.c }} />
              <span className="s" dangerouslySetInnerHTML={{ __html: s.s }} />
            </div>
          ))}
        </div>
      );
    case "qa":
      return (
        <div className="qa">
          {block.v.map((x, i) => (
            <details key={i}>
              <summary dangerouslySetInnerHTML={{ __html: x.q }} />
              <div className="a" dangerouslySetInnerHTML={{ __html: x.a }} />
            </details>
          ))}
        </div>
      );
    case "beats":
      return (
        <div className="beats">
          {block.v.map((x, i) => (
            <div key={i} className="beat">
              <span className="t" dangerouslySetInnerHTML={{ __html: x.t }} />
              <p dangerouslySetInnerHTML={{ __html: x.v }} />
            </div>
          ))}
        </div>
      );
    case "gloss":
      return (
        <dl className="gloss">
          {block.v.map((g, i) => (
            <div key={i}>
              <dt dangerouslySetInnerHTML={{ __html: g.term }} />
              <dd dangerouslySetInnerHTML={{ __html: g.def }} />
            </div>
          ))}
        </dl>
      );
    default:
      return null;
  }
}
