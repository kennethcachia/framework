
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


    destroyActiveAction: function () {
      if (this._activeAction) {
        this._activeAction.destroy();
      }
    },


    _registerActions: function () {
      var children = this.getRenderedChildren();
      var child;

      for (var c = 0; c < children.length; c++) {
        child = children[c];
        child.on('action', this._renderDialog, this);
      }
    },


    _renderDialog: function (e) {
      var item = e.source;

      if (item !== this._activeItem) {

        this.destroyActiveAction();

        // TODO: improve this
        this._propagateEvents.renderChild(e.action);

        this._activeItem = item;
        this._activeAction = e.action;

      } else {
        console.log('SKIPPING SAME ACTION!');
      }
    },


    _attrs: {
      container: '<div class="menu"></div>'
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