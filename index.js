const propSets = obj => Object.entries(obj).filter(([_, values]) => values.length).map(([prop, values]) => values.map(value => ({
  [prop]: value
}))).reduce((sets, set) => sets.map(x => set.map(y => [...x, y])).flat(), [[]]).map(sets => Object.assign({}, ...sets));

export default propSets;
