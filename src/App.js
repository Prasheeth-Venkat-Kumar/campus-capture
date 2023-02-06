import "./App.css"
import DisplayPage from "./DisplayPage/DisplayPage"
import { Tensor, InferenceSession } from "onnxruntime-web"
import * as tf from "@tensorflow/tfjs"
import { useEffect, useState } from "react"

function App() {
  //
  const [modelSession, setModelSession] = useState(null)

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
      getBuildingName(outputMap["495"].data)
    }

    // create function to get the highest value from the parameter array
    function getBuildingName(predictionsArray) {
      const max = Math.max(...predictionsArray)
      const index = predictionsArray.indexOf(max)
      switch (index) {
        case 0:
          console.log("Smith")
          break
        case 1:
          console.log("Belk")
          break
        case 2:
          console.log("Colvard")
          break
        case 3:
          console.log("Prospector")
          break
        case 4:
          console.log("Burson")
          break
        case 5:
          console.log("Atkins")
          break
        case 6:
          console.log("SAC")
          break
        case 7:
          console.log("Cato")
          break
        case 8:
          console.log("Woodward")
          break
        case 9:
          console.log("CHHS")
          break
        case 10:
          console.log("Student Union")
          break
        case 11:
          console.log("UREC")
          break
        default:
          console.log("No building found")
      }
    }
  }

  // use effect to load model on page load
  useEffect(() => {
    loadModel()
  }, [])
  return (
    <div className="App">
      <DisplayPage predictImage={predictImage} />
    </div>
  )
}

function checkIfPathExists(path) {
  try {
    const file = require(path)
  } catch (err) {
    console.log("File does not exist")
  }
}

export default App
