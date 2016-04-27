// server/models/pessoa.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PessoaSchema = new Schema({    
    nome: String,
    descricao: String
});

module.exports = mongoose.model('Pessoa', PessoaSchema);