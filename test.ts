import propSets from "./index";

describe("propSets", () => {
  it("creates correct number of sets", () => {
    const lengthA = 2;
    const lengthB = 3;
    const lengthC = 4;

    expect(
      propSets({
        a: [...Array(lengthA)],
        b: [...Array(lengthB)],
        c: [...Array(lengthC)]
      })
    ).toHaveLength(lengthA * lengthB * lengthC);
  });

  it("maps value back to correct property", () => {
    const a = [0, 1, 2];
    const b = ["a", "b", "c"];
    const c = [true, false];

    propSets({ a, b, c }).forEach(propSet => {
      expect(a).toContain(propSet.a);
      expect(b).toContain(propSet.b);
      expect(c).toContain(propSet.c);
    });
  });

  it("generates propSets that are all different", () => {
    const a = [0, 1, 2];
    const b = ["a", "b", "c"];
    const c = [true, false];

    propSets({ a, b, c }).forEach((propSet, index, arr) => {
      arr.forEach((comparedPropSet, comparedIndex) => {
        if (index !== comparedIndex) {
          expect(propSet).not.toEqual(comparedPropSet);
        }
      });
    });
  });

  it("doesn't return a prop if the given array is empty", () => {
    const b = ["a", "b", "c"];
    const c = [true, false];
    propSets({ a: [], b, c }).forEach(propSet => {
      expect(propSet).not.toHaveProperty("a");
    });
  });
});
