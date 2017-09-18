
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

