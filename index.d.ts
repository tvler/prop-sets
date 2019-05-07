declare type ArrayElementType<Arr> = Arr extends (infer ElementType)[] ? ElementType : any;
/**
 * Returns every possible instance of an object from a given set of prop values
 *
 * @param obj - An object of arrays containing possible values of the prop
 * @returns An array of objects where every combination of prop values is unique
 */
declare const propSets: <T extends Readonly<{
    [key: string]: ReadonlyArray<any>;
}>>(obj: T) => { [key in keyof T]: ArrayElementType<T[key]>; }[];
export default propSets;
