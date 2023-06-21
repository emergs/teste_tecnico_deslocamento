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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { log } from "console";
import { GetServerSideProps } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CustomerPage = (cliente: any) => {
  //estado para guardar o cliente que está sendo buscado por id
  const [customer, setCustomer] = useState<IClientes>({} as IClientes);
  const [searchCustomer, setSearchCustomer] = useState<string>("");

  //controle do modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //controle do modal de edição
  const [openModalUpdateCustomer, setOpenModalUpdateCustomer] = useState(false);
  const handleOpenModalUpdateCustomer = () => setOpenModalUpdateCustomer(true);
  const handleCloseModalUpdateCustomer = () =>
    setOpenModalUpdateCustomer(false);

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
    console.log(data);
    try {
      const request = await connection.post("/Cliente", data);
      console.log("Cliente criado com sucesso");
      //usar snackbar do mui para mensagens pro usuário
    } catch (error) {
      console.log(error);
    }
  };

  //função para buscar cliente pelo id
  const handleIdCustomer = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchCustomer(event.target.value);
  };
  useEffect(() => {
    const seekCustomer = async () => {
      try {
        const request = await connection.get(`/Cliente/${searchCustomer}`);
        setCustomer(request.data);
        console.log(customer);
      } catch (error) {
        console.log(error);
      }
    };

    seekCustomer();
  }, [searchCustomer]);

  //função para deletar cliente
  const deleteCustomer = async (id: string) => {
    try {
      await connection.delete(`/Cliente/${id}`, {
        data: { id: `${id}` },
      });
      console.log("Cliente deletado com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  //pegar id e abrir modal
  const updateCustomerId = async (id: string) => {
    getCustomerForId(id);
    handleOpenModalUpdateCustomer();
  };

  //pegar cliente pelo id
  const getCustomerForId = async (id: string) => {
    try {
      const request = await connection.get(`/Cliente/${id}`);
      setCustomer(request.data);
      console.log(customer);
    } catch (error) {
      console.log(error);
    }
  };
  //funçao para atualizar cliente
  const updateCustomer = async (id: string, data: IClientes) => {
    try {
      await connection.put(`/Cliente/${id}`, {
        data: {
          id: id,
          numeroDocumento: data.numeroDocumento,
          tipoDocumento: data.tipoDocumento,
          nome: data.nome,
          logradouro: data.logradouro,
          numero: data.numero,
          bairro: data.bairro,
          cidade: data.cidade,
          uf: data.uf,
        },
      });
      console.log("Cliente atualizado com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  //quando clicar em editar: recuperar informações do id e abrir no modal

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IClientes>();

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
            {...register("nome")}
            type="number"
            value={searchCustomer}
            onChange={handleIdCustomer}
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
                <TextField
                  id="outlined-basic"
                  label="Nome"
                  variant="outlined"
                  {...register("nome")}
                />
                <TextField
                  id="outlined-basic"
                  label="Numero do Documento"
                  variant="outlined"
                  {...register("numeroDocumento")}
                />
                <TextField
                  id="outlined-basic"
                  label="Tipo do Documen"
                  variant="outlined"
                  {...register("tipoDocumento")}
                />
                <TextField
                  id="outlined-basic"
                  label="Logradouro"
                  variant="outlined"
                  {...register("logradouro")}
                />
                <TextField
                  id="outlined-basic"
                  label="Número"
                  variant="outlined"
                  {...register("numero")}
                />
                <TextField
                  id="outlined-basic"
                  label="Bairro"
                  variant="outlined"
                  {...register("bairro")}
                />
                <TextField
                  id="outlined-basic"
                  label="Cidade"
                  variant="outlined"
                  {...register("cidade")}
                />
                <TextField
                  id="outlined-basic"
                  label="UF"
                  variant="outlined"
                  {...register("uf")}
                />
                <Button type="submit">Cadastrar</Button>
              </form>
            </Box>
          </Modal>

          <Modal
            open={openModalUpdateCustomer}
            onClose={handleCloseModalUpdateCustomer}
            aria-labelledby="modal-update-customer"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={handleSubmit(updateCustomer)}>
                <TextField
                  id="outlined-basic"
                  label="Nome"
                  variant="outlined"
                  {...register("nome")}
                />
                <TextField
                  id="outlined-basic"
                  label="Numero do Documento"
                  variant="outlined"
                  {...register("numeroDocumento")}
                />
                <TextField
                  id="outlined-basic"
                  label="Tipo do Documen"
                  variant="outlined"
                  {...register("tipoDocumento")}
                />
                <TextField
                  id="outlined-basic"
                  label="Logradouro"
                  variant="outlined"
                  {...register("logradouro")}
                />
                <TextField
                  id="outlined-basic"
                  label="Número"
                  variant="outlined"
                  {...register("numero")}
                />
                <TextField
                  id="outlined-basic"
                  label="Bairro"
                  variant="outlined"
                  {...register("bairro")}
                />
                <TextField
                  id="outlined-basic"
                  label="Cidade"
                  variant="outlined"
                  {...register("cidade")}
                />
                <TextField
                  id="outlined-basic"
                  label="UF"
                  variant="outlined"
                  {...register("uf")}
                />
                <Button type="submit">Cadastrar</Button>
              </form>
            </Box>
          </Modal>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Tipo de Documento</TableCell>
                  <TableCell>Numero do Documento</TableCell>
                  <TableCell>Logradouro</TableCell>
                  <TableCell>Número</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cliente?.cliente.map((row: IClientes) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.nome}</TableCell>
                    <TableCell>{row.tipoDocumento}</TableCell>
                    <TableCell>{row.numeroDocumento}</TableCell>
                    <TableCell>{row.logradouro}</TableCell>
                    <TableCell>{row.numero}</TableCell>
                    <TableCell>
                      <Button
                        id={`${row.id}`}
                        onClick={(e: any) => deleteCustomer(e.target.id)}
                      >
                        DELETE
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        id={`${row.id}`}
                        onClick={(e: any) => updateCustomerId(e.target.id)}
                      >
                        EDITAR
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
