document.addEventListener('DOMContentLoaded', () => {

  // --- LÓGICA DO CONTADOR DE TEMPO ---
  const dataInicio = new Date('2024-07-08T16:30:00');
  const spanAnos = document.getElementById('anos');
  const spanMeses = document.getElementById('meses');
  const spanDias = document.getElementById('dias');
  const spanHoras = document.getElementById('horas');
  const spanMinutos = document.getElementById('minutos');
  const spanSegundos = document.getElementById('segundos');

  if (spanAnos) { // Garante que o código do contador só rode se os elementos existirem
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
  }


  // --- LÓGICA DO SLIDESHOW DA GALERIA (VERSÃO RESPONSIVA) ---
  const galeriaDeFotos = [
    // INSTRUÇÃO: Adicione, remova ou reordene os links das suas fotos aqui.
    "https://images.unsplash.com/photo-1559523161-0d00522893d3?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1530099486328-e021101a494a?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523900533314-542617fdd336?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554188248-986adbb73373?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542337828-44-dee658934546?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529286448737-6a4a21160356?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502418388593-3b0921a24343?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1569426850990-639409867568?q=80&w=1974&auto=format&fit=crop"
  ];

  const galleryColumns = document.querySelectorAll('.gallery-column');
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (galleryColumns.length > 0 && galeriaDeFotos.length > 0) {
      if (isMobile) {
          galeriaDeFotos.forEach((fotoUrl, index) => {
              const img = document.createElement('img');
              img.src = fotoUrl;
              img.alt = `Memória ${index + 1}`;
              img.className = 'gallery-photo';
              galleryColumns[0].appendChild(img);
          });
      } else {
          galeriaDeFotos.forEach((fotoUrl, index) => {
              const columnIndex = index % galleryColumns.length;
              const img = document.createElement('img');
              img.src = fotoUrl;
              img.alt = `Memória ${index + 1}`;
              img.className = 'gallery-photo';
              galleryColumns[columnIndex].appendChild(img);
          });
      }

      const columnData = [];
      galleryColumns.forEach((column) => {
          const photos = column.querySelectorAll('.gallery-photo');
          if (photos.length > 0) {
              photos[0].classList.add('is-active');
              columnData.push({ photos: photos, currentIndex: 0 });
          }
      });

      const changePhoto = (colIndex) => {
          const data = columnData[colIndex];
          if (!data || data.photos.length < 2) return;
          data.photos[data.currentIndex].classList.remove('is-active');
          data.currentIndex = (data.currentIndex + 1) % data.photos.length;
          data.photos[data.currentIndex].classList.add('is-active');
      };

      if (isMobile) {
          setInterval(() => changePhoto(0), 5000);
      } else {
          setInterval(() => changePhoto(0), 5000); 
          setTimeout(() => setInterval(() => changePhoto(1), 5000), 1000);
          setTimeout(() => setInterval(() => changePhoto(2), 5000), 2000);
      }
  }


  // --- LÓGICA DO PLAYER DE MÚSICA ---
  const trackConfig = {
    title: "Religião",
    artist: "Jão",
    audioSrc: "religiao.mp3", // Link de teste
    artSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4WlKs6c-tc2Oo0tTknui4ReQq7_8ovmxHafSsS7XuiDdh2VNXbtwGlt_&s=10"
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

  if (musica) { // Garante que o código do player só rode se os elementos existirem
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
  }
  

  /* SUBSTITUA O BLOCO DE REVELAÇÃO ANTIGO POR ESTA VERSÃO FINAL */

// --- LÓGICA DE REVELAÇÃO DO PLAYER (VERSÃO FINAL E CORRIGIDA) ---
const revealBtn = document.getElementById('reveal-player-btn');
const playerWrapper = document.getElementById('player-wrapper');
const revealContainer = document.querySelector('.reveal-button-container'); // Seleciona o contêiner

// A verificação agora inclui o novo contêiner
if (revealBtn && playerWrapper && revealContainer) {
    revealBtn.addEventListener('click', () => {
        
        // 1. Apenas executa a animação visual para revelar o player
        playerWrapper.classList.add('revealed');
        
        // 2. Esconde o CONTÊINER inteiro do botão para remover o espaço
        revealContainer.style.display = 'none';
        
    }, { once: true }); // O evento só acontece uma vez, o que é perfeito
}
