const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const GOOD_COMMIT = "539dc30";
const TARGET = path.join(__dirname, "..", "lib", "admin-data.ts");

const good = execFileSync("git", ["show", `${GOOD_COMMIT}:lib/admin-data.ts`], {
  cwd: path.join(__dirname, ".."),
  maxBuffer: 50 * 1024 * 1024,
}).toString("utf8");

let current = fs.readFileSync(TARGET, "utf8");

const ORDER = [
  "adminHomeData",
  "adminAboutData",
  "adminContactData",
  "adminNewsData",
  "adminProjectsData",
  "adminPublicationsData",
];

function extract(source, name) {
  const next = ORDER[ORDER.indexOf(name) + 1];
  const start = source.indexOf(`export const ${name}`);
  if (start === -1) return null;
  let end = -1;
  for (let i = ORDER.indexOf(name) + 1; i < ORDER.length; i++) {
    end = source.indexOf(`export const ${ORDER[i]}`, start);
    if (end !== -1) break;
  }
  if (end === -1) end = source.length;
  return source.slice(start, end);
}

for (const name of ["adminHomeData", "adminAboutData", "adminContactData"]) {
  const block = extract(good, name);
  const currentBlock = extract(current, name);
  if (!block || !currentBlock) {
    throw new Error(`Could not locate ${name}`);
  }
  current = current.replace(currentBlock, block);
  console.log(`restored ${name}`);
}

fs.writeFileSync(TARGET, current, "utf8");
console.log("done");
