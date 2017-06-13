/* eslint no-unused-expressions:0, prefer-arrow-callback: 0, no-undefined: 0 */
/* globals beforeEach, describe, it */


const chai = require('chai');
const addressparser = require('../../dist/addressparser');
const expect = chai.expect;

chai.config.includeStack = true;

describe('#addressparser', function () {
  it('should handle single address correctly', function () {
    const input = 'andris@tr.ee';
    const expected = [{
      address: 'andris@tr.ee',
      name: ''
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('should handle multiple addresses correctly', function () {
    const input = 'andris@tr.ee, andris@example.com';
    const expected = [{
      address: 'andris@tr.ee',
      name: ''
    }, {
      address: 'andris@example.com',
      name: ''
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('should handle unquoted name correctly', function () {
    const input = 'andris <andris@tr.ee>';
    const expected = [{
      name: 'andris',
      address: 'andris@tr.ee'
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('should handle quoted name correctly', function () {
    const input = '"reinman, andris" <andris@tr.ee>';
    const expected = [{
      name: 'reinman, andris',
      address: 'andris@tr.ee'
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('should handle quoted semicolons correctly', function () {
    const input = '"reinman; andris" <andris@tr.ee>';
    const expected = [{
      name: 'reinman; andris',
      address: 'andris@tr.ee'
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('should handle unquoted name, unquoted address correctly', function () {
    const input = 'andris andris@tr.ee';
    const expected = [{
      name: 'andris',
      address: 'andris@tr.ee'
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('should handle emtpy group correctly', function () {
    const input = 'Undisclosed:;';
    const expected = [{
      name: 'Undisclosed',
      group: []
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('should handle address group correctly', function () {
    const input = 'Disclosed:andris@tr.ee, andris@example.com;';
    const expected = [{
      name: 'Disclosed',
      group: [{
        address: 'andris@tr.ee',
        name: ''
      }, {
        address: 'andris@example.com',
        name: ''
      }]
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('should handle semicolon as a delimiter', function () {
    const input = 'andris@tr.ee; andris@example.com;';
    const expected = [{
      address: 'andris@tr.ee',
      name: ''
    }, {
      address: 'andris@example.com',
      name: ''
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('should handle mixed group correctly', function () {
    const input = 'Test User <test.user@mail.ee>, Disclosed:andris@tr.ee, andris@example.com;,,,, Undisclosed:;';
    const expected = [{
      address: 'test.user@mail.ee',
      name: 'Test User'
    }, {
      name: 'Disclosed',
      group: [{
        address: 'andris@tr.ee',
        name: ''
      }, {
        address: 'andris@example.com',
        name: ''
      }]
    }, {
      name: 'Undisclosed',
      group: []
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('semicolon as delimiter should not break group parsing', function () {
    const input = 'Test User <test.user@mail.ee>; Disclosed:andris@tr.ee, andris@example.com;,,,, Undisclosed:; bob@example.com;';
    const expected = [{
      address: 'test.user@mail.ee',
      name: 'Test User'
    }, {
      name: 'Disclosed',
      group: [{
        address: 'andris@tr.ee',
        name: ''
      }, {
        address: 'andris@example.com',
        name: ''
      }]
    }, {
      name: 'Undisclosed',
      group: []
    }, {
      address: 'bob@example.com',
      name: ''
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('should handle name from comment correctly', function () {
    const input = 'andris@tr.ee (andris)';
    const expected = [{
      name: 'andris',
      address: 'andris@tr.ee'
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('should handle skip comment correctly', function () {
    const input = 'andris@tr.ee (reinman) andris';
    const expected = [{
      name: 'andris',
      address: 'andris@tr.ee'
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('should handle missing address correctly', function () {
    const input = 'andris';
    const expected = [{
      name: 'andris',
      address: ''
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('should handle apostrophe in name correctly', function () {
    const input = 'O\'Neill';
    const expected = [{
      name: 'O\'Neill',
      address: ''
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('should handle particularily bad input, unescaped colon correctly', function () {
    const input = 'FirstName Surname-WithADash :: Company <firstname@company.com>';
    const expected = [{
      name: 'FirstName Surname-WithADash',
      group: [{
        name: undefined,
        group: [{
          address: 'firstname@company.com',
          name: 'Company'
        }]
      }]
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

    // should not change an invalid email to valid email
  it('should handle invalid email address correctly', function () {
    const input = 'name@address.com@address2.com';
    const expected = [{
      name: '',
      address: 'name@address.com@address2.com'
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });

  it('should handle unexpected <', function () {
    const input = 'reinman > andris < test <andris@tr.ee>';
    const expected = [{
      name: 'reinman > andris',
      address: 'andris@tr.ee'
    }];
    expect(addressparser(input)).to.deep.equal(expected);
  });
});
