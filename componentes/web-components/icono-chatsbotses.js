// Fichero: icono-chatsbotses.js 

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      --icono-size: 150px;
      --surface: #111;
      --c: white;
      --c2: #9ae3dc;
      --c3: magenta;
      display: inline-block;
      width: var(--icono-size);
      height: var(--icono-size);
      cursor: none;
    }
    .ai-bot {
      width: 100%;
      height: 100%;
      font-size: var(--icono-size);
      aspect-ratio: 1;
      position: relative;
      display: grid;
      place-items: center;
      animation: blink 2.4s ease infinite, mouth 1.2s ease-in infinite;
    }
    .head {
      background: linear-gradient(var(--c) 80%, color-mix(in srgb, var(--c), black 30%), var(--c));
      border-radius: 0.11em;
      position: absolute;
      width: 0.8235em;
      height: 0.588em;
    }
    .head:before, .head:after {
      content: '';
      position: absolute;
      left: -0.118em;
      top: 0.176em;
      width: 0.059em;
      height: 0.235em;
      background: var(--c);
      border-radius: 0.059em 0 0 0.059em;
      scale: var(--ealw, 1) 1;
      transition: scale 0.2s ease;
    }
    .head:after {
      right: -0.118em;
      left: unset;
      border-radius: 0 0.059em 0.059em 0;
      scale: var(--earw, 1) 1;
      transition: scale 0.2s ease;
    }
    .head .face {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      inset: 0 0.088em;
      background: var(--surface);
      translate: var(--fx) 0;
      border-radius: 0.118em;
      padding: 0.118em 0.118em 0.059em 0.118em;
      gap: 0.088em;
      transition: translate 0.3s ease;
    }
    .head .face:before {
      content: '';
      background: var(--c);
      position: absolute;
      height: 0.029em;
      width: 0.294em;
      top: -0.059em;
      border-radius: 0.059em 0.059em 0 0;
      -webkit-mask: radial-gradient(circle at 50% 100%, transparent 45%, black 45%);
      mask: radial-gradient(circle at 50% 100%, transparent 45%, black 45%);
    }
    .head .face .eyes {
      display: flex;
      height: 0.235em;
      gap: 0.176em;
    }
    .head .face .eyes:before, .head .face .eyes:after {
      content: '';
      width: 0.147em;
      height: 0.235em;
      scale: 1 var(--elh);
      filter: drop-shadow(0 0 0.02em var(--c2));
      background: repeating-linear-gradient(to bottom, var(--c), var(--c) .0025em, transparent .0025em, transparent .006em), linear-gradient(to bottom, var(--c3), transparent 60%), var(--c2);
      border-radius: 0.029em;
      translate: var(--erx) 0;
      transition: translate 0.2s ease;
    }
    .head .face .eyes:after {
      scale: 1 var(--erh);
      translate: var(--erx) 0;
      transition: translate 0.2s ease;
    }
    .head .face .mouth {
      width: 0.294em;
      height: 0.059em;
      background: var(--c2);
      border-radius: 0 0 0.029em 0.029em;
      filter: drop-shadow(0 0 0.02em var(--c2));
      scale: var(--mw, 1) var(--mh, 1);
    }
    @keyframes blink { from, 10%, to { --elh: 1; --erh: 1; } 2% { --elh: .2; } 8% { --erh: .1; } }
    @keyframes mouth { from, 30%, 70%, to { --mh: 1; --mw: 1; } 20% { --mh: .5; } 60% { --mw: .7; } }
    @property --elh { syntax: '<number>'; inherits: true; initial-value: 1; }
    @property --erx { syntax: '<percentage>'; inherits: true; initial-value: 0%; }
    @property --fx { syntax: '<percentage>'; inherits: true; initial-value: 0%; }
    @property --ealw { syntax: '<number>'; inherits: true; initial-value: 1; }
    @property --earw { syntax: '<number>'; inherits: true; initial-value: 1; }
    @property --erh { syntax: '<number>'; inherits: true; initial-value: 1; }
    @property --mh { syntax: '<number>'; inherits: true; initial-value: 1; }
    @property --mw { syntax: '<number>'; inherits: true; initial-value: 1; }
  </style>
  <div class="ai-bot">
    <div class="head">
      <div class="face">
        <div class="eyes"></div>
        <div class="mouth"></div>
      </div>
    </div>
  </div>
`;

class IconoChatsBotsES extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.bot = this.shadowRoot.querySelector('.ai-bot');
  }

  connectedCallback() {
    this.initializeTracker();
    this.updateSize();
  }
  
  static get observedAttributes() {
    return ['size'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'size' && oldValue !== newValue) {
      this.updateSize();
    }
  }

  updateSize() {
    const size = this.getAttribute('size');
    if (size) {
      this.style.setProperty('--icono-size', size);
    }
  }

  initializeTracker() {
    let lastMoveTime = 0;
    const throttleDelay = 50;

    const handleMovement = (e) => {
      const now = Date.now();
      if (now - lastMoveTime < throttleDelay) return;
      lastMoveTime = now;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const rect = this.bot.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const relX = ((clientX - centerX) / (window.innerWidth / 2)) * 100;
      const relY = ((clientY - centerY) / (window.innerHeight / 2)) * 100;
      const limitedX = Math.max(-100, Math.min(100, relX));
      const limitedY = Math.max(-100, Math.min(100, relY));
      updateRobotPosition(limitedX, limitedY);
    };

    const updateRobotPosition = (x, y) => {
      /* =============================================================== */
      /* AQUÍ ESTÁ EL CAMBIO PARA REDUCIR EL MOVIMIENTO                  */
      /* =============================================================== */
      this.bot.style.setProperty('--fx', `${x * 0.15}%`); // Antes era 0.3
      this.bot.style.setProperty('--erx', `${x * 0.4}%`);  // Antes era 0.6
      /* =============================================================== */

      this.bot.style.setProperty('--ealw', Math.max(0.5, 1 + x * 0.005));
      this.bot.style.setProperty('--earw', Math.max(0.5, 1 - x * 0.005));
      this.bot.style.transform = `rotate(${y * 0.1}deg)`;
    };

    const resetPosition = () => {
      this.bot.style.setProperty('--fx', '0%');
      this.bot.style.setProperty('--erx', '0%');
      this.bot.style.setProperty('--ealw', '1');
      this.bot.style.setProperty('--earw', '1');
      this.bot.style.transform = 'rotate(0deg)';
    };

    document.addEventListener('mousemove', handleMovement.bind(this));
    document.addEventListener('touchmove', handleMovement.bind(this));
    document.addEventListener('mouseleave', resetPosition.bind(this));
    document.addEventListener('touchend', resetPosition.bind(this));
  }
}

window.customElements.define('icono-chatsbotses', IconoChatsBotsES);
