import { Button, Container } from "@mui/material";
import SwipeableTemporaryDrawer from "@/componentes/Layout";

const Header = () => {
  return (
    <header style={{ width: "100vw" }}>
      <Container sx={{ display: "flex" }}>
        <SwipeableTemporaryDrawer />
        <Button variant="text">Clientes</Button>
        <Button variant="text">Condutores</Button>
        <Button variant="text">Veículos</Button>
        <Button variant="text">Deslocamentos</Button>
      </Container>
    </header>
  );
};

export default Header;
