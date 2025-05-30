import { SVG, AnimationOptions } from '../index';

describe('SVG Scene', () => {
  let svg: SVG;

  beforeEach(() => {
    svg = new SVG({ width: 200, height: 200 });
  });

  test('creates scene with circle and rectangle', () => {
    const circle = svg.circle({ cx: 50, cy: 50, r: 20, fill: 'red' });
    const rect = svg.rect({ x: 100, y: 100, width: 30, height: 30, fill: 'blue' });
    const markup = svg.toString();
    expect(markup).toContain('<circle cx="50" cy="50" r="20" fill="red"></circle>');
    expect(markup).toContain('<rect x="100" y="100" width="30" height="30" fill="blue"></rect>');
  });

  test('applies animations to multiple elements', () => {
    const circle = svg.circle({ cx: 50, cy: 50, r: 20 });
    svg.animateChild(circle, {
      attribute: 'r',
      from: 20,
      to: 40,
      dur: '1s'
    });
    const rect = svg.rect({ x: 100, y: 100, width: 30, height: 30 });
    svg.animateChild(rect, {
      type: 'rotate',
      from: '0 115 115',
      to: '360 115 115',
      dur: '2s'
    });
    const markup = svg.toString();
    expect(markup).toContain('attributeName="r"');
    expect(markup).toContain('from="20"');
    expect(markup).toContain('to="40"');
    expect(markup).toContain('dur="1s"');
    expect(markup).toContain('type="rotate"');
    expect(markup).toContain('from="0 115 115"');
    expect(markup).toContain('to="360 115 115"');
    expect(markup).toContain('dur="2s"');
  });

  test('creates scene with text and filter', () => {
    const text = svg.text({ x: 10, y: 20, fill: 'black' }, 'Test Text');
    const filter = svg.filter({ id: 'blur' });
    filter.add(svg.feGaussianBlur({ stdDeviation: 2 }));
    text.setAttribute('filter', 'url(#blur)');
    const markup = svg.toString();
    expect(markup).toContain('<text x="10" y="20" fill="black" filter="url(#blur)">Test Text</text>');
    expect(markup).toContain('<filter id="blur">');
    expect(markup).toContain('<feGaussianBlur stdDeviation="2"></feGaussianBlur>');
  });

  test('creates scene with gradient and stop elements', () => {
    const gradient = svg.linearGradient({ id: 'grad1', x1: '0%', y1: '0%', x2: '100%', y2: '0%' });
    gradient.add(svg.stop({ offset: '0%', 'stop-color': 'red' }));
    gradient.add(svg.stop({ offset: '100%', 'stop-color': 'blue' }));
    const rect = svg.rect({ x: 10, y: 10, width: 50, height: 50, fill: 'url(#grad1)' });
    const markup = svg.toString();
    expect(markup).toContain('<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">');
    expect(markup).toContain('<stop offset="0%" stop-color="red"></stop>');
    expect(markup).toContain('<stop offset="100%" stop-color="blue"></stop>');
    expect(markup).toContain('<rect x="10" y="10" width="50" height="50" fill="url(#grad1)"></rect>');
  });

  test('handles missing animation attributes', () => {
    const circle = svg.circle({ cx: 50, cy: 50, r: 20 });
    expect(() => {
      svg.animateChild(circle, {
        attribute: 'opacity',
        dur: '1s'
        // Отсутствуют from и to
      });
    }).toThrow('AnimationOptions must have "from" and "to" properties if keyframes are not provided');
  });

  test('adds a circle to the scene', () => {
  const scene = new SVG({ width: 200, height: 200 });
  scene.circle({ cx: 100, cy: 100, r: 30 });
  const markup = scene.toString();
  expect(markup).toContain('<svg');
  expect(markup).toContain('width="200"');
  expect(markup).toContain('height="200"');
  expect(markup).toContain('<circle');
  expect(markup).toContain('cx="100"');
  expect(markup).toContain('cy="100"');
  expect(markup).toContain('r="30"');
  });
  
});