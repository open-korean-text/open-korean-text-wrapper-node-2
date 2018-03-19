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
    return this.map((item) => {
      const token: KoreanToken = {
        text: item.text(),
        pos: item.pos().toString(),
        offset: item.offset(),
        length: item.length(),
        isUnknown: item.unknown()
      };
      if (item.stem().nonEmpty()) {
        token.stem = item.stem().get();
      }
      return token;
    });
  }

  extractPhrases(options?: ExcludePhrasesOptions) {
    return OpenKoreanTextProcessor.extractPhrases(this, options);
  }

  extractPhrasesSync(options?: ExcludePhrasesOptions) {
    return OpenKoreanTextProcessor.extractPhrasesSync(this, options);
  }

  detokenize(): Promise<string> {
    return OpenKoreanTextProcessor.detokenize(this);
  }

  detokenizeSync(): string {
    return OpenKoreanTextProcessor.detokenizeSync(this);
  }
}
