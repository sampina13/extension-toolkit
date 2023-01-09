import { html, render, svg } from "lit-html";

console.log("Hello world!");

const renderRadioSelect = (state, setting, options) => {
  return html` <div class="tool">
    <span class="tool-label">${setting}</span>
    <div class="radio-select">
      ${options.map(
        (op) => html`<span
          class="select-option ${state[setting] === op ? "selected" : ""}"
          @click=${() => {
            if (setting === "viewMode") state.selectedPts = new Set();
            state[setting] = op;
            state.drawing = false;
            state.preview = null;
          }}
          >${op}</span
        >`
      )}
    </div>
  </div>`;
};
