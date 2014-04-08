
define([

  'core/create',
  'mv/view'

], function (Create, View) {

  /**
   * Parent View
   */
  var ParentView = Create('ParentView', {

    initializer: function () {
      this._renderedChildren = [];
      this.on('rendered', this._renderChildren, this);
    },


    destructor: function () {
      var children = this.getRenderedChildren();

      for (var c = 0; c < children.length; c++) {
        children[c].destroy();
      }

      this._renderedChildren = null;
    },


    getRenderedChildren: function () {
      return this._renderedChildren;
    },


    _renderChildren: function () {
      var children = this.get('children');
      var container = this.get('container');
      var data = this.get('data');

      var childView;
      var attrs;

      children.each(children, function (child) {

        attrs = child.attrs || {};

        // TODO: avoid data mapping by disallowing
        // children [] and force child rendering through
        // seperate method after init?

        // TODO: ?
        //attrs.data = data[attrs.id];

        attrs.anchor = container;

        childView = new child.view(attrs);

        childView.render();
        childView.propagateEventsTo(this);
        //childView.on('dataChange', this._propagateChildDataChange, this);

        this._renderedChildren.push(childView);

      }, this);

      this.fire('childrenRendered');
    },


    /*_propagateChildDataChange: function (e) {
      var source = e.source;

      this.fire('childDataChange', {
        childID: source.get('id'),
        data: source.get('data')
      })
    },*/


    _attrs: {
      children: []
    }

  }, View);


  return ParentView;

});
