import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'

import {
  withKnobs,
  text,
  boolean,
  number,
  object,
  select
} from '@storybook/addon-knobs/react'

/* import Popper from '@d8660091/react-popper'*/
import Popper from '../src/index'

const placementOptions = {
  top: 'Top',
  buttom: 'Buttom',
  left: 'Left',
  right: 'Right'
}

storiesOf('Popper', module)
  .addDecorator(withKnobs)
  .add(
    'Minimal',
    withInfo()(() => (
      <div>
        <Popper
          renderRef={({ setReference, toggle }) => (
            <span
              ref={setReference}
              onClick={toggle}
              style={{
                position: 'relative',
                left: `${number('x-position', 0, {
                  range: true,
                  min: 0,
                  max: 99,
                  step: 1
                })}vw`,
                top: `${number('y-position', 0, {
                  range: true,
                  min: 0,
                  max: 99,
                  step: 1
                })}vh`
              }}>
              Minimal Popover
            </span>
          )}>
          <div>Popper content</div>
        </Popper>
      </div>
    ))
  )
  .add(
    'Simple',
    withInfo()(() => (
      <div>
        <Popper
          renderRef={({ setReference, toggle }) => (
            <span
              ref={setReference}
              onClick={toggle}
              style={{
                display: 'inline-block',
                margin: '10px 3px 10px 3px',
                padding: 10,
                borderRadius: '.3rem',
                backgroundColor: '#6c757d',
                color: '#fff',
                cursor: 'pointer',
                position: 'relative',
                left: `${number('x-position', 0, {
                  range: true,
                  min: 0,
                  max: 99,
                  step: 1
                })}vw`,
                top: `${number('y-position', 0, {
                  range: true,
                  min: 0,
                  max: 99,
                  step: 1
                })}vh`
              }}>
              Simple Popover
            </span>
          )}
          options={object('popper options', {
            placement: 'top',
            modifiers: {
              offset: {
                offset: '5, 5'
              }
            }
          })}>
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '.3rem',
              border: '1px solid rgba(0,0,0,.2)',
              padding: '8px 12px',
              marginLeft: '5px'
            }}>
            And here's some amazing content. It's very engaging. Right?
          </div>
        </Popper>
      </div>
    ))
  )
  .add(
    'Nested',
    withInfo()(() => (
      <div>
        <Popper
          options={object('Outter popper(hover) options', {
            placement: 'right',
            modifiers: {
              offset: {
                offset: '0'
              }
            }
          })}
          renderRef={({ setReference, open, close, isOpened }) => (
            <Popper
              options={object('Inner popper(click) options', {
                placement: 'bottom',
                modifiers: {
                  offset: {
                    offset: '5, 5'
                  }
                }
              })}
              renderRef={({
                setReference: setInnerReference,
                toggle: innerToggle,
                isOpened: isInnerOpened
              }) => (
                <span
                  ref={el => {
                    setReference(el)
                    setInnerReference(el)
                  }}
                  onClick={() => {
                    action('Inner poper clicked')()
                    close()
                    innerToggle()
                  }}
                  onMouseEnter={() => {
                    action('Outter poper entered')()
                    !isInnerOpened && open()
                  }}
                  onMouseLeave={() => {
                    action('Outter poper left')()
                    close()
                  }}
                  style={{
                    display: 'inline-block',
                    margin: '10px 3px 10px 3px',
                    padding: 10,
                    borderRadius: '.3rem',
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    cursor: 'pointer',
                    position: 'relative',
                    left: `${number('x-position', 0, {
                      range: true,
                      min: 0,
                      max: 99,
                      step: 1
                    })}vw`,
                    top: `${number('y-position', 0, {
                      range: true,
                      min: 0,
                      max: 99,
                      step: 1
                    })}vh`
                  }}>
                  Nested popover
                </span>
              )}
              canClickOutside={boolean('Inner poppper canClickOutside', false)}>
              <PopContainer style={{ backgroundColor: '#ccc' }}>
                On click content. It's very engaging. Right?
              </PopContainer>
            </Popper>
          )}>
          <PopContainer>
            On hover content. It's very engaging. Right?
          </PopContainer>
        </Popper>
        <br />
      </div>
    ))
  )
  .add(
    'Can click outside',
    withInfo()(() => (
      <div>
        <Popper
          canClickOutside={boolean('canClickOutside', true)}
          renderRef={({ setReference, toggle }) => (
            <span
              ref={setReference}
              onClick={toggle}
              style={{
                position: 'relative',
                left: `${number('x-position', 0, {
                  range: true,
                  min: 0,
                  max: 99,
                  step: 1
                })}vw`,
                top: `${number('y-position', 0, {
                  range: true,
                  min: 0,
                  max: 99,
                  step: 1
                })}vh`
              }}>
              Minimal Popover
            </span>
          )}>
          <div>Popper content</div>
        </Popper>
      </div>
    ))
  )

const PopContainer = ({ children, style }) => (
  <div
    style={{
      backgroundColor: '#fff',
      borderRadius: '.3rem',
      border: '1px solid rgba(0,0,0,.2)',
      padding: '8px 12px',
      marginLeft: '5px',
      ...style
    }}>
    {children}
  </div>
)

const Arrow = () => (
  <div
    x-arrow="true"
    style={{
      borderWidth: '5px 5px 5px 0',
      borderColor: 'rgba(0,0,0,.2)',
      borderLeftColor: 'transparent',
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      left: '-5px',
      top: 'calc(50% - 5px)',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      position: 'absolute',
      margin: 5,
      marginLeft: 0,
      marginRight: 0
    }}
  />
)
