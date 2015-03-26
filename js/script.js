$(window).load(function () {
  //Preloader
  $('#status').delay(300).fadeOut();
  $('#preloader').delay(300).fadeOut('slow');
  $('body').delay(550).css({'overflow': 'visible'});
})

$(document).ready(function () {
  //animated logo
  $(".navbar-brand").hover(function () {
    $(this).toggleClass("animated shake");
  });

  //animated scroll_arrow
  $(".img_scroll").hover(function () {
    $(this).toggleClass("animated infinite bounce");
  });

  //Wow Animation DISABLE FOR ANIMATION MOBILE/TABLET
  wow = new WOW(
    {
      mobile: false
    });
  wow.init();

  //SmothScroll
  $('a[href*=#]').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && ($target || $('[name=' + this.hash.slice(1) + ']'));
      if ($target.length) {
        var navBar = $('.navbar-default');

        var targetOffset = $target.offset().top - 30;
        if (!navBar.hasClass('isStuck')) {
          targetOffset = targetOffset - navBar.height();
        }

        $('html,body').animate({scrollTop: targetOffset}, 600);
        return false;
      }
    }
  });

});

$('#submit-contact-success').hide();
$('#submit-contact-error').hide();

var onRecaptcha = function(response) {
  $('#submit-contact').prop('disabled', false);
}
$('#submit-contact').prop('disabled', true);

$('#form-contact').submit(function (event) {
  event.preventDefault();
  var $inputs = $('#form-contact :input');

  var data = {};
  $inputs.each(function () {
    var input = $(this);
    if (input.attr('type') !== 'submit') {
      data[this.name] = input.val();
    }
  });

  $.ajax({
    url: './mailer-webservice/', // Service provided by mailer-webservice : https://github.com/Toilal/mailer-webservice
    type: 'POST',
    data: data,
    success: function (msg) {
      $('#submit-contact-success').show();
      $('#submit-contact-error').hide();
      $('#submit-contact').hide();
    },
    error: function(msg) {
      $('#submit-contact-error').show();
      $('#submit-contact-success').hide();
    }
  });
});

