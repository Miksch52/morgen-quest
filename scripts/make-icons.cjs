// Rendert App-Icon und Splash als PNG (Mystery-Kiste) für @capacitor/assets.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
// MoveWell-Zeichen: ein "M" als Bewegungslinie mit Kopf, Grün auf Petrol
const box=(s)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${s}" height="${s}">
 <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7ff0bd"/><stop offset="1" stop-color="#2fbfa0"/></linearGradient></defs>
 <polyline points="16,74 33,34 50,60 67,34 84,74" fill="none" stroke="url(#g)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
 <circle cx="67" cy="17" r="8" fill="#ecf7f5"/>
</svg>`;
const page=(w,h,bg,inner)=>`<html><body style="margin:0;width:${w}px;height:${h}px;background:${bg};display:grid;place-items:center">${inner}</body></html>`;
const BG='radial-gradient(circle at 50% 30%,#14424b,#06191e 70%)';
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const shot=async(file,w,h,html,transparent)=>{const p=await b.newPage({viewport:{width:w,height:h}});await p.setContent(html);await p.screenshot({path:file,omitBackground:!!transparent});await p.close()};
  await shot('assets/icon-only.png',1024,1024,page(1024,1024,BG,box(760)));
  await shot('assets/icon-foreground.png',1024,1024,page(1024,1024,'transparent',box(560)),true);
  await shot('assets/icon-background.png',1024,1024,page(1024,1024,BG,''));
  const splash=page(2732,2732,'#06191e',box(700));
  await shot('assets/splash.png',2732,2732,splash);await shot('assets/splash-dark.png',2732,2732,splash);
  await b.close();console.log('Icons gerendert');
})();
