// σε κάθε load της σελίδας κάνει load το προηγούμενο score
window.onload = function(){
    loadScore();
} 
var techTimeOut=8;

function beginGame(){  
        localStorage.clear();
        var a= document.getElementById("team1").value;
        var b= document.getElementById("team2").value;     

        if(a==="" || b===""){
            window.alert("Please complete teams name");
        }
        else{     
            clearData();
            document.getElementById("t1name").innerHTML=a;
            document.getElementById("t2name").innerHTML=b;
            document.getElementById("set_t1").innerHTML=0;
            document.getElementById("set_t2").innerHTML=0;
            document.getElementById("nSet").innerHTML=1;
            $('input[type=button]').attr('disabled',false);
            saveScore();
        }    
}

function finishGame(){
    navigator.vibrate(2000);
    $('input[type=button]').attr('disabled',true);
    $('#clearGame').attr('disabled',false);    
    //document.getElementById("nSet").innerHTML="x";   
}

function checkPoints(){
    var seta = document.getElementById("set_t1").innerHTML;
    var setb = document.getElementById("set_t2").innerHTML;
    var a = document.getElementById("t1_points").innerHTML;
    var b = document.getElementById("t2_points").innerHTML;
    
    
     //έλεγχος νικητή σετ και τοπουθέτηση των πόντων κάθε σετ και ομάδας στο ταμπλό
    //έλεγχος για σετ5
    if(seta==2 & setb==2){   
        if(a>=15 & b<=a-2){
            if(document.getElementById("nSet").innerHTML==5) {    
                document.getElementById("t1_points_set5").innerHTML=a;
                document.getElementById("t2_points_set5").innerHTML=b;      
                document.getElementById("set_t1").innerHTML++;
                whoWin();                  
            } 
        }    
        if(b>=15 & a<=b-2){
            if(document.getElementById("nSet").innerHTML==5) {    
                document.getElementById("t1_points_set5").innerHTML=a;
                document.getElementById("t2_points_set5").innerHTML=b;                 
                document.getElementById("set_t2").innerHTML++;
                whoWin();                        
            }
        }  
    }
    
    //έλεγχος για σετ 1-4
    if(a>=25 & b <= a-2) { 
        if(document.getElementById("nSet").innerHTML==1) {    
            document.getElementById("t1_points_set1").innerHTML=a;
            document.getElementById("t2_points_set1").innerHTML=b;
        }
        if(document.getElementById("nSet").innerHTML==2) {    
            document.getElementById("t1_points_set2").innerHTML=a;
            document.getElementById("t2_points_set2").innerHTML=b;
        }  
         if(document.getElementById("nSet").innerHTML==3) {    
            document.getElementById("t1_points_set3").innerHTML=a;
            document.getElementById("t2_points_set3").innerHTML=b;
        }    
        if(document.getElementById("nSet").innerHTML==4) {    
            document.getElementById("t1_points_set4").innerHTML=a;
            document.getElementById("t2_points_set4").innerHTML=b;
        }
        beginNewSet("set_t1");
    }
    
    if(b>=25 & a <= b-2){
        if(document.getElementById("nSet").innerHTML==1) {    
            document.getElementById("t1_points_set1").innerHTML=a;
            document.getElementById("t2_points_set1").innerHTML=b;
        }
        if(document.getElementById("nSet").innerHTML==2) {    
            document.getElementById("t1_points_set2").innerHTML=a;
            document.getElementById("t2_points_set2").innerHTML=b;
        }  
         if(document.getElementById("nSet").innerHTML==3) {    
            document.getElementById("t1_points_set3").innerHTML=a;
            document.getElementById("t2_points_set3").innerHTML=b;
        }    
        if(document.getElementById("nSet").innerHTML==4) {    
            document.getElementById("t1_points_set4").innerHTML=a;
            document.getElementById("t2_points_set4").innerHTML=b;
        }
        beginNewSet("set_t2");   
    } 
    
    //Τεχνικά timeout
    if((a==8 || b==8) & techTimeOut==8) {
         beginTimeOut();
         document.getElementById("ttime").innerHTML="1st technical timeout";
         techTimeOut=16;
    }

    if((a==16 || b==16) & techTimeOut==16) {
         beginTimeOut();
         document.getElementById("ttime").innerHTML="2st technical timeout";
         techTimeOut=0;    
    }  
    
   
}

