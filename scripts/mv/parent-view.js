
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
      var children = this.get('children');

      children.each(children, function (child) {
        child.destroy();
      }, this);

      this._renderedChildren = null;
    },


    _renderChildren: function () {
      var children = this.get('children');
      var container = this.get('container');
      var childContainer = this.get('childContainer');
      var data = this.get('data');

      var childView;
      var attrs;

      children.each(children, function (child) {

        attrs = child.attrs || {};

        // TODO: avoid data mapping by disallowing
        // children [] and force child rendering through
        // seperate method after init?

        attrs.data = data[attrs.id];
        attrs.container = childContainer;
        attrs.anchor = container;

        childView = new child.view(attrs);

        childView.render();
        childView.on('dataChange', this._propagateChildDataChange, this);

        this._renderedChildren.push(childView);

      }, this);

      this.fire('childrenRendered');
    },


    _propagateChildDataChange: function (e) {
      var source = e.source;

      this.fire('childDataChange', {
        childID: source.get('id'),
        data: source.get('data')
      })
    },


    _attrs: {
      childContainer: '<div class="view-child"></div>',
      children: []
    }

  }, View);


  return ParentView;

});
