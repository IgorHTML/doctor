$(function() {


//menu

$(".nav li a").click(function(e) {
  e.preventDefault();
  $(".nav li a").removeClass('active');
  $(this).addClass('active');
})

$(document).click(function(event) {
    if ($(event.target).closest(".nav-inner").length) return;
    if($(window).width() < 992) {
      $(".nav-inner").slideUp();
      $(".hamburger").removeClass("is-active");
    } else {
      return;
    };
    event.stopPropagation();
  });

  $(".hamburger").click(function() {
    $(this).toggleClass("is-active");
    $(".nav-inner").slideToggle();
    return false;
  });


$(document).ready(function(){
  $("#menu").on("click","a", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id  = $(this).attr('href'),

    //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;
    
    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({scrollTop: top}, 1500);
  });
});

  // Carousel
  $('.carousel').owlCarousel({
    loop: true,
    items: 5,
    nav: true,
    margin: 10,
    smartSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>','<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      992: {
        items: 3
      },
      1199: {
        items: 5
      },
      767: {
        items: 1
      },
    },
  });

$('.carousel2').owlCarousel({
    loop: true,
    items: 1,
    nav: true,
    margin: 10,
    smartSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>','<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
    },
  });




  // maskedinput
  $('[name=tel]').inputmask({
    mask: '+7 (999) 999-99-99',
    showMaskOnHover: true,
    showMaskOnFocus: true,
  });
  

  (function($) {
$(function() {

  $('.checkbox').styler();

});
})(jQuery);

 //accordion
$('.accordion h4').click(function(j) {
    var dropDown = $(this).closest('li').find('.open');
    $(this).closest('.accordion').find('.open').not(dropDown).slideUp(250).css("z-index","7");
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).closest('.accordion').find('h4.active').removeClass('active');
      $(this).addClass('active');
    }

    dropDown.stop(false, true).slideToggle(250).css("z-index","8");

    j.preventDefault();
  });

 
  // img not drag
  $("img, a").on("dragstart", function(event) { event.preventDefault(); });

});

$(window).on('load', function() {

  window.onresize = function() {
    onResize();
  };

  function onResize() {
    $('.questions-inner a').equalHeights();
  }onResize();


});

$(document).ready(function() {
  /*
   * Эта функция отправляет заполненную форму PHP-скрипту mail.php
   * mail.php отправит заявку на нужную почту
   *
   * Так же тут есть валидация обязательного заполнения формы.
   * Обязательные поля должны иметь атрибут required
   * Если заполнены не все обязательные поля, то форма не отправится,
   * а незаполненные обязательные поля получат класс .error (что бы
   * можно было их специально стилизовать в CSS).
   * Если браузер не поддерживает HTML5 валидацию, то сработает наша
   */
  $("form").submit(function() { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      $(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
      setTimeout(function() {
        $(th).find('.success').removeClass('active').fadeOut();
        th.trigger("reset");
        $.fancybox.close();
      }, 2000);
    });
    return false;
  });

  /*
   * Эта функция определяет с какого поисковика пришел человек
   * Результаты подставляются в значения атрибута value для
   * всех input[name="search"] и input[name="referrer"] соответственно
   */
  function referrer() {
    var srch = [
      [/^https:\/\/(?:\w+\.)?google\.[a-z]+/, /q=([^&]+)/],
      [/^http:\/\/(?:\w+\.)?yahoo\.[a-z]+/, /p=([^&]+)/],
      [/^http:\/\/(?:\w+\.)?yandex\.[a-z]+/, /text=([^&]+)/],
      [/^http:\/\/(?:\w+\.)?rambler\.[a-z]+/, /query=([^&]+)/]
    ]
    
    var tem;
    for (var key in srch) {
      tem = srch[key];
      if (document.referrer.match(tem[0])){
        var ref = document.referrer.match(tem[1]);
        return decodeURIComponent(ref.length ? ref[1] : 'Пришли по ссылке. Или через неизвестный поисковик.');
      }
    }
    return 'Пришли не с поисковика';
  }
  $('input[name="search"]').val(referrer());
  $('input[name="referrer"]').val(document.referrer ? document.referrer : 'Пришли сразу на сайт');
});
