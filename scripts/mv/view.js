
define([

  'core/Create',
  'core/dom-element',
  'third-party/mustache'

], function (Create, DOMElement, Mustache) {

  /**
   * View
   */
  var View = Create('View', {

    initializer: function () {
      this._createContainer();

      this._rendered = false;
      this._visible = false;
    },


    destructor: function () {
      var anchor = this.get('anchor');
      var container = this.get('container');

      this._rendered = true;

      anchor.removeChild(container);
      container.destroy();
    },


    show: function () {
      var container = this.get('container');
      var hiddenClassName = this.get('hiddenClassName');

      if (this._rendered) {

        this._visible = true;
        container.removeClass(hiddenClassName);

      } else {
        console.log('View not rendered yet - cannot show');
      }
    },


    hide: function () {
      var container = this.get('container');
      var hiddenClassName = this.get('hiddenClassName');

      this._visible = false;
      container.addClass(hiddenClassName);
    },


    render: function () {
      if (!this._rendered) {

        var container = this.get('container');
        var anchor = this.get('anchor');

        if (anchor && container) {
          var template = this.get('template');
          var data = this._mergeData();

          if (template) {
            var output = Mustache.render(template, data);
            container.setInnerHTML(output);
          }

          this._visible = true;
          this._checkVisibility();

          anchor.appendChild(container);

        } else {
          throw 'View has no container or anchor for rendering';
        }

        this._delegateDOMEvents();
        this._rendered = true;
        this.fire('rendered');

      } else {
        console.log('View already rendered -- Skipping');
      }
    },


    // TODO: View doing too much?
    getData: function (domElement) {
      var dataAttr = this.get('dataAttr');

      var id = domElement.getAttribute(dataAttr);
      var data = this._getDataByID(id);

      return data;
    },


    _checkVisibility: function (element) {
      var container = this.get('container');
      var hiddenClassName = this.get('hiddenClassName');

      if (!this._visible) {
        container.addClass(hiddenClassName);
      }
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
        this.set('container', new DOMElement({
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
      dataAttr: 'data-id',
      container: null,
      className: null,
      hiddenClassName: 'view--hidden',
      template: null,
      anchor: null,
      model: null,
      mergeData: null,
      domEvents: []
    }

  });


  return View;

});
