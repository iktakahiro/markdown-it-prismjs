/// <reference types="markdown-it" />
import { MarkdownIt } from "markdown-it";
export interface MarkdownItPrismJsPluginOptions {
    plugins?: string[];
    init?: (prism: any) => void;
}
export default function markdownItPrismjs(md: MarkdownIt, options?: MarkdownItPrismJsPluginOptions): void;
