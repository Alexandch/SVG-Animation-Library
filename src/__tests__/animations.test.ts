import { SVG } from '../index';

describe('Animations', () => {
  let svg: SVG;

  beforeEach(() => {
    svg = new SVG({ width: 100, height: 100 });
  });

  test('creates an AnimateTransform animation', () => {
    const circle = svg.circle({ cx: 50, cy: 50, r: 20 });
    svg.animateChild(circle, {
      attribute: 'transform',
      type: 'rotate',
      from: '0 50 50',
      to: '360 50 50',
      dur: '2s',
    });
    const markup = svg.toString();
    expect(markup).toContain('<animateTransform');
    expect(markup).toContain('attributeName="transform"');
    expect(markup).toContain('type="rotate"');
    expect(markup).toContain('from="0 50 50"');
    expect(markup).toContain('to="360 50 50"');
    expect(markup).toContain('dur="2s"');
  });

  test('creates an AnimateMotion animation', () => {
    const circle = svg.circle({ cx: 50, cy: 50, r: 20 });
    svg.animateChild(circle, {
      attribute: 'motion',
      motionPath: { path: 'M10,10 L100,100' }, // Убрали dur из motionPath
      dur: '3s', // Переместили dur на уровень AnimationOptions
    });
    const markup = svg.toString();
    expect(markup).toContain('<animateMotion');
    expect(markup).toContain('path="M10,10 L100,100"');
    expect(markup).toContain('dur="3s"');
  });
});