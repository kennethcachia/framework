define(['lib/events/listeners'], function (Listeners) {

  describe('Listeners', function () {
    var l;

    beforeEach(function () {
      l = new Listeners();
    });

    it('should add a new entry to the list when add() is called', function () {
      expect(l._callbacks).toEqual({});

      l.add('hello', function () {}, this);
      expect(l._callbacks['hello'].length).toEqual(1);

      l.add('hello', function () {}, this);
      expect(l._callbacks['hello'].length).toEqual(2);
    });

    it('should execute all the callbacks associated with an event name when executeAll() is called', function () {
      var callbackA = jasmine.createSpy();
      var callbackB = jasmine.createSpy();

      l.add('hello', callbackA);
      l.executeAll('hello');

      expect(callbackA.calls.count()).toEqual(1);

      l.add('hello', callbackB);
      l.executeAll('hello');

      expect(callbackA.calls.count()).toEqual(2);
      expect(callbackB.calls.count()).toEqual(1);
    });

    it('should remove all callbacks associated with an event name when remove() is called', function () {
      l.add('hello', function () {});
      expect(l._callbacks['hello'].length).toEqual(1);

      l.add('hello', function () {});
      expect(l._callbacks['hello'].length).toEqual(2);

      l.remove('hello', function () {});
      expect(l._callbacks['hello']).toEqual(undefined);
    });
  })

});