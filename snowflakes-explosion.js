(function(window) {
  'use strict';

  window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           function(callback) {
             window.setTimeout(callback, 1000 / 60);
           };
  })();

  function StrawberryBurst(canvasId) {
    this.canvas = document.querySelector(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.particles = [];

    this.bindEvents();
    this.animate();
  }

  StrawberryBurst.prototype.bindEvents = function() {
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    });

    this.canvas.addEventListener('click', (e) => {
      this.explode(e.clientX, e.clientY);
    });
  };

  StrawberryBurst.prototype.explode = function(x, y) {
    const count = 30;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 40 + 30,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.01
      });
    }
  };

  StrawberryBurst.prototype.animate = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2; // gravity
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      } else {
        this.ctx.globalAlpha = p.alpha;
        this.ctx.font = `${p.size}px serif`;
        this.ctx.fillText("🍓", p.x, p.y);
        this.ctx.globalAlpha = 1;
      }
    });

    requestAnimFrame(() => this.animate());
  };

  window.addEventListener('DOMContentLoaded', () => {
    new StrawberryBurst('#canvas');
  });

})(window); 