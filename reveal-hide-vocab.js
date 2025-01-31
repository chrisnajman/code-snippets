export default function revealHideVocab() {
  const toggleRevealBtn = document.getElementById("toggle-reveal-btn")
  const wordsObscured = document.querySelectorAll(".word-obscured")
  const wordsFull = document.querySelectorAll(".word-full")

  toggleRevealBtn.addEventListener("click", () => {
    const revealBtnTxt = document.getElementById("reveal-btn-txt")
    revealBtnTxt.textContent =
      revealBtnTxt.textContent === "Reveal" ? "Hide" : "Reveal"
    styleWord(wordsObscured, "display:inline", "display:none")
    styleWord(wordsFull, "display:none", "display:inline")
  })

  function styleWord(el, styleVal_1, styleVal_2) {
    el.forEach((word) => {
      let styleAttr = word.getAttribute("style")
      styleAttr =
        styleAttr === styleVal_1
          ? word.setAttribute("style", styleVal_2)
          : word.setAttribute("style", styleVal_1)
    })
  }
}

revealHideVocab()
