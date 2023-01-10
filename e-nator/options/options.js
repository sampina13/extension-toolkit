function listen(eventType, selector, callback) {
  document.querySelector(selector).addEventListener(eventType, callback);
}

const rulesContainer = document.querySelector(".replacements");

let rules = {
  e: "é",
  E: "É",
};

function addRule(start, dest) {
  return `<div class="rule">
  <span class="start">${start}</span>
  <span class="join">is converted to</span>
  <span class="dest">${dest}</span>
  <span class="remove" data-el=${start}>remove</span>
</div>`;
}

// Saves options to chrome.storage
function saveRule(start, dest) {
  rules[start] = dest;
  chrome.storage.sync.set(
    {
      replacements: rules,
    },
    function () {
      // Update status to let user know options were saved.
      rulesContainer.innerHTML += addRule(start, dest);

      console.log("added!");
    }
  );
}

function removeRule(start, dest) {
  delete rules[start];
  chrome.storage.sync.set(
    {
      replacements: rules,
    },
    function () {
      // Update status to let user know options were saved.
      // rulesContainer.innerHTML += addRule(start, dest);

      console.log("deleted!");
    }
  );
}

function restoreRules() {
  chrome.storage.sync.get({ replacements: rules }, function (items) {
    rules = items.replacements;
    for (const entry of Object.entries(items.replacements)) {
      rulesContainer.innerHTML += addRule(entry[0], entry[1]);
    }
    listen("click", ".remove", (e) => {
      console.log(e);
    });
  });
}

document.addEventListener("DOMContentLoaded", restoreRules);

listen("click", "#add-rule", (e) => {
  const start = document.querySelector("#rule-start");
  const end = document.querySelector("#rule-dest");

  saveRule(start.value, end.value);
  start.value = "";
  end.value = "";
});

function a() {
  const divs = document.querySelectorAll(".remove");
  console.log(divs);
  divs.forEach((el) =>
    el.addEventListener("click", (event) => {
      console.log(event.target.getAttribute("data-el"));
    })
  );
}

true;

// 13.1;
// let hello = 13.2;
