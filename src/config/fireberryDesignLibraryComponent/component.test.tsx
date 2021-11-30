const designLibraryTest = `import React from "react";
import { render } from "@testing-library/react";
import NAME from "PATH/NAME";

describe("NAME", () => {
    it("Renders correctly", () => {
        render(<NAME />);
    });
});
`;

module.exports = { designLibraryTest };
