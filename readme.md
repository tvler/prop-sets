# `prop-sets`

`prop-sets` is a library that helps generate every possible instance of a component.

```js
const buttonVariations = propSets({
  color: ['red', 'blue'],
  disabled: [true, false],
});

// Creates 4 unique combinations of values

[
  { color: 'red',  disabled: true  },
  { color: 'red',  disabled: false },
  { color: 'blue', disabled: true  },
  { color: 'blue', disabled: false },
];
```

Test every variation of a component rather than just a few instances you come up with.

```jsx
const Button = props => (
  <button
    disabled={props.disabled}
    style={{ backgroundColor: props.disabled ? "gray" : props.color }}
  />
);

it("is only gray when disabled, props.color otherwise", () => {
  buttonVariations.forEach(props => {
    const root = TestRenderer.create(<Button {...props} />).root;
    const color = root.findByType("button").props.style.backgroundColor;

    expect(color).toBe(props.disabled ? "gray" : props.color);
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

##### Arguments

| Name | Type | Description |
| - | - | - |
| `object` | `{ [prop]: Array<value> }` | An object of arrays containing all possible values of the prop |

##### Return

| Name | Type | Description |
| - | - | - |
| `object` | `Array<{ [prop]: value }>` | An array of props where every combination of prop values is unique |

## Benefits

### 🔬 Tests

...

### 🎨 Styleguides

Generate styleguides from a small and easy to update source-of-truth, without having to worry about any improperly-styled combination of props slipping by.
