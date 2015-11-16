'use strict';

var dmApp = angular.module('dmApp')

dmApp.controller('JobListCtrl', ['$scope', '$stateParams', 'DataManagerService', function($scope, $stateParams, DataManagerService) {
    var type = $stateParams.type;
    var taskType;
    if(type == 'export') {
        taskType = 'Data Manager Export';
    }else if(type == 'import') {
        taskType = 'Data Manager Import';
    }else if(type == 'delete') {
        taskType = 'Data Manager Delete';
    }

    DataManagerService.getJobs(taskType).then(function(data) {
        var result = JSON.parse(data.result);
        $scope.alljobs = result;

    });

    $scope.$watch('alljobs', function() {
        if(!angular.isUndefined($scope.alljobs)) {
            $scope.totalItems = $scope.alljobs.length;
            $scope.jobs = $scope.alljobs.slice(0, 10);
        }
    });
    $scope.currentPage = 1;

    $scope.type = $stateParams.type;
    $scope.isopen = false;

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.isopen = !$scope.isopen;
    };
    $scope.maxSize = 10;
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
        console.log(pageNo);
        $scope.jobs = $scope.alljobs.slice($scope.currentPage * 10 - 10, $scope.currentPage * 10);
    };
    $scope.pageChanged = function() {
        $scope.jobs = $scope.alljobs.slice($scope.currentPage * 10 - 10, $scope.currentPage * 10);
    };
}]);

dmApp.controller('WorkspaceCtrl', ['$scope', '$stateParams', 'DataManagerService', function($scope, $stateParams, DataManagerService) {
    DataManagerService.getFeatures().then(function(data) {
        $scope.data = data
    });
    $scope.jobName = $stateParams.jobName;
    $scope.type = $stateParams.type;
    $scope.isActive = false;
    $scope.showNav = function() {
        $scope.isActive = !$scope.isActive;
    }
}])

dmApp.controller('JobDetailCtrl', ['$scope', '$stateParams', '$state', 'DataManagerService', function($scope, $stateParams, $state, DataManagerService) {

    if($stateParams.key == 'summary' && $stateParams.type == 'export') {
        return $state.go('job.expSummary',{jobName: $stateParams.jobName})
    }else if($stateParams.key == 'summary' && $stateParams.type == 'import') {
        return $state.go('job.impSummary',{jobName: $stateParams.jobName})
    }else if($stateParams.key == 'summary' && $stateParams.type == 'delete') {
        return $state.go('job.delSummary',{jobName: $stateParams.jobName})
    }else if($stateParams.key == 'aca') {
        return $state.go('job.aca', {jobName: $stateParams.jobName})
    }


    var feature = $stateParams.key;
    var colTyp = '';
    var model = '';
    if(feature == 'record') {
        colTyp = 'RecordType';
        model = 'capTypeModels';
    }else if(feature == 'addrType') {
        colTyp = 'AddrType';
        model = 'result.originalModels';
    }

    DataManagerService.getColDef().then(function(data) {
        $scope.cols = data[colTyp];
    });
    DataManagerService.getAll(feature).then(function(data) {
        if(model.indexOf('.') > -1) {
            $scope.allrows = JSON.parse(data.result).originalModels;
        }else {
            $scope.allrows = data[model];
        }
    });
    $scope.$watch('allrows', function() {
        if(!angular.isUndefined($scope.allrows)) {
            $scope.totalItems = $scope.allrows.length;
            $scope.rows = $scope.allrows.slice(0, 10);
        }
    });
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.pageChanged = function() {
        $scope.rows = $scope.allrows.slice($scope.currentPage * 10 - 10, $scope.currentPage * 10);
    };
}]);

