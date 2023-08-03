let bancodedados = require("../bancodedados");


function listaDeContas(req, res) {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        return res.status(400).json({ mensagem: 'A senha do banco é obrigatória.' });
    }
    if (senha_banco !== bancodedados.banco.senha) {
        return res.status(401).json({ mensagem: 'Senha do banco inválida.' });
    }
    return res.status(200).json(bancodedados.contas);
};

function criarContas(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome é Obrigatório.' })
    };
    if (!cpf) {
        return res.status(400).json({ mensagem: 'O cpf é Obrigatório.' })
    };
    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'A data de nascimento é Obrigatório.' })
    };
    if (!telefone) {
        return res.status(400).json({ mensagem: 'O telefone é Obrigatório.' })
    };
    if (!email) {
        return res.status(400).json({ mensagem: 'O email é Obrigatório.' })
    };
    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha é Obrigatório.' })
    };

    for (let conta of bancodedados.contas) {
        if (conta.usuario.cpf === cpf) {
            return res.status(400).json({ mensagem: 'CPF já está cadastrado em outra conta.' })
        }
        if (conta.usuario.email === email) {
            return res.status(400).json({ mensagem: 'Email já está cadastrado em outra conta.' })
        }
    }

    let contadorDeContas = 0;
    contadorDeContas++;
    const novoNumeroDaConta = contadorDeContas.toString()


    const novaConta = {
        numero: novoNumeroDaConta,
        saldo: 0,
        usuario: {
            nome: nome,
            cpf: cpf,
            data_nascimento: data_nascimento,
            telefone: telefone,
            email: email,
            senha: senha,
        }

    }
    bancodedados.contas.push(novaConta);
    return res.status(201).json(novaConta);


}

function atualizarDados(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numero } = req.params;

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        return res.status(400).json({ mensagem: 'É necessário informar um ou mais campos do usuário para atualizar.' });
    }

    const cpfExistente = bancodedados.contas.some(function (contaExistente) {
        return contaExistente.numero !== numero && contaExistente.usuario.cpf === cpf;
    })
    if (cpf && cpfExistente) {
        return res.status(400).json({ mensagem: 'CPF já está cadastrado em outra conta.' })
    }

    const emailExistente = bancodedados.contas.some(function (contaExistente) {
        return contaExistente.numero !== numero && contaExistente.usuario.email === email;
    })
    if (email && emailExistente) {
        return res.status(400).json({ mensagem: 'Email já está cadastrado em outra conta.' })
    }

    const atualizarConta = bancodedados.contas.find(function (conta) {
        return conta.numero === numero;
    })
    if (!atualizarConta) {
        return res.status(404).json({ mensagem: 'A conta não foi encontrada.' })
    }
    atualizarConta.usuario.nome = nome;
    atualizarConta.usuario.cpf = cpf;
    atualizarConta.usuario.data_nascimento = data_nascimento;
    atualizarConta.usuario.email = email;
    atualizarConta.usuario.telefone = telefone;
    atualizarConta.usuario.senha = senha;

    return res.status(200).json({ mensagem: 'Os dados da conta foram atualizados com sucesso!' })
}

function deletarConta(req, res) {
    const { numero } = req.params;
    const excluirConta = bancodedados.contas.findIndex(function (conta) {
        return conta.numero === numero;
    })
    if (excluirConta === -1) {
        return res.status(404).json({ mensagem: 'A conta não foi encontrada' });
    }
    bancodedados.contas.splice(excluirConta, 1)
    return res.status(200).json({ mensagem: 'A conta foi excluida com sucesso!' })
}


module.exports = {
    listaDeContas,
    criarContas,
    atualizarDados,
    deletarConta
};