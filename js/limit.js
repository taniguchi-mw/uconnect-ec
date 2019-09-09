var today = new Date();
var lastday = new Date(today.getFullYear(),today.getMonth()+1,0);
var y=lastday.getFullYear();
var m=lastday.getMonth()+1;
var d=lastday.getDate();

document.write("<span class=\"limit_year\">"+y+"年<br></span><span class=\"limit_mark\">"+m+"月"+d+"日</span>");
