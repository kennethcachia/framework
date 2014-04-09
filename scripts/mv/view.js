

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
      this._appendedElements = [];

      this.on('dataChange', this._onDataChange, this);
      this.on('rendered', this._appendElements, this);

      this.on('elementsChange', this._elementsChange, this);

      var anchor = this.get('anchor');

      if (!anchor) {
        anchor = new DOMElement();
        anchor.fromNode(document.body);
        this.set('anchor', anchor);
      }

      this._rendered = false;
      this._visible = false;
    },


    destructor: function () {
      var anchor = this.get('anchor');
      var container = this.get('container');

      container.destroy();

      this._rendered = false;
      this._visible = false;

      this._appendedElements = null;
    },


    show: function () {
      if (this._rendered) {

        this._toggleVisibility('remove');
        this._visible = true;

      } else {
        console.log('View not rendered yet');
      }
    },


    hide: function () {
      this._toggleVisibility('add');
      this._visible = false;
    },


    render: function () {

      if (!this._rendered) {

        this._createContainer();
        this._render();

      } else {
        console.log('View already rendered -- Skipping');
      }

    },


    getSourceDOMElement: function () {
      return this._sourceDOMElement;
    },


    /*updateData: function () {
      var data = this.get('data');
      var source = this.getSourceDOMElement();

      var value;

      for (var d in data) {
        value = source.getFromNode(d);
        data[d] = value;
      }

      console.log('--update form UI');
      this.set('data', data);
    },*/


    _appendElements: function () {
      var elements = this.get('elements');
      var container = this.get('container');

      var childElement;
      var attrs;

      elements.each(elements, function (element) {
        
        attrs = element.attrs;
        childElement = new element.element(attrs);

        container.appendChild(childElement);
        this._appendedElements.push(childElement);

        this.fire('appendedChild', {
          child: childElement
        });

      }, this);
    },


    _removeElements: function () {
      var elements = this._appendedElements;

      for (var e = 0; e < elements.length; e++) {
        elements[e].destroy();
      }
    },


    _updateSource: function () {
      var data = this.get('data');
      var source = this.getSourceDOMElement();

      for (var d in data) {
        source.setOnNode(d, data[d]);
      }

      console.log('--update from set()');
    },


    _onDataChange: function () {
      if (this._rendered) {
        this._updateSource();
      }
    },


    _elementsChange: function () {
      console.log('View elements changed - rerender');

      if (!this._rendered) {
        this.render();
      } else {
        this._removeElements();
        this._render();
      }
    },


    _render: function () {
      var container = this.get('container');
      var anchor = this.get('anchor');
      var data = this.get('data');

      if (container) {

        var template = this.get('template');

        if (template) {
          var output = Mustache.render(template, data);
          container.setInnerHTML(output);
        }

        anchor.appendChild(container);

        this._delegateDOMEvents();
        this._rendered = true;

        this._sourceDOMElement = container.one('[data-source]');

        this.fire('rendered');

      } else {
        throw 'View has no container for rendering.';
      }
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


    _toggleVisibility: function (mode) {
      var container = this.get('container');
      var hiddenClassName = this.get('hiddenClassName');

      var action = mode + 'Class';
      container[action](hiddenClassName);
    },


    _delegateDOMEvents: function () {
      var domEvents = this.get('domEvents');
      var container = this.get('container');

      domEvents.each(domEvents, function (e) {
        e.context = this;
        container.addDOMEvent(e);
      }, this);
    },


    _attrs: {
      elements: [],
      container: null, //'<div class="view"></div>',
      data: {},
      domEvents: [],
      anchor: null,
      className: null,
      hiddenClassName: 'view--hidden',
      template: null
    }

  });


  return View;

});
