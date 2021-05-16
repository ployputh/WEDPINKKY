var img = new Image()
//เซตเกม
img.src = "/img/B.jpg"  // นำรูปเข้า
var rows = 4 // ตัดรูปให้ให้มี4รูปในแนวนอน
var cols = 4 // ตัดรูปให้ให้มี4รูปในแนวตั้ง
var img_width = 784 //ความกว้างของรูปของรูป
var img_height = 490 // ความสูงของรูปของรูป
var offsetleft = 0 
var offsettop = 0 

var over = false;
var arr = new Array()
var time
var T1 = null
var start = false
var str = "";

document.write("<div style='margin:100px;vertical-align:bottom;position:relative;top:"+offsettop+";left:"+offsetleft+";height:"+(img_height+50)+";width="+img_width+"' valign=bottom><form name=frm_info>")
document.write("<table><tr ><td style=vertical-align:bottom;height:"+(img_height+50)+";width="+(img_width/3)+"'>")
var teller = 0
var piece = new Array()
for(i=0; i < cols; i++)
{
   stop = rows 
   arr[i] = new Array()
   if((i+1) == cols) stop--;
   for(j=0;j< stop; j++)
   {
     l = Math.round((img_width/cols)*(i));
     t = Math.round((img_height/rows)*(j)) ;
     id = "i_"+i+"j_"+j
     arr[i][j] = new Array("",l,t,false);
     document.write("<div  style='border-style: solid ; height:"+Math.round((img_height/rows))+";overflow:hidden;position:absolute;left:"+l+";top:"+t+";z-index:10;width:"+Math.round((img_width/cols))+"' id='"+ id +"' onclick=set('"+this.id+"') ><img src='"+img.src+"' style='position:absolute;top:"+(-t)+";left:"+(-l)+"'></div>")
     piece[teller] =  new Array(id,l,t,false,teller)
     teller++;
  }
}
var l = ((img_width/cols)*(cols-1));
var t = (img_height/rows)*(rows-1) ;
var hteller = teller;
arr[(cols-1)][(rows-1)] = new Array("",l,t);
piece[teller] =  new Array("B",0,0,false,teller)
document.write("<input type= button value='Shake' onclick='reseter()' class=pbutton></td><td style='vertical-align:bottom;height:"+(img_height+50)+";width="+(img_width/3)+"' align=middle><div id=txttimer class=ptext>00:00:00</div></td><td style='vertical-align:bottom;height:"+(img_height+50)+";width="+(img_width/3)+"' align=right><div id=txtgood class=ptext></div></td></tr></table></form></div>")
teller--;

function reseter()
{
start = true;
time = new Date()
arr[(cols-1)][(rows-1)] = new Array("",l,t);
piece[hteller] =  new Array("B",0,0,false,hteller)
for(i=0;i<=teller;i++) piece[i][3] = false
changer();
checker();
set_time();
}

function set_time()//จับเวลา
{
 temp = new Date()
 between = Math.round((temp-time)/1000)
 sec = between%60
 min = Math.floor((between-sec)/60)
 hou = Math.floor(min/60)
 min = min%60;
 if (sec < 10) sec = "0"+ sec;
 if (min < 10) min = "0"+ min;
 if (hou < 10) hou = "0"+ hou;
 str = hou+":"+min+":"+sec;
 document.getElementById("txttimer").innerHTML = str
 if(start)T1 = setTimeout("set_time()",1000);
}

function changer()
{
for(i=0;i<cols;i++)
{ 
   stop = rows 
   if((i+1) == cols) stop--;
 for(j=0;j<stop;j++)
 {
  ok = false
  while(ok == false)
  {
   check = Math.floor((teller*Math.random())+0.5)
   id = "i_"+i+"j_"+j
   if((piece[check][3] == false))
   {
   piece[check][3] = true
   mob = document.getElementById(id).style;

   mob.left = piece[check][1] +"px";
   mob.top = piece[check][2] +"px";
   arr[i][j][0] = piece[check][0];
   arr[i][j][3] = get_jpos(piece[check][0],i,j)
   ok = true
   }
  }

  
 }
}
}
function get_jpos(over,i,j)
{
   jpos = over.indexOf("j")
   ipos = parseInt(over.substr(2,(jpos-2)));
   jpos = parseInt(over.substr((jpos+2),(over.length -(jpos+2))))
   if((i == ipos) && (j==jpos)) return true
   else return false
}
function check_blank(i,j)
{
 if ((i == (cols-1)) && (j == (rows-1))) return true
 else return false
}

function set(id)//เช็คการกดปุ่ม shake ถ้ากดจะมีการสลับต่ำแหน่งของเลข
{
  if(!start) {alert("Please press first on the shake button Start the game.");return false}
  i = Math.round(parseInt(document.getElementById(id).style.left)/(img_width/cols))
  j = Math.round(parseInt(document.getElementById(id).style.top)/(img_height/rows))
  if(i != (cols-1)){if(arr[i+1][j]){if(arr[i+1][j][0] == "") {
  document.getElementById(id).style.left = arr[i+1][j][1]
  document.getElementById(id).style.top = arr[i+1][j][2]
  arr[i+1][j][0] = id
  arr[i][j][0] = ""
  arr[i][j][3] = check_blank(i,j)
  hi = i+1
  arr[i+1][j][3] = get_jpos(id,hi,j)
  }}}
  if(j != (rows-1)){if(arr[i][j+1]){if(arr[i][j+1][0] == "") {
  document.getElementById(id).style.left = arr[i][j+1][1]
  document.getElementById(id).style.top = arr[i][j+1][2]
  arr[i][j+1][0] = id
  arr[i][j][0] = ""
  arr[i][j][3] = check_blank(i,j)
  hj = j+1
  arr[i][j+1][3] = get_jpos(id,i,hj)
  }}}
  if(i != 0){if(arr[i-1][j]){if(arr[i-1][j][0] == "") {
    document.getElementById(id).style.left = arr[i-1][j][1]
  document.getElementById(id).style.top = arr[i-1][j][2]
  arr[i-1][j][0] = id
  arr[i][j][0] = ""
  arr[i][j][3] = check_blank(i,j)
  hi = i-1
  arr[i-1][j][3] = get_jpos(id,hi,j)
  }}}
  if(j != 0){if(arr[i][j-1]){if(arr[i][j-1][0] == "") {
  document.getElementById(id).style.left = arr[i][j-1][1]
  document.getElementById(id).style.top = arr[i][j-1][2]
  arr[i][j-1][0] = id
  arr[i][j][0] = ""
  arr[i][j][3] = check_blank(i,j)
  hj = j-1
  arr[i][j-1][3] = get_jpos(id,i,hj)
  }}}
  checker();
}

function checker()//ตำแหน่งรูป
{
 good = 0
 further = true
 for(i=0;i<cols;i++)
{
 for(j=0;j<rows;j++)
 {
  if(arr[i][j][3] == false) 
  {further = false;}
  else good++;
 }
}
strgood = good +"/"+ (rows*cols)
if(!start) strgood = (rows*cols)+"/"+(rows*cols)
document.getElementById("txtgood").innerHTML = strgood
if(further)
{
 clearTimeout(T1);//โชวืเวลาเมื่อทำสำเร็จ
 start = false
 alert("Good bro Time possible "+ str +"!");
}
}
checker();