import { AbstractJavaClass } from './abstract';

export interface KoreanToken {
  text?: string;
  pos?: KoreanPos;
  offset?: number;
  length?: number;
  isUnknown?: boolean;
}

export class KoreanTokenObject extends AbstractJavaClass implements KoreanToken {

  static className = 'org.openkoreantext.processor.KoreanTokenJava';

  constructor(
    public text: string,
    public pos: KoreanPos,
    public offset: number,
    public length: number,
    public isUnknown?: boolean) {

    super(text, KoreanPosObject.valueOf(pos), offset, length, !!isUnknown);
  }

  toJSON() {
    return {
      text: this.text,
      pos: this.pos,
      offset: this.offset,
      length: this.length,
      isUnknown: this.isUnknown
    }
  }
}

export type KoreanPos = "Noun" | "Verb" | "Adjective" | "Adverb" | "Determiner" | "Exclamation"
  | "Josa" | "Eomi" | "PreEomi" | "Conjunction" | "NounPrefix" | "VerbPrefix" | "Suffix"
  | "Unknown"
  | "Korean" | "Foreign" | "Number" | "KoreanParticle" | "Alpha" | "Punctuation" | "Hashtag"
  | "ScreenName" | "Email" | "URL" | "CashTag"
  | "Space" | "Others" | "ProperNoun";

export class KoreanPosObject extends AbstractJavaClass {

  static className = 'org.openkoreantext.processor.KoreanPosJava';

  static valueOf(name: KoreanPos) {
    return this.class.valueOf(name);
  }

  static get Noun(): KoreanPosObject { return this.class.Noun }
  static get Verb(): KoreanPosObject { return this.class.Verb; }
  static get Adjective(): KoreanPosObject { return this.class.Adjective; }
  static get Adverb(): KoreanPosObject { return this.class.Adverb; }
  static get Determiner(): KoreanPosObject { return this.class.Determiner; }
  static get Exclamation(): KoreanPosObject { return this.class.Exclamation; }
  static get Josa(): KoreanPosObject { return this.class.Josa; }
  static get Eomi(): KoreanPosObject { return this.class.Eomi; }
  static get PreEomi(): KoreanPosObject { return this.class.PreEomi; }
  static get Conjunction(): KoreanPosObject { return this.class.Conjunction; }
  static get NounPrefix(): KoreanPosObject { return this.class.NounPrefix; }
  static get VerbPrefix(): KoreanPosObject { return this.class.VerbPrefix; }
  static get Suffix(): KoreanPosObject { return this.class.Suffix; }
  static get Unknown(): KoreanPosObject { return this.class.Unknown; }

  static get Korean(): KoreanPosObject { return this.class.Korean; }
  static get Foreign(): KoreanPosObject { return this.class.Foreign; }
  static get Number(): KoreanPosObject { return this.class.Number; }
  static get KoreanParticle(): KoreanPosObject { return this.class.KoreanParticle; }
  static get Alpha(): KoreanPosObject { return this.class.Alpha; }
  static get Punctuation(): KoreanPosObject { return this.class.Punctuation; }
  static get Hashtag(): KoreanPosObject { return this.class.Hashtag; }
  static get ScreenName(): KoreanPosObject { return this.class.ScreenName; }
  static get Email(): KoreanPosObject { return this.class.Email; }
  static get URL(): KoreanPosObject { return this.class.URL; }
  static get CashTag(): KoreanPosObject { return this.class.CashTag; }

  static get Space(): KoreanPosObject { return this.class.Space; }
  static get Others(): KoreanPosObject { return this.class.Others; }
  static get ProperNoun(): KoreanPosObject { return this.class.ProperNoun; }
}

export interface Sentence {
  text?: string;
  start?: number;
  end?: number;
}
