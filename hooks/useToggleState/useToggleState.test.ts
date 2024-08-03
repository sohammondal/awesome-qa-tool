import { renderHook, act } from "@app/utils/test";

import { useToggleState } from "./useToggleState";

describe("useToggleState", () => {
  it("should toggle state", () => {
    const { result } = renderHook(useToggleState);

    // default state
    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggle();
    });

    // updated state
    expect(result.current.isOpen).toBe(true);
  });
});
