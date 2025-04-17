import { CustomSVGElement } from './svg-element';
import { AnimationOptions } from './types';
import { createAnimation } from './animations';

interface AnimationPhase {
  [key: string]: AnimationOptions;
}

export interface AnimationGroupOptions {
  element: CustomSVGElement;
  phases: {
    enter?: AnimationPhase;
    hold?: AnimationPhase;
    exit?: AnimationPhase;
  };
  trigger?: {
    type: 'scroll' | 'click';
    target?: string; // Element ID or selector
    threshold?: number; // For scroll (0 to 1)
  };
}

export class AnimationGroup {
  private element: CustomSVGElement;
  private phases: AnimationGroupOptions['phases'];
  private trigger?: AnimationGroupOptions['trigger'];
  private currentPhase: 'enter' | 'hold' | 'exit' | null = null;

  constructor(options: AnimationGroupOptions) {
    this.element = options.element;
    this.phases = options.phases;
    this.trigger = options.trigger;

    if (this.trigger) {
      this.setupTrigger();
    } else {
      this.playPhase('enter');
    }
  }

  private setupTrigger() {
    if (!this.trigger) return;

    if (this.trigger.type === 'scroll') {
      const target = this.trigger.target ? document.querySelector(this.trigger.target) : window;
      if (!target) return;

      const threshold = this.trigger.threshold ?? 0.5;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
              if (this.currentPhase !== 'enter') {
                this.playPhase('enter');
              }
            } else if (this.currentPhase !== 'exit') {
              this.playPhase('exit');
            }
          });
        },
        { threshold }
      );

      if (target === window) {
        observer.observe(document.documentElement);
      } else if (target instanceof Element) {
        observer.observe(target);
      }
    } else if (this.trigger.type === 'click') {
      const target = this.trigger.target ? document.querySelector(this.trigger.target) : null;
      if (!target) return;

      target.addEventListener('click', () => {
        if (this.currentPhase !== 'enter') {
          this.playPhase('enter');
        } else {
          this.playPhase('exit');
        }
      });
    }
  }

  private playPhase(phase: 'enter' | 'hold' | 'exit') {
    if (!this.phases[phase]) return;

    this.currentPhase = phase;
    const phaseAnimations = this.phases[phase]!;
    Object.entries(phaseAnimations).forEach(([key, options]) => {
      const animation = createAnimation({ ...options, attribute: key });
      this.element.add(animation);
    });
  }

  public stop() {
    const children = this.element.getChildren();
    children.filter((child: CustomSVGElement) => 
      !(child instanceof CustomSVGElement && ['animate', 'animateTransform', 'animateMotion'].includes(child.getTagName()))
    );
  }
}

export class Timeline {
  private groups: AnimationGroup[] = [];

  addGroup(options: AnimationGroupOptions) {
    const group = new AnimationGroup(options);
    this.groups.push(group);
    return group;
  }

  stopAll() {
    this.groups.forEach(group => group.stop());
  }
}