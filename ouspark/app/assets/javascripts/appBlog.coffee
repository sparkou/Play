
blogDependencies = [
  'ngRoute',
  'ui.bootstrap',
  'myBlog.filters',
  'myBlog.services',
  'myBlog.controllers',
  'myBlog.directives',
  'myBlog.common',
  'myBlog.routeConfig'
]
blog = angular.module('myBlog', blogDependencies)

angular.module('myBlog.routeConfig', ['ngRoute'])
.config(['$routeProvider', ($routeProvider) ->
    $routeProvider
    .when('/home', {
        templateUrl: '/assets/partials/listPage.html',
#        controller: 'BlogCtrl as bl'
      })
    .when('/content/:title', {
        templateUrl: '/assets/partials/content.html',
#        controller: 'BlogSearchCtrl as bl'
      })
    .when('/about', {
        templateUrl: '/assets/partials/about.html'
      })
    .when('/admin', {
        templateUrl: '/assets/partials/admin.html'
      })
    .otherwise({redirectTo: '/'})])
.config(['$locationProvider', ($locationProvider) ->
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })])

@blogCommonModule = angular.module('myBlog.common', [])
@blogControllersModule = angular.module('myBlog.controllers', [])
@blogServicesModule = angular.module('myBlog.services', [])
@blogModelsModule = angular.module('myBlog.models', [])
@blogDirectivesModule = angular.module('myBlog.directives', [])
@blogFiltersModule = angular.module('myBlog.filters', [])
