# Extension examples

This repository contains three Chrome extension examples. To load an unpacked
extension in Chrome, you must enable developer mode
([instructions here](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/)).
The provided examples are:

- `hello_world` - basic example that shows a popup and logs a message to the
  console
- `blocker` - lets you position rectangles to block annoying elements on the
  page
- `e-nator` - converts normal e into spooky e

<!-- ## Useful Functions

### Adding an event listener

```js
function listen(eventType, selector, callback) {
  document.querySelector(selector).addEventListener(eventType, callback);
}
```

### Opening an options page

```js
function openOptionsPage(optionsHTML) {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL(optionsHTML));
  }
}
```

The e-nator example passes `openOptionsPage` as a callback to the listen
function, which will open the options page when a button is clicked:

```js
listen("click", "#open-options", (e) =>
  openOptionsPage("../options/options.html")
);
```

The button that triggers the event:

```html
<button id="open-options">configuration</button>
```

### Sending a message to a content script

```js
async function sendMessage(message) {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // do something with response here, not outside the function
  console.log(response);
}
```

The e-nator example combines this with the `listen` function to listen for
changes to its popup checkbox, and send a message with its current value:

```js
listen("change", "#enable", (e) =>
  sendMessageToContentScript({ replace: e.target.checked })
);
``` -->

<!-- ### Listening for a message from a popup

```js
function listenForMessage(key, value, callback, responseMessage) {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request[key] === value) {
      console.log(request);
      sendResponse(responseMessage);
      callback();
    }
  });
}
```

The e-nator example uses this function to run the `walkNodes` function when
`replace` is `true` or `false`:

```js
listenForMessage("replace", true, () => walkNodes(document.body, rep), {
  message: "received",
});

listenForMessage("replace", false, () => walkNodes(document.body, flip(rep)), {
  res: "received",
});
``` -->
