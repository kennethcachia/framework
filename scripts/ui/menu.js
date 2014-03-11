
define(['core/create', 'mv/parent-view'], function (Create, ParentView) {

  /**
   * Menu
   */
  var Menu = Create('Menu', {

    initializer: function () {
      this._activeItem = null;
      this._activeAction = null;

      this.on('childrenRendered', this._registerActions, this);
    },


    destructor: function () {
      this.reset();
    },


    reset: function () {
      if (this._activeAction) {
        this._activeAction.destroy();
      }

      this._activeAction = null;
      this._activeItem = null;
    },


    _registerActions: function () {
      var children = this.getRenderedChildren();
      var child;

      for (var c = 0; c < children.length; c++) {
        child = children[c];
        child.on('action', this._renderView, this);
      }
    },


    _renderView: function (e) {
      var viewParent = this.get('viewParent');

      if (!viewParent) {
        throw 'Menu -- no parent specified';
      } else {

        var menuItem = e.source;
        var view = e.action;

        if (menuItem !== this._activeItem) {
          this.reset();
          viewParent.renderChild(view);

          this._activeItem = menuItem;
          this._activeAction = view;

          this._activeAction.propagateEventsTo(this);
        } else {
          console.log('Same action -- SKIPPING.');
        }

      }
    },


    _attrs: {
      container: '<div class="menu"></div>',
      viewParent: null
    }

  }, ParentView);


  return Menu;

});


/*
var DraggableMenu = Create('DraggableMenu', {

  initializer: function () {

  }

}, Menu);


var CollapsableMenu = Create('CollapsableMenu', {

  initializer: function () {

  }

}, Menu);
*/