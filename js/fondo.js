"use strict";
// Fondo de la portada: un shader liviano con vetas de luz en los colores de marca (y un toque de cobre abajo).
// Lo carga app.js solo en escritorio, con movimiento permitido y sin ahorro de datos.
// Se dibuja a media resolución, a 30 cuadros por segundo como máximo y solo mientras la portada se ve.
(function () {
  const contenedor = document.querySelector(".hero-fondo[data-shader]");
  if (!contenedor) return;
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) return;
  contenedor.appendChild(canvas);

  const vertice = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
  const fragmento = `
    precision mediump float;
    uniform vec2 r; uniform float t; uniform vec2 m;
    float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
      return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+1.),f.x),f.y);}
    float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
    void main(){
      vec2 uv=gl_FragCoord.xy/r; vec2 p=uv; p.x*=r.x/r.y;
      float tt=t*.035;
      vec2 q=vec2(fbm(p*1.5+tt),fbm(p*1.5-tt+3.1));
      float f=fbm(p*1.7+q*1.5+vec2(tt*2.,-tt));
      float veta=smoothstep(.16,0.,abs(f-.52));
      vec3 fondo=vec3(.02,.031,.039);
      vec3 col=mix(vec3(0.,.96,.63),vec3(.12,.87,.96),smoothstep(.15,.85,uv.x+q.y*.4));
      col=mix(col,vec3(.72,.45,.2),smoothstep(.45,1.,1.-uv.y)*smoothstep(.65,0.,uv.x)*.7);
      float luz=.35+.65*smoothstep(.9,0.,distance(uv,m));
      float vin=smoothstep(1.2,.2,distance(uv,vec2(.7,.6)));
      vec3 o=fondo+col*veta*luz*.30*vin+col*f*f*.07*vin;
      gl_FragColor=vec4(o,1.);
    }`;
  function compilar(tipo, src) {
    const s = gl.createShader(tipo);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  }
  const vs = compilar(gl.VERTEX_SHADER, vertice), fs = compilar(gl.FRAGMENT_SHADER, fragmento);
  if (!vs || !fs) { canvas.remove(); return; }
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.remove(); return; }
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const a = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(a);
  gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
  const uR = gl.getUniformLocation(prog, "r"), uT = gl.getUniformLocation(prog, "t"), uM = gl.getUniformLocation(prog, "m");

  const ESCALA = 0.5;
  function medir() {
    const w = Math.max(1, Math.round(contenedor.clientWidth * ESCALA));
    const h = Math.max(1, Math.round(contenedor.clientHeight * ESCALA));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    gl.uniform2f(uR, w, h);
  }
  medir();
  window.addEventListener("resize", medir, { passive: true });

  // La luz sigue al mouse, con retraso
  const raton = { x: .7, y: .6 }, destino = { x: .7, y: .6 };
  window.addEventListener("pointermove", e => {
    const b = contenedor.getBoundingClientRect();
    destino.x = (e.clientX - b.left) / b.width;
    destino.y = 1 - (e.clientY - b.top) / b.height;
  }, { passive: true });

  let visible = true, anterior = 0, primero = true, id = 0;
  const inicio = performance.now();
  function cuadro(ahora) {
    id = 0;
    if (!visible || document.hidden) return;
    id = requestAnimationFrame(cuadro);
    if (ahora - anterior < 33) return;
    anterior = ahora;
    raton.x += (destino.x - raton.x) * .05;
    raton.y += (destino.y - raton.y) * .05;
    gl.uniform1f(uT, (ahora - inicio) / 1000);
    gl.uniform2f(uM, raton.x, raton.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (primero) { primero = false; canvas.classList.add("listo"); }
  }
  const seguir = () => { if (!id && visible && !document.hidden) id = requestAnimationFrame(cuadro); };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; seguir(); }).observe(contenedor);
  document.addEventListener("visibilitychange", seguir);
  seguir();
})();
