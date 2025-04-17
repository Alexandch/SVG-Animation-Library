export interface Keyframe {
  offset: number; // Between 0 and 1 (e.g., 0.5 for 50%)
  value: string | number; // Value at this keyframe (e.g., "20" for radius)
}

export interface MotionPath {
  path: string; // SVG path data (e.g., "M10 10 H 90 V 90 H 10 Z")
  align?: boolean; // Align element to path (true/false)
  rotate?: 'auto' | number; // Rotate along path ("auto" or angle in degrees)
}

export interface AnimationOptions {
  attribute: string;
  from?: string | number; // Optional if keyframes are used
  to?: string | number;   // Optional if keyframes are used
  dur: string;
  repeatCount?: string;
  type?: 'rotate' | 'scale' | 'translate';
  begin?: string;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'cubic-bezier(0.1, 0.7, 1.0, 0.1)';
  keyframes?: Keyframe[]; // Array of keyframes for complex animations
  motionPath?: MotionPath; // Animation along a path
}