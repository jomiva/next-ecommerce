import { useEffect, useState } from "react";
import { Container, Grid, Input } from "semantic-ui-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TopBar() {
  return (
    <div className="top-bar">
      <Container>
        <Grid className="top-bar">
          <Grid.Column width={8} className="top-bar__left">
            <Logo />
          </Grid.Column>
          <Grid.Column width={8} className="top-bar__right">
            <Search />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/">
      <a>
        <Image src="/logo.png" width="600" height="100" alt="Gaming" />
      </a>
    </Link>
  );
}

function Search() {
  const [searchStr, setSearchStr] = useState("");
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      router.push(`/search?query=${searchStr}`);
    }
    setLoaded(true);
  }, [searchStr]);

  return (
    <Input
      id="search-game"
      value={router.query.query}
      icon={{ name: "search" }}
      onChange={(_, data) => setSearchStr(data.value)}
    />
  );
}
