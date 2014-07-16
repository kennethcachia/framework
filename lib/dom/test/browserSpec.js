define([

  'lib/dom/browser',
  'lib/base/test/fixtures'

], function (Browser, Fixtures) {

  describe('Browser', function () {
    var fixture;
    var clickEvent = document.createEvent('HTMLEvents');
    clickEvent.initEvent('click', true, true);

    beforeEach(function () {
      fixture = Fixtures.create();
    });


    afterEach(function () {
      Fixtures.remove(fixture);
    });


    it('should check if a node matches a selector via matches()', function () {
      var node = document.querySelector('.fixture');
      node.id = 'fixture';

      expect(Browser.matches(node, '.fixture')).toBeTruthy();
      expect(Browser.matches(node, '#fixture')).toBeTruthy();
      expect(Browser.matches(node, 'div')).toBeTruthy();

      expect(Browser.matches(node, '.f')).toBeFalsy();
      expect(Browser.matches(node, '#f')).toBeFalsy();
      expect(Browser.matches(node, 'p')).toBeFalsy();
    });


    it('should add an event listener to a node via addEventListener()', function () {
      var node = document.querySelector('.fixture');
      var callback = jasmine.createSpy();

      Browser.addEventListener(node, 'click', callback);
      node.dispatchEvent(clickEvent);
      expect(callback).toHaveBeenCalled();
    });


    it('should remove an event listener from a node via removeEventListener()', function () {
      var node = document.querySelector('.fixture');
      var callback = jasmine.createSpy();

      Browser.addEventListener(node, 'click', callback);
      node.dispatchEvent(clickEvent);
      expect(callback.calls.count()).toEqual(1);

      Browser.removeEventListener(node, 'click', callback);
      node.dispatchEvent(clickEvent);
      expect(callback.calls.count()).toEqual(1);
    });
  });

});