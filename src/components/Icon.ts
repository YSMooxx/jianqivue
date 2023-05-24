// ICON.js
import { createVNode } from 'vue'
import * as $Icon from '@ant-design/icons-vue'

const Icon = (props: any) => {
  const { icon } = props
  // @ts-ignore
  return createVNode($Icon[icon])
}

export const IconSvg = (props: any) => {}
export default Icon
