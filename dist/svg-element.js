export class CustomSVGElement {
    constructor(tagName, attributes = {}) {
        this.children = [];
        this.element = null;
        this.textContent = null;
        this.tagName = tagName;
        this.attributes = {};
        for (const [key, value] of Object.entries(attributes)) {
            if (value !== undefined) {
                this.attributes[key] = typeof value === 'number' ? value.toString() : value;
            }
        }
    }
    getChildren() {
        return this.children;
    }
    addChild(child) {
        this.children.push(child);
    }
    getTagName() {
        return this.tagName;
    }
    add(child) {
        this.children.push(child);
        if (this.element && child.element) {
            this.element.appendChild(child.element);
        }
        return this;
    }
    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
            if (this.element && child.element) {
                this.element.removeChild(child.element);
            }
        }
        return this;
    }
    animate(options) {
        throw new Error('Method "animate" must be implemented by subclasses or handled externally');
    }
    toString() {
        const attrs = Object.entries(this.attributes)
            .filter(([_, v]) => v !== undefined)
            .map(([k, v]) => `${k}="${v}"`)
            .join(' ');
        const childrenStr = this.children.map(c => c.toString()).join('');
        const textContentStr = this.textContent || '';
        return `<${this.tagName} ${attrs}>${textContentStr}${childrenStr}</${this.tagName}>`;
    }
    getElement() {
        return this.element;
    }
    setElement(element) {
        this.element = element;
        for (const [key, value] of Object.entries(this.attributes)) {
            if (value !== undefined) {
                element.setAttribute(key, value);
            }
        }
        if (this.textContent) {
            element.textContent = this.textContent;
        }
        this.children.forEach(child => {
            if (child.element) {
                element.appendChild(child.element);
            }
        });
    }
    getAttributeNames() {
        return Object.keys(this.attributes);
    }
    getAttribute(key) {
        return this.attributes[key];
    }
    setAttribute(key, value) {
        this.attributes[key] = value;
        if (this.element) {
            this.element.setAttribute(key, value);
        }
    }
    clearAttributes() {
        this.attributes = {};
        if (this.element) {
            const attrNames = this.element.getAttributeNames();
            attrNames.forEach(name => { var _a; return (_a = this.element) === null || _a === void 0 ? void 0 : _a.removeAttribute(name); });
        }
    }
    clearChildren() {
        this.children = [];
        if (this.element) {
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
        }
    }
    setTextContent(content) {
        this.textContent = content;
        if (this.element) {
            this.element.textContent = content;
        }
    }
    getTextContent() {
        return this.textContent;
    }
}
