import TextContentComponent from '@/app/components/TextContent'
import { TextContent } from '@/payload-types'

export default function TextContentBlock(props: { block: TextContent; inForeground?: boolean }) {
  return (
    <TextContentComponent
      block={props.block}
      inForeground={props.inForeground}
    ></TextContentComponent>
  )
}
