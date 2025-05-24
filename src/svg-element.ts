import { AnimationOptions } from './types';

export class CustomSVGElement {
  protected tagName: string;
  protected attributes: Record<string, string>;
  protected children: CustomSVGElement[] = [];
  private element: SVGElement | null = null;
  private textContent: string | null = null; // Добавляем поле для текстового содержимого

  constructor(tagName: string, attributes: Record<string, string | number> = {}) {
    this.tagName = tagName;
    this.attributes = {};
    for (const [key, value] of Object.entries(attributes)) {
      if (value !== undefined) {
        this.attributes[key] = typeof value === 'number' ? value.toString() : value;
      }
    }
  }

  public getChildren(): CustomSVGElement[] {
    return this.children;
  }

  public addChild(child: CustomSVGElement): void {
    this.children.push(child);
  }

  public getTagName(): string {
    return this.tagName;
  }

  public add(child: CustomSVGElement): this {
    this.children.push(child);
    if (this.element && child.element) {
      this.element.appendChild(child.element);
    }
    return this;
  }

  public removeChild(child: CustomSVGElement): this {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      if (this.element && child.element) {
        this.element.removeChild(child.element);
      }
    }
    return this;
  }

  public animate(options: AnimationOptions): CustomSVGElement {
    throw new Error('Method "animate" must be implemented by subclasses or handled externally');
  }

  public toString(): string {
    const attrs = Object.entries(this.attributes)
      .filter(([_, v]) => v !== undefined)
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ');
    const childrenStr = this.children.map(c => c.toString()).join('');
    const textContentStr = this.textContent || ''; // Учитываем текстовое содержимое
    return `<${this.tagName} ${attrs}>${textContentStr}${childrenStr}</${this.tagName}>`;
  }

  public getElement(): SVGElement | null {
    return this.element;
  }

  public setElement(element: SVGElement): void {
    this.element = element;
    for (const [key, value] of Object.entries(this.attributes)) {
      if (value !== undefined) {
        element.setAttribute(key, value);
      }
    }
    if (this.textContent) {
      element.textContent = this.textContent; // Синхронизируем textContent с DOM
    }
    this.children.forEach(child => {
      if (child.element) {
        element.appendChild(child.element);
      }
    });
  }

  public getAttributeNames(): string[] {
    return Object.keys(this.attributes);
  }

  public getAttribute(key: string): string | undefined {
    return this.attributes[key];
  }

  public setAttribute(key: string, value: string): void {
    this.attributes[key] = value;
    if (this.element) {
      this.element.setAttribute(key, value);
    }
  }

  public clearAttributes(): void {
    this.attributes = {};
    if (this.element) {
      const attrNames = this.element.getAttributeNames();
      attrNames.forEach(name => this.element?.removeAttribute(name));
    }
  }

  public clearChildren(): void {
    this.children = [];
    if (this.element) {
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
    }
  }

  // Добавляем методы для работы с textContent
  public setTextContent(content: string): void {
    this.textContent = content;
    if (this.element) {
      this.element.textContent = content;
    }
  }

  public getTextContent(): string | null {
    return this.textContent;
  }
}