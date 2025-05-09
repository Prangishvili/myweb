// fountain.js

// Inject styles into the document
const style = document.createElement('style');
style.textContent = `
  .fountain-img {
    position: absolute;
    width: 200px;
    height: 200px;
    pointer-events: none;
    transform: translate(-50%, -50%);
    animation: fallWithGravity 2s ease-in forwards;
  }

  @keyframes fallWithGravity {
    0% {
      opacity: 1;
      transform: translate(-50%, -150%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, 300px) scale(0.6);
    }
  }
`;
document.head.appendChild(style);

// Fountain logic
let lastDrop = 0;
const dropInterval = 150; // ms between drops
const imageUrl = 'assets/fiso.png';

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastDrop < dropInterval) return;
  lastDrop = now;

  const img = document.createElement('img');
  img.src = imageUrl;
  img.className = 'fountain-img';
  img.style.left = `${e.pageX}px`;
  img.style.top = `${e.pageY}px`;

  document.body.appendChild(img);

  setTimeout(() => {
    img.remove();
  }, 2000);
});