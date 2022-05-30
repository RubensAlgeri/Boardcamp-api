import connection from "../db.js";

export async function buscarClientes(req, res) {
    const { id } = req.params;
    const { cpf } = req.query;

    if (cpf) {
        const resultadoClientes = await connection.query(`
        SELECT * FROM customers where cpf like $1
        `, [`${cpf}%`])
        if (!resultadoClientes.rows[0]) return res.sendStatus(404)
        res.send(resultadoClientes.rows)
    } else if (!id) {
        const resultadoClientes = await connection.query(`
        SELECT * FROM customers
        `)
        res.send(resultadoClientes.rows)
    } else {
        const resultadoClientes = await connection.query(`
        SELECT * FROM customers where id = $1
        `, [Number(id)])
        res.send(resultadoClientes.rows[0])
    }
}

export async function inserirCliente(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const checarCPF = await connection.query('select * from customers where cpf = $1', [cpf])
    if (checarCPF.rows[0]) return res.sendStatus(409)
    await connection.query(`
    insert into customers (name,phone,cpf,birthday) values ($1,$2,$3,$4)
    `, [name, phone, cpf, birthday])

    res.sendStatus(201)
}

export async function atualizarCliente(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    if (name) await connection.query('update customers set name = $2 where id = $1', [Number(id), name])
    if (phone) await connection.query('update customers set phone = $2 where id = $1', [Number(id), phone])
    if (cpf) await connection.query('update customers set cpf = $2 where id = $1', [Number(id), cpf])
    if (birthday) await connection.query('update customers set birthday = $2 where id = $1', [Number(id), birthday])

    res.sendStatus(200)
}