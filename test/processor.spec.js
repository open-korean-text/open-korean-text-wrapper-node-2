'use strict';

const expect = require('chai').expect;
const OpenKoreanTextProcessor = require('../');

suite('OpenKoreanTextProcessor', () => {
  suite('sync', () => {
    before((done) => require('java').ensureJvm(done));

    test('normalize', (done) => {
      const text = '힘들겟씀다 그래욬ㅋㅋㅋ';
      const result = OpenKoreanTextProcessor.normalizeSync(text);
      expect(result).to.eql('힘들겠습니다 그래요ㅋㅋ');
      done();
    });

    test('tokenize', (done) => {
      const text = '착한강아지상을 받은 루루';
      const intermediaryTokens = OpenKoreanTextProcessor.tokenizeSync(text);
      expect(intermediaryTokens.toString()).to.eql(
        'List(착한(Adjective: 0, 2), 강아지(Noun: 2, 3), 상(Suffix: 5, 1), 을(Josa: 6, 1), ' +
        ' (Space: 7, 1), 받은(Verb: 8, 2),  (Space: 10, 1), 루루(Noun: 11, 2))');
      expect(intermediaryTokens.toJSON()).to.eql([
        { text: '착한', pos: 'Adjective', offset: 0, length: 2, isUnknown: false },
        { text: '강아지', pos: 'Noun', offset: 2, length: 3, isUnknown: false },
        { text: '상', pos: 'Suffix', offset: 5, length: 1, isUnknown: false },
        { text: '을', pos: 'Josa', offset: 6, length: 1, isUnknown: false },
        { text: ' ', pos: 'Space', offset: 7, length: 1, isUnknown: false },
        { text: '받은', pos: 'Verb', offset: 8, length: 2, isUnknown: false },
        { text: ' ', pos: 'Space', offset: 10, length: 1, isUnknown: false },
        { text: '루루', pos: 'Noun', offset: 11, length: 2, isUnknown: false }
      ]);
      done();
    });

    test('tokens to json array', (done) => {
      const text = '착한강아지상을 받은 루루';
      const tokens = OpenKoreanTextProcessor.tokenizeSync(text);
      expect(OpenKoreanTextProcessor.tokensToJsonArraySync(tokens, true)).to.eql([
        { text: '착한', pos: 'Adjective', offset: 0, length: 2, isUnknown: false },
        { text: '강아지', pos: 'Noun', offset: 2, length: 3, isUnknown: false },
        { text: '상', pos: 'Suffix', offset: 5, length: 1, isUnknown: false },
        { text: '을', pos: 'Josa', offset: 6, length: 1, isUnknown: false },
        { text: ' ', pos: 'Space', offset: 7, length: 1, isUnknown: false },
        { text: '받은', pos: 'Verb', offset: 8, length: 2, isUnknown: false },
        { text: ' ', pos: 'Space', offset: 10, length: 1, isUnknown: false },
        { text: '루루', pos: 'Noun', offset: 11, length: 2, isUnknown: false }
      ]);
      expect(OpenKoreanTextProcessor.tokensToJsonArraySync(tokens, false)).to.eql([
        { text: '착한', pos: 'Adjective', offset: 0, length: 2, isUnknown: false },
        { text: '강아지', pos: 'Noun', offset: 2, length: 3, isUnknown: false },
        { text: '상', pos: 'Suffix', offset: 5, length: 1, isUnknown: false },
        { text: '을', pos: 'Josa', offset: 6, length: 1, isUnknown: false },
        { text: '받은', pos: 'Verb', offset: 8, length: 2, isUnknown: false },
        { text: '루루', pos: 'Noun', offset: 11, length: 2, isUnknown: false }
      ]);
      done();
    });

    test('stemming', (done) => {
      const text = '게으른 아침이 밝았구나';
      const tokens = OpenKoreanTextProcessor.tokenizeSync(text);
      const stemmed = OpenKoreanTextProcessor.stemSync(tokens);
      const result = OpenKoreanTextProcessor.tokensToJsonArraySync(stemmed);
      expect(result).to.eql([
        { text: '게으르다', pos: 'Adjective', offset: 0, length: 3, isUnknown: false },
        { text: '아침', pos: 'Noun', offset: 4, length: 2, isUnknown: false },
        { text: '이', pos: 'Josa', offset: 6, length: 1, isUnknown: false },
        { text: '밝다', pos: 'Verb', offset: 8, length: 4, isUnknown: false }
      ]);
      done();
    });

    test('add to dictionary', (done) => {
      const text = '압뱌뱌어버벼부뷰';
      const tokens = OpenKoreanTextProcessor.tokenizeSync(text);
      expect(OpenKoreanTextProcessor.tokensToJsonArraySync(tokens, false)).to.eql([
        { text: '압뱌뱌어버벼부뷰', pos: 'Noun', offset: 0, length: 8, isUnknown: true }
      ]);

      OpenKoreanTextProcessor.addNounsToDictionarySync('압뱌뱌', '어버벼', '부뷰');
      const tokensAfter = OpenKoreanTextProcessor.tokenizeSync(text);
      expect(OpenKoreanTextProcessor.tokensToJsonArraySync(tokensAfter, false)).to.eql([
        { text: '압뱌뱌', pos: 'Noun', offset: 0, length: 3, isUnknown: false },
        { text: '어버벼', pos: 'Noun', offset: 3, length: 3, isUnknown: false },
        { text: '부뷰', pos: 'Noun', offset: 6, length: 2, isUnknown: false }
      ]);
      done();
    });

    test('phrase extractor', (done) => {
      const text = '아름다운 트위터를 만들어 보자. 시발 #욕하지_말자';
      const tokens = OpenKoreanTextProcessor.tokenizeSync(text);
      expect(OpenKoreanTextProcessor.extractPhrasesSync(tokens, { filterSpam: true, includeHashtag: true })).to.eql([
        { text: '아름다운 트위터', pos: 'Noun', offset: 0, length: 8 },
        { text: '트위터', pos: 'Noun', offset: 5, length: 3 },
        { text: '#욕하지_말자', pos: 'Hashtag', offset: 21, length: 7 }
      ]);
      expect(OpenKoreanTextProcessor.extractPhrasesSync(tokens, { filterSpam: true, includeHashtag: false })).to.eql([
        { text: '아름다운 트위터', pos: 'Noun', offset: 0, length: 8 },
        { text: '트위터', pos: 'Noun', offset: 5, length: 3 },
      ]);
      expect(OpenKoreanTextProcessor.extractPhrasesSync(tokens, { filterSpam: false, includeHashtag: true })).to.eql([
        { text: '아름다운 트위터', pos: 'Noun', offset: 0, length: 8 },
        { text: '시발', pos: 'Noun', offset: 18, length: 2 },
        { text: '트위터', pos: 'Noun', offset: 5, length: 3 },
        { text: '#욕하지_말자', pos: 'Hashtag', offset: 21, length: 7 }
      ]);
      expect(OpenKoreanTextProcessor.extractPhrasesSync(tokens, { filterSpam: false, includeHashtag: false })).to.eql([
        { text: '아름다운 트위터', pos: 'Noun', offset: 0, length: 8 },
        { text: '시발', pos: 'Noun', offset: 18, length: 2 },
        { text: '트위터', pos: 'Noun', offset: 5, length: 3 }
      ]);
      done();
    });


    test('phrase extractor 2', (done) => {
      const text = '시발 토토가의 인기폭발을 보니 미국에서 뉴키즈온더블럭 백스트릿보이스 조인트 컨서트';
      const tokens = OpenKoreanTextProcessor.tokenizeSync(text);
      const phrases = OpenKoreanTextProcessor.extractPhrasesSync(tokens);
      expect(phrases).to.eql([
        { text: '토토가', pos: 'Noun', offset: 3, length: 3 },
        { text: '토토가의 인기폭발', pos: 'Noun', offset: 3, length: 9 },
        { text: '인기폭발', pos: 'Noun', offset: 8, length: 4 },
        { text: '미국', pos: 'Noun', offset: 17, length: 2 },
        { text: '뉴키즈온더블럭', pos: 'Noun', offset: 22, length: 7 },
        { text: '뉴키즈온더블럭 백스트릿보이스', pos: 'Noun', offset: 22, length: 15 },
        { text: '뉴키즈온더블럭 백스트릿보이스 조인트', pos: 'Noun', offset: 22, length: 19 },
        { text: '백스트릿보이스 조인트', pos: 'Noun', offset: 30, length: 11 },
        { text: '뉴키즈온더블럭 백스트릿보이스 조인트 컨서트', pos: 'Noun', offset: 22, length: 23 },
        { text: '백스트릿보이스 조인트 컨서트', pos: 'Noun', offset: 30, length: 15 },
        { text: '조인트 컨서트', pos: 'Noun', offset: 38, length: 7 },
        { text: '인기', pos: 'Noun', offset: 8, length: 2 },
        { text: '폭발', pos: 'Noun', offset: 10, length: 2 },
        { text: '스트릿', pos: 'Noun', offset: 31, length: 3 },
        { text: '보이스', pos: 'Noun', offset: 34, length: 3 },
        { text: '조인트', pos: 'Noun', offset: 38, length: 3 },
        { text: '컨서트', pos: 'Noun', offset: 42, length: 3 }
      ]);
      done();
    });


    test('sentence splitter', (done) => {
      const text = '가을이다! 남자는 가을을 탄다...... 그렇지? 루루야! 버버리코트 사러 가자!!!!';
      const sentences = OpenKoreanTextProcessor.splitSentencesSync(text);
      expect(sentences).to.eql([
        { text: '가을이다!', start: 0, end: 5 },
        { text: '남자는 가을을 탄다......', start: 6, end: 22 },
        { text: '그렇지?', start: 23, end: 27 },
        { text: '루루야!', start: 28, end: 32 },
        { text: '버버리코트 사러 가자!!!!', start: 33, end: 48 }
      ]);
      done();
    });

    test('detokenize with word', (done) => {
      const words = ['늘', '평온', '하게', '누워', '있', '는', '루루'];
      const detokenized = OpenKoreanTextProcessor.detokenizeSync(words);
      expect(detokenized).to.eql('늘 평온하게 누워있는 루루');
      done();
    });

    test('detokenize with token object', (done) => {
      const tokens = OpenKoreanTextProcessor.tokenizeSync('늘평온하게 누워있는루루')
      const detokenized = OpenKoreanTextProcessor.detokenizeSync(tokens);
      expect(detokenized).to.eql('늘 평온하게 누워있는 루루');
      done();
    });
  });

  suite('async', () => {

    before((done) => require('java').ensureJvm(() => OpenKoreanTextProcessor.class && done()));

    test('normalize', () => {
      const text = '힘들겟씀다 그래욬ㅋㅋㅋ';
      const expected = '힘들겠습니다 그래요ㅋㅋ';
      return OpenKoreanTextProcessor.normalize(text).then((result) => expect(result).to.eql(expected));
    });

    test('tokenize', () => {
      const text = '착한강아지상을 받은 루루';
      return OpenKoreanTextProcessor.tokenize(text).then((result) => {
        expect(result.toString()).to.eql(
          'List(착한(Adjective: 0, 2), 강아지(Noun: 2, 3), 상(Suffix: 5, 1), 을(Josa: 6, 1), ' +
          ' (Space: 7, 1), 받은(Verb: 8, 2),  (Space: 10, 1), 루루(Noun: 11, 2))'
        );
        expect(result.toJSON()).to.eql([
          { text: '착한', pos: 'Adjective', offset: 0, length: 2, isUnknown: false },
          { text: '강아지', pos: 'Noun', offset: 2, length: 3, isUnknown: false },
          { text: '상', pos: 'Suffix', offset: 5, length: 1, isUnknown: false },
          { text: '을', pos: 'Josa', offset: 6, length: 1, isUnknown: false },
          { text: ' ', pos: 'Space', offset: 7, length: 1, isUnknown: false },
          { text: '받은', pos: 'Verb', offset: 8, length: 2, isUnknown: false },
          { text: ' ', pos: 'Space', offset: 10, length: 1, isUnknown: false },
          { text: '루루', pos: 'Noun', offset: 11, length: 2, isUnknown: false }
        ]);
      });
    });

    test('tokens to json array', () => {
      const text = '착한강아지상을 받은 루루';
      return OpenKoreanTextProcessor.tokenize(text).then((tokens) => Promise.all([
        OpenKoreanTextProcessor.tokensToJsonArray(tokens, true)   // keeping space
          .then((result) => expect(result).to.eql([
            { text: '착한', pos: 'Adjective', offset: 0, length: 2, isUnknown: false },
            { text: '강아지', pos: 'Noun', offset: 2, length: 3, isUnknown: false },
            { text: '상', pos: 'Suffix', offset: 5, length: 1, isUnknown: false },
            { text: '을', pos: 'Josa', offset: 6, length: 1, isUnknown: false },
            { text: ' ', pos: 'Space', offset: 7, length: 1, isUnknown: false },
            { text: '받은', pos: 'Verb', offset: 8, length: 2, isUnknown: false },
            { text: ' ', pos: 'Space', offset: 10, length: 1, isUnknown: false },
            { text: '루루', pos: 'Noun', offset: 11, length: 2, isUnknown: false }
          ])),
        OpenKoreanTextProcessor.tokensToJsonArray(tokens, false)  // not keeping space
          .then((result) => expect(result).to.eql([
            { text: '착한', pos: 'Adjective', offset: 0, length: 2, isUnknown: false },
            { text: '강아지', pos: 'Noun', offset: 2, length: 3, isUnknown: false },
            { text: '상', pos: 'Suffix', offset: 5, length: 1, isUnknown: false },
            { text: '을', pos: 'Josa', offset: 6, length: 1, isUnknown: false },
            { text: '받은', pos: 'Verb', offset: 8, length: 2, isUnknown: false },
            { text: '루루', pos: 'Noun', offset: 11, length: 2, isUnknown: false }
          ]))
      ]));
    });

    test('stemming', () => {
      const text = '게으른 아침이 밝았구나';
      return OpenKoreanTextProcessor.tokenize(text)
        .then((tokens) => OpenKoreanTextProcessor.stem(tokens))
        .then((stemmed) => OpenKoreanTextProcessor.tokensToJsonArray(stemmed))
        .then((tokens) => expect(tokens).to.eql([
          { text: '게으르다', pos: 'Adjective', offset: 0, length: 3, isUnknown: false },
          { text: '아침', pos: 'Noun', offset: 4, length: 2, isUnknown: false },
          { text: '이', pos: 'Josa', offset: 6, length: 1, isUnknown: false },
          { text: '밝다', pos: 'Verb', offset: 8, length: 4, isUnknown: false }
        ]));
    });


    test('add to dictionary', () => {
      const text = '우햐나어가녀아뎌';
      return OpenKoreanTextProcessor.tokenize(text)
        .then((tokens) => OpenKoreanTextProcessor.tokensToJsonArray(tokens, false))
        .then((result) => expect(result).to.eql([
          { text: '우햐나어가녀아뎌', pos: 'Noun', offset: 0, length: 8, isUnknown: true }
        ]))
        .then((result) => OpenKoreanTextProcessor.addNounsToDictionary('우햐나', '어가녀', '아뎌'))
        .then((result) => OpenKoreanTextProcessor.tokenize(text))
        .then((tokens) => expect(tokens.toJSON()).to.eql([
          { text: '우햐나', pos: 'Noun', offset: 0, length: 3, isUnknown: false },
          { text: '어가녀', pos: 'Noun', offset: 3, length: 3, isUnknown: false },
          { text: '아뎌', pos: 'Noun', offset: 6, length: 2, isUnknown: false }
        ]));
    });

    test('phrase extractor', () => {
      const text = '아름다운 트위터를 만들어 보자. 시발 #욕하지_말자';
      return OpenKoreanTextProcessor.tokenize(text).then((tokens) => Promise.all([
        OpenKoreanTextProcessor.extractPhrases(tokens, { filterSpam: true, includeHashtag: true }).then((phrases) =>
          expect(phrases).to.eql([
            { text: '아름다운 트위터', pos: 'Noun', offset: 0, length: 8 },
            { text: '트위터', pos: 'Noun', offset: 5, length: 3 },
            { text: '#욕하지_말자', pos: 'Hashtag', offset: 21, length: 7 }
          ])),
        OpenKoreanTextProcessor.extractPhrases(tokens, { filterSpam: true, includeHashtag: false }).then((phrases) =>
          expect(phrases).to.eql([
            { text: '아름다운 트위터', pos: 'Noun', offset: 0, length: 8 },
            { text: '트위터', pos: 'Noun', offset: 5, length: 3 },
          ])),
        OpenKoreanTextProcessor.extractPhrases(tokens, { filterSpam: false, includeHashtag: true }).then((phrases) =>
          expect(phrases).to.eql([
            { text: '아름다운 트위터', pos: 'Noun', offset: 0, length: 8 },
            { text: '시발', pos: 'Noun', offset: 18, length: 2 },
            { text: '트위터', pos: 'Noun', offset: 5, length: 3 },
            { text: '#욕하지_말자', pos: 'Hashtag', offset: 21, length: 7 }
          ])),
        OpenKoreanTextProcessor.extractPhrases(tokens, { filterSpam: false, includeHashtag: false }).then((phrases) =>
          expect(phrases).to.eql([
            { text: '아름다운 트위터', pos: 'Noun', offset: 0, length: 8 },
            { text: '시발', pos: 'Noun', offset: 18, length: 2 },
            { text: '트위터', pos: 'Noun', offset: 5, length: 3 }
          ]))
      ]));
    });


    test('phrase extractor 2', () => {
      const text = '시발 토토가의 인기폭발을 보니 미국에서 뉴키즈온더블럭 백스트릿보이스 조인트 컨서트';
      return OpenKoreanTextProcessor.tokenize(text)
        .then((tokens) => OpenKoreanTextProcessor.extractPhrases(tokens))
        .then((phrases) => expect(phrases).to.eql([
          { text: '토토가', pos: 'Noun', offset: 3, length: 3 },
          { text: '토토가의 인기폭발', pos: 'Noun', offset: 3, length: 9 },
          { text: '인기폭발', pos: 'Noun', offset: 8, length: 4 },
          { text: '미국', pos: 'Noun', offset: 17, length: 2 },
          { text: '뉴키즈온더블럭', pos: 'Noun', offset: 22, length: 7 },
          { text: '뉴키즈온더블럭 백스트릿보이스', pos: 'Noun', offset: 22, length: 15 },
          { text: '뉴키즈온더블럭 백스트릿보이스 조인트', pos: 'Noun', offset: 22, length: 19 },
          { text: '백스트릿보이스 조인트', pos: 'Noun', offset: 30, length: 11 },
          { text: '뉴키즈온더블럭 백스트릿보이스 조인트 컨서트', pos: 'Noun', offset: 22, length: 23 },
          { text: '백스트릿보이스 조인트 컨서트', pos: 'Noun', offset: 30, length: 15 },
          { text: '조인트 컨서트', pos: 'Noun', offset: 38, length: 7 },
          { text: '인기', pos: 'Noun', offset: 8, length: 2 },
          { text: '폭발', pos: 'Noun', offset: 10, length: 2 },
          { text: '스트릿', pos: 'Noun', offset: 31, length: 3 },
          { text: '보이스', pos: 'Noun', offset: 34, length: 3 },
          { text: '조인트', pos: 'Noun', offset: 38, length: 3 },
          { text: '컨서트', pos: 'Noun', offset: 42, length: 3 }
        ]));
    });


    test('sentence splitter', () => {
      const text = '가을이다! 남자는 가을을 탄다...... 그렇지? 루루야! 버버리코트 사러 가자!!!!';
      return OpenKoreanTextProcessor.splitSentences(text).then((result) =>
        expect(result).to.eql([
          { text: '가을이다!', start: 0, end: 5 },
          { text: '남자는 가을을 탄다......', start: 6, end: 22 },
          { text: '그렇지?', start: 23, end: 27 },
          { text: '루루야!', start: 28, end: 32 },
          { text: '버버리코트 사러 가자!!!!', start: 33, end: 48 }
        ]));
    });

    test('detokenize with word', () => {
      const words = ['늘', '평온', '하게', '누워', '있', '는', '루루'];
      return OpenKoreanTextProcessor.detokenize(words).then((result) =>
        expect(result).to.eql('늘 평온하게 누워있는 루루'));
    });

    test('detokenize with token object', () => {
      return OpenKoreanTextProcessor.tokenize('늘평온하게 누워있는루루')
        .then((token) => OpenKoreanTextProcessor.detokenize(token))
        .then((result) => expect(result).to.eql('늘 평온하게 누워있는 루루'));
    });
  });
});
