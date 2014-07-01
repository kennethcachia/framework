define([

  'lib/render/abstract-renderable',
  'lib/base/inherit'

], function (AbstractRenderable, inherit) {

  describe('AbstractRenderable', function () {
    var R;

    beforeEach(function () {
      R = function () {
        R.superClass.call(this);
      };

      inherit(R, AbstractRenderable);
      R.prototype._render = function () {};
    });

    it('should throw an error if _render() is not implemented', function () {
      var r = new AbstractRenderable();

      expect(function () {
        r.render();
      }).toThrowError('_render() not implemented');

      expect(r._isRendered).toBeFalsy();
    });

    it('should set isRendered to true on render', function () {
      var r = new R();

      expect(r._isRendered).toBeFalsy();
      r.render();
      expect(r._isRendered).toBeTruthy();
    });

    it('should fire an event on render', function () {
      var r = new R();
      var callback = jasmine.createSpy();

      r.on('rendered', callback);
      r.render();
      r.render();

      expect(callback.calls.count()).toEqual(2);
    });
  });

});