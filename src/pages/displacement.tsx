import { connection } from "@/api";
import Footer from "@/componentes/Footer";
import Header from "@/componentes/Header";
import ResponsiveDrawer from "@/componentes/Layout";
import { IDeslocamento } from "@/interfaces/deslocamentos.interface";
import {
  Box,
  Container,
  CssBaseline,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import { GetServerSideProps } from "next";

const DisplacementPage = (deslocamento: any) => {
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
        <ResponsiveDrawer />
        <List>
          {deslocamento?.deslocamento.map((row: IDeslocamento) => (
            <>
              <ListItem
                key={row.id}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Box>
                  <span>id:</span>
                  <span>{row.id}</span>
                </Box>
                <Box>
                  <span>Km Inicial:</span>
                  <span>{row.kmInicial}</span>
                </Box>
                <Box>
                  <span>Km Final:</span>
                  <span>{row.kmFinal}</span>
                </Box>
                <Box>
                  <span>Inicio do Deslocamento:</span>
                  <span>{row.inicioDeslocamento}</span>
                </Box>
                <Box>
                  <span>logradouro:</span>
                  <span>{row.fimDeslocamento}</span>
                </Box>
                <Box>
                  <span>numero:</span>
                  <span>{row.checkList}</span>
                </Box>
                <Box>
                  <span>numero:</span>
                  <span>{row.motivo}</span>
                </Box>
                <Box>
                  <span>numero:</span>
                  <span>{row.observacao}</span>
                </Box>
                <Box>
                  <span>numero:</span>
                  <span>{row.idCondutor}</span>
                </Box>
                <Box>
                  <span>numero:</span>
                  <span>{row.idVeiculo}</span>
                </Box>
                <Box>
                  <span>numero:</span>
                  <span>{row.idCliente}</span>
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

export default DisplacementPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const desloc = await connection.get("/Deslocamento");
  const deslocamento = await desloc.data;

  return { props: { deslocamento } };
};
