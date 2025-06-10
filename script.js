// Aguarda o conteúdo da página carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO CONTADOR ---
    const dataInicio = new Date('2024-07-08T16:30:00');
  
    const spanAnos = document.getElementById('anos');
    const spanMeses = document.getElementById('meses');
    const spanDias = document.getElementById('dias');
    const spanHoras = document.getElementById('horas');
    const spanMinutos = document.getElementById('minutos');
    const spanSegundos = document.getElementById('segundos');
  
    function atualizarContador() {
      const agora = new Date();
      
      let anos = agora.getFullYear() - dataInicio.getFullYear();
      let meses = agora.getMonth() - dataInicio.getMonth();
      let dias = agora.getDate() - dataInicio.getDate();
      let horas = agora.getHours() - dataInicio.getHours();
      let minutos = agora.getMinutes() - dataInicio.getMinutes();
      let segundos = agora.getSeconds() - dataInicio.getSeconds();
  
      if (segundos < 0) {
        segundos += 60;
        minutos--;
      }
      if (minutos < 0) {
        minutos += 60;
        horas--;
      }
      if (horas < 0) {
        horas += 24;
        dias--;
      }
      if (dias < 0) {
        const ultimoDiaDoMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
        dias += ultimoDiaDoMesAnterior;
        meses--;
      }
      if (meses < 0) {
        meses += 12;
        anos--;
      }
      
      spanAnos.textContent = anos;
      spanMeses.textContent = meses;
      spanDias.textContent = dias;
      spanHoras.textContent = horas < 10 ? '0' + horas : horas;
      spanMinutos.textContent = minutos < 10 ? '0' + minutos : minutos;
      spanSegundos.textContent = segundos < 10 ? '0' + segundos : segundos;
    }
  
    setInterval(atualizarContador, 1000);
    atualizarContador();
  
  
    // --- LÓGICA DO PLAYER DE MÚSICA ESTILO SPOTIFY ---
  
    // --- INSTRUÇÃO: Personalize as informações da sua música aqui! ---
    const trackConfig = {
      title: "Religião",
      artist: "Jão",
      audioSrc: "religião.mp3", // Ex: "minha-musica.mp3"
      artSrc: "https://i.scdn.co/image/ab67616d0000b27309db791ec9bc25a6b4151588" // Link para a imagem da capa
    };
    // ----------------------------------------------------------------
  
    const audio = document.getElementById('musica-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const progressBar = document.getElementById('progress-bar');
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');
    const trackTitleEl = document.getElementById('track-title');
    const trackArtistEl = document.getElementById('track-artist');
    const albumArtEl = document.querySelector('.album-art');
  
    function loadTrack(track) {
      trackTitleEl.textContent = track.title;
      trackArtistEl.textContent = track.artist;
      audio.src = track.audioSrc;
      albumArtEl.src = track.artSrc;
    }
  
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
  
    function togglePlayPause() {
      if (audio.paused) {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      } else {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    }
  
    function updateProgress() {
      const { duration, currentTime } = audio;
      const progressPercent = (currentTime / duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
      currentTimeEl.textContent = formatTime(currentTime);
    }
    
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        
        if(duration) {
            audio.currentTime = (clickX / width) * duration;
        }
    }
    
    playPauseBtn.addEventListener('click', togglePlayPause);
    audio.addEventListener('timeupdate', updateProgress);
    progressBarContainer.addEventListener('click', setProgress);
    
    audio.addEventListener('loadedmetadata', () => {
        totalDurationEl.textContent = formatTime(audio.duration);
    });
    
    audio.addEventListener('ended', () => {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
      progressBar.style.width = '0%';
      currentTimeEl.textContent = "0:00";
    });
    
    loadTrack(trackConfig);
    
  
  });