var date=new Date();var youbi=new Array("(日)","(月)","(火)","(水)","(木)","(金)","(土)");var syuku=new Array("1/1","1/2","1/3","1/8","2/11","2/12","3/21","4/29","4/30","5/3","5/4","5/5","7/16","8/11","8/13","8/14","8/15","9/17","9/23","9/24","10/8","11/3","11/23","12/23","12/24","12/29","12/30","12/31");var syukucount=syuku.length;var ichinichi=24 * 3600 * 1000;yokuflag=0;var y2=date.getFullYear();var m2=date.getMonth()+1;var d2=date. getDate();var jikanngai=12;for(i=0;i<1;i++){do{yasumi=false;var y=date.getFullYear();var m=date.getMonth()+1;var d=date.getDate();var ww=date.getDay();if((ww==0)||(ww==6)){yasumi=true;yokuflag=0}else{for(j=0;j<syukucount;j++){if((m+"/"+d )==syuku[j]){yasumi=true;yokuflag=0}}}if(y==y2 && m==m2 && d==d2 && date.getHours()>=jikanngai){yasumi=true; var yokuflag=1}date.setTime(date.getTime()+ichinichi);}while(yasumi);}if(y==y2 && m==m2 && d==d2 && date.getHours()<jikanngai){var hassoubi="本日";var dpid = document.getElementById('update');dpid.className= "displayed";}else if(yokuflag==1){hassoubi="翌日";var dpid = document.getElementById('update');dpid.className= "displayed";}else{hassoubi="";}document.write("<span id=\"delivery_day\">"+m+"月"+d+"日"+youbi[ww]+"</span><br><span id=\"when\">"+hassoubi+"</span>");