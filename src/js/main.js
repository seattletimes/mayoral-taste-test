require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

var $ = require("./lib/qsa");
var m = require("./lib/dom");

var container = $.one(".quiz-container");
var submitButton = $.one(".submit");


var policies = window.policies;

policies.forEach(function(p, i) {
  var candidates = Math.random() > .5 ? ["durkan", "moon"] : ["moon", "durkan"];
  var cElements = [];
  candidates.forEach(function(c) {
    var input = m("input", {
      type: "radio",
      name: `question-${i}`,
      id: `question-${i}-${c}`,
      value: c
    });
    var label = m("label", {
      "for": `question-${i}-${c}`
    }, [
      m("div", { class: "column check-container" }),
      m("div", { class: "column speech-container" }, [
        m("div", { class: "speaker" }, c),
        m("div", { class: "speech" }, p[c])
      ])
    ]);
    cElements.push(input, label);
    input.addEventListener("change", function() { // when it changes it adds the chosen class
      item.classList.add("chosen");
    });
  });
  var choices = m("div", { class: "choices"}, cElements);
  var item = m("div", { class: "policy", "data-question": i }, [
    m("h3", { class: "question" }, p.question),
    choices
  ]);
  container.appendChild(item);
});

var results = $.one(".results-container");

var onChange = function() {
  var checked = $("input:checked", container);
  var values = checked.map(el => el.value);
  var counts = { durkan: 0, moon: 0 };
  values.forEach(v => counts[v]++);
  console.log(counts);
  results.innerHTML = `

    <div class="info">
      <div class="matchesTitle">Your matches:</div>
      <div class="candidates">Durkan <span class="number">${counts.durkan}</span>, Moon <span class="number">${counts.moon}</span></div>
      <div class="spacer"></div>
      <div class="counter">${values.length}/${policies.length}</div>
    </div>

    `;
}

var onSubmit = function() {
  console.log("hi");
}

container.addEventListener("change", onChange);
submitButton.addEventListener("click", onSubmit);
onChange();