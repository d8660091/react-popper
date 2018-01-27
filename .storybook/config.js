import { configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'

setOptions({
  name: '@d8660091/react-popper',
  url: 'https://github.com/d8660091/react-popper'
})

function loadStories() {
  require('./index.js')
}

configure(loadStories, module)
