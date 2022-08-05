const fillerRouter = require("express").Router();
const Filler = require("../models/filler");

fillerRouter.get("/", async (req, res) => {
    const fillers = await Filler.find({})
    res.json(fillers);
})

fillerRouter.post("/", async (req, res) => {
    const body = await req.body

    const filler = new filler({
        filler: body.filler
    })

    const savedFiller = await filler.save()
    await Filler.save()

    response.status(201).json(savedFiller)
})

module.exports = fillerRouter