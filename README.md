# React Popper

The best React popper based on [popper.js](https://github.com/FezVrasta/popper.js) and [React 16](https://reactjs.org/blog/2017/09/26/react-v16.0.html)

https://www.useloom.com/share/554e9841739b444b8a53d87e9534d115

**Features**:
* Easy to use, check the usage below.
* React to props change, re-render the popper when options change.
* Nesting, popper inside popper, so one can use two popup windows for _mouseenter_ and _click_ events separately.

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
  renderRef={({ setReference, toggle }) => (
    <span ref={setReference} onClick={toggle}>
      Popover Trigger
    </span>
  )}>
  <div>Popper content</div>
</Popper>
```

[**Storybook**](https://d8660091.github.io/react-popper/) - More usages, including specifying options, styles and nesting. You can also play with the components by live editing the options and placements.


