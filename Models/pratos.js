const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const pratosSchema = new Schema({
    "codigo_do_prato": {
        "type": Number,
        "uniqueitem": true,
        "required": true
    },
    "Nome_do_prato": {
        "type": String,
        "required": true
    },
    "Categoria": {
        "type": String,
        "required": true
    },
    "Preco": {
        "type": Number
    },
    "Regime": {
        "type": String
    },
    "Tipo": {
        "type": String,
        "required": true
    },
    "Ingredientes": {
        "type": [String]
    }

}, {
    "timestamps": true
});

module.exports = mongoose.model("menu_do_dia", pratosSchema,"menu_do_dia");