import type { Node } from "posthtml";
/**
 * A PostHTML plugin for converting HTML tags to a specified target type.
 *
 * @param {Object} [options] - Options object for PostHTML-ReTag.
 * @param {string} [options.attr="retag"] - Name of the attribute that contains the new tag. Defaults to `retag`.
 * @param {boolean} [options.removeDisplayNone=false] - Also remove `display: none` from the style attribute
 * of the element being converted unless it is marked as `important`. If the style attribute is empty after
 * conversion, it is removed. Defaults to `false`.
 */
export declare function retag(options?: {
    attr?: string;
    removeDisplayNone?: boolean;
}): (tree: Node) => Node;
