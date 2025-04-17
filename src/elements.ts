import { CustomSVGElement } from './svg-element';
import { AnimationOptions } from './types';

export class Circle extends CustomSVGElement {
  constructor(attributes: Record<string, string | number>) {
    super('circle', attributes);
  }

  animate(options: AnimationOptions): CustomSVGElement {
    throw new Error('Use SVG.animateChild to animate Circle elements');
  }
}

export class Rect extends CustomSVGElement {
  constructor(attributes: Record<string, string | number>) {
    super('rect', attributes);
  }

  animate(options: AnimationOptions): CustomSVGElement {
    throw new Error('Use SVG.animateChild to animate Rect elements');
  }
}

export class Line extends CustomSVGElement {
  constructor(attributes: Record<string, string | number>) {
    super('line', attributes);
  }

  animate(options: AnimationOptions): CustomSVGElement {
    throw new Error('Use SVG.animateChild to animate Line elements');
  }
}

export class Path extends CustomSVGElement {
  constructor(attributes: Record<string, string | number>) {
    super('path', attributes);
  }

  animate(options: AnimationOptions): CustomSVGElement {
    throw new Error('Use SVG.animateChild to animate Path elements');
  }
}

export { CustomSVGElement as SVGElement };
