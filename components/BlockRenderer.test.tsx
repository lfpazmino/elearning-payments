import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlockRenderer } from "./BlockRenderer";
import type { Block } from "@/content";

describe("BlockRenderer", () => {
  it("renders a heading block", () => {
    const blocks: Block[] = [{ t: "h", v: "A heading" }];
    render(<BlockRenderer blocks={blocks} />);
    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe("A heading");
  });

  it("renders a paragraph with inline HTML", () => {
    const blocks: Block[] = [{ t: "p", v: "Text with <em>emphasis</em>" }];
    const { container } = render(<BlockRenderer blocks={blocks} />);
    expect(container.querySelector("p em")?.textContent).toBe("emphasis");
  });

  it("renders a callout with title and body", () => {
    const blocks: Block[] = [{ t: "callout", title: "Note", v: "Body" }];
    const { container } = render(<BlockRenderer blocks={blocks} />);
    expect(container.querySelector(".callout .ct")?.textContent).toBe("Note");
    expect(container.querySelector(".callout p")?.textContent).toBe("Body");
  });

  it("renders a table with headers and rows", () => {
    const blocks: Block[] = [{ t: "table", head: ["", "Col"], rows: [["Row", "Cell"]] }];
    const { container } = render(<BlockRenderer blocks={blocks} />);
    const ths = container.querySelectorAll("th");
    expect(ths.length).toBe(2);
    expect(ths[1].textContent).toBe("Col");
    expect(container.querySelector("td")?.textContent).toBe("Row");
  });

  it("renders statistic tiles", () => {
    const blocks: Block[] = [{ t: "stats", v: [{ n: "500", c: "caption", s: "sub" }] }];
    const { container } = render(<BlockRenderer blocks={blocks} />);
    expect(container.querySelector(".stat b")?.textContent).toBe("500");
    expect(container.querySelector(".stat .c")?.textContent).toBe("caption");
  });

  it("renders an ordered list", () => {
    const blocks: Block[] = [{ t: "ol", v: ["one", "two"] }];
    const { container } = render(<BlockRenderer blocks={blocks} />);
    expect(container.querySelectorAll("ol li").length).toBe(2);
  });
});
