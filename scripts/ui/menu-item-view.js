
define(['core/create', 'ui/menu-item'], function (Create, MenuItem) {

  /**
   * Menu Item that has a View
   */
  var MenuItemView = Create('MenuItemView', {

    _attrs: {
      view: {
        type: null,
        config: null
      }
    }

  }, MenuItem);


  return MenuItemView;

});
