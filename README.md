# React Popper

The best React popper based on [popper.js](https://github.com/FezVrasta/popper.js) and [React 16](https://reactjs.org/blog/2017/09/26/react-v16.0.html)

**Features**:
* Easy to use, check the usage below.
* React to props change, rerender the popper when options change.
* Nesting, popper inside popper, so one can use two popup windows for _mouseenter_ and _onclick_ event separtely

## Usage

``` jsx
<div>
  <Popper
    renderRef={({ setReference, toggle }) => (
      <span ref={setReference} onClick={toggle}>
        Popover Trigger
      </span>
    )}>
    <div>Popper content</div>
  </Popper>
</div>
```

[**Storybook**](https://d8660091.github.io/react-popper/) - More usages, including specifying options, styles and nesting. You can also play with the compoennts by live editting the options and placements.


