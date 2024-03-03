import { Route, Routes } from "react-router-dom"
import Landing from "./page/landing"
import Header from "./components/header"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />}/>
      </Routes>
    </>
  )
}

export default App
