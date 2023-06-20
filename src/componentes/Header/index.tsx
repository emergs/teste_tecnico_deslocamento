import { Box, Button, Container, Icon, IconButton } from "@mui/material";
import SwipeableTemporaryDrawer from "@/componentes/Layout";
import MenuIcon from "@mui/icons-material/Menu";
import { useDrawerContext } from "@/context/DrawerContext";
import { MenuLateral } from "../MenuLateral";

const Header = () => {
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

  const teste = () => {
    toggleDrawerOpen;
    console.log(toggleDrawerOpen);
  };

  return (
    <header style={{ width: "100vw", padding: "1rem 0" }}>
      <Box display="flex" gap={2}>
        <SwipeableTemporaryDrawer />
        <IconButton onClick={() => teste()}>
          <MenuIcon />
        </IconButton>
        <Button onClick={() => teste()}>Menu</Button>

        <Button variant="text" href="/customer">
          Clientes
        </Button>
        <Button variant="text" href="/driver">
          Condutores
        </Button>
        <Button variant="text" href="/vehicle">
          Veículos
        </Button>
        <Button variant="text" href="/displacement">
          Deslocamentos
        </Button>
      </Box>
    </header>
  );
};

export default Header;
