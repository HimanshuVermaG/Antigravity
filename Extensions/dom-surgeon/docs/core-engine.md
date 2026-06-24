# DOM Surgeon: Core Engine & History Stack

The core engine is the heart of the extension. It runs within the user's active browser tab (in `content/content.js`) and handles the visual selection of elements, applying mutations (hiding, resizing, styling), and managing the local undo/redo history.

## 1. Element Selection & Highlighting
DOM Surgeon uses an invisible, absolute-positioned `<div>` overlay (the "highlight box") rather than modifying the borders of the actual DOM elements being hovered. 

### Implementation:
- **`mousemove` Listener:** As the user moves their cursor, the script determines the deepest DOM element beneath the cursor using `document.elementFromPoint()`.
- **Bounding Box Calculation:** It calculates the `getBoundingClientRect()` of the target element.
- **Visual Overlay:** The highlight box is absolutely positioned over the coordinates of the target element with a vibrant blue border. This prevents layout shifts that would occur if we tried to add `border: 2px solid blue` directly to the target element.
- **Scroll & Resize Adaptability:** Listeners are attached to `window.scroll` and `window.resize` to recalculate and reposition the highlight box in real-time, ensuring it sticks precisely to the hovered element.

## 2. Rule Execution (`applyRule`)
When the user confirms an action (e.g., clicking "Hide Element" in the widget or pressing the `Delete` key), the engine fires the `applyRule(rule)` function.

### Functions:
* **Hiding (`hide` / `delete`):** Injects `display: none !important;` into the element's inline styles.
* **Resizing:** Injects explicit `width` and `height` pixel values.
* **CSS Classes:** Adds custom CSS classes to the `classList` for theming.

**The MutationObserver:** 
Web pages are dynamic. Elements often load asynchronously via React, Vue, or AJAX. To ensure that rules persist even if the target element hasn't loaded yet, DOM Surgeon attaches a `MutationObserver` to `document.body`. Every time the DOM structure changes, the observer quickly scans the updated nodes and reapplies any rules matching our saved CSS selectors. This guarantees that your changes stick, even on complex Single Page Applications (SPAs).

## 3. The History Stack (Undo/Redo)
DOM Surgeon features a robust local history system so users can safely experiment without permanently breaking a webpage.

### Implementation:
* **The Stack:** The engine maintains two arrays: `history` (actions performed) and `redoStack` (actions undone).
* **Pushing State:** Before an element is modified, its current visual state (e.g., previous display style, previous dimensions) is recorded as a "Snapshot" and pushed to the `history` array.
* **Undo (`Ctrl+Z`):** Pops the most recent snapshot from `history`, restores the element to its original state, and pushes the snapshot to the `redoStack`.
* **Redo (`Ctrl+Y`):** Pops from the `redoStack`, reapplies the mutation, and pushes it back onto the `history` array.

### Integration with Storage:
Crucially, the `history` array is kept strictly in local memory. Before the `SyncManager` pushes rules to the Chrome Sync or GitHub API, the history stack is explicitly stripped out of the JSON payload. This keeps the network payloads extremely lightweight and avoids exceeding API storage limits, while still giving the user full undo capabilities during their active browsing session.
