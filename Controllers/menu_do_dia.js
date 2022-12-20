var express = require('express')
var router = express.Router()
const Pratos = require("../Models/pratos")

router.get("/", (req, res) => {

    Pratos.find({}).then(result => {
        if (result != null) {
            return res.status(200).send(result)
        } else {
            return res.status(400).send("Not Found")
        }
    })
})

router.get("/:cod", (req, res) => {

    Pratos.findOne({ "codigo_do_prato": req.params.cod }, function (err, result) {
        if (err) return res.status(400).send(err)
        res.status(200).send(result)
    })
})

router.post("/", async (req, res) => {
    const { Nome_do_prato, Categoria, Preco, Regime, Tipo, Ingredientes } = req.body;
    const ultimoID = await Pratos.find({}).sort({ _id: -1 }).limit(1)
        .then((result) => {
            if (result[0] != undefined) {
                return result[0].codigo_do_prato
            } else {
                return 0
            }
        })
    console.log(ultimoID)
    const codigo_do_prato = ultimoID + 1

    Pratos.create({ codigo_do_prato, Nome_do_prato, Categoria, Preco, Regime, Tipo, Ingredientes }).then(() => {
        return res.status(200).send("Prato Adicionado")
    })
        .catch(error => {
            console.log(error)
            return res.status(400).send(error.message)
        })
});

router.patch("/:cod", (req, res) => {

    let novo_valor = req.body
    Pratos.updateOne(
        { "codigo_do_prato": req.params.cod }, novo_valor)
        .then((prato) => {
            res.status(200).send("Prato atualizado")
        })
        .catch((error) => res.status(400).send(error.message))
})

router.put("/:cod", (req, res) => {

    let novos_valores = req.body
    Pratos.updateOne(
        { "codigo_do_prato": req.params.cod }, novos_valores)
        .then((prato) => {
            res.status(200).send("Prato atualizado")
        })
        .catch((error) => res.status(400).send(error.message))
})

router.delete("/:cod", (req, res) => {

    Pratos.deleteOne({ "codigo_do_prato": req.params.cod })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).send("Este prato nao existe")
            }
            res.status(200).send("Prato apagado")
        })
        .catch(error => res.status(400).send(error))
})

router.delete("/", (req, res) => {

    Pratos.deleteMany({})
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).send("Nao existem pratos a apagar")
            }
            res.status(200).send("Prato apagado")
        })
        .catch(error => res.status(400).send(error))
})

module.exports = router