import { CustomSVGElement } from './svg-element';
import { AnimationOptions } from './types';
interface AnimationPhase {
    [key: string]: AnimationOptions;
}
export interface AnimationGroupOptions {
    element: CustomSVGElement;
    phases: {
        enter?: AnimationPhase;
        hold?: AnimationPhase;
        exit?: AnimationPhase;
    };
    trigger?: {
        type: 'scroll' | 'click';
        target?: string;
        threshold?: number;
    };
}
export declare class AnimationGroup {
    private element;
    private phases;
    private trigger?;
    private currentPhase;
    constructor(options: AnimationGroupOptions);
    private setupTrigger;
    private playPhase;
    stop(): void;
}
export declare class Timeline {
    private groups;
    addGroup(options: AnimationGroupOptions): AnimationGroup;
    stopAll(): void;
}
export {};
