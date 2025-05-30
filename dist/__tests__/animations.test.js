import { SVG } from '../index';
describe('Animations', () => {
    let svg;
    beforeEach(() => {
        svg = new SVG({ width: 100, height: 100 });
    });
    test('creates an AnimateTransform animation', () => {
        const circle = svg.circle({ cx: 50, cy: 50, r: 20 });
        svg.animateChild(circle, {
            type: 'rotate',
            from: '0 50 50',
            to: '360 50 50',
            dur: '2s'
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
            motionPath: { path: 'M10,10 L100,100' },
            dur: '3s',
            attribute: 'motion'
        });
        const markup = svg.toString();
        expect(markup).toContain('<animateMotion');
        expect(markup).toContain('<mpath xlink:href="#M10,10 L100,100"></mpath>');
        expect(markup).toContain('dur="3s"');
    });
    test('creates an AnimateGradient animation', () => {
        const gradient = svg.linearGradient({ id: 'grad1' });
        gradient.add(svg.stop({ offset: '0%', 'stop-color': 'red' }));
        gradient.add(svg.stop({ offset: '100%', 'stop-color': 'blue' }));
        svg.animateChild(gradient, {
            gradientId: 'grad1',
            stopIndex: 1,
            attribute: 'stop-color',
            from: 'blue',
            to: 'green',
            dur: '1s'
        });
        const markup = svg.toString();
        expect(markup).toContain('<animate');
        expect(markup).toContain('attributeName="stop-color"');
        expect(markup).toContain('href="#grad1 stop:nth-child(2)"');
        expect(markup).toContain('from="blue"');
        expect(markup).toContain('to="green"');
        expect(markup).toContain('dur="1s"');
    });
    test('creates an animation with keyframes', () => {
        const circle = svg.circle({ cx: 50, cy: 50, r: 20 });
        svg.animateChild(circle, {
            attribute: 'opacity',
            keyframes: [
                { offset: 0, value: 1 },
                { offset: 0.5, value: 0 },
                { offset: 1, value: 1 }
            ],
            dur: '2s'
        });
        const markup = svg.toString();
        expect(markup).toContain('values="1;0;1"');
        expect(markup).toContain('keyTimes="0;0.5;1"');
        expect(markup).toContain('dur="2s"');
    });
});
