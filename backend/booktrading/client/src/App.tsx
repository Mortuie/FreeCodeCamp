import { Navbar } from "./components";
import { UserContext } from "./context";
import Router from "./router";
import { createGlobalStyle } from "styled-components";
import { ApiProvider } from "./hooks/useApi";
import { UserResponse } from "./types";

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

interface Props {
  initialUser: null | UserResponse;
}

const App = ({ initialUser }: Props) => {
  return (
    <>
      <ApiProvider>
        <UserContext initialUser={initialUser}>
          <GlobalStyle />
          <Navbar />
          <Router />
        </UserContext>
      </ApiProvider>
    </>
  );
};

export default App;
