import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components";
import { Router } from "./Router";
import { UserProvider } from "./context";

const App: FC = () => {
  return (
    <>
      <Toaster position="bottom-center" toastOptions={{ duration: 1000 }} />
      <UserProvider>
        <Router>
          <Navbar />
        </Router>
      </UserProvider>
    </>
  );
};

export default App;
