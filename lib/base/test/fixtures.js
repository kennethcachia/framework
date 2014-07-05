define(function () {

  var Fixtures = {
    create: function (suffix) {
      var fixture = document.createElement('div');
      var className = 'fixture' + (suffix ? suffix : '');

      fixture.classList.add(className);
      document.body.appendChild(fixture);

      return fixture;
    },


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