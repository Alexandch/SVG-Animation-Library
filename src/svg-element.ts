import { AnimationOptions } from './types';

export class SVGElement {
  protected tagName: string;
  protected attributes: Record<string, string>;
  protected children: SVGElement[] = [];

  constructor(tagName: string, attributes: Record<string, string | number> = {}) {
    this.tagName = tagName;
    this.attributes = {};
    for (const [key, value] of Object.entries(attributes)) {
      if (value !== undefined) {
        this.attributes[key] = typeof value === 'number' ? value.toString() : value;
      }
    }
  }

  add(child: SVGElement): this {
    this.children.push(child);
    return this;
  }

  removeChild(child: SVGElement): this {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
    return this;
  }

  animate(options: AnimationOptions): SVGElement {
    throw new Error('Method "animate" must be implemented by subclasses or handled externally');
  }

  toString(): string {
    const attrs = Object.entries(this.attributes)
      .filter(([_, v]) => v !== undefined)
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ');
    const childrenStr = this.children.map(c => c.toString()).join('');
    return `<${this.tagName} ${attrs}>${childrenStr}</${this.tagName}>`;
  }
}