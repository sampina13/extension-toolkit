const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");

// Add event listeners to the 3 buttons
button1.addEventListener("click", (e) => updateContentScript(button1));
button2.addEventListener("click", (e) => updateContentScript(button2));
button3.addEventListener("click", (e) => updateContentScript(button3));


async function updateContentScript(buttonName) {
  // Sends a message to the content script with an object that has the
  // current value of the boolean (whether to get scores)
  const message = { buttonName: buttonName, getScores: getScores };
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // You can do something with response from the content script here
  console.log(response);
}
