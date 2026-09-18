import { readFileSync } from "node:fs";
import { join } from "node:path";
import { courseSchema } from "../content/schema";

const raw = JSON.parse(readFileSync(join(process.cwd(), "content", "course-claude.json"), "utf8"));
const result = courseSchema.safeParse(raw);

if (!result.success) {
  console.error(`Content validation FAILED — ${result.error.issues.length} issue(s):`);
  for (const issue of result.error.issues) {
    const path = issue.path.length ? issue.path.join(".") : "(root)";
    console.error(`  ${path}: ${issue.message}`);
  }
  process.exit(1);
}

const units = result.data.modules.reduce((n, m) => n + m.units.length, 0);
const resources = result.data.modules.reduce(
  (n, m) => n + m.units.reduce((x, u) => x + u.resources.length, 0),
  0,
);
console.log(
  `Content valid — ${units} units across ${result.data.modules.length} modules, ${resources} resources.`,
);
