
/*
 * View
 */
var View = Create('View', {

  initializer: function () {
    this._createContainer();
    this._delegateDOMEvents();
  },

  /* TODO: destructors - markup, events, children etc */

  render: function () {
    var container = this.get('container');
    var anchor = this.get('anchor');

    if (anchor && container) {
      var template = this.get('template');
      var data = this._getData();

      console.log('rendering...');
      console.log(template);
      console.log(data);

      if (template) {
        var output = Mustache.render(template, data);
        container.setInnerHTML(output);
      }

      // TODO: don't re-append after first render?
      // TODO: or -- keep state in 'rendered', only allow once
      anchor.appendChild(container);

    } else {
      throw 'View has no container or anchor for rendering';
    }

    this.fire('rendered');
  },


  _getData: function () {
    var model = this.get('model');
    var context = {};
    var data = {};

    if (model) {
      data = model.getData()
    }

    var mergeData = this.get('mergeData');

    if (mergeData) {
      mergeData.each(mergeData, function (merge) {
        context[merge] = this.get(merge);
      }, this);
    }

    var id = this.get('id');

    if (data && data[id]) {
      data = data[id];
    }

    context.data = data;

    return context;
  },


  _createContainer: function () {
    var container = this.get('container');

    if (typeof container === 'string') {
      this.set('container', new NodeElement({
        html: this.get('container')
      }));
    }

    var className = this.get('className');

    if (className) {
      this.get('container').addClass(className);
    }
  },


  _delegateDOMEvents: function () {
    var container = this.get('container');
    var domEvents = this.get('domEvents');

    domEvents.each(domEvents, function (e) {
      container.delegate(e.selector, e.eventName, e.callback, this);
    }, this);
  },


  _attrs: {
    container: null,
    className: null,
    template: null,
    anchor: null,
    model: null,
    mergeData: null,
    domEvents: []
  }

});



/*
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
    view.set('anchor', anchor);
    view.propagateEventsTo(this);

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


/*
 * Model
 */
var Model = Create('Model', {

  getData: function () {
    var data = {};
    var attrs = this._attrs;

    for (var a in attrs) {
      data[a] = attrs[a];
    }

    return data;
  },


  _attrs: { }

});


/*
 * ModelList
 */
var ModelList = Create('ModelList', {

  initializer: function () {
    var Type = this.get('type');
    var json = this.get('json');
    var models = [];

    this._data = [];

    // TODO: custom type defined in json
    json.each(json, function (attr) {
      models.push(new Type(attr));
    });

    this._data = models;
  },


  getData: function () {
    var data = [];

    // TODO: use List
    for (var d = 0; d < this._data.length; d++) {
      data.push(this._data[d].getData());
    }

    return data;
  },


  add: function (json) {
    // Add from raw data
  },


  remove: function (id) {
    // Remove by id
  },


  _attrs: {
    type: Model,
    json: []
  }

});
