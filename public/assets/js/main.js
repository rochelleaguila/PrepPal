(function($) {
  'use strict';

  /*-------------------------------------------------------------------------------
  Cookies
  -------------------------------------------------------------------------------*/
  function setCookie(cname, cvalue, days){

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
      var expires = "; expires=" + date.toGMTString();
    } else {
      var expires = "";
    }
    document.cookie = cname + "=" + cvalue + expires + "; path=/";
  }

  //Return a particular cookie
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  //Checks if a cookie exists
  function checkCookie(cookieToCheck){
    var cookie = getCookie(cookieToCheck);
    if (cookie != "") {
      return true;
    }
    return false;
  }

  //Delet an existing cookie
  function deleteCookie( name ) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  /*-------------------------------------------------------------------------------
  Newsletter popup close and set cookie
  -------------------------------------------------------------------------------*/
  $(".newsletter-popup-trigger").on('click', function(){
    setCookie('newsletter_popup_viewed', 'true');
  });

  $('#metroNewsletterPopup').on('hidden.bs.modal', function () {
    setCookie('newsletter_popup_viewed', 'true');
  });

  /*-------------------------------------------------------------------------------
  Preloader
	-------------------------------------------------------------------------------*/
  $(window).on('load', function() {
    $('.metro_preloader').addClass('hidden');

    if(!checkCookie('newsletter_popup_viewed')){
      setTimeout(function(){
        $("#metroNewsletterPopup").modal('show');
      }, 3000);
    }

  });

  /*-------------------------------------------------------------------------------
  Aside Menu
	-------------------------------------------------------------------------------*/
  $(".aside-trigger-right").on('click', function() {
    var $el = $(".metro_aside-right")
    $el.toggleClass('open');
    if ($el.hasClass('open')) {
      setTimeout(function(){
        $el.find('.sidebar').fadeIn();
      }, 300);
    }else{
      $el.find('.sidebar').fadeOut();
    }
  });

  $(".aside-trigger-left").on('click', function() {
    $(".metro_aside-left").toggleClass('open');
  });

  $(".metro_aside .menu-item-has-children > a").on('click', function(e) {
    var submenu = $(this).next(".sub-menu");
    e.preventDefault();

    submenu.slideToggle(200);
  });

  /*-------------------------------------------------------------------------------
  Custom scroll bars
  -------------------------------------------------------------------------------*/
  $('.metro_dropdown-scroll').slimScroll({
    height: 300,
    position: "right",
    size: "5px",
    color: "#dcdcdc",
    opacity: 1,
    wheelStep: 5,
    touchScrollStep: 50,
  });

  /*-------------------------------------------------------------------------------
  Sticky Header
	-------------------------------------------------------------------------------*/
  var header = $(".can-sticky");
  var headerHeight = header.innerHeight();

  function doSticky() {
    if (window.pageYOffset > headerHeight) {
      header.addClass("sticky");
    } else {
      header.removeClass("sticky");
    }
  }
  doSticky();

  /*-------------------------------------------------------------------------------
  Tooltips
  -------------------------------------------------------------------------------*/
  $('[data-toggle="tooltip"]').tooltip();

  /*-------------------------------------------------------------------------------
  Magnific Popup
  -------------------------------------------------------------------------------*/
  $('.popup-youtube').magnificPopup({
    type: 'iframe'
  });
  $('.popup-vimeo').magnificPopup({
    type: 'iframe'
  });
  $('.popup-video').magnificPopup({
    type: 'iframe'
  });
  $('.gallery-thumb').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    },
  });

  /*-------------------------------------------------------------------------------
  ion Range Sliders (Price filter)
  -------------------------------------------------------------------------------*/
  $(".js-range-slider").ionRangeSlider();

  $('.metro_product-single-thumb')
    .wrap('<span style="display:inline-block" class="metro_product-single-zoom"></span>')
    .css('display', 'block')
    .parent()
    .zoom();

  /*-------------------------------------------------------------------------------
  Countdown
  -------------------------------------------------------------------------------*/
  $(".metro_countdown-timer").each(function(){
    var $this = $(this);
    $this.countdown($this.data('countdown'), function(event) {
      $(this).text(
        event.strftime('%D days %H:%M:%S')
      );
    });
  });

  /*-------------------------------------------------------------------------------
  Checkout Notices
  -------------------------------------------------------------------------------*/
   $(".metro_notice a").on('click', function(e){
     e.preventDefault();

     $(this).closest('.metro_notice').next().slideToggle();
   });

   /*-------------------------------------------------------------------------------
   Open/Close Category Bar
   -------------------------------------------------------------------------------*/
   $(".metro_category-mm").on('click', function(){
     $(this).toggleClass('open');
   })

   /*-------------------------------------------------------------------------------
   Testimonials deals slider
   -------------------------------------------------------------------------------*/
   $(".metro_testimonials").slick({
     slidesToShow: 1,
     slidesToScroll: 1,
     arrows: false,
     dots: false,
     autoplay: true,
     responsive: [
       {
         breakpoint: 991,
         settings: {
           slidesToShow: 2,
         }
       },
       {
         breakpoint: 575,
         settings: {
           slidesToShow: 1,
         }
       }
     ]
   });

  /*-------------------------------------------------------------------------------
  Banner slider (Home v1)
  -------------------------------------------------------------------------------*/
  $(".metro_banner .metro_banner-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          arrows: false,
          autoplay: true,
        }
      },
      {
        breakpoint: 575,
        settings: {
          arrows: false,
          autoplay: true,
        }
      }
    ]
  });

  /*-------------------------------------------------------------------------------
  Fresh Arrivals
  -------------------------------------------------------------------------------*/
  $(".metro_home-slider").each(function(){
    var $this = $(this);

    $this.slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      autoplay: true,
      prevArrow: $this.closest('.metro_home-slider-wrapper').find('.slider-prev'),
      nextArrow: $this.closest('.metro_home-slider-wrapper').find('.slider-next'),
      responsive: [
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });
  });

  $(".metro_home-slider-2").each(function(){
    var $this = $(this);

    $this.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      autoplay: true,
      prevArrow: $this.closest('.metro_home-slider-wrapper-2').find('.slider-prev'),
      nextArrow: $this.closest('.metro_home-slider-wrapper-2').find('.slider-next'),
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });
  });

  /*-------------------------------------------------------------------------------
  Related Products / Posts
  -------------------------------------------------------------------------------*/
  $(".metro_related-posts-slider").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  /*-------------------------------------------------------------------------------
  Masonry
  -------------------------------------------------------------------------------*/
  $('.masonry').imagesLoaded(function() {
    var isotopeContainer = $('.masonry');
    isotopeContainer.isotope({
      itemSelector: '.masonry-item',
    });
  });

  /*-------------------------------------------------------------------------------
  Add / Subtract Quantity
  -------------------------------------------------------------------------------*/
  $(".qty span").on('click', function(){
    var qty = $(this).closest('.qty').find('input');
    var qtyVal = parseInt(qty.val());
    if($(this).hasClass('qty-add')){
      qty.val(qtyVal + 1);
    }else{
      return qtyVal > 1 ? qty.val(qtyVal - 1) : 0;
    }
  })

  //On scroll events
  $(window).on('scroll', function() {
    doSticky();
  });

})(jQuery);
