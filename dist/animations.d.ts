import { SVGElement } from './svg-element';
import { AnimationOptions } from './types';
export declare class Animate extends SVGElement {
    constructor(options: AnimationOptions);
}
export declare class AnimateTransform extends SVGElement {
    constructor(options: AnimationOptions);
}
export declare function createAnimation(options: AnimationOptions): SVGElement;
export { AnimationOptions };
