import { CMSLink, LinkType } from '..'

export type DisplayLinksProps = {
  links: {
    link?: LinkType
  }[]
  className?: string
  inForeground?: boolean
}

export function DisplayLinks(props: DisplayLinksProps) {
  return (
    <span className={`flex gap-4 ${props.className ? props.className : ''}`}>
      {props.links?.map((obj, i) => {
        return (
          <CMSLink
            key={i}
            {...obj.link}
            isButton={true}
            linkText={obj.link?.linkText || 'Link Missing'}
            inForeground={props.inForeground}
          ></CMSLink>
        )
      })}
    </span>
  )
}
