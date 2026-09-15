#!/usr/bin/env node
/* Pre-deploy content check — npm-free (Node only, no dependencies).
   Loads the prototype content and the shared schema, and fails with a non-zero
   exit code if window.COURSE violates the schema. Run: node scripts/validate-course.js */
"use strict";

const path = require("path");

global.window = {};
require(path.join(__dirname, "..", "prototype", "assets", "js", "course.js"));
const { validateCourse } = require(path.join(__dirname, "..", "prototype", "assets", "js", "schema.js"));

const result = validateCourse(window.COURSE);

if (!result.ok) {
  console.error(`Content validation FAILED — ${result.errors.length} error(s):`);
  result.errors.forEach((e, i) => console.error(`  ${i + 1}. ${e}`));
  process.exit(1);
}

console.log(
  `Content valid — ${result.units} units across ${window.COURSE.modules.length} modules, ` +
  `${result.resources} resources.`
);
