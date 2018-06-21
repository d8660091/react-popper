declare module '@d8660091/react-popper' {
  import { PopperOptions } from 'popper.js'
  import * as React from 'react'

  interface RenderProps extends PopperProps {
    setReference: React.Ref<HTMLElement>
    setPop: (el: HTMLElement) => void
    isOpened: boolean
    open: () => void
    close: () => void
    toggle: () => void
  }

  type PopperProps = {
    renderRef: (props: RenderProps) => React.ReactElement<any>
    renderPop?: (props: RenderProps) => React.ReactElement<any>
    options?: PopperOptions
    children?: React.ReactNode
    canClickOutside?: Boolean // default: false
    style?: Object
    className?: string
    defaultIsOpened?: Boolean // default: false
  }

  const Popper: React.ComponentClass<PopperProps>

  export default Popper
}
