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

    components: {
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: "#fca311",
            color: "#000",
          },
        },
      },
    },
  })

  // Function to predict image
  async function predictImage(image = "/pics/woodward1.jpg") {
    return new Promise((resolve, reject) => {
      const testImage = new Image()
      testImage.src = image

      testImage.onload = async () => {
        // console.log("Image loaded")
        // Convert image to tensor
        const imgTensor = tf.browser.fromPixels(testImage)
        // console.log("Inital image tensor shape", imgTensor.shape)
        // resize tensor to 224, 224, 3
        const reshapedImgTensor = tf.image.resizeBilinear(imgTensor, [224, 224])
        // console.log("Reszied image tensor shape", reshapedImgTensor.shape)
        // transpose tensor to channel first
        const transImgTensor = reshapedImgTensor.transpose([2, 0, 1])
        // console.log("Converted image tensor shape", transImgTensor.shape)
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
        // console.log(outputMap["495"].data)
        // console.log(testImage.src)
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
    const downloadModel = async () => {
      const modelURL =
        "https://firebasestorage.googleapis.com/v0/b/campus-capture-4485b.appspot.com/o/model.onnx?alt=media&token=975fb6a3-d46f-4ab6-8cb2-b879c3e9d80e"
      const response = await fetch(modelURL)
      // check
      const buffer = await response.arrayBuffer()
      // check if buffer is valid
      console.log(buffer)
      try {
        const model = await InferenceSession.create(null, {
          executionProviders: ["webgl"],
        })

        if (model) console.log("Model loaded successfully")
        else console.log("Model failed to load")

        setModelSession(model)
      } catch (error) {
        console.log(error)
      }
    }

    downloadModel()
  }, [])

  return (
    <div className="App">
      <DisplayPage predictImage={predictImage} theme={theme} />
    </div>
  )
}

export default App
