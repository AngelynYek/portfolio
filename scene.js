// Draw at native pixel resolution; CSS scales the scene without smoothing.
export function drawIsland(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const iso = (u, v, z = 0) => [150 + (u - v) * 16, 104 + (u + v) * 8 - z];
  const poly = (points, color) => {
    ctx.fillStyle = color;
    // Scanline filling keeps the diagonal edges genuinely pixel-stepped.
    const minY = Math.floor(Math.min(...points.map(p => p[1])));
    const maxY = Math.ceil(Math.max(...points.map(p => p[1])));
    for (let y = minY; y < maxY; y++) {
      const intersections = [];
      for (let i = 0; i < points.length; i++) {
        const a = points[i], b = points[(i + 1) % points.length];
        if ((a[1] <= y && b[1] > y) || (b[1] <= y && a[1] > y)) {
          intersections.push(a[0] + (y - a[1]) * (b[0] - a[0]) / (b[1] - a[1]));
        }
      }
      intersections.sort((a, b) => a - b);
      for (let i = 0; i < intersections.length; i += 2) {
        ctx.fillRect(Math.round(intersections[i]), y, Math.round(intersections[i + 1]) - Math.round(intersections[i]), 1);
      }
    }
  };
  const rect = (x, y, w, h, color) => { ctx.fillStyle = color; ctx.fillRect(Math.round(x), Math.round(y), w, h); };
  const line = (a, b, color, width = 1) => {
    const length = Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1]));
    for (let i = 0; i <= length; i++) rect(a[0] + (b[0] - a[0]) * i / length, a[1] + (b[1] - a[1]) * i / length, width, width, color);
  };
  const tile = (u, v, w, d, z, color) => poly([iso(u,v,z),iso(u+w,v,z),iso(u+w,v+d,z),iso(u,v+d,z)],color);
  const box = (u,v,w,d,z,h,top,left,right) => {
    poly([iso(u,v+d,z),iso(u+w,v+d,z),iso(u+w,v+d,z-h),iso(u,v+d,z-h)],left);
    poly([iso(u+w,v,z),iso(u+w,v+d,z),iso(u+w,v+d,z-h),iso(u+w,v,z-h)],right);
    tile(u,v,w,d,z,top);
  };
  const shrub = (x,y,scale=1) => {
    rect(x-6*scale,y-3*scale,12*scale,7*scale,'#93654d');
    rect(x-7*scale,y-5*scale,14*scale,3*scale,'#d5a779');
    poly([[x-9*scale,y-8*scale],[x-7*scale,y-17*scale],[x-2*scale,y-21*scale],[x+5*scale,y-19*scale],[x+10*scale,y-12*scale],[x+7*scale,y-5*scale],[x-5*scale,y-4*scale]],'#427e70');
    rect(x-5*scale,y-15*scale,6*scale,5*scale,'#74a780');
    rect(x+2*scale,y-11*scale,5*scale,3*scale,'#a6bd82');
  };
  ctx.clearRect(0,0,320,280);
  // Ground, platform depth, and the little entrance spur.
  poly([[33,178],[184,251],[303,190],[156,117]],'#a9c5dc');
  box(0,0,9,7,0,15,'#e8c8b7','#76617a','#574f6c');
  box(3,7,2,2,0,15,'#e8c8b7','#76617a','#574f6c');
  for(let u=0;u<9;u++)for(let v=0;v<7;v++)tile(u,v,1,1,1,(u+v)%2?'#e7b5a5':'#f5d8bf');
  for(let u=3;u<5;u++)for(let v=7;v<9;v++)tile(u,v,1,1,1,(u+v)%2?'#e7b5a5':'#f5d8bf');
  const perimeter=[[0,7],[3,7],[3,9],[5,9],[5,7],[9,7],[9,0]];
  for(let i=0;i<perimeter.length-1;i++)line(iso(...perimeter[i]),iso(...perimeter[i+1]),'#f9e2c3',2);
  for(let i=0;i<8;i++){const [x,y]=iso(9,i*.85,-5);rect(x-1,y,2,5,'#72637e');}
  // Raised water garden on the left.
  box(.5,.5,3.5,3,8,8,'#d9bd77','#a88d69','#8b7c68');
  tile(.7,.7,3.1,2.6,9,'#457e85');
  tile(.9,.9,2.7,2.2,9,'#6eb6b6');
  tile(1.2,1.2,1.1,.25,10,'#93d2c4');tile(2.1,2.2,1,.16,10,'#b3e1d3');
  poly([[126,116],[124,92],[134,78],[142,80],[148,63],[160,67],[165,95],[174,106],[155,121]],'#406a73');
  poly([[124,92],[134,78],[142,80],[148,63],[150,89],[139,110],[126,116]],'#69a099');
  poly([[150,89],[148,63],[160,67],[165,95],[155,113],[139,110]],'#51898b');
  line([150,69],[155,89],'#91b5a6',2);
  tile(1.7,2.7,.6,.45,10,'#75966c');tile(2.7,1.7,.45,.3,10,'#8aa770');
  rect(134,132,3,2,'#edbbba');rect(136,130,2,2,'#fff0cd');
  shrub(169,110,.6);
  // Café walls and timber frame.
  box(5,1,3,3,57,57,'#f9dfac','#f7dfb5','#d9bd92');
  const frontLeft=iso(5,4,57), frontRight=iso(8,4,57), ridgeFront=iso(6.5,4,92), ridgeBack=iso(6.5,1,92);
  poly([frontLeft,ridgeFront,frontRight],'#f9e4bc');
  line(frontLeft,iso(5,4),'#8c6051',3);line(frontRight,iso(8,4),'#8c6051',3);
  line(iso(5,4,5),iso(8,4,5),'#98634e',4);
  line(iso(8,1,5),iso(8,4,5),'#a47756',3);
  line(iso(5,4,39),iso(8,4,39),'#b58360',2);
  line(iso(6.5,4,68),iso(6.5,4,31),'#8c6051',2);
  // Front door and window, drawn on the front wall plane.
  poly([iso(5.35,4,36),iso(6.15,4,36),iso(6.15,4,3),iso(5.35,4,3)],'#775a51');
  poly([iso(5.48,4,32),iso(6.02,4,32),iso(6.02,4,18),iso(5.48,4,18)],'#86b5b4');
  line(iso(5.5,4,30),iso(5.95,4,30),'#c8e2c8',2);
  const knob=iso(6,4,13);rect(knob[0],knob[1],2,2,'#f1ce83');
  poly([iso(6.7,4,34),iso(7.65,4,34),iso(7.65,4,16),iso(6.7,4,16)],'#875a4a');
  poly([iso(6.85,4,31),iso(7.5,4,31),iso(7.5,4,19),iso(6.85,4,19)],'#73a7a6');
  line(iso(7.2,4,31),iso(7.2,4,19),'#e8d7ac',2);
  // Side serving window and striped canopy.
  poly([iso(8,1.5,35),iso(8,3.3,35),iso(8,3.3,15),iso(8,1.5,15)],'#785d50');
  poly([iso(8,1.65,32),iso(8,3.15,32),iso(8,3.15,18),iso(8,1.65,18)],'#729a99');
  for(let i=0;i<6;i++){
    const v=1.35+i*.35;
    poly([iso(8,v,39),iso(8,v+.35,39),iso(8.65,v+.35,32),iso(8.65,v,32)],i%2?'#f5dca2':'#d69655');
    poly([iso(8.65,v,32),iso(8.65,v+.35,32),iso(8.65,v+.35,28),iso(8.65,v,28)],i%2?'#e7c78b':'#be7f48');
  }
  // Roof tiles use a bilinear grid on the sloping roof plane.
  const roof=[ridgeFront,ridgeBack,iso(8.25,.85,56),iso(8.25,4.15,56)];
  poly(roof,'#a65c46');
  const roofPoint=(u,v)=>[roof[0][0]*(1-u)*(1-v)+roof[1][0]*u*(1-v)+roof[2][0]*u*v+roof[3][0]*(1-u)*v,roof[0][1]*(1-u)*(1-v)+roof[1][1]*u*(1-v)+roof[2][1]*u*v+roof[3][1]*(1-u)*v];
  for(let row=0;row<7;row++)for(let col=0;col<8;col++){
    const a=col/8,b=row/7;
    poly([roofPoint(a,b),roofPoint(a+.115,b),roofPoint(a+.115,b+.12),roofPoint(a,b+.12)],['#d88955','#e49b60','#ce794d'][(row+col*2)%3]);
    line(roofPoint(a,b),roofPoint(a+.115,b),'#efb97c');
  }
  line(ridgeFront,ridgeBack,'#f1b77b',3);line(ridgeFront,frontLeft,'#a96549',4);line(ridgeFront,iso(8.25,4.15,56),'#9c5c49',3);
  line(iso(8.25,4.15,56),iso(8.25,.85,56),'#8f5748',3);
  // A small café sign hangs beside the entrance.
  rect(172,145,21,10,'#855c4e');rect(174,147,17,6,'#f0d0a0');
  rect(177,149,5,2,'#946648');rect(184,149,5,2,'#946648');
  const table=(x,y)=>{
    rect(x-1,y,3,13,'#8c6351');rect(x-6,y+11,13,2,'#8c6351');
    poly([[x-11,y-2],[x-5,y-6],[x+6,y-6],[x+12,y-2],[x+6,y+3],[x-6,y+3]],'#97654b');
    poly([[x-11,y-4],[x-5,y-8],[x+6,y-8],[x+12,y-4],[x+6,y+1],[x-6,y+1]],'#e9c491');
    rect(x-2,y-7,3,4,'#f6e5cb');rect(x+1,y-6,2,2,'#a67d5b');
  };
  const chair=(x,y)=>{rect(x-5,y-8,2,15,'#97705c');rect(x+4,y-8,2,15,'#97705c');rect(x-5,y-9,11,3,'#c69972');rect(x-5,y,11,3,'#c69972');};
  chair(213,202);table(201,203);chair(192,215);
  shrub(286,177,.85);shrub(150,205,.55);shrub(44,167,.65);
  // Small stepping stones at the entrance.
  tile(3.3,8.15,.5,.6,2,'#f8e6cf');tile(4.1,8.15,.5,.6,2,'#f8e6cf');
}
