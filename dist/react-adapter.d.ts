/// <reference types="react" />
import { SVG } from './svg';
import { AnimationConfig } from './types';
export declare function useSvgAnimation(ref: React.RefObject<SVGSVGElement>, options: {
    width: number;
    height: number;
    elements: Array<{
        type: 'circle' | 'rect' | 'line' | 'path';
        attributes: Record<string, string | number>;
        animations?: AnimationConfig[];
    }>;
}): SVG | null;
