$(".fa-chevron-down").click(function () {
  $(this).toggleClass("rotate");
});

$(".fa-chevron-down").click(function () {
  $(this).parent().closest("div").siblings(".middle").toggleClass("hidden");
  $(this).parent().closest("div").siblings(".middle").slideToggle(400);
});


function getPeriodsToday(name, day) {
  fetch('./timetables/' + name + '.json')
    .then((response) => response.json())
    .then((json) => writeData(json[day]));
}

function writeData(periodsToday) {
  // console.log(periodsToday);

  var current = {
    'title': 'No more today, enjoy!',
    'venue': '',
    'timings': []
  };

  for (period of periodsToday) {
    let timings = period['timings'];
    // console.log(period);
    if (now.getHours() >= timings[0] && now.getMinutes() > timings[1]) {
      // console.log('in 1')
      if (now.getHours() <= timings[2] && now.getMinutes() < timings[3]) {
        current = period;
        break;
      }
    }
  }

  console.log(current);
}

const now = new Date(Date.now());
getPeriodsToday('annie', 0);