document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // BLOCO 1: LÓGICA DA TELA DE SURPRESA (SPLASH SCREEN)
    // ======================================================
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const enterButton = document.getElementById('enter-button');

    if (splashScreen && mainContent && enterButton) {
        enterButton.addEventListener('click', () => {
            splashScreen.classList.add('hidden');
            mainContent.classList.add('visible');
        }, { once: true });
    }

    // ======================================================
    // BLOCO 2: LÓGICA DO CONTADOR DE TEMPO
    // ======================================================
    const dataInicio = new Date('2024-07-08T16:00:00');
    const spanAnos = document.getElementById('anos');
    const spanMeses = document.getElementById('meses');
    const spanDias = document.getElementById('dias');
    const spanHoras = document.getElementById('horas');
    const spanMinutos = document.getElementById('minutos');
    const spanSegundos = document.getElementById('segundos');

    if (spanAnos) {
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

    // ======================================================
    // BLOCO 3: LÓGICA DO SLIDESHOW DA GALERIA (ALEATÓRIO)
    // ======================================================
    const galeriaDeFotos = [
        "imagens/1.jpg", "imagens/2.jpg", "imagens/3.jpg", "imagens/4.jpg", "imagens/5.jpg", "imagens/6.jpg", "imagens/7_b.jpg", "imagens/8.jpg", "imagens/9.jpg", "imagens/10.jpg", "imagens/11.jpg", "imagens/12.jpg", "imagens/13.jpg", "imagens/14.jpg", "imagens/15.jpg", "imagens/16.jpg", "imagens/17.jpg", "imagens/18.jpg", "imagens/19.jpg", "imagens/20.jpg", "imagens/21.jpg", "imagens/22.jpg", "imagens/23.jpg", "imagens/24.jpg", "imagens/25.jpg",
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffleArray(galeriaDeFotos);

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
        
        // CORREÇÃO: Os timers do slideshow voltam para cá, para iniciar quando a página carregar.
        if (isMobile) {
            if (columnData.length > 0) setInterval(() => changePhoto(0), 6000);
        } else {
            if (columnData.length > 0) setInterval(() => changePhoto(0), 6000); 
            if (columnData.length > 1) setTimeout(() => setInterval(() => changePhoto(1), 6000), 1000);
            if (columnData.length > 2) setTimeout(() => setInterval(() => changePhoto(2), 6000), 2000);
        }
    }

    // ======================================================
    // BLOCO 4: LÓGICA DO PLAYER DE MÚSICA
    // ======================================================
    const trackConfig = {
        title: "Religião",
        artist: "Jão",
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

    if (musica) {
        function loadTrack(track) {
            if (trackTitleEl) trackTitleEl.textContent = track.title;
            if (trackArtistEl) trackArtistEl.textContent = track.artist;
            if (musica) musica.src = track.audioSrc;
            if (albumArtEl) albumArtEl.src = track.artSrc;
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
      
        if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
        musica.addEventListener('timeupdate', updateProgress);
        if (progressBarContainer) progressBarContainer.addEventListener('click', setProgress);
        
        musica.addEventListener('loadedmetadata', () => {
            if (totalDurationEl) totalDurationEl.textContent = formatTime(musica.duration);
        });
        
        musica.addEventListener('ended', () => {
            if(playIcon) playIcon.style.display = 'block';
            if(pauseIcon) pauseIcon.style.display = 'none';
        });
        
        loadTrack(trackConfig);
    }
    
    // ======================================================
    // BLOCO 5: LÓGICA DE REVELAÇÃO DO PLAYER
    // ======================================================
    const revealBtn = document.getElementById('reveal-player-btn');
    const playerWrapper = document.getElementById('player-wrapper');
    const revealContainer = document.querySelector('.reveal-button-container');

    if (revealBtn && playerWrapper && revealContainer) {
        revealBtn.addEventListener('click', () => {
            playerWrapper.classList.add('revealed');
            revealContainer.style.display = 'none';
            if (musica && musica.paused) {
                musica.play().catch(error => {
                    console.error("Autoplay bloqueado pelo navegador:", error);
                });
                if(playIcon) playIcon.style.display = 'none';
                if(pauseIcon) pauseIcon.style.display = 'block';
            }
        }, { once: true });
    }

});
