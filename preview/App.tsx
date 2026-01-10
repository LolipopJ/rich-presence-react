import "./App.css";

import React from "react";

import RichPresence from "../src";
import { TEST_RICH_PRESENCES } from "./constants";

const App = () => {
  return (
    <>
      {TEST_RICH_PRESENCES.map((richPresence, index) => {
        return (
          <RichPresence
            key={index}
            activity={richPresence.activity}
            theme={richPresence.theme ?? "dark"}
            size={richPresence.size ?? "normal"}
            style={{ marginBottom: 8 }}
          />
        );
      })}
    </>
  );
};

export default App;
