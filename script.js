$(".logo").dblclick(function () {
  var step1 = 1;
  var step3 = 0;
  setInterval(function () {
    if ($(".logo").css("opacity") >= "0") {
      step1 -= 0.04;
      $(".logo").css("opacity", `${step1}`);
    }
    if ($(".logo").css("opacity") <= "0") {
      step3 += 0.03;
      $(".main").css("opacity", `${step3}`);
      $(".appbar").css("opacity", `${step3}`);
    }

  }, 30);

  var step3 = 0;

  setTimeout(function () {
    setInterval(function () {
      if ($(".logo").css("opacity") <= "0") {
        step3 += 0.04;
        $(".main").css("opacity", `${step3}`);
      }
      $(".appbar").css("opacity", `${step3}`);
    }, 50);
    $(".logo").css("display", "none");
  }, 999);
});

$(".fa-chevron-down").click(function () {
  $(this).toggleClass("rotate");
});

$(".fa-chevron-down").click(function () {
  $(this).parent().closest("div").siblings(".middle").toggleClass("hidden");
  $(this).parent().closest("div").siblings(".middle").slideToggle(400);
});
