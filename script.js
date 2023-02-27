AOS.init({
  offset: 75,
  duration: 2000,
});

$(".fa-chevron-down").click(function () {
  $(this).toggleClass("rotate");
});



$(".fa-chevron-down").click(function () {
  $(this).parent().closest("div").siblings(".middle").toggleClass("hidden");
  $(this).parent().closest("div").siblings(".middle").slideToggle(400);
});
