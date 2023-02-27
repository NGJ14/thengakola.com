$(".fa-chevron-down").click(function () {
  $(this).toggleClass("rotate");
});

$(".fa-chevron-down").click(function () {
  $(this).parent().closest("div").siblings(".middle").toggleClass("hidden");
  $(this).parent().closest("div").siblings(".middle").slideToggle(400);
});

const now = new Date(Date.now());

function getJson(name) {
  fetch('./timetables/' + name + '.json')
    .then((response) => {return JSON.parse(response)});
}

function setCurrent(name) {
  periodsToday = getJson(name)[(now.getDay() - 1) % 7];
}