function whoWin(){
    if(document.getElementById("set_t1").innerHTML==3){
        document.getElementById("t1_points").innerHTML="Winner";
        document.getElementById("t2_points").innerHTML="";
        finishGame();
    }
    if(document.getElementById("set_t2").innerHTML==3){
        document.getElementById("t2_points").innerHTML="Winner";
        document.getElementById("t1_points").innerHTML="";
        finishGame();
    }
}

function clearData(){    
    document.getElementById("t1_points").innerHTML=0;
    document.getElementById("t2_points").innerHTML=0;
    document.getElementById("nSet").innerHTML="x";
    document.getElementById("t1name").innerHTML="";
    document.getElementById("t2name").innerHTML="";  
    $("input[id*='points_set']").val( "" );
    $('#newGame').attr('disabled',false);
    $('input[type=button]').attr('disabled',false);
    localStorage.clear();
}

function beginNewSet(s){
    navigator.vibrate(500);
    var seta=document.getElementById("set_t1").innerHTML;
    var setb=document.getElementById("set_t2").innerHTML;
    document.getElementById(s).innerHTML++;
    techTimeOut=8; 
    
    if(seta<=2 & setb<=2){
        document.getElementById("nSet").innerHTML++;
        document.getElementById("t1_points").innerHTML=0;
        document.getElementById("t2_points").innerHTML=0;       
    }
    whoWin();
    saveScore();
}

function beginTimeOut(){
    navigator.vibrate(500);
    document.getElementById("ttime_counter").innerHTML=2;
    ID = setInterval(finishTimeout,1000);
    $('input[type=button]').attr('disabled',true);
}

function finishTimeout() {
    document.getElementById("ttime_counter").innerHTML--;
    if( document.getElementById("ttime_counter").innerHTML==0){
        navigator.vibrate(100);
        clearInterval(ID);
        ID=null;
        document.getElementById("ttime").innerHTML="Technical Timeout";
        document.getElementById("t1time_counter").innerHTML="";    
        document.getElementById("t2time_counter").innerHTML="";  
        $('input[type=button]').attr('disabled',false);
    }
}

//Event Listener---------------------------------------------------------------------

document.getElementById("taAdd").addEventListener("click",function(){
    document.getElementById("t1_points").innerHTML++;
    document.getElementById("ta_title").innerHTML="Team A<br>is serving";
    document.getElementById("tb_title").innerHTML="Team B";
    checkPoints();
    saveScore();
})

document.getElementById("taRem").addEventListener("click",function(){
    document.getElementById("t1_points").innerHTML--;
    document.getElementById("ta_title").innerHTML="Team A<br>is serving";
    document.getElementById("tb_title").innerHTML="Team B";
    saveScore();
 })

document.getElementById("tbAdd").addEventListener("click",function(){    
    document.getElementById("t2_points").innerHTML++;
    document.getElementById("tb_title").innerHTML="Team B<br>is serving";
    document.getElementById("ta_title").innerHTML="Team A"
    checkPoints();
    saveScore();
})

document.getElementById("tbRem").addEventListener("click",function(){
    document.getElementById("t2_points").innerHTML--;
    document.getElementById("tb_title").innerHTML="Team B<br>is serving";
    document.getElementById("ta_title").innerHTML="Team A";
    saveScore();
})

document.getElementById("callTimeOutA").addEventListener("click",function(){    
        beginTimeOut();
        document.getElementById("t1time_counter").innerHTML="timeout CALLED"    
})

document.getElementById("callTimeOutB").addEventListener("click",function(){
        beginTimeOut();
        document.getElementById("t2time_counter").innerHTML="timeout CALLED" 
})

document.getElementById("clearGame").addEventListener("click",function(){
    clearData();
    location.reload();
    document.getElementById("logoa").innerHTML="";
    document.getElementById("logob").innerHTML="";
    
})

document.getElementById("newGame").addEventListener("click",function(){
    var flag=document.getElementById("nSet").innerHTML;
    if(isNaN(flag)){
        location.reload();
    }else{
        
        beginGame();}
})

document.getElementById("clearLogo").addEventListener("click",function(){
  document.getElementById("logoa").innerHTML="";
  document.getElementById("logob").innerHTML="";
})

