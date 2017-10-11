require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

var $ = require("./lib/qsa");
var m = require("./lib/dom");

var container = $.one(".quiz-container");


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
      m("span", { class: "speaker" }, c),
      m("span", { class: "speech" }, p[c])
    ]);
    cElements.push(input, label);
    input.addEventListener("change", function() { // when it changes it adds the chosen class
      label.classList.add("chosen");
    });
  });
  var item = m("div", { class: "policy", "data-question": i }, [
    m("h3", { class: "question" }, p.question),
    m("div", { class: "choices"}, cElements)
  ]);
  container.appendChild(item);
});

var results = $.one(".results-container");

var showSpeaker = function() {
  console.log(this.candidateName);
};

var onChange = function() {
  var checked = $("input:checked", container);
  var values = checked.map(el => el.value);
  var counts = { durkan: 0, moon: 0 };
  values.forEach(v => counts[v]++);
  console.log(counts);
  results.innerHTML = `<span class="matchesTitle">Your matches</span>

    <div class="info">
      <div class="candidateDurkan">Durkan <span class="number">${counts.durkan}</span></div>

      <div class="counter">${values.length}/${policies.length}</div>

      <div class="candidateMoon">Moon <span class="number">${counts.moon}</span></div>
    </div>

    `;
}

container.addEventListener("change", onChange);
onChange();