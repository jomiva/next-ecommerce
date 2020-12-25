import { useCallback, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = ({ setShowModal, setTitleModal }) => {
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = useCallback((state) => {
    state ? setTitleModal("Iniciar sesión") : setTitleModal("Registrarse");
    setShowLogin(state);
  }, []);

  return showLogin ? (
    <LoginForm showLoginForm={showLoginForm} setShowModal={setShowModal} />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
};

export default Auth;
