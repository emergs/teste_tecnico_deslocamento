import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { GetServerSideProps } from "next";
import Footer from "@/componentes/Footer";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SwipeableTemporaryDrawer from "@/componentes/Layout";
import Header from "@/componentes/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const customers = [
    {
      name: "Emer",
      email: "eu@mail",
      phone: "4178789898",
      address: "Rua das flores",
      cpf: "01101101111",
    },
  ];

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
        <Box sx={{ height: "100%" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>Endereço</TableCell>
                  <TableCell>CPF</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers?.map((row: any) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.cpf}</TableCell>
                    <TableCell>
                      <Button
                        id={row._id}
                        onClick={(e: any) => console.log(e.target.id)}
                      >
                        DELETAR
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        id={row._id}
                        onClick={(e: any) => console.log(e.target.id)}
                      >
                        EDITAR
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
