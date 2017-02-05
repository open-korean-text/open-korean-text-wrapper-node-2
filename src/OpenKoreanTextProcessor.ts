import { AbstractJavaClass, Collections, ArrayList, Seq, KoreanToken, Sentence } from './classes';
import { IntermediaryTokensObject } from './IntermediaryTokens'

export interface ExcludePhrasesOptions {
  filterSpam?: boolean;
  includeHashtag?: boolean;
};

/**
 * Node-js Wrapper for OpenKoreanTextProcessor
 *
 * @export
 * @class OpenKoreanTextProcessor
 */
export class OpenKoreanTextProcessor extends AbstractJavaClass {

  static className = 'org.openkoreantext.processor.OpenKoreanTextProcessorJava';

  /**
   * Normalize Korean text
   * 그랰ㅋㅋㅋㅋㅋㅋ -> 그래ㅋㅋ
   *
   * @param  text Input text.
   * @return Normalized text.
   */
  static normalize(text: string): Promise<string> {
    return this.class.normalizePromise(text);
  }

  static normalizeSync(text: string): string {
    return this.class.normalize(text);
  }

  /**
   * Tokenize with the builder options.
   *
   * @param  text Input text.
   * @return A list of Korean Tokens (run tokensToJsonArray to transform to Java List)
   */
  static tokenize(text: string): Promise<IntermediaryTokensObject> {
    return this.class.tokenizePromise(text).then((tokensSeq) => IntermediaryTokensObject.wrap(tokensSeq));
  }

  static tokenizeSync(text: string): IntermediaryTokensObject {
    return IntermediaryTokensObject.wrap(this.class.tokenize(text));
  }


  /**
   * Add user-defined words to the noun dictionary. Spaced words are ignored.
   *
   * @static
   * @param   words List of user nouns
   * @returns
   */
  static addNounsToDictionary(...words: string[]): Promise<void> {
    const listObject = new ArrayList(...words);
    return this.class.addNounsToDictionaryPromise(listObject.interface);
  }

  static addNounsToDictionarySync(...words: string[]): void {
    const listObject = new ArrayList(...words);
    return this.class.addNounsToDictionary(listObject.interface);
  }

  /**
   * Tokenize with the builder options into a Javascript Object.
   *
   * @param  tokens            Korean tokens (output of tokenize(CharSequence text)).
   * @param  [keepSpace=false] Keep spaces
   * @return JSON array of token objects.
   */
  static tokensToJsonArray(tokens: IntermediaryTokensObject, keepSpace = false): Promise<KoreanToken[]> {
    return Promise.resolve(this.tokensToJsonArraySync(tokens, keepSpace));
  }

  static tokensToJsonArraySync(tokens: IntermediaryTokensObject, keepSpace = false): KoreanToken[] {
    const list = tokens.toJSON();
    return keepSpace ? list : list.filter(token => token.pos !== 'Space');
  }

  /**
   * Stem Korean Verbs and Adjectives
   *
   * @param  tokens Korean tokens (output of tokenize(CharSequence text)).
   * @return stemmed tokens
   */
  static stem(tokens: IntermediaryTokensObject): Promise<IntermediaryTokensObject> {
    return this.class.stemPromise(tokens.interface)
      .then(tokenSeq => IntermediaryTokensObject.wrap(tokenSeq));
  }

  static stemSync(tokens: IntermediaryTokensObject): IntermediaryTokensObject {
    return IntermediaryTokensObject.wrap(this.class.stem(tokens.interface));
  }

  /**
   * Split input text into sentences.
   *
   * @param text Input text.
   * @return Array of Sentence objects.
   */
  static splitSentences(text: string): Promise<Sentence[]> {
    return this.class.splitSentencesPromise(text).then(sentences =>
      Collections.wrap(sentences).map(sentence => ({
        text: sentence.text(),
        start: sentence.start(),
        end: sentence.end()
      }))
    );
  }

  static splitSentencesSync(text: string): Sentence[] {
    return Collections.wrap(this.class.splitSentences(text)).map(sentence => ({
      text: sentence.text(),
      start: sentence.start(),
      end: sentence.end()
    }));
  }

  /**
   * Extract phrases from Korean input text
   *
   * @param tokens Korean tokens (output of tokenize(CharSequence text)).
   * @param [options.filterSpam = true]
   * @param [optons.includeHashtags = false]
   * @return Array of phrase CharSequences.
   */
  static extractPhrases(
    tokens: IntermediaryTokensObject,
    options?: ExcludePhrasesOptions): Promise<KoreanToken> {

    options = { filterSpam: true, includeHashtag: false, ...options };
    return this.class.extractPhrasesPromise(tokens.interface, options.filterSpam, options.includeHashtag).then(phrasesSeq =>
      Collections.wrap(phrasesSeq).map(phrase => ({
        text: phrase.text(),
        pos: phrase.pos().toString(),
        offset: phrase.offset(),
        length: phrase.length()
      }))
    );
  }

  static extractPhrasesSync(
    tokens: IntermediaryTokensObject,
    options?: ExcludePhrasesOptions): KoreanToken {

    options = { filterSpam: true, includeHashtag: false, ...options };
    const phrasesSeq = Collections.wrap(this.class.extractPhrases(tokens.interface, options.filterSpam, options.includeHashtag));
    return phrasesSeq.map(phrase => ({
      text: phrase.text(),
      pos: phrase.pos().toString(),
      offset: phrase.offset(),
      length: phrase.length()
    }));
  }

  /**
   * Detokenize the input list of words.
   *
   * @param words List of words.
   * @return String Detokenized string.
   */
  static detokenize(tokens: IntermediaryTokensObject): Promise<string>;
  static detokenize(words: string[]): Promise<string>;
  static detokenize(...words: string[]): Promise<string>;
  static detokenize(...args: any[]): Promise<string> {
    let words: string[];
    if (args[0] instanceof IntermediaryTokensObject) {
      words = args[0].toJSON().filter(token => token.pos !== 'Space').map(token => token.text);
    } else if (Array.isArray(args[0])) {
      words = args[0];
    } else {
      words = args;
    }
    const list = new ArrayList(...words);
    return this.class.detokenizePromise(list.interface)
      .then(detokenized => detokenized.toString());
  }

  static detokenizeSync(tokens: IntermediaryTokensObject): string;
  static detokenizeSync(words: string[]): string;
  static detokenizeSync(...words: string[]): string;
  static detokenizeSync(...args: any[]): string {
    let words: string[];
    if (args[0] instanceof IntermediaryTokensObject) {
      words = args[0].toJSON().filter(token => token.pos !== 'Space').map(token => token.text);
    } else if (Array.isArray(args[0])) {
      words = args[0];
    } else {
      words = args;
    }
    const list = new ArrayList(...words);
    const detokenized = this.class.detokenize(list.interface);
    return detokenized.toString();
  }
}
