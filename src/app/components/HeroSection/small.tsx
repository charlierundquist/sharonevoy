import { Page } from '@/payload-types'

export function SmallHeroComponent(props: { text: Page['heroText'] }) {
  return (
    <div className="my-0! -mb-24! -mt:8!">
      <h1 className="text-white text-4xl md:text-6xl text-center translate-y-8 text-balance leading-22 md:leading-36 max-w-400 mx-auto z-90 relative">
        {props.text}
      </h1>
    </div>
  )
}
