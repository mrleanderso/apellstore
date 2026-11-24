(function(){
'use strict';
let promptEvent=null,installed=false;
const standalone=matchMedia('(display-mode: standalone)');
function sync(){document.documentElement.classList.toggle('apell-installed',installed||standalone.matches||navigator.standalone===true);const notice=document.getElementById('connectionNotice');if(notice)notice.hidden=navigator.onLine!==false}
sync();
if(standalone.addEventListener)standalone.addEventListener('change',sync);
window.addEventListener('online',sync);window.addEventListener('offline',sync);
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptEvent=e});
window.addEventListener('appinstalled',()=>{promptEvent=null;installed=true;sync()});
document.addEventListener('click',async e=>{
 const link=e.target.closest('a.pwa-install-link');
 if(!link||!promptEvent||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;
 e.preventDefault();const request=promptEvent;promptEvent=null;
 try{await request.prompt();await request.userChoice}catch{location.assign(link.href)}
});
if('serviceWorker' in navigator&&window.isSecureContext){
 window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js',{scope:'/'}).catch(error=>console.warn('APELL PWA:',error))},{once:true});
}
})();
