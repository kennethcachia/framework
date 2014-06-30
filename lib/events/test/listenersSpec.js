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

    it('should remove callbacks associated with an event name and a context when remove() is called', function () {
      var callbackA = function () {};
      var callbackB = function () {};
      var callbackC = function () {};

      l.add('hello', callbackA);
      expect(l._callbacks['hello'].length).toEqual(1);

      l.add('hello', callbackB);
      expect(l._callbacks['hello'].length).toEqual(2);

      expect(function () {
        l.remove('hello', callbackC);
      }).toThrowError('Callback does not exist');

      expect(function () {
        l.remove('hello', callbackA, this);
      }).toThrowError('Callback does not exist');

      l.remove('hello', callbackA);
      expect(l._callbacks['hello'].length).toEqual(1);

      expect(function () {
        l.remove('hello', callbackA);
      }).toThrowError('Callback does not exist');

      l.remove('hello', callbackB);
      expect(l._callbacks['hello']).toBeUndefined();

      expect(function () {
        l.remove('hello', callbackA);
      }).not.toThrowError();
    });
  })

});