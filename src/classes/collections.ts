import { AbstractJavaClass } from './abstract';

export class Collections<T> extends AbstractJavaClass {

  static className = 'java.util.Collections';

  map<R>(mapFunc: (item: T, index?: number) => R): R[] {
    let index = 0;
    const it = this.interface.iterator();
    const res = [];

    while (it.hasNext()) {
      res.push(mapFunc(it.next(), index++));
    }
    return res;
  }
}

/**
 * Partial wrapper for Java ArrayList
 *
 * @export
 * @class ArrayList
 * @extends {JavaObject}
 * @template T
 */
export class ArrayList<T> extends Collections<T> {

  static className = 'java.util.ArrayList';

  constructor(values?: T[]) {
    super();
    if (values && values.length) {
      this.addAllSync(values);
    }
  }

  add(item: T) {
    return this.interface.addPromise(item);
  }

  addSync(item: T) {
    return this.interface.add(item);
  }

  addAll(items: T[]) {
    return Promise.all(items.map(item => this.add(item)));
  }

  addAllSync(items: T[]) {
    items.forEach(item => this.addSync(item));
  }
}

/**
 * Wrapper class for Scala Seq
 *
 * @export
 * @class Seq
 * @extends {AbstractCollections<T>}
 * @template T
 */
export class Seq<T> extends Collections<T> {

  static className = 'scala.collection.Seq';

}
