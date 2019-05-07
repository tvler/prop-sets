/**
 * Returns every possible instance of an object from a given set of prop values
 *
 * @param obj - An object of arrays containing possible values of the prop
 * @returns An array of objects where every combination of prop values is unique
 */
const propSets = <T extends Readonly<{ [key: string]: ReadonlyArray<any> }>>(
  obj: T
): Array<
  { [key in keyof T]: T[key] extends (infer ElementType)[] ? ElementType : any }
> =>
  Object.entries(obj)
    .filter(([_, values]) => values.length)
    .map(([prop, values]) => values.map(value => ({ [prop]: value })))
    .reduce(
      (sets, set) =>
        ([] as typeof sets).concat(...sets.map(x => set.map(y => [...x, y]))),
      <ReadonlyArray<ReadonlyArray<Readonly<{ [key: string]: any }>>>>[[]]
    )
    .map(sets => Object.assign({}, ...sets));

export default propSets;
