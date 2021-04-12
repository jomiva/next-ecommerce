import React, { useEffect, useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from "next/link";
import className from "classnames";
import { getAddressesApi } from "../../../api/adress";
import useAuth from "../../../hooks/useAuth";
import classNames from "classnames";

const AddressShipping = ({ setAddress }) => {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();
  const [addressActive, setAddressActive] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);

  return (
    <div className="address-shipping">
      <div className="title">Dirección de envíos</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <>
            <h3> No hay ninguna direccion creada</h3>
            <Link href="/account">
              <a>Agrega una direccion</a>
            </Link>
          </>
        ) : (
          <Grid>
            {map(addresses, (address) => (
              <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                <Adress
                  address={address}
                  setAddressActive={setAddressActive}
                  setAddress={setAddress}
                  addressActive={addressActive}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default AddressShipping;

const Adress = ({ address, setAddressActive, setAddress, addressActive }) => {
  const changeAddress = () => {
    setAddressActive(address._id);
    setAddress(address);
  };

  return (
    <div
      className={classNames("address", {
        active: addressActive === address._id,
      })}
      onClick={changeAddress}
    >
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.city}, {address.state}, {address.code}
      </p>
    </div>
  );
};
