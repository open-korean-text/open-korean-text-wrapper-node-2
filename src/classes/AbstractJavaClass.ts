import * as Java from 'java';


export type JavaClassInterface = any;
export type JavaObjectInterface = any;
export interface JavaClassConstructor<T> {
  new (...args: any[]): T;
}

/**
 * Base object providing Java-interface bridge
 *
 * @export
 * @abstract
 * @class JavaObject
 */
export abstract class AbstractJavaClass {

  protected static className: string;

  protected static get class(): JavaClassInterface {
    const self = this as any;
    return self._class = self._class || Java.import(this.className);
  }

  protected static wrap<T extends JavaClassInterface>(this: JavaClassConstructor<T>, javaObject: any): T {
    return new this({ javaObject });
  }

  constructor(...args: any[]) {
    const proto = this.constructor as typeof AbstractJavaClass;
    if (args[0] && args[0].javaObject) {
      // wrap existing java object
      this._interface = args[0].javaObject;
    } else {
      // create new java object
      this._interface = new proto.class(...args);
    }
  }

  private _interface;

  get interface(): JavaObjectInterface {
    return this._interface;
  }

  toString() {
    return this.interface.toString();
  }

  toJSON() {
    return this.toString();
  }
}
