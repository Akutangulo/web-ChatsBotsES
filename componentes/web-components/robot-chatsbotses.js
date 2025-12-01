/**
 * robot-chatsbotses.js
 * Transforma la escena SVG + WebGL del header de ChatsBots.es
 * en un Web Component reutilizable <robot-chatsbotses>.
 */

const template = document.createElement("template");
template.innerHTML = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&display=swap');

    :host {
      display: block;
      width: 100%;
      height: 430px;
      max-width: 100%;
      font-family: "Afacad Flux", sans-serif;
      position: relative;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    .wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      background: #d500f9;
      overflow: hidden;
    }

    .stage {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    #webgl {
      position: absolute;
      inset: 0;
      z-index: 0;
      overflow: hidden;
    }

    .mask-layer {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
    }

    .mask-layer svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .svg-box {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;
    }

    .svg-box svg {
      height: 100%;
      width: auto;
      max-width: 100%;
      pointer-events: auto;
    }

    svg text {
      font-family: "Afacad Flux", sans-serif;
    }
  </style>

  <div class="wrapper">
    <div class="stage">
      <div id="webgl" aria-hidden="true"></div>

      <div id="bg-box" class="mask-layer" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="none">
          <path fill="#d500f9" fill-rule="evenodd"
            d="M0 0v600h800V0zm405.6 458.4C217 458.4 64.1 360.6 64.1 240S217 21.5 405.6 21.5 747.3 119.3 747.3 240s-153 218.4-341.6 218.4z" />
        </svg>
      </div>

      <div class="svg-box">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
          <defs>
            <clipPath id="clip-path">
              <rect width="105.2" height="66.7" x="439.5" y="186.6" fill="none"/>
            </clipPath>
            <clipPath id="clip-path-2">
              <path fill="none" d="M490.4 368.3c0 63.7-38 140-84.7 140s-84.8-76.3-84.8-140 38-90.6 84.8-90.6 84.7 26.9 84.7 90.6z"/>
            </clipPath>
            <radialGradient id="pulse-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stop-color="#9300D3" stop-opacity="0.8" />
              <stop offset="70%" stop-color="#9300D3" stop-opacity="0.3" />
              <stop offset="100%" stop-color="#9300D3" stop-opacity="0" />
            </radialGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>

          <g id="Ship">
            <g id="mid-display">
              <rect width="320.3" height="207" x="248.8" y="116.3" fill="#2A2D34"
                    stroke="#9300D3" stroke-miterlimit="10" stroke-width="5" opacity=".8" rx="18.4"/>
              <g id="chat-screen">
                <rect x="270" y="160" width="130" height="100" fill="#2A2D34" stroke="#9300D3" stroke-width="3" rx="10" ry="10"/>
                <rect x="275" y="165" width="70" height="10" rx="10" ry="10" fill="#9300D3"/>
                <rect x="325" y="185" width="70" height="10" rx="10" ry="10" fill="#5D2B7F"/>
                <rect x="275" y="205" width="90" height="10" rx="10" ry="10" fill="#9300D3"/>
                <rect x="295" y="225" width="100" height="10" rx="10" ry="10" fill="#5D2B7F"/>
                <rect x="275" y="245" width="60" height="10" rx="10" ry="10" fill="#9300D3"/>
              </g>

              <g id="neural-nodes">
                <g class="neural-node" id="node-1">
                  <circle cx="452" cy="161.4" r="4" fill="#9300D3" filter="url(#glow)"/>
                  <circle class="node-pulse" cx="444" cy="153" r="4" fill="none" stroke="#d500f9" stroke-width="2" opacity="0"/>
                </g>

                <g class="neural-node" id="node-2">
                  <circle cx="491.2" cy="161.4" r="5" fill="#9300D3" filter="url(#glow)"/>
                  <circle class="node-pulse" cx="481" cy="151" r="5" fill="none" stroke="#d500f9" stroke-width="2" opacity="0"/>
                </g>

                <g class="neural-node" id="node-3">
                  <circle cx="534.4" cy="161.4" r="6" fill="#9300D3" filter="url(#glow)"/>
                  <circle class="node-pulse" cx="522" cy="149" r="6" fill="none" stroke="#d500f9" stroke-width="2" opacity="0"/>
                </g>

                <line class="node-connection" x1="452" y1="161.4" x2="491.2" y2="161.4"
                      stroke="#5D2B7F" stroke-width="1.5" opacity="0.5"/>
                <line class="node-connection" x1="491.2" y1="161.4" x2="534.4" y2="161.4"
                      stroke="#5D2B7F" stroke-width="1.5" opacity="0.5"/>
                <line class="node-connection" x1="452" y1="161.4" x2="534.4" y2="161.4"
                      stroke="#5D2B7F" stroke-width="1.5" opacity="0.5"/>

                <circle class="connection-spark" cx="452" cy="161.4" r="2" fill="#0ff" opacity="0"/>
              </g>

              <g id="chat-bubbles">
                <path class="chat-connection" d="M450 280 Q470 270, 490 285" stroke="#5D2B7F" stroke-width="2" fill="none" opacity="0.8" stroke-dasharray="4"/>
                <path class="chat-connection" d="M490 285 Q510 300, 530 275" stroke="#5D2B7F" stroke-width="2" fill="none" opacity="0.8" stroke-dasharray="4"/>
                <path class="chat-connection" d="M470 300 Q490 315, 520 295" stroke="#5D2B7F" stroke-width="2" fill="none" opacity="0.8" stroke-dasharray="4"/>

                <g class="chat-bubble" id="bubble-1">
                  <path d="M450 280 Q445 270, 440 275 Q435 280, 440 285 Q445 290, 450 280Z" fill="#9300D3" opacity="1"/>
                  <circle cx="443" cy="280" r="3" fill="#0ff" class="bubble-dot" opacity="1"/>
                </g>

                <g class="chat-bubble" id="bubble-2">
                  <path d="M490 285 Q485 275, 480 280 Q475 285, 480 290 Q485 295, 490 285Z" fill="#5D2B7F" opacity="1"/>
                  <circle cx="483" cy="285" r="3" fill="#0ff" class="bubble-dot" opacity="1"/>
                </g>

                <g class="chat-bubble" id="bubble-3">
                  <path d="M530 275 Q525 265, 520 270 Q515 275, 520 280 Q525 285, 530 275Z" fill="#9300D3" opacity="1"/>
                  <circle cx="523" cy="275" r="3" fill="#0ff" class="bubble-dot" opacity="1"/>
                </g>

                <g class="chat-bubble" id="bubble-4">
                  <path d="M470 300 Q465 290, 460 295 Q455 300, 460 305 Q465 310, 470 300Z" fill="#5D2B7F" opacity="1"/>
                  <circle cx="463" cy="300" r="3" fill="#0ff" class="bubble-dot" opacity="1"/>
                </g>

                <g class="chat-bubble" id="bubble-5">
                  <path d="M520 295 Q515 285, 510 290 Q505 295, 510 300 Q515 305, 520 295Z" fill="#9300D3" opacity="1"/>
                  <circle cx="513" cy="295" r="3" fill="#0ff" class="bubble-dot" opacity="1"/>
                </g>
              </g>

              <g id="graph-big" clip-path="url(#clip-path)">
                <path id="graph-line" fill="none" stroke="#9300D3" stroke-miterlimit="10" stroke-width="4"
                      d="M439.7 206.4c26.3 0 26.3 34.2 52.6 34.2s26.3-34.2 52.6-34.2 26.3 34.2 52.6 34.2 26.3-34.2 52.6-34.2"/>
              </g>

              <circle cx="272" cy="137" r="11.8" fill="#5D2B7F"/>
              <circle id="left-top-circle" cx="272" cy="137" r="11.8" fill="#9300D3"/>
              <text x="355" y="142" fill="#0ff" font-size="25" text-anchor="middle">ChatsBotsES</text>
              <text x="400" y="100" fill="#0ff" font-size="25" text-anchor="middle">Automatizaciones y ChatsBots</text>

              <g class="graph-circle-lb" id="graph-cir-left">
                <circle cx="290.4" cy="287.5" r="20.8" fill="#5D2B7F"/>
                <path fill="#9300D3" d="M290.4 287.5l5.3-20.1a20.8 20.8 0 0115.5 20z"/>
              </g>

              <g class="graph-circle-lb" id="graph-cir-mid">
                <circle cx="345.4" cy="287.5" r="20.8" fill="#5D2B7F"/>
                <path fill="#9300D3" d="M345.4 287.5l5.2-20.1a20.8 20.8 0 0115.5 20z"/>
              </g>

              <g id="graph-cir">
                <circle cx="396.4" cy="292.1" r="16.4" fill="none" stroke="#9300D3" stroke-miterlimit="10" stroke-width="2"/>
                <circle cx="396.4" cy="292.1" r="20.8" fill="none" stroke="#9300D3" stroke-miterlimit="10" stroke-width="2"/>
                <circle cx="396.4" cy="292.1" r="11.6" fill="none" stroke="#9300D3" stroke-miterlimit="10" stroke-width="2"/>
                <circle id="graph-cir-1" cx="408" cy="292.1" r="2.3" fill="#0ff"/>
                <circle id="graph-cir-2" cx="396.4" cy="275.7" r="2.3" fill="#0ff"/>
                <circle id="graph-cir-3" cx="417.2" cy="292.1" r="2.3" fill="#0ff"/>
                <circle id="graph-cir-mid-2" cx="396.4" cy="292.1" r="2.3" fill="#0ff"/>
              </g>
            </g>

            <g id="btm-display">
              <g id="right-display">
                <g id="right-display-display">
                  <path fill="#2A2D34" stroke="#9300D3" stroke-miterlimit="10" stroke-width="5"
                        d="M654.7 461H508.6c-10.5 0-15.8-8.5-12-19l26.2-72a29.9 29.9 0 0125.8-18.9h146c10.5 0 15.8 8.5 12 19l-26.2 72a29.9 29.9 0 01-25.7 18.8z" opacity=".8"/>
                  <g id="bars">
                    <polygon id="bar-3-btm" fill="#5D2B7F" points="656.9 441.2 642.4 441.2 667.6 371.7 682.2 371.7 656.9 441.2"/>
                    <polygon id="bar-3-top" fill="#9300D3" points="656.9 441.2 642.4 441.2 653 412 667.5 412 656.9 441.2"/>
                    <polygon id="bar-2-btm" fill="#5D2B7F" points="633.7 441.2 619.2 441.2 644.5 371.7 659 371.7 633.7 441.2"/>
                    <polygon id="bar-2-top" fill="#9300D3" points="633.7 441.2 619.2 441.2 636 395.1 650.5 395.1 633.7 441.2"/>
                    <polygon id="bar-1-btm" fill="#5D2B7F" points="610.6 441.2 596.1 441.2 621.4 371.7 635.9 371.7 610.6 441.2"/>
                    <polygon id="bar-1-top" fill="#9300D3" points="610.6 441.2 596.1 441.2 604 419.5 618.5 419.5 610.6 441.2"/>
                  </g>
                  <g id="btns" fill="#9300D3">
                    <ellipse cx="546.8" cy="379.3" rx="6.5" ry="4.6" transform="rotate(-39.8 546.8 379.3)"/>
                    <ellipse cx="562.7" cy="379.3" rx="6.5" ry="4.6" transform="rotate(-39.8 562.7 379.3)"/>
                    <ellipse cx="578.6" cy="379.3" rx="6.5" ry="4.6" transform="rotate(-39.8 578.6 379.3)"/>
                    <ellipse cx="594.5" cy="379.3" rx="6.5" ry="4.6" transform="rotate(-39.8 594.5 379.3)"/>
                    <ellipse cx="540.6" cy="396.3" rx="6.5" ry="4.6" transform="rotate(-39.8 540.6 396.3)"/>
                    <ellipse cx="556.5" cy="396.3" rx="6.5" ry="4.6" transform="rotate(-39.8 556.5 396.3)"/>
                    <ellipse cx="572.4" cy="396.3" rx="6.5" ry="4.6" transform="rotate(-39.8 572.4 396.3)"/>
                    <ellipse cx="588.3" cy="396.3" rx="6.5" ry="4.6" transform="rotate(-39.8 588.4 396.3)"/>
                    <ellipse cx="534.4" cy="413.3" rx="6.5" ry="4.6" transform="rotate(-39.8 534.4 413.3)"/>
                    <ellipse cx="550.3" cy="413.3" rx="6.5" ry="4.6" transform="rotate(-39.8 550.3 413.3)"/>
                    <ellipse cx="566.2" cy="413.3" rx="6.5" ry="4.6" transform="rotate(-39.8 566.2 413.3)"/>
                    <ellipse cx="582.1" cy="413.3" rx="6.5" ry="4.6" transform="rotate(-39.8 582.2 413.3)"/>
                    <ellipse cx="528.2" cy="430.3" rx="6.5" ry="4.6" transform="rotate(-39.8 528.2 430.3)"/>
                    <ellipse cx="544.1" cy="430.3" rx="6.5" ry="4.6" transform="rotate(-39.8 544.1 430.3)"/>
                    <ellipse cx="560" cy="430.3" rx="6.5" ry="4.6" transform="rotate(-39.6 562.3 429.7)"/>
                    <ellipse cx="575.9" cy="430.3" rx="6.5" ry="4.6" transform="rotate(-39.8 576 430.3)"/>
                  </g>
                </g>
                <ellipse id="right-display-shadow" cx="593.3" cy="508.4" fill="#1e3855" rx="74" ry="10.9"/>
              </g>

              <g id="left-display">
                <g id="left-display-display">
                  <path fill="#2A2D34" stroke="#9300D3" stroke-miterlimit="10" stroke-width="5"
                        d="M299 461H153c-10.4 0-22-8.5-25.8-19L101 370c-3.8-10.4 1.6-18.9 12-18.9h146c10.5 0 22 8.5 25.9 18.9l26.2 72c3.8 10.4-1.6 19-12 19z" opacity=".8"/>
                  <polygon fill="#9300D3" points="153.1 433.3 155.7 440.3 158.2 447.3 153.6 443.8 148.9 440.3 151 436.8 153.1 433.3"/>
                  <polygon fill="#9300D3" points="143 433.3 146.4 433.3 151.9 448.4 148.5 448.4 143 433.3"/>
                  <polygon fill="#9300D3" points="193.8 448.4 191.3 441.4 188.7 434.4 193.4 437.9 198 441.4 195.9 444.9 193.8 448.4"/>
                  <polygon fill="#9300D3" points="203.9 448.4 200.6 448.4 195.1 433.3 198.4 433.3 203.9 448.4"/>
                  <polygon fill="#9300D3" points="164.4 433.3 167.8 433.3 173.3 448.4 169.9 448.4 164.4 433.3"/>
                  <polygon fill="#9300D3" points="174 433.3 177.4 433.3 182.9 448.4 179.5 448.4 174 433.3"/>
                  <ellipse cx="199" cy="377.7" fill="#5D2B7F" rx="5.4" ry="7.7" transform="rotate(-50.2 199 377.7)"/>
                  <polygon fill="#9300D3" points="198.2 380.9 197 377.7 195.9 374.6 199.2 376.1 202.6 377.7 200.4 379.3 198.2 380.9"/>
                  <line x1="217.3" x2="267.5" y1="377.7" y2="377.7" fill="#2A2D34" stroke="#9300D3"
                        stroke-linecap="round" stroke-miterlimit="10" stroke-width="5" opacity=".8"/>
                  <ellipse cx="206.2" cy="397.6" fill="#5D2B7F" rx="5.4" ry="7.7" transform="rotate(-50.2 206.2 397.6)"/>
                  <polygon fill="#9300D3" points="205.4 400.7 204.2 397.6 203.1 394.4 206.4 396 209.8 397.6 207.6 399.2 205.4 400.7"/>
                  <line x1="224.5" x2="274.8" y1="397.6" y2="397.6" fill="#2A2D34" stroke="#9300D3"
                        stroke-linecap="round" stroke-miterlimit="10" stroke-width="5" opacity=".8"/>
                  <ellipse cx="213.5" cy="417.5" fill="#5D2B7F" rx="5.4" ry="7.7" transform="rotate(-50.2 213.4 417.4)"/>
                  <polygon fill="#9300D3" points="212.6 420.6 211.5 417.5 210.3 414.3 213.7 415.9 217 417.5 214.8 419 212.6 420.6"/>
                  <line x1="231.8" x2="282" y1="417.5" y2="417.5" fill="#2A2D34" stroke="#9300D3"
                        stroke-linecap="round" stroke-miterlimit="10" stroke-width="5" opacity=".8"/>
                  <ellipse cx="220.7" cy="437.3" fill="#5D2B7F" rx="5.4" ry="7.7" transform="rotate(-50.2 220.7 437.3)"/>
                  <polygon fill="#9300D3" points="219.8 440.5 218.7 437.3 217.6 434.2 220.9 435.8 224.3 437.3 222.1 438.9 219.8 440.5"/>
                  <line x1="239" x2="289.2" y1="437.3" y2="437.3" fill="#2A2D34" stroke="#9300D3"
                        stroke-linecap="round" stroke-miterlimit="10" stroke-width="5" opacity=".8"/>
                  <path fill="#5D2B7F"
                        d="M190.5 424.4h-46a7.4 7.4 0 01-6.5-4.7l-15.8-43.5c-1-2.6.4-4.7 3-4.7h46a7.4 7.4 0 016.5 4.7l15.8 43.5c1 2.6-.4 4.7-3 4.7z"/>
                  <ellipse cx="157.8" cy="398" fill="#2A2D34" rx="17.5" ry="25.1" transform="rotate(-50.2 157.8 398)"/>
                  <ellipse cx="157.8" cy="398" fill="#2A2D34" rx="5.1" ry="7.3" transform="rotate(-50.2 157.8 398)"/>
                  <path fill="#9300D3"
                        d="M159.8 405a10 10 0 01-8.8-6.4 5.8 5.8 0 01.5-5.4 5.3 5.3 0 014.4-2.2 10 10 0 018.8 6.4 5.8 5.8 0 01-.5 5.4 5.3 5.3 0 01-4.4 2.1zm-3.9-10.6a2 2 0 00-1.6.7 2.5 2.5 0 000 2.3 6.6 6.6 0 005.4 4 2 2 0 001.7-.6 2.5 2.5 0 000-2.3 6.6 6.6 0 00-5.5-4zM173.6 405h14.5l-5.1-14h-14.4a1.8 1.8 0 00-1.7 2.6l3.2 8.7a4.1 4.1 0 003.5 2.6z"/>
                </g>
                <ellipse id="left-display-shadow" cx="224.5" cy="511.5" fill="#1e3855" rx="74" ry="10.9"/>
              </g>
            </g>

            <g id="robot">
              <path id="body-base" fill="#fff" d="M490.4 368.3c0 63.7-38 140-84.7 140s-84.8-76.3-84.8-140 38-90.6 84.8-90.6 84.7 26.9 84.7 90.6z"/>
              <g id="robot-body">
                <ellipse id="robot-shadow" cx="405.6" cy="543.9" fill="#1e3855" rx="44.5" ry="7.1"/>
                <g clip-path="url(#clip-path-2)">
                  <g id="faces">
                    <g id="face">
                      <ellipse id="face-back" cx="560" cy="340.9" fill="#9300D3" rx="61.5" ry="32.2"/>
                      <g class="eyes" id="eyes" fill="#0ff">
                        <ellipse cx="539.8" cy="340.9" rx="7.3" ry="13.7"/>
                        <ellipse cx="579.1" cy="340.9" rx="7.3" ry="13.7"/>
                      </g>
                    </g>
                    <g id="face-2">
                      <ellipse id="face-back-2" cx="256.9" cy="340.9" fill="#9300D3" rx="61.5" ry="32.2"/>
                      <g class="eyes" id="eyes-2" fill="#0ff">
                        <ellipse cx="236.7" cy="340.9" rx="7.3" ry="13.7"/>
                        <ellipse cx="275.9" cy="340.9" rx="7.3" ry="13.7"/>
 </g>
                    </g>
                    <g id="charge">
                      <circle cx="406.8" cy="340.9" r="16.2" fill="#9300D3"/>
                      <rect width="4.1" height="13.9" x="398.7" y="334" fill="#0ff"/>
                      <rect width="4.1" height="13.9" x="410.8" y="334" fill="#0ff"/>
                    </g>
                  </g>
                </g>
              </g>
              <path id="right-hand" fill="#fff" d="M549.7 400.7c0 15.6-31.2 28.2-56.2 28.2s-34.2-12.6-34.2-28.2 9.2-28 34.2-28 56.2 12.5 56.2 28z"/>
              <path id="left-hand" fill="#fff" d="M255.6 400.7c0-15.5 31.2-28 56.2-28s34.2 12.5 34.2 28-9.3 28.2-34.2 28.2-56.2-12.6-56.2-28.2z"/>
            </g>

            <path id="bubble-right" fill="#9300D3"
                  d="M5 5 h20 a5 5 0 0 1 5 5 v15 a5 5 0 0 1 -5 5 h-15 l-5 5 v-5 h-5 a5 5 0 0 1 -5 -5 v-15 a5 5 0 0 1 5 -5 z" opacity="0"/>
            <path id="bubble-left" fill="#0ff"
                  d="M25 5 h-20 a5 5 0 0 0 -5 5 v15 a5 5 0 0 0 5 5 h15 l5 5 v-5 h5 a5 5 0 0 0 5 -5 v-15 a5 5 0 0 0 -5 -5 z" opacity="0"/>
          </g>
        </svg>
      </div>
    </div>
  </div>
