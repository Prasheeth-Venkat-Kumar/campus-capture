import "./DisplayPage.css"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
// import required modules
import { Navigation } from "swiper"
import { useState } from "react"
import { Button } from "@mui/material"
// import pics from "../pics"

function DisplayPage({ predictImage }) {
  let slideIndex = 0
  //
  const [customImage, setCustomImage] = useState(null)
  const [fileURL, setFileURL] = useState(null)
  const [isPredictionActive, setIsPredictionActive] = useState(false)
  const [currImgPath, setCurrImgPath] = useState(null)
  //
  const [selectedBldName, setSelectedBldName] = useState(null)
  const [predictedBldName, setPredictedBldName] = useState(null)
  // let selectedBldName = null

  const imgPaths = [
    ["Belk Hall", "/pics/belk1.jpg"],
    ["Colvard", "/pics/colvard1.jpg"],
  ]

  function handleSlideChange(activeIndex) {
    slideIndex = activeIndex
    // console.log("Active Slide Index: ", slideIndex)
    setIsPredictionActive(false)
  }

  function isSlideCustomImage() {
    return slideIndex == 0
  }

  function handleCustomImageUpload(event) {
    setCustomImage(event.target.files[0])
    setFileURL(URL.createObjectURL(event.target.files[0]))
  }

  async function handlePredictButtonClick() {
    if (isSlideCustomImage()) {
      // predictedBldName = predictImage(fileURL)
    } else {
      // selectedBldName = imgPaths[slideIndex - 1][0]
      // predictedBldName = predictImage(imgPaths[slideIndex - 1][1])
      // print for now
      setSelectedBldName(imgPaths[slideIndex - 1][0])
      let preBldName = await predictImage(imgPaths[slideIndex - 1][1])
      console.log(preBldName)
      setPredictedBldName(preBldName)
    }
    setIsPredictionActive(true)
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
      <h1 className="predict-title">
        Predicting UNC Charlotte Buildings with a Picture
      </h1>
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
                onChange={(event) => handleCustomImageUpload(event)}
              />
            )}
            {customImage && (
              <img src={fileURL} alt="Custom Picture of a UNCC building" />
            )}
          </SwiperSlide>
          {imgPaths.map((imgPath, index) => (
            <SwiperSlide key={index}>
              <img src={imgPath[1]} alt="UNCC building" />
            </SwiperSlide>
          ))}
          {/* <SwiperSlide>Slide 5</SwiperSlide> */}
        </Swiper>
      </div>
      {isPredictionActive && (
        <div className="prediction-sec">
          <p>Building Name: {selectedBldName}</p>
          <p>Predicted Building Name: {predictedBldName}</p>
        </div>
      )}

      <div className="predict-button">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePredictButtonClick()}
        >
          PREDICT BUILDING
        </Button>
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
