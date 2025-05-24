import { CustomSVGElement } from './svg-element';
import { AnimationConfig, AnimationOptions, TransformAnimationOptions, GradientAnimationOptions } from './types';
export declare class Animate extends CustomSVGElement {
    constructor(options: AnimationOptions);
}
export declare class AnimateTransform extends CustomSVGElement {
    constructor(options: TransformAnimationOptions);
}
export declare class AnimateMotion extends CustomSVGElement {
    constructor(options: AnimationOptions);
}
export declare class AnimateGradient extends CustomSVGElement {
    constructor(options: GradientAnimationOptions);
}
export declare function createAnimation(config: AnimationConfig): CustomSVGElement;
export declare function releaseAnimation(anim: CustomSVGElement): void;