`;

const SCRIPT_CACHE = new Map();
function loadExternalScript(src) {
  if (!SCRIPT_CACHE.has(src)) {
    SCRIPT_CACHE.set(
      src,
      new Promise((resolve, reject) => {
        const existing = [...document.querySelectorAll(`script[src="${src}"]`)].pop();
        if (existing && existing.dataset.loaded) {
          resolve();
          return;
        }
        if (existing && !existing.dataset.loaded) {
          existing.addEventListener("load", () => resolve(), { once: true });
          existing.addEventListener("error", reject, { once: true });
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.dataset.loaded = "pending";
        script.onload = () => {
          script.dataset.loaded = "true";
          resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
      })
    );
  }
  return SCRIPT_CACHE.get(src);
}

class RobotChatsbotses extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
    this._timelines = [];
    this._bubbleClones = [];
  }

  connectedCallback() {
    this._init();
  }

  disconnectedCallback() {
    this._cleanup();
  }

  async _init() {
    await this._loadDependencies();
    this._cleanup(); // reinicia si vuelve a conectarse
    this._cacheElements();
    this._initStars();
    this._initAnimations();
  }

  _cacheElements() {
    this._stage = this.shadowRoot.querySelector(".stage");
    this._webgl = this.shadowRoot.getElementById("webgl");
    this._robot = this.shadowRoot.getElementById("robot");
    this._midDisplay = this.shadowRoot.getElementById("mid-display");
    this._btmDisplay = this.shadowRoot.getElementById("btm-display");
    this._mainSvg = this.shadowRoot.querySelector(".svg-box svg");
  }

  async _loadDependencies() {
    await Promise.all([
      loadExternalScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"),
      loadExternalScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/three.min.js")
    ]);
    this._gsap = window.gsap;
    this._THREE = window.THREE;
  }

  _initAnimations() {
    this._initRobotAnimation();
    this._initNeuralNodes();
    this._initChatBubbles();
    this._initDisplayAnimations();
    this._initLeftDisplayAnimation();
    this._initRightDisplayAnimation();
    this._initMouseInteraction();
    this._initLogoAnimation();
  }

  _initRobotAnimation() {
    const gsap = this._gsap;
    const root = this.shadowRoot;
    let isLeft = false;
    const leftHand = root.getElementById("left-hand");
    const rightHand = root.getElementById("right-hand");
    const faces = root.getElementById("faces");
    const charge = root.getElementById("charge");

    gsap.set(leftHand, { x: 30, transformOrigin: "right center" });
    gsap.set(rightHand, { x: -30, transformOrigin: "left center" });

    const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 1 })
      .to(root.querySelectorAll(".eyes"), { opacity: 0, duration: 0.1 })
      .to(root.querySelectorAll(".eyes"), { opacity: 1, duration: 0.1 });
    this._timelines.push(blinkTl);

    const robotTl = gsap.timeline({ repeat: -1 })
      .to(this._robot, { x: 100, onStart: () => { isLeft = false; } }, "right")
      .to(faces, { x: -60 }, "right")
      .to(leftHand, { x: 80 }, "right")
      .to(charge, { scaleX: 0.8 }, "right")
      .to(rightHand, { rotation: 20, repeat: 2, yoyo: true, ease: "power2.inOut", duration: 0.4 })
      .to(this._robot, { x: -100, onStart: () => { isLeft = true; } }, "left")
      .to(faces, { x: 60 }, "left")
      .to(charge, { scaleX: 0.8 }, "left")
      .to(leftHand, { x: 30 }, "left")
      .to(rightHand, { x: -80 }, "left")
      .to(leftHand, { rotation: -20, repeat: 3, yoyo: true, ease: "power1.inOut", duration: 0.4 })
      .to(this._robot, { x: 0 }, "center")
      .to(faces, { x: 0 }, "center")
      .to(charge, { scaleX: 1 }, "center")
      .to(leftHand, { y: -50, x: -10, rotation: 30 })
      .to(leftHand, { rotation: 50, repeat: 1, yoyo: true, ease: "sine.inOut" })
      .to(leftHand, { y: 0, x: 30, rotation: 0 });
    robotTl.timeScale(0.8);
    this._timelines.push(robotTl);

    this._onRobotClick = () => {
      robotTl.pause();
      const tempTl = gsap.timeline({
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 1.5,
        onComplete: () => {
          robotTl.resume();
          tempTl.kill();
        }
      });
      tempTl.to(faces, { x: isLeft ? 150 : -150 });
    };
    this._robot.addEventListener("click", this._onRobotClick);
  }

  _initNeuralNodes() {
    const pulses = this.shadowRoot.querySelectorAll(".node-pulse");
    const spark = this.shadowRoot.querySelectorAll(".connection-spark");

    const pulseTween = this._gsap.to(pulses, {
      scale: 3,
      opacity: 0.6,
      duration: 2,
      stagger: 0.5,
      repeat: -1,
      repeatDelay: 0.7,
      ease: "sine.out"
    });
    this._timelines.push(pulseTween);

    const sparkTimeline = this._gsap.timeline({ repeat: -1 })
      .to(spark, { x: 39.2, duration: 1, ease: "power1.inOut" })
      .to(spark, { x: 82.4, duration: 1, ease: "power1.inOut" })
      .to(spark, { x: 0, duration: 1.5, ease: "power1.inOut" });
    this._timelines.push(sparkTimeline);

    const sparkOpacity = this._gsap.to(spark, {
      scale: 1.5,
      opacity: 1,
      duration: 0.5,
      yoyo: true,
      repeat: -1,
      repeatDelay: 0.5,
      stagger: 0.7
    });
    this._timelines.push(sparkOpacity);
  }

  _initChatBubbles() {
    const gsap = this._gsap;
    const bubbles = this.shadowRoot.querySelectorAll(".chat-bubble");
    const bubblePaths = this.shadowRoot.querySelectorAll(".chat-bubble path");
    const dots = this.shadowRoot.querySelectorAll(".bubble-dot");
    const connections = this.shadowRoot.querySelectorAll(".chat-connection");

    this._timelines.push(
      gsap.to(bubbles, {
        opacity: 0.8,
        scale: 1.2,
        duration: 1.5,
        stagger: 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    );

    this._timelines.push(
      gsap.to(bubblePaths, {
        fill: "#5D2B7F",
        duration: 2,
        stagger: 0.4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      })
    );

    this._timelines.push(
      gsap.to(dots, {
        opacity: 0,
        scale: 1.5,
        duration: 1,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      })
    );

    this._timelines.push(
      gsap.to(connections, {
        stroke: "#9300D3",
        opacity: 0.8,
        duration: 2,
        stagger: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    );
  }

  _initDisplayAnimations() {
    const gsap = this._gsap;
    const leftTopCircle = this.shadowRoot.getElementById("left-top-circle");
    const graphCenter = this.shadowRoot.getElementById("graph-cir-mid-2");
    const graphLine = this.shadowRoot.getElementById("graph-line");

    if (leftTopCircle) {
      this._timelines.push(
        gsap.to(leftTopCircle, {
          transformOrigin: "center",
          scale: 1,
          fill: "#34496a",
          repeat: -1,
          duration: 2,
          yoyo: true
        })
      );
    }

    if (graphCenter) {
      this._timelines.push(
        gsap.to(graphCenter, {
          scale: 1.8,
          ease: "sine.inOut",
          transformOrigin: "center",
          repeat: -1,
          yoyo: true,
          duration: 1.5
        })
      );
    }

    if (graphLine) {
      this._timelines.push(
        gsap.to(graphLine, {
          x: -105,
          ease: "none",
          repeat: -1,
          duration: 2
        })
      );
    }
  }

  _initLeftDisplayAnimation() {
    const gsap = this._gsap;
    const display = this.shadowRoot.getElementById("left-display-display");
    const shadow = this.shadowRoot.getElementById("left-display-shadow");

    if (display) {
      this._timelines.push(
        gsap.to(display, {
          y: 10,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          duration: 2
        })
      );
    }

    if (shadow) {
      this._timelines.push(
        gsap.to(shadow, {
          scale: 1.1,
          transformOrigin: "center",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          duration: 2
        })
      );
    }

    const lines = this.shadowRoot.querySelectorAll("#left-display-display line");
    if (lines.length) {
      const lineTimeline = gsap.timeline({ repeat: -1 })
        .to(lines, { stroke: "#34496a", stagger: { each: 0.5 } })
        .to(lines, { stroke: "#0ff", stagger: { each: 0.5 } });
      this._timelines.push(lineTimeline);
    }

    this._bubbleClones = [];
    const bubbleTemplates = ["#bubble-right", "#bubble-left"];

    for (let i = 0; i < 3; i += 1) {
      bubbleTemplates.forEach((selector) => {
        const template = this.shadowRoot.querySelector(selector);
        if (!template) return;
        const clone = template.cloneNode(true);
        clone.removeAttribute("id");
        clone.classList.add("bubbles");
        const initialX = selector === "#bubble-right" ? 160 : 180;
        const initialY = 360 + i * 30;
        this._gsap.set(clone, { x: initialX, y: initialY, opacity: 0 });
        this._mainSvg.appendChild(clone);
        this._bubbleClones.push(clone);
      });
    }

    this._bubbleClones.forEach((bubble, index) => {
      const tween = gsap.to(bubble, {
        y: "-=180",
        x: "+=10",
        opacity: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: gsap.utils.random(1.5, 3),
        delay: index * 0.2
      });
      this._timelines.push(tween);
    });
  }

  _initRightDisplayAnimation() {
    const gsap = this._gsap;
    const display = this.shadowRoot.getElementById("right-display-display");
    const shadow = this.shadowRoot.getElementById("right-display-shadow");

    if (display) {
      this._timelines.push(
        gsap.to(display, {
          y: 10,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          duration: 2,
          delay: 1.5
        })
      );
    }

    if (shadow) {
      this._timelines.push(
        gsap.to(shadow, {
          scale: 1.1,
          transformOrigin: "center",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          duration: 2,
          delay: 1.5
        })
      );
    }

    ["#bar-1", "#bar-2", "#bar-3"].forEach((prefix, index) => {
      const top = this.shadowRoot.querySelector(`${prefix}-top`);
      const bottom = this.shadowRoot.querySelector(`${prefix}-btm`);
      if (!top || !bottom) return;
      gsap.set(bottom, { opacity: 0 });
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(top, { opacity: 0, duration: 0.3, ease: "power2.in" })
        .to(bottom, { opacity: 1, duration: 0.3, ease: "power2.out" })
        .to(bottom, { opacity: 0, duration: 0.3, ease: "power2.in" }, `+=${1 + index * 0.3}`)
        .to(top, { opacity: 1, duration: 0.3, ease: "power2.out" });
      this._timelines.push(tl);
    });

    const btnEllipses = this.shadowRoot.querySelectorAll("#btns ellipse");
    if (btnEllipses.length) {
      this._timelines.push(
        gsap.to(btnEllipses, {
          fill: "#34496a",
          stagger: { amount: 1, grid: [4, 4], repeat: -1, yoyo: true, from: "random" }
        })
      );
    }
  }

  _initMouseInteraction() {
    const gsap = this._gsap;
    const midDisplay = this._midDisplay;
    const btmDisplay = this._btmDisplay;

    if (!midDisplay || !btmDisplay) return;

    this._mouseMoveHandler = (event) => {
      const rect = this.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

      gsap.to(midDisplay, { x: -mouseX * 10, y: mouseY * 10, duration: 0.5, overwrite: true });
      gsap.to(btmDisplay, { x: -mouseX * 20, y: mouseY * 10, duration: 0.6, overwrite: true });
    };

    this._mouseLeaveHandler = () => {
      gsap.to([midDisplay, btmDisplay], { x: 0, y: 0, duration: 0.6, ease: "sine.out" });
    };

    this.addEventListener("mousemove", this._mouseMoveHandler);
    this.addEventListener("mouseleave", this._mouseLeaveHandler);
  }

  _initLogoAnimation() {
    const textNodes = this.shadowRoot.querySelectorAll("text");
    if (!textNodes.length) return;

    const tl = this._gsap.to(textNodes, {
      scale: 1.2,
      fill: "#ff1493",
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    });
    this._timelines.push(tl);
  }

  _initStars() {
    const THREE = this._THREE;
    if (!THREE || !this._webgl) return;

    const width = this._stage.clientWidth;
    const height = this._stage.clientHeight;

    const scene = new THREE.Scene();
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(5000 * 3);

    for (let i = 0; i < 5000; i += 1) {
      positions[i * 3] = Math.random() * 600 - 300;
      positions[i * 3 + 1] = Math.random() * 600 - 300;
      positions[i * 3 + 2] = Math.random() * 600 - 300;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const texture = new THREE.TextureLoader().load("https://i.postimg.cc/T25jx3S9/circle-05.png");
    const material = new THREE.PointsMaterial({
      size: 2,
      sizeAttenuation: true,
      transparent: true,
      alphaMap: texture
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(width, height);
    renderer.setClearColor("#282e39", 0.5);

    this._webgl.innerHTML = "";
    this._webgl.appendChild(renderer.domElement);

    const animate = () => {
      const attr = geometry.attributes.position;
      for (let i = 0; i < attr.count; i += 1) {
        const index = i * 3;
        attr.array[index + 1] -= 3;
        if (attr.array[index + 1] < -300) attr.array[index + 1] = 300;
      }
      attr.needsUpdate = true;
      stars.rotation.y += 0.002;
      renderer.render(scene, camera);
      this._starAnimationId = requestAnimationFrame(animate);
    };
    animate();

    this._starsCtx = { renderer, geometry, material, texture, camera, scene };

    this._resizeObserver = new ResizeObserver(() => this._resizeStars());
    this._resizeObserver.observe(this._stage);
  }

  _resizeStars() {
    if (!this._starsCtx || !this._stage) return;
    const { renderer, camera } = this._starsCtx;
    const width = this._stage.clientWidth;
    const height = this._stage.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  _cleanup() {
    if (this._onRobotClick && this._robot) {
      this._robot.removeEventListener("click", this._onRobotClick);
      this._onRobotClick = null;
    }

    if (this._mouseMoveHandler) {
      this.removeEventListener("mousemove", this._mouseMoveHandler);
      this._mouseMoveHandler = null;
    }

    if (this._mouseLeaveHandler) {
      this.removeEventListener("mouseleave", this._mouseLeaveHandler);
      this._mouseLeaveHandler = null;
    }

    this._timelines.forEach((tl) => tl && tl.kill());
    this._timelines = [];

    if (this._bubbleClones.length) {
      this._bubbleClones.forEach((bubble) => bubble.remove());
      this._bubbleClones = [];
    }

    if (this._starAnimationId) {
      cancelAnimationFrame(this._starAnimationId);
      this._starAnimationId = null;
    }

    if (this._starsCtx) {
      const { renderer, geometry, material, texture } = this._starsCtx;
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      this._starsCtx = null;
    }

    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }
}

customElements.define("robot-chatsbotses", RobotChatsbotses);
