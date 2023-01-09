function openOptionsPage(optionsHTML) {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL(optionsHTML));
  }
}

async function sendMessageToContentScript(message) {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // You can do something with response from the content script here
  console.log(response);
}

function listen(eventType, selector, callback) {
  document.querySelector(selector).addEventListener(eventType, callback);
}

listen("click", "#open-options", (e) =>
  openOptionsPage("../options/options.html")
);

listen("change", "#enable", (e) =>
  sendMessageToContentScript({ replace: e.target.checked })
);
