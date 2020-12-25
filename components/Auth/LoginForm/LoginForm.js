import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { loginApiUser, resetPasswordApi } from "../../../api/user";

const LoginForm = ({ setShowModal, showLoginForm }) => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        setLoading(true);
        const resp = await loginApiUser(formData);
        setLoading(false);
        if (resp?.jwt) {
          login(resp.jwt);
          setShowModal(false);
        } else {
          toast.error("El email o contraseña son incorrectos");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const resetPassword = () => {
    formik.setErrors({});
    const validateEmail = Yup.string().email().required();
    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({ identifier: true });
    } else {
      console.log("email valido");
      resetPasswordApi(formik.values.identifier);
    }
  };

  return (
    <>
      <Form
        autoComplete="off"
        className="login-form"
        onSubmit={formik.handleSubmit}
      >
        <Form.Input
          name="identifier"
          type="text"
          placeholder="Correo electronico"
          onChange={formik.handleChange}
          error={formik.errors.identifier}
        />
        <Form.Input
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Contraseña"
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <div className="actions">
          <Button type="button" basic onClick={() => showLoginForm(false)}>
            Registrarse
          </Button>
          <div>
            <Button className="submit" type="submit" loading={loading}>
              Entrar
            </Button>
            <Button type="button" onClick={resetPassword}>
              Has olvidado la contraseña?
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;

const initialValues = () => {
  return {
    identifier: "",
    password: "",
  };
};

const validationSchema = () => {
  return {
    identifier: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
};
