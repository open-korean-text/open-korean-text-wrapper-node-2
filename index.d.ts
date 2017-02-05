declare module "JavaObject" {
    export abstract class JavaObject {
        protected static className: string;
        protected static readonly class: any;
        constructor(...args: any[]);
        private __interface;
        readonly interface: any;
    }
}
declare module "ArrayList" {
    import { JavaObject } from "JavaObject";
    export class ArrayList<T> extends JavaObject {
        static className: string;
        constructor(...values: T[]);
        add(...items: T[]): void;
        addSync(...items: T[]): void;
    }
}
declare module "KoreanToken" {
    import { JavaObject } from "JavaObject";
    export class KoreanToken extends JavaObject {
        text: string;
        pos: KoreanPos.Keys;
        offset: number;
        length: number;
        isUnknown: boolean;
        static className: string;
        constructor(text: string, pos: KoreanPos.Keys, offset: number, length: number, isUnknown?: boolean);
    }
    export namespace KoreanPos {
        type Keys = "Noun" | "Verb" | "Adjective" | "Adverb" | "Determiner" | "Exclamation" | "Josa" | "Eomi" | "PreEomi" | "Conjunction" | "NounPrefix" | "VerbPrefix" | "Suffix" | "Unknown" | "Korean" | "Foreign" | "Number" | "KoreanParticle" | "Alpha" | "Punctuation" | "Hashtag" | "ScreenName" | "Email" | "URL" | "CashTag" | "Space" | "Others" | "ProperNoun";
    }
    export class KoreanPos extends JavaObject {
        static className: string;
        static valueOf(name: KoreanPos.Keys): any;
        static readonly Noun: KoreanPos;
        static readonly Verb: KoreanPos;
        static readonly Adjective: KoreanPos;
        static readonly Adverb: KoreanPos;
        static readonly Determiner: KoreanPos;
        static readonly Exclamation: KoreanPos;
        static readonly Josa: KoreanPos;
        static readonly Eomi: KoreanPos;
        static readonly PreEomi: KoreanPos;
        static readonly Conjunction: KoreanPos;
        static readonly NounPrefix: KoreanPos;
        static readonly VerbPrefix: KoreanPos;
        static readonly Suffix: KoreanPos;
        static readonly Unknown: KoreanPos;
        static readonly Korean: KoreanPos;
        static readonly Foreign: KoreanPos;
        static readonly Number: KoreanPos;
        static readonly KoreanParticle: KoreanPos;
        static readonly Alpha: KoreanPos;
        static readonly Punctuation: KoreanPos;
        static readonly Hashtag: KoreanPos;
        static readonly ScreenName: KoreanPos;
        static readonly Email: KoreanPos;
        static readonly URL: KoreanPos;
        static readonly CashTag: KoreanPos;
        static readonly Space: KoreanPos;
        static readonly Others: KoreanPos;
        static readonly ProperNoun: KoreanPos;
    }
}
declare module "OpenKoreanTextProcessor" {
    import { JavaObject } from "JavaObject";
    export class OpenKoreanTextProcessor extends JavaObject {
        static className: string;
        static normalize(text: string): string;
        static normalizeSync(text: string): string;
        static tokenize(text: any): any;
        static tokenizeSync(text: any): any;
        static addNounsToDictionary(...words: any[]): Promise<any>;
        static addNounsToDictionarySync(...words: any[]): any;
        static tokensToJsonArray(tokens: any, keepSpace?: boolean): Promise<any[]>;
        static tokensToJsonArraySync(tokens: any, keepSpace?: boolean): any[];
        static stem(tokens: any): Promise<any>;
        static stemSync(tokens: any): any;
        static splitSentences(text: any): Promise<any[]>;
        static splitSentencesSync(text: any): any[];
        static extractPhrases(tokens: any, filterSpam?: boolean, includeHashtags?: boolean): Promise<any[]>;
        static extractPhrasesSync(tokens: any, filterSpam?: boolean, includeHashtags?: boolean): any[];
        static detokenize(...words: any[]): Promise<any>;
        static detokenizeSync(...words: any[]): any;
    }
}
declare module "index" {
    export { JavaObject } from "JavaObject";
    export { KoreanToken } from "KoreanToken";
    export { ArrayList } from "ArrayList";
    export { OpenKoreanTextProcessor, OpenKoreanTextProcessor as default } from "OpenKoreanTextProcessor";
}
import OpenKoreanTextProcessor from './lib'

export * from './lib';
export = OpenKoreanTextProcessor;
