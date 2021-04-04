import React, { useEffect, useState } from "react";
import { map, size } from "lodash";
import { Grid, Button } from "semantic-ui-react";
import { getAddressesApi, deleteAddressApi } from "../../../api/adress";
import useAuth from "../../../hooks/useAuth";

const ListAddress = ({ setReloadAddresses, reloadAddresses, openModal }) => {
  const [adresses, setAdresses] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAdresses(response || []);
      setReloadAddresses(false);
    })();
  }, [reloadAddresses]);

  if (adresses === null) return null;

  return (
    <div className="list-address">
      {size(adresses) === 0 ? (
        <h3>No hay ninguna direccion creada</h3>
      ) : (
        <Grid>
          {map(adresses, (address) => (
            <Grid.Column key={address.id} mobile={16} table={8} computer={4}>
              <Address
                setReloadAddresses={setReloadAddresses}
                logout={logout}
                address={address}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ListAddress;

const Address = ({ openModal, address, logout, setReloadAddresses }) => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteAddress = async () => {
    setLoadingDelete(true);
    const response = await deleteAddressApi(address._id, logout);
    if (response) setReloadAddresses(true);
    setLoadingDelete(false);
  };

  const updateAddress = () => {
    openModal(`Editar: ${address.title}`, address);
  };

  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city}, {address.postalCode}
      </p>
      <p>{address.phone}</p>
      <div className="actions">
        <Button onClick={updateAddress} primary>
          Editar
        </Button>
        <Button loading={loadingDelete} onClick={deleteAddress}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};
