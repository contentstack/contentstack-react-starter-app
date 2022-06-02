import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/index";
import Blog from "./pages/blog";
import BlogPost from "./pages/blog-post";
import Error from "./pages/error";
import "./styles/third-party.css";
import "./styles/style.css";
import "./styles/modal.css";
import "@contentstack/live-preview-utils/dist/main.css";
import "react-loading-skeleton/dist/skeleton.css";
import { EntryProps } from "../src/typescript/layout";

function App() {
  const [getEntry, setEntry] = useState({} as EntryProps);

  function getPageRes(response: EntryProps) {
    setEntry(response);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout entry={getEntry} />}>
          <Route index element={<Home entry={getPageRes} />} />
          <Route path="/:page" element={<Home entry={getPageRes} />} />
          <Route path="/blog" element={<Blog entry={getPageRes} />} />
          <Route
            path="/blog/:blogId"
            element={<BlogPost entry={getPageRes} />}
          />
          <Route path="/404" element={<Error />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
