// Baut www/index.html für die Android-App aus der gemeinsamen Quelle index.html:
// vollständiges HTML-Gerüst, lokale Schriften (offline), capacitor.js.
import {readFileSync,writeFileSync,copyFileSync,mkdirSync} from 'node:fs';

const src=readFileSync('index.html','utf8');
const fonts=readFileSync('www/fonts/fonts.css','utf8');
const styleAt=src.indexOf('<style>');
const scriptAt=src.indexOf('<script>');
if(styleAt<0||scriptAt<0)throw new Error('index.html: <style> oder <script> nicht gefunden');

const head=`<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
<meta name="theme-color" content="#130f22">
<title>Morgen-Quest</title>
<style>
${fonts}
*,*::before,*::after{box-sizing:border-box}
:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;-webkit-user-select:none;user-select:none;overscroll-behavior:none}
img{max-width:100%}
</style>
`;
const body=src.slice(styleAt,scriptAt)+'<script src="capacitor.js"></script>\n'+src.slice(scriptAt);
mkdirSync('www',{recursive:true});
writeFileSync('www/index.html',head+body.replace('</style>','</style>\n</head>\n<body>')+'\n</body>\n</html>\n');
copyFileSync('node_modules/@capacitor/core/dist/capacitor.js','www/capacitor.js');
console.log('www/index.html gebaut');
