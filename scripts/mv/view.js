
define(['core/Create', 'core/node-element', 'third-party/mustache'], function (Create, NodeElement, Mustache) {

  /**
   * View
   */
  var View = Create('View', {

    initializer: function () {
      this._createContainer();
    },


    destructor: function () {
      var anchor = this.get('anchor');
      var container = this.get('container');

      anchor.removeChild(container);
      container.destroy();
    },


    render: function () {
      var container = this.get('container');
      var anchor = this.get('anchor');

      if (anchor && container) {
        var template = this.get('template');
        var data = this._mergeData();

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

      this._delegateDOMEvents();
      this.fire('rendered');
    },


    // TODO: View doing too much?
    getData: function (eventData) {
      var nodeElement = eventData.element;

      var id = nodeElement.getAttribute('data-id');
      var data = this._getDataByID(id);

      return data;
    },


    _getDataByID: function (id) {
      var data = this._mergeData().data;
      var required;

      if (Array.isArray(data)) {

        for (var d = 0; d < data.length; d++) {
          if (data[d].id === id) {
            required = data[d];
            break;
          }
        }

      } else {
        required = data[id];
      }

      return required;
    },


    _mergeData: function () {
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
        e.context = this;
        container.addDOMEvent(e);
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


  return View;

});
