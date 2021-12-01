import { UserContext } from "./context";
import Router from "./router";

function App() {
  return (
    <>
      <UserContext>
        <Router />
      </UserContext>
    </>
  );
}

export default App;
