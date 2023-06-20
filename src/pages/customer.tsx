import { connection } from "@/api";
import Footer from "@/componentes/Footer";
import Header from "@/componentes/Header";
import ResponsiveDrawer from "@/componentes/Layout";
import { IClientes } from "@/interfaces/clientes.interface";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  List,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { useState } from "react";

const CustomerPage = (cliente: any) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ResponsiveDrawer title="Cliente" />
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
        <List>
          {cliente?.cliente.map((row: IClientes) => (
            <>
              <ListItem key={row.id}>
                <Box>
                  <span>id:</span>
                  <span>{row.id}</span>
                </Box>
                <Box>
                  <span>nome:</span>
                  <span>{row.nome}</span>
                </Box>
                <Box>
                  <span>tipoDocumento:</span>
                  <span>{row.tipoDocumento}</span>
                </Box>
                <Box>
                  <span>numeroDocumento:</span>
                  <span>{row.numeroDocumento}</span>
                </Box>
                <Box>
                  <span>logradouro:</span>
                  <span>{row.logradouro}</span>
                </Box>
                <Box>
                  <span>numero:</span>
                  <span>{row.numero}</span>
                </Box>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Container>
      <Footer />
    </>
  );
};

export default CustomerPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const cli = await connection.get("/Cliente");
  const cliente = await cli.data;

  return { props: { cliente } };
};
