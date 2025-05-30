import { releaseAnimation } from '../animations';
import { SVG, SVGElement } from '../index';
import { CustomSVGElement } from '../svg-element';
import { AnimationGroup, Timeline } from '../timeline';

describe('Timeline', () => {
  let svg: SVG;
  let circle: SVGElement;

  beforeEach(() => {
    svg = new SVG({ width: 100, height: 100 });
    circle = svg.circle({ cx: 50, cy: 50, r: 20 });
  });

  test('creates an AnimationGroup with enter phase', () => {
    const group = new AnimationGroup({
      elements: [circle],
      phases: {
        enter: {
          r: {
            attribute: 'r', 
            from: '20',
            to: '40',
            dur: '1s',
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

  test('creates a Timeline with multiple groups', () => {
    const timeline = new Timeline();

    const group1 = timeline.addGroup({
      elements: [circle],
      phases: {
        enter: {
          r: {
            attribute: 'r', 
            from: '20',
            to: '40',
            dur: '1s',
          },
        },
      },
    });

    const group2 = timeline.addGroup({
      elements: [circle],
      phases: {
        exit: {
          r: {
            attribute: 'r', 
            from: '40',
            to: '20',
            dur: '1s',
          },
        },
      },
    });

    (group2 as any).playPhase('exit');

    const markup = svg.toString();
    expect(markup).toContain('attributeName="r"');
    expect(markup).toContain('from="20"');
    expect(markup).toContain('to="40"');
    expect(markup).toContain('from="40"');
    expect(markup).toContain('to="20"');
    expect(markup).toContain('dur="1s"');
  });

  test('stops all animations in Timeline', () => {
    const timeline = new Timeline();

    timeline.addGroup({
      elements: [circle],
      phases: {
        enter: {
          r: {
            attribute: 'r', 
            from: '20',
            to: '40',
            dur: '1s',
          },
        },
      },
    });

    timeline.stopAll();

    const markup = svg.toString();
    expect(markup).not.toContain('attributeName="r"');
  });

  test('destroys Timeline and removes all groups', () => {
    const timeline = new Timeline();
    timeline.addGroup({
      elements: [circle],
      phases: {
        enter: {
          r: {
            attribute: 'r',
            from: '20',
            to: '40',
            dur: '1s',
          },
        },
      },
    });

    timeline.destroy();
    const markup = svg.toString();
    expect(markup).not.toContain('attributeName="r"');
  });
});