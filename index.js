import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import connectDB from './db.js'

const app= express();
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

// mongoose connect
connectDB()
// schema
const keeperSchema  = mongoose.Schema({
    title: String,
    description: String
})
const Keeper = new mongoose.model('Keeper', keeperSchema)

app.get("/api/getAll", async (req, res) => {
    try {
        const keeperList = await Keeper.find({})
        res.status(200).send(keeperList)
    } catch(err) {
        console.log(err)
    }
})


app.post("/api/addNew", async (req, res) => {
    const { title, description } = req.body
    const keeperObj = new Keeper({
        title,
        description
    })
    try {
        await keeperObj.save()
        console.log("Saved successfully")
        const keeperList = await Keeper.find({})
        res.status(200).send(keeperList)
    } catch(err) {
        console.log(err)
    }
})


 
app.post("/api/delete", async (req, res) => {
    const { id } = req.body
    try {
        await Keeper.deleteOne({ _id: id })
        console.log("Deleted successfully")
        const keeperList = await Keeper.find({})
        res.status(200).send(keeperList)
    } catch(err) {
        console.log(err)
    }
})

app.listen(3001, ()=>{
    console.log(`listening on port 3001`)
})