const fs = require("fs");
const path = require("path");

const sourceMapPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "@mediapipe",
  "tasks-vision",
  "vision_bundle_mjs.js.map"
);

const validSourceMap = {
  version: 3,
  file: "vision_bundle_mjs.js",
  sources: [],
  sourcesContent: [],
  names: [],
  mappings: "",
};

try {
  let shouldWrite = false;

  if (!fs.existsSync(sourceMapPath)) {
    shouldWrite = true;
  } else {
    try {
      const raw = fs.readFileSync(sourceMapPath, "utf8");
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.sources)) {
        shouldWrite = true;
      }
    } catch {
      shouldWrite = true;
    }
  }

  if (shouldWrite) {
    fs.mkdirSync(path.dirname(sourceMapPath), { recursive: true });
    fs.writeFileSync(sourceMapPath, `${JSON.stringify(validSourceMap)}\n`, "utf8");
    console.log("[postinstall] Created or repaired source map:", sourceMapPath);
  } else {
    console.log("[postinstall] Source map is already valid:", sourceMapPath);
  }
} catch (error) {
  console.warn("[postinstall] Could not patch source map:", error.message);
}
