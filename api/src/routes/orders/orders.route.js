const { Router } = require('express');
const { Op } = require("sequelize");
const functions = require("../../functions/Functions_orders");
const { User, Review, Orders} = require("../../db.js")

const orders = Router()

//RUTA QUE TRAE TODOS LOS USUARIOS SIN FILTRO
orders.get("/all", async (req, res, next)=>{
    try {
        const allOrders = await Orders.findAll()
        res.status(200).json(allOrders)
    
    } catch (error) {
        console.log(error)
        next(error)
    }
})

orders.post("/", async (req, res, next) =>{
    const { id_user_professional, id_user_client  } = req.body;
    try {
        if( id_user_professional && id_user_client ){
            const newOrder = await Orders.create({
                id_user_client,
                id_user_professional,
            })

            let userFind = await User.findByPk(id_user_professional)
            await newOrder.addUser(userFind)

            return res.status(201).send(`The Order created successfully`);
        
        } return res.status(200).send("Missing data");

    } catch (error) {
        console.log(error)
        next(error)
    }
})


orders.put("/:id", async (req, res, next) =>{
    const { description, complete, apointment_date, allowReview } = req.body;
    const { id } = req.params;
    try {
        functions.updateOrden(id, description, complete, apointment_date, allowReview)
        res.status(200).send(`The order updated successfully`)
    } catch (error) {
        console.log(error)
        next(error)
    }
})


module.exports = orders;