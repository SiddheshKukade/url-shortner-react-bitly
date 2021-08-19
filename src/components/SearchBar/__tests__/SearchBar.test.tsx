import {
  cleanup,
  fireEvent,
  getByPlaceholderText,
  render,
  screen,
} from "@testing-library/react";
import SearchBar from "../SearchBar";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("SearchBar Tests Tests Entirely Home page", () => {
  describe("Input Element", () => {
    it("Should render the Input and Input is in Focus and does have a proper CSS Class", () => {
      render(<SearchBar />);
      const inputElement = screen.getByPlaceholderText("Shorten your URL");
      let shortenButton = screen.getByTestId("shortenButton");
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveFocus();
      expect(inputElement).toHaveClass("url-input");
      expect(inputElement).toBeInTheDocument();
    });
    it("Should Contain the URL that is typed on the Input", () => {
      render(<SearchBar />);
      const inputElement = screen.getByPlaceholderText("Shorten your URL");
      let shortenButton = screen.getByTestId("shortenButton");
      expect(inputElement.value).toBe("");
      fireEvent.change(inputElement, {
        target: {
          value:
            "https://testing-library.com/docs/react-testing-library/cheatsheet/",
        },
      });
      expect(inputElement.value).toBe(
        "https://testing-library.com/docs/react-testing-library/cheatsheet/"
      );
    });

    it("Should render the input value if changed", () => {
      render(<SearchBar />);
      const inputElement = screen.getByPlaceholderText("Shorten your URL");
      let shortenButton = screen.getByTestId("shortenButton");
      expect(inputElement.value).toBe("");
      fireEvent.change(inputElement, {
        target: {
          value: "https://testing-library.com/docs",
        },
      });
      expect(inputElement.value).toBe("https://testing-library.com/docs");
    });
  });
  describe("Shorten Button", () => {
    it("Should render the Shorten Button and have proper CSS Class", () => {
      render(<SearchBar />);
      const inputElement = screen.getByPlaceholderText("Shorten your URL");
      let shortenButton = screen.getByTestId("shortenButton");
      expect(shortenButton).toHaveClass("submit-button");
    });
  });
  describe("Url Shortening feature check", () => {
    afterEach(cleanup);
    it("Link shortens Correctly", async () => {
      render(<SearchBar />);
      const inputElement = screen.getByPlaceholderText("Shorten your URL");
      let shortenButton = screen.getByTestId("shortenButton");

      expect(inputElement).toBeInTheDocument();
      expect(shortenButton).toBeInTheDocument();

      fireEvent.change(inputElement, {
        target: {
          value:
            "https://testing-library.com/docs/react-testing-library/cheatsheet/",
        },
      });
      expect(inputElement.value).toBe(
        "https://testing-library.com/docs/react-testing-library/cheatsheet/"
      );
      fireEvent.click(shortenButton);
      await sleep(3000);
      expect(inputElement.value).toBe("https://bit.ly/3D1i8kD");
      expect(shortenButton.textContent).toBe("  Copy");
    }, 10000);
  });
});
export {};
