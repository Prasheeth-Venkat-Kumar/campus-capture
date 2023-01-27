import "./App.css";
import DisplayPage from "./DisplayPage/DisplayPage";
import * as ort from "onnxruntime-web";

function App() {
  loadModel();
  return (
    <div className="App">
      <DisplayPage />
    </div>
  );
}

async function loadModel() {
  console.log("Session created");
  const session = await new ort.InferenceSession("./model.onnx");

  console.log("Model loaded");
  const input = new ort.Tensor(
    "float32",
    new Float32Array(224 * 224 * 3),
    [1, 3, 224, 224]
  );
  const outputMap = await session.run(input);
  const outputTensor = outputMap.values().next().value;
  console.log("Output tensor: ${outputTensor.data}");
}

export default App;
