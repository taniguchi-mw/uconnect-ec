// js
/* ===================================================================

 * TOPへ戻る

=================================================================== */

var scrolltotop={
	//startline: Integer. Number of pixels from top of doc scrollbar is scrolled before showing control
	//scrollto: Keyword (Integer, or "Scroll_to_Element_ID"). How far to scroll document up when control is clicked on (0=top).
	setting: {startline:100, scrollto: 0, scrollduration:800, fadeduration:[500, 100]},
	controlHTML: '<img src="//u-connect.jp/image/common/arrow_up.png" />', //HTML for control, which is auto wrapped in DIV w/ ID="topcontrol"
	controlattrs: {offsetx:15, offsety:10}, //offset of control relative to right/ bottom of window corner
	anchorkeyword: '#top', //Enter href value of HTML anchors on the page that should also act as "Scroll Up" links

	state: {isvisible:false, shouldvisible:false},

	scrollup:function(){
		if (!this.cssfixedsupport) //if control is positioned using JavaScript
			this.$control.css({opacity:0}) //hide control immediately after clicking it
		var dest=isNaN(this.setting.scrollto)? this.setting.scrollto : parseInt(this.setting.scrollto)
		if (typeof dest=="string" && jQuery('#'+dest).length==1) //check element set by string exists
			dest=jQuery('#'+dest).offset().top
		else
			dest=0
		this.$body.animate({scrollTop: dest}, this.setting.scrollduration);
	},

	keepfixed:function(){
		var $window=jQuery(window);
		var controlx=$window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx
		var controly=$window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety
		this.$control.css({left:controlx+'px', top:controly+'px'})
	},

	togglecontrol:function(){
		var scrolltop=jQuery(window).scrollTop()
		if (!this.cssfixedsupport)
			this.keepfixed()
		this.state.shouldvisible=(scrolltop>=this.setting.startline)? true : false
		if (this.state.shouldvisible && !this.state.isvisible){
			this.$control.stop().animate({opacity:1}, this.setting.fadeduration[0])
			this.state.isvisible=true
		}
		else if (this.state.shouldvisible==false && this.state.isvisible){
			this.$control.stop().animate({opacity:0}, this.setting.fadeduration[1])
			this.state.isvisible=false
		}
	},
	
	init:function(){
		jQuery(document).ready(function($){
			var mainobj=scrolltotop
			var iebrws=document.all
			mainobj.cssfixedsupport=!iebrws || iebrws && document.compatMode=="CSS1Compat" && window.XMLHttpRequest //not IE or IE7+ browsers in standards mode
			mainobj.$body=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body')
            mainobj.$control=$('<div id="topcontrol">'+mainobj.controlHTML+'</div>')
				.css({position:mainobj.cssfixedsupport? 'fixed' : 'absolute', bottom:mainobj.controlattrs.offsety, right:mainobj.controlattrs.offsetx, opacity:0, cursor:'pointer'})
				.attr({title:'ページ上部へ'})
				.click(function(){mainobj.scrollup(); return false})
				.appendTo('body')
			if (document.all && !window.XMLHttpRequest && mainobj.$control.text()!='') //loose check for IE6 and below, plus whether control contains any text
				mainobj.$control.css({width:mainobj.$control.width()}) //IE6- seems to require an explicit width on a DIV containing text
			mainobj.togglecontrol()
			$('a[href="' + mainobj.anchorkeyword +'"]').click(function(){
				mainobj.scrollup()
				return false
			})
			$(window).bind('scroll resize', function(e){
				mainobj.togglecontrol()
			})
		})
	}
}

scrolltotop.init()


/*  ================================================================================
windowを閉じる
================================================================================  */

function close_win(){ 
	var nvua = navigator.userAgent; 
		if(nvua.indexOf('MSIE') >= 0){ 
			if(nvua.indexOf('MSIE 5.0') == -1) { 
				top.opener = ''; 
			} 
		} 
		else if(nvua.indexOf('Gecko') >= 0){ 
			top.name = 'CLOSE_WINDOW'; 
			wid = window.open('','CLOSE_WINDOW'); 
		} 
	top.close(); 
}


/*  ================================================================================
タブ切り替え
================================================================================  */

/*--setup--*/
window.onload=function() {
tab.setup = {
   tabs: document.getElementById('tab').getElementsByTagName('li'),
   
   pages: [
      document.getElementById('tab1'),
      document.getElementById('tab2'),
      document.getElementById('tab3'),
      document.getElementById('tab4')
   ]
}

tab.init();
}
/*--setup end--*/

