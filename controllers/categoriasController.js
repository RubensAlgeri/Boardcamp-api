import connection from "../db.js";

export async function buscarCategorias(req, res) {
    const resultadoCategorias = await connection.query(`
    select * from categories
    `)
    res.send(resultadoCategorias.rows)
}

export async function inserirCategoria(req, res) {
    const { name } = req.body;

    const checarNome = await connection.query('select * from categories where name = $1', [name])
    if (checarNome.rows[0]) return res.status(409).send("Já existe uma categoria com este nome")

    await connection.query(`
    insert into categories (name) values ($1)`, [name])
    res.sendStatus(201)
}