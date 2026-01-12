import { Element } from "react-scroll"
import { links, logos } from "../constants/index.jsx"
import { Marker } from "../components/Marker.jsx"
import Carousel from "../components/Carousel.jsx" // import your carousel


const Projects = () => {
  return (
    <section>
      <Element
        name="Projects"
        className="g7 relative pb-32 pt-24 max-lg:pb-24"
      >
        <div className="container">
          <div className="flex items-start gap-6"> {/* gap between left and carousel */}

            {/* Left text + links block */}
            <div className="relative flex-1 flex flex-col">
              <div className="mb-10 text-8xl maxlg:text-7xl max-md:text-5xl max-md:mb-6">
                <h1>My Projects</h1>
              </div>

              <p className="body-1 mb-10 max-w-md max-md:mb-10">
                A collection of academic, personal, and hackathon projects
              </p>

              {/* Updated ul: ml-auto pushes right end to touch carousel */}
              <ul className="flex flex-wrap items-center gap-16 mr-20 max-md:hidden ml-auto">
                {links.map(({ id, url, icon }) => (
                  <li
                    key={id}
                    className="download_tech-link download_tech-link_last-before download_tech-link_last-after"
                  >
                    <a
                      href={url}
                      className="size-22 download_tech-icon_before relative flex items-center justify-center rounded-half border-2 border-s3 bg-s1 transition-borderColor duration-500"
                    >
                      <span className="absolute -top-2 rotate-90">
                        <Marker />
                      </span>
                      <img
                        src={"images/lines.svg"}
                        alt="lines"
                        className="absolute size-13/20 object-contain z-0"
                      />
                      <span className="download_tech-icon">{icon}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Carousel block */}
            <div className="mb-10 max-md:hidden flex-shrink-0 ml-6">
              <div className="download_preview-before download_preview-after rounded-40 relative w-[955px] border-2 border-s5">
                <div className="relative rounded-3xl bg-s1">
                  <div className="rounded-xl overflow-hidden">
                    <Carousel autoSlide={true} autoSlideInterval={10000} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* SECOND CAROUSEL BLOCK REMAINS UNTOUCHED */}
          <div className=" lg:hidden flex justify-center">
            <div className="download_preview-before download_preview-after rounded-40 relative w-[955px] border-2 border-s5 inline-block">
              <div className="relative rounded-3xl bg-s1">
                <div className="rounded-xl overflow-hidden">
                  <Carousel autoSlide={true} autoSlideInterval={10000} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 w-full overflow-hidden border-t-2 border-b-2 border-s5 bg-s1/50 py-4">
            <div className="animate-ticker flex whitespace-nowrap">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-16 mx-8">
                  <span className="h5 font-mono text-p4">PYTHON <span className="text-green-400">▲ 24.5%</span></span>
                  <span className="h5 font-mono text-p4">AWS <span className="text-green-400">▲ 18.2%</span></span>
                  <span className="h5 font-mono text-p4">DATA <span className="text-green-400">▲ 55.0%</span></span>
                  <span className="h5 font-mono text-p4">STATS <span className="text-green-400">▲ 12.3%</span></span>
                  <span className="h5 font-mono text-p4">LINUX <span className="text-green-400">▲ 08.1%</span></span>
                  <span className="h5 font-mono text-p4">SQL <span className="text-green-400">▲ 14.6%</span></span>
                  {/* Reuse items for seamless loop */}
                  <span className="h5 font-mono text-p4">PYTHON <span className="text-green-400">▲ 24.5%</span></span>
                  <span className="h5 font-mono text-p4">AWS <span className="text-green-400">▲ 18.2%</span></span>
                  <span className="h5 font-mono text-p4">DATA <span className="text-green-400">▲ 55.0%</span></span>
                  <span className="h5 font-mono text-p4">STATS <span className="text-green-400">▲ 12.3%</span></span>
                  <span className="h5 font-mono text-p4">LINUX <span className="text-green-400">▲ 08.1%</span></span>
                  <span className="h5 font-mono text-p4">SQL <span className="text-green-400">▲ 14.6%</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Element>
    </section>
  )

}
export default Projects;

