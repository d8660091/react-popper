import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Popper from 'popper.js'

import * as rc from 'recompose'

const enhance = rc.compose(
  rc.setDisplayName('Popper'),
  rc.setPropTypes({
    renderRef: PropTypes.any.isRequired,
    renderPop: PropTypes.func,
    children: PropTypes.any,
    options: PropTypes.object,
    defaultIsOpened: PropTypes.bool,
    canClickOutside: PropTypes.bool
  }),
  rc.withStateHandlers(
    {
      reference: null
    },
    {
      setReference: () => reference => {
        if (reference) {
          return {
            reference
          }
        }
      }
    }
  ),
  rc.withStateHandlers(
    {
      pop: null,
      popper: null
    },
    {
      setPop: ({ popper: prevPopper }, props) => pop => {
        if (prevPopper) {
          prevPopper.destroy()
        }
        const popper = pop
          ? new Popper(props.reference, pop, props.options)
          : null
        return { pop, popper }
      }
    }
  ),
  rc.withStateHandlers(
    ({ defaultIsOpened = false }) => ({
      isOpened: defaultIsOpened
    }),
    {
      open: (_, props) => () => {
        return {
          isOpened: true
        }
      },
      close: () => () => ({
        isOpened: false
      }),
      toggle: ({ isOpened }, props) => () => {
        return {
          isOpened: !isOpened
        }
      }
    }
  ),
  rc.withHandlers({
    onClick: props => e => {
      if (
        props.reference &&
        !props.canClickOutside &&
        !e.canBeIgnoredByReactPopper
      ) {
        const isInsidePop = props.pop && props.pop.contains(e.target)
        if (!props.reference.contains(e.target) && !isInsidePop) {
          // click outside
          props.close()
        }
      }
    }
  }),
  rc.lifecycle({
    componentDidUpdate() {
      if (this.props.popper) {
        this.props.popper.scheduleUpdate()
      }
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.options != nextProps.options && this.props.pop) {
        this.props.setPop(this.props.pop)
      }
    },
    componentWillMount() {
      document.addEventListener('mousedown', this.props.onClick)
    },
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.props.onClick)
      if (this.props.popper) {
        this.props.popper.destroy()
      }
    }
  })
)

export default enhance(props => (
  <React.Fragment>
    {props.renderRef({ ...props })}
    {props.isOpened &&
      ReactDOM.createPortal(
        props.renderPop ? (
          props.renderPop({ ...props })
        ) : (
          <div
            ref={props.setPop}
            style={props.style}
            className={props.className}>
            {props.children}
          </div>
        ),
        document.body
      )}
  </React.Fragment>
))

export const ClickableArea = props => (
  <div ref={el => el && el.addEventListener('mousedown', ignoreEvent)}>
    {props.children}
  </div>
)

function ignoreEvent(e) {
  e.canBeIgnoredByReactPopper = true
}
