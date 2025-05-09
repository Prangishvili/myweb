// Mouse fountain effect
const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1024px-Google_Images_2015_logo.svg.png';
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