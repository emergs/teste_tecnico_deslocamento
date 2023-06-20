import { connection } from "@/api";
import Footer from "@/componentes/Footer";
import ResponsiveDrawer from "@/componentes/Layout";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";

interface ICondutor {
  id: number;
  nome: "string";
  numeroHabilitacao: "string";
  catergoriaHabilitacao: "string";
  vencimentoHabilitacao: "string";
}

const DriverPage = (condutor: any) => {
  console.log(condutor);
  return (
    <>
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
          {condutor?.condutor.map((row: ICondutor) => (
            <div key={row.id}>
              <ListItem
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box>
                  <Typography variant="h6">ID</Typography>
                  <Typography>{row.id}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">Nome</Typography>
                  <Typography>{row.nome}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">Número da Habilitação</Typography>
                  <Typography>{row.numeroHabilitacao}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">Categoria</Typography>
                  <Typography>{row.catergoriaHabilitacao}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">Vencimento</Typography>
                  <Typography>{row.vencimentoHabilitacao}</Typography>
                </Box>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Container>
      <Footer />
    </>
  );
};

export default DriverPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const cond = await connection.get("/Condutor");
  const condutor = await cond.data;

  return {
    props: { condutor },
  };
};
