(function(){
  "use strict";
  var KEY="whot_offline_records_v1";
  var records=[];
  try{records=JSON.parse(localStorage.getItem(KEY)||"[]");if(!Array.isArray(records))records=[];}catch(e){records=[];}
  var recorded=false, panel=null, launcher=null;
  function save(){try{localStorage.setItem(KEY,JSON.stringify(records.slice(-100)));}catch(e){}}
  function stats(){var wins=records.filter(function(x){return x.result==="win";}).length;return {games:records.length,wins:wins,losses:records.length-wins};}
  function el(tag,attrs,txt){var n=document.createElement(tag);Object.keys(attrs||{}).forEach(function(k){n.setAttribute(k,attrs[k]);});if(txt!==undefined)n.textContent=txt;return n;}
  function close(){if(panel){panel.remove();panel=null;}}
  function show(){
    close();
    var s=stats();
    panel=el("div",{id:"whot-offline-panel","role":"dialog","aria-modal":"true","aria-label":"Offline guide and statistics"});
    panel.innerHTML='<div class="whot-panel-card"><div class="whot-panel-head"><strong>WHOT • OFFLINE CENTRE</strong><button type="button" data-close aria-label="Close">✕</button></div><div class="whot-tabs"><button type="button" data-tab="guide" class="active">HOW TO PLAY</button><button type="button" data-tab="stats">MY STATS</button></div><section data-view="guide"><p class="whot-intro">Quick guide to the rules used in this game.</p><ul><li>Play a card that matches the current shape or number.</li><li>Use a Whot card to request the next shape.</li><li><b>2 — Pick Two:</b> draw two cards; it cannot be blocked.</li><li><b>5 — Pick Three:</b> draw three cards; only another 5 can block it.</li><li><b>3:</b> no special function.</li><li><b>14 — General Market:</b> follow the General Market rule.</li><li>Keep an eye on the requested shape and the game log.</li></ul><p class="whot-note">This mode works offline. Your match record stays on this device.</p></section><section data-view="stats" hidden><div class="whot-stats"><div><b data-games>'+s.games+'</b><small>GAMES</small></div><div><b data-wins>'+s.wins+'</b><small>WINS</small></div><div><b data-losses>'+s.losses+'</b><small>LOSSES</small></div></div><h3>RECENT MATCHES</h3><div class="whot-history">'+(records.length?records.slice(-8).reverse().map(function(x){return '<div><span>'+x.result.toUpperCase()+'</span><small>'+x.difficulty+' • '+new Date(x.date).toLocaleDateString()+'</small></div>';}).join(""):'<p>No completed matches recorded yet.</p>')+'</div><button type="button" data-reset class="whot-reset">RESET OFFLINE STATS</button></section></div>';
    document.body.appendChild(panel);
    panel.addEventListener("click",function(e){
      if(e.target===panel||e.target.hasAttribute("data-close")){close();return;}
      var tab=e.target.getAttribute("data-tab");
      if(tab){panel.querySelectorAll("[data-tab]").forEach(function(b){b.classList.toggle("active",b===e.target);});panel.querySelectorAll("[data-view]").forEach(function(v){v.hidden=v.getAttribute("data-view")!==tab;});}
      if(e.target.hasAttribute("data-reset")){if(confirm("Reset all offline match statistics on this device?")){records=[];save();close();show();panel.querySelector('[data-tab="stats"]').click();}}
    });
  }
  function mount(){
    if(!document.body||launcher)return;
    var style=el("style",{});style.textContent='#whot-offline-launcher{position:fixed;z-index:9998;top:76px;right:12px;border:1.5px solid #111;border-radius:999px;background:#A51C30;color:#fff;padding:9px 13px;font:900 10px system-ui;letter-spacing:.08em;box-shadow:0 5px 16px #0004}#whot-offline-panel{position:fixed;inset:0;z-index:10000;background:#0009;display:flex;align-items:center;justify-content:center;padding:16px;font:14px system-ui;color:#171717}#whot-offline-panel .whot-panel-card{width:min(440px,100%);max-height:85vh;overflow:auto;background:#fff;border:2px solid #111;border-radius:20px;padding:18px;box-shadow:0 20px 60px #0006}#whot-offline-panel .whot-panel-head{display:flex;justify-content:space-between;align-items:center;font-size:13px;letter-spacing:.08em}#whot-offline-panel button{cursor:pointer}#whot-offline-panel [data-close]{border:1px solid #111;border-radius:50%;width:30px;height:30px;background:#fff}#whot-offline-panel .whot-tabs{display:flex;gap:8px;margin:16px 0}#whot-offline-panel [data-tab]{flex:1;padding:10px;border:1px solid #bbb;border-radius:10px;background:#f5f5f5;font-weight:800;font-size:11px}#whot-offline-panel [data-tab].active{background:#A51C30;color:#fff;border-color:#111}#whot-offline-panel .whot-intro{font-weight:700;margin-bottom:8px}#whot-offline-panel ul{padding-left:20px;line-height:1.55}#whot-offline-panel li{margin:6px 0}#whot-offline-panel .whot-note{background:#f6e9dc;padding:10px;border-radius:10px;font-size:12px;margin-top:12px}#whot-offline-panel .whot-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}#whot-offline-panel .whot-stats div{background:#f6e9dc;border:1px solid #ddd;border-radius:12px;padding:12px 6px;text-align:center}#whot-offline-panel .whot-stats b,#whot-offline-panel .whot-stats small{display:block}#whot-offline-panel .whot-stats b{font-size:24px}#whot-offline-panel .whot-stats small{font-size:9px;letter-spacing:.1em;font-weight:800}#whot-offline-panel h3{font-size:10px;letter-spacing:.12em;margin:16px 0 8px}#whot-offline-panel .whot-history>div{display:flex;justify-content:space-between;padding:9px;border-bottom:1px solid #eee;font-size:11px}#whot-offline-panel .whot-history small{color:#777}#whot-offline-panel .whot-reset{margin-top:14px;width:100%;padding:10px;border:1px solid #111;border-radius:10px;background:#fff;font-weight:800;font-size:10px}@media(max-width:600px){#whot-offline-launcher{top:72px;right:8px;padding:8px 10px;font-size:9px}}';
    document.head.appendChild(style);
    launcher=el("button",{id:"whot-offline-launcher",type:"button"},"GUIDE • STATS");
    launcher.addEventListener("click",show);document.body.appendChild(launcher);
  }
  function inspect(){
    mount();
    var heading=Array.prototype.find.call(document.querySelectorAll("h2"),function(h){return /^(YOU WIN!|.+ WINS)$/.test(h.textContent.trim());});
    if(!heading){recorded=false;return;}
    if(recorded)return;
    recorded=true;
    var win=heading.textContent.trim()==="YOU WIN!";
    var body=document.body.innerText||"";
    var match=body.match(/DIFFICULTY:\s*(EASY|NORMAL|HARD|EXTREME)/i);
    records.push({result:win?"win":"loss",difficulty:match?match[1].toUpperCase():"UNKNOWN",date:new Date().toISOString()});
    save();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",inspect);else inspect();
  new MutationObserver(inspect).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
})();