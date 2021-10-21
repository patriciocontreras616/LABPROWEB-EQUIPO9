

  const canvas = document.getElementById('canvasbg');
  const ctx = canvas.getContext('2d');
  canvas.height      = window.innerHeight;
  canvas.width       = window.innerWidth;
  const canvasbg       = document.getElementById('canvasbg');
  const ctxbg          = canvasbg.getContext('2d');
  canvasbg.height    = window.innerHeight;
  canvasbg.width     = window.innerWidth;
  let aBubbles = [];
  let aBgBubbles = [];
  
  function addBubble() {
      aBubbles.push( new Bubble( 'rgb(255, 194, 194)', 12 ) );
  }
  function addBgBubble() {
      aBgBubbles.push( new Bubble( 'rgb(255, 255, 255)', 19) );
  }
  
  class Bubble {
      constructor ( color, ySpeed ) {
          this.radius     = (Math.random() * 150) + 0;
          this.life       = true;
          this.x          = (Math.random() * window.innerWidth);
          this.y          = (Math.random() * 60 + (window.innerHeight + this.radius)) ;
          this.vy         = ((Math.random() * 0.0002) + 0.0001) + ySpeed;
          this.vr         = 0;
          this.vx         = (Math.random() * 4) - 2;
          this.color      = color;
      }
      update () {
          this.vy += .00024;
          this.vr += .02;
          this.y -= this.vy;
          this.x += this.vx;
          if( this.radius > 1 )
              this.radius -= this.vr;
          if( this.radius <= 1 )
              this.life = false;
      }
      draw ( ctx ) {
          ctx.beginPath();    
          ctx.arc( this.x, this.y, this.radius, 0, 45 * Math.PI );
          ctx.fillStyle = this.color;
          ctx.fill();
      }
  }
  function update() {
      for (let i = aBubbles.length - 1; i >= 0; i--) {
              aBubbles[i].update();
              
              if( !aBubbles[i].life )
                  aBubbles.splice( i, 1 );
          }
          
          for (let i = aBgBubbles.length - 1; i >= 0; i--) {
              aBgBubbles[i].update();
              
              if( !aBgBubbles[i].life )
                  aBgBubbles.splice( i, 1 );
          }
          
          if( aBubbles.length < ( window.innerWidth / 4 ) )
              addBubble();
          
          if( aBgBubbles.length < ( window.innerWidth / 12 ) )
              addBgBubble();
  }
  function draw () {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctxbg.clearRect(0, 0, canvas.width, canvas.height);
      
          for (let i = aBgBubbles.length - 1; i >= 0; i--) {
              aBgBubbles[i].draw( ctxbg );
          }
          for (let i = aBubbles.length - 1; i >= 0; i--) {   
              aBubbles[i].draw( ctxbg );
          }
      }
  function animate () {
      update();
      draw();
      requestAnimationFrame( animate );
  }
  
  window.addEventListener('load', animate);
  window.addEventListener('resize', function(){
      canvas.height      = window.innerHeight;
      canvas.width       = window.innerWidth;
      canvasbg.height    = window.innerHeight;
      canvasbg.width     = window.innerWidth;
      let aBubbles = [];
      let aBgBubbles = [];
  });