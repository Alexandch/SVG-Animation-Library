import { CustomSVGElement } from './svg-element';
import { AnimationOptions } from './types';
export declare class Circle extends CustomSVGElement {
    constructor(attributes: Record<string, string | number>);
    animate(options: AnimationOptions): CustomSVGElement;
}
export declare class Rect extends CustomSVGElement {
    constructor(attributes: Record<string, string | number>);
    animate(options: AnimationOptions): CustomSVGElement;
}
export declare class Line extends CustomSVGElement {
    constructor(attributes: Record<string, string | number>);
    animate(options: AnimationOptions): CustomSVGElement;
}
export declare class Path extends CustomSVGElement {
    constructor(attributes: Record<string, string | number>);
    animate(options: AnimationOptions): CustomSVGElement;
}
export { CustomSVGElement as SVGElement };
