// Preencha antes de publicar.
const CONFIG = { affiliateUrl: 'https://meli.la/2Df6dex', pixelId: '' };
const consent = document.querySelector('#consent');
let pixelLoaded = false;
function loadPixel(){if(pixelLoaded || !/^\d+$/.test(CONFIG.pixelId))return;pixelLoaded=true;window.fbq=function(){window.fbq.callMethod?window.fbq.callMethod.apply(window.fbq,arguments):window.fbq.queue.push(arguments)};window._fbq=window.fbq;fbq.push=fbq;fbq.loaded=true;fbq.version='2.0';fbq.queue=[];const s=document.createElement('script');s.async=true;s.src='https://connect.facebook.net/en_US/fbevents.js';document.head.append(s);fbq('init',CONFIG.pixelId);fbq('consent','grant');fbq('track','PageView');}
function preference(value){localStorage.setItem('garimix-consent',value);consent.hidden=true;if(value==='yes'){loadPixel();if(pixelLoaded)fbq('consent','grant')}else if(pixelLoaded)fbq('consent','revoke');}
if(CONFIG.pixelId){const saved=localStorage.getItem('garimix-consent');if(saved==='yes')loadPixel();else if(!saved)consent.hidden=false;}
document.querySelector('#accept').onclick=()=>preference('yes');document.querySelector('#reject').onclick=()=>preference('no');document.querySelector('#privacy').onclick=()=>{consent.hidden=false};
let valid=false;try{const u=new URL(CONFIG.affiliateUrl);valid=u.protocol==='https:';}catch{}
document.querySelectorAll('[data-buy]').forEach(a=>{if(valid){a.href=CONFIG.affiliateUrl;a.rel='sponsored noopener noreferrer';}a.addEventListener('click',e=>{if(!valid){e.preventDefault();document.querySelector('#notice').textContent='Oferta ainda não configurada.';document.querySelector('#notice').scrollIntoView({block:'center'});return;}if(pixelLoaded&&localStorage.getItem('garimix-consent')==='yes')fbq('trackCustom','AffiliateClick',{product:'smartwatch'});});});
