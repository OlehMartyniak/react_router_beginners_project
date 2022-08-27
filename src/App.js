import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
// import { Route, Swithc, useHistory } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router-dom";


const App = () => {
  return (
    <div className="App">
      <Header/>
      <Nav/>
      <Home/>
      <NewPost/>
      <PostPage/>
      <About/>
      <Missing/>
      <Footer/>
    </div>
  )
}

export default App;