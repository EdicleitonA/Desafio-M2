const express = require("express");
const rotas = express();

const contas = require("./controladores/contas");
const transacoes = require("./controladores/transacoes");

rotas.get("/contas", contas.listaDeContas);
rotas.post("/contas", contas.criarContas);


module.exports = rotas;