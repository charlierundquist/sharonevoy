import { BlobPoint, generateSmoothPath } from '@/app/utilities/blobFunctions'

export function Blob({
  points,
  position,
  className,
  width = 100,
  height = 100,
  inset = false,
  debug = false,
  type,
}: {
  points: BlobPoint[]
  position: 'top' | 'middle' | 'bottom'
  className?: string
  width?: number
  height?: number
  inset?: boolean
  debug?: boolean
  type?: 'wave' | 'poly'
}) {
  const maskID = points[0]?.x?.toString() || 'svgMask'
  const zIndex = position === 'bottom' ? -30 : position === 'middle' ? -20 : -10
  const duration = 2 + Math.random() * 4
  const randomSeed = Math.random()
  let origin = 'center'
  if (type === 'wave' && randomSeed < 1 / 3) {
    origin = 'left'
  }
  if (type === 'wave' && randomSeed > 2 / 3) {
    origin = 'right'
  }

  let animationString = ''
  if (type === 'wave') {
    animationString = `waveAnimation ${duration}s ease-in-out infinite alternate both`
  }
  // if (type === 'poly') {
  //   animationString = `polyAnimation ${duration}s ease-in-out infinite alternate both`
  // }

  return (
    <svg
      className={`${className} absolute select-none`}
      width={width + '%'}
      height={height + '%'}
      viewBox={'0 0 100 100'}
      preserveAspectRatio="none"
      version="1.1"
      style={{
        fillRule: 'nonzero',
        clipRule: 'nonzero',
        strokeLinejoin: 'round',
        strokeMiterlimit: '2',
        filter: 'drop-shadow(0px 4px 16px var(--clr-dropshadow))',
        zIndex: zIndex,
        animation: animationString,
        transformOrigin: origin + ' center',
      }}
    >
      {!inset && (
        <path
          d={generateSmoothPath(points.concat(points), 1)}
          style={{
            fill: 'var(--clr-' + position + ')',
            transition: '1s',
          }}
        />
      )}
      {inset && (
        <>
          <mask id={maskID}>
            <rect x={0} y={0} width={width} height={height} fill="white"></rect>
            <path
              d={generateSmoothPath(points.concat(points), 1)}
              fill="black"
              style={{ transition: '1s' }}
            ></path>
          </mask>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={'var(--clr-' + position + ')'}
            mask={'url(#' + maskID + ')'}
          ></rect>
        </>
      )}
      {debug &&
        points.map((point, i) => {
          return (
            <g key={i}>
              <circle cx={point.x} cy={point.y} r={1}></circle>
              <text x={point.x} y={point.y} style={{ fontSize: '0.25rem', fill: 'white' }}>
                {Math.floor(point.x) + ', ' + Math.floor(point.y)}
              </text>
            </g>
          )
        })}
    </svg>
  )
}
