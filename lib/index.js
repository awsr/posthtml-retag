module.exports = (options = {}) => {
    options.attr = options.attr || "ph-tag";
    options.walk = options.walk || false;
    options.removeDisplayNone = options.removeDisplayNone || false;
    function removeDisplayNone(rule) {
        return !/display:\s*none$/i.test(rule) && rule.length > 0;
    }
    function processNode(node) {
        const newTag = node.attrs[options.attr];
        if (typeof newTag === "string" && newTag.trim().length > 0) {
            node.tag = newTag.trim();
            if (options.removeDisplayNone && node.attrs && typeof node.attrs.style === "string") {
                node.attrs.style = node.attrs.style.split(";").filter(removeDisplayNone).join(";").trim();
                if (node.attrs.style.length === 0) {
                    delete node.attrs.style;
                }
            }
            delete node.attrs[options.attr];
        }
        return node;
    }
    function posthtmlReTag(tree) {
        if (options.walk) {
            tree.walk(node => {
                if (node.attrs && node.attrs.hasOwnProperty(options.attr)) {
                    return processNode(node);
                }
                else {
                    return node;
                }
            });
        }
        else {
            tree.match({ attrs: { [options.attr]: /.*/ } }, processNode);
        }
        return tree;
    }
    return posthtmlReTag;
};