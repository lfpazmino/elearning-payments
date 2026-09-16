/* Payments Academy — content schema & validator.
   Single source of truth for the shape of window.COURSE, shared by the browser
   load-time check (validate-load.js) and the npm-free pre-deploy gate
   (scripts/validate-course.js). No build step, no dependencies. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.PaymentsSchema = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var BLOCK_TYPES = ["h", "p", "note", "ul", "ol", "callout", "table", "stats", "qa", "beats", "gloss"];

  function isStr(x) { return typeof x === "string"; }
  function nonEmpty(x) { return isStr(x) && x.trim().length > 0; }
  function isArr(x) { return Array.isArray(x); }
  function isPosNum(x) { return typeof x === "number" && isFinite(x) && x > 0; }

  function validateCourse(course) {
    var errors = [];
    var units = 0, resources = 0;

    function fail(path, msg) { errors.push(path + ": " + msg); }

    if (!course || typeof course !== "object") {
      errors.push("course: not an object");
      return { ok: false, errors: errors, units: 0, resources: 0 };
    }

    if (!course.meta || typeof course.meta !== "object") {
      fail("meta", "missing");
    } else {
      ["title", "tagline", "event", "verified"].forEach(function (k) {
        if (!nonEmpty(course.meta[k])) fail("meta." + k, "missing or empty");
      });
    }

    if (!isArr(course.modules)) {
      fail("modules", "must be an array");
      return { ok: false, errors: errors, units: units, resources: resources };
    }

    course.modules.forEach(function (m, mi) {
      var modLabel = "module " + (m && m.id ? m.id : "#" + mi);
      if (!m || typeof m !== "object") { fail(modLabel, "not an object"); return; }

      ["id", "n", "title", "subtitle"].forEach(function (k) {
        if (!nonEmpty(m[k])) fail(modLabel + "." + k, "missing or empty");
      });

      if (!isArr(m.units) || m.units.length === 0) {
        fail(modLabel + ".units", "must be a non-empty array");
        return;
      }

      m.units.forEach(function (u, ui) {
        var unitLabel = modLabel + " / unit " + (u && u.id ? u.id : "#" + ui);
        if (!u || typeof u !== "object") { fail(unitLabel, "not an object"); return; }

        ["id", "title", "objective"].forEach(function (k) {
          if (!nonEmpty(u[k])) fail(unitLabel + "." + k, "missing or empty");
        });
        if (!isPosNum(u.mins)) fail(unitLabel + ".mins", "must be a positive number");
        if (!isArr(u.blocks)) fail(unitLabel + ".blocks", "must be an array");
        if (!isArr(u.resources)) fail(unitLabel + ".resources", "must be an array");
        if (!isArr(u.check) || u.check.length === 0) fail(unitLabel + ".check", "must be a non-empty array");
        units++;

        (u.blocks || []).forEach(function (b, bi) {
          validateBlock(b, unitLabel + ".blocks[" + bi + "]", fail);
        });
        (u.resources || []).forEach(function (r, ri) {
          validateResource(r, unitLabel + ".resources[" + ri + "]", fail);
          resources++;
        });
        (u.check || []).forEach(function (c, ci) {
          if (!nonEmpty(c)) fail(unitLabel + ".check[" + ci + "]", "empty prompt");
        });
      });
    });

    return { ok: errors.length === 0, errors: errors, units: units, resources: resources };
  }

  function validateBlock(b, path, fail) {
    if (!b || typeof b !== "object") { fail(path, "not an object"); return; }
    if (BLOCK_TYPES.indexOf(b.t) < 0) {
      fail(path + ".t", "unknown block type " + JSON.stringify(b.t));
      return;
    }

    switch (b.t) {
      case "h":
      case "p":
      case "note":
        if (!nonEmpty(b.v)) fail(path + ".v", "missing or empty");
        break;
      case "ul":
      case "ol":
        if (!isArr(b.v)) fail(path + ".v", "must be an array");
        else b.v.forEach(function (item, ii) {
          if (!nonEmpty(item)) fail(path + ".v[" + ii + "]", "empty item");
        });
        break;
      case "callout":
        if (!nonEmpty(b.title)) fail(path + ".title", "missing or empty");
        if (!nonEmpty(b.v)) fail(path + ".v", "missing or empty");
        break;
      case "table":
        if (!isArr(b.head) || b.head.length === 0) fail(path + ".head", "must be a non-empty array");
        // head[0] is the matrix corner: empty is the deliberate convention for
        // two-axis tables (row labels down the left, column labels across the top).
        else b.head.forEach(function (h, hi) {
          if (hi > 0 && !nonEmpty(h)) fail(path + ".head[" + hi + "]", "empty header");
        });
        if (!isArr(b.rows)) fail(path + ".rows", "must be an array");
        else b.rows.forEach(function (row, ri) {
          if (!isArr(row)) { fail(path + ".rows[" + ri + "]", "not an array"); return; }
          if (b.head && isArr(b.head) && row.length !== b.head.length) {
            fail(path + ".rows[" + ri + "]", "cell count " + row.length + " != header count " + b.head.length);
          }
          row.forEach(function (c, ci) {
            if (!nonEmpty(c)) fail(path + ".rows[" + ri + "][" + ci + "]", "empty cell");
          });
        });
        break;
      case "stats":
        if (!isArr(b.v)) fail(path + ".v", "must be an array");
        else b.v.forEach(function (s, si) {
          if (!s || typeof s !== "object") { fail(path + ".v[" + si + "]", "not an object"); return; }
          ["n", "c", "s"].forEach(function (k) {
            if (!nonEmpty(s[k])) fail(path + ".v[" + si + "]." + k, "missing or empty");
          });
          if (s.hi !== undefined && typeof s.hi !== "boolean") fail(path + ".v[" + si + "].hi", "must be a boolean");
        });
        break;
      case "qa":
        if (!isArr(b.v)) fail(path + ".v", "must be an array");
        else b.v.forEach(function (x, xi) {
          if (!x || typeof x !== "object") { fail(path + ".v[" + xi + "]", "not an object"); return; }
          if (!nonEmpty(x.q)) fail(path + ".v[" + xi + "].q", "missing or empty");
          if (!nonEmpty(x.a)) fail(path + ".v[" + xi + "].a", "missing or empty");
        });
        break;
      case "beats":
        if (!isArr(b.v)) fail(path + ".v", "must be an array");
        else b.v.forEach(function (x, xi) {
          if (!x || typeof x !== "object") { fail(path + ".v[" + xi + "]", "not an object"); return; }
          if (!nonEmpty(x.t)) fail(path + ".v[" + xi + "].t", "missing or empty");
          if (!nonEmpty(x.v)) fail(path + ".v[" + xi + "].v", "missing or empty");
        });
        break;
      case "gloss":
        if (!isArr(b.v)) fail(path + ".v", "must be an array");
        else b.v.forEach(function (g, gi) {
          if (!g || typeof g !== "object") { fail(path + ".v[" + gi + "]", "not an object"); return; }
          if (!nonEmpty(g.term)) fail(path + ".v[" + gi + "].term", "missing or empty");
          if (!nonEmpty(g.def)) fail(path + ".v[" + gi + "].def", "missing or empty");
        });
        break;
    }
  }

  function validateResource(r, path, fail) {
    if (!r || typeof r !== "object") { fail(path, "not an object"); return; }
    ["tag", "title", "url", "note"].forEach(function (k) {
      if (!nonEmpty(r[k])) fail(path + "." + k, "missing or empty");
    });
    if (r && r.url && !/^https?:\/\//i.test(r.url)) fail(path + ".url", "must be an http(s) URL");
  }

  return { validateCourse: validateCourse, BLOCK_TYPES: BLOCK_TYPES };
});
