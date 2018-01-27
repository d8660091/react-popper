import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Popper from 'popper.js'
import _ from 'lodash'

import * as rc from 'recompose'

const enhance = rc.compose(
  rc.setDisplayName('Popper'),
  rc.setPropTypes({
    renderRef: PropTypes.any.isRequired,
    children: PropTypes.any.isRequired,
    options: PropTypes.object
  }),
  rc.withState('reference', 'setReference', null),
  rc.withState('pop', 'setPop', null),
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
    {
      isOpened: false
    },
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
      if (props.reference) {
        const isInsidePop = props.pop && props.pop.contains(e.target)
        if (!props.reference.contains(e.target) && !isInsidePop) {
          // click outside
          props.close()
          return
        }
      }
    }
  }),
  rc.lifecycle({
    componentWillMount() {
      document.addEventListener('mousedown', this.props.onClick)
    },
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.props.onClick)
    }
  })
)

export default enhance(props => (
  <React.Fragment>
    {props.renderRef({ ...props })}
    {props.isOpened &&
      ReactDOM.createPortal(
        <div ref={props.setPop}>{props.children}</div>,
        document.body
      )}
  </React.Fragment>
))
