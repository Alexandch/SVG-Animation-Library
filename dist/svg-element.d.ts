import { AnimationOptions } from './types';
export declare class SVGElement {
    protected tagName: string;
    protected attributes: Record<string, string>;
    protected children: SVGElement[];
    constructor(tagName: string, attributes?: Record<string, string | number>);
    add(child: SVGElement): this;
    removeChild(child: SVGElement): this;
    animate(options: AnimationOptions): SVGElement;
    toString(): string;
}
