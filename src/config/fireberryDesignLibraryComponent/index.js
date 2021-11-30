const { designLibraryComponent } = require("./component.tsx");
const { designLibraryTest } = require("./component.test.tsx");
const { designLibraryStyle } = require("./component.style.ts");
const { designLibraryStories } = require("./component.stories.tsx");
const { designLibraryIndex } = require("./componentIndex.ts");

module.exports = {
  component: designLibraryComponent,
  test: designLibraryTest,
  style: designLibraryStyle,
  stories: designLibraryStories,
  index: designLibraryIndex,
};
