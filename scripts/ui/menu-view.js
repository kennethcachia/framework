
define([

  'core/create',
  'ui/action-view'

], function (Create, ActionView) {

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

  }, ActionView);


  return MenuView;

});
