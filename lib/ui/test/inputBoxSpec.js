define([

  'lib/ui/input-box',
  'lib/dom/node'

], function (InputBox, DOMNode) {

  describe('InputBox', function () {
    var fixture;
    var context;

    beforeEach(function () {
      fixture = document.createElement('div');
      fixture.classList.add('fixture');
      document.body.appendChild(fixture);

      context = {
        name: 'hello'
      };
    });


    afterEach(function () {
      fixture.remove();
    });


    it('should throw an error when a key is not defined', function () {
      var d = new DOMNode('.fixture');

      expect(function () {
        new InputBox(d, context);
      }).toThrowError('Not defined');
    });


    it('should update the context item when it\'s value changes', function () {
      var changeEvent = document.createEvent('HTMLEvents');
      var d = new DOMNode('.fixture');
      var input = new InputBox(d, context, 'name');
      var i = fixture.querySelector('input');

      expect(i.value).toEqual('hello');

      i.value = 'bye';
      changeEvent.initEvent('change', true, true);
      i.dispatchEvent(changeEvent);
      expect(context.name).toEqual('bye');
    });
  });

});