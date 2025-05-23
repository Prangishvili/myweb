// snowflakes.js

(function(window) {
  'use strict';

  // Cross-browser requestAnimationFrame
  window.requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame    ||
           function(callback) {
             window.setTimeout(callback, 1000 / 60);
           };
  })();

  function Snowflakes(el, opt) {
    opt = opt || {};
    this.canvas    = document.querySelector(el);
    this.context   = this.canvas.getContext('2d');
    this.num       = opt.num || 25;
    this.icon      = opt.icon || "*";
    this.color     = opt.color || "#fff";
    this.flakes    = [];
    this.angle     = 0;
    this.timeout   = null;

    this.create();
  }

  Snowflakes.prototype.dimensions = function() {
    this.width  = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width  = this.width;
    this.canvas.height = this.height;
  };

  Snowflakes.prototype.create = function() {
    this.dimensions();
    for (let i = 0; i < this.num; i++) {
      this.flakes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        s: Math.random() * 20,
        d: Math.random() * this.num
      });
    }
    this.draw();
  };

  Snowflakes.prototype.draw = function() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = this.color;

    for (let i = 0; i < this.num; i++) {
      let f = this.flakes[i];
      this.context.font = f.s + 'px Arial, sans serif';
      this.context.fillText(this.icon, f.x, f.y);
    }

    this.update();

    const that = this;
    requestAnimFrame(function() {
      that.draw();
    });

    window.addEventListener("resize", function() {
      if (that.timeout) clearTimeout(that.timeout);
      that.timeout = setTimeout(function() {
        that.dimensions();
      }, 100);
    });
  };

  Snowflakes.prototype.update = function() {
    this.angle += 0.005;
    for (let i = 0; i < this.num; i++) {
      let f = this.flakes[i];
      if (f.s < 7) f.s = 7;
      f.y += (Math.cos(this.angle + f.d) + 1 + f.s / 2) * 0.3;
      f.x += Math.sin(this.angle) * 1;

      if (f.x > this.width + 5 || f.x < -5 || f.y > this.height) {
        if (i % 3 > 0) {
          this.flakes[i] = {
            x: Math.random() * this.width,
            y: -10,
            s: f.s,
            d: f.d
          };
        } else {
          if (Math.sin(this.angle) > 0) {
            this.flakes[i] = {
              x: -5,
              y: Math.random() * this.height,
              s: f.s,
              d: f.d
            };
          } else {
            this.flakes[i] = {
              x: this.width + 5,
              y: Math.random() * this.height,
              s: f.s,
              d: f.d
            };
          }
        }
      }
    }
  };

  window.Snowflakes = Snowflakes;

})(window);

// Initialize on canvas element
window.addEventListener('DOMContentLoaded', () => {
  new Snowflakes('#canvas', {
    num: 50,
    icon: "🍓",
    color: "#fff"
  });
}); 