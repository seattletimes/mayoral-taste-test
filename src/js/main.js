require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

var $ = require("./lib/qsa");
var m = require("./lib/dom");
var closest = require("./lib/closest");
var dot = require("./lib/dot");
var policyTemplate = dot.compile(require("./_policy.html"));
var ynTemplate = dot.compile(require("./_yesno.html"));

var container = $.one(".quiz-container");
var submitButton = $.one(".submit");

var durkanBio = $.one(".durkan-bio");
var moonBio = $.one(".moon-bio");

var policies = window.policies;

var html = "";
policies.forEach(function(policy, index) {
  if (policy.yesno) {
    html += ynTemplate({ policy, index });
  } else {
    var candidates = Math.random() > .5 ? ["durkan", "moon"] : ["moon", "durkan"];
    html += policyTemplate({ policy, index, candidates });
  }
});
container.innerHTML = html;

var results = $.one(".results-container");

var getScore = function() {
  var checked = $("input:checked", container);
  var values = checked.map(el => el.value);
  var counts = { durkan: 0, moon: 0 };
  values.forEach(v => counts[v]++);
  counts.total = values.length;
  return counts;
};

var onChange = function(e) {
  if (e) {
    var item = closest(e.target, ".policy");
    item.classList.add("chosen");
  }
  var counts = getScore();
  console.log(counts);
  results.innerHTML = `

    <div class="info">
      <div class="matchesTitle">Your matches:</div>
      <div class="candidates">Durkan <span class="number">${counts.durkan}</span>, Moon <span class="number">${counts.moon}</span></div>
      <div class="spacer"></div>
      <div class="counter">${counts.total}/${policies.length}</div>
    </div>

    `;
};

var onSubmit = function() {
  
}

container.addEventListener("change", onChange);
submitButton.addEventListener("click", onSubmit);
onChange();