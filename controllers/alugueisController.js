import connection from "../db.js";
import dayjs from "dayjs";

export async function buscarAlugueis(req, res) {
    const { customerId, gameId } = req.query;

    const rentalsList = ((customerId !== undefined && gameId !== undefined) ?
        await connection.query(` 
    SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName", categories.id AS "categoryId", categories.name AS "categoryName"  
    FROM rentals 
    JOIN customers ON customers.id = rentals."customerId" 
    JOIN games ON games.id = rentals."gameId" 
    JOIN categories ON games."categoryId" = categories.id
    WHERE "customerId" = $1 and "gameId" = $2`, [Number(customerId), Number(gameId)]) :

        gameId !== undefined ? await connection.query(` 
        SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName", categories.id AS "categoryId", categories.name AS "categoryName"  
        FROM rentals 
        JOIN customers ON customers.id = rentals."customerId" 
        JOIN games ON games.id = rentals."gameId" 
        JOIN categories ON games."categoryId" = categories.id
        WHERE "gameId" = $1`, [Number(gameId)]) :

            customerId !== undefined ? await connection.query(` 
            SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName", categories.id AS "categoryId", categories.name AS "categoryName"  
            FROM rentals 
            JOIN customers ON customers.id = rentals."customerId" 
            JOIN games ON games.id = rentals."gameId" 
            JOIN categories ON games."categoryId" = categories.id
            WHERE "customerId" = $1`, [Number(customerId)]) :

                await connection.query(` 
                SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName", categories.id AS "categoryId", categories.name AS "categoryName"  
                FROM rentals 
                JOIN customers ON customers.id = rentals."customerId" 
                JOIN games ON games.id = rentals."gameId" 
                JOIN categories ON games."categoryId" = categories.id`))


    let rentals = rentalsList.rows;

    const sendRentals = [];
    for (let rental of rentals) {
        rental = {
            ...rental,
            customer: {
                id: rental.customerId,
                name: rental.customerName
            },
            game: {
                id: rental.gameId,
                name: rental.gameName,
                categoryId: rental.categoryId,
                categoryName: rental.categoryName
            }
        }
        delete rental.customerName;
        delete rental.gameName;
        delete rental.categoryId;
        delete rental.categoryName;
        sendRentals.push(rental);
    }

    res.send(sendRentals);
}

export async function inserirAluguel(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = dayjs().format("YYYY-MM-DD")
    const pricePerDay = await connection.query('select "pricePerDay" from games where id = $1', [Number(gameId)])
    const originalPrice = pricePerDay.rows[0].pricePerDay * daysRented;

    await connection.query('insert into rentals ("customerId","gameId","rentDate","daysRented","originalPrice") values ($1,$2,$3,$4,$5)',
        [Number(customerId), Number(gameId), rentDate, Number(daysRented), Number(originalPrice)])

    res.sendStatus(201)
}

export async function finalizarAluguel(req, res) {
    const {id} = req.params;

    const checarAluguel = await connection.query('select * from rentals where id = $1',[Number(id)])
    const checarDevolucao = await connection.query('select * from rentals where id = $1 and "returnDate" is null',[Number(id)])

    if(!checarAluguel.rows[0]) return res.status(404).send('Este aluguel não existe')
    if(!checarDevolucao.rows[0]) return res.status(400).send('Este aluguel já foi devolvido')

    const returnDate = dayjs().format("YYYY-MM-DD");
    let delayFee=0;
    
    let day1 = new Date(returnDate.replace('-','/'))
    let day2 = new Date(checarAluguel.rows[0].rentDate.toISOString().slice(0, 10).replace('-','/'))
    
    const timeDiff = Math.abs(day1 - day2);
    
    if(timeDiff>0) {
        delayFee = Math.ceil(timeDiff / (1000 * 3600 * 24)) * checarAluguel.rows[0].originalPrice/checarAluguel.rows[0].daysRented;

        await connection.query('update rentals set "returnDate" = $1,"delayFee" = $2 where id = $3',
        [returnDate, Number(delayFee), Number(id)])

        res.sendStatus(200)
    }

    await connection.query('update rentals set "returnDate" = $1,"delayFee" = $2 where id = $3',
    [returnDate, Number(delayFee), Number(id)])

    res.sendStatus(200)
}

export async function removerAluguel(req, res) {
    const {id} = req.params;

    const checarAluguel = await connection.query('select * from rentals where id = $1',[Number(id)])
    const checarDevolucao = await connection.query('select * from rentals where id = $1 and "returnDate" is null',[Number(id)])

    if(!checarAluguel.rows[0]) return res.status(404).send('Este aluguel não existe')
    if(!checarDevolucao.rows[0]) return res.status(400).send('Este aluguel já foi devolvido')

    await connection.query('delete from rentals where id = $1',[Number(id)])
    res.sendStatus(200)
}