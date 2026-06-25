import "./App.css";
import { useAppState, ModalProvider } from "./hooks";
import { Main } from "./components/";
import { Header } from "./components/ui";
import { LoginModal } from "./components/forms";
import { ModalRenderer } from "./components/ModalRenderer";

function App() {
  const { state } = useAppState();
  const { auth } = state;

  const renderHomePage = () => (
    <>
      <Header />
      <Main />
    </>
  );

  const renderLoginPage = () => (
    <>
      <LoginModal />
    </>
  );

  return (
    <ModalProvider>
      <ModalRenderer />
      {auth.isLoggedIn ? renderHomePage() : renderLoginPage()}
    </ModalProvider>
  );
}

export default App;
