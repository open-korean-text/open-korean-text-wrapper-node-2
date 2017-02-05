import { AbstractJavaClass } from './AbstractJavaClass';

export interface KoreanToken {
  text?: string;
  pos?: KoreanPos.Types;
  offset?: number;
  length?: number;
  isUnknown?: boolean;
}

export class KoreanTokenObject extends AbstractJavaClass implements KoreanToken {

  static className = 'org.openkoreantext.processor.KoreanTokenJava';

  constructor(
    public text: string,
    public pos: KoreanPos.Types,
    public offset: number,
    public length: number,
    public isUnknown: boolean = false) {

    super(text, KoreanPos.valueOf(pos), offset, length, isUnknown);
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

export namespace KoreanPos {
  export type Types = "Noun" | "Verb" | "Adjective" | "Adverb" | "Determiner" | "Exclamation"
    | "Josa" | "Eomi" | "PreEomi" | "Conjunction" | "NounPrefix" | "VerbPrefix" | "Suffix"
    | "Unknown"
    // Chunk level POS
    | "Korean" | "Foreign" | "Number" | "KoreanParticle" | "Alpha" | "Punctuation" | "Hashtag"
    | "ScreenName" | "Email" | "URL" | "CashTag"
    // Functional POS
    | "Space" | "Others" | "ProperNoun";
}

export class KoreanPos extends AbstractJavaClass {

  static className = 'org.openkoreantext.processor.KoreanPosJava';

  static valueOf(name: KoreanPos.Types) {
    return this.class.valueOf(name);
  }

  static get Noun(): KoreanPos { return this.class.Noun }
  static get Verb(): KoreanPos { return this.class.Verb; }
  static get Adjective(): KoreanPos { return this.class.Adjective; }
  static get Adverb(): KoreanPos { return this.class.Adverb; }
  static get Determiner(): KoreanPos { return this.class.Determiner; }
  static get Exclamation(): KoreanPos { return this.class.Exclamation; }
  static get Josa(): KoreanPos { return this.class.Josa; }
  static get Eomi(): KoreanPos { return this.class.Eomi; }
  static get PreEomi(): KoreanPos { return this.class.PreEomi; }
  static get Conjunction(): KoreanPos { return this.class.Conjunction; }
  static get NounPrefix(): KoreanPos { return this.class.NounPrefix; }
  static get VerbPrefix(): KoreanPos { return this.class.VerbPrefix; }
  static get Suffix(): KoreanPos { return this.class.Suffix; }
  static get Unknown(): KoreanPos { return this.class.Unknown; }

  static get Korean(): KoreanPos { return this.class.Korean; }
  static get Foreign(): KoreanPos { return this.class.Foreign; }
  static get Number(): KoreanPos { return this.class.Number; }
  static get KoreanParticle(): KoreanPos { return this.class.KoreanParticle; }
  static get Alpha(): KoreanPos { return this.class.Alpha; }
  static get Punctuation(): KoreanPos { return this.class.Punctuation; }
  static get Hashtag(): KoreanPos { return this.class.Hashtag; }
  static get ScreenName(): KoreanPos { return this.class.ScreenName; }
  static get Email(): KoreanPos { return this.class.Email; }
  static get URL(): KoreanPos { return this.class.URL; }
  static get CashTag(): KoreanPos { return this.class.CashTag; }

  static get Space(): KoreanPos { return this.class.Space; }
  static get Others(): KoreanPos { return this.class.Others; }
  static get ProperNoun(): KoreanPos { return this.class.ProperNoun; }
}

export interface Sentence {
  text?: string;
  start?: number;
  end?: number;
}
