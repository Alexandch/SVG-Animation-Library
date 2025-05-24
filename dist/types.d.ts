import { CustomSVGElement } from "./svg-element";
interface BaseAnimationOptions {
    attribute?: string;
    from?: string | number;
    to?: string | number;
    dur: string;
    repeatCount?: string;
    begin?: string;
    easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;
    keyframes?: Keyframe[];
}
export interface AnimationOptions extends BaseAnimationOptions {
    attribute: string;
    motionPath?: MotionPath;
}
export interface TransformAnimationOptions extends BaseAnimationOptions {
    type: 'rotate' | 'scale' | 'translate' | 'skewX' | 'skewY';
}
export interface GradientAnimationOptions extends BaseAnimationOptions {
    gradientId: string;
    stopIndex: number;
    attribute: 'stop-color' | 'offset' | 'stop-opacity';
}
export interface FilterAnimationOptions extends BaseAnimationOptions {
    attribute: 'stdDeviation' | 'baseFrequency' | 'numOctaves';
}
export type AnimationConfig = AnimationOptions | TransformAnimationOptions | GradientAnimationOptions | FilterAnimationOptions;
export interface Keyframe {
    offset: number;
    value: string | number;
}
export interface MotionPath {
    path: string;
    align?: boolean;
    rotate?: string | number;
}
export interface TriggerOptions {
    type: 'click' | 'hover' | 'scroll' | 'drag' | 'doubleclick' | 'keydown' | 'timer' | 'custom';
    target?: string;
    threshold?: number;
    key?: string;
    delay?: number;
    event?: string;
}
export interface AnimationPhase {
    [key: string]: AnimationConfig;
}
export interface AnimationGroupOptions {
    elements: CustomSVGElement | CustomSVGElement[];
    phases: {
        enter?: AnimationPhase;
        hold?: AnimationPhase;
        exit?: AnimationPhase;
    };
    trigger?: TriggerOptions;
}
export {};
