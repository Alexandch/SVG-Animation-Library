import { SVGElement } from './svg-element';
export class Animate extends SVGElement {
    constructor(options) {
        super('animate', {
            attributeName: options.attribute,
            from: options.from.toString(),
            to: options.to.toString(),
            dur: options.dur,
            repeatCount: options.repeatCount || 'indefinite',
        });
    }
}
export class AnimateTransform extends SVGElement {
    constructor(options) {
        var _a;
        super('animateTransform', {
            attributeName: 'transform',
            type: (_a = options.type) !== null && _a !== void 0 ? _a : 'rotate',
            from: options.from.toString(),
            to: options.to.toString(),
            dur: options.dur,
            repeatCount: options.repeatCount || 'indefinite',
        });
    }
}
export function createAnimation(options) {
    if (options.attribute === 'transform') {
        return new AnimateTransform(options);
    }
    return new Animate(options);
}
