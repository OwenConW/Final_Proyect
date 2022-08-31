const { default: axios } = require('axios');
const { Router } = require('express');
const { User, Profession, Review, Op} = require("../../db.js")
const functions = require("../../functions/Functions_user");
// const Review = require('../../models/Review.js');
// const Profession = require('../../models/Profession.js');

const users = Router()


// RUTA QUE TRAE TODOS LOS USUARIOS O FILTRA POR PROFESION Y/O RATING 
users.get("/", (req, res, next) => {
    const {name, rating, profession } = req.query;
    functions.filterByQueris(name, profession, rating)
    .then(professionals => {
        return res.status(200).send(professionals);
    })
    .catch(e => {
        return res.status(404).send(e);
    })
})

//RUTA PARA TRAER TODOS LOS USUARIOS QUE MATCHEEN EL NOMBRE
// users.get("/admin", async (req, res, next) => {
//     const {name} = req.query;
//     try {
//         const users = await User.findAll({
//             where: {
//                 name: {
//                     [Op.startsWith]: name,
//                 },
//                 last_Name: {
//                     [Op.startsWith]: name,
//                 }
//             }
//         })
//         res.status(200).json(users)
//     } catch (error) {
//         console.error(error);
//         next(error)
//     }
// })

//RUTA QUE TRAE TODOS LOS USUARIOS SIN FILTRO
users.get("/all", async (req, res, next)=>{
    try {
        const allUsers = await User.findAll({
           include: {
                model: Profession,
                attributes: ['name'],
                through: {attributes: []},
            },
        })
        res.status(200).json(allUsers)
    
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// RUTA QUE BUSCA O CREA USUARIOS
users.post("/", async (req, res, next) =>{
    const { name, last_Name, date_of_Birth, mail, dni, image, phone, country, city, coordinate, street, address, description, isProfessional, profession } = req.body;
    const nameMinuscule = name.toLowerCase();
    const lastNameMinuscule = last_Name.toLowerCase();
    const mailMinuscule = mail.toLowerCase();
    try {
        if( name &&  last_Name && mail && country  && city && coordinate ){
            const [newUser, created] = await User.findOrCreate({
                where:{
                    mail: mailMinuscule
                },
                defaults:{
                    name: nameMinuscule,
                    last_Name: lastNameMinuscule,
                    date_of_Birth,
                    image,
                    dni,
                    phone,
                    description,
                    country,
                    city,
                    coordinate,
                    street,
                    address,
                    isProfessional,
                }
            })
            if(profession){
                let jobFind = await Profession.findAll({
                    where:{
                        name:{
                            [Op.or]: profession
                        }
                    }
                })
                await newUser.addProfession(jobFind)
            }

            if(!created)  res.status(200).send(`The User cannot be created, the email "${mail}" has already been used`);
            return res.status(201).send(`The User "${name}" created successfully`);
        } return res.status(200).send("Missing data");
        
    } catch (error) {
        console.log(error)
        next(error)
    }
    
})

//RUTA PARA EDITAR EL USUARIO
users.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const { name, last_Name, date_of_Birth, image, dni, mail, phone, description, country, city, coordinate, street, address, isProfessional, professions } = req.body;
    const nameMinuscule = name.toLowerCase();
    const lastNameMinuscule = last_Name.toLowerCase();

    try {
        const userUpdated = await User.findOne({ where: { id }, include: Profession })
        const oldProfessions = userUpdated.professions.map(obj => obj.dataValues.id)
        await userUpdated.removeProfession(oldProfessions)
        if(professions.length > 0){
            const professionsDB = await Profession.findAll({ where: { name: { [Op.or]: professions } } })
            await userUpdated.addProfession(professionsDB.map(obj => obj.dataValues.id))
        }

        userUpdated.set({
            name: nameMinuscule,
            last_Name: lastNameMinuscule,
            date_of_Birth,
            image,
            dni,
            mail,
            phone,
            description,
            country,
            city,
            coordinate,
            street,
            address,
            isProfessional,
        })
        await userUpdated.save()
        res.status(200).send(`The user "${name}" updated successfully`)
        } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

// RUTA DEL ADMIN PARA EDITAR EL USUARIO
users.put('/admin/:id', async (req, res) => {
    const { id } = req.params
    const { name, last_Name, date_of_Bird, image, dni, mail, phone, description, country, city, coordinate, street, address, professions, isProfessional,  isPremium, isActive, isBanned, isAdmin} = req.body;
    try {
        const userUpdated = await User.findOne({ where: { id }, include: Profession })
        const oldProfessions = userUpdated.professions.map(obj => obj.dataValues.id)
        await userUpdated.removeProfession(oldProfessions)
        if(professions.length > 0){
            const professionsDB = await Profession.findAll({ where: { name: { [Op.or]: professions } } })
            await userUpdated.addProfession(professionsDB.map(obj => obj.dataValues.id))
        }

        userUpdated.set({
            name,
            last_Name,
            date_of_Bird,
            image,
            dni,
            mail,
            phone,
            description,
            country,
            city,
            coordinate,
            street,
            address,
            isProfessional,
            isPremium,
            isActive,
            isBanned,
            isAdmin

        })
        await userUpdated.save()
        res.status(200).send(`The user "${name}" updated successfully`)
        } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

//RUTA PARA EDITAR USUARIO SIN JOBS
users.put("/edit/:id" , async (req, res, next) => {
    const { id } = req.params
    const { name, last_Name, date_of_Birth, image, dni, mail, phone, description, country, city, coordinate, street, address, isProfessional, profession } = req.body;
    try {
        await functions.updateUserNoJobs(id, name.toLowerCase(), last_Name.toLowerCase(), date_of_Birth, image, dni, mail, phone, description, country, city, coordinate, street, address, isProfessional, profession)
        return res.status(200).send(`The user "${name}" updated successfully`)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})


// RUTA QUE BUSCA USUARIOS POR ID
users.get("/:id", (req, res, next) => {
    const { id } = req.params;
    functions.getProffesionalById(id * 1)
    .then(professional => {
        return res.status(200).send(professional);
    })
    .catch(e => {
        return res.status(404).send(e);
    })
})


// RUTA PARA PASAR UN USUARIO A PREMIUM
users.put('/premium/:id', async (req, res, next) => {
    const { id } = req.params;
    const { isPremium } = req.body
    try {
        await functions.updatePremium(id, isPremium)
        res.status(200).send(`The user is now premium`)
    } catch (error) {
        console.log(error);
        next (error)
    }
})

//RUTA PARA ELIMINAR LOGICAMENTE AL USUARIO
users.put('/destroy/:id', async (req, res, next) => {
    const { id } = req.params;
    const { isActive } = req.body
    try {
        await functions.destroyUser( id, isActive )
        res.status(200).send(`The user was successfully deleted`)
    } catch (error) {
        console.log(error);
        next (error)
    }
})


module.exports = users;