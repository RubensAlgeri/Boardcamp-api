import connection from "../db.js";

export async function buscarJogos(req, res) {
    const { name } = req.query;
    if (name) {
        const resultadoJogos = await connection.query(`
        select games.*,categories.name as category
        from games
        join categories on games."categoryId" = categories.id
        where lower(games.name) like $1
        `, [`${name}%`])
        if (!resultadoJogos.rows[0]) return res.sendStatus(404)
        res.send(resultadoJogos.rows)
    } else {
        const resultadoJogos = await connection.query(`
        select games.*,categories.name as category
        from games
        join categories on games."categoryId" = categories.id
        `)
        res.send(resultadoJogos.rows)
    }
}

export async function inserirJogo(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    const checarNome = await connection.query('select * from games where name = $1', [name])
    if (checarNome.rows[0]) return res.status(409).send("Já existe um jogo com este nome")
    const checarCategoria = await connection.query('select * from categories where id = $1', [categoryId])
    if (!checarCategoria.rows[0]) return res.status(400).send("Esta categoria não existe")

    await connection.query('insert into games (name,image,"stockTotal","categoryId","pricePerDay") values ($1,$2,$3,$4,$5)',
        [name, image, stockTotal, categoryId, pricePerDay])

    res.sendStatus(201)
}