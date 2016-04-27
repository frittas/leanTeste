// server.js

// BASE SETUP ============================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // Setup da porta

// Rotas da API

var router = express.Router();

// teste da rota (http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'Api OK!' });
});

// Registra as rotas | prefixo -> /api

router.route('/pessoas')
    //http://localhost:8080/api/pessoas
    .post(function (req, res) {

        var pessoa = new Pessoa();      // Cria uma nova instancia do Modelo Pessoa
        pessoa.nome = req.body.nome;

        pessoa.save(function (err) {
            if (err)
                res.send(err);

            res.json(pessoa);
        });

    })
    .get(function (req, res) {
        Pessoa.find(function (err, pessoas) {
            if (err)
                res.send(err);

            res.json(pessoas);
        })
    });

router.route('/pessoas/:id')
    //http://localhost:8080/api/pessoas/:id    
    .get(function (req, res) {
        Pessoa.findById(req.params.id, function (err, pessoa) {
            if (err)
                res.send(err);

            res.json(pessoa);
        });
    })
    .put(function (req, res) {
        Pessoa.findById(req.params.id, function (err, pessoa) {

            if (err)
                res.send(err);

            pessoa.nome = req.body.nome;

            // save
            pessoa.save(function (err) {
                if (err)
                    res.send(err);

                res.json(pessoa);
            });

        });
    })
    .delete(function (req, res) {
        Pessoa.remove({
            _id: req.params.id
        }, function (err, pessoa) {
            if (err)
                res.send(err);

            res.json({ message: 'pessoa deletada' });
        });
    });

router.route('/pessoas/:id/emprestimos')
    .get(function (req, res) {
        Emprestimo.find({'pessoa': req.params.id})
        .populate('pessoa')
        .populate('livro')
        .exec(function (err, emprestimo) {
            if (err)
                res.send(err);

            res.json(emprestimo);
        });
    });

router.route('/livros')

    //http://localhost:8080/api/livros
    .post(function (req, res) {

        var livro = new Livro();      // Cria uma nova instancia do Modelo Livro        
        livro.titulo = req.body.titulo;
        livro.autor = req.body.autor;
        livro.emprestado = req.body.emprestado;

        livro.save(function (err) {
            if (err)
                res.send(err);

            res.json(livro);
        });

    })
    .get(function (req, res) {
        Livro.find(function (err, livros) {
            if (err)
                res.send(err);

            res.json(livros);
        })
    });

router.route('/livros/:id')
    //http://localhost:8080/api/livros/:id    
    .get(function (req, res) {
        Livro.findById(req.params.id, function (err, livro) {
            if (err)
                res.send(err);

            res.json(livro);
        });
    })
    .put(function (req, res) {
        Livro.findById(req.params.id, function (err, livro) {

            if (err)
                res.send(err);
            
            livro.titulo = req.body.titulo;
            livro.autor = req.body.autor;
            livro.emprestado = req.body.emprestado;

            // save
            livro.save(function (err) {
                if (err)
                    res.send(err);

                res.json(livro);
            });

        });
    })
    .delete(function (req, res) {
        Livro.remove({
            _id: req.params.id
        }, function (err, livro) {
            if (err)
                res.send(err);

            res.json({ message: 'livro deletado' });
        });
    });

router.route('/emprestimos')
    //http://localhost:8080/api/emprestimos
    .post(function (req, res) {

        var emprestimo = new Emprestimo();      // Cria uma nova instancia do Modelo Emprestimo
        emprestimo.livro = req.body.livro;
        emprestimo.pessoa = req.body.pessoa;
        emprestimo.dataEmprestimo = req.body.dataEmprestimo;
        emprestimo.dataDevolucao = req.body.dataDevolucao;
        
        console.log(emprestimo)

        emprestimo.save(function (err) {
            if (err)
                res.send(err);

            res.json(emprestimo);
        });

    })
    .get(function (req, res) {
        Emprestimo.find()
        .populate('livro')
        .populate('pessoa')
        .exec(function (err, emprestimos) {
            if (err)
                res.send(err);

            res.json(emprestimos);
        })
    });
router.route('/emprestimos/:id')
    //http://localhost:8080/api/emprestimos/:id    
    .get(function (req, res) {
        Emprestimo.findById(req.params.id)
        .populate('livro')
        .populate('pessoa')
        .exec(function (err, emprestimo) {
            if (err)
                res.send(err);
                
            res.json(emprestimo);
        });
    })
    .put(function (req, res) {
        Emprestimo.findById(req.params.id, function (err, emprestimo) {

            if (err)
                res.send(err);

            emprestimo.livro = req.body.livro;
            emprestimo.pessoa = req.body.pessoa;
            emprestimo.dataEmprestimo = req.body.dataEmprestimo;
            emprestimo.dataDevolucao = req.body.dataDevolucao;

            // save
            emprestimo.save(function (err) {
                if (err)
                    res.send(err);

                res.json(emprestimo);
            });

        });
    })
    .delete(function (req, res) {
        Emprestimo.remove({
            _id: req.params.id
        }, function (err, emprestimo) {
            if (err)
                res.send(err);

            res.json({ message: 'emprestimo deletado' });
        });
    });

app.use('/api', router);

// STARTA O SERVER =======================================================
app.listen(port);
console.log('Node Server UP! ' + port);

// =======================================================================

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/leanTest');

//Instancio os modelos
var Pessoa = require('./models/pessoa');
var Livro = require('./models/livro');
var Emprestimo = require('./models/emprestimo');
