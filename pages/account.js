import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm/ChangePasswordForm";
import BasicModal from "../components/Modal/BasicModal";
import AddressForm from "../components/Account/AddressForm/AddressForm";
import ListAddress from "../components/Account/ListAddress/ListAddress";

const Account = () => {
  const router = useRouter();
  const { auth, logout, setReloadUser } = useAuth();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;

  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Adresses />
    </BasicLayout>
  );
};

export default Account;

const Configuration = ({ user, logout, setReloadUser }) => {
  return (
    <div className="account__configuration">
      <div className="title">Configuracion</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangePasswordForm user={user} logout={logout} />
      </div>
    </div>
  );
};

const Adresses = () => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);
  const [reloadAddresses, setReloadAddresses] = useState(false);

  const openModal = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setReloadAddresses={setReloadAddresses}
        setShowModal={setShowModal}
        address={address}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="account__addresses">
      <div className="title">
        Direcciones
        <Icon name="plus" onClick={() => openModal("Nueva direccion")} />
      </div>
      <div className="data">
        <ListAddress
          reloadAddresses={reloadAddresses}
          setReloadAddresses={setReloadAddresses}
          openModal={openModal}
        />
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
};
