import "./App.css";
import { useAppState } from "./hooks";
import { Header, LoginModal, Main } from "./components/";

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
