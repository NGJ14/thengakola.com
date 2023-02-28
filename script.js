$(".logo").dblclick(function () {
  // document.documentElement.requestFullscreen();
  $('body').css('background', "url('./images/appBG.jpg')")
  $(".logo").css("display",'none');
  var step1 = 1;
  var step3 = 0;
  setInterval(function () {
    // if ($(".logo").css("opacity") >= "0") {
    //   step1 -= 0.04;
    //   $(".logo").css("opacity", `${step1}`);
    // }
    // if ($(".logo").css("opacity") <= "0") {
      step3 += 0.03;
      $(".main").css("opacity", `${step3}`);
      $(".appbar").css("opacity", `${step3}`);
    // }
    // setTimeout(function () {
    //   $(".logo").css("display", "none");
    // }, 1000);
  }, 15);
});

// Dropdown icon rotation
state = 1;
$(".bottom").click(function () {
  elem = $(this).children("")[0];

  $({ rotation: 180 * !state }).animate(
    { rotation: 180 * state },
    {
      duration: 250,
      step: function (now) {
        $(elem).css({ transform: "rotate(" + now + "deg)" });
      },
    }
  );
  state = !state;
});

$(".fa-chevron-down").click(function () {
  $(this).parent().closest("div").siblings(".middle").toggleClass("hidden");
  $(this).parent().closest("div").siblings(".middle").slideToggle(400);
});

function setData(name) {
  let day = (now.getDay() - 1) % 7;
  fetch("./timetables/" + name + ".json")
    .then((response) => response.json())
    .then((json) => writeData(name, json[day]));
}

function createTimeString(timings) {
  let timeString = "";
  if (timings.length > 0) {
    timeString += timings[0].toString().padStart(2, "0") + ":";
    timeString += timings[1].toString().padStart(2, "0") + "-";
    timeString += timings[2].toString().padStart(2, "0") + ":";
    timeString += timings[3].toString().padStart(2, "0");
  }
  return timeString;
}

function writeData(name, periodsToday) {
  console.log("processing " + name + "...");
  var period = {
    title: "",
    venue: "",
    timings: [],
  };

  var color = "to-be-busy";
  // Find ongoing period
  for (var i = 0; i < periodsToday.length; i++) {
    period = periodsToday[i];
    let timings = period["timings"];

    let start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      timings[0],
      timings[1],
      0
    );
    let end = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      timings[2],
      timings[3],
      0
    );

    if (end >= now) {
      if (start <= now) {
        color = "busy";
      }
      break;
    }
  }

  const card = $("." + name);

  // Hide bottom class when no upcoming classes
  if (i >= periodsToday.length - 1) {
    card.find(".bottom").find("i").css("visibility", "hidden");
    card.find(".fa-chevron-down").css("display", "none");
    card.find(".lastClass").toggleClass("hidden");
    // card.find(".currentBox").css("border-bottom", "3px solid var(--accent)");
    // card.find(".currentBox").css("border-bottom-right-radius", "20px");

    // Display banner and change avatar position when free for the rest of the day
    if (i == periodsToday.length) {
      color = "free";

      card.find(".right").css("display", "none");
      card.find(".timeloc").css("display", "none");
      card.find(".subName").css("display", "none");
      card.find(".avatar").css("position", "absolute");
      card.find(".avatar").css("right", "15px");
      // card.find(".right").css("position", "absolute");
      // card.find(".right").css("left", "15px");
      card.find(".lastClass").css("display", "none");
      card.find(".currentBox").css("border-bottom", "3px solid var(--accent)");
      card.find(".currentBox").css("border-bottom-right-radius", "20px");
      card.find(".bottom").css("display", "none");
    } else {
      card.find(".timeloc").css("display", "");
      card.find(".subName").css("display", "");
      card.find(".right").css("display", "");
      card.find(".bottom").css("display", "");
      card.find(".currentBox").css("background", "#000");
    }
  } else {
    card.find(".bottom").find("i").css("visibility", "visible");
    card.find(".timeloc").css("display", "");
    card.find(".subName").css("display", "");
    card.find(".right").css("display", "");
    card.find(".bottom").css("display", "");
    card.find(".currentBox").css("border-bottom", "none");
    card.find(".currentBox").css("border-bottom-right-radius", "0");
    card.find(".currentBox").css("background", "#000");
  }

  // Set colors
  card.find(".avatar").css("border", `3px dashed var(--${color})`);
  card.find(".right").css("border", `3px solid var(--${color})`);
  card.find(".subName").css("border-right", `3px solid var(--${color})`);
  card.find(".subName").css("border-bottom", `3px solid var(--${color})`);
  card.find(".subName").css("border-left", `3px solid var(--${color})`);
  card.find(".subName").css("color", `var(--${color})`);
  card.find(".timeloc").css("color", `var(--${color})`);
  card.find(".time").css("color", `var(--${color})`);
  card.find(".time").css("border-right", `3px solid var(--${color})`);
  card.find(".time").css("border-bottom", `3px solid var(--${color})`);
  card.find(".time").css("border-top", `3px solid var(--${color})`);
  card.find(".location").css("color", `var(--${color})`);
  card.find(".location").css("border-left", `3px solid var(--${color})`);
  card.find(".location").css("border-bottom", `3px solid var(--${color})`);
  card.find(".location").css("border-top", `3px solid var(--${color})`);

  // Set class title
  card.find(".subName")[0].innerHTML = period["title"];

  // Set class timings
  card.find(".time")[0].innerHTML = createTimeString(period["timings"]);

  // Set class location
  card.find(".location")[0].innerHTML = period["venue"];

  // Set upcoming classes
  var table = card.find("table")[0];
  for (i += 1; i < periodsToday.length; i++) {
    next_period = periodsToday[i];
    table.innerHTML += `<tr>
      <td>${createTimeString(next_period["timings"])}</td>
      <td>${next_period["venue"]}</td>
      <td>${next_period["title"]}</td>
    </tr>`;
  }
}

const nameList = [
  "yami",
  "teena",
  "neha",
  "emily",
  "annie",
  "merlin",
  "niranjana",
  "arsha",
  "rohan",
  "georgy",
  "justus",
  "naveen",
];

const now = new Date(Date.now());
for (name of nameList) {
  setData(name);
}
