/* Development load-time content check. Surfaces schema violations as a visible
   banner so a malformed unit is caught at author time, not as a silent render
   failure. The deploy gate is scripts/validate-course.js. */
(function () {
  "use strict";

  var validate = window.PaymentsSchema && window.PaymentsSchema.validateCourse;
  if (!validate || !window.COURSE) return;

  var result = validate(window.COURSE);
  if (result.ok) return;

  if (window.console) {
    console.error(
      "Content validation failed with " + result.errors.length + " error(s):\n" +
      result.errors.map(function (e) { return "  - " + e; }).join("\n")
    );
  }

  var banner = document.createElement("div");
  banner.setAttribute("role", "alert");
  banner.style.cssText =
    "position:fixed;top:0;left:0;right:0;z-index:9999;" +
    "background:#b3261e;color:#fff;font:600 13px/1.4 system-ui,sans-serif;" +
    "padding:10px 14px;max-height:40vh;overflow:auto;white-space:pre-wrap;";
  banner.textContent =
    "Course content is invalid (" + result.errors.length + " error" +
    (result.errors.length === 1 ? "" : "s") + "). Fix before deploying:\n" +
    result.errors.map(function (e) { return "  - " + e; }).join("\n");
  document.body.appendChild(banner);
})();
