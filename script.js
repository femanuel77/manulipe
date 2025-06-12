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

// --- LÓGICA DE REVELAÇÃO DO PLAYER (VERSÃO CORRIGIDA) ---
document.addEventListener('DOMContentLoaded', () => {
    // ... (O código de diagnóstico do player de música que fizemos antes pode estar aqui, não tem problema)
    
    const revealBtn = document.getElementById('reveal-player-btn');
    const playerWrapper = document.getElementById('player-wrapper');
    const musica = document.getElementById('musica-player'); 
    
    // NOVO: Selecionamos também o contêiner do botão
    const revealContainer = document.querySelector('.reveal-button-container');

    // Verifica se os elementos necessários existem
    if(revealBtn && playerWrapper && musica && revealContainer) {
        revealBtn.addEventListener('click', () => {
            
            const playPromise = musica.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Sucesso ao tocar
                    document.getElementById('play-icon').style.display = 'none';
                    document.getElementById('pause-icon').style.display = 'block';
                }).catch(error => {
                    // Falha (bloqueio do navegador), o usuário terá que clicar no play do player
                    console.error("FALHA: O navegador bloqueou a reprodução automática. Erro:", error);
                });
            }

            // A animação visual acontece independentemente do sucesso do áudio
            playerWrapper.classList.add('revealed');
            
            // MUDANÇA PRINCIPAL: Escondemos o contêiner inteiro, e não só o botão
            revealContainer.style.display = 'none'; 
            
        }, { once: true });
    }
});



// --- LÓGICA DO SLIDESHOW DA GALERIA (VERSÃO RESPONSIVA) ---
document.addEventListener('DOMContentLoaded', () => {

    // --- INSTRUÇÃO: AQUI FICA SUA LISTA DE FOTOS! ---
    const galeriaDeFotos = [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbyXH4dY3Dr8CszZNCwj3GyFc6LMVfQVGQkQi4B1wFtp8NJj9Fs7PLW7tA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwSValt4a1hK3EGAuhKGdVKyVq5jZ_3rqYTodwF-S9E_NJlwZvyTVIIRE&s=10",
      "https://images.unsplash.com/photo-1523900533314-542617fdd336?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554188248-986adbb73373?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542337828-44-dee658934546?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529286448737-6a4a21160356?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502418388593-3b0921a24343?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1569426850990-639409867568?q=80&w=1974&auto=format&fit=crop"
    ];
    // -----------------------------------------------------------

    const columns = document.querySelectorAll('.gallery-column');
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (columns.length > 0 && galeriaDeFotos.length > 0) {
        // 1. Distribui as fotos de acordo com o tamanho da tela
        if (isMobile) {
            // Se for mobile, joga TODAS as fotos na primeira coluna
            galeriaDeFotos.forEach((fotoUrl, index) => {
                const img = document.createElement('img');
                img.src = fotoUrl;
                img.alt = `Memória ${index + 1}`;
                img.className = 'gallery-photo';
                columns[0].appendChild(img);
            });
        } else {
            // Se for desktop, distribui nas três colunas
            galeriaDeFotos.forEach((fotoUrl, index) => {
                const columnIndex = index % columns.length;
                const img = document.createElement('img');
                img.src = fotoUrl;
                img.alt = `Memória ${index + 1}`;
                img.className = 'gallery-photo';
                columns[columnIndex].appendChild(img);
            });
        }

        // 2. Inicia a lógica do slideshow (agora com as fotos corretas)
        const columnData = [];
        columns.forEach((column) => {
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

        // Inicia os slideshows
        if (isMobile) {
            // No mobile, só precisamos do slideshow da primeira coluna
            setInterval(() => changePhoto(0), 5000);
        } else {
            // No desktop, iniciamos os três com o escalonamento
            setInterval(() => changePhoto(0), 5000); 
            setTimeout(() => setInterval(() => changePhoto(1), 5000), 1000);
            setTimeout(() => setInterval(() => changePhoto(2), 5000), 2000);
        }
    }
});
