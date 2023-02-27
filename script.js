$(".fa-chevron-down").click(function () {
  $(this).toggleClass("rotate");
});

$(".fa-chevron-down").click(function () {
  $(this).parent().closest("div").siblings(".middle").toggleClass("hidden");
  $(this).parent().closest("div").siblings(".middle").slideToggle(400);
});
