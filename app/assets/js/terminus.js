var terminusApp = angular.module('terminusApp', [
  '720kb.tooltips'
]);

terminusApp
  .factory('GameService', function() {
    var GameService = {};

    GameService.ITEMTYPE_SWORD = 1;
    GameService.ITEMTYPE_SHIELD = 2;

    GameService.ITEMSLOT_RIGHT = 1;
    GameService.ITEMSLOT_LEFT = 2;

    GameService.ITEMQUALITY_POOR = 1;

    GameService.createNewPlayer = function() {
      var player = {
        equipment: {
          right: {
            name: "Training Sword",
            type: GameService.ITEMTYPE_SWORD,
            slot: GameService.ITEMSLOT_RIGHT + GameService.ITEMSLOT_LEFT,
            quality: GameService.ITEMQUALITY_POOR,
            stats: {
              minDamage: 1,
              maxDamage: 2,
              speed: 2
            },
            icon: 'sword.png'
          },
          left: {
            name: "Training Shield",
            type: GameService.ITEMTYPE_SHIELD,
            slot: GameService.ITEMSLOT_RIGHT + GameService.ITEMSLOT_LEFT,
            quality: GameService.ITEMQUALITY_POOR,
            stats: {
              ac: 1
            },
            icon: 'shield.jpg'
          }
        },
        inventory: []
      };

      player.equipment.right.tooltip = GameService.getTooltip(player.equipment.right);
      player.equipment.left.tooltip = GameService.getTooltip(player.equipment.left);

      return player;
    };

    GameService.createRandomItem = function(ilvl) {
      return {};
    };

    GameService.getTooltip = function(item) {
      var html = "";

      switch(item.type) {
        case GameService.ITEMTYPE_SWORD:
          html += '<div class="item-tooltip-damage">' + item.stats.minDamage + ' - ' + item.stats.maxDamage + ' damage</div>';
          html += '<div class="item-tooltip-speed">Speed: ' + item.stats.speed + '</div>';
          break;
        case GameService.ITEMTYPE_SHIELD:
          html += '<div class="item-tooltip-armor">AC: ' + item.stats.ac + '</div>';
          break;
        default:
          break;
      }

      return html;
    };

    return GameService;
  })

  .controller('gameController', ['$scope', 'GameService', function($scope, GameService) {
    $scope.init = function() {
      $scope.player = GameService.createNewPlayer();
      console.debug($scope.player);
    };

    $scope.init();
  }])

  .directive('item', function() {
    return {
      restrict: 'E',
      scope: {
        item: '=',
      },
      templateUrl: 'item.html',
    };
  });
