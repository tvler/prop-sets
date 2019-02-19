const propSets = obj =>
  Object.entries(obj)
    .map(([prop, values]) => values.map(value => ({ [prop]: value })))
    .reduce((sets, set) => sets.flatMap(x => set.map(y => [...x, y])), [[]])
    .map(sets => Object.assign({}, ...sets));

export default propSets;
