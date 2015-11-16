'use strict';

var dmApp = angular.module('dmApp')

dmApp.factory('DataManagerService', dmService);
dmApp.factory('UrlParsingService', urlService);

function dmService($q, $http, UrlParsingService) {

    function urlContains(url, key) {
        return url.indexOf(key) >= 0;
    }

    function getAllUrl(param) {
        var Api = '/av-proxy/av-biz-ws/services/admin/datamanager/task/';
        if(param == 'Data Manager Export' || param == 'Data Manager Import' || param == 'Data Manager Delete') {
            Api = '/av-proxy/av-biz-ws/services/admin/datamanager/task?format=JSON&serviceProviderCode=ADDEV&taskType=' + param;
        }else if(param == 'record') {
            Api = Api + 'recordtype';
        }else if(param == 'addrType') {
            Api = Api + 'refAddressTypeGroup/all';
        }
        return Api;
    }

    function getSelectedUrl(param) {
        var Api = '/av-proxy/av-biz-ws/services/admin/datamanager/task/';
        if(param == 'record') {
            Api = Api + 'recordtype/selected';
        }else if(param == 'addrType') {
            Api = Api + 'refAddressTypeGroup/selected';
        }
        return Api;
    }

    function getObj(params) {

    }

    function getFeatures() {
        var deferred = $q.defer();
        $http.get('/portlets/commons/datamanager/js/treeData.json').success(function(data) {
            return deferred.resolve(data);
        })
        return deferred.promise;
    }

    function getColDef() {
        var deferred = $q.defer();
        $http.get('/portlets/commons/datamanager/js/colDef.json').success(function(data) {
            return deferred.resolve(data);
        })
        return deferred.promise;
    }


    function getJobs(param) {

        var url = getAllUrl(param);
        var deferred = $q.defer();
        $http.get(url).success(function(data) {
            return deferred.resolve(data);
        })
        return deferred.promise;
    }

    function getAll(params) {
        var url = getAllUrl(params);
        var obj = {"batchJobModel": {"serviceCategory": "Data Manager Export", "serviceProviderCode": "ADDEV", "jobName": "deleteCap"}, "configModel": {"targetServiceProviderCode": "ADDEV"}};
        var deferred = $q.defer();
        $http.post(url, obj).success(function(data) {
            return deferred.resolve(data);
        })
        return deferred.promise;
    }



    return {
        getJobs: getJobs,
        getFeatures: getFeatures,
        getAll: getAll,
        getColDef: getColDef
    };
}

function urlService() {
    return {
        getParamaters: function (url) {
            var parser = document.createElement('a');
            parser.href = url;
            return parser.search.replace('?', '').split('&');
        }
    };
}

