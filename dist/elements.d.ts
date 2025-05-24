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
export declare class LinearGradient extends CustomSVGElement {
    constructor(attributes: Record<string, string | number>);
    animate(options: AnimationOptions): CustomSVGElement;
}
export declare class Stop extends CustomSVGElement {
    constructor(attributes: Record<string, string | number>);
    animate(options: AnimationOptions): CustomSVGElement;
}
export declare class Filter extends CustomSVGElement {
    constructor(attributes: Record<string, string | number>);
    animate(options: AnimationOptions): CustomSVGElement;
}
export declare class FeGaussianBlur extends CustomSVGElement {
    constructor(attributes: Record<string, string | number>);
    animate(options: AnimationOptions): CustomSVGElement;
}
export declare class Text extends CustomSVGElement {
    constructor(attributes: Record<string, string | number>, textContent: string);
    animate(options: AnimationOptions): CustomSVGElement;
}
export declare class ClipPath extends CustomSVGElement {
    constructor(attributes: Record<string, string | number>);
    animate(options: AnimationOptions): CustomSVGElement;
}
export declare class FeTurbulence extends CustomSVGElement {
    constructor(attributes: Record<string, string | number>);
    animate(options: AnimationOptions): CustomSVGElement;
}
export { CustomSVGElement as SVGElement };
