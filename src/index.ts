import { MarkdownIt } from "markdown-it"
import * as Prism from "prismjs"

function loadLangDefinition(lang): Prism.LanguageDefinition {
    const langDefinition = Prism.languages[lang]
    if (langDefinition === undefined) {
        try {
            require(`prismjs/components/prism-${lang}`)
            return Prism.languages[lang]
        } catch (e) {
            // nothing to do
        }
    }
    return langDefinition
}

function loadPrismPlugin(name) {
    try {
        require(`prismjs/plugins/${name}/prism-${name}`)
    } catch (e) {
        throw new Error(`Prism plugin "${name}" does not exist.`)
    }
}

function _highlight(md: MarkdownIt, text: string, lang: string) {
    const langDefinition = loadLangDefinition(lang)
    let code: string
    if (langDefinition) {
        code = Prism.highlight(text, langDefinition)
    } else {
        code = md.utils.escapeHtml(text)
        lang = "text"
    }
    const classAttribute = `class="${(md as any).options.langPrefix}${lang}"`

    return `<pre ${classAttribute}><code ${classAttribute}>${code}</code></pre>`
}

export interface MarkdownItPrismJsPluginOptions {
    plugins?: string[]
    init?: (prism: any) => void
}

export function markdownItPrism(md: MarkdownIt, options: MarkdownItPrismJsPluginOptions = { plugins: [] }) {

    options.plugins.forEach(loadPrismPlugin)
    if (options["init"] !== undefined) {
        options.init(Prism)
    }

    const highlight = (text: string, lang: string) => _highlight(md, text, lang)
    md.set({ highlight })
}
