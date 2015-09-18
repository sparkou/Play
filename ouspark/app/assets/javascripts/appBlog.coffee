
blogDependencies = [
#  'ngRoute',
  'ui.bootstrap',
  'myBlog.filters',
  'myBlog.services',
  'myBlog.controllers',
  'myBlog.directives',
  'myBlog.common',
  'myBlog.routeConfig',
  'colorpicker.module',
  'wysiwyg.module',
  'ngSanitize'
]
blog = angular.module('myBlog', blogDependencies)

angular.module('myBlog.routeConfig', ['ui.router'])
.config(['$stateProvider', ($stateProvider) ->
    $stateProvider
    .state('home', {
        url: '/home',
        views: {
          'leftView': {
            templateUrl: '/assets/partials/listPage.html',
            controller: 'BlogCtrl as bl'
          },
          'rightView': {
            templateUrl: '/assets/partials/rightNav.html'
          }
        }
    })
    .state('about', {
        url: '/about',
        views: {
          'leftView': {
            templateUrl: '/assets/partials/about.html'
          },
          'rightView': {
            templateUrl: '/assets/partials/rightNav.html'
          }
        }
      })
    .state('contact', {
        url: '/contact',
        views: {
          'leftView': {
            templateUrl: '/assets/partials/contact.html'
          },
          'rightView': {
            templateUrl: '/assets/partials/rightNav.html'
          }
        }
      })
    .state('admin', {
        url: '/admin',
        views: {
          'leftView': {
            templateUrl: '/assets/partials/admin.html'
          },
          'rightView': {
            templateUrl: '/assets/partials/rightNav.html'
          }
        }
      })
    .state('content', {
        url: '/content/:title',
        views: {
          'leftView': {
            templateUrl: '/assets/partials/content.html',
            controller: 'BlogSearchCtrl as bl'
          },
          'rightView': {
            templateUrl: '/assets/partials/rightNav.html'
          }
        }
      })
#    .when('/home', {
#        templateUrl: '/assets/partials/listPage.html',
#        controller: 'BlogCtrl as bl'
#      })
#    .when('/content/:title', {
#        templateUrl: '/assets/partials/content.html',
#        controller: 'BlogSearchCtrl as bl'
#      })
#    .when('/about', {
#        templateUrl: '/assets/partials/about.html'
#      })
#    .when('/admin', {
#        templateUrl: '/assets/partials/admin.html'
##        controller: 'BlogAdminCtrl as ba'
#      })
#    .when('/contact', {
#        templateUrl: '/assets/partials/contact.html'
##        controller: 'BlogContactCtrl as bc'
#      })
    ])
.config(['$locationProvider', ($locationProvider) ->
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })])
.config(['$urlRouterProvider', ($urlRouterProvider) ->
    $urlRouterProvider.otherwise('/home')
  ])
@blogCommonModule = angular.module('myBlog.common', [])
@blogControllersModule = angular.module('myBlog.controllers', [])
@blogServicesModule = angular.module('myBlog.services', [])
@blogModelsModule = angular.module('myBlog.models', [])
@blogDirectivesModule = angular.module('myBlog.directives', [])
@blogFiltersModule = angular.module('myBlog.filters', [])
