import { SVGElement, Circle, Rect } from './elements';
import { createAnimation } from './animations';
export class SVG extends SVGElement {
    constructor(attributes) {
        super('svg', attributes);
    }
    circle(attributes) {
        const circle = new Circle(attributes);
        this.add(circle); // Добавляем круг в children
        return circle;
    }
    rect(attributes) {
        const rect = new Rect(attributes);
        this.add(rect); // Добавляем прямоугольник в children
        return rect;
    }
    animate(options) {
        const animation = createAnimation(options);
        this.add(animation);
        return animation;
    }
    animateChild(element, options) {
        const animation = createAnimation(options);
        element.add(animation);
        return animation;
    }
}
