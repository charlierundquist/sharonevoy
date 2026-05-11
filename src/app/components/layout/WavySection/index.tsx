import { newWaveBlobs, WaveBlobsObject } from '@/app/utilities/blobFunctions'
import { Blob } from '../../Blobs/Blob'
import { WavySection } from '@/payload-types'
import { RenderBlocks } from '@/app/blocks'
import { CMSImage } from '../../CMSImage'

export default function WavySectionComponent(props: WavySection) {
  const blobs = newWaveBlobs()
  const renderWaves = props.depth === 'foreground'
  const isTwoCol = props.layout === 'twoColumn'
  const hasHighlightImage = props.highlightImage && renderWaves
  const highlightImageResource = props.highlightImage || 0

  return (
    <div
      className={`grid ${'section-' + props.depth} group/${props.depth} relative overflow-x-clip`}
      style={{
        gridTemplateRows: renderWaves ? `var(--wave-height) 1fr var(--wave-height)` : '1fr',
      }}
    >
      {renderWaves && <TopWaves blobs={blobs}></TopWaves>}

      <div
        className={`min-h-128 ${renderWaves ? 'bg-top outline-top outline-4' : 'bg-transparent'}`}
      >
        <div className={hasHighlightImage ? '-mt-[calc(var(--wave-height)/2)]' : ''}>
          {hasHighlightImage && (
            <div
              className="max-w-prose w-[95vw] mx-auto mb-16"
              style={{ filter: 'drop-shadow(0px 4px 16px var(--clr-dropshadow))' }}
            >
              <CMSImage resource={highlightImageResource} pictureClassName="mx-auto"></CMSImage>
            </div>
          )}
          <div
            className={`grid mx-auto min-h-fit gap-16 grid-cols-1 max-w-(--prose) ${isTwoCol && 'lg:grid-cols-2 lg:max-w-full'}`}
          >
            {isTwoCol && (
              <>
                <div className="column-one h-fit my-auto flex flex-col gap-8">
                  <RenderBlocks
                    blocks={props.columnOneContent}
                    className="lg:grid lg:grid-cols-(--content-left-cols)"
                    inForeground={renderWaves}
                  ></RenderBlocks>
                </div>
                <div className="column-two h-fit my-auto flex flex-col gap-8">
                  <RenderBlocks
                    blocks={props.columnTwoContent}
                    className="lg:grid lg:grid-cols-(--content-right-cols)"
                    inForeground={renderWaves}
                  ></RenderBlocks>
                </div>
              </>
            )}
            {!isTwoCol && (
              <RenderBlocks
                blocks={props.content}
                className="h-fit my-auto"
                inForeground={renderWaves}
              ></RenderBlocks>
            )}
          </div>
        </div>
      </div>

      {renderWaves && <BottomWaves blobs={blobs}></BottomWaves>}
    </div>
  )
}

function TopWaves(props: { blobs: WaveBlobsObject }) {
  return (
    <div className="relative">
      <Blob points={props.blobs.uB.points} position={'bottom'} type="wave"></Blob>
      <Blob points={props.blobs.uM.points} position={'middle'} type="wave"></Blob>
      <Blob points={props.blobs.uT.points} position={'top'} type="wave"></Blob>
    </div>
  )
}

function BottomWaves(props: { blobs: WaveBlobsObject }) {
  return (
    <div className="relative">
      <Blob points={props.blobs.lB.points} position={'bottom'} type="wave"></Blob>
      <Blob points={props.blobs.lM.points} position={'middle'} type="wave"></Blob>
      <Blob points={props.blobs.lT.points} position={'top'} type="wave"></Blob>
    </div>
  )
}
