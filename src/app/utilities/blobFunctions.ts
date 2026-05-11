export type BlobPointPosition =
  | 'fixed'
  | 'topleft'
  | 'top'
  | 'topright'
  | 'right'
  | 'bottomright'
  | 'bottom'
  | 'bottomleft'
  | 'left'

export type BlobPoint = {
  x: number
  y: number
  position: BlobPointPosition
  radius?: number
}

export type BlobPolygon = {
  sides: number
  rot: number
  points: BlobPoint[]
  minRadius: number
  maxRadius: number
  centerPoint: BlobPoint
  yMod: number
  xMod: number
}

export type WaveBlob = {
  waveCount: number
  points: BlobPoint[]
  isInverted: boolean
}

export type WaveBlobsObject = {
  uT: WaveBlob
  uM: WaveBlob
  uB: WaveBlob
  lT: WaveBlob
  lM: WaveBlob
  lB: WaveBlob
}

export function generateSmoothPath(points: BlobPoint[], k: number) {
  if (k == null) k = 1

  let data: number[] = []
  points.map((point) => {
    data.push(point.x)
    data.push(point.y)
  })
  // data = data.concat(data).slice(0, -3)

  var size = data.length
  var last = size - 4

  var path = 'M' + [data[0], data[1]]

  for (var i = 0; i < size - 2; i += 2) {
    var x0 = i ? data[i - 2] : data[0]
    var y0 = i ? data[i - 1] : data[1]

    var x1 = data[i + 0]
    var y1 = data[i + 1]

    var x2 = data[i + 2]
    var y2 = data[i + 3]

    var x3 = i !== last ? data[i + 4] : x2
    var y3 = i !== last ? data[i + 5] : y2

    var cp1x = x1 + ((x2 - x0) / 6) * k
    var cp1y = y1 + ((y2 - y0) / 6) * k

    var cp2x = x2 - ((x3 - x1) / 6) * k
    var cp2y = y2 - ((y3 - y1) / 6) * k

    path += 'C' + [cp1x, cp1y, cp2x, cp2y, x2, y2]
  }

  //   path += 'Z'

  return path
}

export function generatePolyBlob(
  sides: number,
  minRadius: number,
  maxRadius: number,
  centerPoint: BlobPoint,
  xMod: number = 1,
  yMod: number = 1,
): BlobPolygon {
  let coords: BlobPoint[] = []
  const rot = Math.random() - 0.5
  const theta = (Math.PI * 2) / sides

  for (let i = 0; i < sides; i++) {
    const baseLine = i % 2 === 0 ? minRadius : maxRadius
    const modifier = i % 2 === 0 ? 1 : -1
    const radius = baseLine + modifier * Math.random() * (maxRadius - minRadius)

    coords.push({
      x: centerPoint.x + radius * Math.sin(theta * i + rot * theta * 2) * xMod,
      y: centerPoint.y + radius * Math.cos(theta * i + rot * theta * 2) * yMod,
      position: 'fixed',
      radius: radius,
    })
  }

  return {
    sides: sides,
    rot: rot,
    points: coords,
    minRadius: minRadius,
    maxRadius: maxRadius,
    centerPoint: centerPoint,
    xMod: xMod,
    yMod: yMod,
  }
}

export function scalePolyBlob(
  poly: BlobPolygon,
  radiusIncrease: number,
  wiggle: number = 0,
): BlobPolygon {
  let coords: BlobPoint[] = []
  const rot = poly.rot
  const theta = (Math.PI * 2) / poly.sides

  for (let i = 0; i < poly.points.length; i++) {
    const radius = (poly.points[i].radius || 0) + wiggle + Math.random() * (radiusIncrease - wiggle)

    coords.push({
      x:
        poly.centerPoint.x +
        radius * Math.sin(theta * i + rot * theta * 2) * poly.xMod +
        (Math.random() - 0.5) * wiggle,
      y:
        poly.centerPoint.y +
        radius * Math.cos(theta * i + rot * theta * 2) * poly.yMod +
        (Math.random() - 0.5) * wiggle,
      position: 'fixed',
      radius: radius,
    })
  }

  return {
    sides: poly.sides,
    rot: rot,
    points: coords,
    minRadius: poly.minRadius,
    maxRadius: poly.maxRadius,
    centerPoint: poly.centerPoint,
    xMod: poly.xMod,
    yMod: poly.yMod,
  }
}

export function generateWaveBlob(
  waveCount: number,
  minHeight: number,
  maxHeight: number,
  isInverted: boolean,
): WaveBlob {
  let coords: BlobPoint[] = []
  const waveLength = 100 / waveCount
  const heightDiff = Math.abs(maxHeight - minHeight)
  const baseline = isInverted ? minHeight : 100 - minHeight
  const invertMod = isInverted ? 1 : -1

  for (let i = 0; i <= waveCount + 1; i++) {
    coords.push({
      x: waveLength * (i - 1),
      y: baseline + invertMod * Math.random() * heightDiff + invertMod,
      position: 'fixed',
    })
  }

  coords.push({
    x: 100 + waveLength,
    y: baseline - invertMod * waveLength,
    position: 'fixed',
  })

  coords.push({
    x: waveLength * -1,
    y: baseline - invertMod * waveLength,
    position: 'fixed',
  })

  return {
    waveCount: waveCount,
    points: coords,
    isInverted: isInverted,
  }
}

