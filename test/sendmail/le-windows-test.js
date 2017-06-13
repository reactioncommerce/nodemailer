/* eslint no-unused-expressions:0, prefer-arrow-callback: 0 */
/* globals beforeEach, describe, it */


const LeWindows = require('../../dist/sendmail-transport/le-windows');
const chai = require('chai');
const expect = chai.expect;

chai.config.includeStack = true;

describe('Sendmail Windows Newlines', function () {

  it('should rewrite all linebreaks (byte by byte)', function (done) {
    const source = 'tere tere\nteine rida\nkolmas rida\r\nneljas rida\r\nviies rida\n kuues rida';

    const chunks = [];
    const out = new LeWindows();
    out.on('data', chunk => chunks.push(chunk));
    out.on('end', () => {
      expect(Buffer.concat(chunks).toString()).to.equal(source.replace(/\r?\n/g, '\r\n'));
      done();
    });

    const data = Buffer.from(source);
    let pos = 0;
    const writeNextByte = () => {
      if (pos >= data.length) {
        return out.end();
      }
      out.write(Buffer.from([data[pos++]]));
      setImmediate(writeNextByte);
    };

    setImmediate(writeNextByte);
  });

  it('should rewrite all linebreaks (all at once)', function (done) {
    const source = 'tere tere\nteine rida\nkolmas rida\r\nneljas rida\r\nviies rida\n kuues rida';

    const chunks = [];
    const out = new LeWindows();
    out.on('data', chunk => chunks.push(chunk));
    out.on('end', () => {
      expect(Buffer.concat(chunks).toString()).to.equal(source.replace(/\r?\n/g, '\r\n'));
      done();
    });

    const data = Buffer.from(source);
    out.end(data);
  });

});
