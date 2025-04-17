import { CustomSVGElement } from './svg-element';
import { AnimationOptions } from './types';
export declare class Animate extends CustomSVGElement {
    constructor(options: AnimationOptions);
}
export declare class AnimateTransform extends CustomSVGElement {
    constructor(options: AnimationOptions);
}
export declare class AnimateMotion extends CustomSVGElement {
    constructor(options: AnimationOptions);
}
export declare function createAnimation(options: AnimationOptions): CustomSVGElement;
export { AnimationOptions };
