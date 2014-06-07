
define([

  'lib/base/create',
  'lib/base/base'

], function (Create, Base) {

  /**
   * DOMParser
   */
  var _DOMParser = Create('DOMParser', {

    initializer: function () {
      // TODO: Feature detection.
      // TODO: Catch errors.
      this._domParser = new DOMParser();

      this.on(['initReady', 'filterChange'], this._getRegExp, this);
    },


    parseFromString: function (raw) {
      var output = this._parseFromString(raw);

      var checker = {
        acceptNode: this.filter.bind(this)
      };

      var nodeFilter = this.get('nodeFilter');

      var iterator = document.createNodeIterator(
        output.documentElement,
        nodeFilter,
        checker
      );

      return this.parse(iterator);
    },


    filter: function (node) {
      if (node.nodeName.match(this._regExp)) {
        return NodeFilter.FILTER_ACCEPT;
      }
    },


    parse: function (iterator) {
      var output = [];
      var node;

      while (node = iterator.nextNode()) {
        output.push(node);
      }

      return output;
    },


    _parseFromString: function (raw) {
      var type = this.get('type');

      return this._domParser.parseFromString(raw, type);
    },


    _getRegExp: function () {
      var filter = this.get('filter');

      var pattern = '';
      var suffix;

      for (var f = 0; f < filter.length; f++) {
        suffix = (f < filter.length - 1) ? '|' : '';
        pattern += filter[f] + suffix;
      }

      return new RegExp(pattern);
    },


    _attrs: {
      type: {
        value: 'application/xml'
      },

      nodeFilter: {
        value: NodeFilter.SHOW_ELEMENT
      },

      // Empty array accepts all elements.
      filter: {
        value: []
      }
    }

  }, Base);


  return _DOMParser;

});
