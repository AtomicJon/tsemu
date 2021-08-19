// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this,
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"7nSHx":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "d0cc03dd41627030bfa4f3f55ce3dd8e"; // @flow
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets/*: {|[string]: boolean|} */ , acceptedAssets/*: {|[string]: boolean|} */ , assetsToAccept/*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    // $FlowFixMe
    ws.onmessage = function(event/*: {data: string, ...} */ ) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH
            );
            // Handle HMR Update
            var handled = false;
            assets.forEach((asset)=>{
                var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
                if (didAccept) handled = true;
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function(e) {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
        errorHTML += `\n      <div>\n        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">\n          🚨 ${diagnostic.message}\n        </div>\n        <pre>\n          ${stack}\n        </pre>\n        <div>\n          ${diagnostic.hints.map((hint)=>'<div>' + hint + '</div>'
        ).join('')}\n        </div>\n      </div>\n    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    link.getAttribute('href').split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle/*: ParcelRequire */ , asset/*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle/*: ParcelRequire */ , id/*: string */ , depsByBundle/*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle/*: ParcelRequire */ , id/*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"4zNAQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _gb = require("./core/GB");
var _gbDefault = parcelHelpers.interopDefault(_gb);
function main() {
    // Controls
    const gameSelect = document.getElementById('game');
    const pauseButton = document.getElementById('pause');
    const soundCheckBox = document.getElementById('sound');
    const volumeSlider = document.getElementById('volume');
    // UI
    const canvas = document.getElementById('screen');
    // Emulator
    const gb = new _gbDefault.default(canvas);
    // Hookup events
    pauseButton.addEventListener('click', (evt)=>{
        const isPaused = gb.togglePause();
        evt.target.innerHTML = isPaused ? 'Resume' : 'Pause';
    });
    gameSelect.addEventListener('change', async (evt)=>{
        const files = evt.target.files;
        if (files && files.length > 0) {
            const arrayBuffer = await files[0].arrayBuffer();
            gb.loadCart(arrayBuffer);
        }
        gameSelect.blur();
    });
    soundCheckBox.addEventListener('change', (evt)=>{
        if (evt.target.checked) gb.enableAudio();
        else gb.disableAudio();
    });
    volumeSlider.addEventListener('change', (evt)=>{
        gb.setVolume(parseInt(evt.target.value, 10));
    });
    console.log('Starting...');
}
exports.default = main;
main();

},{"./core/GB":"70eFS","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"70eFS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * The core Game Boy class
 */ parcelHelpers.export(exports, "default", ()=>GB
);
var _cpu = require("../cpu/Cpu");
var _cpuDefault = parcelHelpers.interopDefault(_cpu);
var _ppu = require("../gpu/Ppu");
var _ppuDefault = parcelHelpers.interopDefault(_ppu);
var _joypad = require("../io/Joypad");
var _joypadDefault = parcelHelpers.interopDefault(_joypad);
var _memoryMap = require("../memory/MemoryMap");
var _memoryMapDefault = parcelHelpers.interopDefault(_memoryMap);
var _getHexString = require("../util/getHexString");
var _getHexStringDefault = parcelHelpers.interopDefault(_getHexString);
var _getBinaryString = require("../util/getBinaryString");
var _getBinaryStringDefault = parcelHelpers.interopDefault(_getBinaryString);
var _constants = require("./constants");
var _apu = require("../audio/Apu");
var _apuDefault = parcelHelpers.interopDefault(_apu);
class GB {
    constructor(canvas){
        this.isRunning = false;
        this.isPaused = false;
        this.isAudioEnabled = true;
        this.animationFrameRequest = null;
        /**
   * The update callback - called per frame (requestAnimationFrame)
   */ this.update = ()=>{
            if (!this.isRunning) {
                this.animationFrameRequest = null;
                return;
            }
            // Pause loop
            if (this.isPaused) {
                this.animationFrameRequest = requestAnimationFrame(this.update);
                return;
            }
            let cycles = 0;
            // TODO: Adjust cycles based on framerate
            // Game Boy Freq: 4.19 MHz @ 60FPS
            while(cycles < _constants.CORE_CLOCK / 60){
                this.joypad.tick();
                const cpuSuccess = this.cpu.tick();
                this.gpu.tick();
                if (this.isAudioEnabled) this.apu.tick();
                // Halt if CPU cycle fails
                if (!cpuSuccess) return;
                cycles += 1;
            }
            this.gpu.update();
            this.updateDebug();
            this.animationFrameRequest = requestAnimationFrame(this.update);
        };
        /**
   * Debug - update UI with debug info
   */ this.updateDebug = ()=>{
            this.dbgA.innerHTML = _getHexStringDefault.default(this.cpu.A);
            this.dbgF.innerHTML = _getHexStringDefault.default(this.cpu.F);
            this.dbgB.innerHTML = _getHexStringDefault.default(this.cpu.B);
            this.dbgC.innerHTML = _getHexStringDefault.default(this.cpu.C);
            this.dbgD.innerHTML = _getHexStringDefault.default(this.cpu.D);
            this.dbgE.innerHTML = _getHexStringDefault.default(this.cpu.E);
            this.dbgH.innerHTML = _getHexStringDefault.default(this.cpu.H);
            this.dbgL.innerHTML = _getHexStringDefault.default(this.cpu.L);
            this.dbgAF.innerHTML = _getHexStringDefault.default(this.cpu.AF, 4);
            this.dbgBC.innerHTML = _getHexStringDefault.default(this.cpu.BC, 4);
            this.dbgDE.innerHTML = _getHexStringDefault.default(this.cpu.DE, 4);
            this.dbgHL.innerHTML = _getHexStringDefault.default(this.cpu.HL, 4);
            this.dbgPC.innerHTML = _getHexStringDefault.default(this.cpu.PC);
            this.dbgSP.innerHTML = _getHexStringDefault.default(this.cpu.SP);
            const joypadValue = this.memoryMap.read8(65280);
            this.dbgJoypad.innerHTML = `${_getBinaryStringDefault.default(joypadValue)} (${_getHexStringDefault.default(joypadValue)}) [${this.joypad.getPressedInputs().join(', ')}]`;
            const nr11 = this.memoryMap.read8(65296);
            const nr12 = this.memoryMap.read8(65297);
            const nr13 = this.memoryMap.read8(65298);
            const nr14 = this.memoryMap.read8(65299);
            const nr15 = this.memoryMap.read8(65300);
            this.dbgSound1.innerHTML = `\n      ${_getBinaryStringDefault.default(nr11)}\n      ${_getBinaryStringDefault.default(nr12)}\n      ${_getBinaryStringDefault.default(nr13)}\n      ${_getBinaryStringDefault.default(nr14)}\n      ${_getBinaryStringDefault.default(nr15)}\n    `;
            const nr21 = this.memoryMap.read8(65301);
            const nr22 = this.memoryMap.read8(65302);
            const nr23 = this.memoryMap.read8(65303);
            const nr24 = this.memoryMap.read8(65304);
            const nr25 = this.memoryMap.read8(65305);
            this.dbgSound2.innerHTML = `\n      ${_getBinaryStringDefault.default(nr21)}\n      ${_getBinaryStringDefault.default(nr22)}\n      ${_getBinaryStringDefault.default(nr23)}\n      ${_getBinaryStringDefault.default(nr24)}\n      ${_getBinaryStringDefault.default(nr25)}\n    `;
            // TODO: Add toggle for serial data
            // const serialDataString = this.cpu.serialData.map((value: number) => getHexString(value)).join(' ');
            // const serialTextString = this.cpu.serialData.map((value: number) => String.fromCharCode(value)).join('');
            // this.dbgSerial.innerHTML = `${serialDataString}<br/>${serialTextString}`;
            const oamValues = [];
            for(let i = 0; i < 40; i++){
                const y = this.memoryMap.read8(65024 + i * 4);
                const x = this.memoryMap.read8(65024 + i * 4 + 1);
                const id = this.memoryMap.read8(65024 + i * 4 + 2);
                const attrs = this.memoryMap.read8(65024 + i * 4 + 3);
                oamValues.push(`[${x}, ${y}, ${id}, ${_getBinaryStringDefault.default(attrs)}]`);
            }
            this.dbgOam.innerHTML = oamValues.join('<br/>');
            const lcdc = this.memoryMap.read8(65344);
            const bgWindowEnable = lcdc & 1;
            const objEnable = (lcdc & 2) >> 1;
            const objSize = (lcdc & 4) >> 2;
            const bgTileMap = (lcdc & 8) >> 3;
            const tileSource = (lcdc & 16) >> 4;
            const windowEnable = (lcdc & 32) >> 5;
            const windowTileMap = (lcdc & 64) >> 6;
            const lcdPpuEnable = (lcdc & 128) >> 7;
            this.dbgLcdC.innerHTML = `\n      ${_getBinaryStringDefault.default(lcdc)} (${_getHexStringDefault.default(lcdc)})<br/>\n      LCD Enabled:   ${lcdPpuEnable}<br/>\n      Window Source: ${windowTileMap}<br/>\n      Window Enabled: ${windowEnable}<br/>\n      Tile Source: ${tileSource}<br/>\n      BG Source: ${bgTileMap}<br/>\n      Obj Size: ${objSize}<br/>\n      Obj Enabled: ${objEnable}<br/>\n      BG Enabled: ${bgWindowEnable}<br/>\n    `;
            const colors = [
                0,
                4289374890,
                4283782485,
                4278190080
            ];
            const canvasWidth = this.dbgTilesCanvas.width;
            const canvasHeight = this.dbgTilesCanvas.height;
            const tileData = this.dbgTilesCtx.createImageData(canvasWidth, canvasHeight);
            const pixelArray = new Uint32Array(tileData.data.buffer);
            for(let i1 = 0; i1 < 384; i1++){
                const address = 32768 + i1 * 16;
                const x = i1 * 8 % canvasWidth;
                const y = Math.floor(i1 / (canvasWidth / 8)) * 8;
                for(let row = 0; row < 8; row++){
                    const byte1 = this.memoryMap.read8(address + row * 2);
                    const byte2 = this.memoryMap.read8(address + row * 2 + 1);
                    for(let column = 0; column < 8; column++){
                        const bit1 = byte1 >> 7 - column & 1;
                        const bit2 = byte2 >> 7 - column & 1;
                        const colorValue = bit1 + (bit2 << 1);
                        const color = colors[colorValue];
                        const offset = (y + row) * canvasWidth + x + column;
                        pixelArray[offset] = color;
                    }
                }
            }
            this.dbgTilesCtx.putImageData(tileData, 0, 0);
        // Highlight sections if needed
        // this.dbgTilesCtx.strokeStyle = '#00cefe';
        // this.dbgTilesCtx.lineWidth = 0.5;
        // this.dbgTilesCtx.strokeRect(0, 0, canvasWidth, canvasHeight / 3);
        // this.dbgTilesCtx.strokeRect(0, canvasHeight / 3, canvasWidth, canvasHeight / 3);
        // this.dbgTilesCtx.strokeRect(0, (canvasHeight / 3) * 2, canvasWidth, canvasHeight / 3);
        };
        this.memoryMap = new _memoryMapDefault.default();
        this.cpu = new _cpuDefault.default(this.memoryMap);
        this.gpu = new _ppuDefault.default(this.memoryMap, canvas);
        this.apu = new _apuDefault.default(this.memoryMap);
        this.joypad = new _joypadDefault.default(this.memoryMap);
        this.joypad.init();
        this.gpu.tick();
        // Debug references
        this.dbgA = document.getElementById('dbg_a');
        this.dbgF = document.getElementById('dbg_f');
        this.dbgAF = document.getElementById('dbg_af');
        this.dbgB = document.getElementById('dbg_b');
        this.dbgC = document.getElementById('dbg_c');
        this.dbgBC = document.getElementById('dbg_bc');
        this.dbgD = document.getElementById('dbg_d');
        this.dbgE = document.getElementById('dbg_e');
        this.dbgDE = document.getElementById('dbg_de');
        this.dbgH = document.getElementById('dbg_h');
        this.dbgL = document.getElementById('dbg_l');
        this.dbgHL = document.getElementById('dbg_hl');
        this.dbgPC = document.getElementById('dbg_pc');
        this.dbgSP = document.getElementById('dbg_sp');
        this.dbgJoypad = document.getElementById('dbg_joypad');
        this.dbgSound1 = document.getElementById('dbg_sound1');
        this.dbgSound2 = document.getElementById('dbg_sound2');
        this.dbgSound3 = document.getElementById('dbg_sound3');
        this.dbgSound4 = document.getElementById('dbg_sound4');
        this.dbgTilesCanvas = document.getElementById('dbg_tiles');
        this.dbgTilesCtx = this.dbgTilesCanvas.getContext('2d');
        this.dbgOam = document.getElementById('dbg_oam');
        this.dbgLcdC = document.getElementById('dbg_lcdc');
        this.dbgSerial = document.getElementById('dbg_serial');
    }
    /**
   * Pause/unpause emulation
   */ togglePause() {
        this.isPaused = !this.isPaused;
        if (this.isPaused && this.isAudioEnabled) this.apu.pause();
        else if (this.isAudioEnabled) this.apu.resume();
        return this.isPaused;
    }
    /**
   * Enable audio output
   */ enableAudio() {
        this.isAudioEnabled = true;
        this.apu.resume();
    }
    /**
   * Disable audio output
   */ disableAudio() {
        this.isAudioEnabled = false;
        this.apu.pause();
    }
    /**
   * Set the volume
   * @param volume The volume to set (0 - 100)
   */ setVolume(volume) {
        this.apu.setVolume(volume / 100);
    }
    /**
   * Load a cart into the emulator
   * @param cartData An array buffer containing the cart data
   */ loadCart(cartData) {
        console.log('load cart');
        this.memoryMap.loadCart(cartData);
        this.cpu.reset();
        if (this.isAudioEnabled) this.apu.resume();
        this.isRunning = true;
        if (this.animationFrameRequest) window.cancelAnimationFrame(this.animationFrameRequest);
        this.animationFrameRequest = requestAnimationFrame(this.update);
    }
}

},{"../cpu/Cpu":"7n0Xo","../gpu/Ppu":"3MCNg","../io/Joypad":"2KR0X","../memory/MemoryMap":"5I56E","../util/getHexString":"5PAti","../util/getBinaryString":"2Df2M","@parcel/transformer-js/src/esmodule-helpers.js":"367CR","./constants":"5joIN","../audio/Apu":"7JJk4"}],"7n0Xo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class emulating the CPU
 */ parcelHelpers.export(exports, "default", ()=>Cpu
);
var _constants = require("./constants");
var _opCodeMaps = require("./opCodeMaps");
var _types = require("./types");
const MAX_HISTORY = 1000;
class Cpu {
    // Getters to access registers array buffer
    // 8 bit
    get A() {
        return this.getRegister(_constants.REG_A);
    }
    get F() {
        return this.getRegister(_constants.REG_F);
    }
    get B() {
        return this.getRegister(_constants.REG_B);
    }
    get C() {
        return this.getRegister(_constants.REG_C);
    }
    get D() {
        return this.getRegister(_constants.REG_D);
    }
    get E() {
        return this.getRegister(_constants.REG_E);
    }
    get H() {
        return this.getRegister(_constants.REG_H);
    }
    get L() {
        return this.getRegister(_constants.REG_L);
    }
    // 16 bit
    get AF() {
        return this.getRegister16(_constants.REG_AF);
    }
    get BC() {
        return this.getRegister16(_constants.REG_BC);
    }
    get DE() {
        return this.getRegister16(_constants.REG_DE);
    }
    get HL() {
        return this.getRegister16(_constants.REG_HL);
    }
    get SP() {
        return this.getRegister16(_constants.REG_SP);
    }
    get PC() {
        return this.getRegister16(_constants.REG_PC);
    }
    // Flag boolean get helpers
    get flagZ() {
        return (this.F & _constants.BIT_FLAG_Z) === _constants.BIT_FLAG_Z;
    }
    get flagN() {
        return (this.F & _constants.BIT_FLAG_N) === _constants.BIT_FLAG_N;
    }
    get flagH() {
        return (this.F & _constants.BIT_FLAG_H) === _constants.BIT_FLAG_H;
    }
    get flagC() {
        return (this.F & _constants.BIT_FLAG_C) === _constants.BIT_FLAG_C;
    }
    // Setters to access registers array buffer
    // 8 bit
    set A(value) {
        this.setRegister(_constants.REG_A, value);
    }
    set F(value) {
        this.setRegister(_constants.REG_F, value & 240);
    }
    set B(value) {
        this.setRegister(_constants.REG_B, value);
    }
    set C(value) {
        this.setRegister(_constants.REG_C, value);
    }
    set D(value) {
        this.setRegister(_constants.REG_D, value);
    }
    set E(value) {
        this.setRegister(_constants.REG_E, value);
    }
    set H(value) {
        this.setRegister(_constants.REG_H, value);
    }
    set L(value) {
        this.setRegister(_constants.REG_L, value);
    }
    // 16 bit
    set AF(value) {
        this.setRegister16(_constants.REG_AF, value & 65520);
    }
    set BC(value) {
        this.setRegister16(_constants.REG_BC, value);
    }
    set DE(value) {
        this.setRegister16(_constants.REG_DE, value);
    }
    set HL(value) {
        this.setRegister16(_constants.REG_HL, value);
    }
    set SP(value) {
        this.setRegister16(_constants.REG_SP, value);
    }
    set PC(value) {
        this.setRegister16(_constants.REG_PC, value);
    }
    // Flag boolean set helpers
    set flagZ(value) {
        if (value) this.F = this.F | _constants.BIT_FLAG_Z;
        else this.F = this.F & _constants.MASK_FLAG_Z;
    }
    set flagN(value) {
        if (value) this.F = this.F | _constants.BIT_FLAG_N;
        else this.F = this.F & _constants.MASK_FLAG_N;
    }
    set flagH(value) {
        if (value) this.F = this.F | _constants.BIT_FLAG_H;
        else this.F = this.F & _constants.MASK_FLAG_H;
    }
    set flagC(value) {
        if (value) this.F = this.F | _constants.BIT_FLAG_C;
        else this.F = this.F & _constants.MASK_FLAG_C;
    }
    constructor(memoryMap){
        this.step = 0;
        this.cycleOffset = 0;
        this.opHistory = [];
        this.registersBuffer = new ArrayBuffer(12);
        this.registersView = new DataView(this.registersBuffer);
        this.dividerTick = 0;
        this.timerTick = 0;
        // Interrupts
        this.interruptsEnabled = false;
        this.serialData = [];
        this.memoryMap = memoryMap;
    }
    /**
   * Read the value of an operand from its specified location
   * @param operand The operand details
   */ readOperand(operand) {
        let value;
        switch(operand.type){
            case _types.OperandType.Immediate8:
                value = this.read8();
                break;
            case _types.OperandType.Immediate8Signed:
                value = this.read8Signed();
                break;
            case _types.OperandType.Immediate16:
                value = this.read16();
                break;
            case _types.OperandType.Register8:
                value = this.getRegister(operand.target);
                break;
            case _types.OperandType.Register16:
                value = this.getRegister16(operand.target);
                // Special cases for HL that modify it on access
                if (operand.modifier === _types.OperandModifier.Increment) this.HL += 1;
                else if (operand.modifier === _types.OperandModifier.Decrement) this.HL -= 1;
                break;
            case _types.OperandType.Value:
                // Values are stored in the operand (e.g. BIT 7, A)
                return operand.target;
        }
        if (operand.isAddress && (operand.type === _types.OperandType.Immediate8 || operand.type === _types.OperandType.Register8)) return this.read8(65280 | value);
        else if (operand.isAddress) return this.read8(value);
        return value;
    }
    /**
   * Write a value to the location specified by an operand
   * @param operand The operand details
   * @param value The value to set
   */ writeToOperand(operand, value) {
        if (operand.isAddress) {
            // Get the address stored at the operand target to write at
            let targetAddress;
            switch(operand.type){
                case _types.OperandType.Immediate8:
                    targetAddress = this.read8() | 65280;
                    break;
                case _types.OperandType.Immediate8Signed:
                    throw new Error('Immediate8Signed cannot be an address');
                case _types.OperandType.Immediate16:
                    targetAddress = this.read16();
                    break;
                case _types.OperandType.Register8:
                    targetAddress = this.getRegister(operand.target) | 65280;
                    break;
                case _types.OperandType.Register16:
                    targetAddress = this.getRegister16(operand.target);
                    break;
                case _types.OperandType.Value:
                    throw Error('Invalid operand type - cannot write direct value');
            }
            this.write8(targetAddress, value);
        } else // If target isn't an address, only registers can be targeted
        switch(operand.type){
            case _types.OperandType.Register8:
                this.setRegister(operand.target, value);
                break;
            case _types.OperandType.Register16:
                this.setRegister16(operand.target, value);
                break;
            default:
                throw new Error(`Invalid direct target operand for write: ${operand.type}`);
        }
        // Special cases for HL that modify it on access
        if (operand.modifier === _types.OperandModifier.Increment) this.HL += 1;
        else if (operand.modifier === _types.OperandModifier.Decrement) this.HL -= 1;
    }
    /**
   * Get the value of a register
   * @param register The register offset
   */ getRegister(register) {
        return this.registersView.getUint8(register);
    }
    /**
   * Get the value of a 16bit register (2 8bit combined)
   * @param register The register offset
   */ getRegister16(register) {
        return this.registersView.getUint16(register, false);
    }
    /**
   * Set the value of a register
   * @param register The register offset
   * @param value The value to set
   */ setRegister(register, value) {
        // Need to mask the lower 4 bits of register F
        if (register === _constants.REG_F) this.registersView.setUint8(register, value & 240);
        else this.registersView.setUint8(register, value);
    }
    /**
   * Set the value of a 16bit register (2 8bit combined)
   * @param register The register offset
   * @param value The value to set
   */ setRegister16(register, value) {
        // Need to mask the lower 4 bits of register F
        if (register === _constants.REG_AF) this.registersView.setUint16(register, value & 65520, false);
        else this.registersView.setUint16(register, value, false);
    }
    /**
   * Reset the CPU
   */ reset() {
        // Clear registers
        for(let i = 0; i < this.registersView.byteLength; i++)this.registersView.setUint8(i, 0);
        // Point the program counter at the entry point and stack pointer to the top of ram
        this.PC = 256;
        this.SP = 65534;
    }
    /**
   * Run one clock cycle of the CPU
   */ tick() {
        this.updateDivider();
        this.updateTimer();
        // Wait for main clock to catch up
        this.cycleOffset -= 1;
        if (this.cycleOffset > 0) return true;
        if (this.handleInterrupt()) return true;
        let opCode = this.read8();
        const isCbCode = opCode === 203;
        const opCodeTable = isCbCode ? _opCodeMaps.prefixedOpCodes : _opCodeMaps.mainOpCodes;
        // Prefixed op code, read actual op code
        if (isCbCode) opCode = this.read8();
        if (!opCodeTable[opCode]) {
            console.log('Unknown opcode: ', `${isCbCode ? '0xCB ' : ''}${opCode.toString(16)}`);
            return false;
        }
        const operation = opCodeTable[opCode];
        // + DEBUG ---
        this.opHistory.push({
            step: this.step,
            PC: `${this.PC - 1} [${(this.PC - 1).toString(16)}]`,
            codeString: opCode.toString(16),
            mnemonic: operation.mnemonic,
            nextBytes: [
                this.memoryMap.read8(this.PC),
                this.memoryMap.read8(this.PC + 1), 
            ],
            nextBytesSigned: [
                this.memoryMap.read8Signed(this.PC),
                this.memoryMap.read8Signed(this.PC + 1), 
            ]
        });
        if (this.opHistory.length > MAX_HISTORY) this.opHistory.shift();
        // - DEBUG ---
        const resultFlags = operation.action(this, operation.operands);
        this.flagZ = resultFlags.Z ?? this.flagZ;
        this.flagN = resultFlags.N ?? this.flagN;
        this.flagH = resultFlags.H ?? this.flagH;
        this.flagC = resultFlags.C ?? this.flagC;
        this.step += 1;
        // Set how many cycles to wait before next operation
        this.cycleOffset = operation.cycles - 1;
        return true;
    }
    /**
   * Read an 8bit int from memory at the given offset
   * Update the PC for direct reads (no address specified)
   * @param address The address offset (PC if not set)
   */ read8(address = null) {
        const targetAddress = address ?? this.PC;
        // TODO: Masked/blocked reads, etc.
        const value = this.memoryMap.read8(targetAddress);
        // Advance the program counter if read is immediate
        if (address === null) this.PC += 1;
        return value;
    }
    /**
   * Read an 8bit signed int from memory at the given offset
   * Update the PC for direct reads (no address specified)
   * @param address The address offset (PC if not set)
   */ read8Signed(address = null) {
        const targetAddress = address ?? this.PC;
        // TODO: Masked/blocked reads, etc.
        const value = this.memoryMap.read8Signed(targetAddress);
        // Advance the program counter if read is immediate
        if (address === null) this.PC += 1;
        return value;
    }
    /**
   * Read an 16bit int from memory at the given offset
   * Update the PC for direct reads (no address specified)
   * @param address The address offset (PC if not set)
   */ read16(address = null) {
        const targetAddress = address ?? this.PC;
        // TODO: Masked/blocked reads, etc.
        const value = this.memoryMap.read16(targetAddress);
        // Advance the program counter if read is immediate
        if (address === null) this.PC += 2;
        return value;
    }
    /**
   * Write an 8bit int to memory at the given offset
   * @param address The address to write to
   * @param value The 8bit value to write
   */ write8(address, value) {
        if (this.writeMasking(address, value)) return;
        this.memoryMap.write8(address, value);
    }
    /**
   * Write a 16bit int to memory at the given offset
   * @param address The address to write to
   * @param value The 16bit value to write
   */ write16(address, value) {
        if (this.writeMasking(address, value)) return;
        this.memoryMap.write16(address, value);
    }
    /**
   * Helper to intercept writing to special addresses
   * @param address The address to check before writing
   * @param value The value that is being written
   * @returns Whether the write was intercepted
   */ writeMasking(address, value) {
        // TODO: ROM Bank Select
        if (address === 8192) return true;
        // Serial port
        if (address === 65281) this.serialData.push(value);
        if (address === 65284) {
            // Divider register - reset to 0 when any value is written to it
            this.memoryMap.write8(address, 0);
            return true;
        }
        return false;
    }
    /**
   * Update the divider each cycle
   */ updateDivider() {
        this.dividerTick += 1;
        if (this.dividerTick === _constants.DIVIDER_FREQUENCY) {
            this.dividerTick = 0;
            const divider = this.memoryMap.read8(65284) + 1;
            this.memoryMap.write8(65284, divider & 255);
        }
    }
    /**
   * Update the timer each cycle
   */ updateTimer() {
        const timerControl = this.memoryMap.read8(65287);
        const timerEnabled = (timerControl & 4) === 4;
        if (timerEnabled) {
            const timerFreqFlag = timerControl & 2;
            let timerFreq = 4096;
            if (timerFreqFlag === 1) timerFreq = 262144;
            else if (timerFreqFlag === 2) timerFreq = 65536;
            else if (timerFreqFlag === 3) timerFreq = 16384;
            this.timerTick += 1;
            if (this.timerTick === timerFreq) {
                this.timerTick = 0;
                const timer = this.memoryMap.read8(65285) + 1;
                // Overflow, write modulo to timer and trigger IRQ
                if (timer > 255) {
                    const timerModulo = this.memoryMap.read8(65286);
                    this.memoryMap.write8(65285, timerModulo);
                    // Trigger IRQ
                    const irq = this.memoryMap.read8(65295) | 4;
                    this.memoryMap.write8(65295, irq);
                } else this.memoryMap.write8(65285, timer & 255);
            }
        }
    }
    /**
   * Check for and handle interrupts
   * @returns Whether an interrupt was handled
   */ handleInterrupt() {
        if (this.interruptsEnabled) {
            const irq = this.memoryMap.read8(65295); // Interrupt Request Flag
            const irqe = this.memoryMap.read8(65535); // Interrupt Request Enable
            // Determine the vector based on which bit is set
            // Prioritized from bit 0 - 4
            let interruptVector = 0;
            let bitMask = 31; // Default to no clearing
            if ((irq & irqe & 1) === 1) {
                // VSync
                bitMask = 30;
                interruptVector = 64;
            } else if ((irq & irqe & 2) === 2) {
                // LCD STAT
                bitMask = 29;
                interruptVector = 72;
            } else if ((irq & irqe & 4) === 4) {
                // Timer
                bitMask = 27;
                interruptVector = 80;
            } else if ((irq & irqe & 8) === 8) {
                // Serial
                bitMask = 23;
                interruptVector = 88;
            } else if ((irq & irqe & 16) === 16) {
                // Joypad
                bitMask = 15;
                interruptVector = 96;
            }
            // No interrupts matched
            if (interruptVector === 0) return false;
            // Disable any further interrupts until re-enabled
            this.interruptsEnabled = false;
            // Clear the flag for the interrupt being processed
            this.memoryMap.write8(65295, irq & bitMask);
            // Push the current PC onto the stack
            this.SP -= 2;
            this.memoryMap.write16(this.SP, this.PC);
            // Jump to the Interrupt Vector
            this.PC = interruptVector;
            this.cycleOffset = 5;
            return true;
        }
        return false;
    }
}

},{"./constants":"39YfB","./opCodeMaps":"32vuq","./types":"4buia","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"39YfB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DIVIDER_FREQUENCY", ()=>DIVIDER_FREQUENCY
);
parcelHelpers.export(exports, "REG_A", ()=>REG_A
);
parcelHelpers.export(exports, "REG_F", ()=>REG_F
);
parcelHelpers.export(exports, "REG_B", ()=>REG_B
);
parcelHelpers.export(exports, "REG_C", ()=>REG_C
);
parcelHelpers.export(exports, "REG_D", ()=>REG_D
);
parcelHelpers.export(exports, "REG_E", ()=>REG_E
);
parcelHelpers.export(exports, "REG_H", ()=>REG_H
);
parcelHelpers.export(exports, "REG_L", ()=>REG_L
);
parcelHelpers.export(exports, "REG_AF", ()=>REG_AF
);
parcelHelpers.export(exports, "REG_BC", ()=>REG_BC
);
parcelHelpers.export(exports, "REG_DE", ()=>REG_DE
);
parcelHelpers.export(exports, "REG_HL", ()=>REG_HL
);
parcelHelpers.export(exports, "REG_SP", ()=>REG_SP
);
parcelHelpers.export(exports, "REG_PC", ()=>REG_PC
);
parcelHelpers.export(exports, "BIT_FLAG_Z", ()=>BIT_FLAG_Z
);
parcelHelpers.export(exports, "BIT_FLAG_N", ()=>BIT_FLAG_N
);
parcelHelpers.export(exports, "BIT_FLAG_H", ()=>BIT_FLAG_H
);
parcelHelpers.export(exports, "BIT_FLAG_C", ()=>BIT_FLAG_C
);
parcelHelpers.export(exports, "MASK_FLAG_Z", ()=>MASK_FLAG_Z
);
parcelHelpers.export(exports, "MASK_FLAG_N", ()=>MASK_FLAG_N
);
parcelHelpers.export(exports, "MASK_FLAG_H", ()=>MASK_FLAG_H
);
parcelHelpers.export(exports, "MASK_FLAG_C", ()=>MASK_FLAG_C
);
parcelHelpers.export(exports, "FLAGS_NO_CHANGE", ()=>FLAGS_NO_CHANGE
);
const DIVIDER_FREQUENCY = 16384;
const REG_A = 0;
const REG_F = 1;
const REG_B = 2;
const REG_C = 3;
const REG_D = 4;
const REG_E = 5;
const REG_H = 6;
const REG_L = 7;
const REG_AF = 0;
const REG_BC = 2;
const REG_DE = 4;
const REG_HL = 6;
const REG_SP = 8;
const REG_PC = 10;
const BIT_FLAG_Z = 128;
const BIT_FLAG_N = 64;
const BIT_FLAG_H = 32;
const BIT_FLAG_C = 16;
const MASK_FLAG_Z = 127;
const MASK_FLAG_N = 191;
const MASK_FLAG_H = 223;
const MASK_FLAG_C = 239;
const FLAGS_NO_CHANGE = {
    Z: null,
    N: null,
    H: null,
    C: null
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"367CR":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule') return;
        // Skip duplicate re-exports when they have the same value.
        if (key in dest && dest[key] === source[key]) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"32vuq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "mainOpCodes", ()=>_mainDefault.default
);
parcelHelpers.export(exports, "prefixedOpCodes", ()=>_prefixedDefault.default
);
var _main = require("./main");
var _mainDefault = parcelHelpers.interopDefault(_main);
var _prefixed = require("./prefixed");
var _prefixedDefault = parcelHelpers.interopDefault(_prefixed);

},{"./main":"5gdgx","./prefixed":"3vhu2","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"5gdgx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _adc = require("../operations/adc");
var _add = require("../operations/add");
var _addDefault = parcelHelpers.interopDefault(_add);
var _addSp = require("../operations/addSp");
var _addSpDefault = parcelHelpers.interopDefault(_addSp);
var _and = require("../operations/and");
var _andDefault = parcelHelpers.interopDefault(_and);
var _call = require("../operations/call");
var _callDefault = parcelHelpers.interopDefault(_call);
var _callC = require("../operations/callC");
var _callCDefault = parcelHelpers.interopDefault(_callC);
var _callNc = require("../operations/callNc");
var _callNcDefault = parcelHelpers.interopDefault(_callNc);
var _callNz = require("../operations/callNz");
var _callNzDefault = parcelHelpers.interopDefault(_callNz);
var _callZ = require("../operations/callZ");
var _callZDefault = parcelHelpers.interopDefault(_callZ);
var _ccf = require("../operations/ccf");
var _ccfDefault = parcelHelpers.interopDefault(_ccf);
var _cp = require("../operations/cp");
var _cpDefault = parcelHelpers.interopDefault(_cp);
var _cpl = require("../operations/cpl");
var _cplDefault = parcelHelpers.interopDefault(_cpl);
var _daa = require("../operations/daa");
var _daaDefault = parcelHelpers.interopDefault(_daa);
var _dec = require("../operations/dec");
var _decDefault = parcelHelpers.interopDefault(_dec);
var _di = require("../operations/di");
var _diDefault = parcelHelpers.interopDefault(_di);
var _ei = require("../operations/ei");
var _eiDefault = parcelHelpers.interopDefault(_ei);
var _inc = require("../operations/inc");
var _incDefault = parcelHelpers.interopDefault(_inc);
var _jp = require("../operations/jp");
var _jpDefault = parcelHelpers.interopDefault(_jp);
var _jpc = require("../operations/jpc");
var _jpcDefault = parcelHelpers.interopDefault(_jpc);
var _jpnc = require("../operations/jpnc");
var _jpncDefault = parcelHelpers.interopDefault(_jpnc);
var _jpnz = require("../operations/jpnz");
var _jpnzDefault = parcelHelpers.interopDefault(_jpnz);
var _jpz = require("../operations/jpz");
var _jpzDefault = parcelHelpers.interopDefault(_jpz);
var _jr = require("../operations/jr");
var _jrDefault = parcelHelpers.interopDefault(_jr);
var _jrc = require("../operations/jrc");
var _jrcDefault = parcelHelpers.interopDefault(_jrc);
var _jrnc = require("../operations/jrnc");
var _jrncDefault = parcelHelpers.interopDefault(_jrnc);
var _jrnz = require("../operations/jrnz");
var _jrnzDefault = parcelHelpers.interopDefault(_jrnz);
var _jrz = require("../operations/jrz");
var _jrzDefault = parcelHelpers.interopDefault(_jrz);
var _ld = require("../operations/ld");
var _ldDefault = parcelHelpers.interopDefault(_ld);
var _ldHlSpE8 = require("../operations/ldHlSpE8");
var _ldHlSpE8Default = parcelHelpers.interopDefault(_ldHlSpE8);
var _nop = require("../operations/nop");
var _nopDefault = parcelHelpers.interopDefault(_nop);
var _or = require("../operations/or");
var _orDefault = parcelHelpers.interopDefault(_or);
var _pop = require("../operations/pop");
var _popDefault = parcelHelpers.interopDefault(_pop);
var _push = require("../operations/push");
var _pushDefault = parcelHelpers.interopDefault(_push);
var _ret = require("../operations/ret");
var _retDefault = parcelHelpers.interopDefault(_ret);
var _retc = require("../operations/retc");
var _retcDefault = parcelHelpers.interopDefault(_retc);
var _reti = require("../operations/reti");
var _retiDefault = parcelHelpers.interopDefault(_reti);
var _retnc = require("../operations/retnc");
var _retncDefault = parcelHelpers.interopDefault(_retnc);
var _retnz = require("../operations/retnz");
var _retnzDefault = parcelHelpers.interopDefault(_retnz);
var _retz = require("../operations/retz");
var _retzDefault = parcelHelpers.interopDefault(_retz);
var _rla = require("../operations/rla");
var _rlaDefault = parcelHelpers.interopDefault(_rla);
var _rlca = require("../operations/rlca");
var _rlcaDefault = parcelHelpers.interopDefault(_rlca);
var _rra = require("../operations/rra");
var _rraDefault = parcelHelpers.interopDefault(_rra);
var _rrca = require("../operations/rrca");
var _rrcaDefault = parcelHelpers.interopDefault(_rrca);
var _rst00 = require("../operations/rst00");
var _rst00Default = parcelHelpers.interopDefault(_rst00);
var _rst08 = require("../operations/rst08");
var _rst08Default = parcelHelpers.interopDefault(_rst08);
var _rst10 = require("../operations/rst10");
var _rst10Default = parcelHelpers.interopDefault(_rst10);
var _rst18 = require("../operations/rst18");
var _rst18Default = parcelHelpers.interopDefault(_rst18);
var _rst20 = require("../operations/rst20");
var _rst20Default = parcelHelpers.interopDefault(_rst20);
var _rst28 = require("../operations/rst28");
var _rst28Default = parcelHelpers.interopDefault(_rst28);
var _rst30 = require("../operations/rst30");
var _rst30Default = parcelHelpers.interopDefault(_rst30);
var _rst38 = require("../operations/rst38");
var _rst38Default = parcelHelpers.interopDefault(_rst38);
var _sbc = require("../operations/sbc");
var _sbcDefault = parcelHelpers.interopDefault(_sbc);
var _scf = require("../operations/scf");
var _scfDefault = parcelHelpers.interopDefault(_scf);
var _sub = require("../operations/sub");
var _subDefault = parcelHelpers.interopDefault(_sub);
var _xor = require("../operations/xor");
var _xorDefault = parcelHelpers.interopDefault(_xor);
var _types = require("../types");
const main = {
    0: {
        action: _nopDefault.default,
        operands: [],
        mnemonic: 'NOP',
        bytes: 1,
        cycles: 4
    },
    1: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_BC
            },
            {
                type: _types.OperandType.Immediate16
            }, 
        ],
        mnemonic: 'LD BC, d16',
        bytes: 3,
        cycles: 12
    },
    2: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_BC,
                isAddress: true
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'LD (BC), A',
        bytes: 1,
        cycles: 8
    },
    3: {
        action: _incDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_BC
            }, 
        ],
        mnemonic: 'INC BC',
        bytes: 1,
        cycles: 8
    },
    4: {
        action: _incDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'INC B',
        bytes: 1,
        cycles: 8
    },
    5: {
        action: _decDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'DEC B',
        bytes: 1,
        cycles: 4
    },
    6: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            },
            {
                type: _types.OperandType.Immediate8
            }, 
        ],
        mnemonic: 'LD B, d8',
        bytes: 2,
        cycles: 8
    },
    7: {
        action: _rlcaDefault.default,
        mnemonic: 'RLCA',
        operands: [],
        bytes: 1,
        cycles: 4
    },
    8: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate16,
                isAddress: true
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_SP
            }, 
        ],
        mnemonic: 'LD (a16), SP',
        bytes: 3,
        cycles: 20
    },
    9: {
        action: _addDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_BC
            }, 
        ],
        mnemonic: 'ADD HL, BC',
        bytes: 1,
        cycles: 8
    },
    10: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_BC,
                isAddress: true
            }, 
        ],
        mnemonic: 'LD A, (BC)',
        bytes: 1,
        cycles: 4
    },
    11: {
        action: _decDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_BC
            }, 
        ],
        mnemonic: 'DEC BC',
        bytes: 1,
        cycles: 8
    },
    12: {
        action: _incDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'INC C',
        bytes: 1,
        cycles: 4
    },
    13: {
        action: _decDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'DEC C',
        bytes: 1,
        cycles: 4
    },
    14: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            },
            {
                type: _types.OperandType.Immediate8
            }, 
        ],
        mnemonic: 'LD C, d8',
        bytes: 2,
        cycles: 8
    },
    15: {
        action: _rrcaDefault.default,
        operands: [],
        mnemonic: 'RRCA',
        bytes: 1,
        cycles: 4
    },
    16: {
        action: _nopDefault.default,
        operands: [],
        mnemonic: 'STOP d8',
        bytes: 2,
        cycles: 4
    },
    17: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_DE
            },
            {
                type: _types.OperandType.Immediate16
            }, 
        ],
        mnemonic: 'LD DE, d16',
        bytes: 3,
        cycles: 12
    },
    18: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_DE,
                isAddress: true
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'LD (DE), A',
        bytes: 1,
        cycles: 8
    },
    19: {
        action: _incDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_DE
            }, 
        ],
        mnemonic: 'INC DE',
        bytes: 1,
        cycles: 8
    },
    20: {
        action: _incDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'INC D',
        bytes: 1,
        cycles: 8
    },
    21: {
        action: _decDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'DEC D',
        bytes: 1,
        cycles: 4
    },
    22: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            },
            {
                type: _types.OperandType.Immediate8
            }, 
        ],
        mnemonic: 'LD D, d8',
        bytes: 2,
        cycles: 8
    },
    23: {
        action: _rlaDefault.default,
        operands: [],
        mnemonic: 'RLA',
        bytes: 1,
        cycles: 4
    },
    24: {
        action: _jrDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate8Signed
            }, 
        ],
        mnemonic: 'JR n',
        bytes: 2,
        cycles: 12
    },
    25: {
        action: _addDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_DE
            }, 
        ],
        mnemonic: 'ADD HL, DE',
        bytes: 1,
        cycles: 8
    },
    26: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_DE,
                isAddress: true
            }, 
        ],
        mnemonic: 'LD A, (DE)',
        bytes: 1,
        cycles: 4
    },
    27: {
        action: _decDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_DE
            }, 
        ],
        mnemonic: 'DEC DE',
        bytes: 1,
        cycles: 8
    },
    28: {
        action: _incDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'INC E',
        bytes: 1,
        cycles: 8
    },
    29: {
        action: _decDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'DEC E',
        bytes: 1,
        cycles: 4
    },
    30: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            },
            {
                type: _types.OperandType.Immediate8
            }, 
        ],
        mnemonic: 'LD E, d8',
        bytes: 2,
        cycles: 8
    },
    31: {
        action: _rraDefault.default,
        operands: [],
        mnemonic: 'RRA',
        bytes: 1,
        cycles: 4
    },
    32: {
        action: _jrnzDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate8Signed
            }, 
        ],
        mnemonic: 'JR NZ, R8',
        bytes: 2,
        cycles: 8
    },
    33: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL
            },
            {
                type: _types.OperandType.Immediate16
            }, 
        ],
        mnemonic: 'LD HL, d16',
        bytes: 3,
        cycles: 12
    },
    34: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true,
                modifier: _types.OperandModifier.Increment
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'LD (HL)+, A',
        bytes: 1,
        cycles: 8
    },
    35: {
        action: _incDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL
            }, 
        ],
        mnemonic: 'INC HL',
        bytes: 1,
        cycles: 8
    },
    36: {
        action: _incDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'INC H',
        bytes: 1,
        cycles: 8
    },
    37: {
        action: _decDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'DEC H',
        bytes: 1,
        cycles: 4
    },
    38: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            },
            {
                type: _types.OperandType.Immediate8
            }, 
        ],
        mnemonic: 'LD H, d8',
        bytes: 2,
        cycles: 8
    },
    39: {
        action: _daaDefault.default,
        operands: [],
        mnemonic: 'DAA',
        bytes: 1,
        cycles: 4
    },
    40: {
        action: _jrzDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate8Signed
            }, 
        ],
        mnemonic: 'JR Z, R8',
        bytes: 2,
        cycles: 8
    },
    41: {
        action: _addDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL
            }, 
        ],
        mnemonic: 'ADD HL, HL',
        bytes: 1,
        cycles: 8
    },
    42: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true,
                modifier: _types.OperandModifier.Increment
            }, 
        ],
        mnemonic: 'LD A, (HL+)',
        bytes: 1,
        cycles: 8
    },
    43: {
        action: _decDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL
            }, 
        ],
        mnemonic: 'DEC HL',
        bytes: 1,
        cycles: 8
    },
    44: {
        action: _incDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'INC L',
        bytes: 1,
        cycles: 8
    },
    45: {
        action: _decDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'DEC L',
        bytes: 1,
        cycles: 4
    },
    46: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            },
            {
                type: _types.OperandType.Immediate8
            }, 
        ],
        mnemonic: 'LD L, d8',
        bytes: 2,
        cycles: 8
    },
    47: {
        action: _cplDefault.default,
        operands: [],
        mnemonic: 'CPL',
        bytes: 1,
        cycles: 4
    },
    48: {
        action: _jrncDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate8Signed
            }, 
        ],
        mnemonic: 'JR NC, R8',
        bytes: 2,
        cycles: 8
    },
    49: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_SP
            },
            {
                type: _types.OperandType.Immediate16
            }, 
        ],
        mnemonic: 'LD SP, d16',
        bytes: 3,
        cycles: 12
    },
    50: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true,
                modifier: _types.OperandModifier.Decrement
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'LD (HLD), A',
        bytes: 1,
        cycles: 8
    },
    51: {
        action: _incDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_SP
            }, 
        ],
        mnemonic: 'INC SP',
        bytes: 1,
        cycles: 8
    },
    52: {
        action: _incDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'INC (HL)',
        bytes: 1,
        cycles: 12
    },
    53: {
        action: _decDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'DEC (HL)',
        bytes: 1,
        cycles: 12
    },
    54: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            },
            {
                type: _types.OperandType.Immediate8
            }, 
        ],
        mnemonic: 'LD (HL), d8',
        bytes: 2,
        cycles: 12
    },
    55: {
        action: _scfDefault.default,
        operands: [],
        mnemonic: 'SCF',
        bytes: 1,
        cycles: 4
    },
    56: {
        action: _jrcDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate8Signed
            }, 
        ],
        mnemonic: 'JR C, R8',
        bytes: 2,
        cycles: 8
    },
    57: {
        action: _addDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_SP
            }, 
        ],
        mnemonic: 'ADD HL, SP',
        bytes: 1,
        cycles: 8
    },
    58: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true,
                modifier: _types.OperandModifier.Decrement
            }, 
        ],
        mnemonic: 'LD A, (HL-)',
        bytes: 1,
        cycles: 8
    },
    59: {
        action: _decDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_SP
            }, 
        ],
        mnemonic: 'DEC SP',
        bytes: 1,
        cycles: 8
    },
    60: {
        action: _incDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'INC A',
        bytes: 1,
        cycles: 8
    },
    61: {
        action: _decDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'DEC A',
        bytes: 1,
        cycles: 4
    },
    62: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Immediate8
            }, 
        ],
        mnemonic: 'LD A, d8',
        bytes: 1,
        cycles: 8
    },
    63: {
        action: _ccfDefault.default,
        operands: [],
        mnemonic: 'CCF',
        bytes: 1,
        cycles: 4
    },
    64: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'LD B, B',
        bytes: 1,
        cycles: 4
    },
    65: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'LD B, C',
        bytes: 1,
        cycles: 4
    },
    66: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'LD B, D',
        bytes: 1,
        cycles: 4
    },
    67: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'LD B, E',
        bytes: 1,
        cycles: 4
    },
    68: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'LD B, H',
        bytes: 1,
        cycles: 4
    },
    69: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'LD B, L',
        bytes: 1,
        cycles: 4
    },
    70: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'LD B, (HL)',
        bytes: 1,
        cycles: 4
    },
    71: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'LD B, A',
        bytes: 1,
        cycles: 4
    },
    72: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'LD C, B',
        bytes: 1,
        cycles: 4
    },
    73: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'LD C, C',
        bytes: 1,
        cycles: 4
    },
    74: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'LD C, D',
        bytes: 1,
        cycles: 4
    },
    75: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'LD C, E',
        bytes: 1,
        cycles: 4
    },
    76: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'LD C, H',
        bytes: 1,
        cycles: 4
    },
    77: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'LD C, L',
        bytes: 1,
        cycles: 4
    },
    78: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'LD C, (HL)',
        bytes: 1,
        cycles: 4
    },
    79: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'LD C, A',
        bytes: 1,
        cycles: 4
    },
    80: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'LD D, B',
        bytes: 1,
        cycles: 4
    },
    81: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'LD D, C',
        bytes: 1,
        cycles: 4
    },
    82: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'LD D, D',
        bytes: 1,
        cycles: 4
    },
    83: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'LD D, E',
        bytes: 1,
        cycles: 4
    },
    84: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'LD D, H',
        bytes: 1,
        cycles: 4
    },
    85: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'LD D, L',
        bytes: 1,
        cycles: 4
    },
    86: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'LD D, (HL)',
        bytes: 1,
        cycles: 4
    },
    87: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'LD D, A',
        bytes: 1,
        cycles: 4
    },
    88: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'LD E, B',
        bytes: 1,
        cycles: 4
    },
    89: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'LD E, C',
        bytes: 1,
        cycles: 4
    },
    90: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'LD E, D',
        bytes: 1,
        cycles: 4
    },
    91: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'LD E, E',
        bytes: 1,
        cycles: 4
    },
    92: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'LD E, H',
        bytes: 1,
        cycles: 4
    },
    93: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'LD E, L',
        bytes: 1,
        cycles: 4
    },
    94: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'LD E, (HL)',
        bytes: 1,
        cycles: 8
    },
    95: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'LD E, A',
        bytes: 1,
        cycles: 4
    },
    96: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'LD H, B',
        bytes: 1,
        cycles: 4
    },
    97: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'LD H, C',
        bytes: 1,
        cycles: 4
    },
    98: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'LD H, D',
        bytes: 1,
        cycles: 4
    },
    99: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'LD H, E',
        bytes: 1,
        cycles: 4
    },
    100: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'LD H, H',
        bytes: 1,
        cycles: 4
    },
    101: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'LD H, L',
        bytes: 1,
        cycles: 4
    },
    102: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'LD H, (HL)',
        bytes: 1,
        cycles: 8
    },
    103: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'LD H, A',
        bytes: 1,
        cycles: 4
    },
    104: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'LD L, B',
        bytes: 1,
        cycles: 4
    },
    105: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'LD L, C',
        bytes: 1,
        cycles: 4
    },
    106: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'LD L, D',
        bytes: 1,
        cycles: 4
    },
    107: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'LD L, E',
        bytes: 1,
        cycles: 4
    },
    108: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'LD L, H',
        bytes: 1,
        cycles: 4
    },
    109: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'LD L, L',
        bytes: 1,
        cycles: 4
    },
    110: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'LD L, (HL)',
        bytes: 1,
        cycles: 8
    },
    111: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'LD L, A',
        bytes: 1,
        cycles: 4
    },
    112: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'LD (HL), B',
        bytes: 1,
        cycles: 4
    },
    113: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'LD (HL), C',
        bytes: 1,
        cycles: 4
    },
    114: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'LD (HL), D',
        bytes: 1,
        cycles: 4
    },
    115: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'LD (HL), E',
        bytes: 1,
        cycles: 4
    },
    116: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'LD (HL), H',
        bytes: 1,
        cycles: 4
    },
    117: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'LD (HL), L',
        bytes: 1,
        cycles: 4
    },
    118: {
        action: _nopDefault.default,
        operands: [],
        mnemonic: 'HALT',
        bytes: 1,
        cycles: 4
    },
    119: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'LD (HL), A',
        bytes: 1,
        cycles: 8
    },
    120: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'LD A, B',
        bytes: 1,
        cycles: 4
    },
    121: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'LD A, C',
        bytes: 1,
        cycles: 4
    },
    122: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'LD A, D',
        bytes: 1,
        cycles: 4
    },
    123: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'LD A, E',
        bytes: 1,
        cycles: 4
    },
    124: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'LD A, H',
        bytes: 1,
        cycles: 4
    },
    125: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'LD A, L',
        bytes: 1,
        cycles: 4
    },
    126: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'LD A, (HL)',
        bytes: 1,
        cycles: 4
    },
    127: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'LD A, A',
        bytes: 1,
        cycles: 4
    },
    128: {
        action: _addDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'ADD A, B',
        bytes: 1,
        cycles: 4
    },
    129: {
        action: _addDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'ADD A, C',
        bytes: 1,
        cycles: 4
    },
    130: {
        action: _addDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'ADD A, D',
        bytes: 1,
        cycles: 4
    },
    131: {
        action: _addDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'ADD A, E',
        bytes: 1,
        cycles: 4
    },
    132: {
        action: _addDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'ADD A, H',
        bytes: 1,
        cycles: 4
    },
    133: {
        action: _addDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'ADD A, L',
        bytes: 1,
        cycles: 4
    },
    134: {
        action: _addDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'ADD A, (HL)',
        bytes: 1,
        cycles: 8
    },
    135: {
        action: _addDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'ADD A, A',
        bytes: 1,
        cycles: 4
    },
    136: {
        action: _adc.adc,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'ADC A, B',
        bytes: 1,
        cycles: 4
    },
    137: {
        action: _adc.adc,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'ADC A, C',
        bytes: 1,
        cycles: 4
    },
    138: {
        action: _adc.adc,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'ADC A, D',
        bytes: 1,
        cycles: 4
    },
    139: {
        action: _adc.adc,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'ADC A, E',
        bytes: 1,
        cycles: 4
    },
    140: {
        action: _adc.adc,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'ADC A, H',
        bytes: 1,
        cycles: 4
    },
    141: {
        action: _adc.adc,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'ADC A, L',
        bytes: 1,
        cycles: 4
    },
    142: {
        action: _adc.adc,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'ADC A, (HL)',
        bytes: 1,
        cycles: 8
    },
    143: {
        action: _adc.adc,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'ADC A, A',
        bytes: 1,
        cycles: 4
    },
    144: {
        action: _subDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'SUB B',
        bytes: 1,
        cycles: 4
    },
    145: {
        action: _subDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'SUB C',
        bytes: 1,
        cycles: 4
    },
    146: {
        action: _subDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'SUB D',
        bytes: 1,
        cycles: 4
    },
    147: {
        action: _subDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'SUB E',
        bytes: 1,
        cycles: 4
    },
    148: {
        action: _subDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'SUB H',
        bytes: 1,
        cycles: 4
    },
    149: {
        action: _subDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'SUB L',
        bytes: 1,
        cycles: 4
    },
    150: {
        action: _subDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'SUB (HL)',
        bytes: 1,
        cycles: 8
    },
    151: {
        action: _subDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'SUB A',
        bytes: 1,
        cycles: 4
    },
    152: {
        action: _sbcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'SBC A, B',
        bytes: 1,
        cycles: 4
    },
    153: {
        action: _sbcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'SBC A, C',
        bytes: 1,
        cycles: 4
    },
    154: {
        action: _sbcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'SBC A, D',
        bytes: 1,
        cycles: 4
    },
    155: {
        action: _sbcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'SBC A, E',
        bytes: 1,
        cycles: 4
    },
    156: {
        action: _sbcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'SBC A, H',
        bytes: 1,
        cycles: 4
    },
    157: {
        action: _sbcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'SBC A, L',
        bytes: 1,
        cycles: 4
    },
    158: {
        action: _sbcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'SBC A, (HL)',
        bytes: 1,
        cycles: 4
    },
    159: {
        action: _sbcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'SBC A, A',
        bytes: 1,
        cycles: 4
    },
    160: {
        action: _andDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'AND B',
        bytes: 1,
        cycles: 4
    },
    161: {
        action: _andDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'AND C',
        bytes: 1,
        cycles: 4
    },
    162: {
        action: _andDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'AND D',
        bytes: 1,
        cycles: 4
    },
    163: {
        action: _andDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'AND E',
        bytes: 1,
        cycles: 4
    },
    164: {
        action: _andDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'AND H',
        bytes: 1,
        cycles: 4
    },
    165: {
        action: _andDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'AND L',
        bytes: 1,
        cycles: 4
    },
    166: {
        action: _andDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'AND (HL)',
        bytes: 1,
        cycles: 8
    },
    167: {
        action: _andDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'AND A',
        bytes: 1,
        cycles: 4
    },
    168: {
        action: _xorDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'XOR B',
        bytes: 1,
        cycles: 4
    },
    169: {
        action: _xorDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'XOR C',
        bytes: 1,
        cycles: 4
    },
    170: {
        action: _xorDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'XOR D',
        bytes: 1,
        cycles: 4
    },
    171: {
        action: _xorDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'XOR E',
        bytes: 1,
        cycles: 4
    },
    172: {
        action: _xorDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'XOR H',
        bytes: 1,
        cycles: 4
    },
    173: {
        action: _xorDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'XOR L',
        bytes: 1,
        cycles: 4
    },
    174: {
        action: _xorDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'XOR (HL)',
        bytes: 1,
        cycles: 8
    },
    175: {
        action: _xorDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'XOR A',
        bytes: 1,
        cycles: 4
    },
    176: {
        action: _orDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'OR B',
        bytes: 1,
        cycles: 4
    },
    177: {
        action: _orDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'OR C',
        bytes: 1,
        cycles: 4
    },
    178: {
        action: _orDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'OR D',
        bytes: 1,
        cycles: 4
    },
    179: {
        action: _orDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'OR E',
        bytes: 1,
        cycles: 4
    },
    180: {
        action: _orDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'OR H',
        bytes: 1,
        cycles: 4
    },
    181: {
        action: _orDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'OR L',
        bytes: 1,
        cycles: 4
    },
    182: {
        action: _orDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'OR (HL)',
        bytes: 1,
        cycles: 4
    },
    183: {
        action: _orDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'OR A',
        bytes: 1,
        cycles: 4
    },
    184: {
        action: _cpDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'CP B',
        bytes: 1,
        cycles: 4
    },
    185: {
        action: _cpDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'CP C',
        bytes: 1,
        cycles: 4
    },
    186: {
        action: _cpDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'CP D',
        bytes: 1,
        cycles: 4
    },
    187: {
        action: _cpDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'CP E',
        bytes: 1,
        cycles: 4
    },
    188: {
        action: _cpDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'CP H',
        bytes: 1,
        cycles: 4
    },
    189: {
        action: _cpDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'CP L',
        bytes: 1,
        cycles: 4
    },
    190: {
        action: _cpDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'CP (HL)',
        bytes: 1,
        cycles: 8
    },
    191: {
        action: _cpDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'CP A',
        bytes: 1,
        cycles: 4
    },
    192: {
        action: _retnzDefault.default,
        operands: [],
        mnemonic: 'RET NZ',
        bytes: 1,
        cycles: 8
    },
    193: {
        action: _popDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_BC
            }, 
        ],
        mnemonic: 'POP BC',
        bytes: 1,
        cycles: 12
    },
    194: {
        action: _jpnzDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate16
            }, 
        ],
        mnemonic: 'JP NZ a16',
        bytes: 1,
        cycles: 12
    },
    195: {
        action: _jpDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate16
            }, 
        ],
        mnemonic: 'JP a16',
        bytes: 3,
        cycles: 12
    },
    196: {
        action: _callNzDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate16
            }, 
        ],
        mnemonic: 'CALL NZ, a16',
        bytes: 3,
        cycles: 12
    },
    197: {
        action: _pushDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_BC
            }, 
        ],
        mnemonic: 'PUSH BC',
        bytes: 1,
        cycles: 16
    },
    198: {
        action: _addDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Immediate8
            }, 
        ],
        mnemonic: 'ADD A, d8',
        bytes: 2,
        cycles: 8
    },
    199: {
        action: _rst00Default.default,
        operands: [],
        mnemonic: 'RST 00',
        bytes: 1,
        cycles: 32
    },
    200: {
        action: _retzDefault.default,
        operands: [],
        mnemonic: 'RET Z',
        bytes: 1,
        cycles: 8
    },
    201: {
        action: _retDefault.default,
        operands: [],
        mnemonic: 'RET',
        bytes: 1,
        cycles: 8
    },
    202: {
        action: _jpzDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate16
            }, 
        ],
        mnemonic: 'JP Z a16',
        bytes: 1,
        cycles: 12
    },
    204: {
        action: _callZDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate16
            }, 
        ],
        mnemonic: 'CALL Z, a16',
        bytes: 3,
        cycles: 12
    },
    205: {
        action: _callDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate16
            }, 
        ],
        mnemonic: 'CALL a16',
        bytes: 3,
        cycles: 24
    },
    206: {
        action: _adc.adc,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Immediate8
            }, 
        ],
        mnemonic: 'ADC A, d8',
        bytes: 2,
        cycles: 8
    },
    207: {
        action: _rst08Default.default,
        operands: [],
        mnemonic: 'RST 08',
        bytes: 1,
        cycles: 32
    },
    208: {
        action: _retncDefault.default,
        operands: [],
        mnemonic: 'RET NC',
        bytes: 1,
        cycles: 8
    },
    209: {
        action: _popDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_DE
            }, 
        ],
        mnemonic: 'POP DE',
        bytes: 1,
        cycles: 12
    },
    210: {
        action: _jpncDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate16
            }, 
        ],
        mnemonic: 'JP NC a16',
        bytes: 1,
        cycles: 12
    },
    212: {
        action: _callNcDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate16
            }, 
        ],
        mnemonic: 'CALL NC, a16',
        bytes: 3,
        cycles: 12
    },
    213: {
        action: _pushDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_DE
            }, 
        ],
        mnemonic: 'PUSH DE',
        bytes: 1,
        cycles: 16
    },
    214: {
        action: _subDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Immediate8
            }, 
        ],
        mnemonic: 'SUB d8',
        bytes: 2,
        cycles: 8
    },
    215: {
        action: _rst10Default.default,
        operands: [],
        mnemonic: 'RST 10',
        bytes: 1,
        cycles: 32
    },
    216: {
        action: _retcDefault.default,
        operands: [],
        mnemonic: 'RET C',
        bytes: 1,
        cycles: 8
    },
    217: {
        action: _retiDefault.default,
        operands: [],
        mnemonic: 'RETI',
        bytes: 1,
        cycles: 8
    },
    218: {
        action: _jpcDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate16
            }, 
        ],
        mnemonic: 'JP C a16',
        bytes: 1,
        cycles: 12
    },
    220: {
        action: _callCDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate16
            }, 
        ],
        mnemonic: 'CALL C, a16',
        bytes: 3,
        cycles: 12
    },
    222: {
        action: _sbcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'SBC A, B',
        bytes: 2,
        cycles: 8
    },
    223: {
        action: _rst18Default.default,
        operands: [],
        mnemonic: 'RST 18',
        bytes: 1,
        cycles: 32
    },
    224: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate8,
                isAddress: true
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'LDH a8, A',
        bytes: 2,
        cycles: 12
    },
    225: {
        action: _popDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL
            }, 
        ],
        mnemonic: 'POP HL',
        bytes: 1,
        cycles: 12
    },
    226: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C,
                isAddress: true
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'LD (C), A',
        bytes: 1,
        cycles: 8
    },
    229: {
        action: _pushDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL
            }, 
        ],
        mnemonic: 'PUSH HL',
        bytes: 1,
        cycles: 16
    },
    230: {
        action: _andDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Immediate8
            }, 
        ],
        mnemonic: 'AND d8',
        bytes: 2,
        cycles: 8
    },
    231: {
        action: _rst20Default.default,
        operands: [],
        mnemonic: 'RST 20',
        bytes: 1,
        cycles: 32
    },
    232: {
        action: _addSpDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate8Signed
            }, 
        ],
        mnemonic: 'ADD SP, r8',
        bytes: 2,
        cycles: 16
    },
    233: {
        action: _jpDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL
            }, 
        ],
        mnemonic: 'JP HL',
        bytes: 1,
        cycles: 4
    },
    234: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Immediate16,
                isAddress: true
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'LDH a16, A',
        bytes: 3,
        cycles: 16
    },
    238: {
        action: _xorDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Immediate8
            }, 
        ],
        mnemonic: 'XOR d8',
        bytes: 1,
        cycles: 8
    },
    239: {
        action: _rst28Default.default,
        operands: [],
        mnemonic: 'RST 28',
        bytes: 1,
        cycles: 32
    },
    240: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Immediate8,
                isAddress: true
            }, 
        ],
        mnemonic: 'LDH A, a8',
        bytes: 2,
        cycles: 12
    },
    241: {
        action: _popDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_AF
            }, 
        ],
        mnemonic: 'POP AF',
        bytes: 1,
        cycles: 12
    },
    242: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C,
                isAddress: true
            }, 
        ],
        mnemonic: 'LD A, (C)',
        bytes: 1,
        cycles: 12
    },
    243: {
        action: _diDefault.default,
        operands: [],
        mnemonic: 'DI',
        bytes: 1,
        cycles: 4
    },
    245: {
        action: _pushDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_AF
            }, 
        ],
        mnemonic: 'PUSH AF',
        bytes: 1,
        cycles: 16
    },
    246: {
        action: _orDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Immediate8
            }, 
        ],
        mnemonic: 'OR d8',
        bytes: 1,
        cycles: 8
    },
    247: {
        action: _rst30Default.default,
        operands: [],
        mnemonic: 'RST 30',
        bytes: 1,
        cycles: 32
    },
    248: {
        action: _ldHlSpE8Default.default,
        operands: [],
        mnemonic: 'LD HL, SP + r8',
        bytes: 2,
        cycles: 12
    },
    249: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_SP
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL
            }, 
        ],
        mnemonic: 'LD SP, HL',
        bytes: 1,
        cycles: 8
    },
    250: {
        action: _ldDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Immediate16,
                isAddress: true
            }, 
        ],
        mnemonic: 'LD A, a16',
        bytes: 1,
        cycles: 16
    },
    251: {
        action: _eiDefault.default,
        operands: [],
        mnemonic: 'EI',
        bytes: 1,
        cycles: 4
    },
    254: {
        action: _cpDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            },
            {
                type: _types.OperandType.Immediate8
            }, 
        ],
        mnemonic: 'CP d8',
        bytes: 2,
        cycles: 8
    },
    255: {
        action: _rst38Default.default,
        operands: [],
        mnemonic: 'RST 38',
        bytes: 1,
        cycles: 32
    }
};
exports.default = main;

},{"../constants":"39YfB","../operations/adc":"GInnj","../operations/add":"4JvPu","../operations/addSp":"6oFYd","../operations/and":"q6bnl","../operations/call":"5btzh","../operations/callC":"39R5O","../operations/callNc":"1kvuL","../operations/callNz":"3xx8p","../operations/callZ":"4gEwA","../operations/ccf":"7B2uz","../operations/cp":"3HYk0","../operations/cpl":"zdJRb","../operations/daa":"3BXWh","../operations/dec":"1i7o5","../operations/di":"2dx91","../operations/ei":"7mPIo","../operations/inc":"4t5F2","../operations/jp":"6hvRn","../operations/jpc":"3zmBh","../operations/jpnc":"1ODEk","../operations/jpnz":"5RUDf","../operations/jpz":"47fAb","../operations/jr":"3IlIG","../operations/jrc":"2TWX5","../operations/jrnc":"4U0g8","../operations/jrnz":"1qOdw","../operations/jrz":"1KYhC","../operations/ld":"2SkQH","../operations/ldHlSpE8":"cqvY4","../operations/nop":"58GDh","../operations/or":"6UqSq","../operations/pop":"kA4Iv","../operations/push":"7oh5f","../operations/ret":"6MSvB","../operations/retc":"2wQUU","../operations/reti":"2ZNjt","../operations/retnc":"7bIoB","../operations/retnz":"5PF37","../operations/retz":"LWoqh","../operations/rla":"6e3q8","../operations/rlca":"1OeQs","../operations/rra":"AzGC7","../operations/rrca":"56fpe","../operations/rst00":"7LH5h","../operations/rst08":"28psr","../operations/rst10":"4mLBy","../operations/rst18":"7pWDy","../operations/rst20":"5W3Cm","../operations/rst28":"3GNq0","../operations/rst30":"39ZrN","../operations/rst38":"4DsLw","../operations/sbc":"w1hXr","../operations/scf":"1ORxo","../operations/sub":"5Kg1Y","../operations/xor":"tEkTd","../types":"4buia","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"GInnj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Add two values plus the carry flag
 * @param cpu The Cpu to operate on
 * @param operands [0] = first value, [1] = the second value
 */ parcelHelpers.export(exports, "adc", ()=>adc
);
var _checkAddHalfCarry = require("../helpers/checkAddHalfCarry");
function adc(cpu, operands) {
    const value1 = cpu.readOperand(operands[0]);
    const value2 = cpu.readOperand(operands[1]);
    const result = value1 + value2 + (cpu.flagC ? 1 : 0);
    const maskedResult = result & 255;
    cpu.writeToOperand(operands[0], maskedResult);
    return {
        Z: maskedResult === 0,
        N: false,
        H: _checkAddHalfCarry.checkAddHalfCarry(value1, value2, cpu.flagC),
        C: (result & 256) === 256
    };
}

},{"../helpers/checkAddHalfCarry":"3E2eF","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"3E2eF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Check if there is a half carry adding values
 * @param value1 The first value being added
 * @param value2 The second value being added
 * @param plusOne Whether 1 should be added to the result (carry result)
 */ parcelHelpers.export(exports, "checkAddHalfCarry", ()=>checkAddHalfCarry
);
function checkAddHalfCarry(value1, value2, plusOne = false) {
    return ((value1 & 15) + (value2 & 15) + (plusOne ? 1 : 0) & 16) === 16;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"4JvPu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _checkAddHalfCarry = require("../helpers/checkAddHalfCarry");
var _types = require("../types");
function add(cpu, operands) {
    const value1 = cpu.readOperand(operands[0]);
    const value2 = cpu.readOperand(operands[1]);
    const result = value1 + value2;
    // Handle 16bit add (except SP)
    if (operands[0].type === _types.OperandType.Register16 && operands[0].target !== _constants.REG_SP) {
        const maskedResult = result & 65535;
        cpu.writeToOperand(operands[0], maskedResult);
        return {
            Z: null,
            N: false,
            H: ((value1 & 255) + (value2 & 255) & 4096) === 4096,
            C: (result & 65536) === 65536
        };
    }
    const maskedResult = result & 255;
    cpu.writeToOperand(operands[0], maskedResult);
    return {
        Z: maskedResult === 0,
        N: false,
        H: _checkAddHalfCarry.checkAddHalfCarry(value1, value2),
        C: (result & 256) === 256
    };
}
exports.default = add;

},{"../helpers/checkAddHalfCarry":"3E2eF","../types":"4buia","@parcel/transformer-js/src/esmodule-helpers.js":"367CR","../constants":"39YfB"}],"4buia":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OperandType", ()=>OperandType
);
parcelHelpers.export(exports, "OperandModifier", ()=>OperandModifier
);
var OperandType;
(function(OperandType1) {
    OperandType1["Register8"] = "Register8";
    OperandType1["Register16"] = "Register16";
    OperandType1["Immediate8"] = "Immediate8";
    OperandType1["Immediate8Signed"] = "Immediate8Signed";
    OperandType1["Immediate16"] = "Immediate16";
    OperandType1["Value"] = "Value";
})(OperandType || (OperandType = {
}));
var OperandModifier;
(function(OperandModifier1) {
    OperandModifier1["Increment"] = "Increment";
    OperandModifier1["Decrement"] = "Decrement";
})(OperandModifier || (OperandModifier = {
}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"6oFYd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function addSp(cpu, operands) {
    const value1 = cpu.SP;
    const value2 = cpu.readOperand(operands[0]);
    const result = value1 + value2;
    const maskedResult = result & 65535;
    cpu.SP = maskedResult;
    return {
        Z: false,
        N: false,
        H: ((value1 & 255) + (value2 & 255) & 4096) === 4096,
        C: (result & 65536) === 65536
    };
}
exports.default = addSp;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"q6bnl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function and(cpu, operands) {
    const value1 = cpu.readOperand(operands[0]);
    const value2 = cpu.readOperand(operands[1]);
    const result = value1 & value2;
    cpu.writeToOperand(operands[0], result);
    return {
        Z: result === 0,
        N: false,
        H: true,
        C: false
    };
}
exports.default = and;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"5btzh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _types = require("../types");
var _push = require("./push");
var _pushDefault = parcelHelpers.interopDefault(_push);
function call(cpu, operands) {
    const jumpAddress = cpu.readOperand(operands[0]);
    _pushDefault.default(cpu, [
        {
            type: _types.OperandType.Register16,
            target: _constants.REG_PC
        }
    ]);
    cpu.PC = jumpAddress;
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = call;

},{"../constants":"39YfB","../types":"4buia","./push":"7oh5f","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"7oh5f":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function push(cpu, operands) {
    const value = cpu.readOperand(operands[0]);
    cpu.SP -= 2;
    cpu.write16(cpu.SP, value);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = push;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"39R5O":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _types = require("../types");
var _push = require("./push");
var _pushDefault = parcelHelpers.interopDefault(_push);
function callC(cpu, operands) {
    const jumpAddress = cpu.readOperand(operands[0]);
    if (cpu.flagC) {
        _pushDefault.default(cpu, [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_PC
            }
        ]);
        cpu.PC = jumpAddress;
    }
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = callC;

},{"../constants":"39YfB","../types":"4buia","./push":"7oh5f","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"1kvuL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _types = require("../types");
var _push = require("./push");
var _pushDefault = parcelHelpers.interopDefault(_push);
function callNc(cpu, operands) {
    const jumpAddress = cpu.readOperand(operands[0]);
    if (!cpu.flagC) {
        _pushDefault.default(cpu, [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_PC
            }
        ]);
        cpu.PC = jumpAddress;
    }
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = callNc;

},{"../constants":"39YfB","../types":"4buia","./push":"7oh5f","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"3xx8p":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _types = require("../types");
var _push = require("./push");
var _pushDefault = parcelHelpers.interopDefault(_push);
function callNz(cpu, operands) {
    const jumpAddress = cpu.readOperand(operands[0]);
    if (!cpu.flagZ) {
        _pushDefault.default(cpu, [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_PC
            }
        ]);
        cpu.PC = jumpAddress;
    }
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = callNz;

},{"../constants":"39YfB","../types":"4buia","./push":"7oh5f","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"4gEwA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _types = require("../types");
var _push = require("./push");
var _pushDefault = parcelHelpers.interopDefault(_push);
function callZ(cpu, operands) {
    const jumpAddress = cpu.readOperand(operands[0]);
    if (cpu.flagZ) {
        _pushDefault.default(cpu, [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_PC
            }
        ]);
        cpu.PC = jumpAddress;
    }
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = callZ;

},{"../constants":"39YfB","../types":"4buia","./push":"7oh5f","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"7B2uz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function ccf(cpu) {
    return {
        Z: null,
        N: false,
        H: false,
        C: !cpu.flagC
    };
}
exports.default = ccf;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"3HYk0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _checkSubtractHalfCarry = require("../helpers/checkSubtractHalfCarry");
function cp(cpu, operands) {
    const value1 = cpu.readOperand(operands[0]);
    const value2 = cpu.readOperand(operands[1]);
    const result = value1 - value2;
    return {
        Z: result === 0,
        N: true,
        H: _checkSubtractHalfCarry.checkSubtractHalfCarry(value1, value2),
        C: result < 0
    };
}
exports.default = cp;

},{"../helpers/checkSubtractHalfCarry":"6bEUt","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"6bEUt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Check if there is a half carry subtracting values
 * @param value1 The value being subtracted from
 * @param value2 The value being subtracted
 * @param plusOne Whether 1 should be subtracted from the result (carry result)
 */ parcelHelpers.export(exports, "checkSubtractHalfCarry", ()=>checkSubtractHalfCarry
);
function checkSubtractHalfCarry(value1, value2, minusOne = false) {
    return ((value1 & 15) - (value2 & 15) - (minusOne ? 1 : 0) & 16) === 16;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"zdJRb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function cpl(cpu) {
    cpu.A = cpu.A ^ 255;
    return {
        Z: null,
        N: true,
        H: true,
        C: null
    };
}
exports.default = cpl;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"3BXWh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function daa(cpu) {
    let result = cpu.A;
    let flagC = null;
    // Addition - flagN = if previous op was subtraction
    if (!cpu.flagN) {
        if (cpu.flagH || (cpu.A & 15) > 9) result += 6;
        if (cpu.flagC || cpu.A > 153) {
            result += 96;
            flagC = true;
        }
    } else if (cpu.flagH) {
        // Subtraction
        if (cpu.flagH) result -= 6;
        if (cpu.flagC) result -= 96;
    }
    const maskedResult = result & 255;
    cpu.A = maskedResult;
    return {
        Z: maskedResult === 0,
        N: null,
        H: false,
        C: flagC
    };
}
exports.default = daa;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"1i7o5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _checkSubtractHalfCarry = require("../helpers/checkSubtractHalfCarry");
var _types = require("../types");
function dec(cpu, operands) {
    const value = cpu.readOperand(operands[0]);
    const result = value - 1;
    const maskedResult = operands[0].type === _types.OperandType.Register16 && !operands[0].isAddress ? result & 65535 : result & 255;
    cpu.writeToOperand(operands[0], maskedResult);
    // 16 bit operations don't affect flags
    if (operands[0].type === _types.OperandType.Register16 && !operands[0].isAddress) return _constants.FLAGS_NO_CHANGE;
    return {
        Z: result === 0,
        N: true,
        H: _checkSubtractHalfCarry.checkSubtractHalfCarry(value, 1),
        C: null
    };
}
exports.default = dec;

},{"../constants":"39YfB","../helpers/checkSubtractHalfCarry":"6bEUt","../types":"4buia","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"2dx91":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function di(cpu) {
    cpu.interruptsEnabled = false;
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = di;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"7mPIo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function ei(cpu) {
    cpu.interruptsEnabled = true;
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = ei;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"4t5F2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _checkAddHalfCarry = require("../helpers/checkAddHalfCarry");
var _types = require("../types");
function inc(cpu, operands) {
    const value = cpu.readOperand(operands[0]);
    const result = value + 1;
    const maskedResult = operands[0].type === _types.OperandType.Register16 && !operands[0].isAddress ? result & 65535 : result & 255;
    cpu.writeToOperand(operands[0], maskedResult);
    // 16 bit operations don't affect flags
    if (operands[0].type === _types.OperandType.Register16 && !operands[0].isAddress) return _constants.FLAGS_NO_CHANGE;
    return {
        Z: maskedResult === 0,
        N: false,
        H: _checkAddHalfCarry.checkAddHalfCarry(value, 1),
        C: null
    };
}
exports.default = inc;

},{"../constants":"39YfB","../helpers/checkAddHalfCarry":"3E2eF","../types":"4buia","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"6hvRn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function jp(cpu, operands) {
    const jumpAddress = cpu.readOperand(operands[0]);
    cpu.PC = jumpAddress;
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = jp;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"3zmBh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function jpC(cpu, operands) {
    const jumpAddress = cpu.readOperand(operands[0]);
    if (cpu.flagC) cpu.PC = jumpAddress;
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = jpC;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"1ODEk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function jpNc(cpu, operands) {
    const jumpAddress = cpu.readOperand(operands[0]);
    if (!cpu.flagC) cpu.PC = jumpAddress;
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = jpNc;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"5RUDf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function jpNz(cpu, operands) {
    const jumpAddress = cpu.readOperand(operands[0]);
    if (!cpu.flagZ) cpu.PC = jumpAddress;
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = jpNz;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"47fAb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function jpZ(cpu, operands) {
    const jumpAddress = cpu.readOperand(operands[0]);
    if (cpu.flagZ) cpu.PC = jumpAddress;
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = jpZ;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"3IlIG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function jr(cpu, operands) {
    const jumpOffset = cpu.readOperand(operands[0]);
    cpu.PC += jumpOffset;
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = jr;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"2TWX5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function jrC(cpu, operands) {
    // Always read to advance the PC
    const jumpOffset = cpu.readOperand(operands[0]);
    if (cpu.flagC) cpu.PC += jumpOffset;
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = jrC;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"4U0g8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function jrNc(cpu, operands) {
    // Always read to advance the PC
    const jumpOffset = cpu.readOperand(operands[0]);
    if (!cpu.flagC) cpu.PC += jumpOffset;
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = jrNc;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"1qOdw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function jrNz(cpu, operands) {
    // Always read to advance the PC
    const jumpOffset = cpu.readOperand(operands[0]);
    if (!cpu.flagZ) cpu.PC += jumpOffset;
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = jrNz;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"1KYhC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function jrZ(cpu, operands) {
    // Always read to advance the PC
    const jumpOffset = cpu.readOperand(operands[0]);
    if (cpu.flagZ) cpu.PC += jumpOffset;
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = jrZ;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"2SkQH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function ld(cpu, operands) {
    cpu.writeToOperand(operands[0], cpu.readOperand(operands[1]));
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = ld;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"cqvY4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _checkAddHalfCarry = require("../helpers/checkAddHalfCarry");
function ldHlSpE8(cpu) {
    const value = cpu.read8Signed();
    cpu.HL = cpu.SP + value;
    return {
        Z: false,
        N: false,
        H: _checkAddHalfCarry.checkAddHalfCarry(cpu.SP, value),
        C: (cpu.HL & 256) === 256
    };
}
exports.default = ldHlSpE8;

},{"../helpers/checkAddHalfCarry":"3E2eF","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"58GDh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function nop() {
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = nop;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"6UqSq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function or(cpu, operands) {
    const value1 = cpu.readOperand(operands[0]);
    const value2 = cpu.readOperand(operands[1]);
    const result = value1 | value2;
    cpu.writeToOperand(operands[0], result);
    return {
        Z: result === 0,
        N: false,
        H: false,
        C: false
    };
}
exports.default = or;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"kA4Iv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function pop(cpu, operands) {
    const value = cpu.read16(cpu.SP);
    cpu.SP += 2;
    cpu.writeToOperand(operands[0], value);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = pop;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"6MSvB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _types = require("../types");
var _pop = require("./pop");
var _popDefault = parcelHelpers.interopDefault(_pop);
function ret(cpu) {
    return _popDefault.default(cpu, [
        {
            type: _types.OperandType.Register16,
            target: _constants.REG_PC
        }
    ]);
}
exports.default = ret;

},{"../constants":"39YfB","../types":"4buia","./pop":"kA4Iv","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"2wQUU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _ret = require("./ret");
var _retDefault = parcelHelpers.interopDefault(_ret);
function retC(cpu) {
    if (cpu.flagC) return _retDefault.default(cpu);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = retC;

},{"../constants":"39YfB","./ret":"6MSvB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"2ZNjt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _ei = require("./ei");
var _eiDefault = parcelHelpers.interopDefault(_ei);
var _ret = require("./ret");
var _retDefault = parcelHelpers.interopDefault(_ret);
function reti(cpu) {
    _retDefault.default(cpu);
    _eiDefault.default(cpu);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = reti;

},{"../constants":"39YfB","./ei":"7mPIo","./ret":"6MSvB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"7bIoB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _ret = require("./ret");
var _retDefault = parcelHelpers.interopDefault(_ret);
function retNc(cpu) {
    if (!cpu.flagC) return _retDefault.default(cpu);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = retNc;

},{"../constants":"39YfB","./ret":"6MSvB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"5PF37":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _ret = require("./ret");
var _retDefault = parcelHelpers.interopDefault(_ret);
function retNz(cpu) {
    if (!cpu.flagZ) return _retDefault.default(cpu);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = retNz;

},{"../constants":"39YfB","./ret":"6MSvB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"LWoqh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _ret = require("./ret");
var _retDefault = parcelHelpers.interopDefault(_ret);
function retZ(cpu) {
    if (cpu.flagZ) return _retDefault.default(cpu);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = retZ;

},{"../constants":"39YfB","./ret":"6MSvB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"6e3q8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _types = require("../types");
var _rl = require("./rl");
var _rlDefault = parcelHelpers.interopDefault(_rl);
function rla(cpu) {
    const resultFlags = _rlDefault.default(cpu, [
        {
            type: _types.OperandType.Register8,
            target: _constants.REG_A
        }
    ]);
    return {
        Z: false,
        N: false,
        H: false,
        C: resultFlags.C
    };
}
exports.default = rla;

},{"../constants":"39YfB","../types":"4buia","./rl":"4EsNM","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"4EsNM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function rl(cpu, operands) {
    const value = cpu.readOperand(operands[0]);
    let result = value << 1;
    // Shift the carry flag in
    if (cpu.flagC) result = result | 1;
    const maskedResult = result & 255;
    cpu.writeToOperand(operands[0], maskedResult);
    return {
        Z: maskedResult === 0,
        N: false,
        H: false,
        C: (result & 256) === 256
    };
}
exports.default = rl;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"1OeQs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _types = require("../types");
var _rlc = require("./rlc");
var _rlcDefault = parcelHelpers.interopDefault(_rlc);
function rlca(cpu) {
    const resultFlags = _rlcDefault.default(cpu, [
        {
            type: _types.OperandType.Register8,
            target: _constants.REG_A
        }, 
    ]);
    return {
        Z: false,
        N: false,
        H: false,
        C: resultFlags.C
    };
}
exports.default = rlca;

},{"../constants":"39YfB","../types":"4buia","./rlc":"5wDHu","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"5wDHu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function rlc(cpu, operands) {
    const value = cpu.readOperand(operands[0]);
    let result = value << 1;
    // Move carry to carry flag (existing carry discarded)
    const flagC = (result & 256) === 256;
    // Rotate 7th bit in same as carry
    if (flagC) result = result | 1;
    const maskedResult = result & 255;
    cpu.writeToOperand(operands[0], maskedResult);
    return {
        Z: maskedResult === 0,
        N: false,
        H: false,
        C: flagC
    };
}
exports.default = rlc;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"AzGC7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _types = require("../types");
var _rr = require("./rr");
var _rrDefault = parcelHelpers.interopDefault(_rr);
function rra(cpu) {
    const resultFlags = _rrDefault.default(cpu, [
        {
            type: _types.OperandType.Register8,
            target: _constants.REG_A
        }
    ]);
    return {
        Z: false,
        N: false,
        H: false,
        C: resultFlags.C
    };
}
exports.default = rra;

},{"../constants":"39YfB","../types":"4buia","./rr":"6VA1A","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"6VA1A":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function rr(cpu, operands) {
    const value = cpu.readOperand(operands[0]);
    let result = value >> 1;
    // Shift the carry flag in
    if (cpu.flagC) result = result | 128;
    const maskedResult = result & 255;
    cpu.writeToOperand(operands[0], maskedResult);
    return {
        Z: maskedResult === 0,
        N: false,
        H: false,
        C: (value & 1) === 1
    };
}
exports.default = rr;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"56fpe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _types = require("../types");
var _rrc = require("./rrc");
var _rrcDefault = parcelHelpers.interopDefault(_rrc);
function rrca(cpu) {
    const resultFlags = _rrcDefault.default(cpu, [
        {
            type: _types.OperandType.Register8,
            target: _constants.REG_A
        }, 
    ]);
    return {
        Z: false,
        N: false,
        H: false,
        C: resultFlags.C
    };
}
exports.default = rrca;

},{"../constants":"39YfB","../types":"4buia","./rrc":"25RyH","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"25RyH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function rrc(cpu, operands) {
    const value = cpu.readOperand(operands[0]);
    let result = value >> 1;
    // Move carry to carry flag (existing carry discarded)
    const flagC = (value & 1) === 1;
    // Rotate 0th bit in same as carry
    if (flagC) result = result | 128;
    const maskedResult = result & 255;
    cpu.writeToOperand(operands[0], maskedResult);
    return {
        Z: maskedResult === 0,
        N: false,
        H: false,
        C: flagC
    };
}
exports.default = rrc;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"7LH5h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _rst = require("./rst");
var _rstDefault = parcelHelpers.interopDefault(_rst);
function rst00(cpu) {
    _rstDefault.default(cpu, 0);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = rst00;

},{"../constants":"39YfB","./rst":"3vtcW","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"3vtcW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function rst(cpu, address) {
    cpu.SP -= 2;
    cpu.write16(cpu.SP, cpu.PC);
    cpu.PC = address;
}
exports.default = rst;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"28psr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _rst = require("./rst");
var _rstDefault = parcelHelpers.interopDefault(_rst);
function rst08(cpu) {
    _rstDefault.default(cpu, 8);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = rst08;

},{"../constants":"39YfB","./rst":"3vtcW","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"4mLBy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _rst = require("./rst");
var _rstDefault = parcelHelpers.interopDefault(_rst);
function rst10(cpu) {
    _rstDefault.default(cpu, 16);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = rst10;

},{"../constants":"39YfB","./rst":"3vtcW","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"7pWDy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _rst = require("./rst");
var _rstDefault = parcelHelpers.interopDefault(_rst);
function rst18(cpu) {
    _rstDefault.default(cpu, 24);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = rst18;

},{"../constants":"39YfB","./rst":"3vtcW","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"5W3Cm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _rst = require("./rst");
var _rstDefault = parcelHelpers.interopDefault(_rst);
function rst20(cpu) {
    _rstDefault.default(cpu, 32);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = rst20;

},{"../constants":"39YfB","./rst":"3vtcW","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"3GNq0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _rst = require("./rst");
var _rstDefault = parcelHelpers.interopDefault(_rst);
function rst28(cpu) {
    _rstDefault.default(cpu, 40);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = rst28;

},{"../constants":"39YfB","./rst":"3vtcW","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"39ZrN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _rst = require("./rst");
var _rstDefault = parcelHelpers.interopDefault(_rst);
function rst30(cpu) {
    _rstDefault.default(cpu, 48);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = rst30;

},{"../constants":"39YfB","./rst":"3vtcW","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"4DsLw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _rst = require("./rst");
var _rstDefault = parcelHelpers.interopDefault(_rst);
function rst38(cpu) {
    _rstDefault.default(cpu, 56);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = rst38;

},{"../constants":"39YfB","./rst":"3vtcW","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"w1hXr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _checkSubtractHalfCarry = require("../helpers/checkSubtractHalfCarry");
function sbc(cpu, operands) {
    const value1 = cpu.readOperand(operands[0]);
    const value2 = cpu.readOperand(operands[1]);
    const result = value1 - value2 - (cpu.flagC ? 1 : 0);
    const maskedResult = result & 255;
    cpu.writeToOperand(operands[0], maskedResult);
    return {
        Z: maskedResult === 0,
        N: true,
        H: _checkSubtractHalfCarry.checkSubtractHalfCarry(value1, value2, cpu.flagC),
        C: result < 0
    };
}
exports.default = sbc;

},{"../helpers/checkSubtractHalfCarry":"6bEUt","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"1ORxo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function scf() {
    return {
        Z: null,
        N: false,
        H: false,
        C: true
    };
}
exports.default = scf;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"5Kg1Y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _checkSubtractHalfCarry = require("../helpers/checkSubtractHalfCarry");
function sub(cpu, operands) {
    const value1 = cpu.readOperand(operands[0]);
    const value2 = cpu.readOperand(operands[1]);
    const result = value1 - value2;
    const maskedResult = result & 255;
    cpu.writeToOperand(operands[0], maskedResult);
    return {
        Z: maskedResult === 0,
        N: true,
        H: _checkSubtractHalfCarry.checkSubtractHalfCarry(value1, value2),
        C: result < 0
    };
}
exports.default = sub;

},{"../helpers/checkSubtractHalfCarry":"6bEUt","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"tEkTd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function xor(cpu, operands) {
    const value1 = cpu.readOperand(operands[0]);
    const value2 = cpu.readOperand(operands[1]);
    const result = value1 ^ value2;
    cpu.writeToOperand(operands[0], result);
    return {
        Z: result === 0,
        N: false,
        H: false,
        C: false
    };
}
exports.default = xor;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"3vhu2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
var _bit = require("../operations/bit");
var _bitDefault = parcelHelpers.interopDefault(_bit);
var _res = require("../operations/res");
var _resDefault = parcelHelpers.interopDefault(_res);
var _rl = require("../operations/rl");
var _rlDefault = parcelHelpers.interopDefault(_rl);
var _rlc = require("../operations/rlc");
var _rlcDefault = parcelHelpers.interopDefault(_rlc);
var _rr = require("../operations/rr");
var _rrDefault = parcelHelpers.interopDefault(_rr);
var _rrc = require("../operations/rrc");
var _rrcDefault = parcelHelpers.interopDefault(_rrc);
var _set = require("../operations/set");
var _setDefault = parcelHelpers.interopDefault(_set);
var _sla = require("../operations/sla");
var _slaDefault = parcelHelpers.interopDefault(_sla);
var _sra = require("../operations/sra");
var _sraDefault = parcelHelpers.interopDefault(_sra);
var _srl = require("../operations/srl");
var _srlDefault = parcelHelpers.interopDefault(_srl);
var _swap = require("../operations/swap");
var _swapDefault = parcelHelpers.interopDefault(_swap);
var _types = require("../types");
const prefixed = {
    0: {
        action: _rlcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'RLC B',
        bytes: 1,
        cycles: 8
    },
    1: {
        action: _rlcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'RLC C',
        bytes: 1,
        cycles: 8
    },
    2: {
        action: _rlcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'RLC D',
        bytes: 1,
        cycles: 8
    },
    3: {
        action: _rlcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'RLC E',
        bytes: 1,
        cycles: 8
    },
    4: {
        action: _rlcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'RLC H',
        bytes: 1,
        cycles: 8
    },
    5: {
        action: _rlcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'RLC L',
        bytes: 1,
        cycles: 8
    },
    6: {
        action: _rlcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'RLC (HL)',
        bytes: 1,
        cycles: 8
    },
    7: {
        action: _rlcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'RLC A',
        bytes: 1,
        cycles: 8
    },
    8: {
        action: _rrcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'RRC B',
        bytes: 1,
        cycles: 8
    },
    9: {
        action: _rrcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'RRC C',
        bytes: 1,
        cycles: 8
    },
    10: {
        action: _rrcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'RRC D',
        bytes: 1,
        cycles: 8
    },
    11: {
        action: _rrcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'RRC E',
        bytes: 1,
        cycles: 8
    },
    12: {
        action: _rrcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'RRC H',
        bytes: 1,
        cycles: 8
    },
    13: {
        action: _rrcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'RRC L',
        bytes: 1,
        cycles: 8
    },
    14: {
        action: _rrcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'RRC (HL)',
        bytes: 1,
        cycles: 16
    },
    15: {
        action: _rrcDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'RRC A',
        bytes: 1,
        cycles: 8
    },
    16: {
        action: _rlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'RL B',
        bytes: 1,
        cycles: 8
    },
    17: {
        action: _rlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'RL C',
        bytes: 1,
        cycles: 8
    },
    18: {
        action: _rlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'RL D',
        bytes: 1,
        cycles: 8
    },
    19: {
        action: _rlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'RL E',
        bytes: 1,
        cycles: 8
    },
    20: {
        action: _rlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'RL H',
        bytes: 1,
        cycles: 8
    },
    21: {
        action: _rlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'RL L',
        bytes: 1,
        cycles: 8
    },
    22: {
        action: _rlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'RL (HL)',
        bytes: 1,
        cycles: 8
    },
    23: {
        action: _rlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'RL A',
        bytes: 1,
        cycles: 8
    },
    24: {
        action: _rrDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'RR B',
        bytes: 1,
        cycles: 8
    },
    25: {
        action: _rrDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'RR C',
        bytes: 1,
        cycles: 8
    },
    26: {
        action: _rrDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'RR D',
        bytes: 1,
        cycles: 8
    },
    27: {
        action: _rrDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'RR E',
        bytes: 1,
        cycles: 8
    },
    28: {
        action: _rrDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'RR H',
        bytes: 1,
        cycles: 8
    },
    29: {
        action: _rrDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'RR L',
        bytes: 1,
        cycles: 8
    },
    30: {
        action: _rrDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'RR (HL)',
        bytes: 1,
        cycles: 16
    },
    31: {
        action: _rrDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'RR A',
        bytes: 1,
        cycles: 8
    },
    32: {
        action: _slaDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'SLA B',
        bytes: 1,
        cycles: 8
    },
    33: {
        action: _slaDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'SLA C',
        bytes: 1,
        cycles: 8
    },
    34: {
        action: _slaDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'SLA D',
        bytes: 1,
        cycles: 8
    },
    35: {
        action: _slaDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'SLA E',
        bytes: 1,
        cycles: 8
    },
    36: {
        action: _slaDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'SLA H',
        bytes: 1,
        cycles: 8
    },
    37: {
        action: _slaDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'SLA L',
        bytes: 1,
        cycles: 8
    },
    38: {
        action: _slaDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'SLA (HL)',
        bytes: 1,
        cycles: 16
    },
    39: {
        action: _slaDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'SLA A',
        bytes: 1,
        cycles: 8
    },
    40: {
        action: _sraDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'SRA B',
        bytes: 1,
        cycles: 8
    },
    41: {
        action: _sraDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'SRA C',
        bytes: 1,
        cycles: 8
    },
    42: {
        action: _sraDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'SRA D',
        bytes: 1,
        cycles: 8
    },
    43: {
        action: _sraDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'SRA E',
        bytes: 1,
        cycles: 8
    },
    44: {
        action: _sraDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'SRA H',
        bytes: 1,
        cycles: 8
    },
    45: {
        action: _sraDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'SRA L',
        bytes: 1,
        cycles: 8
    },
    46: {
        action: _sraDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'SRA (HL)',
        bytes: 1,
        cycles: 16
    },
    47: {
        action: _sraDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'SRA A',
        bytes: 1,
        cycles: 8
    },
    48: {
        action: _swapDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'SWP B',
        bytes: 1,
        cycles: 8
    },
    49: {
        action: _swapDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'SWP C',
        bytes: 1,
        cycles: 8
    },
    50: {
        action: _swapDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'SWP D',
        bytes: 1,
        cycles: 8
    },
    51: {
        action: _swapDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'SWP E',
        bytes: 1,
        cycles: 8
    },
    52: {
        action: _swapDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'SWP H',
        bytes: 1,
        cycles: 8
    },
    53: {
        action: _swapDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'SWP L',
        bytes: 1,
        cycles: 8
    },
    54: {
        action: _swapDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'SWP (HL)',
        bytes: 1,
        cycles: 16
    },
    55: {
        action: _swapDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'SWP A',
        bytes: 1,
        cycles: 8
    },
    56: {
        action: _srlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'SRL B',
        bytes: 1,
        cycles: 8
    },
    57: {
        action: _srlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'SRL C',
        bytes: 1,
        cycles: 8
    },
    58: {
        action: _srlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'SRL D',
        bytes: 1,
        cycles: 8
    },
    59: {
        action: _srlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'SRL E',
        bytes: 1,
        cycles: 8
    },
    60: {
        action: _srlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'SRL H',
        bytes: 1,
        cycles: 8
    },
    61: {
        action: _srlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'SRL L',
        bytes: 1,
        cycles: 8
    },
    62: {
        action: _srlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'SRL (HL)',
        bytes: 1,
        cycles: 8
    },
    63: {
        action: _srlDefault.default,
        operands: [
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'SRL A',
        bytes: 1,
        cycles: 8
    },
    64: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'BIT 0, B',
        bytes: 1,
        cycles: 8
    },
    65: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'BIT 0, C',
        bytes: 1,
        cycles: 8
    },
    66: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'BIT 0, D',
        bytes: 1,
        cycles: 8
    },
    67: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'BIT 0, E',
        bytes: 1,
        cycles: 8
    },
    68: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'BIT 0, H',
        bytes: 1,
        cycles: 8
    },
    69: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'BIT 0, L',
        bytes: 1,
        cycles: 8
    },
    70: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'BIT 0, (HL)',
        bytes: 1,
        cycles: 16
    },
    71: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'BIT 0, A',
        bytes: 1,
        cycles: 8
    },
    72: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'BIT 1, B',
        bytes: 1,
        cycles: 8
    },
    73: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'BIT 1, C',
        bytes: 1,
        cycles: 8
    },
    74: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'BIT 1, D',
        bytes: 1,
        cycles: 8
    },
    75: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'BIT 1, E',
        bytes: 1,
        cycles: 8
    },
    76: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'BIT 1, H',
        bytes: 1,
        cycles: 8
    },
    77: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'BIT 1, L',
        bytes: 1,
        cycles: 8
    },
    78: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'BIT 1, (HL)',
        bytes: 1,
        cycles: 16
    },
    79: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'BIT 1, A',
        bytes: 1,
        cycles: 8
    },
    80: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'BIT 2, B',
        bytes: 1,
        cycles: 8
    },
    81: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'BIT 2, C',
        bytes: 1,
        cycles: 8
    },
    82: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'BIT 2, D',
        bytes: 1,
        cycles: 8
    },
    83: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'BIT 2, E',
        bytes: 1,
        cycles: 8
    },
    84: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'BIT 2, H',
        bytes: 1,
        cycles: 8
    },
    85: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'BIT 2, L',
        bytes: 1,
        cycles: 8
    },
    86: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'BIT 2, (HL)',
        bytes: 1,
        cycles: 16
    },
    87: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'BIT 2, A',
        bytes: 1,
        cycles: 8
    },
    88: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'BIT 3, B',
        bytes: 1,
        cycles: 8
    },
    89: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'BIT 3, C',
        bytes: 1,
        cycles: 8
    },
    90: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'BIT 3, D',
        bytes: 1,
        cycles: 8
    },
    91: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'BIT 3, E',
        bytes: 1,
        cycles: 8
    },
    92: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'BIT 3, H',
        bytes: 1,
        cycles: 8
    },
    93: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'BIT 3, L',
        bytes: 1,
        cycles: 8
    },
    94: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'BIT 3, (HL)',
        bytes: 1,
        cycles: 16
    },
    95: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'BIT 3, A',
        bytes: 1,
        cycles: 8
    },
    96: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'BIT 4, B',
        bytes: 1,
        cycles: 8
    },
    97: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'BIT 4, C',
        bytes: 1,
        cycles: 8
    },
    98: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'BIT 4, D',
        bytes: 1,
        cycles: 8
    },
    99: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'BIT 4, E',
        bytes: 1,
        cycles: 8
    },
    100: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'BIT 4, H',
        bytes: 1,
        cycles: 8
    },
    101: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'BIT 4, L',
        bytes: 1,
        cycles: 8
    },
    102: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'BIT 4, (HL)',
        bytes: 1,
        cycles: 16
    },
    103: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'BIT 4, A',
        bytes: 1,
        cycles: 8
    },
    104: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'BIT 5, B',
        bytes: 1,
        cycles: 8
    },
    105: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'BIT 5, C',
        bytes: 1,
        cycles: 8
    },
    106: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'BIT 5, D',
        bytes: 1,
        cycles: 8
    },
    107: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'BIT 5, E',
        bytes: 1,
        cycles: 8
    },
    108: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'BIT 5, H',
        bytes: 1,
        cycles: 8
    },
    109: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'BIT 5, L',
        bytes: 1,
        cycles: 8
    },
    110: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'BIT 5, (HL)',
        bytes: 1,
        cycles: 16
    },
    111: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'BIT 5, A',
        bytes: 1,
        cycles: 8
    },
    112: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'BIT 6, B',
        bytes: 1,
        cycles: 8
    },
    113: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'BIT 6, C',
        bytes: 1,
        cycles: 8
    },
    114: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'BIT 6, D',
        bytes: 1,
        cycles: 8
    },
    115: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'BIT 6, E',
        bytes: 1,
        cycles: 8
    },
    116: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'BIT 6, H',
        bytes: 1,
        cycles: 8
    },
    117: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'BIT 6, L',
        bytes: 1,
        cycles: 8
    },
    118: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'BIT 6, (HL)',
        bytes: 1,
        cycles: 16
    },
    119: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'BIT 6, A',
        bytes: 1,
        cycles: 8
    },
    120: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'BIT 7, B',
        bytes: 1,
        cycles: 8
    },
    121: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'BIT 7, C',
        bytes: 1,
        cycles: 8
    },
    122: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'BIT 7, D',
        bytes: 1,
        cycles: 8
    },
    123: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'BIT 7, E',
        bytes: 1,
        cycles: 8
    },
    124: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'BIT 7, H',
        bytes: 1,
        cycles: 8
    },
    125: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'BIT 7, L',
        bytes: 1,
        cycles: 8
    },
    126: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'BIT 7, (HL)',
        bytes: 1,
        cycles: 16
    },
    127: {
        action: _bitDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'BIT 7, A',
        bytes: 1,
        cycles: 8
    },
    128: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'RES 0, B',
        bytes: 1,
        cycles: 8
    },
    129: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'RES 0, C',
        bytes: 1,
        cycles: 8
    },
    130: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'RES 0, D',
        bytes: 1,
        cycles: 8
    },
    131: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'RES 0, E',
        bytes: 1,
        cycles: 8
    },
    132: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'RES 0, H',
        bytes: 1,
        cycles: 8
    },
    133: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'RES 0, L',
        bytes: 1,
        cycles: 8
    },
    134: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'RES 0, (HL)',
        bytes: 1,
        cycles: 16
    },
    135: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'RES 0, A',
        bytes: 1,
        cycles: 8
    },
    136: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'RES 1, B',
        bytes: 1,
        cycles: 8
    },
    137: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'RES 1, C',
        bytes: 1,
        cycles: 8
    },
    138: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'RES 1, D',
        bytes: 1,
        cycles: 8
    },
    139: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'RES 1, E',
        bytes: 1,
        cycles: 8
    },
    140: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'RES 1, H',
        bytes: 1,
        cycles: 8
    },
    141: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'RES 1, L',
        bytes: 1,
        cycles: 8
    },
    142: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'RES 1, (HL)',
        bytes: 1,
        cycles: 16
    },
    143: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'RES 1, A',
        bytes: 1,
        cycles: 8
    },
    144: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'RES 2, B',
        bytes: 1,
        cycles: 8
    },
    145: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'RES 2, C',
        bytes: 1,
        cycles: 8
    },
    146: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'RES 2, D',
        bytes: 1,
        cycles: 8
    },
    147: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'RES 2, E',
        bytes: 1,
        cycles: 8
    },
    148: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'RES 2, H',
        bytes: 1,
        cycles: 8
    },
    149: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'RES 2, L',
        bytes: 1,
        cycles: 8
    },
    150: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'RES 2, (HL)',
        bytes: 1,
        cycles: 16
    },
    151: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'RES 2, A',
        bytes: 1,
        cycles: 8
    },
    152: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'RES 3, B',
        bytes: 1,
        cycles: 8
    },
    153: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'RES 3, C',
        bytes: 1,
        cycles: 8
    },
    154: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'RES 3, D',
        bytes: 1,
        cycles: 8
    },
    155: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'RES 3, E',
        bytes: 1,
        cycles: 8
    },
    156: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'RES 3, H',
        bytes: 1,
        cycles: 8
    },
    157: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'RES 3, L',
        bytes: 1,
        cycles: 8
    },
    158: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'RES 3, (HL)',
        bytes: 1,
        cycles: 16
    },
    159: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'RES 3, A',
        bytes: 1,
        cycles: 8
    },
    160: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'RES 4, B',
        bytes: 1,
        cycles: 8
    },
    161: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'RES 4, C',
        bytes: 1,
        cycles: 8
    },
    162: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'RES 4, D',
        bytes: 1,
        cycles: 8
    },
    163: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'RES 4, E',
        bytes: 1,
        cycles: 8
    },
    164: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'RES 4, H',
        bytes: 1,
        cycles: 8
    },
    165: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'RES 4, L',
        bytes: 1,
        cycles: 8
    },
    166: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'RES 4, (HL)',
        bytes: 1,
        cycles: 16
    },
    167: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'RES 4, A',
        bytes: 1,
        cycles: 8
    },
    168: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'RES 5, B',
        bytes: 1,
        cycles: 8
    },
    169: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'RES 5, C',
        bytes: 1,
        cycles: 8
    },
    170: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'RES 5, D',
        bytes: 1,
        cycles: 8
    },
    171: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'RES 5, E',
        bytes: 1,
        cycles: 8
    },
    172: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'RES 5, H',
        bytes: 1,
        cycles: 8
    },
    173: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'RES 5, L',
        bytes: 1,
        cycles: 8
    },
    174: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'RES 5, (HL)',
        bytes: 1,
        cycles: 16
    },
    175: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'RES 5, A',
        bytes: 1,
        cycles: 8
    },
    176: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'RES 6, B',
        bytes: 1,
        cycles: 8
    },
    177: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'RES 6, C',
        bytes: 1,
        cycles: 8
    },
    178: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'RES 6, D',
        bytes: 1,
        cycles: 8
    },
    179: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'RES 6, E',
        bytes: 1,
        cycles: 8
    },
    180: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'RES 6, H',
        bytes: 1,
        cycles: 8
    },
    181: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'RES 6, L',
        bytes: 1,
        cycles: 8
    },
    182: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'RES 6, (HL)',
        bytes: 1,
        cycles: 16
    },
    183: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'RES 6, A',
        bytes: 1,
        cycles: 8
    },
    184: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'RES 7, B',
        bytes: 1,
        cycles: 8
    },
    185: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'RES 7, C',
        bytes: 1,
        cycles: 8
    },
    186: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'RES 7, D',
        bytes: 1,
        cycles: 8
    },
    187: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'RES 7, E',
        bytes: 1,
        cycles: 8
    },
    188: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'RES 7, H',
        bytes: 1,
        cycles: 8
    },
    189: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'RES 7, L',
        bytes: 1,
        cycles: 8
    },
    190: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'RES 7, (HL)',
        bytes: 1,
        cycles: 16
    },
    191: {
        action: _resDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'RES 7, A',
        bytes: 1,
        cycles: 8
    },
    192: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'SET 0, B',
        bytes: 1,
        cycles: 8
    },
    193: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'SET 0, C',
        bytes: 1,
        cycles: 8
    },
    194: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'SET 0, D',
        bytes: 1,
        cycles: 8
    },
    195: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'SET 0, E',
        bytes: 1,
        cycles: 8
    },
    196: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'SET 0, H',
        bytes: 1,
        cycles: 8
    },
    197: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'SET 0, L',
        bytes: 1,
        cycles: 8
    },
    198: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'SET 0, (HL)',
        bytes: 1,
        cycles: 16
    },
    199: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 0
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'SET 0, A',
        bytes: 1,
        cycles: 8
    },
    200: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'SET 1, B',
        bytes: 1,
        cycles: 8
    },
    201: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'SET 1, C',
        bytes: 1,
        cycles: 8
    },
    202: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'SET 1, D',
        bytes: 1,
        cycles: 8
    },
    203: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'SET 1, E',
        bytes: 1,
        cycles: 8
    },
    204: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'SET 1, H',
        bytes: 1,
        cycles: 8
    },
    205: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'SET 1, L',
        bytes: 1,
        cycles: 8
    },
    206: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'SET 1, (HL)',
        bytes: 1,
        cycles: 16
    },
    207: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 1
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'SET 1, A',
        bytes: 1,
        cycles: 8
    },
    208: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'SET 2, B',
        bytes: 1,
        cycles: 8
    },
    209: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'SET 2, C',
        bytes: 1,
        cycles: 8
    },
    210: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'SET 2, D',
        bytes: 1,
        cycles: 8
    },
    211: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'SET 2, E',
        bytes: 1,
        cycles: 8
    },
    212: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'SET 2, H',
        bytes: 1,
        cycles: 8
    },
    213: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'SET 2, L',
        bytes: 1,
        cycles: 8
    },
    214: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'SET 2, (HL)',
        bytes: 1,
        cycles: 16
    },
    215: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 2
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'SET 2, A',
        bytes: 1,
        cycles: 8
    },
    216: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'SET 3, B',
        bytes: 1,
        cycles: 8
    },
    217: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'SET 3, C',
        bytes: 1,
        cycles: 8
    },
    218: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'SET 3, D',
        bytes: 1,
        cycles: 8
    },
    219: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'SET 3, E',
        bytes: 1,
        cycles: 8
    },
    220: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'SET 3, H',
        bytes: 1,
        cycles: 8
    },
    221: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'SET 3, L',
        bytes: 1,
        cycles: 8
    },
    222: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'SET 3, (HL)',
        bytes: 1,
        cycles: 16
    },
    223: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 3
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'SET 3, A',
        bytes: 1,
        cycles: 8
    },
    224: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'SET 4, B',
        bytes: 1,
        cycles: 8
    },
    225: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'SET 4, C',
        bytes: 1,
        cycles: 8
    },
    226: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'SET 4, D',
        bytes: 1,
        cycles: 8
    },
    227: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'SET 4, E',
        bytes: 1,
        cycles: 8
    },
    228: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'SET 4, H',
        bytes: 1,
        cycles: 8
    },
    229: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'SET 4, L',
        bytes: 1,
        cycles: 8
    },
    230: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'SET 4, (HL)',
        bytes: 1,
        cycles: 16
    },
    231: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 4
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'SET 4, A',
        bytes: 1,
        cycles: 8
    },
    232: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'SET 5, B',
        bytes: 1,
        cycles: 8
    },
    233: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'SET 5, C',
        bytes: 1,
        cycles: 8
    },
    234: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'SET 5, D',
        bytes: 1,
        cycles: 8
    },
    235: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'SET 5, E',
        bytes: 1,
        cycles: 8
    },
    236: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'SET 5, H',
        bytes: 1,
        cycles: 8
    },
    237: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'SET 5, L',
        bytes: 1,
        cycles: 8
    },
    238: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'SET 5, (HL)',
        bytes: 1,
        cycles: 16
    },
    239: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 5
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'SET 5, A',
        bytes: 1,
        cycles: 8
    },
    240: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'SET 6, B',
        bytes: 1,
        cycles: 8
    },
    241: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'SET 6, C',
        bytes: 1,
        cycles: 8
    },
    242: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'SET 6, D',
        bytes: 1,
        cycles: 8
    },
    243: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'SET 6, E',
        bytes: 1,
        cycles: 8
    },
    244: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'SET 6, H',
        bytes: 1,
        cycles: 8
    },
    245: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'SET 6, L',
        bytes: 1,
        cycles: 8
    },
    246: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'SET 6, (HL)',
        bytes: 1,
        cycles: 16
    },
    247: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 6
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'SET 6, A',
        bytes: 1,
        cycles: 8
    },
    248: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_B
            }, 
        ],
        mnemonic: 'SET 7, B',
        bytes: 1,
        cycles: 8
    },
    249: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_C
            }, 
        ],
        mnemonic: 'SET 7, C',
        bytes: 1,
        cycles: 8
    },
    250: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_D
            }, 
        ],
        mnemonic: 'SET 7, D',
        bytes: 1,
        cycles: 8
    },
    251: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_E
            }, 
        ],
        mnemonic: 'SET 7, E',
        bytes: 1,
        cycles: 8
    },
    252: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_H
            }, 
        ],
        mnemonic: 'SET 7, H',
        bytes: 1,
        cycles: 8
    },
    253: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_L
            }, 
        ],
        mnemonic: 'SET 7, L',
        bytes: 1,
        cycles: 8
    },
    254: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register16,
                target: _constants.REG_HL,
                isAddress: true
            }, 
        ],
        mnemonic: 'SET 7, (HL)',
        bytes: 1,
        cycles: 16
    },
    255: {
        action: _setDefault.default,
        operands: [
            {
                type: _types.OperandType.Value,
                target: 7
            },
            {
                type: _types.OperandType.Register8,
                target: _constants.REG_A
            }, 
        ],
        mnemonic: 'SET 7, A',
        bytes: 1,
        cycles: 8
    }
};
exports.default = prefixed;

},{"../constants":"39YfB","../operations/bit":"XSiWT","../operations/res":"619DK","../operations/rl":"4EsNM","../operations/rlc":"5wDHu","../operations/rr":"6VA1A","../operations/rrc":"25RyH","../operations/set":"501tE","../operations/sla":"7qle7","../operations/sra":"1oPFu","../operations/srl":"3QqLR","../operations/swap":"1zbVN","../types":"4buia","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"XSiWT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function bit(cpu, operands) {
    const bit1 = cpu.readOperand(operands[0]);
    const value = cpu.readOperand(operands[1]);
    const bitValue = Math.pow(2, bit1);
    return {
        Z: (value & bitValue) === 0,
        N: false,
        H: true,
        C: null
    };
}
exports.default = bit;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"619DK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function res(cpu, operands) {
    const bit = cpu.readOperand(operands[0]);
    const value = cpu.readOperand(operands[1]);
    const bitValue = Math.pow(2, bit);
    cpu.writeToOperand(operands[1], value & ~bitValue);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = res;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"501tE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../constants");
function set(cpu, operands) {
    const bit = cpu.readOperand(operands[0]);
    const value = cpu.readOperand(operands[1]);
    const bitValue = Math.pow(2, bit);
    cpu.writeToOperand(operands[1], value | bitValue);
    return _constants.FLAGS_NO_CHANGE;
}
exports.default = set;

},{"../constants":"39YfB","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"7qle7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function sla(cpu, operands) {
    const value = cpu.readOperand(operands[0]);
    const result = value << 1;
    const maskedResult = result & 255;
    cpu.writeToOperand(operands[0], maskedResult);
    return {
        Z: maskedResult === 0,
        N: false,
        H: false,
        C: (result & 256) === 256
    };
}
exports.default = sla;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"1oPFu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function sra(cpu, operands) {
    const value = cpu.readOperand(operands[0]);
    const result = value >> 1 | value & 128;
    const maskedResult = result & 255;
    cpu.writeToOperand(operands[0], maskedResult);
    return {
        Z: maskedResult === 0,
        N: false,
        H: false,
        C: (value & 1) === 1
    };
}
exports.default = sra;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"3QqLR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function srl(cpu, operands) {
    const value = cpu.readOperand(operands[0]);
    const result = value >> 1;
    const maskedResult = result & 255;
    cpu.writeToOperand(operands[0], maskedResult);
    return {
        Z: maskedResult === 0,
        N: false,
        H: false,
        C: (value & 1) === 1
    };
}
exports.default = srl;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"1zbVN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function swap(cpu, operands) {
    const value = cpu.readOperand(operands[0]);
    const result = value << 4 | value >> 4;
    const maskedResult = result & 255;
    cpu.writeToOperand(operands[0], maskedResult);
    return {
        Z: maskedResult === 0,
        N: false,
        H: false,
        C: false
    };
}
exports.default = swap;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"3MCNg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class for emulating the Picture Processing Unit (PPU)
 */ parcelHelpers.export(exports, "default", ()=>Ppu
);
const colors = [
    0,
    4289374890,
    4283782485,
    4278190080
];
const screenWidth = 160;
const screenHeight = 144;
const bufferWidth = 256;
const bufferHeight = 256;
const statsBarHeight = 16;
class ImageLayer {
    constructor(imageData){
        this.imageData = imageData;
        this.imageData.data.fill(0);
        this.pixelArray = new Uint32Array(this.imageData.data.buffer);
    }
}
class Ppu {
    constructor(memoryMap, canvas){
        this.lastUpdate = 0;
        this.updateSamples = [];
        this.updateAverage = null;
        this.fpsSampleRate = 50;
        this.currentScanline = 0;
        this.currentScanlineOffset = 0;
        /**
   * LCDC state
   */ this.lcdc = 0;
        this.bgWindowEnable = 0;
        this.objEnable = 0;
        this.objSize = 0;
        this.bgTileMap = 0;
        this.tileSource = 0;
        this.windowEnable = 0;
        this.windowTileMap = 0;
        this.lcdPpuEnable = 0;
        /**
   * STAT State
   */ this.stat = 0;
        this.mode = 0;
        this.coincidence = 0;
        this.mode0HBlank = 0;
        this.mode1VBlank = 0;
        this.mode2Oam = 0;
        this.myCoincidence = 0;
        this.memoryMap = memoryMap;
        this.canvas = canvas;
        // TODO: Make scale configurable
        const scale = 2;
        this.canvas.width = 160 * scale;
        this.canvas.height = 144 * scale + statsBarHeight;
        const ctx = canvas.getContext('2d');
        if (ctx === null) throw new Error('Failed to get canvas 2D Context.');
        this.backgroundLayer = new ImageLayer(ctx.createImageData(bufferWidth, bufferHeight));
        this.windowLayer = new ImageLayer(ctx.createImageData(bufferWidth, bufferHeight));
        this.spriteLayer = new ImageLayer(ctx.createImageData(bufferWidth, bufferHeight));
        this.bufferLayer = new ImageLayer(ctx.createImageData(bufferWidth, bufferHeight));
        this.bufferCanvas = document.createElement('canvas');
        this.bufferCanvas.width = screenWidth;
        this.bufferCanvas.height = screenHeight;
        this.bufferCtx = this.bufferCanvas.getContext('2d');
        this.ctx = ctx;
        this.memoryMap.write8(65344, 128);
    }
    /**
   * Run one cycle of the clock, updates scan lines
   */ tick() {
        this.updateState();
        if (!this.lcdPpuEnable) {
            this.currentScanline = 0;
            this.currentScanlineOffset = 0;
            const lcdStat = this.memoryMap.read8(65345);
            this.memoryMap.write8(65345, lcdStat & 252); // Set mode to 0, TODO:  LYC=LY (Coincidence)?
            this.memoryMap.write8(65348, this.currentScanline);
            return;
        }
        this.currentScanlineOffset += 1;
        if (this.currentScanlineOffset === 456) {
            this.currentScanlineOffset = 0;
            this.currentScanline = this.currentScanline === 153 ? 0 : this.currentScanline + 1;
        }
        this.memoryMap.write8(65348, this.currentScanline);
        let updatedLcdStat = this.memoryMap.read8(65345);
        let updatedInterrupts = this.memoryMap.read8(65295);
        const lycInterruptEnabled = (updatedInterrupts & 64) === 64;
        const mode2OAMInterruptEnabled = (updatedInterrupts & 64) === 32;
        // TODO: Does this flag need to be checked when firing VBlank IRQ?
        // const mode1VBlankInterruptEnabled = (updatedInterrupts & 0x40) === 0x10;
        const mode0HBlankInterruptEnabled = (updatedInterrupts & 64) === 8;
        let lcdStatInterrupt = false;
        // Clear the mode and LYC (Coincidence), set below
        updatedLcdStat = updatedLcdStat & 248;
        if (this.currentScanline < 143) {
            if (this.currentScanlineOffset < 80) {
                updatedLcdStat |= 2;
                lcdStatInterrupt = mode2OAMInterruptEnabled || lcdStatInterrupt;
            } else if (this.currentScanlineOffset < 252) updatedLcdStat |= 3;
            else if (this.currentScanlineOffset === 252) // updatedLcdStat |= 0 : 0 During HBlank
            lcdStatInterrupt = mode0HBlankInterruptEnabled || lcdStatInterrupt;
        } else if (this.currentScanline === 144 && this.currentScanlineOffset === 0) {
            updatedLcdStat |= 1;
            updatedInterrupts |= 1;
        } else updatedLcdStat |= 1;
        const lyc = this.memoryMap.read8(65349);
        if (lyc === this.currentScanline) {
            updatedLcdStat |= 4;
            lcdStatInterrupt = lycInterruptEnabled || lcdStatInterrupt;
        }
        if (lcdStatInterrupt) updatedInterrupts |= 2;
        // Update stats and interrupts
        this.memoryMap.write8(65345, updatedLcdStat);
        this.memoryMap.write8(65295, updatedInterrupts);
    // TODO: Move pixel manipulation to tick, keep drawing in update
    }
    /**
   * The update the rendering (once per frame)
   */ update() {
        this.updateState();
        const scrollY = this.memoryMap.read8(65346);
        const scrollX = this.memoryMap.read8(65347);
        // const lcdY = this.memoryMap.read8(0xff44);
        // const lyCompare = this.memoryMap.read8(0xff45);
        // const dmaTransfer = this.memoryMap.read8(0xFF46);
        const windowY = this.memoryMap.read8(65354);
        const windowX = this.memoryMap.read8(65355);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.bgWindowEnable) {
            // Draw the background onto the buffer so that it can be transferred
            // to the appropriate offset for scroll X/Y
            if (this.bgTileMap === 0) this.renderTileMap(38912, this.bufferLayer);
            else this.renderTileMap(39936, this.bufferLayer);
            const startOffset = scrollY * 256 + scrollX;
            for(let i = 0; i < this.bufferLayer.pixelArray.length; i++){
                let offset = i + startOffset;
                if (offset >= 65536) offset -= 65536;
                this.backgroundLayer.pixelArray[i] = this.bufferLayer.pixelArray[offset];
            }
            this.renderLayer(this.backgroundLayer, 0, 0);
        }
        if (this.objEnable) {
            this.renderSprites();
            this.renderLayer(this.spriteLayer, 0, 0);
        }
        if (this.windowEnable) {
            if (this.windowTileMap === 0) this.renderTileMap(38912, this.windowLayer);
            else this.renderTileMap(39936, this.windowLayer);
            this.renderLayer(this.windowLayer, windowX, windowY);
        }
        // FPS Helper
        this.renderFps();
    }
    /**
   * Read the latest LCDC and STAT states and
   * store them locally
   */ updateState() {
        const lcdc = this.memoryMap.read8(65344);
        this.bgWindowEnable = lcdc & 1;
        this.objEnable = (lcdc & 2) >> 1;
        this.objSize = (lcdc & 4) >> 2;
        this.bgTileMap = (lcdc & 8) >> 3;
        this.tileSource = (lcdc & 16) >> 4;
        this.windowEnable = (lcdc & 32) >> 5;
        this.windowTileMap = (lcdc & 64) >> 6;
        this.lcdPpuEnable = (lcdc & 128) >> 7;
        const stat = this.memoryMap.read8(65345);
        this.mode = stat & 3; // Uses first two bits
        this.coincidence = (stat & 4) >> 2;
        this.mode0HBlank = (stat & 8) >> 3;
        this.mode1VBlank = (stat & 16) >> 4;
        this.mode2Oam = (stat & 32) >> 5;
        this.myCoincidence = (stat & 64) >> 6;
    // 7th bit unused?
    }
    /**
   * Render a layer onto the screen canvas
   * @param layer The layer to render
   * @param x The x coordinate to render the layer at
   * @param y The y coordinate to render the layer at
   */ renderLayer(layer, x, y) {
        this.bufferCtx.putImageData(layer.imageData, 0, 0);
        this.ctx.drawImage(this.bufferCanvas, x, y, this.canvas.width, this.canvas.height - statsBarHeight);
    }
    /**
   * Render a tile onto a layer
   * @param address The address of the tile
   * @param target The layer to render the tile onto
   */ renderTileMap(address, target) {
        for(let i = 0; i < 1024; i++){
            const y = Math.floor(i / 32);
            const x = i - y * 32;
            const tileNumber = this.tileSource === 0 ? this.memoryMap.read8Signed(address + i) : this.memoryMap.read8(address + i);
            this.renderTile(x * 8, y * 8, tileNumber, this.tileSource, target);
        }
    }
    /**
   * Render all sprites on to the sprite layer
   */ renderSprites() {
        // Clear current sprite data
        this.spriteLayer.pixelArray.fill(0);
        for(let i = 0; i < 40; i++){
            const y = this.memoryMap.read8(65024 + i * 4);
            const x = this.memoryMap.read8(65024 + i * 4 + 1);
            const tileNumber = this.memoryMap.read8(65024 + i * 4 + 2);
            // const flags = this.memoryMap.read8(0xfe00 + i * 4 + 3);
            // TODO Read:
            // Bit 0-2 Palette number (CGB Only)
            // Bit 3 Tile VRAM Bank (CGB Only)
            // bit 4 Palette Number (0=OBP0, 1=OBP1)
            // bit 5 x flip (1 = flip)
            // bit 6 y flip (1 = flip)
            // bit 7 obj-bg priority (0 obj above, 1 obj behind)
            this.renderTile(x - 8, y - 16, tileNumber, 1, this.spriteLayer, true);
        }
    }
    /**
   * Render a tile onto a layer
   * @param x The x coordinate to render the tile at
   * @param y The y coordinate to render the tile at
   * @param tileNumber The tile number within the OAM
   * @param tileDataLocationFlag The flag to indicate the tile number indexing method
   * @param target The layer to render the tile onto
   * @param isSprite If the tile is a sprite
   */ renderTile(x, y, tileNumber, tileDataLocationFlag, target, isSprite = false) {
        const tileSize = this.objSize === 1 && isSprite ? 16 : 8;
        const tileOffset = tileSize == 16 ? tileNumber & 254 : tileNumber; // For 16, ignore the lower bit
        const address = (tileDataLocationFlag === 0 ? 36864 : 32768) + tileOffset * 16;
        for(let row = 0; row < tileSize; row++){
            const byte1 = this.memoryMap.read8(address + row * 2);
            const byte2 = this.memoryMap.read8(address + row * 2 + 1);
            for(let column = 0; column < 8; column++){
                const bit1 = byte1 >> 7 - column & 1;
                const bit2 = byte2 >> 7 - column & 1;
                const colorValue = bit1 + (bit2 << 1);
                const color = colors[colorValue];
                const offset = (y + row) * bufferWidth + x + column;
                target.pixelArray[offset] = color;
            }
        }
    }
    /**
   * Render the FPS at the bottom of the screen
   */ renderFps() {
        const now = performance.now();
        const updateTime = now - this.lastUpdate || 1;
        this.lastUpdate = now;
        this.updateSamples.push(updateTime);
        if (this.updateSamples.length === this.fpsSampleRate) {
            this.updateAverage = this.updateSamples.reduce((acc, val)=>acc + val
            , 0) / this.fpsSampleRate;
            this.updateSamples = [];
        }
        const fpsString = this.updateAverage ? Math.round(1000 / this.updateAverage) : '-';
        const updateString = this.updateAverage ? Math.round(this.updateAverage * 1000) / 1000 : '-';
        this.ctx.save();
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, this.canvas.height - statsBarHeight, this.canvas.width, statsBarHeight);
        this.ctx.fillStyle = 'white';
        this.ctx.textBaseline = 'bottom';
        this.ctx.fillText(`FPS: ${fpsString} (${updateString}ms)`, 4, this.canvas.height - 2);
        this.ctx.restore();
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"2KR0X":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class for managing input/joypad emulation
 */ parcelHelpers.export(exports, "default", ()=>Joypad
);
/**
 * 0x0f = 00001111b - Input bits all high
 * 0x37 = 00110111b - BIT 3 Low
 * 0x3b = 00111011b - BIT 2 Low
 * 0x3d = 00111101b - BIT 1 Low
 * 0x3e = 00111110b - BIT 0 Low
 */ const BIT_INPUTS_HIGH = 15;
const BIT_MASK_DOWN_START = 55;
const BIT_MASK_UP_SELECT = 59;
const BIT_MASK_LEFT_B = 61;
const BIT_MASK_RIGHT_A = 62;
const INPUT_START = 'START';
const INPUT_SELECT = 'SELECT';
const INPUT_A = 'A';
const INPUT_B = 'B';
const INPUT_DOWN = 'DOWN';
const INPUT_UP = 'UP';
const INPUT_LEFT = 'LEFT';
const INPUT_RIGHT = 'RIGHT';
var INPUT_TYPE;
(function(INPUT_TYPE1) {
    INPUT_TYPE1["INPUT_TYPE_BUTTON"] = 'BUTTON';
    INPUT_TYPE1["INPUT_TYPE_DIRECTION"] = 'DIRECTION';
})(INPUT_TYPE || (INPUT_TYPE = {
}));
/**
 * Map of inputs to their type and bit to mask
 */ const INPUT_BIT_MAP = {
    [INPUT_START]: {
        type: INPUT_TYPE.INPUT_TYPE_BUTTON,
        mask: BIT_MASK_DOWN_START
    },
    [INPUT_SELECT]: {
        type: INPUT_TYPE.INPUT_TYPE_BUTTON,
        mask: BIT_MASK_UP_SELECT
    },
    [INPUT_B]: {
        type: INPUT_TYPE.INPUT_TYPE_BUTTON,
        mask: BIT_MASK_LEFT_B
    },
    [INPUT_A]: {
        type: INPUT_TYPE.INPUT_TYPE_BUTTON,
        mask: BIT_MASK_RIGHT_A
    },
    [INPUT_DOWN]: {
        type: INPUT_TYPE.INPUT_TYPE_DIRECTION,
        mask: BIT_MASK_DOWN_START
    },
    [INPUT_UP]: {
        type: INPUT_TYPE.INPUT_TYPE_DIRECTION,
        mask: BIT_MASK_UP_SELECT
    },
    [INPUT_LEFT]: {
        type: INPUT_TYPE.INPUT_TYPE_DIRECTION,
        mask: BIT_MASK_LEFT_B
    },
    [INPUT_RIGHT]: {
        type: INPUT_TYPE.INPUT_TYPE_DIRECTION,
        mask: BIT_MASK_RIGHT_A
    }
};
// TODO: Make keys configurable
const INPUT_KEY_MAP = {
    w: INPUT_UP,
    a: INPUT_LEFT,
    s: INPUT_DOWN,
    d: INPUT_RIGHT,
    ArrowUp: INPUT_UP,
    ArrowLeft: INPUT_LEFT,
    ArrowDown: INPUT_DOWN,
    ArrowRight: INPUT_RIGHT,
    Enter: INPUT_START,
    Shift: INPUT_SELECT,
    ' ': INPUT_A,
    Control: INPUT_B
};
class Joypad {
    constructor(memoryMap){
        this.inputPressed = false;
        this.pressedInputs = [];
        /**
   * Callback when a key is pressed
   * @param evt The keyboard event
   */ this.onKeyDown = (evt)=>{
            const input = INPUT_KEY_MAP[evt.key] ?? null;
            if (input !== null && !this.pressedInputs.includes(input)) {
                this.inputPressed = true;
                this.pressedInputs.push(input);
            }
        };
        /**
   * Callback when a key is released
   * @param evt The keyboard event
   */ this.onKeyUp = (evt)=>{
            const input = INPUT_KEY_MAP[evt.key] ?? null;
            if (input !== null && this.pressedInputs.includes(input)) this.pressedInputs.splice(this.pressedInputs.indexOf(input), 1);
        };
        this.memoryMap = memoryMap;
    }
    init() {
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }
    tick() {
        if (this.inputPressed) this.inputPressed = false;
        // Pull down direct and button bits based on
        // which buttons are pressed
        let buttonBits = BIT_INPUTS_HIGH;
        let directionBits = BIT_INPUTS_HIGH;
        this.pressedInputs.forEach((input)=>{
            const inputDetails = INPUT_BIT_MAP[input];
            if (inputDetails.type === INPUT_TYPE.INPUT_TYPE_BUTTON) buttonBits &= inputDetails.mask;
            else directionBits &= inputDetails.mask;
        });
        // The game will indicate whether the buttons or
        // direction are being read by pulling down
        // bit 4/5 (0x10 / 0x20)
        let joypadState = this.memoryMap.read8(65280);
        if ((joypadState & 16) !== 16) joypadState |= directionBits;
        else if ((joypadState & 32) !== 32) joypadState |= buttonBits;
        else joypadState |= BIT_INPUTS_HIGH;
        // Write back the state including the pulled down bits
        this.memoryMap.write8(65280, joypadState);
    }
    /**
   * Helper for debugging
   */ getPressedInputs() {
        return this.pressedInputs;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"5I56E":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class to manage memory access
 */ parcelHelpers.export(exports, "default", ()=>MemoryMap
);
const ADDRESS_OAM_DMA_REQUEST = 65350;
const SPRITES_OFFSET = 65024;
class MemoryMap {
    /**
   * Load a game cart into memory
   * @param cartDataBuffer An ArrayBuffer containing the cart data
   */ loadCart(cartDataBuffer) {
        this.cartDataBuffer = cartDataBuffer;
        this.cartData = new Uint8Array(this.cartDataBuffer);
        for(let i = 0; i < 32768; i++)this.memoryView.setUint8(i, this.cartData[i]);
    }
    /**
   * Read 1 byte of data as an 8bit int
   * @param address The address to read
   */ read8(address) {
        if (!this.canRead(address)) return 0;
        return this.memoryView.getUint8(address);
    }
    /**
   * Read 1 byte of data as an 8bit signed int
   * @param address The address to read
   */ read8Signed(address) {
        if (!this.canRead(address)) return 0;
        return this.memoryView.getInt8(address);
    }
    /**
   * Read 2 bytes of data as a 16bit int
   * @param address The address to read
   */ read16(address) {
        if (!this.canRead(address)) return 0;
        return this.memoryView.getUint16(address, true);
    }
    /**
   * Write an 8bit int
   * @param address The address to write the value to
   * @param value The integer value to write
   */ write8(address, value) {
        // DMA Transfer
        if (address == ADDRESS_OAM_DMA_REQUEST) {
            const fromAddress = value << 8;
            for(let i = 0; i < 159; i++)this.memoryView.setUint8(SPRITES_OFFSET + i, this.read8(fromAddress + i));
            return;
        }
        this.memoryView.setUint8(address, value);
    }
    /**
   * Write a 16bit int
   * @param address The address to write the value to
   * @param value The integer value to write
   */ write16(address, value) {
        this.memoryView.setUint16(address, value, true);
    }
    /**
   * Check if an address is readable (within bounds / not restricted)
   * @param address The address to check
   */ canRead(address) {
        // Restricted / unknown for 0xFEA0 -> 0xFEFF
        if (address >= 65184 && address <= 65279) return false;
        // Bounds check
        if (address < 0 || address >= this.memoryBuffer.byteLength) return false;
        return true;
    }
    constructor(){
        /**
   * Memory buffer
   * 0x0000 -> 0x3FFF : (16K) Cart ROM Bank 0
   * 0x4000 -> 0x7FFF : (16K) Cart ROM Bank 1
   * 0x8000 -> 0x9FFF : (8K) Video RAM
   * 0xA000 -> 0xBFFF : (8K) Cart RAM
   * 0xC000 -> 0xCFFF : (4K) Internal RAM Bank 0 (WRAM)
   * 0xD000 -> 0xDFFF : (4K) Internal RAM Bank 1 (WRAM)
   * 0xE000 -> 0xFDFF : (7.5K) Mirror of C000 -> DDFF
   * 0xFE00 -> 0xFE9F : (160) Sprites (OAM)
   * 0xFEA0 -> 0xFEFF : (95) Unusable
   * 0xFF00 -> 0xFF7F : (128) IO Registers
   * 0xFF80 -> 0xFFFE : (127) High RAM (HRAM)
   * 0xFFFF           : (1) Interrupt Enable Register
   */ this.memoryBuffer = new ArrayBuffer(65536);
        this.memoryView = new DataView(this.memoryBuffer);
        this.cartDataBuffer = null;
        this.cartData = null;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"5PAti":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getHexString(value, width = 2) {
    const hex = value.toString(16);
    if (hex.length < width) return `${'0'.repeat(width - hex.length)}${hex}`;
    else return `${hex}`;
}
exports.default = getHexString;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"2Df2M":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getBinaryString(value) {
    const hex = value.toString(2);
    return `${'0'.repeat(8 - hex.length)}${hex}b`;
}
exports.default = getBinaryString;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"5joIN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CORE_CLOCK", ()=>CORE_CLOCK
);
const CORE_CLOCK = 4194304;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"7JJk4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class for emulating the Audio Processing Unit (APU)
 */ parcelHelpers.export(exports, "default", ()=>Apu
);
var _constants = require("../core/constants");
var _channel = require("./Channel");
var _channelDefault = parcelHelpers.interopDefault(_channel);
// APU clock = 512Hz, Main clock = 4.19GHz, Factor = 8192
const CLOCK_FACTOR = _constants.CORE_CLOCK / 512;
class Apu {
    constructor(memoryMap){
        this.clockOffset = 0;
        this.volume = 0.5;
        this.memoryMap = memoryMap;
        this.audioCtx = new AudioContext();
        // Create master gain all output goes through for volume control
        this.masterGainNode = this.audioCtx.createGain();
        this.masterGainNode.connect(this.audioCtx.destination);
        this.masterGainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
        this.channel1 = new _channelDefault.default(this.audioCtx, this.masterGainNode);
        this.channel2 = new _channelDefault.default(this.audioCtx, this.masterGainNode);
    }
    /**
   * Run one clock cycle of the APU
   */ tick() {
        // Scale the APU clock to the core clock
        this.clockOffset -= 1;
        if (this.clockOffset > 0) return;
        this.updateChannel1();
        this.updateChannel2();
        // TODO: Handle Channel 3 and 4 (Wave and Noise)
        this.clockOffset = CLOCK_FACTOR;
    }
    /**
   * Pause audio output
   */ pause() {
        return this.audioCtx.suspend();
    }
    /**
   * Resume audio output
   */ resume() {
        this.channel1.setVolume(0.5);
        this.channel1.start();
        this.channel2.setVolume(0.5);
        this.channel2.start();
        return this.audioCtx.resume();
    }
    /**
   * Set the volume of the APU
   * @param volume The volume to set (0-1)
   */ setVolume(volume) {
        this.volume = volume;
        this.masterGainNode.gain.setValueAtTime(volume, this.audioCtx.currentTime);
    }
    /**
   * Update the output on channel 1
   */ updateChannel1() {
        const details = this.getChannelDetails(65296);
        this.channel1.setFrequency(details.frequency);
        this.channel1.setVolume(details.envelopeInitialVolume / 15);
    // TODO: Sweep, envelope, length countdown
    // Length counter @ 256Hz (1/2 APU clock)
    // Sweep @ 128Hz (1/4 APU clock)
    // Volume envelope 64Hz (1/8 APU clock)
    }
    /**
   * Update the output on channel 2
   */ updateChannel2() {
        const details = this.getChannelDetails(65301);
        this.channel2.setFrequency(details.frequency);
        this.channel2.setVolume(details.envelopeInitialVolume / 15);
    // TODO: Envelope, length countdown
    // Length counter @ 256Hz (1/2 APU clock)
    // Volume envelope 64Hz (1/8 APU clock)
    }
    /**
   * Get audio channel details from memory
   * @param offset The memory offset to read details from
   */ getChannelDetails(offset) {
        // Sweep adjusts freq
        // Envelope adjust volume
        // NR10 (Not used on NR20)
        const sweep = this.memoryMap.read8(offset);
        // NR11/21
        const dutyAndLength = this.memoryMap.read8(offset + 1);
        // NR12/22
        const envelope = this.memoryMap.read8(offset + 2);
        // NR13/23
        const freqLowBits = this.memoryMap.read8(offset + 3);
        // NR14/24
        const freqHighBitsAndDetails = this.memoryMap.read8(offset + 4);
        const sweepTime = (sweep & 112) >> 4;
        const sweepDirection = (sweep & 8) >> 3;
        const sweepShift = sweep & 7;
        const duty = (dutyAndLength & 192) >> 6;
        const length = dutyAndLength & 63;
        const envelopeInitialVolume = (envelope & 240) >> 4;
        const envelopeDirection = (envelope & 8) >> 3;
        const envelopePeriod = envelope & 7;
        const restartSound = (freqHighBitsAndDetails & 128) >> 7;
        const lengthEnabled = (freqHighBitsAndDetails & 64) >> 6;
        // Frequency is stored in 11 bit, across NR13/23 and NR14/24 bits 0-3
        const freqHighBits = freqHighBitsAndDetails & 7;
        const freq11Bits = freqLowBits | freqHighBits << 8;
        const frequency = _constants.CORE_CLOCK / (2048 - freq11Bits << 5);
        return {
            sweepTime,
            sweepDirection,
            sweepShift,
            duty,
            length,
            lengthSeconds: (64 - length) * (1 / 256),
            envelopeInitialVolume,
            envelopeDirection,
            envelopePeriod,
            frequency,
            restartSound,
            lengthEnabled
        };
    }
}

},{"../core/constants":"5joIN","./Channel":"2kdtf","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"2kdtf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class representing an audio channel
 */ parcelHelpers.export(exports, "default", ()=>Channel
);
class Channel {
    constructor(audioCtx, output){
        this.volume = 0;
        this.isStarted = false;
        this.isMuted = false;
        this.audioCtx = audioCtx;
        this.gainNode = audioCtx.createGain();
        this.gainNode.gain.setValueAtTime(this.volume, audioCtx.currentTime);
        this.gainNode.connect(output);
        this.oscillatorNode = audioCtx.createOscillator();
        this.oscillatorNode.type = 'square';
        this.oscillatorNode.connect(this.gainNode);
    // TODO: Create periodic waves for different square waves with duty cycle other than 50%
    // this.periodicWave = audioCtx.createPeriodicWave(
    //   sineWave.real,
    //   sineWave.imag
    // );
    }
    /**
   * Start the channel
   */ start() {
        if (!this.isStarted) {
            this.oscillatorNode.start();
            this.isStarted = true;
        }
    }
    /**
   * Set the frequency of the underlying oscillator
   * @param frequency The frequency to set
   */ setFrequency(frequency) {
        this.oscillatorNode.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
    }
    /**
   * Set the volume of the channel
   * @param volume Volume level (0 - 1)
   */ setVolume(volume) {
        this.volume = volume;
        this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
        this.isMuted = volume === 0;
    }
    /**
   * Get the current volume of the channel
   * @returns The volume
   */ getVolume() {
        return this.volume;
    }
    /**
   * Mute the channel
   */ mute() {
        this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
        this.isMuted = true;
    }
    /**
   * Unmute the channel
   */ unmute() {
        if (this.volume === 0) this.volume = 1;
        this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
        this.isMuted = false;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}]},["7nSHx","4zNAQ"], "4zNAQ", "parcelRequire427e")

//# sourceMappingURL=index.5ce3dd8e.js.map
