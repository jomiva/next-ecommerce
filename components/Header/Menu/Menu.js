import React, { useCallback, useEffect, useState } from "react";
import { Container, Menu, Grid, Icon } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";

export default function MenuWeb() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar sesión");
  const { auth, logout } = useAuth();

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth]);

  const hideModal = useCallback((state) => {
    setShowModal(state);
  }, []);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatforms />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            {user !== undefined && (
              <MenuOptions setShow={hideModal} user={user} logout={logout} />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={hideModal}
        title={titleModal}
        size="small"
      >
        <Auth setShowModal={hideModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}

function MenuPlatforms() {
  return (
    <Menu>
      <Link href="/play-station">
        <Menu.Item as="a">Playstation</Menu.Item>
      </Link>
      <Link href="/xbox">
        <Menu.Item as="a">xbox</Menu.Item>
      </Link>
      <Link href="/switch">
        <Menu.Item as="a">switch</Menu.Item>
      </Link>
    </Menu>
  );
}

const MenuOptions = React.memo(({ setShow, user, logout }) => {
  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            <Menu.Item as="a">
              <Icon name="game" />
              Mis pedidos
            </Menu.Item>
          </Link>
          <Link href="/wishlist">
            <Menu.Item as="a">
              <Icon name="heart outline" />
              Wishlist
            </Menu.Item>
          </Link>
          <Link href="/account">
            <Menu.Item as="a">
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
            </Menu.Item>
          </Link>
          <Menu.Item onClick={logout} className="m-0">
            <Icon name="power off" />
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={() => setShow(true)}>
          <Icon name="user outline" />
          <span>Mi cuenta</span>
        </Menu.Item>
      )}
    </Menu>
  );
});
