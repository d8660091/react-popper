'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _popper = require('popper.js');

var _popper2 = _interopRequireDefault(_popper);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _recompose = require('recompose');

var rc = _interopRequireWildcard(_recompose);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enhance = rc.compose(rc.setDisplayName('Popper'), rc.setPropTypes({
  renderRef: _propTypes2.default.any.isRequired,
  children: _propTypes2.default.any.isRequired,
  options: _propTypes2.default.object
}), rc.withStateHandlers({
  reference: null
}, {
  setReference: function setReference() {
    return function (reference) {
      if (reference) {
        return {
          reference: reference
        };
      }
    };
  }
}), rc.withStateHandlers({
  pop: null,
  popper: null
}, {
  setPop: function setPop(_ref, props) {
    var prevPopper = _ref.popper;
    return function (pop) {
      if (prevPopper) {
        prevPopper.destroy();
      }
      var popper = pop ? new _popper2.default(props.reference, pop, props.options) : null;
      return { pop: pop, popper: popper };
    };
  }
}), rc.withStateHandlers({
  isOpened: false
}, {
  open: function open(_, props) {
    return function () {
      return {
        isOpened: true
      };
    };
  },
  close: function close() {
    return function () {
      return {
        isOpened: false
      };
    };
  },
  toggle: function toggle(_ref2, props) {
    var isOpened = _ref2.isOpened;
    return function () {
      return {
        isOpened: !isOpened
      };
    };
  }
}), rc.withHandlers({
  onClick: function onClick(props) {
    return function (e) {
      if (props.reference) {
        var isInsidePop = props.pop && props.pop.contains(e.target);
        if (!props.reference.contains(e.target) && !isInsidePop) {
          // click outside
          props.close();
          return;
        }
      }
    };
  }
}), rc.lifecycle({
  componentDidUpdate: function componentDidUpdate() {
    if (this.props.popper) {
      this.props.popper.scheduleUpdate();
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.options != nextProps.options && this.props.pop) {
      this.props.setPop(this.props.pop);
    }
  },
  componentWillMount: function componentWillMount() {
    document.addEventListener('mousedown', this.props.onClick);
  },
  componentWillUnmount: function componentWillUnmount() {
    document.removeEventListener('mousedown', this.props.onClick);
  }
}));

exports.default = enhance(function (props) {
  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    props.renderRef(_extends({}, props)),
    props.isOpened && _reactDom2.default.createPortal(_react2.default.createElement(
      'div',
      { ref: props.setPop },
      props.children
    ), document.body)
  );
});