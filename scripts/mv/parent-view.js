
define(['core/create', 'mv/view'], function (Create, View) {

  /**
   * Parent View
   */
  var ParentView = Create('ParentView', {

    initializer: function () {
      this._children = [];
      this.on('rendered', this._createChildren, this);
    },

    /* TODO: destructors - markup, events, children etc */

    renderChild: function (view) {
      var anchor = this._setAnchor(view.get('anchor'));

      view.propagateEventsTo(this);
      view.set('anchor', anchor);
      this._renderChild(view);
    },


    getChild: function () {
      // TODO
    },


    _createChildren: function () {
      var children = this.get('children');

      // TODO: improve - each should handle null checks
      if (children) {
        children.each(children, function (child) {
          this._createChild(child);
        }, this);
      }

      this.fire('childrenRendered');
    },


    _setAnchor: function (anchor) {
      var container = this.get('container');

      if (anchor) {
        anchor = container.one(anchor);
      } else {
        anchor = container;
      }

      return anchor;
    },


    _createChild: function (attr) {
      var container = this.get('container');

      attr.anchor = this._setAnchor(attr.anchor);
      attr.model = this.get('model');

      var Type = attr.type || View;
      var child = new Type(attr);

      child.propagateEventsTo(this);

      this._renderChild(child);
    },


    _renderChild: function (child) {
      child.render();
      this._children.push(child);
    },


    _attrs: {
      children: []
    }

  }, View);


  return ParentView;

});
