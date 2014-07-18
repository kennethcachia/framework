/**
 * @module lib/base/test/fixtures
 */
define(function () {

  /**
   * @alias module:lib/base/test/fixtures
   */
  var Fixtures = {
    /**
     * Creates a new Node with a .fixture class
     * and appends it to &lt;body&gt;.
     *
     * @method
     * @param {String=} suffix Optional suffix to .fixture
     * @returns {Node} The new Node.
     */
    create: function (suffix) {
      var fixture = document.createElement('div');
      var className = 'fixture' + (suffix ? suffix : '');

      fixture.classList.add(className);
      document.body.appendChild(fixture);

      return fixture;
    },


    /**
     * Removes a fixture from the DOM.
     *
     * @method
     * @param {Node} fixture The fixture node to remove.
     */
    remove: function (fixture) {
      if (fixture.remove) {
        fixture.remove();
      } else if (fixture.parentNode) {
        fixture.parentNode.removeChild(fixture);
      }
    }
  };


  return Fixtures;

});