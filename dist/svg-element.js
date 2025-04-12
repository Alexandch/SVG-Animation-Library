export class SVGElement {
    constructor(tagName, attributes = {}) {
        this.children = [];
        this.tagName = tagName;
        this.attributes = {};
        for (const [key, value] of Object.entries(attributes)) {
            if (value !== undefined) {
                this.attributes[key] = typeof value === 'number' ? value.toString() : value;
            }
        }
    }
    add(child) {
        this.children.push(child);
        return this;
    }
    // Сделаем метод animate абстрактным, чтобы он не зависел от animations.ts
    animate(options) {
        throw new Error('Method "animate" must be implemented by subclasses or handled externally');
    }
    toString() {
        const attrs = Object.entries(this.attributes)
            .filter(([_, v]) => v !== undefined)
            .map(([k, v]) => `${k}="${v}"`)
            .join(' ');
        const childrenStr = this.children.map(c => c.toString()).join('');
        return `<${this.tagName} ${attrs}>${childrenStr}</${this.tagName}>`;
    }
}
