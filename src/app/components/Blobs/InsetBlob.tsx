import {
  BlobPoint,
  BlobPolygon,
  generatePolyBlob,
  generateSmoothPath,
} from '@/app/utilities/blobFunctions'
import { Blob } from './Blob'

export function InsetBlob(props: { polyBlob: BlobPolygon; inForeground?: boolean }) {
  const inForeground = props.inForeground === undefined ? true : props.inForeground

  return (
    <div
      className={`relative size-full ${inForeground && 'bg-middle'}`}
      style={inForeground ? { clipPath: 'inset(1px)' } : {}}
    >
      <Blob
        points={props.polyBlob.points}
        position={inForeground ? 'top' : 'middle'}
        inset={inForeground}
        className="z-10"
        type="poly"
      ></Blob>
    </div>
  )
}
