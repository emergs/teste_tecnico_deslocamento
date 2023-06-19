import { connection } from "@/api";
import Footer from "@/componentes/Footer";
import Header from "@/componentes/Header";
import { IClientes } from "@/interfaces/clientes.interface";
import { Box, Container, CssBaseline, Divider, List, ListItem } from "@mui/material";
import { GetServerSideProps } from "next";

const CustomerPage = (cliente: any) => {
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
        <Header />
        <List>
          {cliente?.cliente.map((row: IClientes) => (
            <>
              <ListItem key={row.id}>
                <Box><span>id:</span><span>{row.id}</span></Box>
                <Box><span>nome:</span><span>{row.nome}</span></Box>
                <Box><span>tipoDocumento:</span><span>{row.tipoDocumento}</span></Box>
                <Box><span>numeroDocumento:</span><span>{row.numeroDocumento}</span></Box>
                <Box><span>logradouro:</span><span>{row.logradouro}</span></Box>
                <Box><span>numero:</span><span>{row.numero}</span></Box>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>

      </Container>
      <Footer />
    </>
  )
}

export default CustomerPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const cli = await connection.get("/Cliente");
  const cliente = await cli.data;

  return { props: { cliente } };
};