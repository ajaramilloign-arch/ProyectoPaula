const playlist = [
  { src: 'audios/HáblamedeTi.mp3', title: 'Háblame de Ti' },
  { src: 'audios/Almas De Barrio - Tan Solo Vamos - Live Session [Audio Directo].mp3', title: 'Almas De Barrio - Tan Solo Vamos' },
  { src: 'audios/Andrés Parra - 1500 Vidas (Video Lyric).mp3', title: 'Andrés Parra - 1500 Vidas' },
  { src: 'audios/JESSE & JOY - Lo Nuestro Vale Más (Video Oficial).mp3', title: 'Jesse & Joy - Lo Nuestro Vale Más' },
  { src: 'audios/Kilómetros - Jisa (Video Performance).mp3', title: 'Jisa - Kilómetros' },
  { src: 'audios/Laura Pérez - Sumerce.mp3', title: 'Laura Pérez - Sumerce' },
  { src: 'audios/Luis Fonsi - Aqui Estoy Yo ft. Aleks Syntek, Noel Schajris, David Bisbal.mp3', title: 'Luis Fonsi - Aquí Estoy Yo' },
  { src: 'audios/Mas Que Novios (1).mp3', title: 'Mas Que Novios (1)' },
  { src: 'audios/Mas Que Novios.mp3', title: 'Mas Que Novios' },
  { src: 'audios/Mateo Rey  Ojitos (Official Video).mp3', title: 'Mateo Rey - Ojitos' },
  { src: 'audios/Mickey Taveras - Me Gustas Tanto (Official Lyric Video).mp3', title: 'Mickey Taveras - Me Gustas Tanto' },
  { src: 'audios/Reik - Pero Te Conocí (Letra).mp3', title: 'Reik - Pero Te Conocí' },
  { src: 'audios/Sebastián Yatra - Cómo Mirarte (LetraLyrics).mp3', title: 'Sebastián Yatra - Cómo Mirarte' },
  { src: 'audios/Solo Tu Acustico - Al2 El Aldeano.mp3', title: 'Solo Tú Acústico - Al2 El Aldeano' },
  { src: 'audios/Micro TDH - Cafuné (Vídeo Oficial).mp3', title: 'Micro TDH - Cafuné' },
  { src: 'audios/Zona Ganjah - Dos Que Brillamos (con letra).mp3', title: 'Zona Ganjah - Dos Que Brillamos' }
];
let currentIndex = 0;
const audio = document.getElementById('fondoAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const volumeBar = document.getElementById('volumeBar');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');
const tituloCancion = document.getElementById('tituloCancion');

function loadSong(index) {
  audio.src = playlist[index].src;
  tituloCancion.textContent = playlist[index].title;
  audio.load();
}

function playSong() {
  audio.play().then(() => {
    playPauseBtn.textContent = '⏸';
  }).catch(error => {
    console.warn('No se pudo reproducir el audio:', error);
    playPauseBtn.textContent = '▶';
  });
}

function pauseSong() {
  audio.pause();
  playPauseBtn.textContent = '▶';
}

function nextSong() {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
  playSong();
}

function prevSong() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex);
  playSong();
}

function updateProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress || 0;
  currentTimeSpan.textContent = formatTime(audio.currentTime);
}

function setProgress() {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
}

function setVolume() {
  audio.volume = volumeBar.value / 100;
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

audio.addEventListener('loadedmetadata', () => {
  durationSpan.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', updateProgress);

audio.addEventListener('ended', nextSong);

audio.addEventListener('error', () => {
  console.error('Error al cargar el audio:', audio.currentSrc, audio.error);
});

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
progressBar.addEventListener('input', setProgress);
volumeBar.addEventListener('input', setVolume);

loadSong(currentIndex);
setVolume();

function irABienvenida() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("bienvenida").classList.remove("hidden");
  document.getElementById("reproductor").style.display = "block";
  playSong();
}

function mostrarSeccion(seccionId) {
  // Ocultar todas las secciones de contenido
  const secciones = document.querySelectorAll(".seccion-contenido");
  secciones.forEach(sec => sec.classList.add("hidden"));
  
  // Ocultar el menú de bienvenida
  document.getElementById("bienvenida").classList.add("hidden");
  
  // Mostrar la sección seleccionada
  document.getElementById(seccionId).classList.remove("hidden");
}

function volverAlMenu() {
  // Ocultar todas las secciones de contenido
  const secciones = document.querySelectorAll(".seccion-contenido");
  secciones.forEach(sec => sec.classList.add("hidden"));
  
  // Mostrar el menú de bienvenida
  document.getElementById("bienvenida").classList.remove("hidden");
}

function entrar() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("contenido").classList.remove("hidden");
  playSong();
}

// Contador
function actualizarContador() {
  const inicio = new Date("2024-05-05");
  const hoy = new Date();

  const dias = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));

  document.getElementById("contador").innerHTML =
    `Han pasado ${dias} días desde que empezó nuestra historia ❤️`;
}

actualizarContador();
function mostrarCarta() {
  document.getElementById("carta").classList.remove("hidden");
}
function abrirMensajeEspecial() {
  window.location.href = "mensaje.html";
}
function abrirMensajeDiciembre() {
  window.location.href = "mensaje-diciembre.html";
}
function abrirMensajeCumple() {
  window.location.href = "mensaje-cumple.html";
}
function abrirMensajeAniversario() {
  window.location.href = "mensaje-aniversario.html";
}
function abrirHistoria() {
  document.getElementById("contenido").style.display = "none";
  document.getElementById("historiaExtra").classList.remove("hidden");
}

function volver() {
  document.getElementById("historiaExtra").classList.add("hidden");
  document.getElementById("contenido").style.display = "block";
}
function abrirHistoria() {
  document.getElementById("contenido").style.display = "none";
  document.getElementById("historiaExtra").classList.remove("hidden");

  document.body.style.background = "linear-gradient(135deg, #141e30, #243b55)";
}

function volver() {
  document.getElementById("historiaExtra").classList.add("hidden");
  document.getElementById("contenido").style.display = "block";

  document.body.style.background = "linear-gradient(135deg, #2b1055, #7597de)";
}