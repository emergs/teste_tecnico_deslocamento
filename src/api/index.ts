import axios from "axios";

export const connection = axios.create({
  baseURL: 'https://api-deslocamento.herokuapp.com/api/v1',
  timeout: 5000,
});