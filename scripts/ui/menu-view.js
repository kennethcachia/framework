
define([

  'core/create',
  'ui/toggle-view'

], function (Create, ToggleView) {

  /**
   * MenuView
   */
  var MenuView = Create('MenuView', {

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
