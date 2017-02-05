import { KoreanTokenObject, KoreanToken, Seq } from '../classes';
import { OpenKoreanTextProcessor, ExcludePhrasesOptions } from './processor';

export class IntermediaryTokensObject extends Seq<any> {

  // KoreanTokenObject is not required yet.
  //
  // toTokenObjectList(): KoreanTokenObject[] {
  //   return this.map(token => new KoreanTokenObject(
  //     token.text(),
  //     token.pos().toString(),
  //     token.offset(),
  //     token.length(),
  //     token.unknown !== undefined ? token.unknown() : undefined
  //   ));
  // };

  toJSON(): KoreanToken[] {
    return this.map((token) => ({
      text: token.text(),
      pos: token.pos().toString(),
      offset: token.offset(),
      length: token.length(),
      isUnknown: token.unknown !== undefined ? token.unknown() : undefined
    }));
  }

  stem(): Promise<IntermediaryTokensObject> {
    return OpenKoreanTextProcessor.stem(this);
  }

  stemSync(): IntermediaryTokensObject {
    return OpenKoreanTextProcessor.stemSync(this);
  }

  extractPhrases(options?: ExcludePhrasesOptions) {
    return OpenKoreanTextProcessor.extractPhrases(this, options)
  }

  extractPhrasesSync(options?: ExcludePhrasesOptions) {
    return OpenKoreanTextProcessor.extractPhrasesSync(this, options)
  }

  detokenize(): Promise<string> {
    return OpenKoreanTextProcessor.detokenize(this);
  }

  detokenizeSync(): string {
    return OpenKoreanTextProcessor.detokenizeSync(this);
  }
}
