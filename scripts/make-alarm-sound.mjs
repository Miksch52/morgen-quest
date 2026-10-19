// Erzeugt assets/wecker.wav: 28 s, aufsteigendes 4-Ton-Arpeggio alle 1,4 s, wird lauter.
import {writeFileSync} from 'node:fs';
const SR=22050,DUR=28,N=SR*DUR,data=new Int16Array(N),notes=[784,988,1175,1568];
for(let i=0;i<N;i++){
  const t=i/SR,beat=t%1.4,k=Math.floor(beat/.12);let v=0;
  if(k<4&&beat-k*.12<.16){const f=notes[k],lt=beat-k*.12,env=Math.min(1,lt/.005)*Math.exp(-lt*14);
    v=(Math.sin(2*Math.PI*f*t)+.35*Math.sin(2*Math.PI*f*3*t)+.15*Math.sin(2*Math.PI*f*5*t))/1.5*env}
  const vol=Math.min(.95,.35+t/DUR*.7);data[i]=Math.max(-32767,Math.min(32767,v*vol*32767));
}
const b=Buffer.alloc(44+N*2);b.write('RIFF',0);b.writeUInt32LE(36+N*2,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);
b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(SR,24);b.writeUInt32LE(SR*2,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);
b.write('data',36);b.writeUInt32LE(N*2,40);Buffer.from(data.buffer).copy(b,44);
writeFileSync('assets/wecker.wav',b);console.log('assets/wecker.wav',b.length,'Bytes');
