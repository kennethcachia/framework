
/*
 * View
 */
var View = Create({

  initializer: function () {
    this._children = [];
    this._createContainer();
    this._delegateEvents();
  },


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


  addChild: function (attr) {
    attr.parent = this;

    var Type = attr.type || View;
    var child = new Type(attr);

    child.render();
    this._children.push(child);

    return child;
  },


  _getData: function () {
    var data = {
      name: 'kenneth',
      surname: 'cachia'
    };

    var mergeData = this.get('mergeData');

    if (mergeData) {
      mergeData.each(mergeData, function (merge) {
        data[merge] = this.get(merge);
      }, this);
    }

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
 * Model
 */
var Model = Create({

});
