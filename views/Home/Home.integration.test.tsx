import { fireEvent, render, screen, userEvent, within } from "@app/utils/test";

import { Home } from "./Home";

describe("Home", () => {
  it("should render all elements with default state", async () => {
    render(<Home />);

    // default intro text in sidebar
    expect(
      screen.getByText(
        "You can find 1 question already added for you. Feel free to add more questions!"
      )
    ).toBeVisible();

    // default 1st helper question
    expect(screen.getByText("How to add a question?")).toBeVisible();

    //  Action buttons
    expect(screen.getByText("Add Question")).toBeVisible();
    expect(screen.getByText("Remove Questions")).toBeVisible();
    const sortQuestionsButton = screen.getByText("Sort Questions");
    expect(sortQuestionsButton).toBeVisible();
    expect(sortQuestionsButton).toBeDisabled();
  });

  test("user should be able to add new question", async () => {
    render(<Home />);

    const addQuestionButton = screen.getByRole("button", {
      name: "Add Question",
    });
    expect(addQuestionButton).toBeVisible();
    fireEvent.click(addQuestionButton);

    const addQuestionForm = (() =>
      screen.queryByRole("form", {
        name: "addQuestionForm",
      }))();

    if (addQuestionForm) {
      expect(addQuestionForm).toBeVisible();

      await userEvent.type(
        within(addQuestionForm).getByLabelText("Question"),
        "my question?"
      );

      await userEvent.type(
        within(addQuestionForm).getByLabelText("Answer"),
        "my answer!"
      );

      await userEvent.click(within(addQuestionForm).getByText("Save"));
    }

    expect(addQuestionForm).not.toBeVisible();

    expect(
      screen.getByText(
        "You have total 2 questions. Feel free to add more questions!"
      )
    ).toBeVisible();
  });

  test("user should be able to edit question", async () => {
    render(<Home />);

    const editQuestionTextButton = screen.getByRole("button", { name: "Edit" });
    expect(editQuestionTextButton).toBeVisible();
    fireEvent.click(editQuestionTextButton);

    const editQuestionForm = (() =>
      screen.queryByRole("form", {
        name: "editQuestionForm",
      }))();

    if (editQuestionForm) {
      expect(editQuestionForm).toBeVisible();

      const questionInput = within(editQuestionForm).getByLabelText("Question");
      await userEvent.clear(questionInput);
      await userEvent.type(questionInput, "my question?");

      await userEvent.click(within(editQuestionForm).getByText("Save"));
    }

    expect(editQuestionForm).not.toBeVisible();

    expect(screen.getByText("my question?")).toBeVisible();
  });

  test("user should be able to delete all questions", async () => {
    render(<Home />);

    const deleteAllQuestionsButton = screen.getByRole("button", {
      name: "Remove Questions",
    });
    expect(deleteAllQuestionsButton).toBeVisible();
    fireEvent.click(deleteAllQuestionsButton);

    expect(screen.getByText("No questions :(")).toBeVisible();
  });
});
