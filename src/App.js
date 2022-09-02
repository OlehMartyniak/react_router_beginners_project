import About from "./pages/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Missing from "./pages/Missing";
import Nav from "./components/Nav";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";
import Layout from "./pages/Layout";
import postsData from "./data/data";
import { format } from "date-fns";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";

const App = () => {
    const [posts, setPosts] = useState(postsData);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const navigate = useNavigate();

    const handleDelete = (id) => {
        const postsList = posts.filter((post) => post.id !== id);
        setPosts(postsList);
        navigate("/");
    };

    const handleSubmit = (e) => {
      e.preventDefaul();
      const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const datetime = format(new Date(), "MMMM dd, yyyy pp");
      const newPost = { id, title: postTitle, datetime, body: postBody};
      const allPosts = [...posts, newPost];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/") 
    };

    return (
      <Routes>
        <Route path="/" element={<Layout
          search={search}
          setSearch={setSearch}
        />}>
          <Route index element={<Home posts={searchResults} />} />
          <Route path="post">
            <Route index element={<NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />} />
            <Route path=":id" element={<PostPage
              posts={posts}
              handleDelete={handleDelete}
            />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    );
  }

export default App;
