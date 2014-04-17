
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


    addChild: function (child) {
      var container = this.get('container');
      var attrs = child.attrs || {};

      attrs.anchor = container;

      var childView = new child.view(attrs);

      childView.render();
      childView.propagateEventsTo(this);

      childView.on('dataChange', this._propagateChildDataChange, this);

      this._renderedChildren.push(childView);

      this.fire('appendedView', {
        child: childView
      });
    },


    getData: function () {
      var children = this.getRenderedChildren();

      var childData = [];
      var child;

      for (var c = 0; c < children.length; c++) {
        child = children[c];

        childData.push(child.get('data'));
      }

      return {
        own: this.get('data'),
        children: childData
      };
    },


    _renderChildren: function () {
      var children = this.get('children');

      for (var c = 0; c < children.length; c++) {
        this.addChild(children[c]);
      }

      this.fire('childrenRendered');
    },


    _propagateChildDataChange: function (e) {
      this.fire('childDataChange');
    },


    _attrs: {
      children: []
    }

  }, View);


  return ParentView;

});
