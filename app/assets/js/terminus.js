var terminusApp = angular.module('terminusApp', []);

terminusApp
  .factory('gameFactory', function() {
    var gameFactory = {};

    gameFactory.ITEMTYPE_SWORD = 1;
    gameFactory.ITEMTYPE_SHIELD = 2;

    gameFactory.ITEMSLOT_RIGHT = 1;
    gameFactory.ITEMSLOT_LEFT = 2;

    gameFactory.ITEMQUALITY_POOR = 1;

    gameFactory.createNewPlayer = function() {
      return {
        equipment: {
          right: {
            name: "Training Sword",
            type: gameFactory.ITEMTYPE_SWORD,
            slot: gameFactory.ITEMSLOT_RIGHT + gameFactory.ITEMSLOT_LEFT,
            quality: gameFactory.ITEMQUALITY_POOR,
            stats: {
              minDamage: 1,
              maxDamage: 2,
              speed: 2
            },
            icon: 'sword.png'
          },
          left: {
            name: "Training Shield",
            type: gameFactory.ITEMTYPE_SHIELD,
            slot: gameFactory.ITEMSLOT_RIGHT + gameFactory.ITEMSLOT_LEFT,
            quality: gameFactory.ITEMQUALITY_POOR,
            stats: {
              ac: 1
            },
            icon: 'shield.jpg'
          }
        },
        inventory: []
      };
    };

    gameFactory.createRandomItem = function(ilvl) {
      return {};
    };

    return gameFactory;
  })

  .controller('gameController', ['$scope', 'gameFactory', function($scope, gameFactory) {
    $scope.init = function() {
      $scope.player = gameFactory.createNewPlayer();
      console.debug($scope.player);
    };

    $scope.init();
  }])

  .directive('item', function() {
    return {
      restrict: 'E',
      scope: {
        item: '='
      },
      templateUrl: 'item.html'
    };
  });
