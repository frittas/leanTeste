angular.module('app.controllers', [])

    .controller('emprestimosCtrl', function ($scope, $ionicModal,
        $state, baseRest) {

        $scope.data = {
            showDelete: false
        };
        
        var dataService = baseRest.dataService();
        dataService.get({
            url: 'emprestimos/'
        }).then(function (emprestimos) {
            $scope.emprestimos = emprestimos.data;
        });

        dataService.get({
            url: 'pessoas/'
        }).then(function (pessoas) {
            $scope.pessoas = pessoas.data;
        });

        dataService.get({
            url: 'livros/'
        }).then(function (livros) {
            $scope.livros = _.filter(livros.data, function (livro) {
                return !livro.emprestado
            });
        });


        $ionicModal.fromTemplateUrl('emprestimo-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalCreate = modal;
        });
        $scope.openModalCreate = function () {
            $scope.newEmprestimo = {};
            $scope.modalCreate.show();
        };
        $scope.closeModalCreate = function () {
            $scope.modalCreate.hide();
        };

        $scope.createEmprestimo = function (novoEmprestimo) {

            var data = {
                livro: novoEmprestimo.livro._id,
                pessoa: novoEmprestimo.pessoa._id,
                dataEmprestimo: novoEmprestimo.dataEmprestimo,
                dataDevolucao: novoEmprestimo.dataDevolucao
            }
            dataService.post({
                url: 'emprestimos/',
                data: data
            }).then(function (emprestimo) {
                emprestimo.data.livro = novoEmprestimo.livro;
                emprestimo.data.pessoa = novoEmprestimo.pessoa;
                $scope.emprestimos.push(emprestimo.data);

                //Marca o livro como Emprestado = true
                novoEmprestimo.livro.emprestado = true;
                dataService.put({
                    url: 'livros/' + novoEmprestimo.livro._id,
                    data: novoEmprestimo.livro
                }).then(function () {
                });

                $scope.closeModalCreate();
            });
        };
        
         $scope.onItemDelete = function (emprestimo) {
            dataService.delete({
                url: 'emprestimos/' + emprestimo._id
            }).then(function () {
                
                //Marca o livro como Emprestado = false
                emprestimo.livro.emprestado = false;
                dataService.put({
                    url: 'livros/' + emprestimo.livro._id,
                    data: emprestimo.livro
                }).then(function () {
                });
                
                $scope.emprestimos.splice($scope.emprestimos.indexOf(emprestimo), 1);
            });
        };

    })

    .controller('livrosCtrl', function ($scope, $ionicModal, $ionicListDelegate,
        $state, baseRest) {
        var dataService = baseRest.dataService();
        $scope.data = {
            showDelete: false,
            showIndisponiveis: true
        };

        dataService.get({
            url: 'livros/'
        }).then(function (livros) {
            $scope.livros = livros.data;
        });

        $ionicModal.fromTemplateUrl('addLivro-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalCreate = modal;
        });
        $scope.openModalCreate = function () {
            $scope.newLivro = {};
            $scope.modalCreate.show();
        };
        $scope.closeModalCreate = function () {
            $scope.modalCreate.hide();
        };

        $ionicModal.fromTemplateUrl('editLivro-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalEdit = modal;
        });
        $scope.openModalEdit = function (livro) {
            $scope.editLivro = livro;
            $scope.modalEdit.show();
        };
        $scope.closeModalEdit = function () {
            $scope.modalEdit.hide();
        };


        $scope.onItemDelete = function (livro) {
            dataService.delete({
                url: 'livros/' + livro._id
            }).then(function () {
                $scope.livros.splice($scope.livros.indexOf(livro), 1);
            });
        };

        $scope.createLivro = function (livro) {

            dataService.post({
                url: 'livros/',
                data: livro
            }).then(function (livro) {
                $scope.livros.push(livro.data);
                $scope.closeModalCreate();
            });
        }

        $scope.editarLivro = function (livro) {

            dataService.put({
                url: 'livros/' + livro._id,
                data: livro
            }).then(function () {
                $ionicListDelegate.closeOptionButtons();
                $scope.closeModalEdit();
            });
        }

        $scope.openDetails = function (livro) {
            $state.go('tabsController.livros.detalhes', { 'livroId': livro._id });
        }
    })

    .controller('pessoasCtrl', function ($scope, $ionicModal, $ionicListDelegate,
        $state, baseRest) {

        var dataService = baseRest.dataService();
        $scope.data = {
            showDelete: false
        };

        dataService.get({
            url: 'pessoas/'
        }).then(function (pessoas) {
            $scope.pessoas = pessoas.data;
        });

        $ionicModal.fromTemplateUrl('addPessoa-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalCreate = modal;
        });
        $scope.openModalCreate = function () {
            $scope.newPessoa = {};
            $scope.modalCreate.show();
        };
        $scope.closeModalCreate = function () {
            $scope.modalCreate.hide();
        };

        $ionicModal.fromTemplateUrl('editPessoa-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalEdit = modal;
        });
        $scope.openModalEdit = function (pessoa) {
            $scope.editPessoa = pessoa;
            $scope.modalEdit.show();
        };
        $scope.closeModalEdit = function () {
            $scope.modalEdit.hide();
        };


        $scope.onItemDelete = function (pessoa) {
            dataService.delete({
                url: 'pessoas/' + pessoa._id
            }).then(function () {
                $scope.pessoas.splice($scope.pessoas.indexOf(pessoa), 1);
            });
        };

        $scope.createPessoa = function (pessoa) {

            dataService.post({
                url: 'pessoas/',
                data: pessoa
            }).then(function (pessoa) {
                $scope.pessoas.push(pessoa.data);
                $scope.closeModalCreate();
            });
        }

        $scope.editarPessoa = function (pessoa) {

            dataService.put({
                url: 'pessoas/' + pessoa._id,
                data: pessoa
            }).then(function (pessoa) {
                $ionicListDelegate.closeOptionButtons();
                $scope.closeModalEdit();
            });
        }

        $scope.openDetails = function (pessoa) {
            $state.go('tabsController.pessoas.detalhes', { 'pessoaId': pessoa._id });
        }
    })

    .controller('pessoaDetailCtrl', function ($scope, $stateParams, baseRest) {
        var dataService = baseRest.dataService();
        dataService.get({
            url: 'pessoas/' + $stateParams.pessoaId
        }).then(function (pessoa) {
            $scope.pessoa = pessoa.data;
        });

        dataService.get({
            url: 'pessoas/' + $stateParams.pessoaId + '/emprestimos'
        }).then(function (emprestimos) {
            $scope.nDevolvidos = emprestimos.data;
            $scope.devolvidos = []
        });

    })
