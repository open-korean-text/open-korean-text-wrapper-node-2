# node-twitter-korean-text

[![npm version](https://badge.fury.io/js/node-twitter-korean-text.svg)](https://www.npmjs.com/package/node-twitter-korean-text)
[![Build Status](https://travis-ci.org/rokoroku/node-twitter-korean-text.svg?branch=travis-ci)](https://travis-ci.org/rokoroku/node-twitter-korean-text)

Nodejs wrapper of [open-korean-text](https://github.com/open-korean-text/open-korean-text) via [node-java](https://github.com/joeferner/node-java) interface.

## Dependency

Currently wraps [open-korean-text 1.1](https://github.com/open-korean-text/open-korean-text/releases/tag/open-korean-text-1.1)

현재 이 프로젝트는 [open-korean-text 1.1](https://github.com/open-korean-text/open-korean-text/releases/tag/open-korean-text-1.1)을 사용중입니다.


## Requirement

Since it uses java code compiled with Java 8, make sure you have both Java 8 JDK and JRE installed.  
For more details about installing java interface, see installation notes on [node-java](https://github.com/joeferner/node-java#installation).

이 프로젝트는 Java 8로 컴파일된 코드를 사용하기 때문에, Java 8 JDK/JRE가 설치되어 있어야 합니다.  
Java interface의 설치에 관련된 더 자세한 사항은 [이곳](https://github.com/joeferner/node-java#installation) 에서 확인하세요.

## Installation

```bash
npm install --save open-korean-text-node
```

## Examples

See [test/processor.spec.js](./test/processor.spec.js)

## API

### OpenKoreanText

#### Importing

```typescript
import OpenKoreanText from 'open-korean-text-node';
// or
const OpenKoreanText = require('open-korean-text-node');
```

#### Tokenizing

```typescript
OpenKoreanText.tokenize(text: string): Promise<IntermediaryTokens>;
OpenKoreanText.tokenizeSync(text: string): IntermediaryTokens;
```

- `text` a target string to tokenize

#### Detokenizing

```typescript
OpenKoreanText.detokenize(tokens: IntermediaryTokensObject): Promise<string>;
OpenKoreanText.detokenize(words: string[]): Promise<string>;
OpenKoreanText.detokenize(...words: string[]): Promise<string>;
OpenKoreanText.detokenizeSync(tokens: IntermediaryTokensObject): string;
OpenKoreanText.detokenizeSync(words: string[]): string;
OpenKoreanText.detokenizeSync(...words: string[]): string;
```

- `tokens` an intermediary token object from `tokenize`
- `words` an array of words to detokenize

#### Stemming

```typescript
OpenKoreanText.stem(tokens: IntermediaryTokens): Promise<IntermediaryTokens>;
OpenKoreanText.stemSync(tokens: IntermediaryTokens): IntermediaryTokens;
```

- `tokens` an intermediary token object from `tokenize` or `stem`

#### Phrase Extracting

```typescript
OpenKoreanText.extractPhrases(tokens: IntermediaryTokens, options?: ExcludePhrasesOptions): Promise<KoreanToken>;
OpenKoreanText.extractPhrasesSync(tokens: IntermediaryTokens, options?: ExcludePhrasesOptions): KoreanToken;
```

- `tokens` an intermediary token object from `tokenize` or `stem`
- `options` an object to pass options to extract phrases where
  - `filterSpam` - a flag to filter spam tokens. defaults to `true`
  - `includeHashtag` - a flag to include hashtag tokens. defaults to `false`

#### Normalizing

```typescript
OpenKoreanText.normalize(text: string): Promise<string>;
OpenKoreanText.normalizeSync(text: string): string;
```

- `text` a target string to normalize

#### Sentence Splitting

```typescript
OpenKoreanText.splitSentences(text: string): Promise<Sentence[]>;
OpenKoreanText.splitSentencesSync(text: string): Sentence[];
```

- `text` a target string to normalize
* returns array of `Sentence` which includes:
  * `text`: string - the sentence's text
  * `start`: number - the sentence's start position from original string
  * `end`: number - the sentence's end position from original string

#### Custom Dictionary

```typescript
OpenKoreanText.addNounsToDictionary(...words: string[]): Promise<void>;
OpenKoreanText.addNounsToDictionarySync(...words: string[]): void;
```

- `words` words to add to dictionary

#### toJSON

```typescript
OpenKoreanText.tokensToJsonArray(tokens: IntermediaryTokensObject, keepSpace?: boolean): Promise<KoreanToken[]>;
OpenKoreanText.tokensToJsonArraySync(tokens: IntermediaryTokensObject, keepSpace?: boolean): KoreanToken[];
```

- `tokens` an intermediary token object from `tokenize` or `stem`
- `keepSpace` a flag to omit 'Space' token or not, defaults to `false`

### **IntermediaryToken** object

- A intermediary token object that can be processed more
- Provides a convenience wrapper function to process text without using `OpenKoreanText.process(...)`

```typescript
tokens.stem(): Promise<IntermediaryTokensObject>;
tokens.stemSync(): IntermediaryTokensObject;
tokens.extractPhrases(options?: ExcludePhrasesOptions): Promise<KoreanToken>;
tokens.extractPhrasesSync(options?: ExcludePhrasesOptions): KoreanToken;
tokens.detokenize(): Promise<string>;
tokens.detokenizeSync(): string;
tokens.toJSON(): KoreanToken[];
```

- NOTE: `tokens.toJSON()` method is equivalent with `OpenKoreanText.tokensToJsonArraySync(tokens, false)`

### **KoreanToken** object

- `text`: string - token's text
- `pos`: stirng - type of token. possible entries are:
  - Word level POS:
    `Noun`, `Verb`, `Adjective`,
    `Adverb`, `Determiner`, `Exclamation`,
    `Josa`, `Eomi`, `PreEomi`, `Conjunction`,
    `NounPrefix`, `VerbPrefix`, `Suffix`, `Unknown`
  - Chunk level POS:
    `Korean`, `Foreign`, `Number`, `KoreanParticle`, `Alpha`,
    `Punctuation`, `Hashtag`, `ScreenName`,
    `Email`, `URL`, `CashTag`
  - Functional POS:
    `Space`, `Others`
- `offset`: number - position from original string
- `length`: number - length of text
- `isUnknown`: boolean
