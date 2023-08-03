const express = require("express");
const rotas = express();

const contas = require("./controladores/contas");
const transacoes = require("./controladores/transacoes");

rotas.get("/contas", contas.listaDeContas);
rotas.post("/contas", contas.criarContas);
rotas.put("/contas/:numero/usuario", contas.atualizarDados);
rotas.delete("/contas/:numero", contas.deletarConta);
rotas.post("/transacoes/depositar", transacoes.depositar);
rotas.post("/transacoes/sacar", transacoes.sacar);
rotas.post("/transacoes/transferir", transacoes.transferir);


module.exports = rotas;