import { AnimationOptions } from './types';

export class CustomSVGElement {
  protected tagName: string;
  protected attributes: Record<string, string>;
  protected children: CustomSVGElement[] = [];

  public getChildren(): CustomSVGElement[] {
    return this.children;
  }
  public addChild(child: CustomSVGElement): void {
    this.children.push(child);
  }
  public getTagName(): string {
    return this.tagName;
  }
  constructor(tagName: string, attributes: Record<string, string | number> = {}) {
    this.tagName = tagName;
    this.attributes = {};
    for (const [key, value] of Object.entries(attributes)) {
      if (value !== undefined) {
        this.attributes[key] = typeof value === 'number' ? value.toString() : value;
      }
    }
  }

  add(child: CustomSVGElement): this {
    this.children.push(child);
    return this;
  }

  removeChild(child: CustomSVGElement): this {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
    return this;
  }

  animate(options: AnimationOptions): CustomSVGElement {
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