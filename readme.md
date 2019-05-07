# `prop-sets`

`prop-sets` is a test tool to help generate every possible instance of a component in JavaScript + TypeScript.

<img src="https://user-images.githubusercontent.com/4934193/54797280-b61c3380-4c10-11e9-81ff-1b76be3cb8ea.png" width="372" />

With `prop-sets`, you don't need to outsmart your own code when writing tests. Instead of determining fragile points of failure from particular combinations of inputs, simply generate all possible combinations and assert everything.

Works with React, Vue, Jest, Mocha, etc. No dependencies.

## Benefits

Let's say you have a React component called Button with the props `disabled` and `color`, as well as a test that asserts the button is gray when `disabled` is true and `color` otherwise. Here's how to use `prop-sets` to assert the component renders the correct color:

```jsx
const Button = props => (
  <button
    disabled={props.disabled}
    style={{
      backgroundColor: props.disabled ? "gray" : props.color
    }}
  />
);

it("is gray when disabled, props.color otherwise", () => {
  propSets({
    color: ["red", "blue"],
    disabled: [true, false]
  }).forEach(props => {
    const component = <Button {...props} />;
    const color = getColor(component);

    expect(color).toBe(props.disabled ? "gray" : props.color);
  });
});
```

`prop-sets` helps you easily write tests for assertions that are based on multiple input values (in this case, `disabled` and `color`) without greatly increasing the amount of code you have to write.

Without `prop-sets`, this test will need to be expanded to three assertions:

```jsx
it("is gray when disabled", () => {
  const component = <Button disabled color="red" />;
  const color = getColor(component);

  expect(color).toBe("gray");
});

it("is red when props.color is red", () => {
  const component = <Button color="red" />;
  const color = getColor(component);

  expect(color).toBe("red");
});

it("is blue when props.color is blue", () => {
  const component = <Button color="blue" />;
  const color = getColor(component);

  expect(color).toBe("blue");
});
```

Because `backgroundColor`'s value is determined by both the `disabled` _and_ `color` prop, we need to have all three assertions to be sure the component behaves as expected. Here are some implementations of `Button` that will only pass certain tests but fail all others.

```jsx
// Passes 'is gray when disabled', fails all others
const Button = props => <button style={{ backgroundColor: "gray" }} />;

// Passes 'is red when color is red', fails all others
const Button = props => <button style={{ backgroundColor: "red" }} />;

// Passes 'is blue when color is blue', fails all others
const Button = props => <button style={{ backgroundColor: "blue" }} />;

// Passes 'is gray when disabled', 'is red when color is red', fails all others
const Button = props => (
  <button style={{ backgroundColor: props.disabled ? "gray" : "red" }} />
);
```

The amount of combinations `prop-sets` generates is the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of all the values passed in (`a.length * b.length * c.length * ...`), so as the amount of props grows, `prop-sets` reduces your test's complexity at an exponential rate.

For example, if you have a component that only behaves a certain way if all 5 of its boolean props are true, the amount of tests you would need to write to formally assert that behavior is **32**. With `prop-sets`, just **one**!:

```js
it("does something if all props are true, false otherwise", () => {
  const tf = [true, false];
  propSets({ a: tf, b: tf, c: tf, d: tf, e: tf }).forEach(props => {
    expect(/* something */).toBe(
      props.a && props.b && props.c && props.d && props.e
    );
  });
});
```

## Use

### Install

`yarn add prop-sets` or `npm install prop-sets`

### Import

```js
import propSets from "prop-sets";
```

### API

#### `propSets(object)`

#### Arguments

| Name     | Type                       | Description                                                |
| -------- | -------------------------- | ---------------------------------------------------------- |
| `object` | `{ [prop]: Array<value> }` | An object of arrays containing possible values of the prop |

#### Return

| Type                       | Description                                                        |
| -------------------------- | ------------------------------------------------------------------ |
| `Array<{ [prop]: value }>` | An array of props where every combination of prop values is unique |

#### TypeScript

`prop-sets` comes typed but works perfectly fine without TypeScript.

```ts
declare const propSets: <
  T extends Readonly<{
    [key: string]: ReadonlyArray<any>;
  }>
>(
  obj: T
) => {
  [key in keyof T]: T[key] extends (infer ElementType)[] ? ElementType : any
}[];
```

### License

[MIT](./license)
