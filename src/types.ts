export interface AnimationOptions {
    attribute: string;
    from: string | number;
    to: string | number;
    dur: string;
    repeatCount?: string;
    type?: 'rotate' | 'scale' | 'translate'; // Добавляем новые типы
    begin?: string; // Задержка перед началом анимации (например, "1s")
  }