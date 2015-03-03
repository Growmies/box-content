// Copyright (c) 2015, Trent Oswald <trentoswald@therebelrobot.com
//
// Permission to use, copy, modify, and/or distribute this software for any purpose
// with or without fee is hereby granted, provided that the above copyright notice
// and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT,
// OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE,
// DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
// ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

var Promise = require('bluebird');
var request = require('unirest');
var _ = require('lodash');
var moment = require('moment');

/**
 * Node.js driver for Box Content API (v2.0)
 * Proceeds the call to the API and give
 * back the response in JSON format
 *
 */
var BoxContent = function() {
  var self = this;

  var my = {};
  my.auth = {};
  my.host = 'https://api.box.com/2.0/';
  my.port = 443;

  /*******************************/
  /*       Private helpers       */
  /*******************************/
  var _refreshAuth = function(options) {
    return new Promise(function(resolve, reject) {
      if (options.skip || my.auth.tokenExpires > parseInt(moment().format('X')) {
        resolve();
        return;
      }
      request.post('https://api.box.com/oauth2/token')
        .headers({
          Authorization: 'Bearer ' + my.auth.accessToken
        })
        .send({
          grant_type: 'refresh_token',
          refresh_token: my.auth.refreshToken,
          client_id: my.auth.clientID,
          client_secret: my.auth.clientSecret
        })
        .end(function(response) {
          if (response.body) {
            try {
              var data = JSON.parse(response.body);
              my.auth.accessToken = data.access_token;
              my.auth.refreshToken = data.refresh_token;
              my.auth.tokenExpires = parseInt(moment().add(data.expires_in, 'seconds').format('X'));
              resolve();
            } catch (e) {
              reject('No Auth Data');
            }
          } else {
            reject('No Auth Data');
          }
        });
    });
  }
  var _connect = function(options) {
    return _refreshAuth(options).then(function(){

    });
  };

  /*****************************/
  /*      Public functions     */
  /*****************************/

  /**
   * Use the specified options to sign requests: can be an accessToken/refreshToken keys pair
   * or a clientID/clientSecret keys pair
   * @param options object { accessToken, refreshToken } ||
   *                       { accessToken, refreshToken, tokenExpires } ||
   *                       { clientID, clientSecret }
   * @throws Error if options is wrong
   */
  this.use = function(options) {
    if (typeof options === 'object') {
      if (options.accessToken && options.refreshToken) {
        my.limit = null;
        my.remaining = null;
        my.auth.accessToken = options.accessToken;
        my.auth.tokenExpires = options.tokenExpires || null;
        my.auth.refreshToken = options.refreshToken;
      } else if (options.clientID && options.clientSecret) {
        my.limit = null;
        my.remaining = null;
        my.auth.accessToken = null;
        my.auth.tokenExpires = null;
        my.auth.clientID = options.clientID;
        my.auth.clientSecret = options.clientSecret;
      } else {
        throw new Error('Wrong param "options"');
      }
    } else {
      throw new Error('Wrong param "options"');
    }
  };
  // https://developers.box.com/docs/
  this.folders = function(options) {
    return _connect.then(function(results){

    });
  }
  this.folderItems = function(options) {
    return _connect.then(function(results){

    });
  }
  this.folderCollaborations = function(options) {
    return _connect.then(function(results){

    });
  }
  this.files = function(options) {
    return _connect.then(function(results){

    });
  }
  this.fileContent = function(options) {
    return _connect.then(function(results){

    });
  }
  this.fileVersions = function(options) {
    return _connect.then(function(results){

    });
  }
  this.sharedItems = function(options) {
    return _connect.then(function(results){

    });
  }
  this.comments = function(options) {
    return _connect.then(function(results){

    });
  }
  this.collaborations = function(options) {
    return _connect.then(function(results){

    });
  }
  this.search = function(options) {
    return _connect.then(function(results){

    });
  }
  this.events = function(options) {
    return _connect.then(function(results){

    });
  }
  this.user = function(options) {
    return _connect.then(function(results){

    });
  }
  return this;
};

module.exports = new BoxContent();
