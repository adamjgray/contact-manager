'use strict';

var app = angular.module('ContactManagerApp');

app.controller('ContactEditCtrl', function($http) {
    var that = this;

    that.contact = {
        name: '',
        phone: '',
        twitter: ''
    }

    that.save = function() {
        $http.post('/items', that.contact)
            .success(function(data) {

            });
    }
});