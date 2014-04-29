
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


    addChild: function (child, options) {
      var childrenAnchor = this._getChildrenAnchor();
      var attrs = child.attrs || {};

      var childView;

      if (!child._name) {
        attrs.anchor = childrenAnchor;
        childView = new child.view(attrs);
      } else {
        child.set('anchor', childrenAnchor);
        childView = child;
      }

      childView.render(options);
      childView.propagateEventsTo(this);
      childView.on('dataChange', this._propagateChildDataChange, this);

      this._renderedChildren.push(childView);

      this.fire('appendedView', {
        child: childView
      });

      return childView;
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


    _getChildrenAnchor: function () {
      var container = this.get('container');
      var childrenAnchor = this.get('childrenAnchor');

      if (!childrenAnchor) {
        childrenAnchor = container;
      } else {
        childrenAnchor = container.one(childrenAnchor);
      }

      return childrenAnchor;
    },


    _renderChildren: function () {
      var children = this.get('children');

      for (var c = 0; c < children.length; c++) {
        this.addChild(children[c]);
      }

      this.fire('childrenRendered');
    },


    _propagateChildDataChange: function (e) {
      this.fire('childDataChange', e);
    },


    _attrs: {
      children: {
        value: []
      },

      childrenAnchor: {
        value: null
      }
    }

  }, View);


  return ParentView;

});
