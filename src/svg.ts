import { SVGElement, Circle, Rect, Line, Path } from './elements';
import { AnimationOptions, createAnimation } from './animations';

export class SVG extends SVGElement {
  constructor(attributes: Record<string, string | number>) {
    super('svg', attributes);
  }

  circle(attributes: Record<string, string | number>): Circle {
    const circle = new Circle(attributes);
    this.add(circle);
    return circle;
  }

  rect(attributes: Record<string, string | number>): Rect {
    const rect = new Rect(attributes);
    this.add(rect);
    return rect;
  }

  line(attributes: Record<string, string | number>): Line {
    const line = new Line(attributes);
    this.add(line);
    return line;
  }

  path(attributes: Record<string, string | number>): Path {
    const path = new Path(attributes);
    this.add(path);
    return path;
  }

  animate(options: AnimationOptions): SVGElement {
    const animation = createAnimation(options);
    this.add(animation);
    return animation;
  }

  animateChild(element: SVGElement, options: AnimationOptions): SVGElement {
    const animation = createAnimation(options);
    element.add(animation);
    return animation;
  }
}