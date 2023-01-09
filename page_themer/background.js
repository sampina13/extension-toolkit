function reddenPage() {
  document.body.style.backgroundColor = "red";
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  document.body.appendChild(iframe);
}

// chrome.action.onClicked.addListener((tab) => {
//   if (!tab.url.includes("chrome://")) {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: reddenPage,
//     });
//   }
// });

var port = chrome.runtime.connect({ name: "knockknock" });

port.postMessage({ joke: "Knock knock" });

port.onMessage.addListener(function (msg) {
  if (msg.question === "Who's there?") port.postMessage({ answer: "Madame" });
  else if (msg.question === "Madame who?")
    port.postMessage({ answer: "Madame... Bovary" });
});

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name === "knockknock");
  port.onMessage.addListener(function (msg) {
    if (msg.joke === "Knock knock")
      port.postMessage({ question: "Who's there?" });
    else if (msg.answer === "Madame")
      port.postMessage({ question: "Madame who?" });
    else if (msg.answer === "Madame... Bovary")
      port.postMessage({ question: "I don't get it." });
  });
});

// Saves options to chrome.storage
function save_options() {
  var color = document.getElementById("color").value;
  var likesColor = document.getElementById("like").checked;
  chrome.storage.sync.set(
    {
      favoriteColor: color,
      likesColor: likesColor,
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 750);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(
    {
      favoriteColor: "red",
      likesColor: true,
    },
    function (items) {
      document.getElementById("color").value = items.favoriteColor;
      document.getElementById("like").checked = items.likesColor;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
