import { ShowcaseWavySection } from '@/payload-types'
import WavySectionComponent from '../WavySection'
import { CMSImage } from '../../CMSImage'

export function ShowcaseWavySectionComponent(block: ShowcaseWavySection) {
  return (
    <>
      <WavySectionComponent {...block.upperContent} blockType="wavy-section"></WavySectionComponent>
      <CMSImage
        resource={block.showcaseImage}
        pictureClassName="-z-15 my-(--showcase-margin) mx-auto"
      ></CMSImage>
      <WavySectionComponent {...block.lowerContent} blockType="wavy-section"></WavySectionComponent>
    </>
  )
}
