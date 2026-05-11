import ImageContentComponent from '@/app/components/ImageContent'
import { ImageContent } from '@/payload-types'

export default function ImageContentBlock(props: { block: ImageContent; inForeground?: boolean }) {
  return (
    <ImageContentComponent
      block={props.block}
      inForeground={props.inForeground}
    ></ImageContentComponent>
  )
}
