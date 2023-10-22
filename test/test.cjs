const assert = require("assert");
const test = require("node:test");
const { readFileSync } = require("node:fs");

const posthtml = require("posthtml");
const { retag } = require("posthtml-retag");


// In addition to showing if CommonJS fails to import, this is used to verify posthtml in sync mode


const testPairs = [
  [
    // 0
    '<span retag="h1">Test for <code>&lt;span&gt;</code> to <code>&lt;h1&gt;</code></span>',
    "<h1>Test for <code>&lt;span&gt;</code> to <code>&lt;h1&gt;</code></h1>",
  ],
  [
    // 1
    '<p id="test-id" retag="div" class="test-class">Test for not modifying unrelated attributes</p>',
    '<div id="test-id" class="test-class">Test for not modifying unrelated attributes</div>',
  ],
  [
    // 2
    '<span changeto="h2">Test for custom attribute name</span>',
    "<h2>Test for custom attribute name</h2>",
  ],
  [
    // 3
    '<div retag="noscript" style="display: none;">Test <code>removeDisplayNone</code></div>',
    "<noscript>Test <code>removeDisplayNone</code></noscript>",
  ],
  [
    // 4
    '<span retag="p">Test for <span retag="code">nested retagging</span></span>',
    "<p>Test for <code>nested retagging</code></p>",
  ],
  [
    // 5
    '<div retag="h2" style="color: darkblue; display: none; border: 1px solid #777; background-color: #fff;">Test for removing <code>display: none</code> and leaving style attribute</div>',
    '<h2 style="color: darkblue; border: 1px solid #777; background-color: #fff">Test for removing <code>display: none</code> and leaving style attribute</h2>',
  ],
  [
    // 6
    '<span retag="small" style="display: none !important;">Test for overriding <code>removeDisplayNone</code> removal</span>',
    '<small style="display: none !important">Test for overriding <code>removeDisplayNone</code> removal</small>',
  ],
  [
    // 7
    readFileSync("test/from/test.html", "utf8"),
    readFileSync("test/to/test.html", "utf8")
  ]
];

console.log("\nTesting CommonJS format + synchronous");

test("[sync] Test span to h1", () => {
  runTest(...testPairs[0]);
});

test("[sync] Test for not modifying unrelated attributes", () => {
  runTest(...testPairs[1]);
});

test("[sync] Test for custom attribute name", () => {
  runTest(...testPairs[2], { attr: "changeto" });
});

test("[sync] Test removeDisplayNone", () => {
  runTest(...testPairs[3], { removeDisplayNone: true });
});

test("[sync] Test for nested retagging", () => {
  runTest(...testPairs[4]);
});

test("[sync] Test for removeDisplayNone not affecting other style declarations", () => {
  runTest(...testPairs[5], { removeDisplayNone: true });
});

test("[sync] Test for ignoring '!important'", () => {
  runTest(...testPairs[6], { removeDisplayNone: true });
});

test("[sync] Test full conversion", () => {
  runTest(...testPairs[7], { removeDisplayNone: true });
});


async function runTest(html, expected, options = {}) {
  const result = posthtml()
    .use(retag(options))
    .process(html, { sync: true })
    .html
  return assert.strictEqual(result, expected);
}
