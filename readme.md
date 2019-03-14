# `prop-sets`

`prop-sets` is a library that helps generate every possible instance of a component.

```js
propSets({
  disabled: [true, false],
  primary: [true, false],
  size: ["small", "medium", "large"]
});

// Is the same as

[
  { disabled: true, primary: true, size: "small" },
  { disabled: true, primary: true, size: "medium" },
  { disabled: true, primary: true, size: "large" },
  { disabled: true, primary: false, size: "small" }
  // ...12 unique combinations
];
```

Don’t just guess what states your code can be in. Test every variation of a component rather than just a few instances you come up with.

## Use

### Install

`yarn add prop-sets` or `npm install prop-sets`

### Import

```js
import propSets from "prop-sets";
```

### 🔬 Tests

...

### 🎨 Styleguides

Generate styleguides from a small and easy to update source-of-truth, without having to worry about any improperly-styled combination of props slipping by.
