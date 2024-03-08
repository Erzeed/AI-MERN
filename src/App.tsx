import { Route, Routes } from "react-router-dom"
import Landing from "./page/landing"
import Header from "./components/header"
import Login from "./page/login"
import Register from "./page/register"
import Chat from "./page/chat"
import Toast from "./components/toast"
import { useAuthContext } from "./contexts/auth"
import ChatMessage from "./components/chatMessage"

function App() {
  const { isLogin } = useAuthContext()
  return (
    <div className="h-svh w-svw">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        {isLogin && (
          <Route path="/d" element={<Chat />}>
            <Route path=":idChat" element={<ChatMessage />}/>
          </Route>
        )}
      </Routes>
      <Toast />
    </div>
  )
}

export default App
