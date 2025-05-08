function showPopup() {
  alert("Levisi");
}

window.onload = () => {
  const title = document.getElementById("title");
  const text = title.textContent;
  title.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.textContent = text[i];
    span.style.animationDelay = `${i * 0.1}s`;
    title.appendChild(span);
  }
}
