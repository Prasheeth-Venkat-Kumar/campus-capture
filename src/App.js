import "./App.css"
import DisplayPage from "./DisplayPage/DisplayPage"
import { Tensor, InferenceSession } from "onnxruntime-web"
import * as tf from "@tensorflow/tfjs"
import { useEffect, useState } from "react"
import { createTheme } from "@mui/material/styles"

function App() {
  //
  const [modelSession, setModelSession] = useState(null)

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fca311",
      },
    },
  })

  //
  async function loadModel() {
    const session = await InferenceSession.create("./model.onnx", {
      executionProviders: ["webgl"],
    })
    setModelSession(session)
    console.log("Model loaded")
  }
  // Function to predict image
  async function predictImage(image = "/pics/woodward1.jpg") {
    return new Promise((resolve, reject) => {
      const testImage = new Image()
      testImage.src = image

      testImage.onload = async () => {
        console.log("Image loaded")
        // Convert image to tensor
        const imgTensor = tf.browser.fromPixels(testImage)
        console.log("Inital image tensor shape", imgTensor.shape)
        // resize tensor to 224, 224, 3
        const reshapedImgTensor = tf.image.resizeBilinear(imgTensor, [224, 224])
        console.log("Reszied image tensor shape", reshapedImgTensor.shape)
        // transpose tensor to channel first
        const transImgTensor = reshapedImgTensor.transpose([2, 0, 1])
        console.log("Converted image tensor shape", transImgTensor.shape)
        // flatten tensor
        const flattenedTensor = transImgTensor.flatten()
        // convert to array
        const arrayTensor = flattenedTensor.arraySync()
        // normalize tensor
        const normalizedTensor = arrayTensor.map((x) => x / (225 * 2 - 1))

        // crate ONNX tensor
        const inputTensor = new Tensor(
          "float32",
          new Float32Array(normalizedTensor),
          [1, 3, 224, 224]
        )
        // create feeds
        const feeds = {
          "input.1": inputTensor,
        }
        // run model
        const outputMap = await modelSession.run(feeds)
        console.log(outputMap["495"].data)
        console.log(testImage.src)
        resolve(getBuildingName(outputMap["495"].data))
      }
    })
  }

  function getBuildingName(predictionsArray) {
    const max = Math.max(...predictionsArray)
    const index = predictionsArray.indexOf(max)
    // change the print statement to return the building name
    switch (index) {
      case 0:
        return "Smith"
      case 1:
        return "Belk Gym"
      case 2:
        return "Colvard"
      case 3:
        return "Prospector"
      case 4:
        return "Burson"
      case 5:
        return "Atkins Library"
      case 6:
        return "Student Activity Center"
      case 7:
        return "Cato Hall"
      case 8:
        return "Woodward Hall"
      case 9:
        return "College of Health and Human Services"
      case 10:
        return "Popp Martin Student Union"
      case 11:
        return "University Recreation Center"
      default:
        return "No building found"
    }
  }

  // use effect to load model on page load
  useEffect(() => {
    loadModel()
  }, [])
  return (
    <div className="App">
      <DisplayPage predictImage={predictImage} theme={theme} />
    </div>
  )
}

export default App
