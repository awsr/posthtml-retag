import { Node } from "posthtml";

/**
 * A PostHTML plugin for converting HTML tags to a specified target type.
 * 
 * @param {Object} [options] - Options object for PostHTML-ReTag
 * @param {string} [options.attr="retag"] - Name of the attribute that contains the new tag. Defaults to `retag`.
 * @param {boolean} [options.removeDisplayNone=false] - Also remove `display: none` from the style attribute
 * of the element being converted. If the style attribute would be empty after this, it will be removed.
 * Defaults to `false`.
 */
export default function posthtmlReTag(options: { attr?: string; removeDisplayNone?: boolean } = {}): Function {
  options.attr = options.attr || "retag";
  options.removeDisplayNone = options.removeDisplayNone || false;

  function removeDN(rule: string) {
    return !/display:\s*none/i.test(rule) && rule.length > 0;
  }

  return function process(tree: Node): Node {
    tree.walk(node => {
      if (node.attrs && node.attrs.hasOwnProperty(options.attr as string)) {
        const newTag = node.attrs[options.attr as string];

        if (typeof newTag === "string" && newTag.trim().length > 0) {
          node.tag = newTag.trim();

          if (options.removeDisplayNone && typeof node.attrs.style === "string") {
            node.attrs.style = node.attrs.style.split(";").filter(removeDN).join(";").trim();

            if (node.attrs.style.length === 0) {
              delete node.attrs.style;
            }

          }

          delete node.attrs[options.attr as string];
        }

      }

      return node;
    });

    return tree;
  };
}

module.exports = posthtmlReTag;