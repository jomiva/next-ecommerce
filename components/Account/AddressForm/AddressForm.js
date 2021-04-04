import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import { createAdressApi } from "../../../api/adress";
import useAuth from "../../../hooks/useAuth";

const AddressForm = ({ setShowModal, setReloadAddresses, address }) => {
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: address ?? initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      address ? console.log("actualizo") : createAdress(formData);
    },
  });

  const createAdress = async (formData) => {
    setLoading(true);
    const formDataTemp = { ...formData, user: auth.idUser };
    const resp = await createAdressApi(formDataTemp, logout);
    if (!resp) {
      toast.warning("Error al crear la direccion");
      setLoading(false);
    } else {
      formik.resetForm();
      setReloadAddresses(true);
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        type="text"
        label="Titulo de la direccion"
        placeholder="titulo de la direccion"
        onChange={formik.handleChange}
        error={formik.errors.title}
        value={formik.values.title}
      />
      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          label="Nombre y apellidos"
          placeholder="nombre y apellidos"
          onChange={formik.handleChange}
          error={formik.errors.name}
          value={formik.values.name}
        />
        <Form.Input
          name="address"
          type="text"
          label="Direccion"
          placeholder="Direccion"
          onChange={formik.handleChange}
          error={formik.errors.address}
          value={formik.values.address}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="city"
          type="text"
          label="Ciudad"
          placeholder="Ciudad"
          onChange={formik.handleChange}
          error={formik.errors.city}
          value={formik.values.city}
        />
        <Form.Input
          name="state"
          type="text"
          label="Estado/Provincia/Region"
          placeholder="Estado/Provincia/Region"
          onChange={formik.handleChange}
          error={formik.errors.state}
          value={formik.values.state}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="postalCode"
          type="text"
          label="codigo postal"
          placeholder="codigo postal"
          onChange={formik.handleChange}
          error={formik.errors.postalCode}
          value={formik.values.postalCode}
        />
        <Form.Input
          name="phone"
          type="text"
          label="numero de telefono"
          placeholder="numero de telefono"
          onChange={formik.handleChange}
          error={formik.errors.phone}
          value={formik.values.phone}
        />
      </Form.Group>
      <div className="actions">
        <Button className="submit" type="submit" loading={loading}>
          {address ? "Actualizar" : "Crear direccion"}
        </Button>
      </div>
    </Form>
  );
};

export default AddressForm;

const initialValues = () => {
  return {
    title: "",
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  };
};

const validationSchema = () => {
  return {
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    postalCode: Yup.string().required(true),
    phone: Yup.string().required(true),
  };
};
