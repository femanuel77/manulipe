// VERSÃO DE DIAGNÓSTICO
document.addEventListener('DOMContentLoaded', () => {

  // --- LÓGICA DO CONTADOR (sem alterações) ---
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

    if (segundos < 0) { segundos += 60; minutos--; }
    if (minutos < 0) { minutos += 60; horas--; }
    if (horas < 0) { horas += 24; dias--; }
    if (dias < 0) {
      const ultimoDiaDoMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
      dias += ultimoDiaDoMesAnterior;
      meses--;
    }
    if (meses < 0) { meses += 12; anos--; }
    
    spanAnos.textContent = anos;
    spanMeses.textContent = meses;
    spanDias.textContent = dias;
    spanHoras.textContent = horas < 10 ? '0' + horas : horas;
    spanMinutos.textContent = minutos < 10 ? '0' + minutos : minutos;
    spanSegundos.textContent = segundos < 10 ? '0' + segundos : segundos;
  }
  setInterval(atualizarContador, 1000);
  atualizarContador();

  // --- LÓGICA DO PLAYER DE MÚSICA (sem alterações) ---
  const trackConfig = {
    title: "Religião",
    artist: "Jão",
    // VOLTEI PARA O CAMINHO LOCAL, MAS PODE USAR O DE TESTE SE QUISER
    audioSrc: "religiao.mp3",
    artSrc: "https://i.scdn.co/image/ab67616d00001e0209db791ec9bc25a6b4151588"
  };

  const musica = document.getElementById('musica-player');
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
    musica.src = track.audioSrc;
    albumArtEl.src = track.artSrc;
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function togglePlayPause() {
    if (musica.paused) {
      musica.play();
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    } else {
      musica.pause();
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
  }

  function updateProgress() {
    if (musica.duration) {
      const progressPercent = (musica.currentTime / musica.duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
      currentTimeEl.textContent = formatTime(musica.currentTime);
    }
  }
  
  function setProgress(e) {
    if(musica.duration) {
      musica.currentTime = (e.offsetX / this.clientWidth) * musica.duration;
    }
  }
  
  playPauseBtn.addEventListener('click', togglePlayPause);
  musica.addEventListener('timeupdate', updateProgress);
  progressBarContainer.addEventListener('click', setProgress);
  
  musica.addEventListener('loadedmetadata', () => {
    totalDurationEl.textContent = formatTime(musica.duration);
  });
  
  musica.addEventListener('ended', () => {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  });
  
  loadTrack(trackConfig);

  // --- LÓGICA DE REVELAÇÃO DO PLAYER (VERSÃO DE DIAGNÓSTICO) ---
  const revealBtn = document.getElementById('reveal-player-btn');
  const playerWrapper = document.getElementById('player-wrapper');

  if(revealBtn && playerWrapper && musica) {
    revealBtn.addEventListener('click', () => {
      console.log("Botão de revelação clicado. Tentando tocar a música...");
      
      // Tentativa de tocar a música e "escutar" a resposta
      const playPromise = musica.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // SUCESSO: O navegador permitiu.
          console.log("SUCESSO: O navegador permitiu a reprodução.");
          playIcon.style.display = 'none';
          pauseIcon.style.display = 'block';
        }).catch(error => {
          // FALHA: O navegador bloqueou.
          console.error("FALHA: O navegador bloqueou a reprodução automática. Erro:", error);
          alert("Parece que o navegador bloqueou a música de tocar automaticamente. Por favor, clique no botão play do player para começar.");
        });
      }

      // A animação visual acontece independentemente do sucesso do áudio
      playerWrapper.classList.add('revealed');
      revealBtn.style.transition = 'opacity 0.3s ease';
      revealBtn.style.opacity = '0';
      revealBtn.style.pointerEvents = 'none'; 
    }, { once: true });
  }
});
/* ADICIONE ESTE NOVO BLOCO NO FINAL DO SEU JAVASCRIPT */

// --- LÓGICA DO SLIDESHOW DA GALERIA ---
document.addEventListener('DOMContentLoaded', () => {
    const columns = document.querySelectorAll('.gallery-column');

    if (columns.length > 0) {
        const columnData = [];

        columns.forEach((column, colIndex) => {
            const photos = column.querySelectorAll('.gallery-photo');
            if (photos.length > 0) {
                photos[0].classList.add('is-active'); // Ativa a primeira foto de cada coluna
                columnData.push({
                    photos: photos,
                    currentIndex: 0
                });
            }
        });

        const changePhoto = (colIndex) => {
            const data = columnData[colIndex];
            if (!data) return;

            // Esconde a foto atual
            data.photos[data.currentIndex].classList.remove('is-active');

            // Calcula o índice da próxima foto
            data.currentIndex = (data.currentIndex + 1) % data.photos.length;

            // Mostra a próxima foto
            data.photos[data.currentIndex].classList.add('is-active');
        };

        // Inicia os slideshows com o escalonamento que você pediu
        setInterval(() => changePhoto(0), 5000); // Coluna 1 muda a cada 5s
        setTimeout(() => setInterval(() => changePhoto(1), 5000), 1000); // Coluna 2 começa 1s depois
        setTimeout(() => setInterval(() => changePhoto(2), 5000), 2000); // Coluna 3 começa 2s depois
    }
});
