const COMPONENT_TYPE = {
  app: "AppPlatform",
  designSystem: "Design System",
};

const QUESTIONS = [
  { type: "input", name: "name", message: "Name:" },
  {
    type: "list",
    name: "componentType",
    message: "Component Type:",
    choices: [COMPONENT_TYPE.app, COMPONENT_TYPE.designSystem],
  },
  {
    type: "list",
    name: "typescript",
    message: "With TypeScript?:",
    choices: ["Yes", "No"],
    when: (answers) => answers.componentType !== COMPONENT_TYPE.designSystem,
  },
  {
    type: "list",
    name: "withRedux",
    message: "With redux?",
    choices: ["Yes", "No"],
    when: (answers) => answers.componentType !== COMPONENT_TYPE.designSystem,
  },
  {
    type: "list",
    name: "withTest",
    message: "With tests?",
    choices: ["Yes", "No"],
    when: (answers) => answers.componentType !== COMPONENT_TYPE.designSystem,
  },
  { type: "input", name: "path", message: "Path:" },
];

module.exports = { QUESTIONS, COMPONENT_TYPE };
