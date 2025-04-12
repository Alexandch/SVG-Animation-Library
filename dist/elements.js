import { SVGElement } from './svg-element';
export class Circle extends SVGElement {
    constructor(attributes) {
        super('circle', attributes);
    }
    // Временная заглушка, логика анимации будет в SVG
    animate(options) {
        throw new Error('Use SVG.animateChild to animate Circle elements');
    }
}
export class Rect extends SVGElement {
    constructor(attributes) {
        super('rect', attributes);
    }
    // Временная заглушка, логика анимации будет в SVG
    animate(options) {
        throw new Error('Use SVG.animateChild to animate Rect elements');
    }
}
export { SVGElement };
