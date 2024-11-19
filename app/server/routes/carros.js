import express from "express";
import {
  cadastrarCarro,
  excluirCarro,
  buscarCarro,
  buscarTodosCarros,
  alterarCarro,
} from "../controller/carros.js";

const router = express.Router();

const carrosRoutes = (db) => {
  router.post("/cadastrar", (req, res) => cadastrarCarro(req, res, db));
  router.delete("/excluir/:placa", (req, res) => excluirCarro(req, res, db));
  router.get("/buscar/:placa", (req, res) => buscarCarro(req, res, db));
  router.get("/buscar", (req, res) => buscarTodosCarros(req, res, db));
  router.patch("/alterar/:placa", (req, res) => alterarCarro(req, res, db));

  return router;
};

export default carrosRoutes;
