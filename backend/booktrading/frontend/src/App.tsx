import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components";
import { Router } from "./Router";
import { ApiProvider, ModalProvider, UserProvider } from "./context";

const App: FC = () => {
  return (
    <>
      <Toaster position="bottom-center" toastOptions={{ duration: 1000 }} />
      <ModalProvider>
        <ApiProvider>
          <UserProvider>
            <Router>
              <Navbar />
            </Router>
          </UserProvider>
        </ApiProvider>
      </ModalProvider>
    </>
  );
};

export default App;
