var terminusApp = angular.module('terminusApp', [
  '720kb.tooltips'
]);

terminusApp
  .factory('GameService', function() {
    var GameService = {};

    GameService.ITEMTYPE_SWORD = 1;
    GameService.ITEMTYPE_SHIELD = 2;
    GameService.ITEMTYPE_ARMOUR = 3;

    GameService.ITEMSLOT_HEAD = 1;
    GameService.ITEMSLOT_NECK = 2;
    GameService.ITEMSLOT_SHOULDERS = 3;
    GameService.ITEMSLOT_CHEST = 4;
    GameService.ITEMSLOT_BACK = 5;
    GameService.ITEMSLOT_WRIST = 6;
    GameService.ITEMSLOT_RIGHT = 7;
    GameService.ITEMSLOT_LEFT = 8;
    GameService.ITEMSLOT_HANDS = 9;
    GameService.ITEMSLOT_WAIST = 10;
    GameService.ITEMSLOT_LEGS = 11;
    GameService.ITEMSLOT_FEET = 12;
    GameService.ITEMSLOT_RING1 = 13;
    GameService.ITEMSLOT_RING2 = 14;
    GameService.ITEMSLOT_TRINKET1 = 15;
    GameService.ITEMSLOT_TRINKET2 = 16;

    GameService.ITEMQUALITY_POOR = 1;
    GameService.ITEMQUALITY_NORMAL = 2;
    GameService.ITEMQUALITY_UNCOMMON = 3;
    GameService.ITEMQUALITY_RARE = 4;
    GameService.ITEMQUALITY_EPIC = 5;
    GameService.ITEMQUALITY_LEGENDARY = 6;

    GameService.isWeapon = function(item) {
      return item.type == GameService.ITEMTYPE_SWORD;
    };

    GameService.getXPForLevel = function(level) {
      level--;
      var xp = Math.pow(level * 1.2, 1.5) * 110;
      return Math.round(xp);
    };

    GameService.getEarnedXP = function(enemy) {
      return 30;
    };

    GameService.createNewPlayer = function() {
      var player = {
        name: '',
        level: 1,
        xp_to_level: GameService.getXPForLevel(2),
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
          chest: {
            name: "Training Tunic",
            type: GameService.ITEMTYPE_ARMOUR,
            slot: GameService.ITEMSLOT_CHEST,
            quality: GameService.ITEMQUALITY_POOR,
            stats: {
              ac: 1
            },
            icon: 'chest.png'
          },
          legs: {
            name: "Training Pants",
            type: GameService.ITEMTYPE_ARMOUR,
            slot: GameService.ITEMSLOT_LEGS,
            quality: GameService.ITEMQUALITY_POOR,
            stats: {
              ac: 1
            },
            icon: "legs.png"
          },
          right: {
            name: "Training Sword",
            type: GameService.ITEMTYPE_SWORD,
            slot: GameService.ITEMSLOT_RIGHT + GameService.ITEMSLOT_LEFT,
            quality: GameService.ITEMQUALITY_POOR,
            stats: {
              minDamage: 5,
              maxDamage: 10,
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

      player.equipment.chest.tooltip = GameService.getTooltip(player.equipment.chest);
      player.equipment.legs.tooltip = GameService.getTooltip(player.equipment.legs);
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

    GameService.createItem = function(type, quality, ilvl) {
      var item = {
        type: type,
        quality: quality,
        stats: {
        }
      };

      switch(type) {
        case GameService.ITEMTYPE_SWORD:
          item.name = "Random Sword";
          item.slot = GameService.ITEMSLOT_RIGHT + GameService.ITEMSLOT_LEFT;
          item.icon = 'sword.png';
          item.stats.minDamage = GameService.rand(ilvl, 10*ilvl);
          item.stats.maxDamage = GameService.rand(item.stats.minDamage, 20*ilvl);
          var speed = GameService.rand(16, 33);
          item.stats.speed = speed / 10;
          break;
        default:
          item.name = "Random Unknown";
          break;
      }

      item.tooltip = GameService.getTooltip(item);
      return item;
    };

    GameService.createRandomItem = function(ilvl) {
      // 1 = sword
      // 2 = shield
      var type = GameService.rand(1, 1);

      // 1000 = legendary
      // 995+ = epic
      // 975+ = rare
      // 900+ = uncommon
      // 500+ = normal
      // <500 = poor
      var quality = GameService.rand(1, 1000);
      if(quality > 999) {
        return GameService.createItem(type, GameService.ITEMQUALITY_LEGENDARY, ilvl);
      } else if(quality > 995) {
        return GameService.createItem(type, GameService.ITEMQUALITY_EPIC, ilvl);
      } else if(quality > 975) {
        return GameService.createItem(type, GameService.ITEMQUALITY_RARE, ilvl);
      } else if(quality > 900) {
        return GameService.createItem(type, GameService.ITEMQUALITY_UNCOMMON, ilvl);
      } else if(quality > 500) {
        return GameService.createItem(type, GameService.ITEMQUALITY_NORMAL, ilvl);
      } else {
        return GameService.createItem(type, GameService.ITEMQUALITY_POOR, ilvl);
      }
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
        case GameService.ITEMTYPE_ARMOUR:
          html += '<div class="item-tooltip-armor">AC: ' + item.stats.ac + '</div>';
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

      $scope.inBattle = false;
      $scope.timers = {
        right: {},
        left: {},
        enemy: {}
      };

      $scope.combatlog = [];
    };

    $scope.stopSwingTimers = function() {
      $timeout.cancel($scope.timers.right);
      $timeout.cancel($scope.timers.left);
      $timeout.cancel($scope.timers.enemy);
      $scope.timers.right = {};
      $scope.timers.left = {};
      $scope.timers.enemy = {};
    }

    $scope.levelUp = function() {
      $scope.player.level++;
      $scope.player.xp_to_level = GameService.getXPForLevel($scope.player.level + 1);
      $scope.combatlog.push('You have gained a level! You are now level ' + $scope.player.level);
    };

    $scope.killEnemy = function() {
      $scope.combatlog.push('You have slain your enemy!');

      var loot = GameService.createRandomItem($scope.enemy.level);
      $scope.player.inventory.push(loot);
      $scope.combatlog.push('You looted:');
      $scope.combatlog.push(loot);

      var xp_earned = GameService.getEarnedXP($scope.enemy);
      $scope.player.xp += xp_earned;
      $scope.combatlog.push('You gain ' + xp_earned + ' experience');

      while($scope.player.xp >= $scope.player.xp_to_level) {
        $scope.levelUp();
      }

      $timeout($scope.oocRegen);
    };

    $scope.killPlayer = function() {
      $scope.combatlog.push('You have died!');

      $timeout($scope.oocRegen);
    };

    $scope.oocRegen = function() {
      if($scope.inBattle) {
        $scope.timers.heal = {};
        return;
      }

      var heal_amount = $scope.player.stats.max_hp / 10;

      $scope.player.stats.current_hp += heal_amount;

      $scope.timers.heal = $timeout($scope.oocRegen, 1000);
    };

    $scope.playerSwingRight = function() {
      if(!$scope.inBattle) {
        $scope.stopSwingTimers();
        return;
      }

      var crit = false;

      // base weapon damage
      var damage = GameService.rand($scope.player.equipment.right.stats.minDamage, $scope.player.equipment.right.stats.maxDamage);

      // additional strength-based damage
      damage += $scope.player.stats.str / 10;

      // crit chance
      if(GameService.rand(1, 100) > 75) {
        crit = true;
        damage *= 1.5;
      }

      $scope.enemy.current_hp -= damage;

      if(crit) {
        $scope.combatlog.push('player did ' + damage + ' critical damage');
      } else {
        $scope.combatlog.push('player did ' + damage + ' damage');
      }

      if($scope.enemy.current_hp <= 0) {
        $scope.inBattle = false;
        $scope.stopSwingTimers();
        $scope.killEnemy();
      } else {
        $scope.timers.right = $timeout($scope.playerSwingRight, 1000 * $scope.player.equipment.right.stats.speed);
      }
    };

    $scope.playerSwingLeft = function() {
      if(!$scope.inBattle) {
        $scope.stopSwingTimers();
        return;
      }

      var crit = false;

      // base weapon damage
      var damage = GameService.rand($scope.player.equipment.left.stats.minDamage, $scope.player.equipment.left.stats.maxDamage);

      // additional strength-based damage
      damage += $scope.player.stats.str / 10;

      // crit chance
      if(GameService.rand(1, 100) > 75) {
        crit = true;
        damage *= 1.5;
      }

      // off-hand damage penalty
      damage *= 0.75;

      $scope.enemy.current_hp -= damage;

      if(crit) {
        $scope.combatlog.push('player did ' + damage + ' critical off-hand damage');
      } else {
        $scope.combatlog.push('player did ' + damage + ' off-hand damage');
      }

      if($scope.enemy.current_hp <= 0) {
        $scope.inBattle = false;
        $scope.stopSwingTimers();
        $scope.killEnemy();
      } else {
        $scope.timers.left = $timeout($scope.playerSwingLeft, 1000 * $scope.player.equipment.left.stats.speed);
      }
    };

    $scope.enemySwing = function() {
      if(!$scope.inBattle) {
        $scope.stopSwingTimers();
        return;
      }

      var damage = GameService.rand(1, $scope.enemy.level * 10);

      $scope.player.stats.current_hp -= damage;

      $scope.combatlog.push('enemy did ' + damage + ' damage');

      if($scope.player.stats.current_hp <= 0) {
        $scope.inBattle = false;
        $scope.stopSwingTimers();
        $scope.killPlayer();
      } else {
        $scope.timers.enemy = $timeout($scope.enemySwing, 2000 - $scope.enemy.level * 10);
      }
    };

    $scope.startCombat = function() {
      $scope.enemy = GameService.createEnemy($scope.player.level);

      $scope.inBattle = true;

      if(GameService.isWeapon($scope.player.equipment.right)) {
        $scope.timers.right = $timeout($scope.playerSwingRight, 100);
      }
      if(GameService.isWeapon($scope.player.equipment.left)) {
        $scope.timers.left = $timeout($scope.playerSwingLeft, 100);
      }

      $scope.timers.enemy = $timeout($scope.enemySwing, 100);
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
