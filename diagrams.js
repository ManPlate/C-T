/* Labeled teaching diagrams — shared by the HTML deck (inline SVG) and the PPTX generator (rasterized).
   Dark theme to match story slides. All original artwork — safe to present and print. */
const DG={ink:"#15151a",card:"#1d1d26",line:"#3a3a46",txt:"#e8e8ee",soft:"#9a9aa4",red:"#e0223f",vio:"#8a5cc4",mid:"#c2417d",ok:"#2fbf7f"};
function dgWrap(inner,w=1280,h=720){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" font-family="Arial,Helvetica,sans-serif">
<rect width="${w}" height="${h}" fill="${DG.ink}"/>${inner}</svg>`}
function box(x,y,w,h,label,sub,fill=DG.card,stroke=DG.line,tc=DG.txt){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
<text x="${x+w/2}" y="${y+h/2+(sub?-6:7)}" fill="${tc}" font-size="24" font-weight="bold" text-anchor="middle">${label}</text>
${sub?`<text x="${x+w/2}" y="${y+h/2+22}" fill="${DG.soft}" font-size="16" text-anchor="middle">${sub}</text>`:''}`}
function tag(x,y,t,c=DG.mid){return `<text x="${x}" y="${y}" fill="${c}" font-size="17" font-weight="bold" letter-spacing="2">${t}</text>`}
function arrow(x1,y1,x2,y2,c=DG.mid,dash=""){return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="3" ${dash?`stroke-dasharray="${dash}"`:''}/>
<circle cx="${x2}" cy="${y2}" r="5" fill="${c}"/>`}

const DIAGRAMS={
pc:()=>dgWrap(`
${tag(60,52,"INSIDE THE BOX — THE FIVE ORGANS")}
<rect x="60" y="80" width="760" height="580" rx="20" fill="#181820" stroke="${DG.line}" stroke-width="3"/>
<text x="80" y="116" fill="${DG.soft}" font-size="16">MOTHERBOARD — everything plugs into this</text>
${box(120,150,260,170,"CPU","the brain · GHz = speed","#241a22",DG.red)}
<rect x="140" y="168" width="220" height="10" rx="5" fill="${DG.red}" opacity="0.5"/>
${box(450,150,140,300,"RAM","fast workspace","#1c2030",DG.vio)}${box(610,150,140,300,"RAM","at power-off","#1c2030",DG.vio)}
<text x="680" y="480" fill="${DG.soft}" font-size="15" text-anchor="middle"></text>
${box(120,370,260,120,"NVMe SSD","long-term memory · M.2 slot","#1a241e",DG.ok)}
${box(120,530,470,100,"SATA SSD / HDD","more storage · cable + power","#1a241e",DG.ok)}
${box(640,530,150,100,"BIOS chip","first to wake")}
${box(880,120,330,210,"POWER SUPPLY (PSU)","wall power → component voltages","#241a22",DG.red)}
${arrow(880,225,822,225)}
${box(880,400,330,160,"COOLING","paste + heatsink + airflow","#1c2030",DG.vio)}
<text x="880" y="620" fill="${DG.soft}" font-size="17">Fault clue: repeating BEEPS at power-on =</text>
<text x="880" y="645" fill="${DG.txt}" font-size="17" font-weight="bold">the board telling you which organ hurts</text>`),

homenet:()=>dgWrap(`
${tag(60,52,"THE BOXES USERS CALL “THE ROUTER”")}
${box(60,260,200,150,"INTERNET","your ISP","#241a22",DG.red)}
${arrow(260,335,360,335)}
${box(360,260,190,150,"MODEM","translates the ISP signal")}
${arrow(550,335,640,335)}
${box(640,260,210,150,"ROUTER","decides where traffic goes","#1c2030",DG.vio)}
${arrow(850,335,940,335)}
${box(940,260,190,150,"SWITCH","multiplies wired ports")}
${arrow(745,410,745,500)}
${box(640,500,210,130,"ACCESS POINT","broadcasts the Wi-Fi","#1a241e",DG.ok)}
${arrow(1035,410,1035,500)}
${box(940,500,190,130,"WIRED PCs","printers, desktops")}
<circle cx="540" cy="610" r="0" />
<text x="660" y="685" fill="${DG.soft}" font-size="17">📱 laptops &amp; phones join through the AP — DHCP hands each one an address</text>
<text x="60" y="160" fill="${DG.txt}" font-size="22" font-weight="bold">One consumer box usually bundles all four —</text>
<text x="60" y="190" fill="${DG.soft}" font-size="19">which is why every user calls everything “the router”.</text>`),

storage:()=>dgWrap(`
${tag(60,52,"THE STORAGE LADDER — SAME JOB, DIFFERENT CENTURY")}
${box(80,120,340,160,"HDD","spinning platters · moving head","#241a22",DG.red)}
<circle cx="170" cy="200" r="46" fill="none" stroke="${DG.red}" stroke-width="3"/><circle cx="170" cy="200" r="20" fill="none" stroke="${DG.red}" stroke-width="2"/>
<text x="100" y="320" fill="${DG.soft}" font-size="17">cheap per TB · fragile · the CLICK of death is real</text>
${box(80,370,340,160,"SATA SSD","no moving parts · same cable")}
<rect x="120" y="420" width="60" height="36" rx="6" fill="${DG.vio}"/><rect x="190" y="420" width="60" height="36" rx="6" fill="${DG.vio}"/><rect x="260" y="420" width="60" height="36" rx="6" fill="${DG.vio}"/>
<text x="100" y="570" fill="${DG.soft}" font-size="17">~5× faster in feel · the classic refurbish upgrade</text>
${box(560,120,340,160,"NVMe (M.2)","plugs into the board · PCIe","#1a241e",DG.ok)}
<rect x="600" y="190" width="240" height="26" rx="6" fill="${DG.ok}" opacity="0.7"/>
<text x="580" y="320" fill="${DG.soft}" font-size="17">multiples faster again · fingernail-sized</text>
<rect x="560" y="380" width="640" height="220" rx="16" fill="#181820" stroke="${DG.line}"/>
<text x="590" y="430" fill="${DG.txt}" font-size="22" font-weight="bold">Sequential speed, typical:</text>
<rect x="590" y="455" width="60" height="26" rx="6" fill="${DG.red}"/><text x="665" y="475" fill="${DG.soft}" font-size="17">HDD ~150 MB/s</text>
<rect x="590" y="495" width="200" height="26" rx="6" fill="${DG.vio}"/><text x="805" y="515" fill="${DG.soft}" font-size="17">SATA SSD ~550 MB/s</text>
<rect x="590" y="535" width="560" height="26" rx="6" fill="${DG.ok}"/><text x="600" y="555" fill="#10241a" font-size="17" font-weight="bold">NVMe ~7,000 MB/s</text>
<text x="940" y="130" fill="${DG.soft}" font-size="16"></text>`),

ports:()=>dgWrap(`
${tag(60,52,"PORTS — NUMBERED DOORS ON EVERY MACHINE")}
<rect x="60" y="90" width="1160" height="180" rx="18" fill="#181820" stroke="${DG.line}" stroke-width="2"/>
<text x="90" y="135" fill="${DG.txt}" font-size="21" font-weight="bold">A server is a building. Every service answers at its own numbered door.</text>
<text x="90" y="168" fill="${DG.soft}" font-size="18">An app “listens” on its port. Firewalls decide which doors are reachable.</text>
<text x="90" y="225" fill="${DG.mid}" font-size="17" font-weight="bold" letter-spacing="2">MEMORIZE THE CORE SET — IT BECOMES REFLEX</text>
${[["80","HTTP — web",DG.vio],["443","HTTPS — secure web",DG.ok],["53","DNS — names",DG.red],["22","SSH — remote shell",DG.vio],["3389","RDP — remote desktop",DG.mid],["445","SMB — file sharing",DG.red],["25 / 587","SMTP — mail out",DG.vio],["143 / 993","IMAP — mailbox",DG.ok]].map((p,i)=>{
const x=70+(i%4)*295,y=310+Math.floor(i/4)*180;
return `<rect x="${x}" y="${y}" width="265" height="150" rx="14" fill="${DG.card}" stroke="${p[2]}" stroke-width="2"/>
<text x="${x+132}" y="${y+68}" fill="${p[2]}" font-size="40" font-weight="bold" text-anchor="middle">${p[0]}</text>
<text x="${x+132}" y="${y+108}" fill="${DG.soft}" font-size="17" text-anchor="middle">${p[1]}</text>`}).join('')}
<text x="70" y="685" fill="${DG.soft}" font-size="17">TCP = reliable &amp; confirmed · UDP = fast &amp; unguaranteed (calls, games, DNS lookups)</text>`),

osistack:()=>dgWrap(`
${tag(60,52,"THE OSI MODEL — ONE MAP FOR EVERY CONVERSATION")}
${[["L7 APPLICATION","HTTP · DNS · the protocols apps speak",DG.red],
["L4 TRANSPORT","TCP / UDP · ports · segments",DG.mid],
["L3 NETWORK","routers · IP addresses · packets",DG.vio],
["L2 DATA LINK","switches · MAC addresses · frames","#5a7bd4"],
["L1 PHYSICAL","cables · radio · bits on the wire",DG.ok]].map((l,i)=>{
const y=100+i*112;return `<rect x="80" y="${y}" width="700" height="92" rx="14" fill="${DG.card}" stroke="${l[2]}" stroke-width="2.5"/>
<text x="110" y="${y+40}" fill="${l[2]}" font-size="24" font-weight="bold">${l[0]}</text>
<text x="110" y="${y+70}" fill="${DG.soft}" font-size="18">${l[1]}</text>`}).join('')}
${arrow(820,140,820,620,DG.mid)}
<text x="845" y="160" fill="${DG.txt}" font-size="20" font-weight="bold">SENDING = wrapping</text>
<text x="845" y="190" fill="${DG.soft}" font-size="17">data → [TCP[data]] → [IP[TCP[data]]]</text>
<text x="845" y="215" fill="${DG.soft}" font-size="17">→ [ETH[IP[TCP[data]]]] → ⚡ bits</text>
<text x="845" y="300" fill="${DG.txt}" font-size="20" font-weight="bold">TROUBLESHOOT = climb</text>
<text x="845" y="330" fill="${DG.soft}" font-size="17">bottom-up · stop at the first failure</text>
<text x="845" y="355" fill="${DG.soft}" font-size="17">everything above it is a symptom</text>
<text x="845" y="440" fill="${DG.txt}" font-size="20" font-weight="bold">“A Layer 1 problem”</text>
<text x="845" y="470" fill="${DG.soft}" font-size="17">= professional for “check the cable”</text>`),

vlan:()=>dgWrap(`
${tag(60,52,"ONE SWITCH, TWO WORLDS — VLANs")}
${box(440,90,400,120,"SWITCH","ports assigned to VLANs")}
${box(80,300,300,130,"VLAN 10 — STAFF","desks, laptops","#1c2030",DG.vio)}
${box(490,300,300,130,"VLAN 20 — GUESTS","visitor Wi-Fi","#241a22",DG.red)}
${box(900,300,300,130,"VLAN 30 — SERVERS","the crown jewels","#1a241e",DG.ok)}
${arrow(540,210,230,300,DG.vio)}${arrow(640,210,640,300,DG.red)}${arrow(740,210,1050,300,DG.ok)}
<line x1="395" y1="310" x2="395" y2="420" stroke="${DG.line}" stroke-width="4" stroke-dasharray="8 8"/>
<line x1="805" y1="310" x2="805" y2="420" stroke="${DG.line}" stroke-width="4" stroke-dasharray="8 8"/>
<text x="640" y="495" fill="${DG.txt}" font-size="21" font-weight="bold" text-anchor="middle">VLANs can't talk to each other without a ROUTER —</text>
<text x="640" y="525" fill="${DG.soft}" font-size="19" text-anchor="middle">that's the point: logical walls on shared hardware.</text>
<rect x="200" y="570" width="880" height="100" rx="14" fill="#181820" stroke="${DG.line}"/>
<text x="640" y="612" fill="${DG.mid}" font-size="18" font-weight="bold" text-anchor="middle">TRUNK PORT = carries many VLANs between switches, each frame tagged (802.1Q)</text>
<text x="640" y="645" fill="${DG.soft}" font-size="17" text-anchor="middle">Loop two switches in a circle without STP → broadcast storm → paper charts &amp; corridor runners</text>`)
};

/* ---------- evolution strip helper ---------- */
function evoStrip(title,items,footer){
  const n=items.length,W=1280,gap=24,cw=(W-120-(n-1)*gap)/n,y=210,ch=330;
  const cards=items.map((it,i)=>{
    const x=60+i*(cw+gap),col=it.c||DG.vio;
    return `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="14" fill="${DG.card}" stroke="${col}" stroke-width="2.5"/>
    <text x="${x+cw/2}" y="${y+48}" fill="${col}" font-size="20" font-weight="bold" text-anchor="middle">${it.year}</text>
    <text x="${x+cw/2}" y="${y+105}" fill="${DG.txt}" font-size="${it.label.length>12?20:24}" font-weight="bold" text-anchor="middle">${it.label}</text>
    ${it.sub.map((s,j)=>`<text x="${x+cw/2}" y="${y+150+j*30}" fill="${DG.soft}" font-size="15.5" text-anchor="middle">${s}</text>`).join('')}
    ${it.big?`<text x="${x+cw/2}" y="${y+ch-32}" fill="${col}" font-size="22" font-weight="bold" text-anchor="middle">${it.big}</text>`:''}
    ${i<n-1?`<text x="${x+cw+gap/2}" y="${y+ch/2+8}" fill="${DG.mid}" font-size="26" text-anchor="middle">→</text>`:''}`;
  }).join('');
  return dgWrap(`${tag(60,52,title)}${cards}
  ${footer?`<text x="640" y="640" fill="${DG.soft}" font-size="19" text-anchor="middle">${footer[0]}</text>
  <text x="640" y="672" fill="${DG.txt}" font-size="19" font-weight="bold" text-anchor="middle">${footer[1]}</text>`:''}`);
}
Object.assign(DIAGRAMS,{
ramevo:()=>evoStrip("RAM — THE EVOLUTION OF THE CHIPS",[
 {year:"1950s–60s",label:"Core memory",sub:["tiny magnetic rings","woven by hand","KBs, room-sized"],c:DG.red,big:"~µs access"},
 {year:"1980s",label:"SIMM",sub:["30/72-pin sticks","first plug-in modules","single-sided data"],c:DG.mid},
 {year:"1993",label:"SDRAM DIMM",sub:["synchronized to","the system clock","~100–133 MHz"],c:DG.vio},
 {year:"2000–14",label:"DDR–DDR3",sub:["Double Data Rate:","transfers on BOTH","clock edges"],c:"#5a7bd4"},
 {year:"2014",label:"DDR4",sub:["lower voltage","higher density","the office standard"],c:DG.ok},
 {year:"2021",label:"DDR5",sub:["~2× DDR4 bandwidth","on-stick power mgmt","keyed differently!"],c:DG.ok,big:"6,400+ MT/s"}],
 ["Every generation is keyed differently — a DDR4 stick physically cannot enter a DDR5 slot.","Laptops use the short SODIMM version of whatever generation is current."]),
storageevo:()=>evoStrip("STORAGE — FROM FORKLIFT TO FINGERNAIL",[
 {year:"1956",label:"IBM RAMAC",sub:["5 MB · ~1 ton","moved by forklift","$3,200/month lease"],c:DG.red,big:"5 MB"},
 {year:"1971–81",label:"Floppy disk",sub:["8\" → 5.25\" → 3.5\"","the immortal","'save' icon"],c:DG.mid,big:"1.44 MB"},
 {year:"1980s–",label:"HDD",sub:["spinning platters","cheap per TB","clicking = dying"],c:DG.vio,big:"~150 MB/s"},
 {year:"2007",label:"SATA SSD",sub:["no moving parts","the magic upgrade","same old cable"],c:"#5a7bd4",big:"~550 MB/s"},
 {year:"2013",label:"NVMe M.2",sub:["plugs into the board","talks PCIe directly","fingernail-sized"],c:DG.ok,big:"~7,000 MB/s"},
 {year:"today",label:"microSD 1TB",sub:["200,000 RAMACs","in 0.25 grams","×4 billion per gram"],c:DG.ok,big:"1 TB"}],
 ["Same job for 70 years: remember things when the power goes off.","Only the physics changed — magnetism → flash cells."]),
cpuevo:()=>evoStrip("THE CPU — 50 YEARS OF MOORE'S LAW",[
 {year:"1971",label:"Intel 4004",sub:["first microprocessor","2,300 transistors","740 kHz"],c:DG.red,big:"2.3k"},
 {year:"1980s",label:"x86 era",sub:["IBM PC standard","~30k–1M transistors","MHz race begins"],c:DG.mid},
 {year:"2000s",label:"GHz wall",sub:["heat ends the","clock-speed race","~2005"],c:DG.vio,big:"~4 GHz"},
 {year:"2006",label:"Multi-core",sub:["more brains, not","faster brains","parallel everything"],c:"#5a7bd4"},
 {year:"2020s",label:"Hybrid + ARM",sub:["P-cores + E-cores","Apple Silicon &","Snapdragon PCs"],c:DG.ok},
 {year:"now",label:"NPUs",sub:["AI accelerators","on every new chip","billions of transistors"],c:DG.ok,big:"10B+"}],
 ["The Apollo computer's entire job now fits in a rounding error of one chip.","Engineering, not just power: that's the Session 1 story coming full circle."]),
osevo:()=>evoStrip("OPERATING SYSTEMS — THE FAMILY TIMELINE",[
 {year:"1981",label:"MS-DOS",sub:["command line only","the $75k purchase","dir, copy live on"],c:DG.red},
 {year:"1995",label:"Windows 95",sub:["Start menu & taskbar","your desktop layout","is 30 years old"],c:DG.mid},
 {year:"2001",label:"Windows XP",sub:["NT kernel for all:","NTFS, users,","permissions"],c:DG.vio},
 {year:"1991/2001",label:"Linux · OS X",sub:["the free hobby +","Unix in a tuxedo","servers & Macs"],c:"#5a7bd4"},
 {year:"2007–08",label:"iOS · Android",sub:["computing moves","into the pocket","app stores arrive"],c:DG.ok},
 {year:"2021",label:"Windows 11",sub:["TPM 2.0 required","annual updates","your support target"],c:DG.ok}],
 ["One skillset spans all of them: accounts, permissions, processes, drivers.","Only the buttons move."]),
connevo:()=>evoStrip("CONNECTORS — WHAT THE PORTS BECAME",[
 {year:"1987",label:"VGA / PS/2",sub:["analog video","purple & green","keyboard/mouse"],c:DG.red},
 {year:"1996",label:"USB-A",sub:["one port to rule","keyboards, mice,","storage… 3 tries to plug"],c:DG.mid},
 {year:"1999–03",label:"DVI · SATA",sub:["digital video","faster internal","storage cabling"],c:DG.vio},
 {year:"2003",label:"HDMI",sub:["video + audio","one cable","living rooms & desks"],c:"#5a7bd4"},
 {year:"2014",label:"USB-C",sub:["reversible at last","data + video +","charging in one"],c:DG.ok},
 {year:"now",label:"Thunderbolt",sub:["USB-C shape,","up to 40+ Gbps","docks run everything"],c:DG.ok}],
 ["Field rule: the cable museum lives on in every office —","you will meet ALL of these. Adapters are a technician's pocket gold."]),
wifievo:()=>evoStrip("WI-FI — THE GENERATIONS",[
 {year:"1999",label:"802.11b",sub:["11 Mbps · 2.4 GHz","Wi-Fi brand born","coffee shops rejoice"],c:DG.red,big:"11 Mbps"},
 {year:"2003–09",label:"g / n (Wi-Fi 4)",sub:["54→600 Mbps","MIMO antennas","dual-band begins"],c:DG.mid},
 {year:"2013",label:"Wi-Fi 5 (ac)",sub:["gigabit-class","5 GHz only","the long-lived default"],c:DG.vio,big:"~1 Gbps"},
 {year:"2019",label:"Wi-Fi 6 / 6E",sub:["efficiency in crowds","OFDMA scheduling","6E opens 6 GHz"],c:"#5a7bd4"},
 {year:"2024",label:"Wi-Fi 7",sub:["multi-link operation","uses several bands","at once"],c:DG.ok,big:"5 Gbps+"},
 {year:"always",label:"Security",sub:["WEP broken →","WPA2 floor →","WPA3 standard"],c:DG.ok}],
 ["Four generations coexist in every building — that's why 'Wi-Fi is slow' has no single answer.","Survey first; the spectrum tells the truth."]),
malwaretree:()=>dgWrap(`${tag(60,52,"KNOW YOUR ENEMY — THE MALWARE FAMILY")}
${box(440,100,400,110,"MALWARE","software built to harm","#241a22",DG.red)}
${[["VIRUS","rides files · needs a user action",100],["WORM","spreads ITSELF across networks",395],["TROJAN","pretends to be friendly software",690],["RANSOMWARE","encrypts & extorts — the business model",985]].map((m,i)=>
`${arrow(640,210,m[2]+140,290,DG.red)}${box(m[2],290,280,110,m[0],m[1])}`).join('')}
${[["SPYWARE / KEYLOGGER","watches &amp; records you",170],["ROOTKIT","hides deep · lies to the OS itself",530],["CRYPTOMINER","steals your electricity &amp; CPU",890]].map(m=>box(m[2],470,290,110,m[0],m[1],"#1c2030",DG.vio)).join('')}
<text x="640" y="660" fill="${DG.txt}" font-size="20" font-weight="bold" text-anchor="middle">Diagnose by BEHAVIOR: slowness · popups · redirects · disabled security · strange extensions</text>`),
cloudstack:()=>dgWrap(`${tag(60,52,"WHO MANAGES WHAT — IaaS · PaaS · SaaS")}
<text x="200" y="120" fill="${DG.soft}" font-size="18">YOU manage ⬇</text><text x="1080" y="120" fill="${DG.soft}" font-size="18" text-anchor="end">⬇ THEY manage</text>
${[["ON-PREM","your server room: everything is yours — hardware, OS, app, data",DG.red,0],
["IaaS — rent machines","Azure VMs, EC2 · they own metal, you own OS upward",DG.mid,1],
["PaaS — rent the platform","you bring code · they run OS, runtime, scaling",DG.vio,2],
["SaaS — rent the app","M365, Salesforce · you just log in",DG.ok,3]].map((r,i)=>{
const y=150+i*125;return `<rect x="80" y="${y}" width="1120" height="105" rx="14" fill="${DG.card}" stroke="${r[2]}" stroke-width="2.5"/>
<text x="110" y="${y+44}" fill="${r[2]}" font-size="23" font-weight="bold">${r[0]}</text>
<text x="110" y="${y+78}" fill="${DG.soft}" font-size="17">${r[1]}</text>
<rect x="${860-i*220}" y="${y+30}" width="${280+i*220}" height="45" rx="10" fill="${r[2]}" opacity="0.18"/>
<text x="${1000+i*0}" y="${y+58}" fill="${r[2]}" font-size="15" font-weight="bold" text-anchor="middle">provider's job</text>`}).join('')}
<text x="640" y="690" fill="${DG.txt}" font-size="19" font-weight="bold" text-anchor="middle">'The app is slow' increasingly means: check the provider's status page first.</text>`),
bootladder:()=>dgWrap(`${tag(60,52,"WINDOWS WON'T BOOT — CLIMB, DON'T JUMP")}
${[["1","Restart twice","3rd failed boot offers auto-repair",DG.ok],
["2","WinRE → Startup Repair","the built-in fixer earns its shot",DG.ok],
["3","System Restore","rewind to a known-good point","#5a7bd4"],
["4","Safe Mode","boots here? suspect a driver / startup app",DG.vio],
["5","bootrec /fixmbr · /rebuildbcd","rebuild the boot record from the console",DG.mid],
["6","Reset / reinstall","LAST resort — rescue the data first",DG.red]].map((s,i)=>{
const y=580-i*88;return `<rect x="${120+i*70}" y="${y}" width="640" height="74" rx="12" fill="${DG.card}" stroke="${s[3]}" stroke-width="2.5"/>
<text x="${150+i*70}" y="${y+32}" fill="${s[3]}" font-size="20" font-weight="bold">${s[0]} · ${s[1]}</text>
<text x="${150+i*70}" y="${y+58}" fill="${DG.soft}" font-size="15">${s[2]}</text>`}).join('')}
<text x="860" y="640" fill="${DG.txt}" font-size="19" font-weight="bold">July 19, 2024:</text>
<text x="860" y="668" fill="${DG.soft}" font-size="17">8.5M machines were fixed at rung 4 —</text>
<text x="860" y="694" fill="${DG.soft}" font-size="17">safe mode + delete one file. Climb in order.</text>`),
handshake:()=>dgWrap(`${tag(60,52,"WHAT REALLY HAPPENS WHEN A PAGE LOADS")}
${box(80,110,240,90,"YOUR PC","the client")}${box(960,110,240,90,"SERVER","the website","#1c2030",DG.vio)}
${[["1 · DNS query — 'where is example.com?'",230,DG.ok,false],
["2 · DNS answer — '93.184.216.34'",290,DG.ok,true],
["3 · SYN — 'can we talk?'",365,DG.mid,false],
["4 · SYN/ACK — 'yes, can YOU?'",425,DG.mid,true],
["5 · ACK — 'connected.' (the 3-way handshake)",485,DG.mid,false],
["6 · HTTPS request → response 200 OK",560,DG.red,false]].map(s=>{
const dir=s[3];return `${arrow(dir?960:320,s[1],dir?320:960,s[1],s[2])}
<text x="640" y="${s[1]-12}" fill="${DG.txt}" font-size="17" text-anchor="middle">${s[0]}</text>`}).join('')}
<text x="640" y="660" fill="${DG.soft}" font-size="18" text-anchor="middle">SYN with no reply = blocked or dead · failed step 1–2 = "it's always DNS" · status 500 = THEIR fault</text>`),
castle:()=>dgWrap(`${tag(60,52,"TWO SECURITY MODELS — WHY ZERO TRUST WON")}
<rect x="80" y="120" width="520" height="480" rx="18" fill="${DG.card}" stroke="${DG.red}" stroke-width="2.5"/>
<text x="340" y="170" fill="${DG.red}" font-size="24" font-weight="bold" text-anchor="middle">CASTLE &amp; MOAT</text>
<rect x="140" y="210" width="400" height="300" rx="14" fill="none" stroke="${DG.red}" stroke-width="3" stroke-dasharray="10 6"/>
<text x="340" y="250" fill="${DG.soft}" font-size="16" text-anchor="middle">hard perimeter firewall</text>
${box(180,290,150,80,"PC","trusted","#241a22",DG.red)}${box(360,290,150,80,"SERVER","trusted","#241a22",DG.red)}
${box(180,400,330,80,"HVAC vendor 😬","also trusted — oops","#241a22",DG.red)}
<text x="340" y="560" fill="${DG.soft}" font-size="16" text-anchor="middle">soft &amp; chewy inside — one breach roams freely</text>
<rect x="680" y="120" width="520" height="480" rx="18" fill="${DG.card}" stroke="${DG.ok}" stroke-width="2.5"/>
<text x="940" y="170" fill="${DG.ok}" font-size="24" font-weight="bold" text-anchor="middle">ZERO TRUST</text>
${box(740,220,190,80,"PC","verify ✓","#1a241e",DG.ok)}${box(970,220,190,80,"SERVER","verify ✓","#1a241e",DG.ok)}
${box(740,330,190,80,"VENDOR","verify ✓ scoped","#1a241e",DG.ok)}${box(970,330,190,80,"PHONE","verify ✓","#1a241e",DG.ok)}
<text x="940" y="470" fill="${DG.soft}" font-size="16" text-anchor="middle">every user + device verified, continuously</text>
<text x="940" y="500" fill="${DG.soft}" font-size="16" text-anchor="middle">location grants nothing · assume breach</text>
<text x="940" y="560" fill="${DG.txt}" font-size="17" font-weight="bold" text-anchor="middle">Target, Stuxnet &amp; Mirai are why</text>`)
});

if(typeof module!=='undefined')module.exports={DIAGRAMS,dgWrap};