export function scaleUpWaveBlob(
  wave: WaveBlob,
  minheightIncrease: number,
  maxHeightIncrease: number,
  wiggle: number = 0,
): WaveBlob {
  let coords: BlobPoint[] = []
  const invertMod = wave.isInverted ? 1 : -1
  const increaseDiff = Math.abs(maxHeightIncrease - minheightIncrease)

  for (let i = 0; i < wave.points.length; i++) {
    const point = wave.points[i]
    const doShiftX = point.x < 0 || point.x > 100 ? false : true
    const doShiftY = point.y < 0 || point.y > 100 ? false : true

    coords.push({
      x: !doShiftX ? point.x : point.x + (Math.random() - 0.5) * wiggle,
      y: !doShiftY
        ? point.y
        : point.y + invertMod * (minheightIncrease + Math.random() * increaseDiff),
      position: 'fixed',
    })
  }

  return {
    waveCount: wave.waveCount,
    points: coords,
    isInverted: wave.isInverted,
  }
}

export function newWaveBlobs(): WaveBlobsObject {
  const sides = 5
  const minHeight = 11
  const maxHeight = 33
  const wiggle = 5

  const upperWaveTop = generateWaveBlob(sides, minHeight, maxHeight, false)
  const upperWaveMiddle = scaleUpWaveBlob(upperWaveTop, minHeight, maxHeight, wiggle)
  const upperWaveBottom = scaleUpWaveBlob(upperWaveMiddle, minHeight, maxHeight, wiggle)

  const lowerWaveTop = generateWaveBlob(sides, minHeight, maxHeight, true)
  const lowerWaveMiddle = scaleUpWaveBlob(lowerWaveTop, minHeight, maxHeight, wiggle)
  const lowerWaveBottom = scaleUpWaveBlob(lowerWaveMiddle, minHeight, maxHeight, wiggle)

  return {
    uT: upperWaveTop,
    uM: upperWaveMiddle,
    uB: upperWaveBottom,
    lT: lowerWaveTop,
    lM: lowerWaveMiddle,
    lB: lowerWaveBottom,
  }
}

export function shiftPointsByAxis(coords: BlobPoint[], shiftX: number, shiftY: number) {
  let newCoords: BlobPoint[] = []

  coords.map((point) => {
    if (point.position === 'fixed') {
      newCoords.push({
        x: point.x,
        y: point.y,
        position: 'fixed',
      })
      return
    }

    let direction: 'vertical' | 'horizontal'
    if (point.position === 'top' || point.position === 'bottom') {
      direction = 'vertical'
    } else {
      direction = 'horizontal'
    }

    newCoords.push({
      x: point.x + (point.x > window.innerWidth || point.x < 0 ? 0 : shiftX),
      y: point.y + shiftY * (direction === 'vertical' && point.position === 'top' ? -1 : 1),
      position: point.position,
    })
  })

  return newCoords
}

export function scaleUpBlob(
  coords: BlobPoint[],
  scaleMin: number,
  scaleMax: number,
  shift: number,
) {
  let newCoords: BlobPoint[] = []

  const scaleDiff = scaleMax - scaleMin

  coords.map((point) => {
    let scaleX = 0
    let scaleY = 0
    let shiftX = 0
    let shiftY = 0

    const randomScale = scaleMin + Math.random() * scaleDiff
    const randomShift = (Math.random() - 0.5) * (shift * 2)

    switch (point.position) {
      case 'fixed':
        break

      case 'topleft':
        scaleX = 0 - randomScale
        scaleY = 0 - randomScale
        shiftX = randomShift
        shiftY = randomShift
        break

      case 'top':
        scaleY = 0 - randomScale
        shiftX = randomShift
        break

      case 'topright':
        scaleX = randomScale
        scaleY = 0 - randomScale
        shiftX = randomShift
        shiftY = randomShift
        break

      case 'right':
        scaleX = randomScale
        shiftY = randomShift
        break

      case 'bottomright':
        scaleX = randomScale
        scaleY = randomScale
        shiftX = randomShift
        shiftY = randomShift
        break

      case 'bottom':
        scaleY = randomScale
        shiftX = randomShift
        break

      case 'bottomleft':
        scaleX = 0 - randomScale
        scaleY = randomScale
        shiftX = randomShift
        shiftY = randomShift
        break

      case 'left':
        scaleX = randomScale
        shiftY = randomShift
        break
    }

    newCoords.push({
      x: point.x + scaleX + shiftX,
      y: point.y + scaleY + shiftY,
      position: point.position,
    })
  })

  return newCoords
}
