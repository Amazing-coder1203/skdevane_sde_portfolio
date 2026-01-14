import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "react-feather"
import Button1 from "./Button.jsx";


const slides = [
  { img: "assets/Shopfordable_ref.png", link: "https://amazing-coder1203.github.io/ShopAffordable/" },
  { img: "assets/crypto-live-pro-v3.png", link: "https://amazing-coder1203.github.io/crypto_live_pro/#/landing" },
  { img: "assets/african-migration.png", link: "https://amazing-coder1203.github.io/African-Conflicts/" },
  { img: "assets/amazon-sales.png", link: "https://amazing-coder1203.github.io/Amazon-India-Sales/" },
  { img: "assets/wita.png", link: "https://amazing-coder1203.github.io/Aircraft-Data-Analysis/" },
]




function Carousel({ autoSlide = false, autoSlideInterval = 10000 }) {
  const [curr, setCurr] = useState(0)

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

  const openLink = () => {
    window.open(slides[curr].link, "_blank")
  }

  useEffect(() => {
    if (!autoSlide) return
    const slideInterval = setInterval(next, autoSlideInterval)
    return () => clearInterval(slideInterval)
  }, [])

  return (
    <div className="flex justify-center md:justify-end items-center py-8">
      <div className="w-full md:w-full flex justify-center">
        <div className="overflow-hidden relative max-w-lg w-full">
          <div
            className="flex transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${curr * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div
                key={i}
                className="w-full h-[400px] flex items-center justify-center bg-transparent flex-shrink-0"
              >
                <img
                  src={s.img}
                  className="max-h-full max-w-full object-cover"
                  alt={`slide-${i}`}
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-6 flex items-center justify-between p-4 z-30">
            <button
              onClick={prev}
              className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={next}
              className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
            >
              <ChevronRight size={40} />
            </button>
          </div>

          {/* Open button inside carousel at bottom center */}
          <div className="absolute bottom-12 left-0 right-0 flex justify-center z-30">
            <button
              onClick={openLink}
              className="px-6 py-2 rounded-lg shadow bg-blue-600 text-white hover:bg-blue-700"
              icon="/images/zap.svg"
            >
              Open
            </button>
          </div>

          <div className="absolute bottom-4 right-0 left-0 z-20">
            <div className="flex items-center justify-center gap-2">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`transition-all w-3 h-3 bg-white rounded-full ${curr === i ? "p-2" : "bg-opacity-50"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel
