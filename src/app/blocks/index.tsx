import { Page, WavySection } from '@/payload-types'
import WavySectionBlock from './WavySection/Component'
import TextContentBlock from './TextContent/Component'
import ImageContentBlock from './ImageContent/Component'
import ShowcaseWavySectionBlock from './ShowcaseWavySection/Component'

const blockComponents = {
  'wavy-section': WavySectionBlock,
  'text-content': TextContentBlock,
  'image-content': ImageContentBlock,
  'showcase-wavy-section': ShowcaseWavySectionBlock,
}

export const RenderBlocks: React.FC<{
  blocks:
    | Page['pageContent']
    | WavySection['content']
    | WavySection['columnOneContent']
    | WavySection['columnTwoContent']
  className?: string
  inForeground?: boolean
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              if (blockType === 'image-content') {
                return (
                  <div key={index} className={props.className || ''}>
                    <ImageContentBlock
                      block={block}
                      inForeground={props.inForeground}
                    ></ImageContentBlock>
                  </div>
                )
              }
              if (blockType === 'text-content') {
                return (
                  <div key={index} className={props.className || ''}>
                    <TextContentBlock
                      block={block}
                      inForeground={props.inForeground}
                    ></TextContentBlock>
                  </div>
                )
              }

              return (
                <div key={index} className={props.className || ''}>
                  {/* @ts-expect-error blockname not set */}
                  <Block {...block}></Block>
                </div>
              )
            }

            return null
          }
        })}
      </>
    )
  }

  return null
}
