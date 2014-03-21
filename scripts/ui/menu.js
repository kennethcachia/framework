
define([

  'core/create',
  'mv/parent-view',
  'ui/menu-item'

], function (Create, ParentView, MenuItem) {

  /**
   * Menu
   */
  var Menu = Create('Menu', {

    initializer: function () {
      this._activeItem = null;
      this.on('childrenRendered', this._registerActions, this);
    },


    destructor: function () {
      this.reset();
    },


    reset: function () {
      this.fire('resetAction');
      this._activeItem = null;
    },


    _registerActions: function () {
      var children = this.getRenderedChildren();
      var child;

      for (var c = 0; c < children.length; c++) {
        child = children[c];
        child.on('click', this._onMenuItemClick, this);
      }
    },


    _onMenuItemClick: function (e) {
      var menuItem = e.source;

      if (menuItem !== this._activeItem) {
        this._fireNewAction(menuItem);
      } else {
        console.log('Same action -- SKIPPING.');
      }
    },


    _fireNewAction: function (menuItem) {
      this.reset();

      this.fire('newAction', {
        menuItem: menuItem
      });

      this._activeItem = menuItem;
    },


    _attrs: {
      defaultChildType: MenuItem,
      container: '<div class="menu"></div>'
    }

  }, ParentView);


  return Menu;

});
