import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updatePasswordApi } from "../../../api/user";

const ChangePasswordForm = ({ user, logout }) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const resp = await updatePasswordApi(user.id, formData.password, logout);
      if (!resp) {
        toast.error("Error al cambiar contraseña");
      } else {
        logout();
      }
      setLoading(false);
    },
  });
  return (
    <div className="change-password-form">
      <h4>Cambiar tu contraseña</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="password"
            type="password"
            placeholder="nueva contraseña"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <Form.Input
            name="repeatPassword"
            type="password"
            placeholder="confirmar nueva contraseña"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            error={formik.errors.repeatPassword}
          />
        </Form.Group>
        <Button type="submit" className="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;

const initialValues = () => {
  return {
    password: "",
    repeatPassword: "",
  };
};

const validationSchema = () => {
  return {
    password: Yup.string()
      .required(true)
      .oneOf([Yup.ref("repeatPassword")], true),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
};
