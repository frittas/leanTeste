// server/models/emprestimo.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmprestimoSchema   = new Schema({        
    livro: [{
        type: Schema.Types.ObjectId,
        ref: 'Livro'
    }],
    pessoa: {
        type: Schema.Types.ObjectId,
        ref: 'Pessoa'
    },
    dataEmprestimo: Date,
    dataDevolucao: Date
});

module.exports = mongoose.model('Emprestimo', EmprestimoSchema);