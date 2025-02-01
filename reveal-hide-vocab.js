import setAndToggleAttribute from "./set-and-toggle-attribute.js"

export default function revealHideVocab() {
  const toggleRevealBtn = document.getElementById("toggle-reveal-btn")
  const wordsObscured = document.querySelectorAll(".word-obscured")
  const wordsFull = document.querySelectorAll(".word-full")

  toggleRevealBtn.addEventListener("click", () => {
    const revealBtnTxt = document.getElementById("reveal-btn-txt")
    revealBtnTxt.textContent =
      revealBtnTxt.textContent === "Reveal" ? "Hide" : "Reveal"

    setAndToggleAttribute(
      wordsObscured,
      "style",
      "display:inline",
      "display:none"
    )

    setAndToggleAttribute(wordsFull, "style", "display:none", "display:inline")
  })
}

revealHideVocab()
