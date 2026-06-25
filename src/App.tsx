import "./App.css";
import { useAppState } from "./hooks";
import { Main } from "./components/";
import { Header } from "./components/ui";
import { LoginModal } from "./components/forms";

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

  return auth.isLoggedIn ? renderHomePage() : renderLoginPage();
}

export default App;
