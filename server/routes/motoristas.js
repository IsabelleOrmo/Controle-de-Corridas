import express from "express";
import {
  cadastrarMotorista,
  excluirMotorista,
  buscarTodosMotoristas,
  buscarMotorista,
  alterarMotorista,
} from "../controller/motoristas.js";

const router = express.Router();

const motoristasRoutes = (db) => {
  router.post("/cadastrar", (req, res) => cadastrarMotorista(req, res, db));
  router.delete("/excluir/:id", (req, res) => excluirMotorista(req, res, db));
  router.get("/buscar", (req, res) => buscarTodosMotoristas(req, res, db));
  router.get("/buscar/:id", (req, res) => buscarMotorista(req, res, db));
  router.patch("/alterar/:id", (req, res) => alterarMotorista(req, res, db));

  return router;
};

export default motoristasRoutes;
