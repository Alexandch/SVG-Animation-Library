import { useEffect, useRef } from 'react';
import { SVG } from './svg'; 
import { SVGElement } from './elements';
import { AnimationConfig } from './types'; // Импортируем AnimationConfig вместо AnimationOptions

export function useSvgAnimation(ref: React.RefObject<SVGSVGElement>, options: {
  width: number;
  height: number;
  elements: Array<{
    type: 'circle' | 'rect' | 'line' | 'path';
    attributes: Record<string, string | number>;
    animations?: AnimationConfig[]; // Изменяем на AnimationConfig[]
  }>;
}) {
  const svgRef = useRef<SVG | null>(null);

  useEffect(() => {
    if (ref.current) {
      // Initialize SVG instance
      svgRef.current = new SVG({ width: options.width, height: options.height });

      // Create elements and apply animations
      options.elements.forEach(element => {
        let svgElement: SVGElement;
        switch (element.type) {
          case 'circle':
            svgElement = svgRef.current!.circle(element.attributes);
            break;
          case 'rect':
            svgElement = svgRef.current!.rect(element.attributes);
            break;
          case 'line':
            svgElement = svgRef.current!.line(element.attributes);
            break;
          case 'path':
            svgElement = svgRef.current!.path(element.attributes);
            break;
          default:
            throw new Error(`Unsupported element type: ${element.type}`);
        }

        if (element.animations) {
          element.animations.forEach(animation => {
            svgRef.current!.animateChild(svgElement, animation);
          });
        }
      });

      // Render SVG to DOM
      const svgMarkup = svgRef.current.toString();
      ref.current.innerHTML = svgMarkup;
    }

    return () => {
      // Cleanup if needed
      if (ref.current) {
        ref.current.innerHTML = '';
      }
    };
  }, [ref, options]);

  return svgRef.current;
}