
define([

  'lib/base/create',
  'lib/mv/view',
  'lib/core/object-array'

], function (Create, View, ObjectArray) {

  /**
   * Parent View
   */
  var ParentView = Create('ParentView', {

    initializer: function () {
      this._renderedChildren = new ObjectArray();
    },


    bindEvents: function () {
      ParentView.super.bindEvents.call(this);

      this.on('childrenChange', this._onChildrenChange, this);
    },


    destructor: function () {
      this._renderedChildren.destroy();
    },


    _finishRendering: function () {
      this._renderChildren();

      ParentView.super._finishRendering.call(this);
    },


    getRenderedChildren: function () {
      return this._renderedChildren.getItems();
    },


    getRenderedChildByIndex: function (index) {
      var children = this.getRenderedChildren();

      return children[index];
    },


    getRenderedChildById: function (id) {
      var result = this._renderedChildren.find('id', id);
      return result[0];
    },


    _onChildrenChange: function () {
      if (this._rendered) {
        this._renderedChildren.purge();
        this._renderChildren();
      }
    },


    addChild: function (child, options) {
      var childrenAnchor = this._getChildrenAnchor();
      var attrs = child.attrs || {};

      var childView;

      if (!child.isBaseObject) {

        var defaultChildType = this.get('defaultChildType');
        var type = child.type || defaultChildType;

        attrs.anchor = childrenAnchor;
        childView = new type(attrs);

      } else {
        child.set('anchor', childrenAnchor);
        childView = child;
      }

      childView.propagateEventsTo(this);
      childView.render(options);
      childView.on('dataChange', this._propagateChildDataChange, this);

      this._renderedChildren.addObject(childView);

      this.fire('appendedView', {
        child: childView
      });

      return childView;
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
      defaultChildType: {
        value: View
      },

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
