let bancodedados = require("../bancodedados");

function depositar(req, res) {

    const { numero_conta, valor } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'O Número da conta é Obrigatório' })
    }
    if (!valor) {
        return res.status(400).json({ mensagem: 'O valor é Obrigatório' })
    }

    const conta = bancodedados.contas.find(function (conta) {
        return conta.numero === numero_conta;
    });
    if (!conta) {
        return res.status(404).json({ mensagem: 'A conta não foi encontrada.' })
    }
    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor do deposito não pode ser negativo.' })
    }
    let data = new Date();
    const transacao = {
        data: data,
        numero_conta: numero_conta,
        valor: valor

    };
    bancodedados.depositos.push(transacao);

    return res.status(200).json({ mensagem: 'Deposito feito com sucesso!' })

}

function sacar(req, res) {

    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'O Número da conta é Obrigatório.' })
    }
    if (!valor) {
        return res.status(400).json({ mensagem: 'O valor  é Obrigatório.' })
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha é Obrigatória.' })
    }
    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor do saque deve ser positivo.' })
    }

    const conta = bancodedados.contas.find(function (conta) {
        return conta.numero === numero_conta;
    });

    if (!conta) {
        return res.status(404).json({ mensagem: 'A conta não foi encontrada.' })
    }
    if (senha !== conta.usuario.senha) {
        return res.status(400).json({ mensagem: 'A senha está incorreta.' })
    }
    if (valor > conta.saldo) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente para sacar.' })
    }

    let data = new Date();
    const transacao = {
        data: data,
        numero_conta: numero_conta,
        valor: valor,
        senha: senha


    };
    bancodedados.saques.push(transacao);
    conta.saldo -= valor

    return res.status(201).json({ mensagem: 'Saque feito com sucesso!' })

}

module.exports = {
    depositar,
    sacar
}