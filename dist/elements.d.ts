import { SVGElement } from './svg-element';
import { AnimationOptions } from './types';
export declare class Circle extends SVGElement {
    constructor(attributes: Record<string, string | number>);
    animate(options: AnimationOptions): SVGElement;
}
export declare class Rect extends SVGElement {
    constructor(attributes: Record<string, string | number>);
    animate(options: AnimationOptions): SVGElement;
}
export declare class Line extends SVGElement {
    constructor(attributes: Record<string, string | number>);
    animate(options: AnimationOptions): SVGElement;
}
export declare class Path extends SVGElement {
    constructor(attributes: Record<string, string | number>);
    animate(options: AnimationOptions): SVGElement;
}
export { SVGElement };
