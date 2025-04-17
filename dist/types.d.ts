export interface Keyframe {
    offset: number;
    value: string | number;
}
export interface MotionPath {
    path: string;
    align?: boolean;
    rotate?: 'auto' | number;
}
export interface AnimationOptions {
    attribute: string;
    from?: string | number;
    to?: string | number;
    dur: string;
    repeatCount?: string;
    type?: 'rotate' | 'scale' | 'translate';
    begin?: string;
    easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'cubic-bezier(0.1, 0.7, 1.0, 0.1)';
    keyframes?: Keyframe[];
    motionPath?: MotionPath;
}
