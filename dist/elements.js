import { CustomSVGElement } from './svg-element';
export class Circle extends CustomSVGElement {
    constructor(attributes) {
        super('circle', attributes);
    }
    animate(options) {
        throw new Error('Use SVG.animateChild to animate Circle elements');
    }
}
export class Rect extends CustomSVGElement {
    constructor(attributes) {
        super('rect', attributes);
    }
    animate(options) {
        throw new Error('Use SVG.animateChild to animate Rect elements');
    }
}
export class Line extends CustomSVGElement {
    constructor(attributes) {
        super('line', attributes);
    }
    animate(options) {
        throw new Error('Use SVG.animateChild to animate Line elements');
    }
}
export class Path extends CustomSVGElement {
    constructor(attributes) {
        super('path', attributes);
    }
    animate(options) {
        throw new Error('Use SVG.animateChild to animate Path elements');
    }
}
export class LinearGradient extends CustomSVGElement {
    constructor(attributes) {
        super('linearGradient', attributes);
    }
    animate(options) {
        throw new Error('Use SVG.animateChild to animate LinearGradient elements');
    }
}
export class Stop extends CustomSVGElement {
    constructor(attributes) {
        super('stop', attributes);
    }
    animate(options) {
        throw new Error('Use SVG.animateChild to animate Stop elements');
    }
}
export class Filter extends CustomSVGElement {
    constructor(attributes) {
        super('filter', attributes);
    }
    animate(options) {
        throw new Error('Use SVG.animateChild to animate Filter elements');
    }
}
export class FeGaussianBlur extends CustomSVGElement {
    constructor(attributes) {
        super('feGaussianBlur', attributes);
    }
    animate(options) {
        throw new Error('Use SVG.animateChild to animate FeGaussianBlur elements');
    }
}
export class Text extends CustomSVGElement {
    constructor(attributes, textContent) {
        super('text', attributes);
        this.setTextContent(textContent);
    }
    animate(options) {
        throw new Error('Use SVG.animateChild to animate Text elements');
    }
}
export class ClipPath extends CustomSVGElement {
    constructor(attributes) {
        super('clipPath', attributes);
    }
    animate(options) {
        throw new Error('Use SVG.animateChild to animate ClipPath elements');
    }
}
export class FeTurbulence extends CustomSVGElement {
    constructor(attributes) {
        super('feTurbulence', attributes);
    }
    animate(options) {
        throw new Error('Use SVG.animateChild to animate FeTurbulence elements');
    }
}
export { CustomSVGElement as SVGElement };
