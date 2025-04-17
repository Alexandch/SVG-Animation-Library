import { CustomSVGElement } from './svg-element';
import { AnimationOptions, Keyframe, MotionPath } from './types';

export class Animate extends CustomSVGElement {
  constructor(options: AnimationOptions) {
    const attributes: Record<string, string> = {
      attributeName: options.attribute,
      dur: options.dur,
      repeatCount: options.repeatCount || 'indefinite',
      ...(options.begin && { begin: options.begin }),
      ...(options.easing && { calcMode: 'spline', keySplines: getKeySplines(options.easing) }),
    };

    // Use keyframes if provided, otherwise fallback to from/to
    if (options.keyframes && options.keyframes.length > 0) {
      attributes.values = options.keyframes.map(kf => kf.value.toString()).join(';');
      attributes.keyTimes = options.keyframes.map(kf => kf.offset).join(';');
    } else {
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
  constructor(options: AnimationOptions) {
    const attributes: Record<string, string> = {
      attributeName: 'transform',
      type: options.type ?? 'rotate',
      dur: options.dur,
      repeatCount: options.repeatCount || 'indefinite',
      ...(options.begin && { begin: options.begin }),
      ...(options.easing && { calcMode: 'spline', keySplines: getKeySplines(options.easing) }),
    };

    if (options.keyframes && options.keyframes.length > 0) {
      attributes.values = options.keyframes.map(kf => kf.value.toString()).join(';');
      attributes.keyTimes = options.keyframes.map(kf => kf.offset).join(';');
    } else {
      if (options.from === undefined || options.to === undefined) {
        throw new Error('AnimationOptions must have "from" and "to" properties if keyframes are not provided');
      }
      attributes.from = options.from.toString();
      attributes.to = options.to.toString();
    }

    super('animateTransform', attributes);
  }
}

export class AnimateMotion extends CustomSVGElement {
  constructor(options: AnimationOptions) {
    if (!options.motionPath) {
      throw new Error('AnimateMotion requires a motionPath property');
    }

    super('animateMotion', {
      dur: options.dur,
      repeatCount: options.repeatCount || 'indefinite',
      ...(options.begin && { begin: options.begin }),
      ...(options.easing && { calcMode: 'spline', keySplines: getKeySplines(options.easing) }),
      ...(options.motionPath.rotate && { rotate: options.motionPath.rotate.toString() }),
      ...(options.motionPath.align !== undefined && { path: options.motionPath.path, rotate: options.motionPath.align ? 'auto' : '0' }),
    });

    // Add the path as a child <mpath> element
    const mpath = new CustomSVGElement('mpath', { 'xlink:href': `#${options.motionPath.path}` });
    this.add(mpath);
  }
}

function getKeySplines(easing: AnimationOptions['easing']): string {
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

export function createAnimation(options: AnimationOptions): CustomSVGElement {
  // Validation
  if (!options.motionPath && !options.attribute) {
    throw new Error('AnimationOptions must have an "attribute" property or "motionPath"');
  }
  if (!options.dur) {
    throw new Error('AnimationOptions must have a "dur" property');
  }

  // Handle different animation types
  if (options.motionPath) {
    return new AnimateMotion(options); // Assumes AnimateMotion class handles motionPath
  }
  if (options.attribute === 'transform') {
    return new AnimateTransform(options);
  }
  return new Animate(options);
}

export { AnimationOptions };
