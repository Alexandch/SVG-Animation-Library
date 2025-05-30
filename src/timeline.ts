import { CustomSVGElement } from './svg-element';
import { AnimationConfig, TriggerOptions } from './types';
import { createAnimation, releaseAnimation } from './animations';

interface AnimationPhase {
  [key: string]: AnimationConfig;
}

export interface AnimationGroupOptions {
  elements: CustomSVGElement | CustomSVGElement[];
  phases: {
    enter?: AnimationPhase;
    hold?: AnimationPhase;
    exit?: AnimationPhase;
  };
  trigger?: TriggerOptions;
}

export class AnimationGroup {
  private elements: CustomSVGElement[];
  private phases: AnimationGroupOptions['phases'];
  private trigger?: AnimationGroupOptions['trigger'];
  private currentPhase: 'enter' | 'hold' | 'exit' | null = null;
  private isDragging: boolean = false;
  private eventListeners: Array<{ target: EventTarget; type: string; listener: EventListener }> = [];

  constructor(options: AnimationGroupOptions) {
    this.elements = Array.isArray(options.elements) ? options.elements : [options.elements];
    this.phases = options.phases;
    this.trigger = options.trigger;

    if (this.trigger) {
      this.setupTrigger();
    } else {
      this.playPhase('enter');
    }
  }

  private debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args: any[]) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  private setupTrigger() {
    if (!this.trigger) return;

    const targets = this.elements.map(element => element.getElement());
    let defaultTarget: EventTarget | null = null;

    // Проверяем, является ли target строкой (селектором) или элементом
    if (typeof this.trigger.target === 'string') {
      defaultTarget = document.querySelector(this.trigger.target);
    } else {
      defaultTarget = this.trigger.target || targets[0];
    }

    if (!defaultTarget) {
      console.error('Trigger target not found');
      return;
    }

    const addListener = (target: EventTarget, type: string, listener: EventListener) => {
      target.addEventListener(type, listener);
      this.eventListeners.push({ target, type, listener });
    };

    if (this.trigger.type === 'drag') {
      let startX = 0;
      let startY = 0;

      const onMouseDown = (e: Event) => {
        this.isDragging = true;
        const event = e as MouseEvent;
        startX = event.clientX;
        startY = event.clientY;
        if (this.currentPhase !== 'enter') {
          this.playPhase('enter');
        }
      };

      const onMouseMove = this.debounce((e: Event) => {
        if (!this.isDragging) return;
        const event = e as MouseEvent;
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        this.elements.forEach(element => {
          const currentTransform = element.getAttribute('transform') || '';
          element.setAttribute('transform', `${currentTransform} translate(${dx}, ${dy})`);
        });
      }, 16);

      const onMouseUp = (e: Event) => {
        this.isDragging = false;
        if (this.currentPhase !== 'exit') {
          this.playPhase('exit');
        }
      };

      addListener(defaultTarget, 'mousedown', onMouseDown);
      addListener(window, 'mousemove', onMouseMove);
      addListener(window, 'mouseup', onMouseUp);
    } else if (this.trigger.type === 'doubleclick') {
      const onDoubleClick = (e: Event) => {
        if (this.currentPhase !== 'enter') {
          this.playPhase('enter');
        } else {
          this.playPhase('exit');
        }
      };
      addListener(defaultTarget, 'dblclick', onDoubleClick);
    } else if (this.trigger.type === 'keydown') {
      const key = this.trigger.key;
      if (!key) return;

      const onKeyDown = (e: Event) => {
        const event = e as KeyboardEvent;
        if (event.key === key) {
          if (this.currentPhase !== 'enter') {
            this.playPhase('enter');
          } else {
            this.playPhase('exit');
          }
        }
      };
      addListener(window, 'keydown', onKeyDown);
    } else if (this.trigger.type === 'scroll') {
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
      const onClick = () => {
        if (this.currentPhase !== 'enter') {
          this.playPhase('enter');
        } else {
          this.playPhase('exit');
        }
      };
      addListener(defaultTarget, 'click', onClick);
    } else if (this.trigger.type === 'hover') {
      const onMouseEnter = () => {
        if (this.currentPhase !== 'enter') {
          this.playPhase('enter');
        }
      };
      const onMouseLeave = () => {
        if (this.currentPhase !== 'exit') {
          this.playPhase('exit');
        }
      };
      addListener(defaultTarget, 'mouseenter', onMouseEnter);
      addListener(defaultTarget, 'mouseleave', onMouseLeave);
    } else if (this.trigger.type === 'timer') {
      const delay = this.trigger.delay ?? 1000;
      setTimeout(() => {
        if (this.currentPhase !== 'enter') {
          this.playPhase('enter');
        }
      }, delay);
    } else if (this.trigger.type === 'custom') {
      const event = this.trigger.event;
      if (!event) return;

      const onCustomEvent = () => {
        if (this.currentPhase !== 'enter') {
          this.playPhase('enter');
        } else {
          this.playPhase('exit');
        }
      };
      addListener(defaultTarget, event, onCustomEvent);
    }
  }

  private playPhase(phase: 'enter' | 'hold' | 'exit') {
    if (!this.phases[phase]) return;

    this.currentPhase = phase;
    const phaseAnimations = this.phases[phase]!;
    this.elements.forEach(element => {
      Object.entries(phaseAnimations).forEach(([key, config]) => {
        if (!('type' in config) && !('gradientId' in config) && !('motionPath' in config)) {
          (config as any).attribute = key;
        }
        const animation = createAnimation(config);
        element.add(animation);
        if (element.getElement()) {
          const animationElement = document.createElementNS('http://www.w3.org/2000/svg', animation.getTagName());
          animation.setElement(animationElement);
          element.getElement()!.appendChild(animationElement);
          animation.getAttributeNames().forEach(attr => {
            const value = animation.getAttribute(attr);
            if (value !== undefined) {
              animationElement.setAttribute(attr, value);
            }
          });
        }
      });
    });
  }

  public stop() {
    const animationTags = ['animate', 'animateTransform', 'animateMotion'];
    this.elements.forEach(element => {
      const children = element.getChildren();
      children.forEach((child: CustomSVGElement) => {
        if (child instanceof CustomSVGElement && animationTags.includes(child.getTagName())) {
          element.removeChild(child);
          releaseAnimation(child);
        }
      });
    });
  }

  public destroy() {
    this.stop();
    this.eventListeners.forEach(({ target, type, listener }) => {
      target.removeEventListener(type, listener);
    });
    this.eventListeners = [];
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

  destroy() {
    this.groups.forEach(group => group.destroy());
    this.groups = [];
  }
}