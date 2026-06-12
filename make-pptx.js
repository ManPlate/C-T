const pptxgen=require("pptxgenjs");
const sharp=require("sharp");
const S=require("./slides-data.js");
const {DIAGRAMS}=require("./diagrams.js");
const INK="17171C",PAPER="FFFFFF",SOFT="6A6A74",CRIM="C8102E",VIO="5B2D8E",MID="B0356B",ROSE="9B3A6E";
const phaseOf=n=>n<=10?1:n<=28?2:3;
const shadow=()=>({type:"outer",color:"000000",blur:8,offset:3,angle:45,opacity:0.18});

const dgCache={};
async function diagramPng(id){
  if(dgCache[id])return dgCache[id];
  const svg=DIAGRAMS[id]().replace(/&(?!(amp|lt|gt|quot|apos|#[0-9]+|#x[0-9a-fA-F]+);)/g,'&amp;');
  const buf=await sharp(Buffer.from(svg),{density:130}).resize(1600).png().toBuffer();
  return dgCache[id]="image/png;base64,"+buf.toString("base64");
}
async function gradPng(){
  const svg=`<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
   <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#1c0e14"/><stop offset="0.5" stop-color="#26101f"/><stop offset="1" stop-color="#1a1030"/></linearGradient>
    <radialGradient id="r" cx="0.85" cy="0.1" r="0.9">
    <stop offset="0" stop-color="#c8102e" stop-opacity="0.35"/><stop offset="0.5" stop-color="#5b2d8e" stop-opacity="0.18"/><stop offset="1" stop-opacity="0"/></radialGradient></defs>
   <rect width="1600" height="900" fill="url(#g)"/><rect width="1600" height="900" fill="url(#r)"/></svg>`;
  const buf=await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64,"+buf.toString("base64");
}
async function build(name,sessions,phaseLabel,bg){
  const p=new pptxgen();p.layout="LAYOUT_16x9";p.author="Support-to-Tech Program";p.title=name;
  // cover
  let cv=p.addSlide();cv.background={data:bg};
  cv.addText("SUPPORT-TO-TECH · CLASSROOM EDITION",{x:0.7,y:0.9,w:8.6,h:0.4,fontFace:"Courier New",fontSize:13,color:"D98AAE",charSpacing:3});
  cv.addText(phaseLabel,{x:0.7,y:1.5,w:8.6,h:1.6,fontFace:"Arial",fontSize:48,bold:true,color:"FFFFFF"});
  cv.addText(sessions.length+" sessions · one true story each · explainers, comparisons & wow facts",{x:0.7,y:3.2,w:8,h:0.8,fontFace:"Arial",fontSize:16,color:"D8D8DE"});
  cv.addNotes("Presenter tip: every session follows the same arc — story, question, explainers, comparison, wow, handoff. Speaker notes on each session's title slide tell you how to play it.");
  for(const s of sessions){
    const ph=phaseOf(s.n),tag=`SESSION ${String(s.n).padStart(2,"0")} · PHASE ${ph}`;
    // 1 title (dark)
    let t=p.addSlide();t.background={data:bg};
    t.addText(tag,{x:0.7,y:0.8,w:8.6,h:0.4,fontFace:"Courier New",fontSize:12,color:"D98AAE",charSpacing:3});
    t.addText(String(s.n).padStart(2,"0"),{x:0.6,y:1.0,w:4.4,h:2.6,fontFace:"Arial",fontSize:150,bold:true,color:"E0223F",margin:0});
    t.addText(s.title,{x:0.7,y:3.6,w:8.6,h:1.0,fontFace:"Arial",fontSize:38,bold:true,color:"FFFFFF",margin:0});
    t.addNotes(s.notes);
    // 2 hook (dark)
    let h=p.addSlide();h.background={data:bg};
    h.addText("TONIGHT'S TRUE STORY",{x:0.7,y:0.55,w:8.6,h:0.4,fontFace:"Courier New",fontSize:12,color:"D98AAE",charSpacing:3});
    h.addText(s.hook.map((l,i)=>({text:"—  "+l,options:{breakLine:true,bold:i===s.hook.length-1,color:i===s.hook.length-1?"FFFFFF":"E4E4EA"}})),
      {x:0.7,y:1.05,w:8.6,h:2.9,fontFace:"Arial",fontSize:18,paraSpaceAfter:12,valign:"top"});
    if(s.facts.length){
      h.addShape(p.shapes.LINE,{x:0.7,y:4.05,w:8.6,h:0,line:{color:"4A3A50",width:1,dashType:"dash"}});
      const fw=8.6/s.facts.length;
      s.facts.forEach((f,i)=>{
        h.addText("FACT",{x:0.7+i*fw,y:4.18,w:fw-0.2,h:0.22,fontFace:"Courier New",fontSize:8.5,color:"D98AAE",charSpacing:2});
        h.addText(f,{x:0.7+i*fw,y:4.42,w:fw-0.25,h:1.0,fontFace:"Arial",fontSize:10.5,color:"C6C6D0",valign:"top"});
      });
    }
    h.addNotes("Reveal verbally with pauses — in PowerPoint, read line by line with your own dramatic timing. Last line is the punch.");
    // 3 question (dark)
    let q=p.addSlide();q.background={data:bg};
    q.addText("?",{x:0.6,y:0.7,w:2,h:1.6,fontFace:"Arial",fontSize:110,bold:true,color:"E0223F",margin:0});
    q.addText(s.q,{x:0.75,y:2.3,w:8.4,h:2.4,fontFace:"Arial",fontSize:27,bold:true,color:"FFFFFF",valign:"top"});
    q.addText("ARGUE FOR TWO MINUTES — THEN WE EXPLAIN",{x:0.75,y:4.9,w:8,h:0.35,fontFace:"Courier New",fontSize:11,color:"D98AAE",charSpacing:2});
    q.addNotes("Let the room actually argue. Two real minutes. The debate primes the lesson.");
    // 4-5 explainers (light)
    s.ex.forEach((e,i)=>{
      let x=p.addSlide();x.background={color:PAPER};
      x.addShape(p.shapes.ROUNDED_RECTANGLE,{x:0.7,y:0.55,w:0.85,h:0.85,rectRadius:0.12,fill:{color:CRIM},shadow:shadow()});
      x.addText(String(s.n),{x:0.7,y:0.55,w:0.85,h:0.85,fontFace:"Arial",fontSize:22,bold:true,color:"FFFFFF",align:"center",valign:"middle",margin:0});
      x.addText(`EXPLAINER ${i+1} OF ${s.ex.length}`,{x:1.75,y:0.72,w:6,h:0.4,fontFace:"Courier New",fontSize:11,color:ROSE,charSpacing:3});
      x.addText(e.t,{x:0.72,y:1.55,w:8.6,h:0.8,fontFace:"Arial",fontSize:32,bold:true,color:INK,margin:0});
      x.addText(e.pts.map((pt,j)=>({text:pt,options:{bullet:{code:"25AA",color:MID},breakLine:j<e.pts.length-1}})),
        {x:0.85,y:2.5,w:8.3,h:2.7,fontFace:"Arial",fontSize:17,color:"2B2B33",paraSpaceAfter:12,valign:"top"});
      x.addNotes("Expand each point with your own example — the slide is the skeleton, you are the muscle.");
    });
    // 6 comparison (light, two cards)
    let c=p.addSlide();c.background={color:PAPER};
    c.addText(s.cmp.t,{x:0.6,y:0.55,w:8.8,h:0.7,fontFace:"Arial",fontSize:28,bold:true,color:INK,align:"center"});
    c.addShape(p.shapes.ROUNDED_RECTANGLE,{x:0.7,y:1.7,w:4.0,h:2.9,rectRadius:0.12,fill:{color:"F5F4F8"},shadow:shadow()});
    c.addText(s.cmp.a[0],{x:0.9,y:2.2,w:3.6,h:1.0,fontFace:"Arial",fontSize:29,bold:true,color:INK,align:"center",valign:"middle"});
    c.addText(s.cmp.a[1],{x:0.9,y:3.3,w:3.6,h:1.0,fontFace:"Arial",fontSize:13,color:SOFT,align:"center",valign:"top"});
    c.addText("VS",{x:4.7,y:2.9,w:0.6,h:0.5,fontFace:"Courier New",fontSize:14,color:SOFT,align:"center"});
    c.addShape(p.shapes.ROUNDED_RECTANGLE,{x:5.3,y:1.7,w:4.0,h:2.9,rectRadius:0.12,fill:{color:"211726"},shadow:shadow()});
    c.addText(s.cmp.b[0],{x:5.5,y:2.2,w:3.6,h:1.0,fontFace:"Arial",fontSize:29,bold:true,color:"FF6B8A",align:"center",valign:"middle"});
    c.addText(s.cmp.b[1],{x:5.5,y:3.3,w:3.6,h:1.0,fontFace:"Arial",fontSize:13,color:"C9B9D9",align:"center",valign:"top"});
    c.addNotes("Pause on the contrast. Don't read the cards — let the room read them, then add one sentence of commentary.");
    // diagram slide
    for(const dgid of s.vis){
      let v=p.addSlide();v.background={color:"15151A"};
      const png=await diagramPng(dgid);
      v.addImage({data:png,x:0.31,y:0.18,w:9.38,h:5.27});
      v.addNotes("Walk the diagram left to right. Invite the room to predict each label before you reveal your narration.");
    }
    // video slide
    if(s.vid){
      let vd=p.addSlide();vd.background={data:bg};
      vd.addText("SHORT VIDEO · ~5 MINUTES",{x:0.7,y:0.9,w:8.6,h:0.4,fontFace:"Courier New",fontSize:12,color:"D98AAE",charSpacing:3});
      vd.addText("Watch: the animation version",{x:0.7,y:1.5,w:8.6,h:0.9,fontFace:"Arial",fontSize:34,bold:true,color:"FFFFFF"});
      vd.addText([{text:"Play from: ",options:{color:"C6C6D0"}},{text:"youtube.com/watch?v="+s.vid,options:{bold:true,color:"FFFFFF"}}],
        {x:0.7,y:2.7,w:8.6,h:0.5,fontFace:"Arial",fontSize:18});
      vd.addText("Tip: Insert → Video → Online Video in PowerPoint embeds it directly into this slide.",
        {x:0.7,y:3.4,w:8.6,h:0.5,fontFace:"Arial",fontSize:13,color:"9A8AA8"});
      vd.addNotes("Queue the clip before class. In the HTML edition this plays inline automatically.");
    }
    // 7 wow + handoff (dark)
    let w=p.addSlide();w.background={data:bg};
    w.addText(s.wow[0],{x:0.5,y:1.0,w:9.0,h:1.9,fontFace:"Arial",fontSize:76,bold:true,color:"E0223F",align:"center",valign:"middle"});
    w.addText(s.wow[1],{x:1.3,y:3.05,w:7.4,h:1.1,fontFace:"Arial",fontSize:17,color:"E6E6EC",align:"center",valign:"top"});
    w.addText("OVER TO YOU →  "+s.handoff,{x:0.8,y:4.6,w:8.4,h:0.7,fontFace:"Courier New",fontSize:12,color:"D98AAE",align:"center",valign:"top"});
    w.addNotes("Land the stat, breathe, then hand off to the lab in one sentence. End on energy.");
  }
  await p.writeFile({fileName:name});
  console.log("wrote",name);
}
(async()=>{
  const bg=await gradPng();
  await build("classroom-phase1-foundations.pptx",S.filter(x=>x.n<=10),"Phase 1 — IT Foundations",bg);
  await build("classroom-phase2-aplus.pptx",S.filter(x=>x.n>10&&x.n<=28),"Phase 2 — A+ Track",bg);
  await build("classroom-phase3-network.pptx",S.filter(x=>x.n>28),"Phase 3 — Networking",bg);
})();
