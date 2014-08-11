define([

  'lib/ui/input-check',
  'lib/dom/node',
  'lib/base/test/fixtures',
  'lib/base/test/simulate'

], function (InputCheck, DOMNode, Fixtures, Simulate) {

  describe('InputCheck', function () {
    var fixture;
    var context;

    beforeEach(function () {
      fixture = Fixtures.create();

      context = {
        str: 'string',
        active: true,
        inactive: false
      };
    });


    afterEach(function () {
      Fixtures.remove(fixture);
    });


    it('should throw an error when used on a non-boolean', function () {
      expect(function () {
        new InputCheck('Label', context, 'str');
      }).toThrowError('Not a boolean');
    });


    it('should render a checked checkbox within a DOMNode when the value is true', function () {
      var d = new DOMNode('.fixture');
      var ui = new InputCheck('Label', context, 'active');

      ui.attach(d);
      expect(d.hasClass('ui')).toBeTruthy();
      expect(d.hasClass('ui-input-check')).toBeTruthy();
      expect(d._node.innerHTML).toEqual('<input checked="" type="checkbox"><span>Label</span>');
    });


    it('should render a unchecked checkbox within a DOMNode when the value is false', function () {
      var d = new DOMNode('.fixture');
      var ui = new InputCheck('Label', context, 'inactive');

      ui.attach(d);
      expect(d.hasClass('ui')).toBeTruthy();
      expect(d.hasClass('ui-input-check')).toBeTruthy();
      expect(d._node.innerHTML).toEqual('<input type="checkbox"><span>Label</span>');
    });


    it('should update the context item when it\'s value changes', function () {
      var d = new DOMNode('.fixture');
      var ui = new InputCheck('Label', context, 'active');

      ui.attach(d);

      var i = fixture.querySelector('input');
      expect(i.checked).toBeTruthy();

      i.checked = false;
      Simulate.event(i, 'change');
      expect(context.active).toBeFalsy();
    });
  });

});