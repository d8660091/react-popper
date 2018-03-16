# React Popper

[![CircleCI](https://circleci.com/gh/d8660091/react-popper.svg?style=svg)](https://circleci.com/gh/d8660091/react-popper)
[![npm version](https://badge.fury.io/js/%40d8660091%2Freact-popper.svg)](https://badge.fury.io/js/%40d8660091%2Freact-popper)

React [popper.js](https://github.com/FezVrasta/popper.js) component based on [Portals](https://reactjs.org/docs/portals.html)

**Features**:
* Easy to use, check the usage below.
* React to props change, re-render the popper when options change.
* Nestable, for example, there can be two popup windows respond to _mouseenter_ and _click_ events of a button separately.

[Try it](https://d8660091.github.io/react-popper/)

## Usage

Install with yarn:

``` shell
yarn add @d8660091/react-popper
```

Or npm:

``` shell
npm install @d8660091/react-popper -P
```

Import in your source file:

``` jsx
import Popper from '@d8660091/react-popper'

<Popper
  options={{ 
    placement: 'bottom'
  }}
  renderRef={({ setReference, toggle }) => (
    <span ref={setReference} onClick={toggle}>
      Popover Trigger
    </span>
  )}>
  <div>Popper content</div>
</Popper>
```

Props:

``` typescript
interface PopperProps {
  renderRef: (RenderProps) => ReactNode,
  options?: Object,
  renderPop?: (RenderProps) => ReactNode,
  children?: ReactNode[],
  canClickOutside?: Boolean, // default: false
  style?: Object,
  className?: string,
  defaultIsOpened?: Boolean, // default: false
}

interfcae RenderProps extends PopperProps {
  setReference: (el: HTMLElement) => void,
  setPop: (el: HTMLElement) => void,
  isOpened: boolean,
  open: () => void,
  close: () => void,
  toggle: () => void,
}
```

* options: popper.js [options](https://popper.js.org/popper-documentation.html#defaults).
* renderRef: the function to render reference, i.e, the element used to position the popper.
* children: content inside the popper.
* canClickOutside: if true, popper will not hide itself when users click outside.
* style and className: goes to the popper instead of the reference.
* renderPop: if this function is set, the children, style and className will be ignored and the popper will be rendered using this function.
* defaultIsOpened: whether open popper when it mounts

## ClickableArea
You can click ClickableArea without closing popper, which is useful when you have an interactable Popper rendered by another parent Popper.

``` jsx
import { ClickableArea } from '@d8660091/react-popper'

<ClickableArea>
  clickable text
</ClickableArea>
```


[**Storybook**](https://d8660091.github.io/react-popper/) - More usages, including specifying options, styles and nesting. You can also play with the components by live editing the options and placements.


