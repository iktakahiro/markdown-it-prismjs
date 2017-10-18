import path = require("path")
import generate = require("markdown-it-testgen")
import markdownItPrism from "../src/index"
import MarkdownIt = require("markdown-it")

describe("markdown-it-br", () => {
    const md = MarkdownIt("default", {
        html: false,
        xhtmlOut: true,
        breaks: true,
    }).use(markdownItPrism)

    generate(path.join(__dirname, "fixtures/markdown.txt"), md)
})
