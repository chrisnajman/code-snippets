# Code Snippets

---

- [CSS Variables with JavaScript: Toggle background colour](#css-variables-with-javascript-toggle-background-colour)
- [Perfectly-rounded buttons](#perfectly-rounded-buttons)
- [@media (hover: hover)](#media-hover-hover)
- [Typographical Flow](#typographical-flow)
- [Centred, Variable Max-width Container](#centred-variable-max-width-container)
- [Centre absolutely positioned ::after element](#centre-absolutely-positioned-after-element)

---

- [Set Multiple Attributes](#set-multiple-attributes)
- [Global Event Listener](#global-event-listener)
- [If, if/else statement vs Conditional (ternary) operator](#if-ifelse-statement-vs-conditional-ternary-operator)
- [Quick Fix for 'Uncaught TypeError: ITEM is undefined'](#quick-fix-for-uncaught-typeerror-item-is-undefined)

---

- [Accessible details/summary 'accordion'](#accessible-detailssummary-accordion)
- [Accessible details/summary 'accordion' group](#accessible-detailssummary-accordion-group)
- [Get Selected Option Value and Text](#get-selected-option-value-and-text)

---

- [Clear local storage](#clear-local-storage)
- [Delete Local Storage Keys](#delete-local-storage-keys)
- [Save Button Toggle Text to Local Storage](#save-button-toggle-text-to-local-storage)

---

- [React Proptypes for Image Src](#react-proptypes-for-image-src)
- [React Proptypes and Default Proptypes for an Array of Objects](#react-proptypes-and-default-proptypes-for-an-array-of-objects)
- [React Button Component with props](#react-button-component-with-props)
- [Temporarily Disable PropTypes](#temporarily-disable-proptypes)
- [React Router v6: 'end' replaces 'exact' in NavLink](#react-router-v6-end-replaces-exact-in-navlink)
- [Vite/React: Dynamic Image Paths](#vitereact-dynamic-image-paths)
- [Pass Object as `Props`](#pass-object-as-props)
- [Simple Array: Use second `index` Parameter of `.map()` Method to Supply Component's `key` Value](#simple-array-use-second-index-parameter-of-map-method-to-supply-components-key-value)
- [Get Random URL from an Array of Objects](#get-random-url-from-an-array-of-objects)

---

- [GitHub Markdown: Notes and Warnings](#github-markdown-notes-and-warnings)

---

## CSS Variables with JavaScript: Toggle background colour

Manipulate a CSS variable with JavaScript.

### 1) Add `style` attribute to `html` tag:

```HTML
<!DOCTYPE html>
<html lang="en" style>
<head>
...
</head>
<body>
    <button id="change-body-bg" type="button">Toggle background colour of page</button>
</body>
</html>
```

### 2) Set up the CSS variables:

```CSS
:root {
    --body-bg: white;
    --body-bg-alt: beige;
}
body {
    background-color: var(--body-bg);
}
```

### 3) Manipulate the CSS variables using `.style.setProperty()`:

```JavaScript
const root = document.querySelector("html")
const bodyBgVal = "--body-bg"
const bodyBgAltVal = "var(--body-bg-alt)"
const btnChangeBodyBg = document.getElementById("change-body-bg")

btnChangeBodyBg.addEventListener("click", () => {
    root.getAttribute("style") === ""
        ? root.style.setProperty(bodyBgVal, bodyBgAltVal)
        : root.style.setProperty(bodyBgVal, null)
})
```

### Output

```HTML
<!-- On first click: -->
<html lang="en" style="--body-bg: var(--body-bg-alt);">

<!-- On toggle: -->
<html lang="en" style>

<!-- Etc. -->
```

[Back to top](#code-snippets)

---

## Perfectly-rounded buttons

```HTML
<button type="button">Button</button>
```

```CSS
*,
*::after,
*::before {
    box-sizing: border-box;
}

html {
    font-size: 10px;
}

button {
    all: unset;
    background: blue;
    color: white;
    font-family: system-ui;
    font-weight: 600;
    font-size: 2rem;
    padding: 1.6rem 2.4rem;

    /**
      Perfectly rounded left and right edges:
    **/
    border-radius: 100vw;
}
```

[Back to top](#code-snippets)

---

## `@media (hover: hover)`

Targets only those devices which support `:hover` and excludes those which don't, e.g. mobiles and tablets.

Useful if you find that a `:hover` state 'sticks' on mobile/tablet.

```CSS
li a {
    border-bottom: 5px solid blue;
}

/* Excludes mobiles and tablets from trying to :hover */
@media (hover: hover) {
    li a:hover {
        border-bottom-color: red;
    }
}
```

[Back to top](#code-snippets)

---

## Typographical Flow

The `flow` class will:

- add `margin-top: 1em` to _all_ elements _after_ the first child of the container,
- space the elements out proportionately, based on the font-size of the elements (which is why `em` rather than `rem` is used).

```CSS
* {
    margin: 0;
}

.flow > * + * {
    margin-top: 1em;
    /* em NOT rem & margin-top NOT margin bottom */
}
```

```HTML
<article class="flow">
    <h2>Main Heading</h2><!-- NO margin-top -->
    <p>Some text.</p><!-- HAS margin-top -->
    <p>Some text.</p><!-- HAS margin-top -->
    <p>Some text.</p><!-- HAS margin-top -->
    <!-- etc -->
</article>

```

[Back to top](#code-snippets)

---

## Centred, Variable Max-width Container

Ensures space on the left and right of the container once the `max-width` threshold has been crossed.

Note: No padding required on the container.

```CSS
* {
    box-sizing: border-box;
}

html {
    font-size: 10px;
}

.container {
    /* Locally-scoped CSS variables */
    --_content-max-width: 120rem; /* i.e. 120 X 10px = 1200px */
    --_content-space-outside: 2rem;

    width: min(var(--_content-max-width), 100% - var(--_content-space-outside) * 2);
    margin-inline: auto;
}
```

```HTML
<article class="container">
    <h2>Main Heading</h2>
    <p>Some text.</p>
    <p>Some text.</p>
    <p>Some text.</p>
</article>
```

[Back to top](#code-snippets)

---

## Centre absolutely positioned `::after` element

Centres both vertically and horizontally.

To only centre horizontally, use `margin-inline: auto;` in place of `margin: auto;`.

[Demo on CodePen](https://codepen.io/Naj-codepen/pen/LYvPvNo)

```HTML
<div class="container"></div>
```

```CSS
*,
*::after,
*::before {
    box-sizing: border-box;
}

html {
    font-size: 10px;
}

.container {
    position: relative;
    width: 10rem;
    aspect-ratio: 1;

    /* Styling */
    background: #000;
    border-radius: 100vw;
    padding: 1.6rem 2rem;
}

.container::after {
    position: absolute;
    width: max-content;
    height: max-content;
    inset: 0;
    /*
        Center horizontally:
        margin-inline: auto;
    */

    /* Center both vertically and horizontally: */
    margin: auto;

    /* Styling */
    font-size: 4rem;
    content: "\2705";
}
```

[Back to top](#code-snippets)

---

## Set Multiple Attributes

```JavaScript
function setMultipleAttributes(element, attributesToSet) {
  for (let i in attributesToSet) {
    element.setAttribute(i, attributesToSet[i])
    // i is the attribute(s)
    // [i] is the attribute value(s)
  }
}

// Example
const btnSubmit = document.createElement("button")
setMultipleAttributes(btnSubmit, {
    type: "submit",
    "data-submit-btn": "1",
    "aria-pressed": "false"
    // Note that attributes containing hyphens must be written as strings.
})

console.log(btnSubmit)
```

### Output

```HTML
<button type="submit" data-submit-btn="1" aria-pressed="false"></button>
```

### Source

[Migel Hewage Nimesha, DelftStack](https://www.delftstack.com/howto/javascript/set-multiple-attributes-to-an-element-using-javascript/)

[Back to top](#code-snippets)

---

## Global Event Listener

Attach event listeners to dynamically generated elements.

### Description

If we have a set of hard-coded elements on an HTML page, it is simple to attach an event listener to all of them:

```HTML
<div class="button-group">
    <button class="button" type="button">Click</button>
    <button class="button" type="button">Click</button>
    <button class="button" type="button">Click</button>
</div>
```

```JavaScript
const buttons = document.querySelectorAll(".button")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        console.log("clicked")
        // Output: "clicked" per button click
    })
})
```

However, if you then dynamically create another button with the same class, the event listener will not be attached to it:

```JavaScript
const buttonGroup = document.querySelector(".button-group")
const newButton = document.createElement("button")
newButton.classList.add("button")
newButton.textContent = "Click new"
buttonGroup.append(newButton)

// No output in console after clicking newButton
```

### Attaching event listeners to dynamically-created elements

```HTML
<div class="button-group"></div>
```

```JavaScript
function globalEventListener(type, selector, callback, option = false) {
    document.addEventListener(
        type,
        (e) => {
            if (e.target.matches(selector)) callback(e)
        },
        option
    )
}

const buttonGroup = document.querySelector(".button-group")

// Dynamically create 3 buttons inside 'button-group':
for (let i = 0; i < 3; i++) {
    const newButton = document.createElement("button")
    newButton.classList.add("button")
    newButton.setAttribute("type", "button")
    newButton.textContent = "Click new"
    buttonGroup.append(newButton)
}

globalEventListener("click", ".button", (e) => {
    console.log("New button clicked")
    // Output: "New button clicked" per button click
})
```

### `focusin` vs `focus` event

#### `focus`

If we had a hard-coded `input type="text"` element, and we wanted to clear its value when the user clicked inside it, we would use the `focus` event on the click handler:

```HTML
<form>
    <input type="text" value="Enter some text" class="input-text" />
</form>
```

```JavaScript
const textInput = document.querySelector(".input-text")
textInput.addEventListener("focus", e => {
    e.target.value = ""
})
```

#### `focusin`

However, if we dynamically create a text `input` element and want the same behaviour, we can't use the `globalEventListener` function with the `focus` event: Instead, we use `focusin`.

Furthermore, we have to override the default `option = false` parameter and add the argument `true` when we _call_ the function.

```HTML
<form></form>
```

```JavaScript
function globalEventListener(type, selector, callback, option = false) {
    document.addEventListener(
        type,
        (e) => {
            if (e.target.matches(selector)) callback(e)
        },
        option
    )
}

const form = document.querySelector("form")

// Create the input element
const newTextInput = document.createElement("input")
newTextInput.setAttribute("type", "text")
newTextInput.value = "Enter some text"
newTextInput.classList.add("input-text")

globalEventListener(
    // 'focusin' NOT 'focus'
    "focusin",
    ".input-text",
    (e) => {
        e.target.value = ""
    },
    // add 'true' argument, overriding default 'option = false' parameter:
    true
)

form.append(newTextInput)
```

For a more detailed discussion see [StackOverflow, JavaScript global event listener not working with focus event](https://stackoverflow.com/questions/75537358/javascript-global-event-listener-not-working-with-focus-event) .

[Back to top](#code-snippets)

---

## If, if/else statement vs Conditional (ternary) operator

**Ternary**: composed of three.

```HTML
<figure>
    <img src="some-image.jpg" alt="">
    <figcaption id="image-caption">Caption 1</figcaption>
</figure>

<button type="button" id="btn-caption">Change caption</button>
```

```JavaScript
const imageCaption = document.getElementById("image-caption")
const btnCaption = document.getElementById("btn-caption")

btnCaption.addEventListener("click", e => {

    // EITHER ...
    // If statement
    if (imageCaption.textContent === "Caption 1") {
        imageCaption.textContent = "Caption 2"
        return
    }
    imageCaption.textContent = "Caption 1"

    // OR ...
    // If/else statement
    if (imageCaption.textContent === "Caption 1") {
        imageCaption.textContent = "Caption 2"
    } else {
        imageCaption.textContent = "Caption 1"
    }

    // OR ...
    // Conditional (Ternary) operator V.1
    imageCaption.textContent === "Caption 1"
        ? (imageCaption.textContent = "Caption 2")
        : (imageCaption.textContent = "Caption 1")

    // OR ...
    // Conditional (Ternary) operator V.2
    imageCaption.textContent =
        imageCaption.textContent === "Caption 1" ? "Caption 2" : "Caption 1"

    // ... will toggle the <figcaption> text.

})
```

[Back to top](#code-snippets)

---

## Quick Fix for 'Uncaught TypeError: ITEM is undefined'

If the console prints an error message along the lines of ...

```
Uncaught TypeError: ITEM is undefined
```

... a _potential_ quick fix is to wrap the offending ITEM in an `if` statement:

```JavaScript

if (ITEM) {

    // ITEM code ...

}
```

[Back to top](#code-snippets)

---

## Accessible details/summary 'accordion'

```HTML
<details id="details">
    <summary aria-controls="#details" id="summary" aria-expanded="false">
        <span id="summary-status">Open</span> details
    </summary>
    <p>Details content...</p>
</details>
```

```JavaScript
const details = document.getElementById("details")
const summary = document.getElementById("summary")
const summaryStatus = document.getElementById("summary-status")

details.addEventListener("toggle", () => {
    // Note: the browser adds and removes the 'open' attribute
    if (details.open) {
        summary.setAttribute("aria-expanded", "true")
        summaryStatus.textContent = "Close"
    } else {
        summary.setAttribute("aria-expanded", "false")
        summaryStatus.textContent = "Open"
    }
})
```

```CSS
.summary {
    cursor: pointer;
}
```

[Back to top](#code-snippets)

---

## Accessible details/summary 'accordion' group

[Demo on CodePen](https://codepen.io/Naj-codepen/pen/abMeXRw)

- Initially, all summaries are closed.
- Once a summary is opened, clicking on another item will close the previous one.
- Click again on an opened summary and it will self-close.

```CSS
summary { cursor: pointer; }

/**
  Hides 'Open' and 'Close' from view.
  Exposes the text content of label 'data-summary-label'
  to screen readers only.
*/
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(0);
    border: 0;
}
```

```HTML
<section data-details-group>
    <h2>Details</h2>
    <details id="details-1">
        <summary aria-controls="#details-1" aria-expanded="false">
            <span data-summary-label class="visually-hidden">Open </span>Summary title #1
        </summary>
        <p>Lorem ipsum dolor sit amet.</p>
    </details>
    <details id="details-2">
        <summary aria-controls="#details-2" aria-expanded="false">
            <span data-summary-label class="visually-hidden">Open </span>Summary title #2
        </summary>
        <p>Lorem ipsum dolor sit amet. Lorem, ipsum dolor.</p>
    </details>
    <details id="details-3">
        <summary aria-controls="#details-3" aria-expanded="false">
            <span data-summary-label class="visually-hidden">Open </span>Summary title #3
        </summary>
        <p>Lorem ipsum dolor sit amet. Lorem, ipsum dolor. Lorem ipsum dolor sit.</p>
    </details>
</section>
```

```JavaScript
const detailsItems = document.querySelectorAll("[data-details-group] details")
const summaryItems = document.querySelectorAll("[data-details-group] summary")

closeOtherOpenedDetails(summaryItems)
accessibleDetails(detailsItems)

function closeOtherOpenedDetails(summaries) {
    summaries.forEach((summary) => {
        summary.addEventListener("click", (e) => {
            summaries.forEach((summary) => {
                const details = summary.closest("details")
                const summaryClicked = e.target.closest("details")
                if (details != summaryClicked) {
                    details.removeAttribute("open")
                }
            })
        })
    })
}

// Adds accessibility information for screen readers
function accessibleDetails(details) {
    details.forEach(detail => {
        detail.addEventListener("toggle", () => {
            const summary = detail.querySelector("summary")
            const summaryLabel = detail.querySelector("[data-summary-label]")
            if (detail.open) {
                summary.setAttribute("aria-expanded", "true")
                summaryLabel.textContent = "Close "
            } else {
                summary.setAttribute("aria-expanded", "false")
                summaryLabel.textContent = "Open "
            }
        })
    })
}
```

[Back to top](#code-snippets)

---

## Get Selected Option Value and Text

[Demo on CodePen](https://codepen.io/Naj-codepen/pen/gOyYPjR)

```HTML
<form>
    <select name="select-nums-list" id="select-nums-list">
        <option value="none">Select a number</option>
        <option value="0">Zero</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
    </select>
</form>

<!-- Output: -->
<ul>
    <li><b>Selected option value: </b><span id="selected-num-value"></span></li>
    <li><b>Selected option text: </b><span id="selected-num-text"></span></li>
</ul>
```

```JavaScript
const selectNumsList = document.getElementById("select-nums-list")
const selectedNumValue = document.getElementById("selected-num-value")
const selectedNumText = document.getElementById("selected-num-text")

getSelectedOptionValueAndText(selectNumsList, selectedNumValue, selectedNumText)

function getSelectedOptionValueAndText(select, value, text) {
    select.addEventListener("change", e => {
        const optionValue = e.target.value
        const optionText = e.target.options[e.target.selectedIndex].text
        if (optionValue === "none") {
            value.textContent = ""
            text.textContent = ""
        } else {
            value.textContent = optionValue
            text.textContent = optionText
        }
    })
}

```

[Back to top](#code-snippets)

---

## Clear Local Storage

Clicking the button launches a `confirm` dialog. If you click 'yes', local storage will be cleared.

Useful for _local_ development on the VSCode server. **Not** recommended as a production option because if the user is running the project from the file location, clicking the button will clear local storage for every project that is using this location.

```HTML
<button id="clear-local-storage" type="button">
    Clear local storage
</button>
```

```JavaScript
const clearLocalStorage = document.getElementById("clear-local-storage")

clearLocalStorage.addEventListener("click", () => {
    if (window.confirm("Do you really want to clear all local storage?")) {
        window.localStorage.clear()
    }
})
```

[Back to top](#code-snippets)

---

## Delete Local Storage Keys

```HTML
<button class="delete-all-entries" data-delete-all-entries>
    Delete all entries
</button>
```

```JavaScript
const deleteAllBtn = document.querySelector("[data-delete-all-entries]")
```

### Delete All Keys

It's easy to delete _all_ local storage, but that's not always what you want.

For instance, you could be running multiple apps from the local file system (`file:///C:/Users/...` on Windows) each app using differently named local storage keys.
If you deleted all local storage, all the apps would return to their default state.

```JavaScript
function deleteEntries() {
    deleteAllBtn.addEventListener("click", () => {

        if (window.confirm("Do you really want to delete all entries?")) {

            window.localStorage.clear()
            window.location.reload()

        }

    })
}
deleteEntries()
```

### Delete Single Specific Key

In this example, only the `LOCAL_STORAGE_KEY-table-entries` key will be deleted, leaving any other keys intact.

```JavaScript
function deleteEntries() {
    deleteAllBtn.addEventListener("click", () => {

        if (window.confirm("Do you really want to delete this key?")) {

            const keyToRemove = "LOCAL_STORAGE_KEY-table-entries"

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i)
                if (key.startsWith(keyToRemove)) {
                    localStorage.removeItem(key)
                }
            }

            window.location.reload()
        }

    })
}
deleteEntries()
```

### Delete Multiple Specific Keys

In this example, both the `LOCAL_STORAGE_KEY-table-entries` and `LOCAL_STORAGE_KEY-button-state ` keys will be deleted, leaving all other keys intact.

```JavaScript
function deleteEntries() {
    deleteAllBtn.addEventListener("click", () => {
        if (window.confirm("Do you really want to delete these 2 keys?")) {

            const keysToRemove = ["LOCAL_STORAGE_KEY-table-entries","LOCAL_STORAGE_KEY-button-state"]

            keysToRemove.forEach((keyToRemove) => {
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i)
                    if (key.startsWith(keyToRemove)) {
                        localStorage.removeItem(key)
                    }
                }
            })

            window.location.reload()
        }
    })
}
deleteEntries()
```

[Back to top](#code-snippets)

---

## Save Button Toggle Text to Local Storage

```HTML
<button id="btn">Button text A</button>
```

```JavaScript
const LOCAL_STORAGE_KEY = "button-toggle-text"
const btn = document.getElementById("btn")

// Save button toggle text to local storage on button click
btn.addEventListener("click", (e) => {
  if (e.target.textContent === "Button text A") {
    localStorageButtonText(e, "Button text B")
  } else if (e.target.textContent === "Button text B") {
    localStorageButtonText(e, "Button text A")
  }
})

function localStorageButtonText(e, btnText) {
  localStorage.setItem(LOCAL_STORAGE_KEY, btnText)
  const storedBtnText = localStorage.getItem(LOCAL_STORAGE_KEY)
  e.target.textContent = storedBtnText
}

/*
  Set initial button text on page load,
  if text has been saved, i.e. button has already been clicked.
*/
function setInitialButtonText() {
  const storedBtnText = localStorage.getItem(LOCAL_STORAGE_KEY)
  /*
    'if' statement here ensures that function will only run
    after text has already been stored.
  */
  if (storedBtnText) {
    btn.textContent = storedBtnText
  }
}
setInitialButtonText()
```

[Back to top](#code-snippets)

---

## React Proptypes for Image `src`

Proptypes for both locally- and externally-sourced files.

### Child Component

```JSX
import PropTypes from "prop-types"

function Image(props) {
  return (
      <img
        src={props.image}
        alt=""
      />
  )
}

Image.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.string, // image sourced from 'assets/'
    PropTypes.instanceOf(URL), // image sourced from external URL
  ]),
}

export default Image
```

### Parent Component

```JSX
import Image from "./Image.jsx"
import AssetsImage from "../../assets/image.jpg"

function ImagesContainer() {
  return (
    <section>
      <Image image={AssetsImage} />
      <Image image="https://path-to-external-file/image.jpg" />
    </section>
  )
}

export default ImagesContainer
```

### HTML Output

```HTML
<section>
    <img src="/src/assets/image.jpg" alt="">
    <img src="https://path-to-external-file/image.jpg" alt="">
</section>
```

[Back to top](#code-snippets)

---

## React Proptypes and Default Proptypes for an Array of Objects

> [!NOTE]
> Component.jsx: Default values for items are included in conditional statements, e.g.

```JSX
<b>Name</b>: {item.name ? item.name : "No name supplied"}
```

> [!NOTE]
> Component.jsx: The placeholder image is imported and also included in a conditional statement:

```JSX
import placeholderProfilePic from "../../assets/staff/placeholder.jpg"

<img
    src={item.profilePic ? item.profilePic : placeholderProfilePic}
    alt={item.name ? item.name : "Placeholder profile image"}
/>
```

### Component.jsx

```JSX
import PropTypes from "prop-types"
import placeholderProfilePic from "../../assets/staff/placeholder.jpg"

function Component(props) {
  const itemList = props.items

  const staffListItemsAll = itemList.map((item) => (
    <li key={item.id}>
      <img
        src={item.profilePic ? item.profilePic : placeholderProfilePic}
        alt={item.name ? item.name : "Placeholder profile image"}
      />
      <ul>
        <li>
          <b>Name</b>: {item.name ? item.name : "No name supplied"}
        </li>
        <li>
          <b>Age</b>: {item.age ? item.age : "No age supplied"}
        </li>
        <li>
          <b>Status</b>: {item.category ? item.category : "Status unknown"}
        </li>
        <li>
          <b>Description</b>:{" "}
          {item.description ? item.description : "No description supplied"}
        </li>
      </ul>
    </li>
  ))
  return (
    <>
      <h3>{props.title}</h3>
      <ul>{staffListItemsAll}</ul>
      <hr />
    </>
  )
}

Component.propTypes = {
  title: PropTypes.string,
  // PropTypes for array of objects:
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      age: PropTypes.number,
      description: PropTypes.string,
      category: PropTypes.string,
      profilePic: PropTypes.oneOfType([
        PropTypes.string, // image sourced from assets/
        PropTypes.instanceOf(URL), // image sourced from external URL
      ]),
    })
  ),
}

Component.defaultProps = {
  title: "No title supplied",
  items: [],
}

export default Component

```

### ComponentParent.jsx

```JSX
import Component from "./Component"
import StaffPic1 from "../../assets/staff/staffpic-1.jpg"
import StaffPic2 from "../../assets/staff/staffpic-2.jpg"
import StaffPic3 from "../../assets/staff/staffpic-3.jpg"
import StaffPic4 from "../../assets/staff/staffpic-4.jpg"
import StaffPic5 from "../../assets/staff/staffpic-5.jpg"

function ComponentParent() {
  const staffAll = [
    {
      id: 1,
      name: "John Self",
      age: 40,
      description: "CEO. Does not suffer fools gladly.",
      category: "Management",
      profilePic: StaffPic1,
    },
    {
      id: 2,
      name: "Jane Doe",
      age: 25,
      description: "Quiet quitter.",
      category: "Staff",
      profilePic: StaffPic2,
    },
    {
      id: 3,
      name: "Helmut Kopf",
      age: 33,
      description: "Systems analyst, currently under investigation by the Met.",
      category: "Management",
      profilePic: StaffPic3,
    },
    {
      id: 4,
      name: "Susan Queue",
      age: 70,
      description: "Former rock star, hobbies include gardening.",
      category: "Staff",
      profilePic: StaffPic4,
    },
    {
      id: 5,
      name: "Chris Walken",
      age: 61,
      description: "Accountant. No relation to the famous film star.",
      category: "Staff",
      profilePic: StaffPic5,
    },
    {
      id: 6,
      name: "Abigail Fiesta",
      age: 23,
      description: "HR consultant working from home in Hammersmith, London.",
      category: "Staff",
      // img path is from external source:
      profilePic:
        "https://clipground.com/images/woman-profile-picture-clipart-9.jpg",
    },
    // Only id supplied.
    {
      id: 7,
    },
  ]

  const managers = staffAll.filter((member) => member.category === "Management")

  const notManagers = staffAll.filter((member) => member.category !== "Management")

  return (
    <section>
      <h2>Staff List</h2>
      {staffAll.length > 0 && (
        <Component
          items={staffAll}
          title="All Staff"
        />
      )}
      {managers.length > 0 && (
        <Component
          items={managers}
          title="Management"
        />
      )}
      {notManagers.length > 0 && (
        <Component
          items={notManagers}
          title="Not management"
        />
      )}
      <Component />
    </section>
  )
}

export default ComponentParent

```

[Back to top](#code-snippets)

---

## React Button Component with props

### Button.jsx

```JSX
import PropTypes from "prop-types"

function Button(props) {
  return (
    <button
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

Button.propTypes = {
  style: PropTypes.object,
  children: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default Button
```

### App.jsx

```JSX
import Button from "./Button.jsx"

function App() {
  const handleClick = () => {
    console.log("Button was clicked!")
  }

  // Function with parameter
  const handleClick2 = (e) => {
    console.log(e.target.textContent)
  }

  return (
    <Button
      onClick={handleClick}
      style={{
        background: "red",
        color: "white",
        cursor: "pointer",
      }}
    >
      Click Me
    </Button>

    // Button with parameter
    <Button
      onClick={(e) => handleClick2(e)}
      style={{
        background: "blue",
        color: "white",
        cursor: "pointer",
      }}
    >
      Click Me (e)
    </Button>
  )
}

export default App
```

[Back to top](#code-snippets)

---

## Temporarily Disable PropTypes

When using `props` in a 'jsx' file, **VSCode** prompts for `proptypes` definitions by default. If you don't add them immediately, the file is marked in red. This can be annoying. To put off defining `proptypes` until later, add the following code at the very top of the file:

```jsx
/* eslint-disable react/prop-types */
```

Removing it will trigger the `proptypes` prompt once again.

[Back to top](#code-snippets)

---

## React Router v6: 'end' replaces 'exact' in NavLink

Say you have the following 2 routes:

```jsx
const router = createBrowserRouter([
  // other code ...
  {
    path: "/post",
    element: <CreatePost />,
  },
  {
    path: "/post/:id",
    element: <Post />,
  },
]}
```

and in the main navigation, you have the following `NavLink`:

```jsx
<NavLink
  to="/post"
  className={({ isActive }) => {
    return isActive ? "nav-active" : ""
  }}
>
  Create Post
</NavLink>
```

- The path '/post' takes you to a form, where can you create a new post.
- The path '/post/:id' takes you to a created post, with a url like `/post/1'.

You don't want the 'Create Post' `NavLink` to be highlighted when you go to an actual post, so you can add `end` to the `NavLink`:

```jsx
<NavLink
  to="/post"
  className={({ isActive }) => {
    return isActive ? "nav-active" : ""
  }}
  end // This will limit the url to '/post' only !
>
  Create Post
</NavLink>
```

> [!NOTE]
> In React Router < v6, `exact` was used in place of `end`. However, I'm not familiar with the actual details of how you would use `exact` in v5.

[Back to top](#code-snippets)

---

## Vite/React: Dynamic Image Paths

For dynamic image paths, store the images in the `/public/` folder. You can put them in a sub-folder, in this case `animals/`.

### Parent Component: `Animals.jsx`

```jsx
const animals = [
  {
    // Other key/value pairs
    image: "cat.png",
    // Other key/value pairs
  },
  // More objects...
]
```

```jsx
<Animal
  // Other props
  src={animals.image}
  // Other props
/>
```

### Child Component: `Animal.jsx`

```jsx
<img src={`/site-name/animals/${src}`} />
```

### The `/public/` Folder

All dynamic images are stored in `/public/animals`.

> [!WARNING]
> You must NOT include '/public/' in the file path, or the images won't display.

[Back to top](#code-snippets)

---

## Pass Object as `Props`

To pass `props` as an object from `Parent.jsx` to the `Child.jsx` component, the names in `Child.jsx` must be identical to the keys in the data object.

### Data Structure: `data.js`

```js
export default [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    address: {
      street: "High Street",
      houseNumber: 44,
      postCode: "SE33 4LG",
    },
    taxId: "1234ABCD",
  },

  // More objects
]
```

### Parent Component: `Parent.jsx`

```jsx
import Child from "./Child"
import data from "./data"

function Parent() {
  const items = data.map((item) => {
    return (
      <Child
        key={item.id}
        item={item} // Pass props as object to Child.jsx
      />
    )
  })
  return <ul>{items}</ul>
}

export default Parent
```

### Child Component: `Child.jsx`

```jsx
import PropTypes from "prop-types"

/* 
  Access key values in data.js using object dot notation, 
  prefixed by prop object {item}, e.g.
    item.firstName, etc.
  Get a nested key value, e.g.
    item.address.street
*/

function Child({ item }) {
  return (
    <li>
      <h2>{`${item.firstName} ${item.lastName}`}</h2>
      <h3>Address</h3>
      <p>
        <span>{`${item.address.houseNumber} ${item.address.street},`}</span>
        <span>{item.address.postCode}</span>
      </p>
      <h3>Tax ID</h3>
      <p>{item.taxId}</p>
    </li>
  )
}

Child.propTypes = {
  item: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      houseNumber: PropTypes.number,
      postCode: PropTypes.string,
    }),
    taxId: PropTypes.string,
  }),
}

export default Child
```

[Back to top](#code-snippets)

---

## Simple Array: Use second `index` Parameter of `.map()` Method to Supply Component's `key` Value

In the absence of an `id` (which would probably be present in an array of objects) use `.map(item, index)`.

```jsx
function App() {
  const itemsArray = ["Item 1", "Item 2"]

  const items = itemsArray.map((item, index) => {
    return <p key={item[index]}>{item}</p>
  })

  return <>{items}</>
}

export default App
```

[Back to top](#code-snippets)

---

## Get Random URL from an Array of Objects

### `imageData.js`

```js
export default {
  data: {
    images: [
      {
        id: "1",
        title: "Image 1",
        url: "https://randomImage.com/random-image-1.jpg",
      },
      {
        id: "2",
        title: "Image 2",
        url: "https://randomImage.com/random-image-2.jpg",
      },
      // many more objects ...
    ],
  },
}
```

### `LogRandomUrls.jsx`

```jsx
import imageData from "../imageData.js"

function LogRandomUrls() {
  function getImageUrls() {
    const imageArray = imageData.data.images
    const randomNumber = Math.floor(Math.random() * imageArray.length)
    const url = imageArray[randomNumber].url

    console.log(url)
  }

  return <button onClick={getImageUls}>Log random URL</button>
}

export default LogRandomUrls
```

[Back to top](#code-snippets)

---

## GitHub Markdown: Notes and Warnings

### Markdown

```
> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.
```

### Output

> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

[Back to top](#code-snippets)

---

## Testing

All snippets tested on Windows 10 with:

- Chrome
- Firefox
- Microsoft Edge

Each snippet tested in both browser and device views.

[Back to top](#code-snippets)
