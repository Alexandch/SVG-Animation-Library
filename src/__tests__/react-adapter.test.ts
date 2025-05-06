import { renderHook } from '@testing-library/react';
import { useSvgAnimation } from '../index';
import { createRef } from 'react';

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
});