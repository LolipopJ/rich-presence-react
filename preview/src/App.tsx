import "./App.css";

import RichPresence from "rich-presence";

import { TEST_ACTIVITIES } from "./constants";

function App() {
  return (
    <>
      {TEST_ACTIVITIES.map((activity, index) => {
        return <RichPresence key={index} activity={activity} />;
      })}
    </>
  );
}

export default App;
