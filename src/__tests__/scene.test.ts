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
});