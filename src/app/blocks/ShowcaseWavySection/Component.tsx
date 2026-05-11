import { ShowcaseWavySectionComponent } from '@/app/components/layout/ShowcaseWavySection'
import { ShowcaseWavySection } from '@/payload-types'

export default function ShowcaseWavySectionBlock(block: ShowcaseWavySection) {
  return <ShowcaseWavySectionComponent {...block}></ShowcaseWavySectionComponent>
}
