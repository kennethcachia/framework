
define(['core/create', 'mv/view'], function (Create, View) {

  /**
   * Parent View
   */
  var ParentView = Create('ParentView', {

    initializer: function () {
      this._renderedChildren = [];
      this.on('rendered', this._createChildren, this);
    },

    /* TODO: destructors - markup, events, children etc */

    renderChild: function (view) {
      var anchor = this._setAnchor(view.get('anchor'));

      view.propagateEventsTo(this);
      view.set('anchor', anchor);
      this._renderChild(view);
    },


    getRenderedChildren: function () {
      return this._renderedChildren;
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
      var defaultChildType = this.get('defaultChildType');

      attr.anchor = this._setAnchor(attr.anchor);
      attr.model = this.get('model');

      var Type = attr.type || defaultChildType;
      var child = new Type(attr);

      child.propagateEventsTo(this);

      this._renderChild(child);
    },


    _renderChild: function (child) {
      child.render();
      this._renderedChildren.push(child);
    },


    _attrs: {
      defaultChildType: View,
      children: []
    }

  }, View);


  return ParentView;

});
