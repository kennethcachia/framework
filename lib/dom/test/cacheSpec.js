define([

  'lib/dom/cache',
  'lib/base/test/fixtures',
  'lib/dom/node'

], function (DOMCache, Fixtures, DOMNode) {

  describe('DOMCache', function () {
    var fixtureA;
    var fixtureB;
    var body = new DOMNode('body');

    beforeEach(function () {
      fixtureA = Fixtures.create('A');
      fixtureB = Fixtures.create('B');
    });


    afterEach(function () {
      Fixtures.remove(fixtureA);
      Fixtures.remove(fixtureB);
    });


    it('should add an entry to its internal array each time a new selector is used', function () {
      var c = new DOMCache(body);
      expect(c._cache).toEqual({});

      c.find('.fixtureA');
      expect(c._cache['.fixtureA']).toBeDefined();

      c.find('.fixtureB');
      expect(c._cache['.fixtureB']).toBeDefined();
    });


    it('should not add a new entry if the selector was previously used', function () {
      var f = document.querySelector('.fixtureA');

      var c = new DOMCache(body);
      expect(c._cache).toEqual({});

      spyOn(c, '_create').and.callThrough();

      var a = c.find('.fixtureA');
      expect(a._node.isEqualNode(f)).toBeTruthy();
      expect(c._cache['.fixtureA']).toBeDefined();

      a = c.find('.fixtureA');
      expect(a._node.isEqualNode(f)).toBeTruthy();
      expect(c._cache['.fixtureA']).toBeDefined();

      expect(c._create.calls.count()).toEqual(1);
    });


    it('should return a DOMNode when one element is found using find()', function () {
      var c = new DOMCache(body);

      var a = c.find('.fixtureA');
      expect(a._node).toEqual(document.querySelector('.fixtureA'));
    });


    it('should return an array of DOMNodes when more than one element is found using find()', function () {
      var c = new DOMCache(body);

      var f = c.find('.fixtureA, .fixtureB');
      expect(f.length).toEqual(2);
      expect(f[0]._node).toEqual(document.querySelector('.fixtureA'));
      expect(f[1]._node).toEqual(document.querySelector('.fixtureB'));
    });


    it('should clear the cache when purge() is used', function () {
      var c = new DOMCache(body);
      expect(c._cache).toEqual({});

      c.find('.fixtureA');
      expect(c._cache).not.toEqual({});

      c.purge();
      expect(c._cache).toEqual({});
    });
  });

});