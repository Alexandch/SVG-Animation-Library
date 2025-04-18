import { SVG, SVGElement } from '../index';
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
      element: circle,
      phases: {
        enter: {
          r: {
            from: '20', to: '40', dur: '1s',
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

  test('creates a Timeline with multiple groups', () => {
    const timeline = new Timeline();

    const group1 = timeline.addGroup({
      element: circle,
      phases: {
        enter: {
          r: {
            from: '20', to: '40', dur: '1s',
            attribute: ''
          },
        },
      },
    });

    const group2 = timeline.addGroup({
      element: circle,
      phases: {
        exit: {
          r: {
            from: '40', to: '20', dur: '1s',
            attribute: ''
          },
        },
      },
    });

    // Вручную вызываем фазу exit для второй группы
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
      element: circle,
      phases: {
        enter: {
          r: {
            from: '20', to: '40', dur: '1s',
            attribute: ''
          },
        },
      },
    });

    timeline.stopAll();

    const markup = svg.toString();
    expect(markup).not.toContain('attributeName="r"');
  });
});