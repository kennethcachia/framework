
define([

  'core/create',
  'ui/toggle-view'

], function (Create, ToggleView) {

  /**
   * Menu
   */
  var MenuView = Create('MenuView', {

    initializer: function () {
      this.on('menuItemClick', this._changeView, this);
    },


    _changeView: function (e) {
      this.set('activeView', e.source);

      return false;
    },


    _attrs: {
      data: {
        value: {
          inline: false
        }
      },

      container: {
        value: '<div class="menu{{#inline}} menu--inline{{/inline}}"></div>'
      }
    }

  }, ToggleView);


  return MenuView;

});
