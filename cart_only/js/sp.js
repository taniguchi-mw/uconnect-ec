/*  ================================================================================
タブ切り替え
================================================================================  */

/*
(function($) {
$(function() {
	$("#tab li").click(function(){
		var num = $("#tab li").index(this);
		$(".content_wrap").addClass('disnon');
		$(".content_wrap").eq(num).removeClass('disnon');
		$("#tab li").removeClass('select');
		$(this).addClass('select')
	});
});
})(jQuery);
*/

/*$(function(){
  $('.tab-index a').click(function(e){
    $('.tab-index .active').removeClass('active');
    $(this).parent().addClass('active');
    $('.tab-contents').each(function(){
      $(this).removeClass('active');
    });
    $(this.hash).addClass('active');
    e.preventDefault();
  });
});*/

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
