/* ============================================================
   MUHAMMAD MUDASSIR SHAHBAZ — PORTFOLIO SCRIPT
   Three.js 3D WebGL · GSAP ScrollTrigger · Pinned Hero Transition
   Horizontal Work Scroll · Generative Art · Case Studies
   ============================================================ */

(function () {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mob = () => window.innerWidth < 900;

  /* ============================
     1. DYNAMIC HEADINGS
     ============================ */
  $$('h2[data-l]').forEach((h) => {
    const lines = h.dataset.l.split('|');
    const accentIndex = +(h.dataset.ac ?? 99);
    h.setAttribute('aria-label', lines.join(' '));
    h.innerHTML = lines
      .map(
        (l, i) =>
          `<span class="w" aria-hidden="true"><span class="${
            i >= accentIndex ? 'ac' : ''
          }">${l}</span></span>`
      )
      .join('');
  });

  /* ============================
     2. GENERATIVE VECTOR ART
     ============================ */
  const rnd = ((s) => () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296)(7);

  const ART = {
    peace: () =>
      `<svg viewBox="0 0 400 400" fill="none" stroke="currentColor" stroke-width="2" role="img" aria-label="Illustration: a peace symbol over ripples"><g class="spin sp">${[
        190,
        160,
        130
      ]
        .map(
          (r, i) =>
            `<circle cx="200" cy="200" r="${r}" stroke-dasharray="${2 + i * 7} ${
              9 + i * 5
            }" opacity=".55"/>`
        )
        .join('')}</g><g stroke="var(--acc)" stroke-width="6" stroke-linecap="round"><circle cx="200" cy="200" r="98"/><path d="M200 102v196M200 200l-69 69M200 200l69 69"/></g></svg>`,

    school: () =>
      `<svg viewBox="0 0 400 400" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" role="img" aria-label="Illustration: a school building"><circle cx="200" cy="58" r="26" fill="var(--acc)" stroke="none"/><path class="sp" d="M50 190 200 100 350 190Z"/>${[
        0, 1, 2, 3, 4
      ]
        .map((i) => `<rect x="${78 + i * 55}" y="200" width="22" height="110"/>`)
        .join('')}<path d="M50 310h300M36 330h328M22 350h356"/><path d="M190 140h20" stroke="var(--acc)" stroke-width="5"/></svg>`,

    qr: () => {
      let c = '';
      for (let y = 0; y < 17; y++) {
        for (let x = 0; x < 17; x++) {
          const f =
            (x < 5 && y < 5) || (x > 11 && y < 5) || (x < 5 && y > 11);
          if (!f && rnd() > 0.52)
            c += `<rect x="${47 + x * 18}" y="${
              47 + y * 18
            }" width="15" height="15" fill="currentColor" stroke="none"/>`;
        }
      }
      const fd = (x, y) =>
        `<rect x="${47 + x * 18}" y="${
          47 + y * 18
        }" width="87" height="87" stroke-width="6"/><rect x="${
          47 + x * 18 + 24
        }" y="${47 + y * 18 + 24}" width="39" height="39" fill="var(--acc)" stroke="none"/>`;
      return `<svg viewBox="0 0 400 400" fill="none" stroke="currentColor" role="img" aria-label="Illustration: a QR-style grid with a scan line">${c}${fd(
        0,
        0
      )}${fd(12, 0)}${fd(0, 12)}<rect class="scan" x="30" y="44" width="340" height="5" fill="var(--acc)" stroke="none"/></svg>`;
    },

    wheat: () => {
      let l = '';
      for (let i = 0; i < 7; i++) {
        const y = 340 - i * 30;
        l += `<path d="M200 ${y}q-46 -4 -64 -40M200 ${y - 14}q46 -4 64 -40"/>`;
      }
      return `<svg viewBox="0 0 400 400" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" role="img" aria-label="Illustration: a sun over a wheat stalk"><g class="spin sp">${Array.from(
        { length: 20 },
        (_, i) => {
          const a = (i * Math.PI) / 10;
          return `<path d="M${200 + Math.cos(a) * 84} ${
            120 + Math.sin(a) * 84
          }L${200 + Math.cos(a) * 118} ${
            120 + Math.sin(a) * 118
          }" stroke="var(--acc)" stroke-width="5"/>`;
        }
      ).join('')}</g><circle cx="200" cy="120" r="56" fill="var(--acc)" stroke="none"/><path d="M200 392V190"/>${l}</svg>`;
    },

    dairy: () =>
      `<svg viewBox="0 0 400 400" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Illustration: dairy management system"><g class="spin sp"><circle cx="200" cy="200" r="160" stroke-dasharray="8 12" opacity=".4"/><circle cx="200" cy="200" r="130" stroke-dasharray="4 8" opacity=".3"/></g><path d="M170 80h60M185 80v80l-65 140c-10 20 4 40 26 40h108c22 0 36-20 26-40l-65-140V80" stroke-width="4"/><path d="M142 270q58 20 116 0" stroke="var(--acc)" stroke-width="4"/><circle cx="200" cy="285" r="12" fill="var(--acc)" stroke="none"/></svg>`
  };

  $$('[data-art]').forEach((f) => {
    if (ART[f.dataset.art]) {
      f.innerHTML =
        ART[f.dataset.art]() +
        '<figcaption class="l mute">Illustration</figcaption>';
    }
  });

  $$('.sp').forEach((e) =>
    e.setAttribute('style', 'transform-box:view-box;transform-origin:200px 200px')
  );

  /* ============================
     3. CASE STUDIES DATA & DIALOG
     ============================ */
  const P = [
    {
      n: '01',
      t: 'Peace In War Clothing',
      c: 'E-commerce / Web development',
      p: 'A clothing label needs an online store where the product leads and ordering is straightforward.',
      a: 'Build on WordPress and WooCommerce, organised around five clothing categories.',
      b: 'A live store with category and product pages, cart, wishlist, compare, customer accounts, a blog and a currency selector (USD, EUR, JPY).',
      s: 'WordPress · WooCommerce · SEO',
      link: 'https://peaceinwarclothing.com/'
    },
    {
      n: '02',
      t: 'Allied School Management System',
      c: 'Custom web platform / Education',
      p: 'A school’s fees, attendance, staff records and announcements tend to live in separate places.',
      a: 'One admin portal, with separate portals for students, parents and teachers.',
      b: 'An admin dashboard with fee collection tracking and challans, student and teacher records, attendance, academics, announcements, promotion and settings. Also: student, parent and teacher portals, result cards, fee vouchers and Wi-Fi-based attendance.',
      s: 'Custom web application · Vercel'
    },
    {
      n: '03',
      t: 'Kah-Nur Attendance System',
      c: 'Operational system / Attendance',
      p: 'Staff and student attendance has to be recorded reliably, with leave and holidays accounted for.',
      a: 'One admin system tying QR check-in and biometric machines to attendance records and reports.',
      b: 'An admin dashboard with teacher and student attendance, gates, camera settings, reports, holidays and leave management. QR attendance, teacher check-in/out, PDF and Excel reports, and integration with four biometric machines.',
      s: 'React · Tailwind CSS · Supabase'
    },
    {
      n: '04',
      t: 'Golden Harvest Foundation',
      c: 'Website / Foundation',
      p: 'A foundation needs a site that explains its mission and makes giving and volunteering easy.',
      a: 'A modern React front end with clear routes to donate, volunteer and get in touch.',
      b: 'A website with Home, About Us, Impact Projects, Events & Gallery, Volunteer and Contact sections, plus Donate Now and Ways to Give actions.',
      s: 'React 19 · Vite · TypeScript · Tailwind CSS'
    },
    {
      n: '05',
      t: 'Milk Pricing & Management System',
      c: 'Custom business ERP / Dairy Industry',
      p: 'Dairy collection stations required accurate, dispute-free daily milk purchase pricing based on shifting Fat and SNF percentages, alongside manual farmer ledgers.',
      a: 'Developed purpose-built pricing and billing software tailored to daily dairy collection shifts.',
      b: 'Automated pricing formula engine, daily morning/evening collection logs, individual farmer credit/debit ledgers, automated receipt generation, and weekly payment settlement reconciliations.',
      s: 'Python · React · Local/Cloud Database'
    }
  ];

  const dlg = $('#dlg');
  const dc = $('#dc');

  document.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-i]');
    if (!b) return;
    const p = P[b.dataset.i];
    if (!p) return;

    dc.innerHTML = `
      <p class="l mute">${p.n} — ${p.c}</p>
      <h3 id="dt">${p.t}</h3>
      <h4 class="l">The problem</h4>
      <p>${p.p}</p>
      <h4 class="l">The approach</h4>
      <p>${p.a}</p>
      <h4 class="l">What I built</h4>
      <p>${p.b}</p>
      <h4 class="l">Technology</h4>
      <p>${p.s}</p>
      ${
        p.link
          ? `<p style="margin-top:20px"><a class="lk" href="${p.link}" target="_blank" rel="noopener">Visit live site ↗</a></p>`
          : ''
      }
    `;
    dlg.showModal();
  });

  const cl = $('#cl');
  if (cl) cl.onclick = () => dlg.close();
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) dlg.close();
  });

  /* ============================
     4. SERVICES ACCORDION
     ============================ */
  const S = [
    ['Web development', 'Fast, responsive sites built around your content.'],
    ['E-commerce', 'Online stores where the product leads and checkout is simple.'],
    ['Custom business systems', 'Software shaped to how your business actually runs.'],
    ['Automation', 'Replace repeated manual work with systems that do it.'],
    ['School management', 'Fees, attendance, staff and parent communication in one place.'],
    ['Attendance systems', 'QR and biometric check-in with leave, holidays and reports.'],
    ['AI chatbots', 'Assistants that handle routine questions on your site.'],
    ['WhatsApp Business API', 'Customer messaging built on the official API. A service I offer.']
  ];

  const svcContainer = $('#svc');
  if (svcContainer) {
    svcContainer.innerHTML = S.map(
      (s) => `<details><summary>${s[0]}<span aria-hidden="true">+</span></summary><p>${s[1]}</p></details>`
    ).join('');
  }

  /* ============================
     5. TOOLKIT & STACK DETAILS
     ============================ */
  const on = ['React', 'TypeScript', 'Tailwind', 'Vite', 'Supabase', 'WordPress', 'WooCommerce', 'Vercel', 'Python', 'Node.js'];
  const T = ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'Python', 'Tailwind', 'PostgreSQL', 'Supabase', 'Vite', 'WordPress', 'WooCommerce', 'Git', 'GitHub', 'Vercel'];

  const TOOL_DETAILS = {
    'React': 'React 19 & React.js — powers the front ends of Allied School Management, Kah-Nur Attendance, and Golden Harvest Foundation with fast virtual DOM and component reusability.',
    'TypeScript': 'TypeScript — used for strict type-safety, maintainable interfaces, and bug prevention across scalable web platforms.',
    'JavaScript': 'JavaScript (ESNext) — foundational scripting, reactive UI logic, asynchronous API handling, and WebGL animations.',
    'Node.js': 'Node.js — runtime for REST APIs and backend scripts.',
    'Express': 'Express.js — REST API routing and middleware.',
    'Python': 'Python — core language used in Milk Pricing & Management System for Fat/SNF formula calculations, automated bots, and data scripts.',
    'Tailwind': 'Tailwind CSS — modern utility styling used across Kah-Nur Attendance and Golden Harvest for lightning-fast responsive interfaces.',
    'PostgreSQL': 'PostgreSQL — relational database design for structured records such as fees, attendance and ledgers.',
    'Supabase': 'Supabase — managed PostgreSQL database and auth, used in Kah-Nur Attendance.',
    'Vite': 'Vite — lightning-fast build tool and development server for modern React and TypeScript web applications.',
    'WordPress': 'WordPress — content management and the WooCommerce storefront behind Peace In War Clothing.',
    'WooCommerce': 'WooCommerce — powers the live multi-currency e-commerce storefront at Peace In War Clothing.',
    'Git': 'Git — version control across my projects.',
    'GitHub': 'GitHub — source control and code hosting (github.com/Mian-Mudassir12).',
    'Vercel': 'Vercel — deployment for Allied School and other web apps.'
  };

  const lg = $('#leg');
  const techContainer = $('#tech');

  if (techContainer) {
    const buttons = techContainer.querySelectorAll('button');
    buttons.forEach((b) => {
      const t = b.dataset.tool || b.textContent.trim();
      const setActive = () => {
        buttons.forEach((el) => el.classList.remove('active-inspected'));
        b.classList.add('active-inspected');
        if (lg) {
          lg.style.opacity = '0';
          requestAnimationFrame(() => {
            lg.textContent = TOOL_DETAILS[t] || (on.includes(t)
              ? `${t} — actively used in production across the projects above.`
              : `${t} — part of my regular working engineering toolkit.`);
            lg.style.opacity = '1';
          });
        }
      };
      b.onclick = setActive;
      b.onmouseenter = setActive;
    });

    if (buttons[0] && lg) {
      buttons[0].classList.add('active-inspected');
      const firstTool = buttons[0].dataset.tool || 'React';
      lg.textContent = TOOL_DETAILS[firstTool] || `${firstTool} — actively used in production.`;
    }
  }

  /* ============================
     6. THREE.JS 3D SCENE
     ============================ */
  const st = { p: 0, o: 1, to: 1, mx: 0, my: 0, dark: 1 };
  let GL = null;

  function initGL() {
    try {
      if (!window.THREE) return;
      const cv = $('#gl');
      if (!cv) return;

      const R = new THREE.WebGLRenderer({
        canvas: cv,
        alpha: true,
        antialias: !mob()
      });
      R.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

      const scene = new THREE.Scene();
      const C = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      C.position.z = 9;

      const grp = new THREE.Group();
      scene.add(grp);

      const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.5, 0.46, mob() ? 100 : 200, mob() ? 16 : 24, 2, 3),
        new THREE.MeshStandardMaterial({
          color: 0xb5653f,
          roughness: 0.32,
          metalness: 0.3
        })
      );

      const wm = new THREE.MeshBasicMaterial({
        color: 0xf4efe6,
        wireframe: true,
        transparent: true,
        opacity: 0.22
      });
      const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(2.8, 1), wm);
      grp.add(knot, wire);

      const n = mob() ? 250 : 600;
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n * 3; i++) {
        pos[i] = (Math.random() - 0.5) * (i % 3 === 2 ? 10 : 22);
      }
      const pg = new THREE.BufferGeometry();
      pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const pm = new THREE.PointsMaterial({
        color: 0xf4efe6,
        size: 0.035,
        transparent: true,
        opacity: 0.6
      });
      const pts = new THREE.Points(pg, pm);
      scene.add(pts);

      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const dl = new THREE.DirectionalLight(0xffffff, 1.1);
      dl.position.set(4, 5, 6);
      scene.add(dl);

      const size = () => {
        R.setSize(window.innerWidth, window.innerHeight, false);
        C.aspect = window.innerWidth / window.innerHeight;
        C.updateProjectionMatrix();
      };
      size();
      window.addEventListener('resize', size);

      GL = { R, S: scene, C, grp, wm, pm, pts, cv };

      const draw = (t) => {
        const { p } = st;
        st.o += (st.to - st.o) * 0.06;
        cv.style.opacity = st.o;

        const c = st.dark ? 0xf4efe6 : 0x14110e;
        wm.color.setHex(c);
        pm.color.setHex(c);

        grp.rotation.y += (p * Math.PI * 7 + t * 0.00012 - grp.rotation.y) * 0.06;
        grp.rotation.x += (st.my * 0.25 + p * 2.4 - grp.rotation.x) * 0.05;
        grp.rotation.z = Math.sin(t * 0.0003) * 0.1;

        const tx = mob() ? -2.1 : -3.1 + Math.cos(p * Math.PI * 5) * 0.35;
        const ty = mob() ? 2.3 : Math.sin(p * Math.PI * 3) * 0.5;
        const sc = (mob() ? 0.62 : 1) * (1 + Math.sin(p * Math.PI * 6) * 0.2);

        grp.position.x += (tx + st.mx * 0.4 - grp.position.x) * 0.05;
        grp.position.y += (ty - grp.position.y) * 0.05;
        grp.scale.setScalar(grp.scale.x + (sc - grp.scale.x) * 0.06);

        pts.rotation.y = t * 0.00003 + p * 1.5;
        R.render(scene, C);
      };

      if (reduce) {
        draw(0);
      } else {
        const loop = (t) => {
          draw(t);
          requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
      }

      window.addEventListener('pointermove', (e) => {
        st.mx = (e.clientX / window.innerWidth) * 2 - 1;
        st.my = (e.clientY / window.innerHeight) * 2 - 1;
      });
    } catch (e) {
      console.warn('3D unavailable', e);
    }
  }

  /* ============================
     7. SCROLL ANIMATIONS (INCLUDING SIGNATURE HERO SHIFT)
     ============================ */
  function anim() {
    if (!window.gsap || !window.ScrollTrigger || reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (s) => (st.p = s.progress)
    });

    gsap.from('h1 .w>span', {
      yPercent: 115,
      duration: 1.3,
      ease: 'power4.out',
      stagger: 0.1,
      delay: 0.15
    });

    gsap.from('.who,.cue', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.9,
      ease: 'power3.out'
    });

    gsap.fromTo(
      '.portrait-shell',
      { y: 28, rotate: 1.1 },
      { y: 0, rotate: 0, duration: 1.2, ease: 'power3.out', delay: 0.15 }
    );

    /* === THE SIGNATURE HERO SHIFT PINNED ANIMATION === */
    if (!mob()) {
      const heroShift = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-stage',
          start: 'top top',
          end: '+=95%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1
        }
      });

      heroShift
        .to('.portrait-shell', { x: () => -window.innerWidth * 0.245, scale: 0.88, y: 0, ease: 'none' }, 0)
        .to('.hero-name', { x: () => window.innerWidth * 0.2, scale: 1, fontSize: '7.4vw', top: '48%', textAlign: 'left', ease: 'none' }, 0)
        .to('.hero-note', { x: 40, opacity: 0.45, ease: 'none' }, 0)
        .to('.hero-stage .who', { opacity: 0, y: 20, ease: 'none' }, 0);
    }

    $$('h2 .w>span').forEach((s, i) => {
      if (s.closest('.panel')) return;
      gsap.from(s, {
        yPercent: 115,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: s.closest('h2'),
          start: 'top 88%'
        },
        delay: (i % 5) * 0.08
      });
    });

    $$('.fu').forEach((e) =>
      gsap.from(e, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: e, start: 'top 90%' }
      })
    );


    gsap.from('.svc details', {
      y: 40,
      opacity: 0,
      stagger: 0.07,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.svc', start: 'top 85%' }
    });


    gsap.from('.ct .links,.ct .btn,.ct footer', {
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      scrollTrigger: { trigger: '.ct .links', start: 'top 92%' }
    });

    ScrollTrigger.create({
      trigger: '.run',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (s) =>
        gsap.to('.run div', {
          skewX: Math.max(-12, Math.min(12, s.getVelocity() / -250)),
          duration: 0.4,
          overwrite: true
        })
    });

    /* Horizontal track */
    const mm = gsap.matchMedia();

    mm.add('(min-width:900px)', () => {
      const tr = $('#track');
      const panels = $$('.panel[data-i]');
      if (!tr) return;

      const getDistance = () => tr.scrollWidth - window.innerWidth;

      const tw = gsap.to(tr, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          id: 'horizontalScroll',
          trigger: '#work',
          pin: true,
          scrub: 0.8,
          end: () => '+=' + getDistance(),
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (s) => {
            const bar = $('#bar');
            const cnt = $('#cnt');
            if (bar) bar.style.transform = `scaleX(${s.progress})`;
            if (cnt) {
              const k = Math.min(5, Math.max(1, Math.round(s.progress * 5) + 1));
              cnt.textContent = '0' + k + ' / 05';
            }
          }
        }
      });

      // Stepping arrow buttons
      const prevBtn = $('#prev-btn');
      const nextBtn = $('#next-btn');

      if (prevBtn && nextBtn) {
        const step = (dir) => {
          const stInstance = ScrollTrigger.getById('horizontalScroll');
          if (!stInstance) return;
          const totalDist = getDistance();
          const target = stInstance.start + stInstance.progress * totalDist + dir * (totalDist / 5);
          window.scrollTo({ top: target, behavior: 'smooth' });
        };
        prevBtn.onclick = () => step(-1);
        nextBtn.onclick = () => step(1);
      }

      panels.forEach((p) => {
        const art = p.querySelector('.art');
        if (art) {
          gsap.from(art, {
            rotation: -25,
            scale: 0.7,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: p,
              containerAnimation: tw,
              start: 'left 95%',
              end: 'left 35%',
              scrub: true
            }
          });
        }
        gsap.from(p.querySelectorAll('.num,h3,.tags,.acts,p'), {
          y: 60,
          opacity: 0,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: p,
            containerAnimation: tw,
            start: 'left 80%',
            end: 'left 40%',
            scrub: true
          }
        });
      });
    });

    mm.add('(max-width:899px)', () => {
      $$('.panel[data-i]').forEach((p) => {
        gsap.from(p.querySelectorAll('.num,h3,.art'), {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.9,
          scrollTrigger: { trigger: p, start: 'top 80%' }
        });
      });
    });

    /* Theme toggle */
    $$('[data-t]').forEach((sec) => {
      if (sec.tagName === 'BODY') return;
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (s) => {
          if (s.isActive) {
            document.body.dataset.t = sec.dataset.t;
            st.dark = sec.dataset.t === 'dark' ? 1 : 0;
            st.to = +sec.dataset.o * (mob() ? 0.4 : 1);
          }
        }
      });
    });
  }

  /* ============================
     8. CURSOR & MAGNETIC PHYSICS
     ============================ */
  function initCursor() {
    if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
      const c = $('#cur');
      if (c) {
        c.classList.add('on');
        const qx = gsap.quickTo(c, 'x', { duration: 0.25 });
        const qy = gsap.quickTo(c, 'y', { duration: 0.25 });
        window.addEventListener('pointermove', (e) => {
          qx(e.clientX - 8);
          qy(e.clientY - 8);
        });

        $$('a,button,summary,input,select,textarea').forEach((el) => {
          el.addEventListener('pointerenter', () => gsap.to(c, { scale: 3, duration: 0.3 }));
          el.addEventListener('pointerleave', () => gsap.to(c, { scale: 1, duration: 0.3 }));
        });
      }

      $$('.mag').forEach((m) => {
        m.addEventListener('pointermove', (e) => {
          const r = m.getBoundingClientRect();
          gsap.to(m, {
            x: (e.clientX - r.left - r.width / 2) * 0.25,
            y: (e.clientY - r.top - r.height / 2) * 0.4,
            duration: 0.3
          });
        });
        m.addEventListener('pointerleave', () => {
          gsap.to(m, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,.4)' });
        });
      });
    }
  }

  /* ============================
     9. MOBILE DRAWER
     ============================ */
  function initMobileMenu() {
    const toggle = $('#nav-toggle');
    const drawer = $('#mobile-drawer');
    const links = $$('.mobile-link, .mobile-cta');

    if (!toggle || !drawer) return;

    toggle.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggle.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      drawer.setAttribute('aria-hidden', !isOpen);
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ============================
     10. CONTACT FORM & EMAIL ACTIONS
     ============================ */
  function initContactForm() {
    const form = $('#contact-form');
    const feedback = $('#form-feedback');
    const submitBtn = $('#form-submit-btn');

    // Clipboard Copy for Email
    const copyBtn = $('#copy-email-btn');
    const copyText = $('#copy-text');
    if (copyBtn && copyText) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('mudassirshahbaz372@gmail.com').then(() => {
          const original = copyText.textContent;
          copyText.textContent = '✓ Copied to Clipboard!';
          copyBtn.style.borderColor = 'var(--acc)';
          copyBtn.style.color = 'var(--acc)';
          setTimeout(() => {
            copyText.textContent = original;
            copyBtn.style.borderColor = '';
            copyBtn.style.color = '';
          }, 2400);
        }).catch(() => {
          window.location.href = 'mailto:mudassirshahbaz372@gmail.com';
        });
      });
    }

    if (!form || !feedback || !submitBtn) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#name').value.trim();
      const email = $('#email').value.trim();
      const type = $('#project-type').value;
      const message = $('#message').value.trim();

      if (!name || !email || !message) {
        feedback.className = 'form-feedback error l';
        feedback.textContent = 'Please fill out your name, email, and project message.';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';
      feedback.className = 'form-feedback l mute';
      feedback.textContent = 'Delivering directly to Mudassir’s inbox...';

      // Send directly to Mudassir's Gmail inbox via FormSubmit AJAX endpoint
      fetch('https://formsubmit.co/ajax/mudassirshahbaz372@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          projectScope: type,
          message: message,
          _subject: `New Portfolio Inquiry from ${name} (${type})`
        })
      })
      .then((res) => res.json())
      .then((data) => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message →';
        feedback.className = 'form-feedback success l';
        feedback.textContent = `✓ Message sent! Delivered directly to Mudassir’s inbox. I'll reply within 12 hours.`;
        form.reset();
      })
      .catch(() => {
        // Fallback to mailto if user is offline or network blocked
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message →';
        feedback.className = 'form-feedback success l';
        feedback.textContent = `Opening your email app to send directly...`;
        const subject = encodeURIComponent(`Project Inquiry: ${type} from ${name}`);
        const body = encodeURIComponent(
          `Hi Mudassir,\n\nName: ${name}\nEmail: ${email}\nScope: ${type}\n\nMessage:\n${message}\n\nBest regards,\n${name}`
        );
        window.location.href = `mailto:mudassirshahbaz372@gmail.com?subject=${subject}&body=${body}`;
        form.reset();
      });
    });
  }

  /* ============================
     10b. PROJECT PLANNER / SCOPE ESTIMATOR
     ============================ */
  function initPlanner() {
    let service = 'ecommerce';
    let complexity = 'growth';

    const STACKS = {
      website: ['React 19', 'Tailwind CSS', 'Vite', 'SEO Schema'],
      ecommerce: ['WooCommerce / Next.js', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
      platform: ['Next.js', 'Supabase / PostgreSQL', 'Tailwind CSS', 'Node.js'],
      automation: ['Python', 'Node.js', 'Webhooks', 'REST APIs']
    };

    const MILESTONES = {
      website: ['Creative Direction & Wireframing', 'Responsive Front-End Build', 'Content & Technical SEO', 'Edge Deployment'],
      ecommerce: ['Catalog Taxonomy & Store Architecture', 'Checkout & Payment Gateways', 'Inventory & Cart Drawers', 'Live Launch & Testing'],
      platform: ['Relational Data Schema & Auth', 'Administrative Portals & Roles', 'Custom Business Logic & APIs', 'Auditing, Hardening & Launch'],
      automation: ['Process Audit & Data Mapping', 'Connector & Pipeline Development', 'Failover Error Handling', 'Live Automation Integration']
    };

    const BASE_WEEKS = { website: 1.5, ecommerce: 3, platform: 4, automation: 2 };
    const MULTIPLIERS = { starter: 1.0, growth: 1.6, enterprise: 2.5 };

    const timeEl = $('#planner-time');
    const stackEl = $('#planner-stack');
    const milestonesEl = $('#planner-milestones');
    const ctaEl = $('#planner-cta');

    if (!timeEl) return; // planner not on page

    const update = () => {
      const weeks = Math.max(1, Math.round(BASE_WEEKS[service] * MULTIPLIERS[complexity]));
      if (timeEl) timeEl.textContent = `~${weeks} Weeks`;

      if (stackEl) {
        stackEl.innerHTML = STACKS[service]
          .map((t) => `<span class="tool-tag highlight">${t}</span>`)
          .join('');
      }

      if (milestonesEl) {
        milestonesEl.innerHTML = MILESTONES[service]
          .map((m, i) => `<li style="display:flex;gap:8px;"><span style="color:var(--acc);font-weight:700;">0${i + 1}.</span><span>${m}</span></li>`)
          .join('');
      }

      if (ctaEl) {
        const subject = encodeURIComponent(`Project Scope Inquiry: ${service.toUpperCase()} (${complexity.toUpperCase()})`);
        const body = encodeURIComponent(
          `Hi Mudassir,\n\nI used your portfolio scope planner and would like to build:\n- Type: ${service}\n- Scope: ${complexity}\n- Estimated Timeline: ~${weeks} weeks\n\nPlease let me know your availability.\n\nBest regards.`
        );
        ctaEl.href = `mailto:mudassirshahbaz372@gmail.com?subject=${subject}&body=${body}`;
      }
    };

    $$('.planner-service-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('.planner-service-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        service = btn.dataset.service;
        update();
      });
    });

    $$('.planner-scope-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('.planner-scope-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        complexity = btn.dataset.scope;
        update();
      });
    });

    update();
  }

  /* ============================
     10c. EDITORIAL PRELOADER INTRO (EXTENDED & MESMERIZING)
     ============================ */
  function initPreloader(onComplete) {
    const preloader = $('#preloader');
    const countEl = $('#preloader-count');
    const barEl = $('#preloader-bar');
    const kickerEl = $('#preloader-kicker');
    const subtextEl = $('#preloader-subtext');
    const telemetryEl = $('#preloader-telemetry-text');
    try { if (sessionStorage.getItem('pl')) { if (preloader) preloader.style.display = 'none'; onComplete(); return; } sessionStorage.setItem('pl', '1'); } catch (e) {}

    if (!preloader) {
      if (onComplete) onComplete();
      return;
    }

    let isFinished = false;

    const finishIntro = () => {
      if (isFinished) return;
      isFinished = true;

      if (countEl) countEl.textContent = '100%';
      if (barEl) barEl.style.width = '100%';
      if (kickerEl) kickerEl.textContent = '[ STAGE 03 — ARCHITECTURE VERIFIED ]';
      if (telemetryEl) telemetryEl.textContent = '● System Online · Launching Studio...';

      if (window.gsap) {
        const tl = gsap.timeline({
          onComplete: () => {
            preloader.style.display = 'none';
            if (onComplete) onComplete();
          }
        });
        tl.to('.preloader-inner', {
          y: -30,
          opacity: 0,
          duration: 0.45,
          ease: 'power3.in'
        }).to(
          preloader,
          {
            yPercent: -100,
            duration: 0.95,
            ease: 'power4.inOut'
          },
          '-=0.15'
        );
      } else {
        preloader.style.transition = 'transform 0.9s cubic-bezier(0.85, 0, 0.15, 1)';
        preloader.style.transform = 'translateY(-100%)';
        setTimeout(() => {
          preloader.style.display = 'none';
          if (onComplete) onComplete();
        }, 900);
      }
    };

    // Allow user to click anywhere to skip immediately
    preloader.addEventListener('click', finishIntro);

    // Dynamic Narrative Stages across the 2.4s timeline
    const stages = [
      {
        at: 0,
        kicker: '[ STAGE 01 — RUNTIME INITIALIZING ]',
        sub: 'Full-Stack Web Systems · Custom ERPs · Automation',
        tel: 'Compiling React 19, TypeScript & WebGL 3D Pipeline...'
      },
      {
        at: 35,
        kicker: '[ STAGE 02 — WORKFLOW ENGINE BOOT ]',
        sub: 'Built Around How Real Businesses & Teams Actually Operate',
        tel: 'Configuring PostgreSQL, Supabase & Biometric Gateways...'
      },
      {
        at: 72,
        kicker: '[ STAGE 03 — SYSTEM VERIFIED ]',
        sub: 'Muhammad Mudassir Shahbaz — Digital Builder',
        tel: 'Honest Architecture · Fast Performance · Zero Bloat...'
      }
    ];

    let currentStage = 0;
    const updateStage = (pct) => {
      for (let i = stages.length - 1; i >= 0; i--) {
        if (pct >= stages[i].at && currentStage !== i) {
          currentStage = i;
          const s = stages[i];
          if (kickerEl) {
            kickerEl.style.opacity = '0';
            setTimeout(() => {
              kickerEl.textContent = s.kicker;
              kickerEl.style.opacity = '1';
            }, 120);
          }
          if (subtextEl) {
            subtextEl.style.opacity = '0';
            setTimeout(() => {
              subtextEl.innerHTML = `<span>${s.sub}</span>`;
              subtextEl.style.opacity = '1';
            }, 120);
          }
          if (telemetryEl) {
            telemetryEl.style.opacity = '0';
            setTimeout(() => {
              telemetryEl.textContent = s.tel;
              telemetryEl.style.opacity = '1';
            }, 120);
          }
          break;
        }
      }
    };

    // Smooth eased counter: total duration ~2.4 seconds
    const startTime = performance.now();
    const duration = 1100;

    const tick = (now) => {
      if (isFinished) return;
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);

      // Smooth custom cubic ease: starts steady, surges in mid, eases into 100
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const progress = Math.min(100, Math.floor(eased * 100));

      if (countEl) countEl.textContent = `${String(progress).padStart(2, '0')}%`;
      if (barEl) barEl.style.width = `${progress}%`;
      updateStage(progress);

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(finishIntro, 120); // brief hold at 100%
      }
    };

    requestAnimationFrame(tick);
  }

  /* ============================
     11. INITIALIZATION
     ============================ */
  window.addEventListener('load', () => {
    initGL();
    initCursor();
    initMobileMenu();
    initPlanner();
    initContactForm();

    initPreloader(() => {
      anim();
      if (window.ScrollTrigger) {
        setTimeout(() => ScrollTrigger.refresh(), 200);
      }
    });
  });
})();
