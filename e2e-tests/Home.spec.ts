import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("add new Question", async ({ page }) => {
    const addQuestionButton = page.getByRole("button", {
      name: "Add Question",
    });

    expect(addQuestionButton).toBeVisible();

    await addQuestionButton.click();

    const questionTextInput = page.getByRole("textbox", { name: "Question" });
    await questionTextInput.fill("my question?");

    const questionAnswerInput = page.getByRole("textbox", { name: "Answer" });
    await questionAnswerInput.fill("my answer!");

    const submitButton = page.getByRole("button", { name: "Save" });
    await submitButton.click();

    const newQuestion = page.getByText("my question?");
    expect(newQuestion).toBeVisible();
    await newQuestion.click({ button: "left" });
    const newAnswer = page.getByText("my answer!");
    await expect(newAnswer).toBeVisible();
  });

  test("edit Question", async ({ page }) => {
    const editQuestionTextButton = page.getByRole("button", {
      name: "Edit",
    });

    expect(editQuestionTextButton).toBeVisible();

    await editQuestionTextButton.click();

    const questionTextInput = page.getByRole("textbox", { name: "Question" });
    await questionTextInput.clear();
    await questionTextInput.fill("my question?");

    const questionAnswerInput = page.getByRole("textbox", { name: "Answer" });
    await questionAnswerInput.clear();
    await questionAnswerInput.fill("my answer!");

    const submitButton = page.getByRole("button", { name: "Save" });
    await submitButton.click();

    const newQuestion = page.getByText("my question?");
    expect(newQuestion).toBeVisible();
    await newQuestion.click({ button: "left" });
    const newAnswer = page.getByText("my answer!");
    await expect(newAnswer).toBeVisible();
  });

  test("delete Question", async ({ page }) => {
    const deleteQuestionTextButton = page.getByRole("button", {
      name: "Delete",
    });

    expect(deleteQuestionTextButton).toBeVisible();

    await deleteQuestionTextButton.click();

    const newQuestion = page.getByText("my question?");
    await expect(newQuestion).not.toBeVisible();

    expect(page.getByText("No questions :(")).toBeVisible();
  });
});
