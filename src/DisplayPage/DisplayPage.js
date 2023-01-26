import "./DisplayPage.css"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
// import required modules
import { Navigation } from "swiper"
import { useState } from "react"
// import pics from "../pics"

function DisplayPage() {
  //
  let slideIndex = 0
  //
  const [customImage, setCustomImage] = useState(null)

  function handleSlideChange(activeIndex) {
    slideIndex = activeIndex
    console.log("Active Slide Index: ", slideIndex)
  }

  function isSlideCustomImage() {
    return slideIndex == 0
  }

  return (
    <div>
      <div className="page-header">
        <img
          className="header-logo"
          src="./campus-capture-logo.png"
          alt="Campus Capture Logo"
        />
        <h1>Campus Capture</h1>
        <img
          className="header-logo-counter-balance"
          src="./campus-capture-logo.png"
          alt="Campus Capture Logo"
        />
      </div>
      <div className="slide-show">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
        >
          <SwiperSlide>
            {!customImage && (
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setCustomImage(event.target.files[0])}
              />
            )}
            {customImage && (
              <img src={customImage} alt="Custom Picture of a UNCC building" />
            )}
          </SwiperSlide>
          <SwiperSlide>
            <img src={require("../pics/urec.jpg")} alt="Picture of UREC" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={require("../pics/CHHS (25).jpg")} alt="Picture of CHHS" />
          </SwiperSlide>
          {/* <SwiperSlide>Slide 5</SwiperSlide> */}
        </Swiper>
      </div>

      <div className="page-footer">
        <p>
          <i>Created by Nathan Williams and Prasheeth Venkat</i>
          <br></br>
          <i> A 100 Loops Project</i>
        </p>
      </div>
    </div>
  )
}

export default DisplayPage
