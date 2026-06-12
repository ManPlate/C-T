SUPPORT-TO-TECH — CLASSROOM EDITION
====================================
Two formats, ONE content source (slides-data.js). Edit a story or fact
there once, and regenerate both formats so they never drift.

A) classroom.html + slides-data.js  — the interactive big-screen deck
   Keep both files in the same folder. Open classroom.html in any browser
   (works offline — no hosting needed, unlike the academy app).
   Controls:  → / space / click = advance (story lines reveal one by one)
              ← back · G session grid · N presenter notes · F fullscreen
   Live demos built in: binary builder (S1), password crack-timer (S8),
   ports game (S14), OSI packet animation (S29), subnet calculator (S31).

B) classroom-phase1/2/3 .pptx — the PowerPoint edition
   Same sessions, same arc (story → question → explainers → comparison →
   wow + handoff), fully editable. Presenter notes are on every slide —
   the title slide of each session carries your coaching notes.

EVERY SESSION FOLLOWS THE SAME 5-BEAT ARC:
  1. TRUE STORY (reveal slowly)   2. BIG QUESTION (let them argue 2 min)
  3. EXPLAINERS (you are the muscle, slides are the skeleton)
  4. COMPARISON + WOW FACT        5. HANDOFF to the lab

REGENERATING THE PPTX after editing slides-data.js:
  node make-pptx.js   (requires: npm i -g pptxgenjs && npm i sharp)

DETAIL LAYER (v2)
- Story slides now end with a small-print FACTS row (dates, numbers,
  the details that make you credible under questioning).
- 7 labeled component/network diagrams appear in BOTH formats
  (PC internals, home network, storage ladder, ports, OSI stack, VLANs).
- 10 live simulations in the HTML deck: binary, password cracking,
  ports game, OSI packet, subnetting, laser printing steps, broadcast
  storm, NAT table, Wi-Fi channel overlap, DHCP DORA.
- Video slides: Session 12 ships with PowerCert's SSD-vs-HDD animation
  embedded (plays in place when online). To add more, paste the
  11-character YouTube ID into the EXTRA map in slides-data.js
  (vid:"XXXXXXXXXXX") and rerun node make-pptx.js. PowerPoint slides
  show the link; use Insert > Video > Online Video to embed there.
- Real photos: for component close-ups, photograph YOUR actual lab
  hardware — legally clean, and trainees see the exact machines
  they'll touch. Drop photos into PPT or ask Claude to wire an
  images folder into the HTML deck.

MEDIA LAYER (v3)
- 17 diagram slides across both formats, including six EVOLUTION strips:
  RAM chips (core memory → SIMM → DDR5), storage (RAMAC → microSD),
  CPUs (4004 → NPUs), operating systems, connectors (VGA → USB-C),
  and Wi-Fi generations — plus malware family tree, IaaS/PaaS/SaaS
  stack, the boot-repair ladder, the TCP/DNS handshake sequence,
  and castle-vs-zero-trust.
- 10 sessions now ship with embedded videos (PowerCert + TechTerms
  animations, IDs verified via search). Play each once before class.
  A SPARE VERIFIED IDs list sits in slides-data.js for adding more —
  paste an ID into any session's vid field and rerun node make-pptx.js.

ADD YOUR OWN PHOTOS & VIDEOS (v4 — in the HTML deck)
A pink "✎ ADD MEDIA TO THIS SESSION" button sits top-right on every slide:
- 📷 Upload photo — pick any image; it's auto-resized and saved in this
  browser. New slide appears in the current session with your caption.
- 🔗 Image URL — paste a hosted image link (Wikimedia Commons images are
  freely licensed: search e.g. "DDR4 SDRAM module", "Intel 4004",
  "IBM RAMAC 350", "ATX motherboard labeled").
- ▶ YouTube link — paste any video URL; it becomes an embedded slide.
Best practice for REAL component shots: photograph your own retired lab
hardware — legally clean and it's the exact gear trainees will touch.
EXPORT/IMPORT MEDIA PACK moves your curated photos/videos between
machines or to co-trainers (media otherwise lives per-browser).
PowerPoint users: just Insert > Pictures natively in the .pptx files.
