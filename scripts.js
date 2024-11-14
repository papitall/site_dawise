// Función genérica para desplazarse a un elemento por su ID

function scrollToElement(id) {
  var targetElement = document.getElementById(id);
  var targetPosition = targetElement.offsetTop;
  window.scrollTo(0, targetPosition);
}



// Función | MIRAR GRUPO DAWISE
function observeGrupoDawise() {
  const grupo1 = document.getElementById('grupo-1');
  const grupo2 = document.getElementById('grupo-2');
  const grupo3 = document.getElementById('grupo-3');
  const grupo4 = document.getElementById('grupo-4');
  const grupo5 = document.getElementById('grupo-5');
  const grupoDawise = document.getElementById('grupo-dawise');

  const observerOptions1 = {
      root: null, 
      threshold: 0.6 // 60%
  };

  const observerOptions2 = {
      root: null, 
      threshold: 0.6 // 60%
  };

  const observerOptions3 = {
      root: null, 
      threshold: 0.8 // 80%
  };

  const observerOptions4 = {
    root: null, 
    threshold: 0.8 // 80%
};

const observerOptions5 = {
  root: null, 
  threshold: 0.9 // 90%
};

  const observer1 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // si el elemento es visible.
              grupo1.classList.remove('start');
              grupo1.classList.add('animate');
          } else {
              // si el elemento no es visible (pantalla).
              grupo1.classList.remove('animate');
              grupo1.classList.add('start');
          }
      });
  }, observerOptions1);

  const observer2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // si el elemento es visible.
              grupo2.classList.remove('start');
              grupo2.classList.add('animate');
          } else {
              // si el elemento no es visible (pantalla).
              grupo2.classList.remove('animate');
              grupo2.classList.add('start');
          }
      });
  }, observerOptions2);

  const observer3 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // si el elemento es visible.
              grupo3.classList.remove('start');
              grupo3.classList.add('animate');
          } else {
              // si el elemento no es visible (pantalla).
              grupo3.classList.remove('animate');
              grupo3.classList.add('start');
          }
      });
  }, observerOptions3);

  const observer4 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // si el elemento es visible.
            grupo4.classList.remove('start');
            grupo4.classList.add('animate');
        } else {
            // si el elemento no es visible (pantalla).
            grupo4.classList.remove('animate');
            grupo4.classList.add('start');
        }
    });
}, observerOptions4);

const observer5 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          // si el elemento es visible.
          grupo5.classList.remove('start');
          grupo5.classList.add('animate');
      } else {
          // si el elemento no es visible (pantalla).
          grupo5.classList.remove('animate');
          grupo5.classList.add('start');
      }
  });
}, observerOptions5);

    observer1.observe(grupoDawise);
    observer2.observe(grupoDawise);
    observer3.observe(grupoDawise);
    observer4.observe(grupoDawise);
    observer5.observe(grupoDawise);
  }


  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('grupo-1').classList.add('start');
    document.getElementById('grupo-2').classList.add('start');
    document.getElementById('grupo-3').classList.add('start');
    document.getElementById('grupo-4').classList.add('start');
    document.getElementById('grupo-5').classList.add('start');
    observeGrupoDawise();
  });


