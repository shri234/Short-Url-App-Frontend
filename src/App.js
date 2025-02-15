import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoogleSignIn from "./components/googleAuth";
import ShortUrlGenerator from "./components/shortUrlGenerator";
import ShortUrlsList from "./components/shorturlsdisplay";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<GoogleSignIn />} />
      <Route path="/short-url-generator" element={<ShortUrlGenerator />} />
      <Route path="/short-url-list" element={<ShortUrlsList />} />
    </Routes>
  </Router>
);

export default App;
