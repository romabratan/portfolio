/* ============================================================
   RAMAZAN TURGANBAYEV — PORTFOLIO SCRIPT
   Modular vanilla JS. Each section is self-contained.
   ============================================================ */
(function(){
  "use strict";

  /* ---------- LOADER ---------- */
  function initLoader(){
    const loader = document.getElementById('loader');
    const bar = document.getElementById('loaderProgress');
    const pct = document.getElementById('loaderPct');
    let p = 0;
    const t = setInterval(()=>{
      p += Math.random()*18;
      if(p >= 100){ p = 100; clearInterval(t); }
      bar.style.width = p + '%';
      pct.textContent = Math.floor(p) + '%';
      if(p === 100){
        setTimeout(()=>{ loader.classList.add('hide'); document.body.style.overflow=''; }, 300);
      }
    }, 140);
    document.body.style.overflow = 'hidden';
    window.addEventListener('load', ()=>{ /* noop, interval handles it */ });
  }

  /* ---------- CUSTOM CURSOR ---------- */
  function initCursor(){
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if(!dot || !ring || matchMedia('(hover:none)').matches) return;
    let rx=0, ry=0, mx=0, my=0;
    window.addEventListener('mousemove', e=>{
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx+'px'; dot.style.top = my+'px';
    });
    (function loop(){
      rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
      ring.style.left = rx+'px'; ring.style.top = ry+'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, input, .glass, [data-hoverable]').forEach(el=>{
      el.addEventListener('mouseenter', ()=> ring.classList.add('active'));
      el.addEventListener('mouseleave', ()=> ring.classList.remove('active'));
    });
  }

  /* ---------- SCROLL PROGRESS + HEADER ---------- */
  function initScrollChrome(){
    const bar = document.getElementById('scrollProgress');
    const header = document.getElementById('siteHeader');
    function onScroll(){
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
      if(bar) bar.style.width = scrolled + '%';
      if(header) header.classList.toggle('scrolled', h.scrollTop > 40);
    }
    document.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
  }

  /* ---------- MOBILE NAV ---------- */
  function initMobileNav(){
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('mainNav');
    if(!toggle) return;
    toggle.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded', false);
    }));
  }

  /* ---------- HERO PARTICLES (canvas) ---------- */
  function initParticles(){
    const canvas = document.getElementById('heroParticles');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let w,h,particles=[];
    function resize(){
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    function makeParticles(){
      const count = Math.min(70, Math.floor(w/22));
      particles = Array.from({length:count}, ()=>({
        x: Math.random()*w, y: Math.random()*h,
        r: Math.random()*1.6+0.4,
        vx: (Math.random()-0.5)*0.15, vy: (Math.random()-0.5)*0.15,
        o: Math.random()*0.5+0.15
      }));
    }
    function tick(){
      ctx.clearRect(0,0,w,h);
      particles.forEach(p=>{
        p.x += p.vx; p.y += p.vy;
        if(p.x<0) p.x=w; if(p.x>w) p.x=0;
        if(p.y<0) p.y=h; if(p.y>h) p.y=0;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(212,175,55,${p.o})`;
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }
    resize(); makeParticles(); tick();
    window.addEventListener('resize', ()=>{ resize(); makeParticles(); });
  }

  /* ---------- HERO SPOTLIGHT (mouse follow) ---------- */
  function initSpotlight(){
    const hero = document.getElementById('hero');
    const spot = document.getElementById('heroSpotlight');
    if(!hero || !spot) return;
    hero.addEventListener('mousemove', e=>{
      const rect = hero.getBoundingClientRect();
      spot.style.left = (e.clientX - rect.left) + 'px';
      spot.style.top = (e.clientY - rect.top) + 'px';
    });
  }

  /* ---------- TYPING EFFECT ---------- */
  function initTyping(){
    const el = document.getElementById('typedRole');
    if(!el) return;
    const roles = ['Informatics Teacher', 'Web Developer', 'AI Enthusiast'];
    let ri=0, ci=0, deleting=false;
    function step(){
      const word = roles[ri];
      if(!deleting){
        ci++;
        el.textContent = word.slice(0,ci);
        if(ci === word.length){ deleting=true; setTimeout(step, 1600); return; }
      } else {
        ci--;
        el.textContent = word.slice(0,ci);
        if(ci === 0){ deleting=false; ri = (ri+1)%roles.length; }
      }
      setTimeout(step, deleting ? 40 : 90);
    }
    step();
  }

  /* ---------- MAGNETIC BUTTONS ---------- */
  function initMagnetic(){
    document.querySelectorAll('.magnetic').forEach(btn=>{
      btn.addEventListener('mousemove', e=>{
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2;
        const y = e.clientY - r.top - r.height/2;
        btn.style.transform = `translate(${x*0.18}px, ${y*0.35}px)`;
      });
      btn.addEventListener('mouseleave', ()=> btn.style.transform = '');
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  function initReveal(){
    const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){ en.target.classList.add('in-view'); io.unobserve(en.target); }
      });
    }, { threshold:0.15 });
    els.forEach(el=> io.observe(el));
  }

  /* ---------- SKILL BARS ---------- */
  function initSkillBars(){
    const rows = document.querySelectorAll('.skill-row');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          const fill = en.target.querySelector('.skill-fill');
          fill.style.width = en.target.dataset.level + '%';
          io.unobserve(en.target);
        }
      });
    }, { threshold:0.4 });
    rows.forEach(r=> io.observe(r));
  }

  /* ---------- COUNTERS ---------- */
  function initCounters(){
    const nums = document.querySelectorAll('.stat-num');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          const el = en.target;
          const target = parseInt(el.dataset.count, 10);
          let cur = 0;
          const dur = 1400;
          const start = performance.now();
          function frame(now){
            const t = Math.min(1, (now-start)/dur);
            const eased = 1 - Math.pow(1-t, 3);
            cur = Math.floor(eased*target);
            el.textContent = cur;
            if(t < 1) requestAnimationFrame(frame); else el.textContent = target;
          }
          requestAnimationFrame(frame);
          io.unobserve(el);
        }
      });
    }, { threshold:0.5 });
    nums.forEach(n=> io.observe(n));
  }

  /* ============================================================
     DATA — projects, certificates, gallery
     ============================================================ */
  const PROJECTS = [
    { id:'p1', cat:'education', title:'EasyChemLearn LMS', img:'assets/projects/easychemlearn.jpg',
      short:'A learning management system for chemistry students with lessons, quizzes and progress tracking.',
      stack:['PHP','MySQL','JavaScript','HTML/CSS'],
      features:['Interactive lesson builder','Auto-graded quizzes','Student progress dashboard','Teacher content editor'],
      challenge:'Chemistry teachers had no simple way to publish interactive lessons without technical help.',
      solution:'Built a lightweight CMS-style editor so any teacher can assemble lessons and quizzes without touching code.',
      results:'Adopted for two class sections; cut lesson-prep time significantly and centralised grading.',
      github:'#', demo:'#' },
    { id:'p2', cat:'web', title:'Wedding Invitation Website', img:'assets/projects/wedding.jpg',
      short:'An elegant, animated digital invitation with RSVP form, countdown and event details.',
      stack:['HTML','CSS','JavaScript'],
      features:['Animated countdown timer','RSVP form','Photo gallery','Map & directions embed'],
      challenge:'Client wanted a paper-invitation feel translated to a fast, mobile-first web experience.',
      solution:'Used scroll-triggered reveals and a soft, custom type system to mirror print invitation design.',
      results:'Over 300 guests RSVP\'d through the site with zero support requests.',
      github:'#', demo:'#' },
    { id:'p3', cat:'web', title:'AI Resume Builder', img:'assets/projects/resume-builder.jpg',
      short:'A guided resume builder that uses AI suggestions to tighten wording and formatting.',
      stack:['JavaScript','HTML/CSS','AI API'],
      features:['Live preview','AI phrasing suggestions','Multiple export templates','PDF export'],
      challenge:'Students needed help writing resumes but had no access to career-counselling tools.',
      solution:'Combined a simple structured form with AI-assisted rewriting suggestions students can accept or edit.',
      results:'Used by graduating students to produce their first professional resumes.',
      github:'#', demo:'#' },
    { id:'p4', cat:'robotics', title:'Arduino Color Sorting Robot', img:'assets/projects/color-sorter.jpg',
      short:'A sensor-driven robotic arm that detects and sorts objects by colour in real time.',
      stack:['Arduino','C++','Sensors'],
      features:['Colour sensor detection','Servo-driven sorting arm','Real-time serial monitor logging'],
      challenge:'Wanted a hands-on way to teach students sensors, logic and hardware control together.',
      solution:'Built a working prototype using a colour sensor, servos and conditional logic in Arduino C++.',
      results:'Used as a live classroom demo of hardware + code integration; sparked several student robotics projects.',
      github:'#', demo:'#' },
    { id:'p5', cat:'ai', title:'AI Classroom Assistant', img:'assets/projects/ai-assistant.jpg',
      short:'A lightweight AI chat tool that helps students get unstuck on programming exercises.',
      stack:['JavaScript','AI API','HTML/CSS'],
      features:['Context-aware hints','Code explanation mode','Usage-friendly guardrails for students'],
      challenge:'Students needed help outside class hours without simply getting answers handed to them.',
      solution:'Designed prompts that nudge toward hints and explanations rather than direct solutions.',
      results:'Reduced repetitive after-hours questions and improved independent problem solving.',
      github:'#', demo:'#' },
    { id:'p6', cat:'education', title:'Student Management System', img:'assets/projects/student-mgmt.jpg',
      short:'A internal tool for tracking attendance, grades and behaviour notes per student.',
      stack:['PHP','MySQL','JavaScript'],
      features:['Attendance tracking','Grade book','Exportable reports','Role-based access'],
      challenge:'Manual spreadsheets were error-prone and hard to share across staff.',
      solution:'Centralised student records into one searchable, permissioned system.',
      results:'Adopted by the Informatics department to replace spreadsheet-based tracking.',
      github:'#', demo:'#' },
    { id:'p7', cat:'education', title:'Teacher Dashboard', img:'assets/projects/teacher-dashboard.jpg',
      short:'A single dashboard summarising class performance, upcoming deadlines and quiz results.',
      stack:['JavaScript','Chart.js','HTML/CSS'],
      features:['Visual grade breakdowns','Deadline calendar','Class performance trends'],
      challenge:'Data lived in too many places for teachers to get a quick class overview.',
      solution:'Pulled key metrics into one glanceable dashboard with visual charts.',
      results:'Cut weekly reporting time and made performance trends easier to spot early.',
      github:'#', demo:'#' },
    { id:'p8', cat:'web', title:'Weather Application', img:'assets/projects/weather-app.jpg',
      short:'A clean weather app with live conditions, forecasts and location search.',
      stack:['JavaScript','Weather API','HTML/CSS'],
      features:['5-day forecast','Geolocation support','Unit switching','Animated conditions'],
      challenge:'Wanted a fast, ad-free weather lookup with a nicer interface than typical apps.',
      solution:'Built a minimal single-page app pulling from a public weather API with cached lookups.',
      results:'Personal daily-use tool, later shared with classmates as a JS learning reference.',
      github:'#', demo:'#' },
    { id:'p9', cat:'web', title:'QR Code Generator', img:'assets/projects/qr-generator.jpg',
      short:'A simple tool to generate and download styled QR codes for links, text and Wi-Fi.',
      stack:['JavaScript','HTML/CSS'],
      features:['Custom colours','Logo embedding','Bulk generation','SVG & PNG export'],
      challenge:'Needed printable QR codes for classroom handouts and event materials.',
      solution:'Built a small client-side generator with export options, no server required.',
      results:'Used repeatedly for school events and handouts.',
      github:'#', demo:'#' },
    { id:'p10', cat:'web', title:'Graduation Gallery Site', img:'assets/projects/graduation-gallery.jpg',
      short:'A photo gallery microsite built for a graduating class with categories and lightbox viewing.',
      stack:['HTML','CSS','JavaScript'],
      features:['Masonry layout','Lightbox viewer','Category filters','Lazy-loaded images'],
      challenge:'Students wanted a shared, nicely presented home for graduation photos.',
      solution:'Built a fast static gallery site with filtering and a smooth lightbox experience.',
      results:'Shared across the graduating class as the go-to photo archive.',
      github:'#', demo:'#' },
    { id:'p11', cat:'web', title:'Responsive Landing Pages', img:'assets/projects/landing-pages.jpg',
      short:'A set of freelance landing pages for small local businesses, fully responsive.',
      stack:['HTML','CSS','JavaScript'],
      features:['Mobile-first layout','Contact form integration','SEO basics','Fast load times'],
      challenge:'Local businesses needed an affordable, professional web presence quickly.',
      solution:'Developed a reusable, customisable landing page framework to speed up delivery.',
      results:'Delivered multiple client sites with quick turnaround and no ongoing costs.',
      github:'#', demo:'#' },
    { id:'p12', cat:'web', title:'This Portfolio', img:'assets/projects/portfolio.jpg',
      short:'The site you\'re looking at right now — built from scratch in HTML, CSS and JavaScript.',
      stack:['HTML','CSS','JavaScript'],
      features:['Custom cursor & spotlight','Scroll-driven animation system','Modular project & gallery data'],
      challenge:'Wanted a portfolio that felt premium without relying on any framework.',
      solution:'Hand-built every animation and layout system in vanilla HTML/CSS/JS.',
      results:'You\'re looking at the result.',
      github:'#', demo:'#' }
  ];

  const CERTIFICATES = [
    { title:'Foundations of Web Development', issuer:'Online Certification', img:'assets/certificates/cert-web.jpg' },
    { title:'Python for Everybody', issuer:'Online Certification', img:'assets/certificates/cert-python.jpg' },
    { title:'AI Tools for Educators', issuer:'Professional Development', img:'assets/certificates/cert-ai.jpg' },
    { title:'Arduino & Embedded Systems', issuer:'Robotics Workshop', img:'assets/certificates/cert-arduino.jpg' },
    { title:'UI/UX Design Fundamentals', issuer:'Online Certification', img:'assets/certificates/cert-uiux.jpg' },
    { title:'Advanced Teaching Methodology', issuer:'Ministry of Education', img:'assets/certificates/cert-teaching.jpg' }
  ];

  const GALLERY = [
    { cat:'teaching', img:'assets/gallery/teaching-1.jpg', h:1.3 },
    { cat:'wrestling', img:'assets/gallery/wrestling-1.jpg', h:1.0 },
    { cat:'dev', img:'assets/gallery/dev-1.jpg', h:1.5 },
    { cat:'events', img:'assets/gallery/events-1.jpg', h:1.1 },
    { cat:'teaching', img:'assets/gallery/teaching-2.jpg', h:1.0 },
    { cat:'wrestling', img:'assets/gallery/wrestling-2.jpg', h:1.4 },
    { cat:'dev', img:'assets/gallery/dev-2.jpg', h:1.2 },
    { cat:'events', img:'assets/gallery/events-2.jpg', h:1.3 },
    { cat:'teaching', img:'assets/gallery/teaching-3.jpg', h:1.15 },
    { cat:'wrestling', img:'assets/gallery/wrestling-3.jpg', h:1.35 }
  ];

  /* ---------- RENDER PROJECTS ---------- */
  function renderProjects(){
    const grid = document.getElementById('projectsGrid');
    if(!grid) return;
    grid.innerHTML = PROJECTS.map(p => `
      <article class="project-card glass" data-cat="${p.cat}" data-id="${p.id}" data-hoverable>
        <div class="project-thumb img-fallback">
          <span class="project-cat">${labelFor(p.cat)}</span>
          <img src="${p.img}" alt="${p.title}" loading="lazy" onerror="this.remove()">
        </div>
        <div class="project-info">
          <h3>${p.title}</h3>
          <p>${p.short}</p>
          <div class="project-stack">${p.stack.map(s=>`<span>${s}</span>`).join('')}</div>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('.project-card').forEach(card=>{
      card.addEventListener('click', ()=> openProjectModal(card.dataset.id));
    });
  }
  function labelFor(cat){
    return { web:'Web', ai:'AI Tools', education:'Education', robotics:'Robotics' }[cat] || cat;
  }

  function openProjectModal(id){
    const p = PROJECTS.find(x=>x.id===id);
    if(!p) return;
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('modalBody');
    body.innerHTML = `
      <div class="modal-gallery">
        <div class="img-fallback"></div>
        <div class="img-fallback"></div>
        <div class="img-fallback"></div>
      </div>
      <p class="modal-cat">${labelFor(p.cat)}</p>
      <h2>${p.title}</h2>
      <div class="modal-section"><h4>Overview</h4><p>${p.short}</p></div>
      <div class="modal-section"><h4>Technology</h4><div class="project-stack">${p.stack.map(s=>`<span>${s}</span>`).join('')}</div></div>
      <div class="modal-section"><h4>Features</h4><ul class="modal-features">${p.features.map(f=>`<li>${f}</li>`).join('')}</ul></div>
      <div class="modal-section"><h4>Challenge</h4><p>${p.challenge}</p></div>
      <div class="modal-section"><h4>Solution</h4><p>${p.solution}</p></div>
      <div class="modal-section"><h4>Results</h4><p>${p.results}</p></div>
      <div class="modal-actions">
        <a href="${p.github}" class="btn btn-outline btn-sm" target="_blank" rel="noopener">GitHub</a>
        <a href="${p.demo}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">Live Demo</a>
      </div>
    `;
    openOverlay(modal);
  }

  /* ---------- PROJECT FILTER + SEARCH ---------- */
  function initProjectControls(){
    const filters = document.getElementById('projectFilters');
    const search = document.getElementById('projectSearch');
    if(!filters) return;
    let activeFilter = 'all';

    function apply(){
      const q = (search.value || '').toLowerCase().trim();
      document.querySelectorAll('#projectsGrid .project-card').forEach(card=>{
        const cat = card.dataset.cat;
        const text = card.textContent.toLowerCase();
        const matchCat = activeFilter === 'all' || cat === activeFilter;
        const matchQ = !q || text.includes(q);
        card.classList.toggle('hidden-card', !(matchCat && matchQ));
      });
    }

    filters.addEventListener('click', e=>{
      const btn = e.target.closest('.filter-btn');
      if(!btn) return;
      filters.querySelectorAll('.filter-btn').forEach(b=> b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      apply();
    });
    search.addEventListener('input', apply);
  }

  /* ---------- CERTIFICATES ---------- */
  function renderCertificates(){
    const grid = document.getElementById('certGrid');
    if(!grid) return;
    grid.innerHTML = CERTIFICATES.map((c,i)=>`
      <div class="cert-card glass" data-hoverable data-idx="${i}">
        <div class="cert-thumb img-fallback">
          <img src="${c.img}" alt="${c.title}" loading="lazy" onerror="this.remove()">
          <div class="cert-overlay">View Fullscreen</div>
        </div>
        <div class="cert-label">${c.title}<br><small style="color:var(--gray);opacity:.7">${c.issuer}</small></div>
      </div>
    `).join('');

    grid.querySelectorAll('.cert-card').forEach(card=>{
      card.addEventListener('click', ()=>{
        const c = CERTIFICATES[card.dataset.idx];
        const lb = document.getElementById('certLightbox');
        document.getElementById('certLightboxImg').src = c.img;
        document.getElementById('certLightboxImg').alt = c.title;
        openOverlay(lb);
      });
    });
  }

  /* ---------- GALLERY / MASONRY / LIGHTBOX ---------- */
  let galleryFiltered = GALLERY.slice();
  let galleryIndex = 0;

  function renderGallery(filter){
    const grid = document.getElementById('masonryGrid');
    if(!grid) return;
    galleryFiltered = filter==='all' ? GALLERY.slice() : GALLERY.filter(g=>g.cat===filter);
    grid.innerHTML = galleryFiltered.map((g,i)=>`
      <div class="masonry-item img-fallback" data-idx="${i}" data-hoverable style="aspect-ratio:${1/g.h}">
        <img src="${g.img}" alt="${g.cat} photo" loading="lazy" onerror="this.remove()">
      </div>
    `).join('');
    grid.querySelectorAll('.masonry-item').forEach(item=>{
      item.addEventListener('click', ()=> openGalleryLightbox(parseInt(item.dataset.idx,10)));
    });
  }

  function openGalleryLightbox(idx){
    galleryIndex = idx;
    updateGalleryLightbox();
    openOverlay(document.getElementById('galleryLightbox'));
  }
  function updateGalleryLightbox(){
    const g = galleryFiltered[galleryIndex];
    const img = document.getElementById('galleryLightboxImg');
    img.src = g.img; img.alt = g.cat + ' photo';
    document.getElementById('lightboxDownload').href = g.img;
  }
  function initGalleryFilters(){
    const filters = document.getElementById('galleryFilters');
    if(!filters) return;
    filters.addEventListener('click', e=>{
      const btn = e.target.closest('.filter-btn');
      if(!btn) return;
      filters.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.dataset.gfilter);
    });
    document.getElementById('lightboxPrev').addEventListener('click', ()=>{
      galleryIndex = (galleryIndex - 1 + galleryFiltered.length) % galleryFiltered.length;
      updateGalleryLightbox();
    });
    document.getElementById('lightboxNext').addEventListener('click', ()=>{
      galleryIndex = (galleryIndex + 1) % galleryFiltered.length;
      updateGalleryLightbox();
    });
  }

  /* ---------- OVERLAY (modal/lightbox) HELPERS ---------- */
  function openOverlay(el){
    el.classList.add('open'); el.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeOverlay(el){
    el.classList.remove('open'); el.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  function initOverlayClosers(){
    document.querySelectorAll('.modal, .lightbox').forEach(overlay=>{
      overlay.querySelectorAll('[data-close]').forEach(btn=>{
        btn.addEventListener('click', ()=> closeOverlay(overlay));
      });
    });
    document.addEventListener('keydown', e=>{
      if(e.key === 'Escape'){
        document.querySelectorAll('.modal.open, .lightbox.open').forEach(closeOverlay);
      }
      const galleryLb = document.getElementById('galleryLightbox');
      if(galleryLb.classList.contains('open')){
        if(e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
        if(e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
      }
    });
  }

  /* ---------- TESTIMONIAL SLIDER ---------- */
  function initTestimonials(){
    const track = document.getElementById('testiTrack');
    const dotsWrap = document.getElementById('testiDots');
    if(!track) return;
    const slides = track.children.length;
    dotsWrap.innerHTML = Array.from({length:slides}).map((_,i)=>`<button class="testi-dot${i===0?' active':''}" data-i="${i}" aria-label="Go to testimonial ${i+1}"></button>`).join('');
    let idx = 0, timer;
    function go(i){
      idx = (i+slides)%slides;
      track.style.transform = `translateX(-${idx*100}%)`;
      dotsWrap.querySelectorAll('.testi-dot').forEach((d,j)=> d.classList.toggle('active', j===idx));
    }
    dotsWrap.addEventListener('click', e=>{
      const btn = e.target.closest('.testi-dot');
      if(!btn) return;
      go(parseInt(btn.dataset.i,10));
      resetAutoplay();
    });
    function resetAutoplay(){
      clearInterval(timer);
      timer = setInterval(()=> go(idx+1), 6000);
    }
    resetAutoplay();
  }

  /* ---------- CONTACT COPY BUTTONS ---------- */
  function initCopyButtons(){
    document.querySelectorAll('.copy-btn[data-copy]').forEach(btn=>{
      btn.addEventListener('click', async (e)=>{
        e.preventDefault(); e.stopPropagation();
        const val = btn.dataset.copy;
        try{
          await navigator.clipboard.writeText(val);
        }catch(err){ /* clipboard unavailable — fail silently */ }
        const original = btn.textContent;
        btn.textContent = 'Copied!'; btn.classList.add('copied');
        setTimeout(()=>{ btn.textContent = original; btn.classList.remove('copied'); }, 1800);
      });
    });
  }

  /* ---------- BACK TO TOP ---------- */
  function initBackToTop(){
    const btn = document.getElementById('backToTop');
    if(!btn) return;
    btn.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));
  }

  /* ---------- LOCAL TIME ---------- */
  function initLocalTime(){
    const el = document.getElementById('localTime');
    if(!el) return;
    function tick(){
      const now = new Date();
      el.textContent = now.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
    }
    tick(); setInterval(tick, 30000);
  }

  /* ---------- SOUND TOGGLE (UI only — no audio asset bundled) ---------- */
  function initSoundToggle(){
    const btn = document.getElementById('soundToggle');
    if(!btn) return;
    btn.addEventListener('click', ()=>{
      const on = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!on));
    });
  }

  /* ---------- LANGUAGE SWITCHER (partial dictionary) ---------- */
  const I18N = {
    en: {
      'nav.about':'About','nav.skills':'Skills','nav.experience':'Experience','nav.projects':'Projects',
      'nav.sports':'Sports','nav.gallery':'Gallery','nav.contact':'Contact','nav.cv':'Download CV',
      'hero.cv':'Download CV','hero.portfolio':'View Portfolio','hero.contact':'Contact Me →','hero.scroll':'Scroll',
      'hero.desc':'Passionate Informatics Teacher specializing in modern education, software engineering, artificial intelligence, web development and educational technologies. I build elegant digital experiences, AI‑powered tools and automation for the classroom and beyond.'
    },
    ru: {
      'nav.about':'Обо мне','nav.skills':'Навыки','nav.experience':'Опыт','nav.projects':'Проекты',
      'nav.sports':'Спорт','nav.gallery':'Галерея','nav.contact':'Контакты','nav.cv':'Скачать резюме',
      'hero.cv':'Скачать резюме','hero.portfolio':'Смотреть портфолио','hero.contact':'Связаться →','hero.scroll':'Листайте',
      'hero.desc':'Увлечённый учитель информатики, специализирующийся на современном образовании, разработке ПО, искусственном интеллекте и образовательных технологиях.'
    },
    kk: {
      'nav.about':'Мен туралы','nav.skills':'Дағдылар','nav.experience':'Тәжірибе','nav.projects':'Жобалар',
      'nav.sports':'Спорт','nav.gallery':'Галерея','nav.contact':'Байланыс','nav.cv':'Түйіндемені жүктеу',
      'hero.cv':'Түйіндемені жүктеу','hero.portfolio':'Портфолионы көру','hero.contact':'Хабарласу →','hero.scroll':'Айналдыру',
      'hero.desc':'Заманауи білім беру, бағдарламалық жасақтама, жасанды интеллект және білім беру технологияларына маманданған информатика мұғалімі.'
    }
  };
  function initLangSwitch(){
    const wrap = document.getElementById('langSwitch');
    if(!wrap) return;
    wrap.addEventListener('click', e=>{
      const btn = e.target.closest('.lang-btn');
      if(!btn) return;
      wrap.querySelectorAll('.lang-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.dataset.lang;
      const dict = I18N[lang] || I18N.en;
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const key = el.dataset.i18n;
        if(dict[key]) el.textContent = dict[key];
      });
      document.documentElement.lang = lang;
    });
  }

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', ()=>{
    initLoader();
    initCursor();
    initScrollChrome();
    initMobileNav();
    initParticles();
    initSpotlight();
    initTyping();
    initMagnetic();
    initReveal();
    initSkillBars();
    initCounters();
    renderProjects();
    initProjectControls();
    renderCertificates();
    renderGallery('all');
    initGalleryFilters();
    initOverlayClosers();
    initTestimonials();
    initCopyButtons();
    initBackToTop();
    initLocalTime();
    initSoundToggle();
    initLangSwitch();
  });

})();
