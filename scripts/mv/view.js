
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


    _render: function () {
      var container = this.get('container');
      var anchor = this.get('anchor');

      if (container) {

        var template = this.get('template');

        if (template) {
          var output = this._renderFromTemplate(template);
          container.setInnerHTML(output);
        }

        anchor.appendChild(container);

        this._delegateDOMEvents();
        this._rendered = true;
        this.fire('rendered');

      } else {
        throw 'View has no container for rendering.';
      }
    },


    _renderFromTemplate: function (template) {
      var data = this.get('data');
      return Mustache.render(template, data);
    },


    _createContainer: function () {
      var container = this.get('container');
      var containerType = this.get('containerType');

      if (!containerType) {
        containerType = DOMElement;
      }

      if (typeof container === 'string') {
        var output = this._renderFromTemplate(container);

        this.set('container', new containerType({
          html: output
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
      container: {
        value: null
      },

      containerType: {
        value: null
      },

      data: {
        value: {}
      },

      domEvents: {
        value: []
      },

      anchor: {
        value: null
      },

      className: {
        value: null
      },

      hiddenClassName: {
        value: 'view--hidden'
      },

      template: {
        value: null
      }
    }

  });


  return View;

});
