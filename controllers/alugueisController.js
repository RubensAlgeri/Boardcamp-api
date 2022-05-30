import connection from "../db.js";
import dayjs from "dayjs";

export async function buscarAlugueis(req,res){
    const {customerId, gameId} = req.query;


}

export async function inserirAluguel(req,res){
    const {customerId, gameId, daysRented} = req.body;
    const rentDate = dayjs().format("YYYY-MM-DD")
    const pricePerDay = await connection.query('select "pricePerDay" from games where id = $1',[Number(gameId)])
    const originalPrice = pricePerDay.rows[0].pricePerDay * daysRented;

    await connection.query('insert into rentals ("customerId","gameId","rentDate","daysRented","originalPrice") values ($1,$2,$3,$4,$5)',
    [Number(customerId), Number(gameId), rentDate, Number(daysRented), Number(originalPrice)])

    res.sendStatus(201)
}

export async function finalizarAluguel(req,res){
    
}

export async function removerAluguel(req,res){
    
}