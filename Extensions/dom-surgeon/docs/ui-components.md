# DOM Surgeon: UI Components

DOM Surgeon injects several interface elements directly into the active browser tab. To ensure these elements do not conflict with the native styling of the websites you visit, they are built using robust encapsulation techniques.

## 1. The Floating Widget (`content/widget.js`)
The floating widget is the main control center for DOM manipulation (hiding, resizing, adding classes, undo/redo).

### Shadow DOM Encapsulation
The widget is injected inside a native Web Component (`<dom-surgeon-widget>`) and wrapped in a **Shadow DOM**. 
- **Why?** If a website has a global CSS rule like `button { background: red; }` or `* { margin: 0 }`, it will bleed into our widget and ruin the UI. The Shadow DOM completely isolates the widget's internal HTML and CSS from the host page. No host styles can leak in, and no widget styles can leak out.

### Drag & Drop Mechanics
The widget can be freely dragged anywhere on the screen.
- It uses standard `mousedown`, `mousemove`, and `mouseup` events attached to the window.
- The absolute `top` and `left` pixel positions are saved locally.

### Event Delegation & Integration
The widget does not execute mutations itself. Instead, it communicates with the `core-engine.js` (which holds the active hovered element). When a user clicks "Hide" in the widget, the widget simply triggers the core engine's `applyRule('hide')` function.

## 2. The Breadcrumb Bar (`content/breadcrumb.js`)
The Breadcrumb is a contextual popover that appears at the top of the screen when hovering over an element. It displays the exact DOM hierarchy (e.g., `body > div#main > p.text`).

### Native Popover API
The Breadcrumb utilizes the modern HTML5 `popover` API (`popover="manual"`).
- **Why?** Native popovers are promoted to the "Top Layer" of the browser. This guarantees the breadcrumb will *always* appear on top of every other element on the page, completely ignoring `z-index` stacking contexts that might otherwise trap or hide it.

### Functionality
- **Hover Traversal:** As the user moves the mouse, the core engine passes the DOM node to the breadcrumb. The breadcrumb recursively walks up `node.parentElement` to generate the path.
- **Node Selection:** Users can click on a specific tag in the breadcrumb (e.g., clicking the `div` parent instead of the `p` child) to instantly jump their selection up the DOM tree, allowing for precise manipulation of wrapper containers that might be hard to hover physically.

## 3. Communication
Both the Widget and the Breadcrumb are injected by the `content.js` script. They run in the context of the page, allowing them to directly interact with `document` and `window`. However, for advanced actions like Cloud Syncing, they send messages to the background service worker using `chrome.runtime.sendMessage()`.
