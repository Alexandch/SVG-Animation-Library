# Библиотека для создания анимированных SVG

## Описание проекта
Данная библиотека разработана для упрощения создания анимированных SVG-графиков. Она написана на **TypeScript** и предоставляет разработчикам удобный API для создания и настройки анимаций SVG-элементов. Библиотека поддерживает:
- Интеграцию с популярными фреймворками (React, Vue, Angular и др.) через npm.
- Использование в качестве плагина для VS Code, упрощающего работу с анимациями в редакторе кода.

Цель проекта — создать универсальный инструмент для разработчиков, который можно легко подключить к любому проекту и использовать для создания динамичной графики.

## Автор
- **Имя: Александр**
- **Номер группы: 353504**

## Диаграмма классов
## Диаграмма классов

```mermaid
classDiagram
    class CustomSVGElement {
        -tagName: string
        -attributes: Record<string, string>
        -children: CustomSVGElement[]
        -element: SVGElement | null
        -textContent: string | null
        +getChildren() CustomSVGElement[]
        +add(child: CustomSVGElement) this
        +removeChild(child: CustomSVGElement) this
        +getTagName() string
        +setElement(element: SVGElement) void
        +getElement() SVGElement | null
        +setAttribute(key: string, value: string) void
        +getAttribute(key: string) string | undefined
        +setTextContent(content: string) void
        +getTextContent() string | null
        +toString() string
    }

    class SVG {
        -timelineInstance: Timeline
        +circle(attributes) Circle
        +rect(attributes) Rect
        +line(attributes) Line
        +path(attributes) Path
        +linearGradient(attributes) LinearGradient
        +stop(attributes) Stop
        +filter(attributes) Filter
        +feGaussianBlur(attributes) FeGaussianBlur
        +feTurbulence(attributes) FeTurbulence
        +text(attributes, textContent) Text
        +clipPath(attributes) ClipPath
        +animate(options) CustomSVGElement
        +animateChild(element, options) CustomSVGElement
        +timeline(options) void
        +stopAnimations() void
    }

    class Circle {
        +animate(options) CustomSVGElement
    }

    class Rect {
        +animate(options) CustomSVGElement
    }

    class Line {
        +animate(options) CustomSVGElement
    }

    class Path {
        +animate(options) CustomSVGElement
    }

    class LinearGradient {
        +animate(options) CustomSVGElement
    }

    class Stop {
        +animate(options) CustomSVGElement
    }

    class Filter {
        +animate(options) CustomSVGElement
    }

    class FeGaussianBlur {
        +animate(options) CustomSVGElement
    }

    class FeTurbulence {
        +animate(options) CustomSVGElement
    }

    class Text {
        +animate(options) CustomSVGElement
    }

    class ClipPath {
        +animate(options) CustomSVGElement
    }

    class Timeline {
        -groups: Map<string, AnimationGroup>
        +addGroup(options) string
        +stopAll() void
    }

    CustomSVGElement <|-- SVG
    CustomSVGElement <|-- Circle
    CustomSVGElement <|-- Rect
    CustomSVGElement <|-- Line
    CustomSVGElement <|-- Path
    CustomSVGElement <|-- LinearGradient
    CustomSVGElement <|-- Stop
    CustomSVGElement <|-- Filter
    CustomSVGElement <|-- FeGaussianBlur
    CustomSVGElement <|-- FeTurbulence
    CustomSVGElement <|-- Text
    CustomSVGElement <|-- ClipPath
    SVG --> Timeline : uses

## Функции библиотеки

1. **Создание анимированных SVG-элементов**
   - **Описание:** Позволяет создавать SVG-элементы (круги, линии, прямоугольники и т.д.) с заданными анимациями (перемещение, вращение, масштабирование).
   - **Пример использования:**
     ```typescript
     import { SVGAnimation } from 'animated-svg-lib';
     const svgLib = new SVGAnimation();
     svgLib.createElement('circle', { cx: 50, cy: 50, r: 20 })
     .animate({ type: 'move', x: 100, duration: 1000 });
2. **Настройка анимаций**
   - **Описание:** Предоставляет API для настройки параметров анимации: длительность, задержка, тип перехода (easing), повторение и т.д.
   - **Пример использования:**
     ```typescript
     svgLib.animateElement('circle', {
     duration: 2000,
     delay: 500,
     easing: 'ease-in-out',
     repeat: true
     });
3. **Интеграция с фреймворками**
   - **Описание:** Библиотека публикуется как npm-пакет и поддерживает использование в проектах на React, Vue, Angular и других фреймворках.
   - **Пример использования(React):**
     ```typescript
     import { SVGAnimation } from 'animated-svg-lib';
     import React from 'react';
     const AnimatedCircle: React.FC = () => {
     const svg = new SVGAnimation();
     svg.createElement('circle', { cx: 50, cy: 50, r: 20 })
     .animate({ type: 'rotate', duration: 1500 });
     return <div dangerouslySetInnerHTML={{ __html: svg.render() }} />;
     };
     export default AnimatedCircle;
4. **Плагин для VS Code**
   - **Описание:** Расширение для VS Code, которое добавляет автодополнение и предварительный просмотр анимаций прямо в редакторе.
   - **Пример использования:** После установки плагина в VS Code, при написании кода библиотеки появляется подсказка с параметрами анимации и визуальный предпросмотр.

## Модели данных

**SVGElementModel**
 - **Описание:** Модель для представления SVG-элемента, определенная с использованием интерфейсов TypeScript.
 - **Атрибуты:**
  type — тип элемента (circle, rect, line и т.д.).
  attributes — объект с атрибутами элемента (например, { cx: 50, cy: 50, r: 20 } для круга).
  children — массив дочерних элементов (для сложных SVG).

**AnimationModel**
 - **Описание:** Модель для настройки анимации.
 - **Атрибуты:**
  type — тип анимации (move, rotate, scale и т.д.).
  duration — длительность анимации в миллисекундах.
  delay — задержка перед началом анимации.
  easing — тип перехода (linear, ease-in, ease-out и т.д.).
  repeat — булево значение или число повторов.

**FrameworkIntegrationModel**
 - **Описание:** Модель для интеграции с фреймворками.
 - **Атрибуты:**
  framework — название фреймворка (React, Vue и т.д.).
  renderMethod — метод рендеринга SVG в данном фреймворке.

**PluginConfigModel**
- **Описание:** Модель для конфигурации плагина VS Code. Определяет настройки автодополнения и предварительного просмотра.
- **Атрибуты:**
  autoComplete — включение автодополнения для параметров анимации (true/false).
  preview — включение предварительного просмотра анимаций (true/false).
  theme — тема для предварительного просмотра (например, 'light', 'dark').
