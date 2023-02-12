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
      // if custom image is empty, alert user
      if (customImage == null) {
        alert("Please upload a custom image first.")
        return
      }
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
              <p>Problem Motivation</p>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                The purpose of this project is to create a model that can
                identify the building shown in an image taken by a user on the
                UNCC campus. The reason behind this is that there's currently no
                dataset available that has images of all the buildings on the
                UNCC campus. This project is not only fun, but it's also useful
                as the model, if accurate, could be used on other campuses or in
                large cities where multiple buildings need to be recognized. The
                project is limited to the UNCC campus, but the possibilities for
                its use in the future are endless. Imagine being able to use it
                for self-guided tours or even navigation. The best part? We get
                to create the dataset ourselves, making the project even more
                meaningful to the UNCC community.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <p>Dataset overview</p>
            </AccordionSummary>
            <AccordionDetails>
              <ul className="resnet50-bullets">
                <li>
                  Over 2700 images, taken during day and night, covering 12
                  buildings across campus
                </li>
                <li>Mainly used significant buildings (UREC/Atkins/Etc…)</li>
                <li>
                  Many angles, different lighting scenarios, day/night images
                </li>
                <li>Annotated</li>
                <li>
                  # of samples in training/test split: 2176 / 544 (80% / 20%)
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <p>Why use a Convolutional Neural Network?</p>
            </AccordionSummary>
            <AccordionDetails>
              {/* create a list of bullet points */}
              <p>
                {" "}
                The research involved in building recognition is often complex
                and requires a relatively small dataset. This project considered
                two options for building a model: handcrafted features and
                neural networks. The team evaluated the possibility of building
                a Convolutional Neural Network (CNN) from scratch or using a
                pre-trained model. One reference cited was "Building recognition
                system based on deep learning" by P. Bezak in 2016. The team
                experimented with different pre-trained models, data
                augmentation techniques, and vision transformers. The solution
                ultimately chosen was a pre-trained ResNet50 model, with the
                last layer trained and tuned for the specific task. The
                hyperparameters used included a learning rate of 0.0001, 15
                epochs, an image size of (224 x 224), a horizontal flip data
                augmentation technique, and data normalization that was
                zero-centered. The loss function used was cross-entropy, and the
                problem was treated as a multiclass image classification task.
                The Adam optimizer was chosen as it is computationally efficient
                and better suited for non-linear applications than the
                alternative, Stochastic Gradient Descent (SGD).
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <p>Results and Oberservations</p>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                The team conducted several experiments to evaluate the
                performance of different models for building recognition on the
                UNCC campus. In Experiment 1, a pre-trained GoogleNet model was
                used and achieved an accuracy of ~75% on the test set.
                Experiment 2 used a pre-trained VGG16 model, which achieved an
                accuracy of ~67.5%. Experiment 3 used a pre-trained ResNet50
                with vision transforming and self-attention, but this approach
                resulted in an accuracy of only ~50%. The image size was reduced
                to (96 x 96) in order to reduce CUDA memory needs and a learning
                rate of 0.00005 was used, as it produced better accuracy. In
                Experiment 4, a CNN model was built from scratch, but it
                produced an accuracy of only ~50% on the (64 x 64) image size
                used. Experiment 5 used a pre-trained ResNet50 model without
                data augmentation or normalization and achieved an accuracy of
                ~85% on the test set. The final model chosen was the pre-trained
                ResNet50 with data augmentation, which achieved an accuracy of
                ~85%. To improve accuracy, the team suggests collecting more
                diverse images with a better data collection approach, covering
                more buildings, and increasing the number of images used. The
                results showed that buildings with unique features had better
                classification and that CNN models are extremely powerful and
                perform well with limited data. The team also observed that
                similar buildings often get confused and that a better
                understanding of the AI "black box" is needed.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <p>
                How does this website support live client-side machine learning?
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                In this website, the ONNX WebRuntime was utilized to provide a
                client-side solution for live image classification. The
                pre-trained ResNet50 model was exported to the ONNX format and
                then run in the web browser using ONNX WebRuntime. This allowed
                for real-time image classification directly on the client-side,
                eliminating the need for server resources and providing faster
                and more responsive results. The support for ONNX models in ONNX
                WebRuntime also meant that the team was able to use the
                pre-trained ResNet50 model without having to retrain it, saving
                valuable time and resources. Overall, the use of ONNX WebRuntime
                was instrumental in achieving the goal of accurately predicting
                the building in an image taken on the UNCC campus and provided a
                practical solution for live image classification in web
                applications.
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
