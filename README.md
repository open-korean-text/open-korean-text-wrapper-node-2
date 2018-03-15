# open-korean-text-node

[![npm version](https://badge.fury.io/js/open-korean-text-node.svg)](https://badge.fury.io/js/open-korean-text-node)
[![Build Status](https://travis-ci.org/open-korean-text/open-korean-text-wrapper-node-2.svg)](https://travis-ci.org/open-korean-text/open-korean-text-wrapper-node-2)

A nodejs binding for [open-korean-text](https://github.com/open-korean-text/open-korean-text) via [node-java](https://github.com/joeferner/node-java) interface.

## Dependency

Currently wraps [open-korean-text 2.2.0](https://github.com/open-korean-text/open-korean-text/releases/tag/open-korean-text-2.2.0)

현재 이 프로젝트는 [open-korean-text 2.2.0](https://github.com/open-korean-text/open-korean-text/releases/tag/open-korean-text-2.2.0)을 사용중입니다.


## Requirement

Since it uses java code compiled with Java 8, make sure you have both Java 8 JDK and JRE installed.  
For more details about installing java interface, see installation notes on below links.

이 프로젝트는 Java 8로 컴파일된 코드를 사용하기 때문에, Java 8 JDK/JRE가 설치되어 있어야 합니다.  
Java interface의 설치에 관련된 더 자세한 사항은 아래 링크에서 확인하세요.

- [node-gyp#installation](https://github.com/nodejs/node-gyp#installation)
- [node-java#installation](https://github.com/joeferner/node-java#installation)

## Installation

```bash
npm install --save open-korean-text-node
```

### Usage

```typescript
import OpenKoreanText from 'open-korean-text-node';
// or
const OpenKoreanText = require('open-korean-text-node').default;
```

- See [API](#api) section to get more informations.


## Examples

- [test/processor.spec.js](./test/processor.spec.js)
- [test/tokens.spec.js](./test/tokens.spec.js)

## API

### OpenKoreanText

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

An intermediate token object required for internal processing.  
Provides a convenience wrapper functionS to process text without using processor object

```typescript
tokens.extractPhrases(options?: ExcludePhrasesOptions): Promise<KoreanToken>;
tokens.extractPhrasesSync(options?: ExcludePhrasesOptions): KoreanToken;
tokens.detokenize(): Promise<string>;
tokens.detokenizeSync(): string;
tokens.toJSON(): KoreanToken[];
```

- NOTE: `tokens.toJSON()` method is equivalent with `OpenKoreanText.tokensToJsonArraySync(tokens, false)`

### **KoreanToken** object

A JSON output object which contains:

- `text`: string - token's text
- `stem`: string - token's stem
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
