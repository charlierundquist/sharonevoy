import { WavySection } from '@/payload-types'
import WavySectionComponent from '@/app/components/layout/WavySection'

export default function WavySectionBlock(block: WavySection) {
  // return <WavySectionComponent {...block}></WavySectionComponent>
  return <WavySectionComponent {...block}></WavySectionComponent>
}
