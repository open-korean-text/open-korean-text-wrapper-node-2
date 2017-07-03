'use strict';

const expect = require('chai').expect;
const OpenKoreanTextProcessor = require('../').default;

suite('IntermediaryTokens', () => {

  const shared = {};

  beforeEach(() => OpenKoreanTextProcessor.ensureJvm().then(() => {
    shared.token = OpenKoreanTextProcessor.tokenizeSync('착한강아지상을 받은 루루');
  }));

  afterEach((done) => {
    delete shared.token && done();
  })

  suite('sync', () => {
    test('extractPhrases', (done) => {
      expect(shared.token.extractPhrasesSync()).to.eql([
        { text: '착한강아지상', pos: 'Noun', offset: 0, length: 6 },
        { text: '루루', pos: 'Noun', offset: 11, length: 2 },
        { text: '강아지상', pos: 'Noun', offset: 2, length: 4 }
      ]);
      done();
    });

    test('detokenize', (done) => {
      expect(shared.token.detokenizeSync()).to.eql('착한 강아지상을 받은 루루');
      done();
    });
  });

  suite('async', () => {
    test('extractPhrases', () => {
      return shared.token.extractPhrases().then(result => expect(result).to.eql([
        { text: '착한강아지상', pos: 'Noun', offset: 0, length: 6 },
        { text: '루루', pos: 'Noun', offset: 11, length: 2 },
        { text: '강아지상', pos: 'Noun', offset: 2, length: 4 }
      ]));
    });

    test('detokenize', () => {
      return shared.token.detokenize().then(result => expect(result).to.eql('착한 강아지상을 받은 루루'));
    });
  });

  suite('common', () => {
    test('toJSON', (done) => {
      expect(shared.token.toJSON()).to.eql([
        { text: '착한', pos: 'Adjective', stem: '착하다', offset: 0, length: 2, isUnknown: false },
        { text: '강아지', pos: 'Noun', offset: 2, length: 3, isUnknown: false },
        { text: '상', pos: 'Suffix', offset: 5, length: 1, isUnknown: false },
        { text: '을', pos: 'Josa', offset: 6, length: 1, isUnknown: false },
        { text: ' ', pos: 'Space', offset: 7, length: 1, isUnknown: false },
        { text: '받은', pos: 'Verb', stem: '받다', offset: 8, length: 2, isUnknown: false },
        { text: ' ', pos: 'Space', offset: 10, length: 1, isUnknown: false },
        { text: '루루', pos: 'Noun', offset: 11, length: 2, isUnknown: false }
      ]);
      done();
    });
  })
});
