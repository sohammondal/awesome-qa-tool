import { fireEvent, render, screen } from "@app/utils/test";

import { Accordion } from "./Accordion";

describe("Accordion", () => {
  it("should toggle content when clicked", async () => {
    const title = "Accordion Title";
    const content = "This is the content for Accordion";

    render(<Accordion title={title}>{content}</Accordion>);

    const header = screen.getByText(title);
    const getContent = () => screen.queryByText(content);

    expect(header).toBeVisible();

    // should be collapsed by default
    expect(getContent()).not.toBeInTheDocument();

    // click to show content
    fireEvent.click(header);

    // should expand after header is clicked
    expect(screen.getByText(content)).toBeInTheDocument();

    // click to hide content
    fireEvent.click(header);
    expect(getContent()).not.toBeInTheDocument();
  });
});
