Element.prototype.hide = function() {
  this.classList.add('hide');
};
Element.prototype.show = function() {
  this.classList.remove('hide');
};

const loadingBar = document.querySelector('loading-bar');
const selectVideo = document.querySelector('#selectVideo');
const fileSelector = document.querySelector('#file');
const convertButton = document.querySelector('#convert');
const video = document.querySelector('#video');
const image = document.querySelector('#result');
const download = document.querySelector('#download');

selectVideo.addEventListener('click', function() {
  fileSelector.click();
});


fileSelector.addEventListener('change', function() {
  selectVideo.hide();
  convert.show();
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = e => {
      console.debug('File loaded');
      video.src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  } else {
    alert('Please select a file');
  }
});


video.addEventListener('canplay', () => {
  let timer = null;
  const intervalDelay = 1000 / 30;
  const gif = new GIF({
    workers: 5,
    workerScript: '/scripts/gif.worker.js',
    width: video.videoWidth,
    height: video.videoHeight
  });

  gif.on('finished', (blob) => {
    console.debug('rendering gif');
    image.src = URL.createObjectURL(blob);
    console.debug('gif finished');
    video.hide();
    result.show();
    loadingBar.hide();
    download.show();
  });

  const capture = () => {
    console.debug('capture');
    gif.addFrame(video, {copy: true, delay: intervalDelay});
  };

  video.addEventListener('play', () => {
    console.debug('video playing');
    clearInterval(timer);
    timer = setInterval(capture, intervalDelay);
  });

  video.addEventListener('ended', () => {
    gif.render();
    console.debug('video finished playing');
    clearInterval(timer);
  });

  convertButton.addEventListener('click', function() {
    loadingBar.show();
    convertButton.hide();
    video.show();
    video.play();
  });
});

download.addEventListener('click', function() {
  const url = image.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
  const element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', 'download.gif');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
});
