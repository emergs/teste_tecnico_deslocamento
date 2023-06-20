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
  Input,
  List,
  ListItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CustomerPage = (cliente: any) => {

  //estado para guardar o cliente que está sendo buscado por id
  const [customer, setCustomer] = useState('');

  //controle do modal 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //estilo do modal
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

  //função para criar cliente
  const createCustomer = async (data: IClientes) => {
    console.log(data)
    try {
      const request = await connection.post("/Cliente", data);
      console.log("Cliente criado com sucesso");
      //usar snackbar do mui para mensagens pro usuário
    } catch (error) {
      console.log(error)
    }
  }

  //função para buscar cliente pelo id
  useEffect(() => {
    const seekCustomer = async () => {
      console.log(customer);
      try {
        const request = await connection.get(`/Cliente/${customer}`);
        console.log(request);
      } catch (error) {
        console.log(error);
      }
    };

    seekCustomer();
  }, [customer]);

  const { handleSubmit, register, formState: { errors } } = useForm<IClientes>()

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          height: "100vh",
          width: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ResponsiveDrawer title="Cliente">
          <Button onClick={handleOpen}>Criar cliente</Button>
          <TextField
            label="Pesquisar"
            {...register('nome')}
            type="number"
            value={customer}
            onChange={seekCustomer}
          />
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
              <form onSubmit={handleSubmit(createCustomer)}>
                <TextField id="outlined-basic" label="Nome" variant="outlined" {...register('nome')} />
                <TextField id="outlined-basic" label="Numero do Documento" variant="outlined" {...register('numeroDocumento')} />
                <TextField id="outlined-basic" label="Tipo do Documen" variant="outlined" {...register('tipoDocumento')} />
                <TextField id="outlined-basic" label="Logradouro" variant="outlined" {...register('logradouro')} />
                <TextField id="outlined-basic" label="Número" variant="outlined" {...register('numero')} />
                <TextField id="outlined-basic" label="Bairro" variant="outlined" {...register('bairro')} />
                <TextField id="outlined-basic" label="Cidade" variant="outlined" {...register('cidade')} />
                <TextField id="outlined-basic" label="UF" variant="outlined" {...register('uf')} />
                <Button type="submit">Cadastrar</Button>
              </form>
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
        </ResponsiveDrawer>
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
