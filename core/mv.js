
/*
 * View
 */
var View = Create({

  initializer: function () {
    this._createContainer();
    this._delegateEvents();
  },

  /* TODO: destructors - markup, events, children etc */

  render: function () {
    var container = this.get('container');
    var anchor = this.get('anchor');

    if (anchor && container) {

      var template = this.get('template');
      var data = this._getData();
      var output = Mustache.render(template, data);

      container.setInnerHTML(output);
      // TODO: don't re-append after first render?
      anchor.appendChild(container);

    } else {
      throw 'View has no container or anchor for rendering';
    }

    this.fire('rendered');
  },


  _getData: function () {
    // TODO: fetch from model
    var data = {};

    var mergeData = this.get('mergeData');

    if (mergeData) {
      mergeData.each(mergeData, function (merge) {
        data[merge] = this.get(merge);
      }, this);
    }

    console.log(data);
    return data;
  },


  _createContainer: function () {
    this.set('container', new NodeElement({
      html: this.get('container')
    }));

    var style = this.get('style');

    if (style) {
      this.get('container').addClass(style);
    }
  },


  _delegateEvents: function () {
    var container = this.get('container');
    var events = this.get('events');

    events.each(events, function (e) {
      container.delegate(e.selector, e.eventName, e.callback, this);
    }, this);
  },


  _attrs: {
    container: null,
    style: null,
    template: null,
    anchor: null,
    events: []
  }

});



/*
 * Parent View
 */
var ParentView = Create({

  initializer: function () {
    this._children = [];
    this.on('rendered', this._createChildren, this);
  },

  /* TODO: destructors - markup, events, children etc */

  renderChild: function (view) {
    var anchor = this._setAnchor(view.get('anchor'));
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

    //attr.parent = this;
    attr.anchor = this._setAnchor(attr.anchor);

    var Type = attr.type || View;
    var child = new Type(attr);

    this._renderChild(child);
    //return child;
  },


  _renderChild: function (child) {
    child.render();
    this._children.push(child);
  },


  _attrs: {
    children: []
  }

}, View);


/*
 * Model
 */
var Model = Create({

});
