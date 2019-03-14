declare type ArrayElementType<Arr> = Arr extends (infer ElementType)[] ? ElementType : any;
declare const propSets: <T extends {
    [key: string]: any[];
}>(obj: T) => { [key in keyof T]: ArrayElementType<T[key]>; }[];
export default propSets;
