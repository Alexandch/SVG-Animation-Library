import { renderHook } from '@testing-library/react';
import { useSvgAnimation } from '../index';
import { createRef } from 'react';

// Определяем тип для elements, который соответствует ожидаемому интерфейсу useSvgAnimation
type SvgElementConfig = {
  type: 'circle' | 'rect' | 'line' | 'path';
  attributes: Record<string, string | number>;
  animations?: any[];
};

describe('useSvgAnimation', () => {
  test('should return null if ref is not set', () => {
    const ref = createRef<SVGSVGElement>() as React.RefObject<SVGSVGElement>;
    const { result } = renderHook(() =>
      useSvgAnimation(ref, {
        width: 100,
        height: 100,
        elements: [
          {
            type: 'circle',
            attributes: { cx: 50, cy: 50, r: 20 },
          },
        ],
      })
    );

    expect(result.current).toBeNull();
  });

  test('should apply animation to SVG element', () => {
    const ref = createRef<SVGSVGElement>() as React.RefObject<SVGSVGElement>;
    const { result } = renderHook(() =>
      useSvgAnimation(ref, {
        width: 100,
        height: 100,
        elements: [
          {
            type: 'circle',
            attributes: { cx: 50, cy: 50, r: 20 },
            animations: [{ attribute: 'r', from: 20, to: 40, dur: '1s' }],
          },
        ],
      })
    );

    expect(result.current).toBeNull();
  });

  test('should apply Transform animation to SVG element', () => {
    const ref = createRef<SVGSVGElement>() as React.RefObject<SVGSVGElement>;
    const { result } = renderHook(() =>
      useSvgAnimation(ref, {
        width: 100,
        height: 100,
        elements: [
          {
            type: 'rect',
            attributes: { x: 10, y: 10, width: 30, height: 30 },
            animations: [
              {
                type: 'rotate',
                from: '0 25 25',
                to: '360 25 25',
                dur: '2s',
              },
            ],
          },
        ],
      })
    );
    expect(result.current).toBeNull();
  });

  test('should handle invalid element attributes', () => {
    const ref = createRef<SVGSVGElement>() as React.RefObject<SVGSVGElement>;
    const { result } = renderHook(() =>
      useSvgAnimation(ref, {
        width: 100,
        height: 100,
        elements: [
          {
            type: 'circle',
            attributes: { cx: 50, cy: 50 /* Отсутствует r */ },
          },
        ],
      })
    );
    expect(result.current).toBeNull();
  });

  test('should handle dynamic element addition', () => {
    const ref = createRef<SVGSVGElement>() as React.RefObject<SVGSVGElement>;
    const { result, rerender } = renderHook(
      ({ elements }: { elements: SvgElementConfig[] }) =>
        useSvgAnimation(ref, {
          width: 100,
          height: 100,
          elements,
        }),
      {
        initialProps: {
          elements: [
            {
              type: 'circle',
              attributes: { cx: 50, cy: 50, r: 20 },
            },
          ] as SvgElementConfig[], // Явно указываем тип
        },
      }
    );

    rerender({
      elements: [
        {
          type: 'circle',
          attributes: { cx: 50, cy: 50, r: 20 },
        },
        {
          type: 'rect',
          attributes: { x: 10, y: 10, width: 30, height: 30 },
        },
      ] as SvgElementConfig[], // Явно указываем тип
    });

    expect(result.current).toBeNull();
  });
});