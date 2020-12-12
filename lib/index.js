"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function posthtmlReTag(options = {}) {
  options.attr = options.attr || "retag";
  options.removeDisplayNone = options.removeDisplayNone || false;
  function removeDN(rule) {
    return !/display:\s*none/i.test(rule) && rule.length > 0;
  }
  return function process(tree) {
    tree.walk((node) => {
      if (node.attrs && node.attrs.hasOwnProperty(options.attr)) {
        const newTag = node.attrs[options.attr];
        if (typeof newTag === "string" && newTag.trim().length > 0) {
          node.tag = newTag.trim();
          if (options.removeDisplayNone && typeof node.attrs.style === "string") {
            node.attrs.style = node.attrs.style.split(";").filter(removeDN).join(";").trim();
            if (node.attrs.style.length === 0) {
              delete node.attrs.style;
            }
          }
          delete node.attrs[options.attr];
        }
      }
      return node;
    });
    return tree;
  };
}
exports.default = posthtmlReTag;
module.exports = exports.default;
