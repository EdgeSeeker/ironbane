angular.module('game.ui.interactionButton', [
    'game.world-root',
    'game.services.globalsound'
])
.directive('signButton', ['$rootWorld', '$q', 'GlobalSound', function($rootWorld, $q, GlobalSound) {
        'use strict';

        return {
            restrict: 'EA',
            templateUrl: 'client/game/ui/signButton/signButton.ng.html',
            controllerAs: 'signButton',
            scope: {
                entity: '=' // this can be anything with inventory, player, bag, mob, magic hat, etc.
            },
            bindToController: true,
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                var ctrl = this;

                var inventorySystem = $rootWorld.getSystem('interaction')

                $scope.$watch(function() {
                    return inventorySystem.closePickup;
                }, function(pickup) {
                    if (pickup) {
                        $scope.item = pickup.getComponent('sign').item;
                    }
                    else {
                        $scope.item = null;
                    }
                });

            }]
        };
    }]
);
