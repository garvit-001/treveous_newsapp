import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
import LoadingBar from "react-top-loading-bar";
import News from "../components/News";
import Favourites from "../components/Favourites";

const Homepage = (props) => {
  let variable = "rgn";
  const [progess, setProgess] = useState(0);
  return (
    <div>
      <BrowserRouter>
        <Navbar logout={props.logout} />
        <Welcome name={"Flexiple"} />
        <LoadingBar
          color="#f11946"
          progress={progess}
          height={3}
          onLoaderFinished={() => {}}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgess={setProgess}
                key="general"
                pageSize={5}
                country={"in"}
                category={"general"}
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                setProgess={setProgess}
                key="business"
                pageSize={5}
                country={"in"}
                category={"business"}
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgess={setProgess}
                key="entertainment"
                pageSize={5}
                country={"in"}
                category={"entertainment"}
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                setProgess={setProgess}
                key="health"
                pageSize={5}
                country={"in"}
                category={"health"}
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                setProgess={setProgess}
                key="science"
                pageSize={5}
                country={"in"}
                category={"science"}
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgess={setProgess}
                key="sports"
                pageSize={5}
                country={"in"}
                category={"sports"}
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgess={setProgess}
                key="technology"
                pageSize={5}
                country={"in"}
                category={"technology"}
              />
            }
          />
          <Route exact path="/favourite" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Homepage;
