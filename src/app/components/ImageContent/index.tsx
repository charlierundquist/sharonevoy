import { ImageContent } from '@/payload-types'
import { CMSImage } from '../CMSImage'
import { InsetBlob } from '../Blobs/InsetBlob'
import { generatePolyBlob } from '@/app/utilities/blobFunctions'

export default function ImageContentComponent(props: {
  block: ImageContent
  inForeground?: boolean
}) {
  const blob = generatePolyBlob(7, 40, 50, {
    x: 50,
    y: 50,
    position: 'fixed',
  })

  const image = props.block.image
  let aspectRatio = '1 / 1'
  if (typeof image !== 'number') {
    const imageWidth = image.width || 1
    const imageHeight = image.height || 1

    aspectRatio = imageWidth + ' / ' + imageHeight
  }

  return (
    <div className="image-content relative col-[image-start/image-end] max-h-screen">
      <div
        className="absolute h-full scale-110 left-1/2 -translate-x-1/2"
        style={{ aspectRatio: aspectRatio }}
      >
        <InsetBlob polyBlob={blob} inForeground={props.inForeground}></InsetBlob>
      </div>
      {typeof props.block.image !== 'number' && (
        <CMSImage resource={props.block.image} pictureClassName="scale-90 z-20 mx-auto"></CMSImage>
      )}
    </div>
  )
}
