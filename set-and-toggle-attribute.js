export default function setAndToggleAttribute(el, attr, attrVal_1, attrVal_2) {
  el.forEach((word) => {
    let attribute = word.getAttribute(attr)
    attribute =
      attribute === attrVal_1
        ? word.setAttribute(attr, attrVal_2)
        : word.setAttribute(attr, attrVal_1)
  })
}
