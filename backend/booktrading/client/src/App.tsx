import { Navbar } from "./components";
import { UserContext } from "./context";
import Router from "./router";
import { createGlobalStyle } from "styled-components";
import { ApiProvider } from "./hooks/useApi";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    display: flex;
    height: 100vh;
    width: 100%;
  }

  #root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const App = () => {
  return (
    <>
      <ApiProvider>
        <UserContext>
          <GlobalStyle />
          <Navbar />
          <Router />
        </UserContext>
      </ApiProvider>
    </>
  );
};

export default App;
