// server/models/livro.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LivroSchema   = new Schema({    
    titulo: String,
    autor: String,
    emprestado: Boolean
});

module.exports = mongoose.model('Livro', LivroSchema);