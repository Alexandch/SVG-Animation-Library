import { SVGElement, Circle, Rect, Line, Path } from './elements';
import { AnimationOptions } from './types';
import { AnimationGroupOptions } from './timeline';
export declare class SVG extends SVGElement {
    private timelineInstance;
    constructor(attributes: Record<string, string | number>);
    circle(attributes: Record<string, string | number>): Circle;
    rect(attributes: Record<string, string | number>): Rect;
    line(attributes: Record<string, string | number>): Line;
    path(attributes: Record<string, string | number>): Path;
    animate(options: AnimationOptions): SVGElement;
    animateChild(element: SVGElement, options: AnimationOptions): SVGElement;
    timeline(options: AnimationGroupOptions): import("./timeline").AnimationGroup;
    stopAnimations(): void;
}
