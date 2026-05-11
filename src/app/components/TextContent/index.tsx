import { TextContent } from '@/payload-types'
import { RichText } from '../RichText'
import { DisplayLinks } from '../CMSLink/DisplayLinks'

export default function TextContentComponent(props: {
  block: TextContent
  inForeground?: boolean
}) {
  return (
    <div
      className={`text-content grid gap-4 my-8 ${!props.inForeground && 'text-white'} col-[text-start/text-end]`}
    >
      <h3 className="w-fit">{props.block.title}</h3>
      {props.block.richText && (
        <RichText data={props.block.richText} className="leading-7"></RichText>
      )}
      {props.block.links && (
        <DisplayLinks links={props.block.links} inForeground={props.inForeground}></DisplayLinks>
      )}
    </div>
  )
}
