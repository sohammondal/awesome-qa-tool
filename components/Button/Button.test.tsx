import { render, screen, within } from "@app/utils/test";

import { Button, ButtonProps } from "./Button";

describe("Button", () => {
  it.each([
    { variant: "primary", text: "Primary", disabled: false, loading: false },
    { variant: "secondary", text: "Secondary", disabled: true, loading: true },
  ])(
    "should have text $text ",
    async ({ variant, text, disabled, loading }) => {
      render(
        <Button
          variant={variant as ButtonProps["variant"]}
          disabled={disabled}
          loading={loading}
        >
          {text}
        </Button>
      );

      const button = screen.getByRole("button");

      if (loading) {
        expect(button).not.toHaveProperty("textContent", text);
        expect(within(button).getByTestId("loader")).toBeDefined();
      } else {
        expect(button).toHaveProperty("textContent", text);
      }
      expect(button).toHaveProperty("disabled", disabled);
    }
  );
});
