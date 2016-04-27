angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('tabsController.emprestimos', {
        cache: false,
        url: '/emprestimos',
        views: {
          'emprestimos': {
            templateUrl: 'templates/emprestimos.html',
            controller: 'emprestimosCtrl'
          }
        }
      })

      .state('tabsController.livros', {
        cache: false,
        url: '/livros',
        views: {
          'livros': {
            templateUrl: 'templates/livros.html',
            controller: 'livrosCtrl'
          }
        }
      })

      .state('tabsController.pessoas', {
        cache: false,
        url: '/pessoas',
        views: {
          'pessoas': {
            templateUrl: 'templates/pessoas.html',
            controller: 'pessoasCtrl'
          }
        }
      })

      .state('tabsController.pessoas.detalhes', {
        url: "/:pessoaId",
        views: {
          'pessoas@tabsController': {
            templateUrl: "templates/pessoaDetail.html",
            controller: "pessoaDetailCtrl"
          }
        }
      })

      .state('tabsController', {
        url: '/tabs',
        templateUrl: 'templates/tabsController.html',
        abstract: true
      })
      
    $urlRouterProvider.otherwise('/tabs/livros')
    
  });