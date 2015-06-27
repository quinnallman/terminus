$(document).ready(function() {
  var game = {
    ITEMTYPE_SWORD: 1,
    ITEMTYPE_SIELD: 2,

    ITEMSLOT_RIGHT: 1,
    ITEMSLOT_LEFT: 2,

    ITEMQUALITY_POOR: 1,
    ITEMQUALITY_AVERAGE: 2,
    ITEMQUALITY_GOOD: 3,
    ITEMQUALITY_SUPERIOR: 4,
    ITEMQUALITY_EXCELLENT: 5,

    player: {},

    createRandomItem: function(ilvl) {
      return {};
    },

    redraw: function() {
      var img_base = '/assets/img/';
      var icon_url;

      // draw the right slot
      icon_url = img_base + game.player.equipment.right.icon;
      $('#equipment-right').html('<img src="' + icon_url + '" alt="equipment icon">');

      icon_url = img_base + game.player.equipment.left.icon;
      $('#equipment-left').html('<img src="' + icon_url + '" alt="equipment icon">');

      console.debug('redraw complete');
    },

    init: function() {
      game.player = {
        equipment: {
          right: {
            name: "Training Sword",
            type: game.ITEMTYPE_SWORD,
            slot: game.ITEMSLOT_RIGHT + game.ITEMSLOT_LEFT,
            quality: game.ITEMQUALITY_POOR,
            stats: {
              minDamage: 1,
              maxDamage: 2,
              speed: 2
            },
            icon: 'sword.png'
          },
          left: {
            name: "Training Shield",
            type: game.ITEMTYPE_SHIELD,
            slot: game.ITEMSLOT_RIGHT + game.ITEMSLOT_LEFT,
            quality: game.ITEMQUALITY_POOR,
            stats: {
              ac: 1
            },
            icon: 'shield.jpg'
          }
        },
        inventory: []
      };
    }
  };

  game.init();
  game.redraw();

  console.debug(game.player);
});