var tab = {
   init: function(){
      var tabs = this.setup.tabs;
      var pages = this.setup.pages;
      
      for(i=0; i<pages.length; i++) {
         if(i !== 0) pages[i].style.display = 'none';
         tabs[i].onclick = function(){ tab.showpage(this); return false; };
      }
   },
   
   showpage: function(obj){
      var tabs = this.setup.tabs;
      var pages = this.setup.pages;
      var num;
      
      for(num=0; num<tabs.length; num++) {
         if(tabs[num] === obj) break;
      }
      
      for(var i=0; i<pages.length; i++) {
         if(i == num) {
            pages[num].style.display = 'block';
            tabs[num].className = 'active';
         }
         else{
            pages[i].style.display = 'none';
            tabs[i].className = null;
         }
      }
   }
}


/*  ================================================================================
$(function()まとめ
================================================================================  */
$(function(){

//*------ 迷惑メール対策　フォームの送信先を正規のURLに変更 ------*/
$('.postForm').attr('href','https://u-connect.jp/contact/index');

/*------ 可視範囲でアニメーション ------*/
  $('.effect .effect_add').css("opacity","0");
  $(window).scroll(function (){
    $(".effect").each(function(){
      var imgPos = $(this).offset().top;    
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight + windowHeight/8){
        $(".effect_add",this).css("opacity","1" );
		$(".effect_add",this).addClass("fadeInDown");
      } else {
        $(".effect_add",this).css("opacity","0" );
		$(".effect_add",this).removeClass("fadeInDown");
      }
    });
  });
  

/*------ 上部固定ヘッダー ------*/
  $('.fix-head').each(function() {
    var nav = $(this);
    // メニューのtop座標を取得する
    var offsetTop = nav.offset().top;
    var floatMenu = function() {
        // スクロール位置がメニューのtop座標を超えたら固定にする
        if (jQuery(window).scrollTop() > offsetTop + 700) {
            nav.addClass('fixed').slideDown();
        } else {
            nav.removeClass('fixed').slideUp();
        }
    }
    jQuery(window).scroll(floatMenu);
    jQuery('body').bind('touchmove', floatMenu);
  });


/*------ TOPへ戻るカスタマイズ ------*/
  $('#topcontrol').each(function() {
    if(document.URL.match("/oreno_sapuri")) {
        $(this).addClass('topcontrol-oreno_sapuri');
        $(this).children('img').attr('src', '//u-connect.jp/image/oreno_sapuri/gototop.png');
    }
  });



/*------ Facebookレスポンシブ ------*/
    // ページプラグインの埋め込みコードを返す。
    function pagePluginCode(w) {
        // 幅に応じて高さを変更する場合
        if(w > 400) {
            var h = 400;
        } else {
            var h = 300;
        }
        return '<div class="fb-page" data-href="https://www.facebook.com/orenosupplement/" data-tabs="timeline" data-width="' + w + '" data-height="' + h + '" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/orenosupplement/"><a href="https://www.facebook.com/orenosupplement/">俺のサプリ</a></blockquote></div></div>';
    }
 
    // ページプラグインを追加する要素
    var facebookWrap = $('.facebook-wrapper');
    var fbBeforeWidth = ''; // 前回変更したときの幅
    var fbWidth = facebookWrap.width(); // 今回変更する幅
    var fbTimer = false;
    $(window).on('load resize', function() {
        if (fbTimer !== false) {
            clearTimeout(fbTimer);
        }
        fbTimer = setTimeout(function() {
            fbWidth = facebookWrap.width(); // 変更後の幅を取得
            // 前回の幅から変更があった場合のみ処理
            // スマホだとスクロール時にリサイズが発生することがあるため
            if(fbWidth != fbBeforeWidth) {
                facebookWrap.html(pagePluginCode(fbWidth)); // ページプラグインのコード変更
                window.FB.XFBML.parse(); // ページプラグインの再読み込み
                fbBeforeWidth = fbWidth; // 今回変更分を保存しておく
            }
        }, 200);
    });



});


/*  ================================================================================
$("document").ready(function
※HTMLには書き込まず全てこちらで設定
================================================================================  */
$("document").ready(function(){


	/*------トップページ｜スライダー------*/
	if(document.getElementById("slideimg") != null) {
		$('.flexslider').flexslider({
			animation: "slide",
			slideshowSpeed: 5000/* ,
			controlNav: "thumbnails"*/
		});
	};

	
	/*------メニュー------*/
	$('#sidr-menu-button').sidr({
		name: 'sidr-nav',
		source: '.head-nav',
		speed : 300,
		side : 'right'
	});
	$(window).touchwipe({
		wipeLeft: function() {
			$.sidr('close', 'sidr-main');
		},
		wipeRight: function() {
			$.sidr('open', 'sidr-main');
		},
		preventDefaultEvents: false
	});
	

	/*------ご利用ガイド------*/
	$(".guide_box ul").tile(3);


});



