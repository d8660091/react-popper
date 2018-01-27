import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import Popper from '../src/index.js'

storiesOf('Popper', module)
  .add(
    'On right',
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
                cursor: 'pointer'
              }}>
              Popover Right
            </span>
          )}
          options={{
            placement: 'right'
          }}>
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
        </Popper>
        <br />
      </div>
    ))
  )
  .add(
    'On top',
    withInfo()(() => (
      <Popper
        renderRef={({ setReference, toggle }) => (
          <span
            ref={setReference}
            onClick={toggle}
            style={{
              display: 'inline-block',
              margin: '100px 3px 10px 3px',
              padding: 10,
              borderRadius: '.3rem',
              backgroundColor: '#6c757d',
              color: '#fff',
              cursor: 'pointer'
            }}>
            Popover Top
          </span>
        )}
        options={{
          placement: 'top',
          modifiers: {
            offset: {
              offset: '5, 5'
            }
          }
        }}>
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
    ))
  )
