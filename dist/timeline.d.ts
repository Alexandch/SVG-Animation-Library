import { CustomSVGElement } from './svg-element';
import { AnimationConfig, TriggerOptions } from './types';
interface AnimationPhase {
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
export declare class AnimationGroup {
    private elements;
    private phases;
    private trigger?;
    private currentPhase;
    private isDragging;
    private eventListeners;
    constructor(options: AnimationGroupOptions);
    private debounce;
    private setupTrigger;
    private playPhase;
    stop(): void;
    destroy(): void;
}
export declare class Timeline {
    private groups;
    addGroup(options: AnimationGroupOptions): AnimationGroup;
    stopAll(): void;
    destroy(): void;
}
export {};
