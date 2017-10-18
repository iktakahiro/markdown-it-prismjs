"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Prism = require("prismjs");
function loadLangDefinition(lang) {
    var langDefinition = Prism.languages[lang];
    if (langDefinition === undefined) {
        try {
            require("prismjs/components/prism-" + lang);
            return Prism.languages[lang];
        }
        catch (e) {
            // nothing to do
        }
    }
    return langDefinition;
}
function loadPrismPlugin(name) {
    try {
        require("prismjs/plugins/" + name + "/prism-" + name);
    }
    catch (e) {
        throw new Error("Prism plugin \"" + name + "\" does not exist.");
    }
}
function _highlight(md, text, lang) {
    var langDefinition = loadLangDefinition(lang);
    var code;
    if (langDefinition) {
        code = Prism.highlight(text, langDefinition);
    }
    else {
        code = md.utils.escapeHtml(text);
        lang = "text";
    }
    var classAttribute = "class=\"" + md.options.langPrefix + lang + "\"";
    return "<pre " + classAttribute + "><code " + classAttribute + ">" + code + "</code></pre>";
}
function markdownItPrism(md, options) {
    if (options === void 0) { options = { plugins: [] }; }
    options.plugins.forEach(loadPrismPlugin);
    // options.init(Prism)
    var highlight = function (text, lang) { return _highlight(md, text, lang); };
    md.set({ highlight: highlight });
}
exports.markdownItPrism = markdownItPrism;
