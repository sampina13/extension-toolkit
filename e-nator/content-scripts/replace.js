function walkNodes(node, replacements) {
  let child, next;

  switch (node.nodeType) {
    case 1: // Element
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walkNodes(child, replacements);
        child = next;
      }
      break;

    case 3: // Text node
      handleText(node, replacements);
      break;
  }
}

function replaceAll(str, mapObj) {
  var re = new RegExp(Object.keys(mapObj).join("|"), "gi");

  return str.replace(re, function (matched) {
    return mapObj[matched];
  });
}

function handleText(textNode, replacements) {
  textNode.nodeValue = replaceAll(textNode.nodeValue, replacements);
}

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

const flip = (data) =>
  Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]));

const rep = {
  e: "é",
  E: "É",
  a: "à",
};

listenForMessage("replace", true, () => walkNodes(document.body, rep), {
  message: "received",
});

listenForMessage("replace", false, () => walkNodes(document.body, flip(rep)), {
  res: "received",
});
