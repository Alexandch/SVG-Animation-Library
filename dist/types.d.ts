export interface AnimationOptions {
    attribute: string;
    from: string | number;
    to: string | number;
    dur: string;
    repeatCount?: string;
    type?: 'rotate' | 'scale' | 'translate';
    begin?: string;
}
