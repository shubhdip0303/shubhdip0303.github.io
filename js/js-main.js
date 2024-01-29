(function ($) {
  "use strict";

  /*--------------------------
1. Preloader
---------------------------- */
  $(window).on("load", function () {
    $("#status").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
  });

  /*----------------------------
 2. Mobile Menu Activation
-----------------------------*/
  $(".mobile-menu nav").meanmenu({
    meanScreenWidth: "768",
  });

  /*--------------------------
 3. Sticky Menu 
---------------------------- */
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 800) {
      $("#sticky").addClass("sticky");
    } else {
      $("#sticky").removeClass("sticky");
    }
  });

  //Single page scroll js for main menu

  $(".menu_scroll ul li a").on("click", function (e) {
    $(".menu_scroll ul li").removeClass("active");
    $(this).parent().addClass("active");
    var target = $("[section-scroll=" + $(this).attr("href") + "]");
    e.preventDefault();
    var targetHeight = target.offset().top - parseInt("80");
    $("html, body").animate(
      {
        scrollTop: targetHeight,
      },
      1000
    );
  });

  $(window).scroll(function () {
    var windscroll = $(window).scrollTop();
    var target = $(".menu_scroll ul li");
    if (windscroll >= 0) {
      $("[section-scroll]").each(function (i) {
        if ($(this).position().top <= windscroll + 95) {
          target.removeClass("active");
          target.eq(i).addClass("active");
        }
      });
    } else {
      target.removeClass("active");
      $(".menu_scroll ul li:first").addClass("active");
    }
  });

  /*----------------------------
4. wow js active
------------------------------ */
  new WOW().init();

  /*----------------------------
5. jarallax active
---------------------------- */
  $(".jarallax").jarallax({
    speed: 0.5,
  });

  /*--------------------------
 6. counterdown
---------------------------- */
  function e() {
    var e = new Date();
    e.setDate(e.getDate() + 25);
    var dd = e.getDate();
    var mm = e.getMonth() + 1;
    var y = e.getFullYear();
    var futureFormattedDate = mm + "/" + dd + "/" + y + " 12:00:00";
    return futureFormattedDate;
  }

  $(".counter").downCount({
    date: e(),
    offset: 16,
  });

  /*--------------------------
10. scrollUp
---------------------------- */
  $.scrollUp({
    scrollText: '<i class="fa fa-angle-up"></i>',
    easingType: "linear",
    scrollSpeed: 900,
    animation: "fade",
  });

  /*--------------------------
11. Contanct form submission
---------------------------- */
  function checkRequire(formId, targetResp) {
    targetResp.html("");
    var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    var url =
      /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
    var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
    var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
    var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
    var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
    var check = 0;
    $("#er_msg").remove();
    var target = typeof formId == "object" ? $(formId) : $("#" + formId);
    target.find("input , textarea , select").each(function () {
      if ($(this).hasClass("require")) {
        if ($(this).val().trim() == "") {
          check = 1;
          $(this).focus();
          targetResp.html("You missed out some fields.");
          $(this).addClass("error");
          return false;
        } else {
          $(this).removeClass("error");
        }
      }
      if ($(this).val().trim() != "") {
        var valid = $(this).attr("data-valid");
        if (typeof valid != "undefined") {
          if (!eval(valid).test($(this).val().trim())) {
            $(this).addClass("error");
            $(this).focus();
            check = 1;
            targetResp.html($(this).attr("data-error"));
            return false;
          } else {
            $(this).removeClass("error");
          }
        }
      }
    });
    return check;
  }
  $(".submitForm").on("click", function () {
    var _this = $(this);
    var targetForm = _this.closest("form");
    var errroTarget = targetForm.find(".response");
    var check = checkRequire(targetForm, errroTarget);
    if (check == 0) {
      var formDetail = new FormData(targetForm[0]);
      formDetail.append("form_type", _this.attr("form-type"));
      $.ajax({
        method: "post",
        url: "ajax.php",
        data: formDetail,
        cache: false,
        contentType: false,
        processData: false,
      }).done(function (resp) {
        if (resp == 1) {
          targetForm.find("input").val("");
          targetForm.find("textarea").val("");
          errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
        } else {
          errroTarget.html(
            '<p style="color:red;">Something went wrong please try again latter.</p>'
          );
        }
      });
    }
  });
})(jQuery);
