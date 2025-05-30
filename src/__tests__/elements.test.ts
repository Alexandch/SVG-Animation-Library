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

  test('generates correct SVG markup for line', () => {
    const line = svg.line({ x1: 0, y1: 0, x2: 100, y2: 100, stroke: 'black' });
    const markup = svg.toString();
    expect(markup).toContain('<line x1="0" y1="0" x2="100" y2="100" stroke="black"></line>');
  });

  test('generates correct SVG markup for path', () => {
    const path = svg.path({ d: 'M10 10 H 90 V 90 H 10 Z', fill: 'blue' });
    const markup = svg.toString();
    expect(markup).toContain('<path d="M10 10 H 90 V 90 H 10 Z" fill="blue"></path>');
  });

  test('creates a text element with content', () => {
    const text = svg.text({ x: 10, y: 20, fill: 'black' }, 'Hello SVG');
    expect(text).toBeInstanceOf(SVGElement);
    expect(text.getTagName()).toBe('text');
    const markup = svg.toString();
    expect(markup).toContain('<text x="10" y="20" fill="black">Hello SVG</text>');
  });

  test('creates a filter with feGaussianBlur', () => {
    const filter = svg.filter({ id: 'blur' });
    filter.add(svg.feGaussianBlur({ stdDeviation: 2 }));
    const markup = svg.toString();
    expect(markup).toContain('<filter id="blur">');
    expect(markup).toContain('<feGaussianBlur stdDeviation="2"></feGaussianBlur>');
  });

  test('creates a rect element', () => {
  const rect = svg.rect({ x: 10, y: 10, width: 50, height: 30 });
  const markup = svg.toString();
  expect(markup).toContain('<rect');
  expect(markup).toContain('x="10"');
  expect(markup).toContain('y="10"');
  expect(markup).toContain('width="50"');
  expect(markup).toContain('height="30"');
  });

  test('creates a line element', () => {
  const line = svg.line({ x1: 0, y1: 0, x2: 100, y2: 100 });
  const markup = svg.toString();
  expect(markup).toContain('<line');
  expect(markup).toContain('x1="0"');
  expect(markup).toContain('y1="0"');
  expect(markup).toContain('x2="100"');
  expect(markup).toContain('y2="100"');
});

test('creates a circle element', () => {
  const circle = svg.circle({ cx: 50, cy: 50, r: 25 });
  const markup = svg.toString();
  expect(markup).toContain('<circle');
  expect(markup).toContain('cx="50"');
  expect(markup).toContain('cy="50"');
  expect(markup).toContain('r="25"');
});

});