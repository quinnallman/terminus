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

    GameService.isWeapon = function(item) {
      return item.type == GameService.ITEMTYPE_SWORD;
    };

    GameService.createNewPlayer = function() {
      var player = {
        name: '',
        level: 1,
        xp: 0,
        stats: {
          max_hp: 100,
          current_hp: 100,
          max_mp: 100,
          current_mp: 100,
          str: 10,
          agi: 10,
          dex: 10,
          wis: 10,
          int: 10,
          sta: 10
        },
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

    GameService.createEnemy = function(level) {
      var enemy = {
        level: level,
        max_hp: 100 * level,
        current_hp: 100 * level
      };

      return enemy;
    };

    GameService.createRandomItem = function(ilvl) {
      return {};
    };

    // returns a random int between min (inclusive) and max (inclusive)
    GameService.rand = function(min, max) {
      max += 1;
      return Math.floor(Math.random() * (max - min)) + min;
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

  .controller('gameController', ['$scope', '$timeout', 'GameService', function($scope, $timeout, GameService) {
    $scope.init = function() {
      $scope.player = GameService.createNewPlayer();
      $scope.enemy = {};
    };

    $scope.playerSwingRight = function() {
      // base weapon damage
      var damage = GameService.rand($scope.player.equipment.right.stats.minDamage, $scope.player.equipment.right.stats.maxDamage);

      // additional strength-based damage
      damage += $scope.player.stats.str / 10;

      // crit chance
      if(GameService.rand(1, 100) > 75) {
        damage *= 1.5;
      }

      $scope.enemy.current_hp -= damage;

      console.debug('player did ' + damage + ' damage');
      $timeout($scope.playerSwingRight, 1000 * $scope.player.equipment.right.stats.speed);
    };

    $scope.playerSwingLeft = function() {
      // base weapon damage
      var damage = GameService.rand($scope.player.equipment.left.stats.minDamage, $scope.player.equipment.left.stats.maxDamage);

      // additional strength-based damage
      damage += $scope.player.stats.str / 10;

      // crit chance
      if(GameService.rand(1, 100) > 75) {
        damage *= 1.5;
      }

      // off-hand damage penalty
      damage *= 0.75;

      $scope.enemy.current_hp -= damage;

      console.debug('player did ' + damage + ' damage');
      $timeout($scope.playerSwingLeft, 1000 * $scope.player.equipment.left.stats.speed);
    };

    $scope.enemySwing = function() {
    };

    $scope.startCombat = function() {
      $scope.enemy = GameService.createEnemy($scope.player.level);

      if(GameService.isWeapon($scope.player.equipment.right)) {
        $timeout($scope.playerSwingRight, 100);
      }
      if(GameService.isWeapon($scope.player.equipment.left)) {
        $timeout($scope.playerSwingLeft, 100);
      }
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
