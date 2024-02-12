# Code Snippets

- [CSS Variables with JavaScript: Toggle background colour](#css-variables-with-javascript-toggle-background-colour)
- [Set Multiple Attributes](#set-multiple-attributes)
- [Global Event Listener](#global-event-listener)
- [Perfectly-rounded buttons](#perfectly-rounded-buttons)
- [@media (hover: hover)](#media-hover-hover)
- [If statement vs Conditional (ternary) operator](#if-statement-vs-conditional-ternary-operator)
- [Accessible details/summary 'accordion'](#accessible-detailssummary-accordion)
- [Clear local storage](#clear-local-storage)
- [Typographical Flow](#typographical-flow)
- [Centred, Variable Max-width Container](#centred-variable-max-width-container)
- [Delete Local Storage Keys](#delete-local-storage-keys)
- [Quick Fix for 'Uncaught TypeError: ITEM is undefined'](#quick-fix-for-uncaught-typeerror-item-is-undefined)
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

---

## If statement vs Conditional (ternary) operator

**Ternary**: composed of three.

```HTML
<figure>
    <img src="some-image.jpg" alt="">
    <figcaption id="image-caption">Caption 1</figcaption>
</figure>

<button type="button" id="btn-caption">Add caption</button>
```

```JavaScript
const imageCaption = document.getElementById("image-caption")
const btnCaption = document.getElementById("btn-caption")

btnCaption.addEventListener("click", e => {

    // EITHER:
    // If statement
    if (imageCaption.textContent === "Caption 1") {
        imageCaption.textContent = "Caption 2"
    } else {
        imageCaption.textContent = "Caption 1"
    }

    // OR:
    // Conditional (Ternary) operator V.1
    imageCaption.textContent === "Caption 1"
        ? (imageCaption.textContent = "Caption 2")
        : (imageCaption.textContent = "Caption 1")

    // OR:
    // Conditional (Ternary) operator V.2
    imageCaption.textContent =
        imageCaption.textContent === "Caption 1" ? "Caption 2" : "Caption 1"

    // Will toggle the <figcaption> text.

})
```

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

        if (window.confirm("Do you really want to delete all entries?")) {

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
        if (window.confirm("Do you really want to delete all entries?")) {

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

---

## Testing

All snippets tested on Windows 10 with:

- Chrome
- Firefox
- Microsoft Edge

Each snippet tested in both browser and device views.
