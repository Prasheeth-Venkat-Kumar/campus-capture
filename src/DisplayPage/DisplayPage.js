import "./DisplayPage.css"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
// import required modules
import { Navigation } from "swiper"
import { useState } from "react"
import { Button } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  createTheme,
} from "@mui/material"
// import pics from "../pics"

function DisplayPage({ predictImage, theme }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const [customImage, setCustomImage] = useState(null)
  const [fileURL, setFileURL] = useState(null)
  const [isPredictionActive, setIsPredictionActive] = useState(false)
  const [currImgPath, setCurrImgPath] = useState(null)
  const [selectedBldName, setSelectedBldName] = useState(null)
  const [predictedBldName, setPredictedBldName] = useState(null)

  const accordionStyle = createTheme({
    components: {
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: "#508991",
            color: "white",
          },
        },
      },
    },
  })

  const imgPaths = [
    ["Belk Gym", "/pics/belk1.jpg"],
    ["Colvard", "/pics/colvard1.jpg"],
    ["Burson", "/pics/burson1.jpg"],
    ["Cato Hall", "/pics/cato1.jpg"],
    ["College of Health and Human Services", "/pics/chhs1.jpg"],
    ["Prospector", "/pics/prospector1.jpg"],
    ["Popp Martin Student Union", "/pics/union1.jpg"],
    ["University Recreation Center", "/pics/urec1.jpg"],
    ["Atkins Library", "/pics/atkins1.jpg"],
    ["Student Activity Center", "/pics/sac1.jpg"],
    ["Woodward Hall", "/pics/woodward1.jpg"],
    ["Smith", "/pics/smith1.jpg"],
    ["Belk Gym", "/pics/belk2.jpg"],
    ["Colvard", "/pics/colvard2.jpg"],
    ["Burson", "/pics/burson2.jpg"],
    ["Cato Hall", "/pics/cato2.jpg"],
    ["College of Health and Human Services", "/pics/chhs2.jpg"],
    ["Prospector", "/pics/prospector2.jpg"],
    ["Popp Martin Student Union", "/pics/union2.jpg"],
    ["University Recreation Center", "/pics/urec2.jpg"],
    ["Atkins Library", "/pics/atkins2.jpg"],
    ["Student Activity Center", "/pics/sac2.jpg"],
    ["Woodward Hall", "/pics/woodward2.jpg"],
    ["Smith", "/pics/smith2.jpg"],
  ]

  function handleSlideChange(activeIndex) {
    setSlideIndex(activeIndex)
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
      setSelectedBldName("Custom Image")
      let preBldName = await predictImage(fileURL)
      setPredictedBldName(preBldName)
    } else {
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
              <ThemeProvider theme={theme}>
                <Button variant="contained" component="label">
                  UPLOAD CUSTOM IMAGE
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleCustomImageUpload(event)}
                    hidden
                  />
                </Button>
              </ThemeProvider>
            )}
            {customImage && (
              <div className="custom-img-container">
                <img src={fileURL} alt="Custom Picture of a UNCC building" />
                <ThemeProvider theme={theme}>
                  <Button
                    className="new-img-button"
                    variant="contained"
                    component="label"
                  >
                    UPLOAD NEW CUSTOM IMAGE
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleCustomImageUpload(event)}
                      hidden
                    />
                  </Button>
                </ThemeProvider>
              </div>
            )}
          </SwiperSlide>
          {imgPaths.map((imgPath, index) => (
            <SwiperSlide key={index}>
              <img src={imgPath[1]} alt="UNCC building" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {isPredictionActive && (
        <div className="prediction-sec">
          <p>Building Name: {selectedBldName}</p>
          <p>Predicted Building Name: {predictedBldName}</p>
        </div>
      )}

      <div className="predict-button">
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handlePredictButtonClick()}
          >
            PREDICT BUILDING
          </Button>
        </ThemeProvider>
      </div>

      <div className="about-faq">
        <ThemeProvider theme={theme}>
          <Accordion>
            <AccordionSummary>
              <p>How is the data collected and processed?</p>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                The data that drives the heatmap and other aspects of Campus
                Corner is derived from the University&apos;s Wi-Fi Log Data. A
                data processing algorithm is used to convert the raw Wi-Fi log
                data into data that is meaningful in terms of analyzing the
                traffic of the respective University buildings. The heatmap
                provides an easily digestible visual breakdown of the traffic
                patterns.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <p> How accurate is the data and heatmap?</p>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Due to limitations in the data provided, we were only able to
                utilize one month of Wi-Fi logs. Despite this, we found that by
                observing traffic patterns on campus, the data can be
                generalized to any normal day (non-holiday/ break days)
                throughout the school year.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <p>What is Live Busy Rating?</p>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                The Live Busy Rating is a prediction of the current busyness
                given the current time and date for the respective building. The
                Live Busy Rating is generated by machine learning that is
                modeled on the traffic log data. Due to the data being limited
                and extrapolated, we utilize the machine learning model to
                provide more accurate predictions.
              </p>
            </AccordionDetails>
          </Accordion>
        </ThemeProvider>
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
