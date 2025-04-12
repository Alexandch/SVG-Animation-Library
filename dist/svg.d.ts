import { SVGElement, Circle, Rect, Line, Path } from './elements';
import { AnimationOptions } from './animations';
export declare class SVG extends SVGElement {
    constructor(attributes: Record<string, string | number>);
    circle(attributes: Record<string, string | number>): Circle;
    rect(attributes: Record<string, string | number>): Rect;
    line(attributes: Record<string, string | number>): Line;
    path(attributes: Record<string, string | number>): Path;
    animate(options: AnimationOptions): SVGElement;
    animateChild(element: SVGElement, options: AnimationOptions): SVGElement;
}
