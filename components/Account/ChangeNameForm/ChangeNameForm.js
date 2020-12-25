import React, { useState } from "react";
import { Form, Button, FormField } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateNameApi } from "../../../api/user";

const ChangeNameForm = ({ user, logout, setReloadUser }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(user.name, user.lastname),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const resp = await updateNameApi(user.id, formData, logout);
      if (!resp) {
        toast.error("Error al actualizar el nombre y apellido");
      } else {
        setReloadUser(true);
        toast.success("Nombre y apellidos actualizados");
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-name-form">
      <h4>Cambia tu nombre y apellidos</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="name"
            placeholder="Nuevo nombre"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Form.Input
            name="lastname"
            placeholder="Nuevo apellido"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
        </Form.Group>
        <Button type="submit" className="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
};

export default ChangeNameForm;

const initialValues = (name = "", lastname = "") => {
  return {
    name,
    lastname,
  };
};

const validationSchema = () => {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
  };
};
