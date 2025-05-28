import { CustomSVGElement } from './svg-element';
import { Circle, Rect, Line, Path, LinearGradient, Stop, Filter, FeGaussianBlur, Text, ClipPath, FeTurbulence } from './elements';
import { createAnimation } from './animations';
import { Timeline } from './timeline';
export class SVG extends CustomSVGElement {
    constructor(attributes) {
        super('svg', attributes);
        this.timelineInstance = new Timeline();
    }
    circle(attributes) {
        const circle = new Circle(attributes);
        this.add(circle);
        if (this.getElement()) {
            const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setElement(circleElement);
            this.getElement().appendChild(circleElement);
            circle.getAttributeNames().forEach(key => {
                const value = circle.getAttribute(key);
                if (value !== undefined) {
                    circleElement.setAttribute(key, value);
                }
            });
        }
        return circle;
    }
    rect(attributes) {
        const rect = new Rect(attributes);
        this.add(rect);
        if (this.getElement()) {
            const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setElement(rectElement);
            this.getElement().appendChild(rectElement);
            rect.getAttributeNames().forEach(key => {
                const value = rect.getAttribute(key);
                if (value !== undefined) {
                    rectElement.setAttribute(key, value);
                }
            });
        }
        return rect;
    }
    line(attributes) {
        const line = new Line(attributes);
        this.add(line);
        if (this.getElement()) {
            const lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setElement(lineElement);
            this.getElement().appendChild(lineElement);
            line.getAttributeNames().forEach(key => {
                const value = line.getAttribute(key);
                if (value !== undefined) {
                    lineElement.setAttribute(key, value);
                }
            });
        }
        return line;
    }
    path(attributes) {
        const path = new Path(attributes);
        this.add(path);
        if (this.getElement()) {
            const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setElement(pathElement);
            this.getElement().appendChild(pathElement);
            path.getAttributeNames().forEach(key => {
                const value = path.getAttribute(key);
                if (value !== undefined) {
                    pathElement.setAttribute(key, value);
                }
            });
        }
        return path;
    }
    linearGradient(attributes) {
        const gradient = new LinearGradient(attributes);
        this.add(gradient);
        if (this.getElement()) {
            const gradientElement = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setElement(gradientElement);
            this.getElement().appendChild(gradientElement);
            gradient.getAttributeNames().forEach(key => {
                const value = gradient.getAttribute(key);
                if (value !== undefined) {
                    gradientElement.setAttribute(key, value);
                }
            });
        }
        return gradient;
    }
    stop(attributes) {
        const stop = new Stop(attributes);
        this.add(stop);
        if (this.getElement()) {
            const stopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop.setElement(stopElement);
            this.getElement().appendChild(stopElement);
            stop.getAttributeNames().forEach(key => {
                const value = stop.getAttribute(key);
                if (value !== undefined) {
                    stopElement.setAttribute(key, value);
                }
            });
        }
        return stop;
    }
    filter(attributes) {
        const filter = new Filter(attributes);
        this.add(filter);
        if (this.getElement()) {
            const filterElement = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
            filter.setElement(filterElement);
            this.getElement().appendChild(filterElement);
            filter.getAttributeNames().forEach(key => {
                const value = filter.getAttribute(key);
                if (value !== undefined) {
                    filterElement.setAttribute(key, value);
                }
            });
        }
        return filter;
    }
    feGaussianBlur(attributes) {
        const blur = new FeGaussianBlur(attributes);
        this.add(blur);
        if (this.getElement()) {
            const blurElement = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
            blur.setElement(blurElement);
            this.getElement().appendChild(blurElement);
            blur.getAttributeNames().forEach(key => {
                const value = blur.getAttribute(key);
                if (value !== undefined) {
                    blurElement.setAttribute(key, value);
                }
            });
        }
        return blur;
    }
    text(attributes, textContent) {
        const text = new Text(attributes, textContent);
        this.add(text);
        if (this.getElement()) {
            const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setElement(textElement);
            this.getElement().appendChild(textElement);
            text.getAttributeNames().forEach(key => {
                const value = text.getAttribute(key);
                if (value !== undefined) {
                    textElement.setAttribute(key, value);
                }
            });
            if (text.getTextContent()) {
                textElement.textContent = text.getTextContent();
            }
        }
        return text;
    }
    clipPath(attributes) {
        const clipPath = new ClipPath(attributes);
        this.add(clipPath);
        if (this.getElement()) {
            const clipPathElement = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
            clipPath.setElement(clipPathElement);
            this.getElement().appendChild(clipPathElement);
            clipPath.getAttributeNames().forEach(key => {
                const value = clipPath.getAttribute(key);
                if (value !== undefined) {
                    clipPathElement.setAttribute(key, value);
                }
            });
        }
        return clipPath;
    }
    feTurbulence(attributes) {
        const turbulence = new FeTurbulence(attributes);
        this.add(turbulence);
        if (this.getElement()) {
            const turbulenceElement = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
            turbulence.setElement(turbulenceElement);
            this.getElement().appendChild(turbulenceElement);
            turbulence.getAttributeNames().forEach(key => {
                const value = turbulence.getAttribute(key);
                if (value !== undefined) {
                    turbulenceElement.setAttribute(key, value);
                }
            });
        }
        return turbulence;
    }
    animate(options) {
        const animation = createAnimation(options);
        this.add(animation);
        if (this.getElement()) {
            const animationElement = document.createElementNS('http://www.w3.org/2000/svg', animation.getTagName());
            animation.setElement(animationElement);
            this.getElement().appendChild(animationElement);
            animation.getAttributeNames().forEach(key => {
                const value = animation.getAttribute(key);
                if (value !== undefined) {
                    animationElement.setAttribute(key, value);
                }
            });
        }
        return animation;
    }
    animateChild(element, options) {
        const animation = createAnimation(options);
        element.add(animation);
        if (element.getElement()) {
            const animationElement = document.createElementNS('http://www.w3.org/2000/svg', animation.getTagName());
            animation.setElement(animationElement);
            element.getElement().appendChild(animationElement);
            animation.getAttributeNames().forEach(key => {
                const value = animation.getAttribute(key);
                if (value !== undefined) {
                    animationElement.setAttribute(key, value);
                }
            });
        }
        return animation;
    }
    timeline(options) {
        return this.timelineInstance.addGroup(options);
    }
    stopAnimations() {
        this.timelineInstance.stopAll();
    }
    setElement(element) {
        super.setElement(element);
        if (this.getTextContent()) {
            element.textContent = this.getTextContent();
        }
        this.getChildren().forEach(child => {
            const childElement = child.getElement();
            if (childElement) {
                element.appendChild(childElement);
            }
        });
    }
}
