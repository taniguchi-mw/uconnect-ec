

// JavaScript Document
//viewport
$(function(){
    var ua = navigator.userAgent;
    if((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)){
        $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=2.0, user-scalable=yes">');
    } else {
        $('head').prepend('<meta name="viewport" content="width=1400 user-scalable=yes">');
        //SP window reload
    } 
});




var w = $(window).width();
var x = 750;

//pagescrol


$(function () {
    var topBtn = $('.footer_btn');
    topBtn.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {    //ボタンを出現させるスクロール位置をpxで指定
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 300);    //完了までの時間をミリ秒単位で指定
        return false;
    });
});





