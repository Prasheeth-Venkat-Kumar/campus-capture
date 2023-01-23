import "./Header.css"
import { Button, ThemeProvider, createTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"

function Header(props) {
  const navigate = useNavigate()
  const theme = createTheme({
    palette: {
      Text: {
        primary: "#FFFFFF",
      },
      primary: {
        main: "#FFFFFF",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  })

  function handleHomeClick() {
    console.log("Home button clicked")
    navigate("/home")
  }

  function handleDataClick() {
    console.log("Data button clicked")
    navigate("/locations")
  }

  function handleFeedbackClick() {
    console.log("Feedback button clicked")
    navigate("/feedback")
  }

  return (
    <div className="page-header">
      {/* <h1 className="page-title">{props.pageTitle}</h1> */}
      {/* <img src="../public/LogoCCTransparent.png" alt="sdfsdf" /> */}
      <img
        className="header-logo"
        src="../LogoCCTransparent.png"
        alt="sdfsdf"
      />
      <div className="header-btn-sec">
        <ThemeProvider theme={theme}>
          <Button variant="outlined" color="primary" onClick={handleHomeClick}>
            Home
          </Button>
          <Button variant="outlined" color="primary" onClick={handleDataClick}>
            Data
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleFeedbackClick}
          >
            Feedback
          </Button>
        </ThemeProvider>
      </div>
    </div>
  )
}

export default Header
