import { CustomSVGElement } from './svg-element';
import { createAnimation, releaseAnimation } from './animations';
export class AnimationGroup {
    constructor(options) {
        this.currentPhase = null;
        this.isDragging = false;
        this.eventListeners = [];
        this.elements = Array.isArray(options.elements) ? options.elements : [options.elements];
        this.phases = options.phases;
        this.trigger = options.trigger;
        if (this.trigger) {
            this.setupTrigger();
        }
        else {
            this.playPhase('enter');
        }
    }
    debounce(func, wait) {
        let timeout = null;
        return (...args) => {
            if (timeout)
                clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }
    setupTrigger() {
        var _a, _b;
        if (!this.trigger)
            return;
        const targets = this.elements.map(element => element.getElement());
        let defaultTarget = null;
        // Проверяем, является ли target строкой (селектором) или элементом
        if (typeof this.trigger.target === 'string') {
            defaultTarget = document.querySelector(this.trigger.target);
        }
        else {
            defaultTarget = this.trigger.target || targets[0];
        }
        if (!defaultTarget) {
            console.error('Trigger target not found');
            return;
        }
        const addListener = (target, type, listener) => {
            target.addEventListener(type, listener);
            this.eventListeners.push({ target, type, listener });
        };
        if (this.trigger.type === 'drag') {
            let startX = 0;
            let startY = 0;
            const onMouseDown = (e) => {
                this.isDragging = true;
                const event = e;
                startX = event.clientX;
                startY = event.clientY;
                if (this.currentPhase !== 'enter') {
                    this.playPhase('enter');
                }
            };
            const onMouseMove = this.debounce((e) => {
                if (!this.isDragging)
                    return;
                const event = e;
                const dx = event.clientX - startX;
                const dy = event.clientY - startY;
                this.elements.forEach(element => {
                    const currentTransform = element.getAttribute('transform') || '';
                    element.setAttribute('transform', `${currentTransform} translate(${dx}, ${dy})`);
                });
            }, 16);
            const onMouseUp = (e) => {
                this.isDragging = false;
                if (this.currentPhase !== 'exit') {
                    this.playPhase('exit');
                }
            };
            addListener(defaultTarget, 'mousedown', onMouseDown);
            addListener(window, 'mousemove', onMouseMove);
            addListener(window, 'mouseup', onMouseUp);
        }
        else if (this.trigger.type === 'doubleclick') {
            const onDoubleClick = (e) => {
                if (this.currentPhase !== 'enter') {
                    this.playPhase('enter');
                }
                else {
                    this.playPhase('exit');
                }
            };
            addListener(defaultTarget, 'dblclick', onDoubleClick);
        }
        else if (this.trigger.type === 'keydown') {
            const key = this.trigger.key;
            if (!key)
                return;
            const onKeyDown = (e) => {
                const event = e;
                if (event.key === key) {
                    if (this.currentPhase !== 'enter') {
                        this.playPhase('enter');
                    }
                    else {
                        this.playPhase('exit');
                    }
                }
            };
            addListener(window, 'keydown', onKeyDown);
        }
        else if (this.trigger.type === 'scroll') {
            const target = this.trigger.target ? document.querySelector(this.trigger.target) : window;
            if (!target)
                return;
            const threshold = (_a = this.trigger.threshold) !== null && _a !== void 0 ? _a : 0.5;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
                        if (this.currentPhase !== 'enter') {
                            this.playPhase('enter');
                        }
                    }
                    else if (this.currentPhase !== 'exit') {
                        this.playPhase('exit');
                    }
                });
            }, { threshold });
            if (target === window) {
                observer.observe(document.documentElement);
            }
            else if (target instanceof Element) {
                observer.observe(target);
            }
        }
        else if (this.trigger.type === 'click') {
            const onClick = () => {
                if (this.currentPhase !== 'enter') {
                    this.playPhase('enter');
                }
                else {
                    this.playPhase('exit');
                }
            };
            addListener(defaultTarget, 'click', onClick);
        }
        else if (this.trigger.type === 'hover') {
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
        }
        else if (this.trigger.type === 'timer') {
            const delay = (_b = this.trigger.delay) !== null && _b !== void 0 ? _b : 1000;
            setTimeout(() => {
                if (this.currentPhase !== 'enter') {
                    this.playPhase('enter');
                }
            }, delay);
        }
        else if (this.trigger.type === 'custom') {
            const event = this.trigger.event;
            if (!event)
                return;
            const onCustomEvent = () => {
                if (this.currentPhase !== 'enter') {
                    this.playPhase('enter');
                }
                else {
                    this.playPhase('exit');
                }
            };
            addListener(defaultTarget, event, onCustomEvent);
        }
    }
    playPhase(phase) {
        if (!this.phases[phase])
            return;
        this.currentPhase = phase;
        const phaseAnimations = this.phases[phase];
        this.elements.forEach(element => {
            Object.entries(phaseAnimations).forEach(([key, config]) => {
                if (!('type' in config) && !('gradientId' in config) && !('motionPath' in config)) {
                    config.attribute = key;
                }
                const animation = createAnimation(config);
                element.add(animation);
                // Добавляем анимацию в DOM
                if (element.getElement()) {
                    const animationElement = document.createElementNS('http://www.w3.org/2000/svg', animation.getTagName());
                    animation.setElement(animationElement);
                    element.getElement().appendChild(animationElement);
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
    stop() {
        const animationTags = ['animate', 'animateTransform', 'animateMotion'];
        this.elements.forEach(element => {
            const children = element.getChildren();
            children.forEach((child) => {
                if (child instanceof CustomSVGElement && animationTags.includes(child.getTagName())) {
                    element.removeChild(child);
                    releaseAnimation(child);
                }
            });
        });
    }
    destroy() {
        this.stop();
        this.eventListeners.forEach(({ target, type, listener }) => {
            target.removeEventListener(type, listener);
        });
        this.eventListeners = [];
    }
}
export class Timeline {
    constructor() {
        this.groups = [];
    }
    addGroup(options) {
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
