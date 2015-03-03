var _ = require('lodash');
var Promise = require('bluebird');
var fs = require('fs');
var expect = require('chai').expect;
var authFileName = __dirname + '/test-auth.json';
var box = require('../lib/box-content');
var auth = null;
var auth2 = null;

describe('box-content', function() {

  this.timeout(5000);

  beforeEach(function(done) {
    fs.readFile(authFileName, 'utf8', function(err, results) {
      auth = JSON.parse(results);
      box.use({
        clientID: auth.clientID,
        clientSecret: auth.clientSecret
      });
      box.use({
        refreshToken: auth.user.refreshToken,
        accessToken: auth.user.accessToken
      });
      done();
    });
  });

  // it('should validate auth', function(done) {
  // });

  describe('bc-data', function() {
    it('should get list of folders on root', function(done) {
      box.folders(options).then(function(results) {
          expect(results).to.be.an('object');
          done();
        })
        .catch(function(error) {
          expect(false).to.equal(true);
          done(error);
        })
    });
  });
  describe('bc-error', function() {
    it('should error out on bad clientID', function(done) {
      box.use({
        clientID: auth.clientID + 'TRASH',
        clientSecret: auth.clientSecret
      });
      box.use({
        refreshToken: auth.user.refreshToken,
        clientCustomerID: auth.user.clientCustomerId
      });
      box.folders(options).then(function(results) {
          expect(true).to.equal(false);
          done();
        })
        .catch(function(error) {
          done(error);
        })
    });
    it('should error out on bad clientSecret', function(done) {
      box.use({
        clientID: auth.clientID,
        clientSecret: auth.clientSecret + 'RUBBISH'
      });
      box.use({
        refreshToken: auth.user.refreshToken,
        clientCustomerID: auth.user.clientCustomerId
      });
      box.folders(options).then(function(results) {
          expect(true).to.equal(false);
          done();
        })
        .catch(function(error) {
          done(error);
        })
    });
    it('should error out on bad refreshToken', function(done) {
      box.use({
        clientID: auth.clientID,
        clientSecret: auth.clientSecret
      });
      box.use({
        refreshToken: auth.user.refreshToken + 'GARBAGE',
        accessToken: auth.user.accessToken
      });
      box.folders(options).then(function(results) {
          expect(true).to.equal(false);
          done();
        })
        .catch(function(error) {
          done(error);
        })
    });
    it('should error out on invalid access token', function(done) {
      box.use({
        accessToken: auth2.user.accessToken + 'TRASH',
        tokenExpires: auth2.user.tokenExpires,
        refreshToken: auth2.user.refreshToken
      })
      box.folders(options).then(function(results) {
          expect(true).to.equal(false);
          done();
        })
        .catch(function(error) {
          done(error);
        })
    });
    it('should error out on malformed client use options (wrong fields)', function(done) {
      try {
        box.use({
          client: auth.clientID,
          clientS: auth.clientSecret
        });
        box.use({
          refreshToken: auth.user.refreshToken,
          accessToken: auth.user.accessToken
        });
        box.folders(options).then(function(results) {
            expect(true).to.equal(false);
            done();
          })
          .catch(function(error) {
            done(error);
          })
      } catch (e) {
        done();
      }
    });
    it('should error out on malformed user use options', function(done) {
      try {
        box.use({
          clientID: auth.clientID,
          clientSecret: auth.clientSecret
        });
        box.use({
          refreshT: auth.user.refreshToken,
          accessT: auth.user.accessToken
        });
        box.folders(options).then(function(results) {
            expect(true).to.equal(false);
            done();
          })
          .catch(function(error) {
            done(error);
          })
      } catch (e) {
        done();
      }
    });
    it('should error out on malformed use options (no options)', function(done) {
      try {
        box.use();
        box.folders(options).then(function(results) {
            expect(true).to.equal(false);
            done();
          })
          .catch(function(error) {
            done(error);
          })
      } catch (e) {
        done();
      }
    });
    it('should error out on malformed use options (string input)', function(done) {
      try {
        box.use('THIS WILL BREAK');
        box.folders(options).then(function(results) {
            expect(true).to.equal(false);
            done();
          })
          .catch(function(error) {
            done(error);
          })
      } catch (e) {
        done();
      }
    });

  });

});
