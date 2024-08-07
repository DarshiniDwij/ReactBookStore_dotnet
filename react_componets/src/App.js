import "./App.css";
import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BookStore from "./components/BookStore";
import AuthorPage from "./components/AuthorPage";
import AuthorStory from "./components/AuthorStory";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemOffCanvas from "./components/ItemOffCanvas";
// import BookDetails from './components/BookDetails';
// import Home from './components/Home';

function App() {
  return (
    <div className="App">
      {/* <main>
        <ProductCard></ProductCard>

        <BookModal></BookModal>
        <BookStore></BookStore>
        <AuthorPage></AuthorPage>
        <AuthorStory></AuthorStory>
        {/* <BookDetails></BookDetails> */}
      {/* </main> */}

      <React.Fragment>
        <div className="hero_area" style={{ marginBottom: "3rem" }}>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<BookStore />} />
            <Route path="/author" element={<AuthorPage />} />
            <Route path="/singleAuthor/:author" element={<AuthorStory />} />
            <Route path="/addBook" component={ItemOffCanvas} />
          </Routes>
        </div>
        <Footer></Footer>
      </React.Fragment>
    </div>
  );
}

export default App;
