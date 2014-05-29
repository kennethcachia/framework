
define(['lib/base/create'], function (Create) {

  describe('Create', function() {
    it('should throw an error when name is missing', function() {
      expect(Create).toThrow('No Name');
    });
  });

});
