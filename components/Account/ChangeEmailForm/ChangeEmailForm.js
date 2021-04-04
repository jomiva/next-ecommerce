import React, { useState } from "react";
import { useFormik } from "formik";
import { Form, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateEmailApi } from "../../../api/user";

const ChangeEmailForm = ({ user, logout, setReloadUser }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const resp = await updateEmailApi(user.id, formData.email, logout);
      if (!resp || resp?.statusCode === 400) {
        toast.error("Error al actualizar el email");
      } else {
        setReloadUser(true);
        toast.success("Email cambiado exitosamente");
        formik.handleReset();
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-email-form">
      <h4>
        Cambia tu email <span>(Tu email actual es: {user.email}</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            onChange={formik.handleChange}
            error={formik.errors.email}
            name="email"
            placeholder="Tu nuevo e-mail"
            value={formik.values.email}
          />
          <Form.Input
            onChange={formik.handleChange}
            error={formik.errors.repeatEmail}
            value={formik.values.repeatEmail}
            name="repeatEmail"
            placeholder="Confirma tu nuevo e-mail"
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
};

export default ChangeEmailForm;

const initialValues = () => {
  return {
    email: "",
    repeatEmail: "",
  };
};

const validationSchema = () => {
  return {
    email: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("repeatEmail")], true),
    repeatEmail: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("email")], true),
  };
};
