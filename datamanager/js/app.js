'use strict';

var dmApp = angular.module('dmApp', ['ui.router', 'ui.bootstrap', 'ui.tree'])
dmApp.config(function($stateProvider){
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "partials/home.html"
        })
        .state('feature', {
            url: "/:type",
            templateUrl: "partials/jobList.html",
            controller: "JobListCtrl"
        })
        .state('job', {
            url: "/:type/job/:jobName",
            abstract: true,
            templateUrl: "partials/workspace.html",
            controller: "WorkspaceCtrl"
        })
        .state('job.detail', {
            url: "/:key",
            templateUrl: "partials/dataList.html",
            controller: "JobDetailCtrl"
        })
        .state('job.expSummary', {
            url: "/summary",
            templateUrl: "partials/expSummary.html",
            controller: ""
        })
        .state('job.impSummary', {
            url: "/summary",
            templateUrl: "partials/impSummary.html",
            controller: ""
        })
        .state('job.delSummary', {
            url: "/summary",
            templateUrl: "partials/delSummary.html",
            controller: ""
        })
        .state('job.aca', {
            url: "/aca",
            templateUrl: "partials/acaPage.html",
            controller: ""
        })
});
dmApp.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home')
});

dmApp.filter('pagination', function() {
    return function(input, start) {
        start = parseInt(start, 1);
        if(angular.isUndefined(input)) {
            return input;
        }else return input.slice(start);
    };
});


















