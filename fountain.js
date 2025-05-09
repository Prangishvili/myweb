// Mouse fountain effect
const imageUrl = 'assets/fiso.png';
document.addEventListener('mousemove', (e) => {
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