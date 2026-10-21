#!/usr/bin/env node
// PreToolUse hook for Agent Bookshelf capstone kit.
// 1) Blocks any read or edit of .env / credential files.
// 2) Blocks writing a spec in specs/ that is missing a required section.
// Exit 0 = allow. Exit 2 = block (the message on stderr goes back to Claude).

let raw = "";
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const tool = input.tool_name || "";
  const toolInput = input.tool_input || {};
  const filePath = String(toolInput.file_path || "");
  const fileName = filePath.split("/").pop();

  // Rule 1: protect secrets
  if (/^\.env(\..*)?$/.test(fileName) && fileName !== ".env.example") {
    console.error(`Blocked: ${fileName} may contain secrets. Ask the user to handle it.`);
    process.exit(2);
  }
  if (/(credentials|secret|\.pem$|\.key$)/i.test(fileName)) {
    console.error(`Blocked: ${fileName} looks like a credential file.`);
    process.exit(2);
  }

  // Rule 2: spec sections (only for Write of specs/*.md, except template and baseline)
  const isSpec = /(^|\/)specs\/[^/]+\.md$/.test(filePath);
  const isExempt = /(TEMPLATE|manual-baseline)\.md$/.test(filePath);
  if (tool === "Write" && isSpec && !isExempt) {
    const content = String(toolInput.content || "");
    const required = [
      "## Problem",
      "## User Stories & Acceptance Criteria",
      "## Edge Cases",
      "## Out of Scope",
      "## Open Questions",
    ];
    const missing = required.filter(
      (h) => !content.split("\n").some((line) => line.trim() === h)
    );
    if (missing.length > 0) {
      console.error(
        `Spec blocked by spec-check hook. Missing required section(s): ${missing.join(", ")}. ` +
          `Add them (exact heading text from specs/TEMPLATE.md) and write the full file again.`
      );
      process.exit(2);
    }
  }

  process.exit(0);
});
