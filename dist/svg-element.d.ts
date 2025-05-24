import { AnimationOptions } from './types';
export declare class CustomSVGElement {
    protected tagName: string;
    protected attributes: Record<string, string>;
    protected children: CustomSVGElement[];
    private element;
    private textContent;
    constructor(tagName: string, attributes?: Record<string, string | number>);
    getChildren(): CustomSVGElement[];
    addChild(child: CustomSVGElement): void;
    getTagName(): string;
    add(child: CustomSVGElement): this;
    removeChild(child: CustomSVGElement): this;
    animate(options: AnimationOptions): CustomSVGElement;
    toString(): string;
    getElement(): SVGElement | null;
    setElement(element: SVGElement): void;
    getAttributeNames(): string[];
    getAttribute(key: string): string | undefined;
    setAttribute(key: string, value: string): void;
    clearAttributes(): void;
    clearChildren(): void;
    setTextContent(content: string): void;
    getTextContent(): string | null;
}
