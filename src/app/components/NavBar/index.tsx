import { newWaveBlobs, WaveBlobsObject } from '@/app/utilities/blobFunctions'
import { Blob } from '../Blobs/Blob'
import { getCachedGlobal } from '@/app/utilities/getGlobals'
import { Navbar as NavbarType } from '@/payload-types'
import { CMSLink } from '../CMSLink'
import { MobileToggleButton } from './MobileToggleButton'

export default async function NavBarComponent() {
  const data: NavbarType = await getCachedGlobal('navbar', 1)()

  if (!data) return <div>navbar not found</div>

  const links = data.Links

  const blobs = newWaveBlobs()

  return (
    <div className="w-screen overflow-x-clip">
      <nav className="bg-top pt-4">
        <MobileMenu>
          <ul className="flex gap-[6vh] flex-col justify-center h-full md:flex-row md:gap-16 w-fit mx-auto">
            {links &&
              links.map((link, i) => {
                if (link === undefined) return

                return (
                  <li key={i}>
                    <CMSLink
                      {...link.link}
                      isButton={true}
                      className={`scale-0 transition-all duration-500 delay-0 group-[:has(.mobile-menu-expanded-true)]/mobile-nav:scale-150 group-[:has(.mobile-menu-expanded-true)]/mobile-nav:delay-400 md:hidden`}
                    ></CMSLink>
                    <CMSLink
                      {...link.link}
                      isButton={false}
                      className={`hidden md:block`}
                    ></CMSLink>
                  </li>
                )
              })}
          </ul>
        </MobileMenu>
      </nav>
      <div className="h-64">
        <Blobs {...blobs}></Blobs>
      </div>
    </div>
  )
}

function MobileMenu(props: { children: React.ReactNode }) {
  return (
    <div className="group/mobile-nav outline-top outline-8 h-8 transition-all duration-1000 delay-200 has-[.mobile-menu-expanded-true]:h-[80vh] has-[.mobile-menu-expanded-true]:delay-0">
      <MobileToggleButton></MobileToggleButton>
      {props.children}
    </div>
  )
}

function Blobs(props: WaveBlobsObject) {
  return (
    <div className="relative h-full">
      <Blob points={props.lB.points} position={'bottom'} type="wave"></Blob>
      <Blob points={props.lM.points} position={'middle'} type="wave"></Blob>
      <Blob points={props.lT.points} position={'top'} type="wave"></Blob>
    </div>
  )
}
