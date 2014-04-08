
define([

  'core/create',
  'mv/view'

], function (Create, View) {

  /**
   * Menu Item
   */
  var MenuItemView = Create('MenuItemView', {

    _onClick: function () {
      this.fire('click');
    },


    _attrs: {
      data: {
        label: null
      },

      container: '<div class="menu-item"></div>',
      template: '<div class="menu-item-title">{{label}}</div>',

      domEvents: [{
        matchClass: '.menu-item',
        eventName: 'click',
        callback: '_onClick'
      }]
    }

  }, View);


  return MenuItemView;

});
