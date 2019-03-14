type ArrayElementType<Arr> = Arr extends (infer ElementType)[]
  ? ElementType
  : any;

const propSets = <T extends { [key: string]: Array<any> }>(
  obj: T
): Array<{ [key in keyof T]: ArrayElementType<T[key]> }> =>
  Object.entries(obj)
    .filter(([_, values]) => values.length)
    .map(([prop, values]) => values.map(value => ({ [prop]: value })))
    .reduce<Array<Array<{ [key: string]: any }>>>(
      (sets, set) =>
        sets.flatMap<Array<{ [key: string]: any }>>(x =>
          set.map(y => [...x, y])
        ),
      [[]]
    )
    .map(sets => Object.assign({}, ...sets));

export default propSets;