//Local Storage save-load-------------------------------------------------------------------------------------------------
function saveScore(){
    localStorage.setItem("t1_points_local", document.getElementById("t1_points").innerHTML);
    localStorage.setItem("t2_points_local", document.getElementById("t2_points").innerHTML);
    localStorage.setItem("nSet_local", document.getElementById("nSet").innerHTML);
    localStorage.setItem("t1name_local", document.getElementById("t1name").innerHTML);
    localStorage.setItem("t2name_local", document.getElementById("t2name").innerHTML);
    localStorage.setItem("t1_points_set1_local", document.getElementById("t1_points_set1").innerHTML);
    localStorage.setItem("t2_points_set1_local", document.getElementById("t2_points_set1").innerHTML);
    localStorage.setItem("t1_points_set2_local", document.getElementById("t1_points_set2").innerHTML);
    localStorage.setItem("t2_points_set2_local", document.getElementById("t2_points_set2").innerHTML);
    localStorage.setItem("t1_points_set3_local", document.getElementById("t1_points_set3").innerHTML);
    localStorage.setItem("t2_points_set3_local", document.getElementById("t2_points_set3").innerHTML);
    localStorage.setItem("t1_points_set4_local", document.getElementById("t1_points_set4").innerHTML);
    localStorage.setItem("t2_points_set4_local", document.getElementById("t2_points_set4").innerHTML);
    localStorage.setItem("t1_points_set5_local", document.getElementById("t1_points_set5").innerHTML);
    localStorage.setItem("t2_points_set5_local", document.getElementById("t2_points_set5").innerHTML);
    localStorage.setItem("set_t1_local", document.getElementById("set_t1").innerHTML);
    localStorage.setItem("set_t2_local", document.getElementById("set_t2").innerHTML);
    //localStorage.setItem("canvasA_local", document.getElementById("canvasA").innerHTML);
    //localStorage.setItem("canvasB_local", document.getElementById("canvasB").innerHTML);
}

function loadScore(){
    document.getElementById("t1_points").innerHTML = localStorage.getItem("t1_points_local");
    document.getElementById("t2_points").innerHTML = localStorage.getItem("t2_points_local");
    document.getElementById("nSet").innerHTML = localStorage.getItem("nSet_local");
    document.getElementById("t1name").innerHTML = localStorage.getItem("t1name_local");
    document.getElementById("t2name").innerHTML = localStorage.getItem("t2name_local");
    document.getElementById("t1_points_set1").innerHTML = localStorage.getItem("t1_points_set1_local");
    document.getElementById("t2_points_set1").innerHTML = localStorage.getItem("t2_points_set1_local");
    document.getElementById("t1_points_set2").innerHTML = localStorage.getItem("t1_points_set2_local");
    document.getElementById("t2_points_set2").innerHTML = localStorage.getItem("t2_points_set2_local");
    document.getElementById("t1_points_set3").innerHTML = localStorage.getItem("t1_points_set3_local");
    document.getElementById("t2_points_set3").innerHTML = localStorage.getItem("t2_points_set3_local");
    document.getElementById("t1_points_set4").innerHTML = localStorage.getItem("t1_points_set4_local");
    document.getElementById("t2_points_set4").innerHTML = localStorage.getItem("t2_points_set4_local");
    document.getElementById("t1_points_set5").innerHTML = localStorage.getItem("t1_points_set5_local");
    document.getElementById("t2_points_set5").innerHTML = localStorage.getItem("t2_points_set5_local");
    //document.getElementById("canvasA").innerHTML = localStorage.getItem("canvasA_local");
    //document.getElementById("canvasB").innerHTML = localStorage.getItem("canvasB_local");
    document.getElementById("set_t1").innerHTML = localStorage.getItem("set_t1_local");
    document.getElementById("set_t2").innerHTML = localStorage.getItem("set_t2_local");      
}
    
//take photo for teams logo------------------------------------------------------------------------------------------------------------

var streaming = false,
    video        = document.querySelector('#video'),
    canvas       = document.querySelector('#canvasA'),
    photo        = document.querySelector('#photo'),
    startbuttonA  = document.querySelector('#startbuttonA'),
    startbuttonB  = document.querySelector('#startbuttonB'),
    width = 50,
    height = 50;

  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    
      function(err) {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data); 
    
    
  }

startbuttonA.addEventListener('click', function(ev){
    canvas=document.querySelector('#canvasA')
    takepicture();
    ev.preventDefault();
  }, false);

startbuttonB.addEventListener('click', function(ev){
    canvas=document.querySelector('#canvasB')
    takepicture();
    ev.preventDefault();
  }, false);




