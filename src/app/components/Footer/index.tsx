import { newWaveBlobs, WaveBlobsObject } from '@/app/utilities/blobFunctions'
import { Blob } from '../Blobs/Blob'
import { getCachedGlobal } from '@/app/utilities/getGlobals'
import { Footer as FooterType } from '@/payload-types'
import { CMSLink } from '../CMSLink'
import { RichText } from '../RichText'

export async function FooterComponent() {
  const data: FooterType = await getCachedGlobal('footer', 1)()

  if (!data) return <div>footer not found</div>

  const links = data['Quick Links'] || []
  const contactInfos = data['Contact Info'] || []

  const blobs = newWaveBlobs()

  return (
    <>
      <div className="relative h-256">
        <div className="h-128 relative">
          <Blobs {...blobs}></Blobs>
        </div>
        <div className="bg-top h-128">
          <div className="max-w-prose mx-auto h-full pt-32 relative">
            <h3 className="mx-auto w-fit mb-8 text-6xl!">Sharon Evoy</h3>
            <div className="flex gap-8 w-fit mx-auto">
              <span className="font-bold text-xl">Quick Links</span>
              <span className="font-bold text-xl">Contact Info</span>
            </div>
            <hr className="mt-1" />
            <div className="grid grid-cols-2 gap-8 mt-4">
              <ul className="grid gap-2 text-right">
                {links.map((link, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link.link} isButton={false}></CMSLink>
                    </li>
                  )
                })}
              </ul>
              <ul className="grid gap-2">
                {contactInfos.map((line, i) => {
                  return (
                    <li key={i}>
                      {line['New Line'] && <RichText data={line['New Line']}></RichText>}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="absolute bottom-8 w-full text-center">
              Copyright 2026 Dawn Sky Web Design
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Blobs(props: WaveBlobsObject) {
  return (
    <div className="relative h-full">
      <Blob points={props.uB.points} position={'bottom'} type="wave"></Blob>
      <Blob points={props.uM.points} position={'middle'} type="wave"></Blob>
      <Blob points={props.uT.points} position={'top'} type="wave"></Blob>
    </div>
  )
}
