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
var animate = require("./lib/animateScroll");

var resultsBio = $.one(".bio-intro");
var tiedBio = $.one(".bio-tie");
var durkanBio = $.one(".durkan-bio");
var moonBio = $.one(".moon-bio");

var policies = window.policies;

var html = "";
policies.forEach(function(policy, index) {
  if (policy.yesno && policy.yesno.trim()) {
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
  // console.log(counts);
  results.innerHTML = `

    <div class="info">
      <div class="candidates"><span class="matchesTitle">Your matches:</span> Durkan <span class="number">${counts.durkan}</span>, Moon <span class="number">${counts.moon}</span></div>
      <div class="counter">${counts.total}/${policies.length}</div>
    </div>

    `;
};

var onSubmit = function() {
  var score = getScore();

  // resets hidden classes
  resultsBio.classList.add("hidden");
  tiedBio.classList.add("hidden");
  durkanBio.classList.add("hidden");
  moonBio.classList.add("hidden");


  // removes hidden classes from results
  if (score.durkan > score.moon) {
    resultsBio.classList.remove("hidden");
    durkanBio.classList.remove("hidden");
  } else if (score.moon > score.durkan) {
    resultsBio.classList.remove("hidden");
    moonBio.classList.remove("hidden");
  } else { // a tie
    tiedBio.classList.remove("hidden");
    durkanBio.classList.remove("hidden");
    moonBio.classList.remove("hidden");
  }
}

$(".button").forEach(el => el.addEventListener("click", function(e) {
  e.preventDefault();
  animate(".submit", 1000);
}));

container.addEventListener("change", onChange);
submitButton.addEventListener("click", onSubmit);
onChange();