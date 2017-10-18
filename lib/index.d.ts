/// <reference types="markdown-it" />
import { MarkdownIt } from "markdown-it";
export interface MarkdownItPrismJsPluginOptions {
    plugins?: string[];
    init?: (prism: any) => void;
}
export declare function markdownItPrism(md: MarkdownIt, options?: MarkdownItPrismJsPluginOptions): void;
