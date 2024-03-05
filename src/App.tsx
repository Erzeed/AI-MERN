import { Route, Routes } from "react-router-dom"
import Landing from "./page/landing"
import Header from "./components/header"
import Login from "./page/login"
import Register from "./page/register"
import Chat from "./page/chat"
import Toast from "./components/toast"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/d" element={<Chat />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
      <Toast />
    </>
  )
}

export default App
