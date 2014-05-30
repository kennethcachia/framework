
define([

  'lib/base/attributes'

], function (Attributes) {

  /**
   * Base
   */
  var Base = {
    init: function (attrs) {
      attrs = attrs || {};
      attrs.id = attrs.id || null;

      this._attrs = new Attributes(attrs, this._attrs);

      this._propagateEvents = null;
      this._listeners = {};

      this._callInitializers();
    },


    destroy: function () {
      this._callDestructors();
      this._destroyEvents();
    },


    _callInitializers: function () {
      this._execute(this._initializers);
    },


    _callDestructors: function () {
      this._execute(this._destructors);
    },


    _execute: function (fns) {
      for (var f = 0; f < fns.length; f++) {
        fns[f].apply(this);
      }
    }
  };


  return Base;

});
