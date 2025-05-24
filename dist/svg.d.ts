import { CustomSVGElement } from './svg-element';
import { Circle, Rect, Line, Path, LinearGradient, Stop, Filter, FeGaussianBlur, Text, ClipPath, FeTurbulence } from './elements';
import { AnimationConfig } from './types';
import { AnimationGroupOptions } from './timeline';
export declare class SVG extends CustomSVGElement {
    private timelineInstance;
    constructor(attributes: Record<string, string | number>);
    circle(attributes: Record<string, string | number>): Circle;
    rect(attributes: Record<string, string | number>): Rect;
    line(attributes: Record<string, string | number>): Line;
    path(attributes: Record<string, string | number>): Path;
    linearGradient(attributes: Record<string, string | number>): LinearGradient;
    stop(attributes: Record<string, string | number>): Stop;
    filter(attributes: Record<string, string | number>): Filter;
    feGaussianBlur(attributes: Record<string, string | number>): FeGaussianBlur;
    text(attributes: Record<string, string | number>, textContent: string): Text;
    clipPath(attributes: Record<string, string | number>): ClipPath;
    feTurbulence(attributes: Record<string, string | number>): FeTurbulence;
    animate(options: AnimationConfig): CustomSVGElement;
    animateChild(element: CustomSVGElement, options: AnimationConfig): CustomSVGElement;
    timeline(options: AnimationGroupOptions): import("./timeline").AnimationGroup;
    stopAnimations(): void;
    setElement(element: SVGElement): void;
}
