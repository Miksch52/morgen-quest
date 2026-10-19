// Rendert App-Icon und Splash als PNG (Mystery-Kiste) für @capacitor/assets.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const box=(s)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${s}" height="${s}">
 <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset="1" stop-color="#e09a12"/></linearGradient></defs>
 <rect x="18" y="40" width="64" height="46" rx="7" fill="url(#g)"/>
 <rect x="13" y="27" width="74" height="17" rx="5" fill="#ffd25c"/>
 <rect x="45" y="27" width="10" height="59" rx="2" fill="#ff5d73"/>
 <path d="M50 27 C40 12 28 16 34 25 C37 28 45 27 50 27 C55 27 63 28 66 25 C72 16 60 12 50 27Z" fill="#ff5d73"/>
 <text x="32" y="76" font-family="Arial Black,Impact,sans-serif" font-size="28" font-weight="900" fill="#130f22" fill-opacity=".55" text-anchor="middle">?</text>
 <text x="68" y="76" font-family="Arial Black,Impact,sans-serif" font-size="28" font-weight="900" fill="#130f22" fill-opacity=".55" text-anchor="middle">?</text>
</svg>`;
const page=(w,h,bg,inner)=>`<html><body style="margin:0;width:${w}px;height:${h}px;background:${bg};display:grid;place-items:center">${inner}</body></html>`;
const BG='radial-gradient(circle at 50% 30%,#3a2a66,#130f22 70%)';
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const shot=async(file,w,h,html,transparent)=>{const p=await b.newPage({viewport:{width:w,height:h}});await p.setContent(html);await p.screenshot({path:file,omitBackground:!!transparent});await p.close()};
  await shot('assets/icon-only.png',1024,1024,page(1024,1024,BG,box(760)));
  await shot('assets/icon-foreground.png',1024,1024,page(1024,1024,'transparent',box(560)),true);
  await shot('assets/icon-background.png',1024,1024,page(1024,1024,BG,''));
  const splash=page(2732,2732,'#130f22',box(700));
  await shot('assets/splash.png',2732,2732,splash);await shot('assets/splash-dark.png',2732,2732,splash);
  await b.close();console.log('Icons gerendert');
})();