// --------------- AUDIO PLAYER ---------------
{
  class AudioPlayer extends HTMLElement {
    playing = false;
    volume = 1;
    prevVolume = 1;
    initialized = false;
    barWidth = 3;
    barGap = 1;
    bufferPercentage = 75;
    nonAudioAttributes = new Set(['title', 'bar-width', 'bar-gap', 'buffer-percentage']);
    
    constructor() {
      super();
      
      this.attachShadow({mode: 'open'});
      this.render();
    }
    
    static get observedAttributes() {
      return [
        // audio tag attributes
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
        'src', 'muted', 'crossorigin', 'loop', 'preload', 'autoplay',
        // the name of the audio
        'title',
        // the size of the frequency bar
        'bar-width',
        // the size of the gap between the bars
        'bar-gap',
        // the percentage of the frequency buffer data to represent
        // if the dataArray contains 1024 data points only a percentage of data will
        // be used to draw on the canvas
        'buffer-percentage'
      ];
    }
    
    async attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'src':
          this.initialized = false;
          this.render();
          this.initializeAudio();
          break;
        case 'muted':
          this.toggleMute(Boolean(this.audio?.getAttribute('muted')));
          break;
        case 'title':
          this.titleElement.textContent = newValue;
          break;
        case 'bar-width':
          this.barWidth = Number(newValue) || 3;
          break;
        case 'bar-gap':
          this.barGap = Number(newValue) || 1;
          break;
        case 'buffer-percentage':
          this.bufferPercentage = Number(newValue) || 75;
          break;
        default:
      }
      
      this.updateAudioAttributes(name, newValue);
    }
    
    updateAudioAttributes(name, value) {
      if (!this.audio || this.nonAudioAttributes.has(name)) return;
      
      // if the attribute was explicitly set on the audio-player tag
      // set it otherwise remove it
      if (this.attributes.getNamedItem(name)) {
        this.audio.setAttribute(name, value ?? '')
      } else {
        this.audio.removeAttribute(name);
      }
    }
    
    initializeAudio() {
      if (this.initialized) return;
      
      this.initialized = true;
      
      this.audioCtx = new AudioContext();
      this.gainNode = this.audioCtx.createGain();
      this.analyserNode = this.audioCtx.createAnalyser();
      this.track = this.audioCtx.createMediaElementSource(this.audio);
      
      this.analyserNode.fftSize = 2048;
      this.bufferLength = this.analyserNode.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);
      this.analyserNode.getByteFrequencyData(this.dataArray);
      
      this.track
        .connect(this.gainNode)
        .connect(this.analyserNode)
        .connect(this.audioCtx.destination);
      
      this.changeVolume();
    }
    
    updateFrequency() {
      if (!this.playing) return;
      
      this.analyserNode.getByteFrequencyData(this.dataArray);
      
      this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.canvasCtx.fillStyle = "rgba(0, 0, 0, 0)";
      this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      const barCount = (this.canvas.width / (this.barWidth + this.barGap)) - this.barGap;
      const bufferSize = (this.bufferLength * this.bufferPercentage) / 100;
      let x = 0;
      
      // this is a loss representation of the frequency
      // some data are loss to fit the size of the canvas
      for (let i = 0; i < barCount; i++) {
        // get percentage of i value
        const iPerc = Math.round((i * 100) / barCount);
        // what the i percentage maps to in the frequency data
        const pos = Math.round((bufferSize * iPerc) / 65);
        const frequency = this.dataArray[pos];
        // frequency value in percentage
        const frequencyPerc = (frequency * 200) / 255;
        // frequency percentage value in pixel in relation to the canvas height
        const barHeight = (frequencyPerc * this.canvas.height) / 100;
        // flip the height so the bar is drawn from the bottom
        const y = this.canvas.height - barHeight;
        
        this.canvasCtx.fillStyle = `rgba(${frequency * 100}, 255, 255, 0.5)`;
        this.canvasCtx.fillRect(x, y, this.barWidth, barHeight);
        
        x += (this.barWidth + this.barGap);
      }
      
      requestAnimationFrame(this.updateFrequency.bind(this))
    }
    
    attachEvents() {
      this.volumeBar.parentNode.addEventListener('click', e => {
        if (e.target === this.volumeBar.parentNode) {
          this.toggleMute();
        }
      }, false);
      
      this.playPauseBtn.addEventListener('click', this.togglePlay.bind(this), false);
      
      this.volumeBar.addEventListener('input', this.changeVolume.bind(this), false);
      
      this.progressBar.addEventListener('input', (e) => this.seekTo(this.progressBar.value), false);
      
      this.audio.addEventListener('loadedmetadata', () => {
        this.progressBar.max = this.audio.duration;
        this.durationEl.textContent = this.getTimeString(this.audio.duration);
        this.updateAudioTime();
      })
      
      this.audio.addEventListener('error', (e) => {
        this.titleElement.textContent = this.audio.error.message;
        this.playPauseBtn.disabled = true;
      })
      
      this.audio.addEventListener('timeupdate', () => {
        this.updateAudioTime(this.audio.currentTime);
      })
      
      this.audio.addEventListener('ended', () => {
        this.playing = false;
        this.playPauseBtn.textContent = 'play';
        this.playPauseBtn.classList.remove('playing');
      }, false);
      
      this.audio.addEventListener('pause', () => {
        this.playing = false;
        this.playPauseBtn.textContent = 'play';
        this.playPauseBtn.classList.remove('playing');
      }, false);
      
      this.audio.addEventListener('play', () => {
        this.playing = true;
        this.playPauseBtn.textContent = 'pause';
        this.playPauseBtn.classList.add('playing');
        this.updateFrequency();
      }, false);
    }
    
    async togglePlay() {
      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }
      
      if (this.playing) {
        return this.audio.pause();
      }
      
      return this.audio.play();
    }
    
    getTimeString(time) {
      const secs = `${parseInt(`${time % 60}`, 10)}`.padStart(2, '0');
      const min = parseInt(`${(time / 60) % 60}`, 10);
  
      return `${min}:${secs}`;
    }
    
    changeVolume() {
      this.volume = Number(this.volumeBar.value);
      
      if (Number(this.volume) > 1) {
        this.volumeBar.parentNode.className = 'volume-bar over';
      } else if (Number(this.volume) > 0) {
        this.volumeBar.parentNode.className = 'volume-bar half';
      } else {
        this.volumeBar.parentNode.className = 'volume-bar';
      }
      
      if (this.gainNode) {
        this.gainNode.gain.value = this.volume;
      }
    }
    
    toggleMute(muted = null) {
      this.volumeBar.value = muted || this.volume === 0 ? this.prevVolume : 0;
      this.changeVolume();
    }
    
    seekTo(value) {
      this.audio.currentTime = value;
    }
    
    updateAudioTime() {
      this.progressBar.value = this.audio.currentTime;
      this.currentTimeEl.textContent = this.getTimeString(this.audio.currentTime);
    }
    
    style() {
      return `
      <style>
        :host {
          width: 100%;
          max-width: 400px;
          font-family: sans-serif;
        }
        
        * {
            box-sizing: border-box;
        }

        @keyframes move_audio_name {
          0% {
            padding: 5px 10px;
            color: #fffff800;
          }
          15% {
            color: #fffff8af;
          }
          65% {
            color: #fffff8af;
          }
          80% {
            padding: 5px 180px;
            color: #fffff800;
          }
          100% {
            padding: 5px 180px;
            color: #fffff800;
          }
        }
        
        .audio-player {
          background: #0002;
          border-radius: 5px;
          padding: 5px;
          color: #fff;
          display: flex;
          align-items: center;
          position: relative;
          margin: 0 0 25px;
        }
        
        .audio-name {
          position: absolute;
          color: #fff8;
          padding: 5px 10px;
          font-size: 12px;
          width: 100%;
          left: 0;
          z-index: 2;
          text-transform: capitalize;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-weight: 400;
          top: calc(100% + 2px);
          background: #1115;
          margin: 0;
          border-radius: 3px;
          animation: move_audio_name 10s linear infinite;
        }

        .audio-name:hover{
          color: #fff;
        }
        
        .play-btn {
          width: 30px;
          min-width: 30px;
          height: 30px;
          background: url("imagenes/botones-descargados/audio-player-icon-sprite.png") 0 center/500% 100% no-repeat;
          appearance: none;
          border: none;
          text-indent: -999999px;
          overflow: hidden;
          opacity: 0.5;
        }
        
        .play-btn.playing {
          background: url("imagenes/botones-descargados/audio-player-icon-sprite.png") 25% center/500% 100% no-repeat;
        }
        
        .volume-bar {
          width: 30px;
          min-width: 30px;
          height: 30px;
          background: url("imagenes/botones-descargados/audio-player-icon-sprite.png") 50% center/500% 100% no-repeat;
          position: relative;
          direction: rtl; /* Ajouter cette ligne pour inverser la direction de la barre */
          opacity: 0.5;
      }   
      
      .volume-bar:hover{
        opacity: 1;
      }

      .play-btn:hover{
        opacity: 1;
      }
        
        .volume-bar.half {
          background: url("imagenes/botones-descargados/audio-player-icon-sprite.png") 75% center/500% 100% no-repeat;
        }
        .volume-bar.over {
          background: url("imagenes/botones-descargados/audio-player-icon-sprite.png") 100% center/500% 100% no-repeat;
        }
        
        .volume-field {
          display: none;
          position: absolute;
          appearance: none;
          height: 10px;
          right: 100%;
          top: 50%;
          transform: translateY(-50%) rotate(180deg);
          z-index: 5;
          margin: 0;
          border-radius: 2px;
          background: #888888;
        }
        
        .volume-field::-webkit-slider-thumb {
          appearance: none;
          height: 10px;
          width: 10px;
          background: #ffffff;
        }
        
        .volume-field::-moz-range-thumb {
          appearance: none;
          height: 10px;
          width: 10px;
          background: #ffffff
        }
        
        .volume-field::-ms-thumb  {
          appearance: none;
          height: 20px;
          width: 10px;
          background: #6d78ff
        }
        
        .volume-bar:hover .volume-field {
          display: block;
        }
        
        .progress-indicator {
          display: flex;
          justify-content: flex-end;
          position: relative;
          flex: 1;
          font-size: 12px;
          align-items: center;
          height: 20px;
        }
        
        .progress-bar {
          flex: 1;
          position: absolute;
          top: 50%;
          left: 0;
          z-index: 2;
          transform: translateY(-50%);
          width: 100%;
          appearance: none;
          margin: 0;
          overflow: hidden;
          background: none;
        }
        
        .progress-bar::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 0;
          box-shadow: -300px 0 0 300px #ffffff38;
        }
        
        .progress-bar::-moz-range-thumb {
            appearance: none;
            height: 20px;
            width: 0;
            box-shadow: -300px 0 0 300px #ffffff21;
        }
        
        .progress-bar::-ms-thumb {
            appearance: none;
            height: 20px;
            width: 0;
            box-shadow: -300px 0 0 300px #ffffff21;
        }
        
        .duration,
        .current-time {
            position: relative;
            z-index: 1;
            text-shadow: 0 0 2px #111;
            opacity: 0.4;
        }
        
        .duration {
            margin-left: 2px;
            margin-right: 5px;
        }
        
        .duration::before {
            content: '/';
            display: inline-block;
            margin-right: 2px;
        }
        
        canvas {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            opacity: 0.4;
        }
      </style>
    `
    }
    
    render() {
      this.shadowRoot.innerHTML = `
        ${this.style()}
        <figure class="audio-player">
          <figcaption class="audio-name"></figcaption>
          <audio style="display: none"></audio>
          <button class="play-btn" type="button">play</button>
          <div class="progress-indicator">
              <span class="current-time">0:0</span>
              <input type="range" max="100" value="0" class="progress-bar">
              <span class="duration">0:00</span>
              <canvas class="visualizer" style="width: 100%; height: 20px"></canvas>
          </div>
          <div class="volume-bar">
              <input type="range" min="0" max="2" step="0.01" value="${this.volume}" class="volume-field">
          </div>
        </figure>
      `;
      
      this.audio = this.shadowRoot.querySelector('audio');
      this.playPauseBtn = this.shadowRoot.querySelector('.play-btn');
      this.titleElement = this.shadowRoot.querySelector('.audio-name');
      this.volumeBar = this.shadowRoot.querySelector('.volume-field');
      this.progressIndicator = this.shadowRoot.querySelector('.progress-indicator');
      this.currentTimeEl = this.progressIndicator.children[0];
      this.progressBar = this.progressIndicator.children[1];
      this.durationEl = this.progressIndicator.children[2];
      this.canvas = this.shadowRoot.querySelector('canvas');
      
      this.canvasCtx = this.canvas.getContext("2d");
      // support retina display on canvas for a more crispy/HD look
      const scale = window.devicePixelRatio;
      this.canvas.width = Math.floor(this.canvas.width* scale);
      this.canvas.height = Math.floor(this.canvas.height * scale);
      this.titleElement.textContent = this.attributes.getNamedItem('src')
        ? this.attributes.getNamedItem('title').value ?? 'untitled'
        : 'No Audio Source Provided';
      this.volumeBar.value = this.volume;
      
      // if rendering or re-rendering all audio attributes need to be reset
      for (let i = 0; i < this.attributes.length; i++) {
        const attr = this.attributes[i];
        this.updateAudioAttributes(attr.name, attr.value);
      }
      
      this.attachEvents();
    }
  }
  
  customElements.define('audio-player', AudioPlayer);
}


// --------------- VIDEO PLAYER ---------------
var iframe = document.querySelector('iframe.screen');
var firstVideoUrl = document.querySelector('.list_video ul li:first-child a').href;
iframe.src = firstVideoUrl;

// Sélectionnez tous les liens dans la liste vidéo
var links = document.querySelectorAll('.list_video ul li a');

// Ajoutez un écouteur d'événements à chaque lien
links.forEach(function(link) {
    link.addEventListener('click', function() {
        // Supprimer la classe "selected" de tous les éléments de la liste
        links.forEach(function(link) {
            link.parentElement.classList.remove('selected');
        });
        // Ajouter la classe "selected" à l'élément parent du lien sélectionné
        this.parentElement.classList.add('selected');
    });
});