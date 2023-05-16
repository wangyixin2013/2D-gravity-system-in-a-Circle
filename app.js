var ballList=[
  {x:660, y: 200, vx:0.000000001, vy:0, ay:500, currX:200,currY:200, startTime:0, style: document.getElementById("ball1").style},
  {x:300, y: 200, vx:0.000000001, vy:0, ay:500, currX:200,currY:200, startTime:0, style: document.getElementById("ball2").style}
];

var x=-10;
var update=x+"px";

updateTicker();
function updateTicker(){
     setInterval(function(){run() }, 10);
}
function run(){
  for(let i=0;i<ballList.length;i++){
  time=performance.now()-ballList[i].startTime;
  leftUpdate=ballList[i].x-10+ballList[i].vx*time/1000;
  ballList[i].currX=leftUpdate+10;
  leftUpdate+="px";
  ballList[i].style.left=leftUpdate;
  topUpdate=ballList[i].y-10+ballList[i].vy*time/1000+0.5*ballList[i].ay*time*time/1000/1000;
  ballList[i].currY=topUpdate+10;
  topUpdate+="px";
  ballList[i].style.top=topUpdate;
  bounce(time,i);
}
}
var count=1;
function bounce(time, index){
  if(time/1000<=0.03){}
  else if((ballList[index].currX-450)*(ballList[index].currX-450)+(ballList[index].currY-450)*(ballList[index].currY-450)>=400*400){

      console.log(count+" bounce");
      count++;
    ballList[index].vy=ballList[index].vy+ballList[index].ay*time/1000;
    ballList[index].startTime=performance.now();
    var Sb=ballList[index].vy/ballList[index].vx;
    var Sv=-(ballList[index].currX-450)/(ballList[index].currY-450);
    var A=Sb; var B=-1; var C=Sb*ballList[index].currX-ballList[index].currY;
    var D=Sv; var E=-1; var F=Sv*ballList[index].currX-ballList[index].currY;
    var Sr=(A*E*E-A*D*D-2*B*D*E)/(B*E*E-B*D*D+2*A*D*E);
    var v=Math.sqrt((ballList[index].vx * ballList[index].vx) + (ballList[index].vy * ballList[index].vy));
    var xLeft=ballList[index].currX-10;
    var yLeft=Sr*(ballList[index].currX-10)-Sr*ballList[index].currX+ballList[index].currY;
    var xRight=ballList[index].currX+10;
    var yRight=Sr*(ballList[index].currX+10)-Sr*ballList[index].currX+ballList[index].currY;
    var dLeft=Math.sqrt((450-xLeft)*(450-xLeft)+(450-yLeft)*(450-yLeft));
    var dRight=Math.sqrt((450-xRight)*(450-xRight)+(450-yRight)*(450-yRight));
    var newVx=Math.sqrt(v*v/(1+Sr*Sr));
    var newVy=Sr*newVx;
    if(dLeft>dRight){
      if(newVx<0){
        newVx=-newVx;
        newVy=Sr*newVx;
      }
    }
    else{
      if(newVx>0){
        newVx=-newVx;
        newVy=Sr*newVx;
      }
    }
    ballList[index].vx=newVx;
    ballList[index].vy=newVy;
    ballList[index].x=ballList[index].currX;
    ballList[index].y=ballList[index].currY;


  }
}
