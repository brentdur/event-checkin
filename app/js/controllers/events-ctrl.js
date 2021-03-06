'use strict';

angular
.module('app.controllers')
.controller('EventsCtrl', function($scope, Restangular) {
	$scope.isTeamMember = false;
	Restangular.one('people/me')
		.get()
		.then(function(data) {
			if (data &&data.attributes && data.attributes.roles && data.attributes.roles.length > 0) {
				$scope.isTeamMember = true;
			}
		})
		.catch(function(error){
			$scope.isTeamMember = false;
			console.log(error);
		});

	$scope.loadingPromise = Restangular.one('events/public-check-in-eligible?page[limit]=10&sort=%2bstartDateTime')
		.get()
		.then(function(data) {
			$scope.events = data;
		});
});
