type ArrayElementType<Arr> = Arr extends (infer ElementType)[]
  ? ElementType
  : any;

const propSets = <T extends Readonly<{ [key: string]: ReadonlyArray<any> }>>(
  obj: T
): Array<{ [key in keyof T]: ArrayElementType<T[key]> }> =>
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
