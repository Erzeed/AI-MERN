import { Route, Routes } from "react-router-dom"
import Landing from "./page/landing"
import Header from "./components/header"
import Login from "./page/login"
import Register from "./page/register"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </>
  )
}

export default App
