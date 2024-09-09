import { render, screen } from "@app/utils/test";

import { Typography, TypographyProps } from "./Typography";

describe("Typography", () => {
  it.each([
    { variant: "h1", tagName: "H1", text: "Hello h1" },
    { variant: "caption", tagName: "SPAN", text: "Hello Caption" },
    { variant: "body1", tagName: "P", text: "Hello Body" },
  ])("should render $variant with text $text", ({ variant, tagName, text }) => {
    render(
      <Typography variant={variant as TypographyProps["variant"]}>
        {text}
      </Typography>
    );

    expect(screen.getByText(text).tagName).toBe(tagName);
  });
});
