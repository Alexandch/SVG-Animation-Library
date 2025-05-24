import { CustomSVGElement } from './svg-element';
const animationPool = [];
export class Animate extends CustomSVGElement {
    constructor(options) {
        const attributes = Object.assign(Object.assign({ attributeName: options.attribute, dur: options.dur, repeatCount: options.repeatCount || 'indefinite' }, (options.begin && { begin: options.begin })), (options.easing && { calcMode: 'spline', keySplines: getKeySplines(options.easing) }));
        if (options.keyframes && options.keyframes.length > 0) {
            attributes.values = options.keyframes.map(kf => kf.value.toString()).join(';');
            attributes.keyTimes = options.keyframes.map(kf => kf.offset).join(';');
        }
        else {
            if (options.from === undefined || options.to === undefined) {
                throw new Error('AnimationOptions must have "from" and "to" properties if keyframes are not provided');
            }
            attributes.from = options.from.toString();
            attributes.to = options.to.toString();
        }
        super('animate', attributes);
    }
}
export class AnimateTransform extends CustomSVGElement {
    constructor(options) {
        const attributes = Object.assign(Object.assign({ attributeName: 'transform', type: options.type, dur: options.dur || '1s', repeatCount: options.repeatCount || 'indefinite' }, (options.begin && { begin: options.begin })), (options.easing && { calcMode: 'spline', keySplines: getKeySplines(options.easing) }));
        if (options.keyframes && options.keyframes.length > 0) {
            attributes.values = options.keyframes.map(kf => kf.value.toString()).join(';');
            attributes.keyTimes = options.keyframes.map(kf => kf.offset).join(';');
        }
        else {
            if (options.from === undefined || options.to === undefined) {
                throw new Error('TransformAnimationOptions must have "from" and "to" properties if keyframes are not provided');
            }
            attributes.from = Array.isArray(options.from) ? options.from.join(' ') : options.from.toString();
            attributes.to = Array.isArray(options.to) ? options.to.join(' ') : options.to.toString();
        }
        super('animateTransform', attributes);
    }
}
export class AnimateMotion extends CustomSVGElement {
    constructor(options) {
        if (!options.motionPath) {
            throw new Error('AnimateMotion requires a motionPath property');
        }
        super('animateMotion', Object.assign(Object.assign(Object.assign(Object.assign({ dur: options.dur, repeatCount: options.repeatCount || 'indefinite' }, (options.begin && { begin: options.begin })), (options.easing && { calcMode: 'spline', keySplines: getKeySplines(options.easing) })), (options.motionPath.rotate && { rotate: options.motionPath.rotate.toString() })), (options.motionPath.align !== undefined && { path: options.motionPath.path, rotate: options.motionPath.align ? 'auto' : '0' })));
        const mpath = new CustomSVGElement('mpath', { 'xlink:href': `#${options.motionPath.path}` });
        this.add(mpath);
    }
}
export class AnimateGradient extends CustomSVGElement {
    constructor(options) {
        const attributes = Object.assign(Object.assign({ attributeName: options.attribute, href: `#${options.gradientId} stop:nth-child(${options.stopIndex + 1})`, dur: options.dur, repeatCount: options.repeatCount || 'indefinite' }, (options.begin && { begin: options.begin })), (options.easing && { calcMode: 'spline', keySplines: getKeySplines(options.easing) }));
        if (options.from === undefined || options.to === undefined) {
            throw new Error('GradientAnimationOptions must have "from" and "to" properties');
        }
        attributes.from = options.from.toString();
        attributes.to = options.to.toString();
        super('animate', attributes);
    }
}
function getKeySplines(easing) {
    if (!easing)
        return '0 0 1 1';
    switch (easing) {
        case 'ease-in':
            return '0.42 0 1 1';
        case 'ease-out':
            return '0 0 0.58 1';
        case 'ease-in-out':
            return '0.42 0 0.58 1';
        case 'cubic-bezier(0.1, 0.7, 1.0, 0.1)':
            return '0.1 0.7 1.0 0.1';
        case 'linear':
        default:
            return '0 0 1 1';
    }
}
export function createAnimation(config) {
    let animation;
    if (animationPool.length > 0) {
        animation = animationPool.pop();
        animation.clearAttributes();
        animation.clearChildren();
    }
    else {
        if ('gradientId' in config) {
            animation = new AnimateGradient(config);
        }
        else if ('type' in config) {
            animation = new AnimateTransform(config);
        }
        else {
            const options = config;
            if (options.motionPath) {
                animation = new AnimateMotion(options);
            }
            else {
                if (!options.attribute) {
                    throw new Error('AnimationOptions must have an "attribute" property');
                }
                if (!options.dur) {
                    throw new Error('AnimationOptions must have a "dur" property');
                }
                animation = new Animate(options);
            }
        }
    }
    return animation;
}
export function releaseAnimation(anim) {
    anim.clearAttributes();
    anim.clearChildren();
    animationPool.push(anim);
}
