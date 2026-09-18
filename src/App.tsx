import { BrowserRouter, Routes, Route } from "react-router"
import { Layout } from "./layouts/Layout"
import Frontpage from "./pages/Frontpage/Frontpage"
import News from "./pages/News/News"
import CreatePosting from "./pages/CreatePosting/CreatePosting"
import Mypage from "./pages/Mypage/Mypage"
import Searchresults from "./pages/Searchresults/Searchresults"
import Register from "./pages/Register/Register"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route index element={<Frontpage />} />
            <Route path="news/:id" element={<News />} />
            <Route path="opretannonce" element={<CreatePosting />} />
            <Route path="register" element={<Register />} />
            <Route path="minside" element={<Mypage />} />
            <Route path="searchresults" element={<Searchresults />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
