import { SVGElement } from './svg-element';
import { AnimationOptions } from './types';

export class Animate extends SVGElement {
  constructor(options: AnimationOptions) {
    super('animate', {
      attributeName: options.attribute,
      from: options.from.toString(),
      to: options.to.toString(),
      dur: options.dur,
      repeatCount: options.repeatCount || 'indefinite',
      ...(options.begin && { begin: options.begin }),
    });
  }
}

export class AnimateTransform extends SVGElement {
  constructor(options: AnimationOptions) {
    super('animateTransform', {
      attributeName: 'transform',
      type: options.type ?? 'rotate',
      from: options.from.toString(),
      to: options.to.toString(),
      dur: options.dur,
      repeatCount: options.repeatCount || 'indefinite',
      ...(options.begin && { begin: options.begin }),
    });
  }
}

export function createAnimation(options: AnimationOptions): SVGElement {
  // Валидация
  if (!options.attribute) {
    throw new Error('AnimationOptions must have an "attribute" property');
  }
  if (options.from === undefined || options.to === undefined) {
    throw new Error('AnimationOptions must have "from" and "to" properties');
  }
  if (!options.dur) {
    throw new Error('AnimationOptions must have a "dur" property');
  }
  if (options.attribute === 'transform' && options.type && !['rotate', 'scale', 'translate'].includes(options.type)) {
    throw new Error('AnimationOptions "type" must be one of: rotate, scale, translate');
  }

  if (options.attribute === 'transform') {
    return new AnimateTransform(options);
  }
  return new Animate(options);
}

export { AnimationOptions };
