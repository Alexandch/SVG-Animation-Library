import { AnimationOptions } from './types';
export declare class CustomSVGElement {
    protected tagName: string;
    protected attributes: Record<string, string>;
    protected children: CustomSVGElement[];
    getChildren(): CustomSVGElement[];
    addChild(child: CustomSVGElement): void;
    getTagName(): string;
    constructor(tagName: string, attributes?: Record<string, string | number>);
    add(child: CustomSVGElement): this;
    removeChild(child: CustomSVGElement): this;
    animate(options: AnimationOptions): CustomSVGElement;
    toString(): string;
}
