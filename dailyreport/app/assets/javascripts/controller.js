/**
 * Created by spark.ou on 12/29/2015.
 */
var reportApp = angular.module('reportApp')

reportApp.controller('ReportCtrl', function($scope, $uibModal, $http) {
    $scope.users = {
        names: ['Spark', 'Feng', 'Marlon', 'Felix', 'Waikei', 'Kane', 'Hyman', 'Sky', 'Melody', 'Alex', 'Weber']
    }
    var date = new Date();

    $http.get('/report').success(function(data){
        console.log(data);
        $scope.data = data;
        $scope.kitties = data;
    }).error(function(data) {
        console.log('data cannot')
    })

    $scope.today = new Date().toISOString().slice(0, 10);
    $scope.add = function(name) {
        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: '/assets/partials/newReport.html',
            controller: 'NewReportCtrl',
            size: 'md',
            resolve: {
                name: function() {
                    return name;
                }
            }
        });
        modalInstance.result.then(function (data) {
            $http.get('/report').success(function(data){
                console.log(data);
                $scope.data = data;
                $scope.kitties = data;
            }).error(function(data) {
                console.log('data cannot')
            })
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    }
    $scope.showReport = function(kitty) {
        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: '/assets/partials/showReport1.html',
            controller: 'ShowReportCtrl',
            windowClass: 'app-modal-window',
            resolve: {
                kitty: function() {
                    return kitty;
                }
            }
        });
        modalInstance.result.then(function (data) {
            //$http.get('/report').success(function(data){
            //    console.log(data);
            //    $scope.data = data;
            //    $scope.kitties = data;
            //}).error(function(data) {
            //    console.log('data cannot')
            //})
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    }
    
    $scope.showAll = function() {
        console.log($scope.today);
    }
 });

reportApp.controller('ShowReportCtrl', function($scope, $uibModalInstance, kitty) {
   $scope.kitty = kitty;
   $scope.cancel = function () {
       $uibModalInstance.dismiss('cancel');
   };
});

reportApp.controller('NewReportCtrl', function($scope, $uibModalInstance, $http, name) {
    $scope.name = name;
    $scope.today = new Date().toISOString().slice(0, 10);
    $scope.tasks = [];

    $scope.isShown = false;
    $scope.buttonShown = true;
    $scope.showTask = function() {
        $scope.task = '';
        $scope.taskOps = {
            types: ['Feature', 'Bug'],
            priorities: ['Critical', 'Major', 'Medium', 'Low'],
            jiraStatuses: ['Open', 'In Progress', 'Resolved', 'Closed'],
            statuses: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', 'Done']
        }
        $scope.isShown = true;
        $scope.buttonShown = false;
    }

    $scope.saveTask = function() {
        console.log($scope.task);
        $scope.tasks.push($scope.task);
        $scope.isShown = false;
        $scope.buttonShown = true;
    }

    $scope.showCase = function(task) {
        $scope.isShown = true;
        $scope.task = task;
        $scope.buttonShown = false;
    }
    $scope.addReport = function() {
        // write to json

        var team = "THETA";
        var email = "";
        var emailBox = ["spark.ou@misionsky.com", "feng.xuan@missionsky.com", "marlon.xiang@missionsky.com", "felix.huang@missionsky.com", "waikei.tan@missionsky.com",
            "kane.tang@missionsky.com", "hyman.zhang@missionsky.com", "sky.zhang@missionsky.com", "melody.cai@missionsky.com", "alex.li@missionsky.com", "weber.yan@missionsky.com"]
        emailBox.forEach(function(mail){
            if(mail.toLowerCase().indexOf($scope.name.toLowerCase()) < 0) {
                email = mail;
            }
        })

        var kitty = {team: team, name: $scope.name, email: email, date: $scope.today, tasks: $scope.tasks};
        console.log(kitty);
        $http.post('/report', kitty).success(function(data) {

        })

        $uibModalInstance.close(kitty);
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});