import { SVG, SVGElement } from '../index';

describe('SVG Elements', () => {
  let svg: SVG;

  beforeEach(() => {
    svg = new SVG({ width: 100, height: 100 });
  });

  test('creates a circle element', () => {
    const circle = svg.circle({ cx: 50, cy: 50, r: 20 });
    expect(circle).toBeInstanceOf(SVGElement);
    expect(circle.getTagName()).toBe('circle');
  });

  test('creates a rect element', () => {
    const rect = svg.rect({ x: 10, y: 10, width: 30, height: 40 });
    expect(rect).toBeInstanceOf(SVGElement);
    expect(rect.getTagName()).toBe('rect');
  });

  test('creates a line element', () => {
    const line = svg.line({ x1: 0, y1: 0, x2: 100, y2: 100 });
    expect(line).toBeInstanceOf(SVGElement);
    expect(line.getTagName()).toBe('line');
  });

  test('creates a path element', () => {
    const path = svg.path({ d: 'M10 10 H 90 V 90 H 10 Z' });
    expect(path).toBeInstanceOf(SVGElement);
    expect(path.getTagName()).toBe('path');
  });

  test('generates correct SVG markup for circle', () => {
    const circle = svg.circle({ cx: 50, cy: 50, r: 20, fill: 'red' });
    const markup = svg.toString();
    expect(markup).toContain('<circle cx="50" cy="50" r="20" fill="red"></circle>');
  });

  test('adds animation to circle', () => {
    const circle = svg.circle({ cx: 50, cy: 50, r: 20 });
    svg.animateChild(circle, {
      attribute: 'r',
      from: 20,
      to: 40,
      dur: '1s',
      repeatCount: 'indefinite',
    });
    const markup = svg.toString();
    expect(markup).toContain('attributeName="r"');
    expect(markup).toContain('from="20"');
    expect(markup).toContain('to="40"');
    expect(markup).toContain('dur="1s"');
    expect(markup).toContain('repeatCount="indefinite"');
  });
});