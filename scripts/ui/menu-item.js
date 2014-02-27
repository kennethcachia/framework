
define(['core/create', 'mv/view'], function (Create, View) {

  /**
   * Menu Item
   */
  var MenuItem = Create('MenuItem', {

    _onClick: function () {
      var action = this.get('action');

      if (action) {
        action();
      }

      this.fire('action');
    },


    _attrs: {
      action: null,
      label: null,
      mergeData: ['label'],

      container: '<div class="menu-item"></div>',
      template: '<div class="menu-item-title">{{label}}</div>',

      domEvents: [{
        selector: '.menu-item',
        eventName: 'click',
        callback: '_onClick'
      }]
    }

  }, View);


  return MenuItem;

});