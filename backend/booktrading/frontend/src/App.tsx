import { FC } from "react";
import { Navbar } from "./components";
import { Router } from "./Router";

const App: FC = () => {
  return (
    <>
      <Router>
        <Navbar />
      </Router>
    </>
  );
};

export default App;
