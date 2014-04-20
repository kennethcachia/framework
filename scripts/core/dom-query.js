
define([

  'core/create',
  'core/dom'

], function (Create, DOM) {

  // TODO: Extend to support ID's and attributes

  /**
   * DOM Query
   */
  var DOMQuery = Create('DOMQuery', {

    initializer: function () {
      this.on('queryChange', this._checkQuery, this);
    },


    matches: function (element) {
      var query = this.get('query');
      return DOM.hasClass(element, query);
    },


    getMatchingAncestor: function (element) {
      console.log('matching ancestor...');
      var query = this.get('query');
      return DOM.getAncestor(element, query);
    },


    _checkQuery: function () {
      var query = this.get('query');

      if (query.indexOf('.') === -1) {
        throw 'Classname is required - Events/Query';
      }
    },


    _attrs: {
      query: {
        value: null
      },

      parent: {
        value: null
      }
    }

  });


  return DOMQuery;

});
