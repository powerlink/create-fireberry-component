#!/usr/bin/env node
const inquirer = require("inquirer");
const { QUESTIONS, COMPONENT_TYPE } = require("./questions");
const { writeFileSync, mkdirSync } = require("fs");
const Component = require("./config/fireberryComponent");
const DesignLibraryComponent = require("./config/fireberryDesignLibraryComponent");

const initializeComponent = async () => {
  try {
    const { name, componentType, typescript, withRedux, withTest, path } =
      await inquirer.prompt(QUESTIONS);
    const { component, style, index, stories } = getComponentTemplate({
      name,
      componentType,
      typescript,
      withRedux,
    });
    if (componentType === COMPONENT_TYPE.designSystem) {
      const { parsedTest } = getTest({
        name,
        withTest: true,
        path,
        testFile: DesignLibraryComponent.test,
      });
      createComponent({
        name,
        component,
        style,
        index,
        test: parsedTest,
        stories,
        path,
        isTypescript: true,
        componentType,
      });
    } else {
      const { parsedTest } = getTest({
        name,
        withTest,
        path,
        testFile: Component.test,
        componentType,
      });
      createComponent({
        name,
        component,
        style,
        index,
        test: parsedTest,
        path,
        isTypescript: false,
      });
    }
  } catch (ex) {
    console.log(ex);
  }
};

const getComponentTemplate = ({
  name,
  withRedux,
  componentType,
  typescript,
}) => {
  if (componentType === COMPONENT_TYPE.designSystem) {
    const parsedIndexFileContent = DesignLibraryComponent.index.replace(
      /NAME/g,
      name
    );
    const parsedStyleFileContent = DesignLibraryComponent.style.replace(
      /NAME/g,
      name
    );
    const parsedStoriesFileContent = DesignLibraryComponent.stories.replace(
      /NAME/g,
      name
    );
    const parsedComponentFileContent = DesignLibraryComponent.component.replace(
      /NAME/g,
      name
    );
    return {
      component: parsedComponentFileContent,
      stories: parsedStoriesFileContent,
      index: parsedIndexFileContent,
      style: parsedStyleFileContent,
    };
  }
  const parsedIndexFileContent = Component.index.replace(/NAME/g, name);
  const parsedStyleFileContent = Component.style.replace(/NAME/g, name);
  if (withRedux === "Yes") {
    const parsedComponentWithReduxFileContent =
      Component.componentWithRedux.replace(/NAME/g, name);
    return {
      component: parsedComponentWithReduxFileContent,
      style: parsedStyleFileContent,
      index: parsedIndexFileContent,
    };
  } else {
    const parsedComponentFileContent = Component.component.replace(
      /NAME/g,
      name
    );
    return {
      component: parsedComponentFileContent,
      style: parsedStyleFileContent,
      index: parsedIndexFileContent,
    };
  }
};

const getTest = ({ name, withTest, path, testFile, componentType }) => {
  if (withTest === "No" && componentType !== COMPONENT_TYPE.designSystem)
    return { test: undefined };
  const parsedTestFileContent = testFile
    .replace(/NAME/g, name)
    .replace(/PATH/g, path);
  return { parsedTest: parsedTestFileContent };
};

const createComponent = ({
  name,
  component,
  style,
  index,
  test,
  path,
  stories,
  isTypescript,
  componentType,
}) => {
  const componentExtension = isTypescript ? "tsx" : "js";
  const fileExtension = isTypescript ? "ts" : "js";
  mkdirSync(`src/${path}/${name}`, { recursive: true });
  writeFileSync(`src/${path}/${name}/${name}.${componentExtension}`, component);
  writeFileSync(`src/${path}/${name}/style.${fileExtension}`, style);
  writeFileSync(`src/${path}/${name}/index.${fileExtension}`, index);
  componentType === COMPONENT_TYPE.designSystem &&
    writeFileSync(
      `src/${path}/${name}/${name}.stories.${fileExtension}`,
      stories
    );
  test && mkdirSync(`src/${path}/${name}/__tests__`, { recursive: true });
  test &&
    writeFileSync(
      `src/${path}/${name}/__tests__/${name}.test.${fileExtension}`,
      test
    );
};

initializeComponent();
