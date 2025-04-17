import { SVG } from '../index';

describe('Timeline', () => {
  let svg: SVG;

  beforeEach(() => {
    svg = new SVG({ width: 100, height: 100 });
  });

  test('creates a timeline with phases', () => {
    const circle = svg.circle({ cx: 50, cy: 50, r: 20 });
    svg.timeline({
      element: circle,
      phases: {
        enter: {
          r: {
              from: 20, to: 40, dur: '1s',
              attribute: ''
          },
        },
        exit: {
          r: {
              from: 40, to: 20, dur: '1s',
              attribute: ''
          },
        },
      },
    });
    const markup = svg.toString();
    expect(markup).toContain('attributeName="r"');
    expect(markup).toContain('from="20"');
    expect(markup).toContain('to="40"');
    expect(markup).toContain('dur="1s"');
  });
});