// This is the function that will send our message to the content script.
// It is asyncronous because we want to use the "await" keyword inside it,
// which lets us wait for something to complete. In this case we wait for
// a response from the content script.
async function sendMessageToContentScript(message) {
  // This code came from the Chrome extension documentation. It just gets
  // the currently active tab on the last focused window to ensure that we
  // send the message to the right place.
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  // We use the "await" keyword to wait for a response from the content
  // script. If you don't need a response, you can just run
  // "chrome.tabs.sendMessage(tab.id, message)" and omit the "const response = await"
  chrome.tabs.sendMessage(tab.id, message);

  // You can do something with response from the content script here,
  // if you chose to wait for it.
  // console.log(response);
}

const colorInput = document.getElementById("color-input");

const saveColorAndSendMessage = (e) => {
  // e.target.value gets the current value of the target element,
  // which in this case is the color input
  let selectedColor = e.target.value;

  // We use chrome.storage.sync.set to set the key "color" equal to the value
  // of selectedColor
  chrome.storage.sync.set({color: selectedColor});

  // We call sendMessageToContentScript with the same information
  sendMessageToContentScript({color: selectedColor});
};

// Add an event listener to the color input that will run the
// saveColorAndSendMessage function whenever there is any human input
colorInput.addEventListener("change", saveColorAndSendMessage);
// You could use "input" instead of "change" here to send the message
// continually, but this will run into issues because it will try to set
// values in Chrome storage more times than the max number of times per minute

// This code will run when the popup is opened. It asks chrome storage to get
// the current value of "color"
chrome.storage.sync.get(["color"], (result) => {
  // Console.log the result - remember to open your popup console to see this!
  console.log(result); // This will console.log { color: "#ffffff" } (or whatever the stored color was)
  // Set the value of the color input to whatever the stored color is
  colorInput.value = result.color;
});
