
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
      this.on('childrenChange', this._onChildrenChange, this);
    },


    destructor: function () {
      this._destroyChildren();
    },


    getRenderedChildren: function () {
      return this._renderedChildren;
    },


    _onChildrenChange: function () {
      if (this._rendered) {
        this._destroyChildren();
        this._renderChildren();
      }
    },


    _destroyChildren: function () {
      var children = this.getRenderedChildren();

      if (children) {
        for (var c = 0; c < children.length; c++) {
          children[c].destroy();
        }
      }

      this._renderedChildren = [];
    },


    _renderChildren: function () {
      var children = this.get('children');
      var container = this.get('container');
      var data = this.get('data');

      var childView;
      var child;
      var attrs;

      for (var c = 0; c < children.length; c++) {

        child = children[c];
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

        this.fire('appendedView', {
          child: childView
        });

      }

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
