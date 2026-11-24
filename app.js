(() => {
  // Latvia is UTC+2 on Jan 18, 2028. The target is local midnight in Europe/Riga.
  const target = Date.parse("2028-01-17T22:00:00Z");
  const ids = ["days","hours","minutes","seconds"];
  function tick(){
    let diff = Math.max(0, target - Date.now());
    const vals = [Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];
    ids.forEach((id,i)=>{const el=document.getElementById(id);if(el)el.textContent=String(vals[i]).padStart(i===0?3:2,"0")});
    if(diff===0){const title=document.getElementById("eventTitle");if(title)title.textContent="THE DAY IS HERE";}
  }
  tick();setInterval(tick,1000);
  const form=document.getElementById("settingsForm"),input=document.getElementById("ytUrl");
  const key="jan18-youtube-video";
  function videoId(value){
    value=(value||"").trim();
    if(/^[\w-]{11}$/.test(value))return value;
    try{const u=new URL(value);if(u.hostname.endsWith("youtu.be"))return u.pathname.slice(1).split("/")[0];if(u.searchParams.get("v"))return u.searchParams.get("v");const m=u.pathname.match(/\/(?:live|embed|shorts)\/([\w-]{11})/);return m?m[1]:null}catch{return null}
  }
  const saved=localStorage.getItem(key);if(input&&saved)input.value=saved;
  if(form)form.addEventListener("submit",e=>{e.preventDefault();const id=videoId(input.value);const msg=document.getElementById("saveMessage");if(!id){msg.textContent="That link doesn't look like a YouTube video URL or 11-character video ID.";return}localStorage.setItem(key,id);msg.textContent="Saved. The Watch Live page will use this video.";});
  const player=document.getElementById("ytPlayer"),placeholder=document.getElementById("playerPlaceholder");
  if(player){const id=localStorage.getItem(key);if(id){player.src="https://www.youtube-nocookie.com/embed/"+encodeURIComponent(id);player.hidden=false;placeholder.hidden=true}}
})();