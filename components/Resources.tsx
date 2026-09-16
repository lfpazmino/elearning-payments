import type { Resource } from "@/content";

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function Resources({ list }: { list: Resource[] }) {
  return (
    <ul className="res">
      {list.map((r, i) => (
        <li key={i}>
          <a className="r" href={r.url} target="_blank" rel="noopener noreferrer">
            <span className={"tag t-" + slug(r.tag)}>{r.tag}</span>
            <span>
              <span className="r-t" dangerouslySetInnerHTML={{ __html: r.title }} />
              {r.note ? (
                <span className="r-n" dangerouslySetInnerHTML={{ __html: r.note }} />
              ) : null}
            </span>
            <span className="r-x">↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
