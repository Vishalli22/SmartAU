import { useState, useEffect } from "react";

// ─── Design Tokens (CSS Variables injected via style tag) ─────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Sora:wght@400;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --blue: #4a9ec8; --blue-d: #2d7ea6; --blue-dk: #1d5f82;
      --blue-l: #e6f4fa; --blue-m: #b3d9ed;
      --hero-a: #5cb8e0; --hero-b: #2d7ea6;
      --white: #ffffff; --bg: #f2f6f9; --card: #ffffff;
      --border: #dde8ef; --text: #0d2030; --text-s: #3d5a6c; --text-m: #7a96a6;
      --r: 12px; --r-lg: 18px;
      --sh: 0 1px 4px rgba(45,126,166,.10);
      --sh-md: 0 4px 16px rgba(45,126,166,.14);
      --sh-lg: 0 8px 32px rgba(45,126,166,.18);
      --nav-w: 240px; --top-h: 64px;
    }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; overflow-x: hidden; }
    button { font-family: 'Inter', sans-serif; cursor: pointer; }
    a { text-decoration: none; }
    input { font-family: 'Inter', sans-serif; }

    /* ── Topnav ── */
    .topnav { position:fixed;top:0;left:0;right:0;height:var(--top-h);background:var(--white);border-bottom:1px solid var(--border);box-shadow:var(--sh);display:flex;align-items:center;padding:0 28px;gap:20px;z-index:1000; }
    .topnav-login { flex-shrink:0;background:var(--blue-d);color:#fff;border:none;border-radius:8px;padding:9px 20px;font-size:.82rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:7px;transition:.15s;white-space:nowrap; }
    .topnav-login:hover { background:var(--blue-dk); }
    .topnav-login svg { width:15px;height:15px;stroke:#fff;fill:none;stroke-width:2; }
    .topnav-div { width:1px;height:28px;background:var(--border);flex-shrink:0; }
    .topnav-brand { display:flex;align-items:center;gap:14px;flex:1; }
    .brand-emblem { width:46px;height:46px;border-radius:50%;border:2px solid var(--blue-m);background:var(--blue-l);display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden; }
    .brand-emblem svg { width:38px;height:38px; }
    .brand-text h1 { font-family:'Sora',sans-serif;font-size:1rem;font-weight:700;color:var(--text);line-height:1.2; }
    .brand-text p { font-size:.72rem;color:var(--text-s);margin-top:1px; }
    .topnav-links { display:flex;align-items:center;gap:4px;margin-left:auto; }
    .tnl { padding:7px 14px;border-radius:8px;font-size:.82rem;font-weight:500;color:var(--text-s);cursor:pointer;transition:.14s;white-space:nowrap;border:none;background:none; }
    .tnl:hover { background:var(--blue-l);color:var(--blue-d); }
    .tnl.active { background:var(--blue-l);color:var(--blue-d);font-weight:600; }
    .topnav-badge { background:var(--blue-l);border:1px solid var(--blue-m);border-radius:20px;padding:5px 14px;font-size:.72rem;font-weight:700;color:var(--blue-dk);letter-spacing:.04em;margin-left:8px; }

    /* ── Layout ── */
    .layout { display:flex;margin-top:var(--top-h);min-height:calc(100vh - var(--top-h)); }
    .sidebar { width:var(--nav-w);background:var(--white);border-right:1px solid var(--border);position:fixed;top:var(--top-h);left:0;bottom:0;overflow-y:auto;overflow-x:hidden;padding:20px 0 32px;display:flex;flex-direction:column;z-index:900; }
    .sidebar::-webkit-scrollbar { width:4px; }
    .sidebar::-webkit-scrollbar-track { background:transparent; }
    .sidebar::-webkit-scrollbar-thumb { background:var(--blue-m);border-radius:2px; }
    .sb-section { font-size:.66rem;font-weight:700;color:var(--text-m);text-transform:uppercase;letter-spacing:.1em;padding:0 20px;margin:16px 0 6px; }
    .sb-item { display:flex;align-items:center;gap:11px;padding:10px 20px;font-size:.84rem;font-weight:500;color:var(--text-s);cursor:pointer;transition:.13s;border-left:3px solid transparent;border:none;background:none;width:100%;text-align:left; }
    .sb-item svg { width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.8;flex-shrink:0; }
    .sb-item:hover { background:var(--blue-l);color:var(--blue-d); }
    .sb-item.active { background:var(--blue-l);color:var(--blue-d);font-weight:600;border-left:3px solid var(--blue-d); }
    .sb-badge { margin-left:auto;background:var(--blue-d);color:#fff;border-radius:10px;padding:1px 7px;font-size:.62rem;font-weight:700; }
    .main { margin-left:var(--nav-w);flex:1;min-height:calc(100vh - var(--top-h));display:flex;flex-direction:column; }

    /* ── Hero ── */
    .hero { background:linear-gradient(135deg,var(--hero-a) 0%,var(--hero-b) 100%);color:#fff;padding:42px 48px 38px;position:relative;overflow:hidden; }
    .hero::after { content:'';position:absolute;right:-60px;top:-60px;width:320px;height:320px;border-radius:50%;background:rgba(255,255,255,.06);pointer-events:none; }
    .hero::before { content:'';position:absolute;right:80px;bottom:-80px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,.04);pointer-events:none; }
    .hero-row { display:flex;align-items:center;gap:12px;margin-bottom:8px; }
    .hero-row svg { width:28px;height:28px;stroke:#fff;fill:none;flex-shrink:0; }
    .hero h2 { font-family:'Sora',sans-serif;font-size:1.9rem;font-weight:700;line-height:1.25;color:#fff; }
    .hero p { font-size:.92rem;opacity:.9;line-height:1.6;max-width:680px;margin-top:8px; }
    .hero-meta { display:flex;gap:12px;margin-top:18px;flex-wrap:wrap; }
    .hero-chip { background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.28);border-radius:20px;padding:5px 14px;font-size:.75rem;font-weight:600;color:#fff; }

    /* ── Page body ── */
    .page-body { padding:32px 48px 48px;display:flex;flex-direction:column;gap:32px; }
    .sec-hdr { display:flex;align-items:center;justify-content:space-between;margin-bottom:16px; }
    .sec-title { font-family:'Sora',sans-serif;font-size:1rem;font-weight:700;color:var(--text); }
    .sec-link { font-size:.78rem;font-weight:600;color:var(--blue-d);cursor:pointer;display:flex;align-items:center;gap:4px;border:none;background:none; }
    .sec-link svg { width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2; }

    /* ── Stats ── */
    .stats-row { display:grid;grid-template-columns:repeat(4,1fr);gap:16px; }
    .stat-card { background:var(--card);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--sh);padding:22px 24px;display:flex;align-items:center;gap:16px; }
    .stat-ico { width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
    .stat-ico svg { width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:1.8; }
    .stat-num { font-family:'Sora',sans-serif;font-size:1.6rem;font-weight:700;color:var(--text); }
    .stat-lbl { font-size:.74rem;color:var(--text-m);margin-top:2px; }

    /* ── Quick Access ── */
    .qa-grid { display:grid;grid-template-columns:repeat(6,1fr);gap:14px; }
    .qa-card { background:var(--card);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--sh);padding:22px 14px 18px;display:flex;flex-direction:column;align-items:center;gap:10px;cursor:pointer;transition:all .18s; }
    .qa-card:hover { box-shadow:var(--sh-md);transform:translateY(-3px);border-color:var(--blue-m); }
    .qa-ico { width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center; }
    .qa-ico svg { width:26px;height:26px;stroke:currentColor;fill:none;stroke-width:1.8; }
    .qa-lbl { font-size:.82rem;font-weight:600;color:var(--text);text-align:center;line-height:1.3; }
    .qa-sub { font-size:.68rem;color:var(--text-m);text-align:center;line-height:1.3; }

    /* ── Notices ── */
    .notices-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:16px; }
    .notice-card { background:var(--card);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--sh);padding:20px 22px;border-left:4px solid var(--blue-d); }
    .notice-card h4 { font-size:.9rem;font-weight:600;color:var(--text);margin-bottom:5px; }
    .notice-card p { font-size:.79rem;color:var(--text-s);line-height:1.55; }
    .ntag { display:inline-block;padding:3px 11px;border-radius:20px;font-size:.65rem;font-weight:700;margin-bottom:8px;letter-spacing:.03em; }
    .nt-b { background:#dbeafe;color:#1d4ed8; }
    .nt-t { background:#ccfbf1;color:#065f46; }
    .nt-o { background:#ffedd5;color:#b45309; }

    /* ── Map ── */
    .map-layout { display:grid;grid-template-columns:1fr 300px;gap:20px; }
    .map-wrap { background:var(--card);border-radius:var(--r-lg);border:1px solid var(--border);box-shadow:var(--sh);overflow:hidden; }
    .map-3d { width:100%;height:480px;background:linear-gradient(160deg,#0d2035 0%,#1b4468 100%);position:relative; }
    .map-3d svg { width:100%;height:100%; }
    .map-filters { display:flex;gap:8px;padding:14px 18px;border-bottom:1px solid var(--border);flex-wrap:wrap; }
    .mfbtn { padding:6px 16px;border-radius:20px;font-size:.75rem;font-weight:600;border:1.5px solid var(--border);background:#fff;color:var(--text-s);cursor:pointer;white-space:nowrap;transition:.14s; }
    .mfbtn.active,.mfbtn:hover { background:var(--blue-d);color:#fff;border-color:var(--blue-d); }
    .map-info-panel { padding:18px 20px; }
    .map-info-panel h3 { font-family:'Sora',sans-serif;font-size:1rem;font-weight:700;color:var(--text); }
    .map-info-panel p { font-size:.8rem;color:var(--text-s);margin-top:4px;line-height:1.55; }
    .map-tags { display:flex;flex-wrap:wrap;gap:6px;margin-top:10px; }
    .mtag { background:var(--blue-l);border:1px solid var(--border);border-radius:8px;padding:3px 10px;font-size:.68rem;font-weight:600;color:var(--blue-dk); }
    .map-side { display:flex;flex-direction:column;gap:14px; }
    .landmark-card { background:var(--card);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--sh);overflow:hidden; }
    .landmark-title { font-size:.75rem;font-weight:700;color:var(--text-s);text-transform:uppercase;letter-spacing:.07em;padding:14px 16px 10px;border-bottom:1px solid var(--border); }
    .lm-item { display:flex;align-items:center;gap:10px;padding:11px 16px;border-bottom:1px solid var(--border);cursor:pointer;transition:.12s; }
    .lm-item:last-child { border-bottom:none; }
    .lm-item:hover { background:var(--blue-l); }
    .lm-dot { width:8px;height:8px;border-radius:50%;background:var(--blue-d);flex-shrink:0; }
    .lm-name { font-size:.82rem;font-weight:600;color:var(--text); }
    .lm-type { font-size:.7rem;color:var(--text-m);margin-left:auto; }

    /* ── Directory ── */
    .dir-toolbar { display:flex;align-items:center;gap:14px; }
    .search-box { position:relative;flex:1;max-width:480px; }
    .search-box input { width:100%;padding:10px 16px 10px 42px;border:1.5px solid var(--border);border-radius:10px;font-size:.86rem;color:var(--text);background:#fff;outline:none;transition:.14s; }
    .search-box input:focus { border-color:var(--blue); }
    .search-box input::placeholder { color:var(--text-m); }
    .s-ico { position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--text-m); }
    .s-ico svg { width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2; }
    .tab-row { display:flex;gap:4px;background:var(--bg);border-radius:10px;padding:4px; }
    .tab-btn { padding:8px 20px;border-radius:8px;font-size:.82rem;font-weight:600;color:var(--text-s);cursor:pointer;border:none;background:none;transition:.13s;display:flex;align-items:center;gap:6px; }
    .tab-btn svg { width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:1.8; }
    .tab-btn.active { background:#fff;color:var(--blue-d);box-shadow:var(--sh); }
    .dir-table { background:var(--card);border-radius:var(--r-lg);border:1px solid var(--border);box-shadow:var(--sh);overflow:hidden; }
    .dir-row { display:grid;align-items:center;padding:14px 20px;border-bottom:1px solid var(--border);cursor:pointer;transition:.12s; }
    .dir-row:last-child { border-bottom:none; }
    .dir-row:hover { background:var(--blue-l); }
    .bldg-row { grid-template-columns:44px 1fr 140px 100px 80px 40px; }
    .dept-row { grid-template-columns:44px 1fr 120px 80px 100px 40px; }
    .dir-head { background:var(--bg);font-size:.72rem;font-weight:700;color:var(--text-m);text-transform:uppercase;letter-spacing:.06em;cursor:default!important; }
    .dir-head:hover { background:var(--bg)!important; }
    .dir-ava { width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
    .dir-ava svg { width:17px;height:17px;stroke:currentColor;fill:none;stroke-width:1.8; }
    .dir-cell { font-size:.83rem;color:var(--text); }
    .dir-cell.muted { color:var(--text-s);font-size:.78rem; }
    .dir-cell.bold { font-weight:600; }
    .type-chip { display:inline-block;padding:3px 10px;border-radius:20px;font-size:.68rem;font-weight:600;background:var(--blue-l);color:var(--blue-dk); }
    .dir-chev { color:var(--text-m); }
    .dir-chev svg { width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2; }
    .dept-expand { display:none;background:#f7fbfe;padding:16px 20px 18px 84px;border-bottom:1px solid var(--border); }
    .dept-expand.open { display:block; }
    .dept-expand p { font-size:.8rem;color:var(--text-s);line-height:1.6;margin-bottom:8px; }
    .de-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:8px; }
    .de-item { font-size:.75rem;color:var(--text-s);background:#fff;border:1px solid var(--border);border-radius:8px;padding:4px 10px; }

    /* ── QR ── */
    .qr-layout { display:grid;grid-template-columns:repeat(4,1fr);gap:18px; }
    .qr-card { background:var(--card);border-radius:var(--r-lg);border:1px solid var(--border);box-shadow:var(--sh);padding:24px;display:flex;flex-direction:column;align-items:center;gap:14px;cursor:pointer;transition:all .18s; }
    .qr-card:hover { box-shadow:var(--sh-md);transform:translateY(-3px);border-color:var(--blue-m); }
    .qr-box { width:130px;height:130px;border:1.5px solid var(--border);border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center; }
    .qr-name { font-family:'Sora',sans-serif;font-size:.9rem;font-weight:700;color:var(--text);text-align:center; }
    .qr-loc { font-size:.74rem;color:var(--text-m);text-align:center; }
    .qr-code-tag { font-size:.68rem;font-weight:700;color:var(--blue-dk);background:var(--blue-l);border-radius:8px;padding:3px 10px; }

    /* ── Events ── */
    .events-layout { display:grid;grid-template-columns:1fr 340px;gap:24px; }
    .events-list { display:flex;flex-direction:column;gap:14px; }
    .ev-card { background:var(--card);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--sh);padding:20px 24px;display:flex;gap:18px;align-items:flex-start;cursor:pointer;transition:.15s; }
    .ev-card:hover { box-shadow:var(--sh-md);border-color:var(--blue-m); }
    .ev-date { background:var(--blue-d);color:#fff;border-radius:10px;padding:10px 12px;text-align:center;min-width:52px;flex-shrink:0; }
    .ev-day { font-family:'Sora',sans-serif;font-size:1.5rem;font-weight:700;line-height:1; }
    .ev-mon { font-size:.62rem;font-weight:700;letter-spacing:.07em;opacity:.9;text-transform:uppercase; }
    .ev-info { flex:1; }
    .ev-info h4 { font-family:'Sora',sans-serif;font-size:.95rem;font-weight:700;color:var(--text);margin-bottom:4px; }
    .ev-info p { font-size:.8rem;color:var(--text-s);line-height:1.5; }
    .ev-tag { display:inline-block;margin-top:8px;padding:3px 11px;border-radius:20px;font-size:.67rem;font-weight:700;background:var(--blue-l);color:var(--blue-dk); }
    .ev-side { display:flex;flex-direction:column;gap:14px; }
    .ev-side-card { background:var(--card);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--sh);padding:20px; }
    .ev-side-card h4 { font-family:'Sora',sans-serif;font-size:.9rem;font-weight:700;color:var(--text);margin-bottom:12px; }

    /* ── Services ── */
    .svc-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px; }
    .svc-card { background:var(--card);border-radius:var(--r-lg);border:1px solid var(--border);box-shadow:var(--sh);padding:24px 20px;display:flex;flex-direction:column;align-items:center;gap:10px;cursor:pointer;transition:all .18s;text-align:center; }
    .svc-card:hover { box-shadow:var(--sh-md);transform:translateY(-2px);border-color:var(--blue-m); }
    .svc-ico { width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center; }
    .svc-ico svg { width:26px;height:26px;stroke:currentColor;fill:none;stroke-width:1.8; }
    .svc-name { font-size:.88rem;font-weight:700;color:var(--text); }
    .svc-desc { font-size:.72rem;color:var(--text-m);line-height:1.45; }

    /* ── Help ── */
    .help-layout { display:grid;grid-template-columns:1fr 360px;gap:24px; }
    .help-main { display:flex;flex-direction:column;gap:20px; }
    .guide-card { background:var(--card);border-radius:var(--r-lg);border:1px solid var(--border);box-shadow:var(--sh);overflow:hidden; }
    .guide-hdr { font-family:'Sora',sans-serif;font-size:.95rem;font-weight:700;color:var(--text);padding:18px 22px;border-bottom:1px solid var(--border); }
    .guide-row { display:flex;align-items:center;gap:14px;padding:16px 22px;border-bottom:1px solid var(--border);cursor:pointer;transition:.12s; }
    .guide-row:last-child { border-bottom:none; }
    .guide-row:hover { background:var(--blue-l); }
    .g-ico { width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
    .g-ico svg { width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:1.8; }
    .g-txt h4 { font-size:.86rem;font-weight:600;color:var(--text); }
    .g-txt p { font-size:.74rem;color:var(--text-s);margin-top:1px; }
    .g-chev { margin-left:auto;color:var(--text-m); }
    .g-chev svg { width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2; }
    .faq-card { background:var(--card);border-radius:var(--r-lg);border:1px solid var(--border);box-shadow:var(--sh);overflow:hidden; }
    .faq-hdr { font-family:'Sora',sans-serif;font-size:.95rem;font-weight:700;color:var(--text);padding:18px 22px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px; }
    .faq-hdr svg { width:18px;height:18px;stroke:var(--text-m);fill:none;stroke-width:1.8; }
    .faq-item { border-bottom:1px solid var(--border); }
    .faq-item:last-child { border-bottom:none; }
    .faq-q { padding:15px 22px;font-size:.84rem;font-weight:500;color:var(--text);cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;background:none;border:none;width:100%;text-align:left;transition:.12s; }
    .faq-q:hover { background:var(--blue-l); }
    .f-arr { flex-shrink:0;transition:transform .2s; }
    .f-arr svg { width:14px;height:14px;stroke:var(--text-m);fill:none;stroke-width:2; }
    .faq-a { display:none;padding:0 22px 15px;font-size:.8rem;color:var(--text-s);line-height:1.6;border-top:1px solid var(--border); }
    .faq-a.open { display:block; }
    .help-side { display:flex;flex-direction:column;gap:16px; }
    .con-grid { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
    .con-card { background:var(--card);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--sh);padding:16px;text-align:center; }
    .con-ico { width:38px;height:38px;border-radius:9px;display:flex;align-items:center;justify-content:center;margin:0 auto 8px; }
    .con-ico svg { width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.8; }
    .con-card h4 { font-size:.8rem;font-weight:700;color:var(--text); }
    .con-card p { font-size:.68rem;color:var(--text-m);margin-top:1px; }
    .con-card a { display:block;font-size:.77rem;font-weight:700;color:var(--blue-d);text-decoration:none;margin-top:5px; }

    /* ── Profile ── */
    .profile-layout { display:grid;grid-template-columns:320px 1fr;gap:24px;align-items:start; }
    .profile-card { background:var(--card);border-radius:var(--r-lg);border:1px solid var(--border);box-shadow:var(--sh);overflow:hidden; }
    .profile-hero-sec { background:linear-gradient(135deg,var(--hero-a),var(--hero-b));padding:32px 24px;display:flex;flex-direction:column;align-items:center;text-align:center;position:relative; }
    .p-ava { width:90px;height:90px;border-radius:50%;background:rgba(255,255,255,.2);border:3px solid rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;margin-bottom:14px;position:relative; }
    .p-ava svg { width:48px;height:48px;stroke:#fff;fill:none;stroke-width:1.5; }
    .p-cam { position:absolute;bottom:-2px;right:-2px;width:26px;height:26px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;border:none; }
    .p-cam svg { width:13px;height:13px;stroke:var(--blue-d);fill:none;stroke-width:1.8; }
    .profile-hero-sec h2 { font-family:'Sora',sans-serif;font-size:1.2rem;font-weight:700;color:#fff; }
    .profile-hero-sec p { font-size:.78rem;color:rgba(255,255,255,.85);margin-top:3px; }
    .p-badges { display:flex;flex-wrap:wrap;gap:7px;justify-content:center;margin-top:12px; }
    .pbdg { background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);border-radius:20px;padding:4px 12px;font-size:.68rem;font-weight:600;color:#fff; }
    .p-edit-btn { position:absolute;top:16px;right:16px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);border-radius:8px;padding:5px 10px;font-size:.7rem;font-weight:600;color:#fff;cursor:pointer;display:flex;align-items:center;gap:5px; }
    .p-edit-btn svg { width:12px;height:12px;stroke:#fff;fill:none;stroke-width:2; }
    .p-info-list { padding:0; }
    .p-info-row { display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid var(--border); }
    .p-info-row:last-child { border-bottom:none; }
    .pi-ico { width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
    .pi-ico svg { width:15px;height:15px;fill:none;stroke-width:1.8;stroke:currentColor; }
    .pi-lbl { font-size:.66rem;color:var(--text-m);font-weight:600;text-transform:uppercase;letter-spacing:.05em; }
    .pi-val { font-size:.83rem;font-weight:600;color:var(--text);margin-top:2px; }
    .profile-right { display:flex;flex-direction:column;gap:20px; }
    .pinfo-box { background:var(--card);border-radius:var(--r-lg);border:1px solid var(--border);box-shadow:var(--sh);overflow:hidden; }
    .pinfo-ttl { font-family:'Sora',sans-serif;font-size:.9rem;font-weight:700;color:var(--text);padding:18px 22px;border-bottom:1px solid var(--border); }
    .pinfo-grid { display:grid;grid-template-columns:repeat(3,1fr); }
    .pic { padding:16px 20px;border-bottom:1px solid var(--border);border-right:1px solid var(--border); }
    .pic:nth-child(3n) { border-right:none; }
    .pic:nth-last-child(-n+3) { border-bottom:none; }
    .pic-ico { display:flex;align-items:center;gap:7px;margin-bottom:4px; }
    .pic-ico svg { width:14px;height:14px;fill:none;stroke-width:1.8;stroke:currentColor; }
    .pic-lbl { font-size:.63rem;color:var(--text-m);font-weight:600;text-transform:uppercase;letter-spacing:.05em; }
    .pic-val { font-size:.85rem;font-weight:600;color:var(--text);margin-top:3px; }
    .p-actions-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:12px; }
    .pact { background:var(--card);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--sh);padding:18px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:.13s; }
    .pact:hover { border-color:var(--blue);background:var(--blue-l);box-shadow:var(--sh-md); }
    .pact-ico { width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
    .pact-ico svg { width:19px;height:19px;stroke:currentColor;fill:none;stroke-width:1.8; }
    .pact-lbl { font-size:.82rem;font-weight:600;color:var(--text); }

    /* ── Icon colors ── */
    .i-bl { background:#dbeafe;color:#3b82f6; }
    .i-tl { background:#ccfbf1;color:#0d9488; }
    .i-vi { background:#ede9fe;color:#7c3aed; }
    .i-am { background:#fef3c7;color:#d97706; }
    .i-sl { background:#f1f5f9;color:#475569; }
    .i-gr { background:#dcfce7;color:#16a34a; }
    .i-ro { background:#ffe4e6;color:#e11d48; }
    .i-or { background:#ffedd5;color:#f97316; }
    .i-in { background:#e0e7ff;color:#4f46e5; }
    .i-cy { background:#cffafe;color:#0891b2; }
    .i-li { background:#ecfccb;color:#65a30d; }
    .i-pk { background:#fce7f3;color:#db2777; }

    /* ── Primary button ── */
    .prim-btn { display:inline-flex;align-items:center;gap:8px;padding:10px 22px;background:var(--blue-d);color:#fff;border:none;border-radius:9px;font-size:.84rem;font-weight:600;cursor:pointer;transition:.14s; }
    .prim-btn:hover { background:var(--blue-dk); }
    .prim-btn svg { width:16px;height:16px;stroke:#fff;fill:none;stroke-width:1.8; }

    /* ── Footer ── */
    .footer { background:var(--blue-dk);color:#fff;padding:32px 48px;margin-top:auto; }
    .footer-inner { display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:32px; }
    .ft-brand { display:flex;align-items:center;gap:12px;margin-bottom:14px; }
    .ft-emblem { width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center; }
    .ft-emblem svg { width:26px;height:26px; }
    .ft-brand-txt h3 { font-family:'Sora',sans-serif;font-size:.9rem;font-weight:700; }
    .ft-brand-txt p { font-size:.7rem;opacity:.65;margin-top:1px; }
    .ft-col h4 { font-size:.78rem;font-weight:700;color:rgba(255,255,255,.9);margin-bottom:12px;text-transform:uppercase;letter-spacing:.06em; }
    .ft-col a { display:block;font-size:.76rem;color:rgba(255,255,255,.6);text-decoration:none;margin-bottom:7px;transition:.13s; }
    .ft-col a:hover { color:#fff; }
    .footer-bottom { margin-top:28px;padding-top:20px;border-top:1px solid rgba(255,255,255,.12);display:flex;justify-content:space-between;align-items:center; }
    .footer-bottom p { font-size:.7rem;opacity:.5; }
    .footer-copy { font-size:.68rem;opacity:.45; }

    /* ── Modal ── */
    .modal-overlay { display:none;position:fixed;inset:0;background:rgba(10,25,40,.52);z-index:2000;align-items:center;justify-content:center; }
    .modal-overlay.open { display:flex; }
    .modal-box { background:#fff;border-radius:var(--r-lg);padding:40px 42px;width:440px;box-shadow:0 20px 60px rgba(45,126,166,.25);position:relative; }
    .modal-close { position:absolute;top:16px;right:16px;background:var(--bg);border:none;border-radius:8px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text-m); }
    .modal-close svg { width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2; }
    .modal-logo { display:flex;align-items:center;gap:12px;margin-bottom:24px; }
    .modal-logo svg { width:38px;height:38px; }
    .modal-logo div h3 { font-family:'Sora',sans-serif;font-size:.95rem;font-weight:700;color:var(--text); }
    .modal-logo div p { font-size:.7rem;color:var(--text-m); }
    .modal-box h2 { font-family:'Sora',sans-serif;font-size:1.4rem;font-weight:700;color:var(--text);margin-bottom:6px; }
    .modal-box > p { font-size:.82rem;color:var(--text-s);margin-bottom:28px; }
    .form-lbl { display:block;font-size:.73rem;font-weight:600;color:var(--text-s);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em; }
    .form-inp { width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:9px;font-size:.86rem;color:var(--text);outline:none;margin-bottom:16px;transition:.13s; }
    .form-inp:focus { border-color:var(--blue); }
    .form-submit { width:100%;padding:13px;background:var(--blue-d);color:#fff;border:none;border-radius:9px;font-size:.88rem;font-weight:700;cursor:pointer;transition:.13s;margin-top:4px; }
    .form-submit:hover { background:var(--blue-dk); }
    .form-forgot { text-align:center;margin-top:12px;font-size:.75rem;color:var(--blue-d);cursor:pointer; }
    .form-divider { display:flex;align-items:center;gap:12px;margin:18px 0; }
    .form-divider::before,.form-divider::after { content:'';flex:1;height:1px;background:var(--border); }
    .form-divider span { font-size:.72rem;color:var(--text-m); }

    /* ── Toast ── */
    .toast { position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(10px);background:var(--blue-dk);color:#fff;padding:10px 22px;border-radius:24px;font-size:.8rem;font-weight:500;opacity:0;pointer-events:none;z-index:3000;white-space:nowrap;transition:all .26s;box-shadow:var(--sh-md); }
    .toast.show { opacity:1;transform:translateX(-50%) translateY(0); }
  `}</style>
);

// ─── Data ────────────────────────────────────────────────────────────────────
const departments = [
  {name:"Computer Science & Engineering",abbr:"CSE",hod:"Prof. A. Ramakrishna",students:360,block:"Block B, 1F-3F",phone:"0891-2844301",email:"cse@auce.ac.in",labs:["AI & ML Lab","Networks Lab","Software Engg Lab","Cyber Security Lab"],desc:"One of AUCE's largest departments offering B.Tech, M.Tech and Ph.D programmes in CSE. Focuses on AI, data science, cloud computing, and systems."},
  {name:"Information Technology",abbr:"IT",hod:"Prof. B. Subrahmanyam",students:180,block:"Block B, GF",phone:"0891-2844302",email:"it@auce.ac.in",labs:["Web Tech Lab","Database Lab"],desc:"IT department with strong industry collaborations offering programmes in web technologies, databases, and enterprise systems."},
  {name:"Electronics & Communication Engineering",abbr:"ECE",hod:"Prof. C. Lakshmi",students:240,block:"Block C, 2F",phone:"0891-2844303",email:"ece@auce.ac.in",labs:["VLSI Lab","DSP Lab","Communication Lab","Embedded Systems Lab"],desc:"ECE offers B.Tech, M.Tech programmes with specialisations in VLSI, embedded systems, and signal processing."},
  {name:"Electrical & Electronics Engineering",abbr:"EEE",hod:"Prof. D. Srinivas",students:180,block:"Block C, 1F",phone:"0891-2844304",email:"eee@auce.ac.in",labs:["Power Systems Lab","Machines Lab","Control Systems Lab"],desc:"EEE department covers power systems, electrical machines, and control engineering with focus on smart grids and renewable energy."},
  {name:"Mechanical Engineering",abbr:"Mech",hod:"Prof. E. Venkata Rao",students:300,block:"Block D, 1F-2F",phone:"0891-2844305",email:"mech@auce.ac.in",labs:["Machine Tools Lab","Thermal Lab","CAD/CAM Lab","Robotics Lab"],desc:"Mechanical Engineering is one of AUCE's oldest departments offering programmes in manufacturing, thermal, and mechatronics."},
  {name:"Civil Engineering",abbr:"Civil",hod:"Prof. F. Anjaneyulu",students:240,block:"Block A, 1F",phone:"0891-2844306",email:"civil@auce.ac.in",labs:["Concrete Lab","Soil Mechanics Lab","Survey Lab","Environmental Lab"],desc:"Civil Engineering covers structural, environmental, and geotechnical engineering. Strong consultancy and research output."},
  {name:"Chemical Engineering",abbr:"ChE",hod:"Prof. G. Sarma",students:120,block:"Block D, GF",phone:"0891-2844307",email:"che@auce.ac.in",labs:["Process Lab","Heat Transfer Lab","Polymer Lab"],desc:"Chemical Engineering with focus on process, polymer, and petrochemical industries."},
  {name:"Metallurgical Engineering",abbr:"MetE",hod:"Prof. H. Murthy",students:60,block:"Block D, 3F",phone:"0891-2844308",email:"mete@auce.ac.in",labs:["Materials Testing Lab","Foundry Lab","Metallography Lab"],desc:"Metallurgical and Materials Engineering focusing on metal processing, alloy design, and failure analysis."},
  {name:"Mining Engineering",abbr:"Mine",hod:"Prof. I. Krishnaswamy",students:60,block:"Block E, 1F",phone:"0891-2844309",email:"mine@auce.ac.in",labs:["Rock Mechanics Lab","Mine Ventilation Lab"],desc:"Mining Engineering dealing with extraction, safety, and sustainability of mineral resources."},
  {name:"Architecture",abbr:"Arch",hod:"Prof. J. Narayanan",students:60,block:"Block F, GF",phone:"0891-2844310",email:"arch@auce.ac.in",labs:["Design Studio","Model Making Lab","Digital Architecture Lab"],desc:"5-year B.Arch programme with studios, design workshops, and active architectural research."},
  {name:"Aerospace Engineering",abbr:"AeroE",hod:"Prof. K. Ranga Rao",students:60,block:"Block F, 1F",phone:"0891-2844311",email:"aeroe@auce.ac.in",labs:["Aerodynamics Lab","Propulsion Lab","Flight Simulation Lab"],desc:"Aerospace Engineering covering aerodynamics, propulsion, and space systems engineering."},
  {name:"Biotechnology",abbr:"BioT",hod:"Prof. L. Padmavathi",students:60,block:"Block F, 2F",phone:"0891-2844312",email:"biot@auce.ac.in",labs:["Microbiology Lab","Genetic Engineering Lab","Bioreactor Lab"],desc:"Biotechnology offering B.Tech in Biotechnology with research in pharmaceutical and agricultural biotech."},
  {name:"Environmental Engineering",abbr:"EnvE",hod:"Prof. M. Gangadhar",students:30,block:"Block G, GF",phone:"0891-2844313",email:"enve@auce.ac.in",labs:["Water Quality Lab","Air Quality Lab"],desc:"Environmental Engineering focusing on water treatment, pollution control, and environmental impact assessment."},
  {name:"Ocean Engineering",abbr:"OcnE",hod:"Prof. N. Srinivasa Rao",students:30,block:"Block G, 1F",phone:"0891-2844314",email:"ocne@auce.ac.in",labs:["Wave Flume Lab","Coastal Modelling Lab"],desc:"Ocean Engineering covering offshore structures, coastal erosion, and marine resource management."},
  {name:"Petroleum Engineering",abbr:"PetE",hod:"Prof. O. Rambabu",students:60,block:"Block H, GF",phone:"0891-2844315",email:"pete@auce.ac.in",labs:["Drilling Lab","Reservoir Simulation Lab"],desc:"Petroleum Engineering with reservoir engineering, drilling technology, and production optimisation."},
  {name:"Electronics & Instrumentation",abbr:"EI",hod:"Prof. Z. Prasad",students:60,block:"Block K, 1F",phone:"0891-2844323",email:"ei@auce.ac.in",labs:["PLC & SCADA Lab","Biomedical Lab"],desc:"Electronics and instrumentation for industrial automation and biomedical applications."},
  {name:"Mathematics",abbr:"Math",hod:"Prof. B. Viswanath",students:180,block:"Block I, GF",phone:"0891-2844317",email:"math@auce.ac.in",labs:["Computing Lab"],desc:"Foundational and advanced mathematics for all engineering programmes."},
  {name:"Physics",abbr:"Phy",hod:"Prof. U. Rani",students:180,block:"Block I, 1F",phone:"0891-2844318",email:"phy@auce.ac.in",labs:["Optics Lab","Material Science Lab"],desc:"M.Sc Physics and applied physics research support for all departments."},
  {name:"Chemistry",abbr:"Chem",hod:"Prof. O. Sharma",students:120,block:"Block I, 2F",phone:"0891-2844319",email:"chem@auce.ac.in",labs:["Analytical Chemistry Lab","Organic Chemistry Lab"],desc:"M.Sc Chemistry and polymer / material chemistry research."},
  {name:"Humanities & Social Sciences",abbr:"HSS",hod:"Prof. W. Krishnamurti",students:100,block:"Block J, GF",phone:"0891-2844320",email:"hss@auce.ac.in",labs:["Language Lab"],desc:"English, Economics, and Social Science for all undergraduate students."},
  {name:"Management Studies",abbr:"MBA",hod:"Prof. X. Lakshmana",students:60,block:"Block J, 1F",phone:"0891-2844321",email:"mba@auce.ac.in",labs:["Business Computing Lab"],desc:"MBA with Finance, Marketing, HR, and Operations specialisations."},
  {name:"Industrial Engineering",abbr:"IndE",hod:"Prof. Y. Venkatesh",students:60,block:"Block K, GF",phone:"0891-2844322",email:"inde@auce.ac.in",labs:["Ergonomics Lab","Operations Research Lab"],desc:"Production planning, quality management, supply chain, and lean manufacturing."},
  {name:"Structural Engineering (PG)",abbr:"SE",hod:"Prof. H. Murthy",students:30,block:"Block A, 2F",phone:"0891-2844324",email:"se@auce.ac.in",labs:["Advanced Structures Lab"],desc:"Structural analysis, earthquake engineering, and FEM — post-graduate."},
  {name:"Energy Systems Engineering",abbr:"EnSE",hod:"Prof. Q. Balasubramaniam",students:40,block:"Block L, GF",phone:"0891-2844325",email:"ense@auce.ac.in",labs:["Renewable Energy Lab","Solar PV Lab"],desc:"Solar, wind, hybrid energy systems, energy storage, and smart grid integration."},
  {name:"Architecture (Interior Design)",abbr:"ID",hod:"Prof. J. Suhasini",students:30,block:"Block F, 3F",phone:"0891-2844326",email:"id@auce.ac.in",labs:["Interior Studio","Material Library"],desc:"Interior Design specialisation under Architecture with focus on space planning and aesthetics."},
];

const buildings = [
  {name:"Administrative Block",type:"Administration",floor:"G+2",block:"Central Campus"},
  {name:"CSE & IT Block",type:"Academic",floor:"G+3",block:"East Wing"},
  {name:"Mechanical Engineering Block",type:"Academic",floor:"G+2",block:"West Wing"},
  {name:"EEE/ECE Block (Block C)",type:"Academic",floor:"G+2",block:"North Wing"},
  {name:"Chemical & Metallurgical (Block D)",type:"Academic",floor:"G+1",block:"South Wing"},
  {name:"Mining Engineering (Block E)",type:"Academic",floor:"G+1",block:"South Campus"},
  {name:"Architecture Block",type:"Academic",floor:"G+2",block:"Design Zone"},
  {name:"Aerospace & Bio-Tech (Block F)",type:"Academic",floor:"G+1",block:"Research Wing"},
  {name:"Environmental & Ocean Eng (Block G)",type:"Academic",floor:"G+1",block:"North East"},
  {name:"Petroleum & Instrumentation (Block H)",type:"Academic",floor:"G+1",block:"East Campus"},
  {name:"Science Departments (Block I)",type:"Academic",floor:"G+2",block:"Central"},
  {name:"Humanities & Management (Block J)",type:"Academic",floor:"G+1",block:"Main Road"},
  {name:"Industrial & EI Engineering (Block K)",type:"Academic",floor:"G+1",block:"North Campus"},
  {name:"Energy Systems Block (Block L)",type:"Research",floor:"G+1",block:"Research Zone"},
  {name:"Central Library",type:"Facility",floor:"G+1",block:"Central Zone"},
  {name:"Research & Labs Complex",type:"Research",floor:"G+2",block:"North East"},
  {name:"Main Auditorium",type:"Events",floor:"Ground",block:"Central South"},
  {name:"Seminar Hall A",type:"Events",floor:"Ground",block:"Admin Block"},
  {name:"Medical Centre",type:"Facility",floor:"Ground",block:"Near Main Gate"},
  {name:"SBI Bank & ATM",type:"Facility",floor:"Ground",block:"Commerce Zone"},
  {name:"Campus Post Office",type:"Facility",floor:"Ground",block:"Central"},
  {name:"Boys Hostel Complex",type:"Residential",floor:"G+3",block:"North Residential"},
  {name:"Girls Hostel Complex",type:"Residential",floor:"G+3",block:"South Residential"},
  {name:"Sports Complex",type:"Sports",floor:"Ground",block:"South Campus"},
  {name:"Central Canteen",type:"Facility",floor:"Ground",block:"Central Campus"},
];

const qrBuildings = [
  {name:"Admin Block",loc:"Central Campus, North End",code:"AUCE-ADM-001"},
  {name:"CSE Block",loc:"East Wing, 2nd Road",code:"AUCE-CSE-002"},
  {name:"Mech Block",loc:"West Wing, 1st Road",code:"AUCE-MEC-003"},
  {name:"EEE/ECE Block",loc:"Block C, Main Road",code:"AUCE-EEC-004"},
  {name:"Central Library",loc:"Central Zone, Ground Floor",code:"AUCE-LIB-005"},
  {name:"Labs Complex",loc:"North East, Research Zone",code:"AUCE-LAB-006"},
  {name:"Auditorium",loc:"Central South, Near Gate 2",code:"AUCE-AUD-007"},
  {name:"Sports Complex",loc:"South Campus, Gate 3",code:"AUCE-SPT-008"},
];

const events = [
  {day:"12",mon:"APR",title:"TECHNOVA 2025 — National Technical Fest",loc:"Main Auditorium & Open Ground",tag:"Technical",desc:"Annual national-level technical festival with paper presentations, hackathon, robotics competitions, and industry talks."},
  {day:"18",mon:"APR",title:"Semester Registration Deadline",loc:"Academic Section / Online Portal",tag:"Academic",desc:"Last date for Odd Semester 2025–26 registration. Late fee applicable after this date."},
  {day:"22",mon:"APR",title:"AUCE Alumni Meet 2025",loc:"Dr. B.R. Ambedkar Hall",tag:"Alumni",desc:"Annual alumni gathering — cultural programme and networking dinner included. Open to all batches."},
  {day:"05",mon:"MAY",title:"Placement Orientation — Final Years",loc:"Seminar Hall, Admin Block",tag:"Placement",desc:"Pre-placement training and company briefing for B.Tech 4th year and M.Tech students."},
  {day:"10",mon:"MAY",title:"Workshop on AI & Deep Learning",loc:"CSE Department, 3rd Floor",tag:"Workshop",desc:"Two-day hands-on workshop by IIT Hyderabad faculty. Limited seats — register via portal."},
  {day:"15",mon:"MAY",title:"Annual Sports Day",loc:"AUCE Sports Ground",tag:"Sports",desc:"Inter-department sports championship — cricket, volleyball, athletics, and chess."},
];

const faqs = [
  {q:"How do I access the 3D campus map?",a:"Click 'Campus Map' in the top navigation or sidebar. The interactive 3D map loads automatically — click any building to view details and directions."},
  {q:"How does QR building access work?",a:"Scan any building entrance QR code using the portal's scanner (QR Access page) or your phone camera. The portal auto-highlights your building and shows its directory."},
  {q:"How do I find a specific department?",a:"Go to the Departments page from the sidebar or top nav. Use the search bar to filter by department name or abbreviation. Click any row to expand full details."},
  {q:"Where is the campus medical centre?",a:"Near the Main Gate, opposite the Admin Block. Open 24×7 for emergencies. Contact: 0891-2844100."},
  {q:"How do I connect to campus Wi-Fi?",a:"Connect to 'AUCE-Student' and authenticate using your roll number and portal password. For issues call IT Help Desk at 0891-2844200."},
  {q:"Where do I pay semester fees?",a:"Online via Profile > Fee Details, or in-person at Accounts Section, Admin Block, Ground Floor."},
  {q:"What are the library working hours?",a:"Monday–Saturday, 8 AM to 8 PM. Digital resources are accessible 24×7 with student login credentials."},
  {q:"How do I submit a grievance?",a:"Use the Student Grievance Portal (Help > Grievance Portal link in footer) or visit Dean of Students Office, Admin Block, Room 105."},
];

const services = [
  {c:"i-bl",n:"Campus Wi-Fi",d:"High-speed internet across all buildings"},
  {c:"i-or",n:"Canteen",d:"3 canteens with veg & non-veg options"},
  {c:"i-gr",n:"Transport",d:"Bus routes to city and suburbs"},
  {c:"i-ro",n:"Medical Centre",d:"24×7 health centre with doctors"},
  {c:"i-tl",n:"Bank & ATM",d:"SBI branch and ATM on campus"},
  {c:"i-sl",n:"Post Office",d:"Campus post office for official mail"},
  {c:"i-am",n:"Hostels",d:"Separate blocks for boys and girls"},
  {c:"i-in",n:"Sports Facilities",d:"Cricket, football, basketball, gym"},
  {c:"i-sl",n:"Print & Xerox",d:"Copy & print services near library"},
  {c:"i-li",n:"Research Lab",d:"Central instrumentation & research"},
  {c:"i-cy",n:"Online Portal",d:"Fee, results & academic portal"},
  {c:"i-vi",n:"Central Library",d:"1 lakh+ books & e-journals"},
];

const bldgInfo = {
  admin:{t:"Administration Block",body:"Central hub of AUCE North Campus. Houses the Principal's Office, Dean of Students, Academic Section, Accounts Office, and Exam Branch.",tags:["Principal Office","Academic Section","Exam Branch","Accounts","G+2 Floors"]},
  cse:{t:"CSE Block",body:"Home to the Department of Computer Science & Engineering and IT. Features state-of-the-art AI labs, networking labs, and high-performance computing clusters.",tags:["AI & ML Lab","Networks Lab","Software Lab","G+3 Floors"]},
  ece:{t:"ECE / EEE Block (Block C)",body:"Houses Electrical & Electronics Engineering (1st floor) and Electronics & Communication Engineering (2nd floor). Features VLSI, DSP, and Power Systems labs.",tags:["VLSI Lab","DSP Lab","Power Systems Lab","G+2 Floors"]},
  mech:{t:"Mechanical Engineering Block",body:"Houses Mechanical Engineering and Industrial Engineering. Equipped with advanced manufacturing, thermal, and robotics laboratories.",tags:["Machine Tools Lab","Thermal Lab","Robotics","G+2 Floors"]},
  library:{t:"Central Library",body:"One of Andhra Pradesh's largest technical libraries. Over 1 lakh books, journals, and digital resources. Air-conditioned reading hall with 400 seats.",tags:["1L+ Books","E-Journals","400 Seats","Digital Resources"]},
  labs:{t:"Research & Labs Complex",body:"Advanced instrumentation and inter-disciplinary project spaces shared across departments. Houses central research labs and specialised equipment.",tags:["Central Research","Material Testing","Instrumentation","G+2 Floors"]},
  audi:{t:"Main Auditorium",body:"Primary venue for convocations, seminars, cultural events, and guest lectures. Capacity: 1200 seats with full AV and air-conditioning.",tags:["1200 Seats","Full AV Setup","AC Hall","Convocation Venue"]},
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function genQR(code) {
  const h = [...code].reduce((a, c) => (a + c.charCodeAt(0)) * 31, 1);
  let cells = '';
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
    if ((r < 4 && c < 4) || (r < 4 && c > 4) || (r > 4 && c < 4)) continue;
    if (((h * (r * 9 + c + 1)) % 13) < 6)
      cells += `<rect x="${c*13+5}" y="${r*13+5}" width="12" height="12" fill="#111" rx="1"/>`;
  }
  const cm = (x, y) =>
    `<rect x="${x}" y="${y}" width="32" height="32" fill="none" stroke="#111" stroke-width="3" rx="2"/>` +
    `<rect x="${x+7}" y="${y+7}" width="18" height="18" fill="#111" rx="1"/>`;
  return `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;"><rect width="128" height="128" fill="white"/>${cells}${cm(5,5)}${cm(91,5)}${cm(5,91)}</svg>`;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const HomeIcon = () => <svg viewBox="0 0 24 24"><path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.55 5.45 21 6 21H9M19 10L21 12M19 10V20C19 20.55 18.55 21 18 21H15M9 21C9 21 9 15 12 15C15 15 15 21 15 21M9 21H15" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const MapIcon = () => <svg viewBox="0 0 24 24"><path d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4" strokeLinejoin="round"/></svg>;
const BookIcon = () => <svg viewBox="0 0 24 24"><path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const PeopleIcon = () => <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round"/></svg>;
const CalIcon = () => <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/><circle cx="8" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="15" r="1" fill="currentColor" stroke="none"/></svg>;
const QRIcon = () => <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M14 20h7M20 14v7" strokeLinecap="round"/><rect x="5" y="5" width="3" height="3" fill="currentColor" rx=".5" stroke="none"/><rect x="16" y="5" width="3" height="3" fill="currentColor" rx=".5" stroke="none"/><rect x="5" y="16" width="3" height="3" fill="currentColor" rx=".5" stroke="none"/></svg>;
const BldgIcon = () => <svg viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M5 21h14M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" strokeLinecap="round"/></svg>;
const UserIcon = () => <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round"/><circle cx="12" cy="7" r="4"/></svg>;
const HelpIcon = () => <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/></svg>;
const ChevRight = () => <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" strokeLinecap="round"/></svg>;
const ChevDown = () => <svg viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round"/></svg>;
const SearchIcon = () => <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>;
const LoginIcon = () => <svg viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const XIcon = () => <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>;

// ─── Brand Emblem SVG ─────────────────────────────────────────────────────────
const BrandEmblem = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#e6f4fa" stroke="#2d7ea6" strokeWidth="3"/>
    <circle cx="50" cy="50" r="38" fill="none" stroke="#4a9ec8" strokeWidth="1.2" strokeDasharray="4 3"/>
    <path d="M22 60 Q22 36 50 36 Q78 36 78 60 L78 70 Q50 60 22 70 Z" fill="#2d7ea6" opacity=".85"/>
    <rect x="48.5" y="33" width="3" height="38" rx="1.5" fill="#1d5f82"/>
    <line x1="28" y1="48" x2="47" y2="44" stroke="white" strokeWidth="1.1" opacity=".6" strokeLinecap="round"/>
    <line x1="28" y1="53" x2="47" y2="50" stroke="white" strokeWidth="1.1" opacity=".6" strokeLinecap="round"/>
    <line x1="28" y1="58" x2="47" y2="56" stroke="white" strokeWidth="1.1" opacity=".6" strokeLinecap="round"/>
    <line x1="72" y1="48" x2="53" y2="44" stroke="white" strokeWidth="1.1" opacity=".6" strokeLinecap="round"/>
    <line x1="72" y1="53" x2="53" y2="50" stroke="white" strokeWidth="1.1" opacity=".6" strokeLinecap="round"/>
    <line x1="72" y1="58" x2="53" y2="56" stroke="white" strokeWidth="1.1" opacity=".6" strokeLinecap="round"/>
    <ellipse cx="50" cy="21" rx="6" ry="9" fill="#f97316" opacity=".9"/>
    <ellipse cx="50" cy="24" rx="3.5" ry="5" fill="#fef3c7" opacity=".8"/>
    <rect x="48.5" y="28" width="3" height="8" rx="1" fill="#b45309"/>
    <text x="50" y="83" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9.5" fontWeight="700" fill="#1d5f82" letterSpacing="2.5">ANDHRA</text>
    <text x="50" y="93" textAnchor="middle" fontFamily="Georgia,serif" fontSize="7.5" fill="#2d7ea6" letterSpacing="1.5">UNIVERSITY</text>
  </svg>
);

// ─── Toast Component ──────────────────────────────────────────────────────────
function Toast({ message, visible }) {
  return <div className={`toast${visible ? ' show' : ''}`}>{message}</div>;
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="ft-brand">
            <div className="ft-emblem"><BrandEmblem /></div>
            <div className="ft-brand-txt"><h3>AU College of Engineering</h3><p>North Campus, Visakhapatnam – 530 003</p></div>
          </div>
          <p style={{fontSize:'.73rem',opacity:.6,lineHeight:1.6}}>Andhra University College of Engineering, established in 1946, is one of India's oldest and most prestigious engineering institutions.</p>
        </div>
        <div className="ft-col"><h4>Quick Links</h4><a href="#">About AUCE</a><a href="#">Admissions</a><a href="#">Academic Calendar</a><a href="#">Examination</a><a href="#">Research</a></div>
        <div className="ft-col"><h4>Campus</h4><a href="#">Campus Map</a><a href="#">Departments</a><a href="#">Hostel</a><a href="#">Sports</a><a href="#">Library</a></div>
        <div className="ft-col"><h4>Contact</h4><a href="#">Principal's Office</a><a href="#">Admissions Office</a><a href="#">Placement Cell</a><a href="#">Alumni Relations</a><a href="#">Grievance Portal</a></div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Andhra University College of Engineering. All rights reserved. | Estd. 1946</p>
        <div className="footer-copy">Privacy Policy · Terms of Use · AUCE Website</div>
      </div>
    </footer>
  );
}

// ─── Campus Map SVG ───────────────────────────────────────────────────────────
function CampusMapSVG({ onBldg }) {
  return (
    <svg viewBox="0 0 900 480" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0d2035"/><stop offset="100%" stopColor="#1b4468"/></linearGradient>
        <linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a5c22"/><stop offset="100%" stopColor="#0f3b14"/></linearGradient>
        <filter id="bs"><feDropShadow dx="4" dy="6" stdDeviation="4" floodColor="rgba(0,0,0,.45)"/></filter>
      </defs>
      <rect width="900" height="480" fill="url(#sg)"/>
      <ellipse cx="450" cy="440" rx="480" ry="100" fill="url(#gg)" opacity=".75"/>
      <rect x="410" y="100" width="80" height="300" fill="#333" rx="3" opacity=".8"/>
      <rect x="80" y="220" width="740" height="60" fill="#333" rx="3" opacity=".8"/>
      <line x1="450" y1="110" x2="450" y2="210" stroke="white" strokeWidth="2" strokeDasharray="12,10" opacity=".35"/>
      <line x1="95" y1="250" x2="400" y2="250" stroke="white" strokeWidth="2" strokeDasharray="12,10" opacity=".35"/>
      <line x1="500" y1="250" x2="805" y2="250" stroke="white" strokeWidth="2" strokeDasharray="12,10" opacity=".35"/>
      <g filter="url(#bs)" onClick={() => onBldg('admin')} style={{cursor:'pointer'}}>
        <rect x="280" y="100" width="340" height="106" fill="#2a6a90" rx="4"/>
        <rect x="280" y="78" width="340" height="106" fill="#4a9ec8" rx="4"/>
        <text x="450" y="138" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="Sora,sans-serif">ADMINISTRATION BLOCK</text>
        <text x="450" y="158" textAnchor="middle" fill="rgba(255,255,255,.8)" fontSize="11" fontFamily="Inter,sans-serif">Principal · Registrar · Accounts · Exam Branch</text>
        <rect x="298" y="88" width="22" height="14" fill="rgba(255,230,100,.65)" rx="1"/>
        <rect x="330" y="88" width="22" height="14" fill="rgba(255,230,100,.5)" rx="1"/>
        <rect x="548" y="88" width="22" height="14" fill="rgba(255,230,100,.65)" rx="1"/>
        <rect x="580" y="88" width="22" height="14" fill="rgba(255,230,100,.5)" rx="1"/>
      </g>
      <g filter="url(#bs)" onClick={() => onBldg('cse')} style={{cursor:'pointer'}}>
        <rect x="60" y="128" width="160" height="86" fill="#215a7a" rx="4"/>
        <rect x="60" y="108" width="160" height="86" fill="#3a88b0" rx="4"/>
        <text x="140" y="155" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Sora,sans-serif">CSE BLOCK</text>
        <text x="140" y="172" textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="10" fontFamily="Inter,sans-serif">CSE · IT</text>
        <rect x="74" y="116" width="16" height="11" fill="rgba(255,230,100,.6)" rx="1"/>
        <rect x="100" y="116" width="16" height="11" fill="rgba(255,230,100,.5)" rx="1"/>
        <rect x="170" y="116" width="16" height="11" fill="rgba(255,230,100,.6)" rx="1"/>
      </g>
      <g filter="url(#bs)" onClick={() => onBldg('ece')} style={{cursor:'pointer'}}>
        <rect x="680" y="128" width="160" height="86" fill="#215a7a" rx="4"/>
        <rect x="680" y="108" width="160" height="86" fill="#3a88b0" rx="4"/>
        <text x="760" y="155" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Sora,sans-serif">ECE / EEE</text>
        <text x="760" y="172" textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="10" fontFamily="Inter,sans-serif">Block C</text>
        <rect x="694" y="116" width="16" height="11" fill="rgba(255,230,100,.6)" rx="1"/>
        <rect x="720" y="116" width="16" height="11" fill="rgba(255,230,100,.5)" rx="1"/>
      </g>
      <g filter="url(#bs)" onClick={() => onBldg('library')} style={{cursor:'pointer'}}>
        <rect x="60" y="310" width="190" height="88" fill="#1a5070" rx="4"/>
        <rect x="60" y="290" width="190" height="88" fill="#2d7ea6" rx="4"/>
        <text x="155" y="335" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Sora,sans-serif">CENTRAL LIBRARY</text>
        <text x="155" y="352" textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="10" fontFamily="Inter,sans-serif">1 Lakh+ Books · 400 Seats</text>
        <rect x="74" y="298" width="16" height="11" fill="rgba(255,230,100,.6)" rx="1"/>
        <rect x="100" y="298" width="16" height="11" fill="rgba(255,230,100,.5)" rx="1"/>
        <rect x="200" y="298" width="16" height="11" fill="rgba(255,230,100,.6)" rx="1"/>
      </g>
      <g filter="url(#bs)" onClick={() => onBldg('mech')} style={{cursor:'pointer'}}>
        <rect x="650" y="310" width="190" height="88" fill="#1a5070" rx="4"/>
        <rect x="650" y="290" width="190" height="88" fill="#2d7ea6" rx="4"/>
        <text x="745" y="335" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Sora,sans-serif">MECH BLOCK</text>
        <text x="745" y="352" textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="10" fontFamily="Inter,sans-serif">Mechanical · Industrial Engg</text>
        <rect x="664" y="298" width="16" height="11" fill="rgba(255,230,100,.6)" rx="1"/>
        <rect x="690" y="298" width="16" height="11" fill="rgba(255,230,100,.5)" rx="1"/>
      </g>
      <g filter="url(#bs)" onClick={() => onBldg('labs')} style={{cursor:'pointer'}}>
        <rect x="320" y="310" width="260" height="88" fill="#1a5070" rx="4"/>
        <rect x="320" y="290" width="260" height="88" fill="#2d7ea6" rx="4"/>
        <text x="450" y="335" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Sora,sans-serif">RESEARCH & LABS COMPLEX</text>
        <rect x="336" y="298" width="16" height="11" fill="rgba(255,230,100,.6)" rx="1"/>
        <rect x="362" y="298" width="16" height="11" fill="rgba(255,230,100,.5)" rx="1"/>
      </g>
      <g filter="url(#bs)" onClick={() => onBldg('audi')} style={{cursor:'pointer'}}>
        <rect x="310" y="405" width="280" height="64" fill="#16405a" rx="4"/>
        <rect x="310" y="384" width="280" height="64" fill="#266888" rx="4"/>
        <ellipse cx="450" cy="384" rx="70" ry="22" fill="#2d7ea6"/>
        <text x="450" y="420" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Sora,sans-serif">MAIN AUDITORIUM</text>
        <text x="450" y="436" textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="10" fontFamily="Inter,sans-serif">1200 Seats · Full AV</text>
      </g>
      <circle cx="278" cy="306" r="22" fill="#1a6020" opacity=".9"/><circle cx="272" cy="294" r="16" fill="#268030" opacity=".85"/>
      <circle cx="624" cy="306" r="20" fill="#1a6020" opacity=".9"/><circle cx="618" cy="294" r="14" fill="#268030" opacity=".85"/>
      <circle cx="240" cy="210" r="18" fill="#1a6020" opacity=".85"/>
      <circle cx="660" cy="210" r="18" fill="#1a6020" opacity=".85"/>
      <circle cx="450" cy="210" r="16" fill="#1a6020" opacity=".8"/>
      <g transform="translate(860,42)">
        <circle r="28" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.2)" strokeWidth="1.5"/>
        <text y="-10" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">N</text>
        <text y="18" textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize="10">S</text>
        <text x="-17" y="5" textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize="10">W</text>
        <text x="18" y="5" textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize="10">E</text>
        <polygon points="0,-18 4,0 0,5 -4,0" fill="#ef4444" opacity=".85"/>
        <polygon points="0,5 4,0 0,18 -4,0" fill="rgba(255,255,255,.6)"/>
      </g>
    </svg>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────
function HomePage({ goPage }) {
  return (
    <div style={{display:'flex',flexDirection:'column',flex:1}}>
      <div className="hero">
        <h2>Welcome to AUCE Smart Campus Portal</h2>
        <p>Navigate the North Campus with interactive 3D maps, access all campus services, explore departments, and stay updated with events and campus information.</p>
        <div className="hero-meta">
          <span className="hero-chip">25 Departments</span>
          <span className="hero-chip">3D Navigation</span>
          <span className="hero-chip">QR Building Access</span>
          <span className="hero-chip">North Campus · Visakhapatnam</span>
        </div>
      </div>
      <div className="page-body">
        <div className="stats-row">
          <div className="stat-card"><div className="stat-ico i-bl"><BookIcon /></div><div><div className="stat-num">25</div><div className="stat-lbl">Departments</div></div></div>
          <div className="stat-card"><div className="stat-ico i-gr"><PeopleIcon /></div><div><div className="stat-num">6,000+</div><div className="stat-lbl">Students Enrolled</div></div></div>
          <div className="stat-card"><div className="stat-ico i-am"><BldgIcon /></div><div><div className="stat-num">25</div><div className="stat-lbl">Campus Buildings</div></div></div>
          <div className="stat-card"><div className="stat-ico i-vi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489" strokeLinecap="round"/></svg></div><div><div className="stat-num">500+</div><div className="stat-lbl">Faculty Members</div></div></div>
        </div>
        <div>
          <div className="sec-hdr"><div className="sec-title">Quick Access</div></div>
          <div className="qa-grid">
            <div className="qa-card" onClick={() => goPage('map')}><div className="qa-ico i-bl"><MapIcon /></div><div className="qa-lbl">Campus Map</div><div className="qa-sub">Interactive 3D navigation</div></div>
            <div className="qa-card" onClick={() => goPage('services')}><div className="qa-ico i-tl"><BldgIcon /></div><div className="qa-lbl">Services</div><div className="qa-sub">Campus facilities</div></div>
            <div className="qa-card" onClick={() => goPage('departments')}><div className="qa-ico i-vi"><BookIcon /></div><div className="qa-lbl">Departments</div><div className="qa-sub">All 25 academic departments</div></div>
            <div className="qa-card" onClick={() => goPage('events')}><div className="qa-ico i-am"><CalIcon /></div><div className="qa-lbl">Events</div><div className="qa-sub">Upcoming campus events</div></div>
            <div className="qa-card" onClick={() => goPage('qr')}><div className="qa-ico i-sl"><QRIcon /></div><div className="qa-lbl">QR Access</div><div className="qa-sub">Building QR code access</div></div>
            <div className="qa-card" onClick={() => goPage('directory')}><div className="qa-ico i-gr"><PeopleIcon /></div><div className="qa-lbl">Directory</div><div className="qa-sub">Faculty & staff contacts</div></div>
          </div>
        </div>
        <div>
          <div className="sec-hdr"><div className="sec-title">Campus Notices</div><button className="sec-link">View all <ChevRight /></button></div>
          <div className="notices-grid">
            <div className="notice-card"><span className="ntag nt-b">Academic</span><h4>Semester Registration Open</h4><p>Registration for Odd Semester 2025–26 is now open. Visit the Academic Section or use the portal to register before the deadline.</p></div>
            <div className="notice-card"><span className="ntag nt-t">Smart Campus</span><h4>Smart Campus Phase 2 Launch</h4><p>QR-based building access and 3D navigation now live for all buildings on North Campus. Scan QR codes at building entrances.</p></div>
            <div className="notice-card"><span className="ntag nt-o">Placement</span><h4>Campus Placement Drive — May 2025</h4><p>TCS, Infosys and Wipro campus placement drive scheduled. Final year students must register by April 20, 2025.</p></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function MapPage({ showToast }) {
  const [mapInfo, setMapInfo] = useState({t:"AUCE North Campus — Interactive 3D Map", body:"Click on any building in the 3D view or use the landmark list on the right to explore buildings, view floor plans, and get navigation directions.", tags:[]});
  const [activeFilter, setActiveFilter] = useState('All Buildings');

  const handleBldg = (id) => {
    const info = bldgInfo[id];
    if (info) { setMapInfo(info); showToast('Navigating to ' + info.t); }
  };

  const filters = ['All Buildings','Academic','Facilities','Labs & Research','Administration','Residential'];

  return (
    <div style={{display:'flex',flexDirection:'column',flex:1}}>
      <div className="hero"><h2>Campus Map</h2><p>Explore the AUCE North Campus in interactive 3D. Click on any building to view details, get directions, and access building-specific information.</p></div>
      <div className="page-body">
        <div className="map-layout">
          <div className="map-wrap">
            <div className="map-3d"><CampusMapSVG onBldg={handleBldg} /></div>
            <div className="map-filters">
              {filters.map(f => <button key={f} className={`mfbtn${activeFilter===f?' active':''}`} onClick={() => { setActiveFilter(f); showToast('Showing: '+f); }}>{f}</button>)}
            </div>
            <div className="map-info-panel">
              <h3>{mapInfo.t}</h3>
              <p>{mapInfo.body}</p>
              {mapInfo.tags && mapInfo.tags.length > 0 && <div className="map-tags">{mapInfo.tags.map(t => <span key={t} className="mtag">{t}</span>)}</div>}
            </div>
          </div>
          <div className="map-side">
            <div className="landmark-card">
              <div className="landmark-title">Buildings & Landmarks</div>
              {[['admin','Admin Block','Administration'],['cse','CSE Block','Academic'],['ece','ECE / EEE Block','Academic'],['mech','Mech Block','Academic'],['library','Central Library','Facility'],['labs','Labs Complex','Research'],['audi','Auditorium','Events']].map(([id,name,type]) => (
                <div key={id} className="lm-item" onClick={() => handleBldg(id)}>
                  <div className="lm-dot"></div><div className="lm-name">{name}</div><div className="lm-type">{type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function DepartmentsPage({ showToast }) {
  const [q, setQ] = useState('');
  const [expanded, setExpanded] = useState(null);
  const filtered = departments.filter(d => d.name.toLowerCase().includes(q) || d.abbr.toLowerCase().includes(q));

  return (
    <div style={{display:'flex',flexDirection:'column',flex:1}}>
      <div className="hero"><h2>Departments</h2><p>Explore all 25 academic departments of AUCE North Campus. Click any department to view full details, faculty, labs, and contact information.</p></div>
      <div className="page-body">
        <div>
          <div className="dir-toolbar">
            <div className="search-box">
              <span className="s-ico"><SearchIcon /></span>
              <input type="text" placeholder="Search departments by name or abbreviation..." value={q} onChange={e => setQ(e.target.value.toLowerCase())} />
            </div>
          </div>
        </div>
        <div className="dir-table">
          <div className="dir-row dept-row dir-head" style={{cursor:'default'}}>
            <div></div><div className="dir-cell">Department Name</div><div className="dir-cell">Head of Department</div><div className="dir-cell">Students</div><div className="dir-cell">Block / Location</div><div></div>
          </div>
          {filtered.map((d, i) => (
            <div key={d.abbr}>
              <div className="dir-row dept-row" onClick={() => setExpanded(expanded === i ? null : i)}>
                <div><div className="dir-ava i-vi"><BookIcon /></div></div>
                <div><div className="dir-cell bold">{d.name}</div><div className="dir-cell muted">{d.abbr}</div></div>
                <div className="dir-cell">{d.hod}</div>
                <div className="dir-cell">{d.students}</div>
                <div><span className="type-chip">{d.block}</span></div>
                <div className="dir-chev" style={{transform: expanded===i ? 'rotate(180deg)' : 'none', transition:'.2s'}}><ChevDown /></div>
              </div>
              {expanded === i && (
                <div className="dept-expand open">
                  <p><strong>About:</strong> {d.desc}</p>
                  <p><strong>HoD:</strong> {d.hod} &nbsp;·&nbsp; <strong>📞</strong> {d.phone} &nbsp;·&nbsp; <strong>📧</strong> {d.email}</p>
                  <div className="de-grid">{d.labs.map(l => <span key={l} className="de-item">🔬 {l}</span>)}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function DirectoryPage({ showToast }) {
  const [activeTab, setActiveTab] = useState('b');
  const [q, setQ] = useState('');
  const [expandedD, setExpandedD] = useState(null);

  const filteredBuildings = buildings.filter(b => b.name.toLowerCase().includes(q) || b.type.toLowerCase().includes(q) || b.block.toLowerCase().includes(q));
  const filteredDepts = departments.filter(d => d.name.toLowerCase().includes(q) || d.abbr.toLowerCase().includes(q));

  return (
    <div style={{display:'flex',flexDirection:'column',flex:1}}>
      <div className="hero">
        <div className="hero-row"><PeopleIcon /><h2>Campus Directory</h2></div>
        <p>Find buildings, departments, faculty, and staff. Search by name, department, or building type.</p>
      </div>
      <div className="page-body">
        <div className="dir-toolbar">
          <div className="search-box">
            <span className="s-ico"><SearchIcon /></span>
            <input type="text" placeholder="Search buildings or departments..." value={q} onChange={e => { setQ(e.target.value.toLowerCase()); setExpandedD(null); }} />
          </div>
          <div className="tab-row">
            <button className={`tab-btn${activeTab==='b'?' active':''}`} onClick={() => setActiveTab('b')}><BldgIcon />Buildings (25)</button>
            <button className={`tab-btn${activeTab==='d'?' active':''}`} onClick={() => setActiveTab('d')}><BookIcon />Departments (25)</button>
          </div>
        </div>
        {activeTab === 'b' && (
          <div className="dir-table">
            <div className="dir-row bldg-row dir-head" style={{cursor:'default'}}><div></div><div className="dir-cell">Building Name</div><div className="dir-cell">Zone / Block</div><div className="dir-cell">Floors</div><div className="dir-cell">Type</div><div></div></div>
            {filteredBuildings.map(b => (
              <div key={b.name} className="dir-row bldg-row" onClick={() => showToast(b.name + ' — ' + b.block)}>
                <div><div className="dir-ava i-bl"><BldgIcon /></div></div>
                <div><div className="dir-cell bold">{b.name}</div></div>
                <div className="dir-cell muted">{b.block}</div>
                <div className="dir-cell muted">{b.floor}</div>
                <div><span className="type-chip">{b.type}</span></div>
                <div className="dir-chev"><ChevRight /></div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'd' && (
          <div className="dir-table">
            <div className="dir-row dept-row dir-head" style={{cursor:'default'}}><div></div><div className="dir-cell">Department</div><div className="dir-cell">Head of Department</div><div className="dir-cell">Students</div><div className="dir-cell">Block</div><div></div></div>
            {filteredDepts.map((d, i) => (
              <div key={d.abbr}>
                <div className="dir-row dept-row" onClick={() => setExpandedD(expandedD===i?null:i)}>
                  <div><div className="dir-ava i-vi"><BookIcon /></div></div>
                  <div><div className="dir-cell bold">{d.name}</div><div className="dir-cell muted">{d.abbr}</div></div>
                  <div className="dir-cell">{d.hod}</div>
                  <div className="dir-cell">{d.students}</div>
                  <div><span className="type-chip">{d.block}</span></div>
                  <div className="dir-chev" style={{transform:expandedD===i?'rotate(180deg)':'none',transition:'.2s'}}><ChevDown /></div>
                </div>
                {expandedD===i && <div className="dept-expand open"><p>{d.desc}</p><p><strong>HoD:</strong> {d.hod} · 📞 {d.phone} · 📧 {d.email}</p><div className="de-grid">{d.labs.map(l=><span key={l} className="de-item">🔬 {l}</span>)}</div></div>}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

function QRPage({ showToast }) {
  return (
    <div style={{display:'flex',flexDirection:'column',flex:1}}>
      <div className="hero">
        <div className="hero-row"><QRIcon /><h2>QR Building Access</h2></div>
        <p>Scan QR codes at building entrances to instantly navigate, access building directories, and view schedules. Each building has a unique QR code.</p>
        <div className="hero-meta">
          <button className="prim-btn" onClick={() => showToast('QR Scanner activated!')}><QRIcon />Open QR Scanner</button>
        </div>
      </div>
      <div className="page-body">
        <div>
          <div className="sec-hdr"><div className="sec-title">Building QR Codes</div></div>
          <div className="qr-layout">
            {qrBuildings.map(b => (
              <div key={b.code} className="qr-card" onClick={() => showToast(b.code + ' — ' + b.name)}>
                <div className="qr-box" dangerouslySetInnerHTML={{__html: genQR(b.code)}} />
                <div className="qr-name">{b.name}</div>
                <div className="qr-loc">📍 {b.loc}</div>
                <div className="qr-code-tag">{b.code}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="sec-hdr"><div className="sec-title">How QR Access Works</div></div>
          <div className="notices-grid">
            <div className="notice-card"><h4>1. Scan at Building Entrance</h4><p>Every campus building has a unique QR code placed at its entrance. Point your phone camera or use the portal's scanner to read it.</p></div>
            <div className="notice-card"><h4>2. Auto-Navigate in 3D</h4><p>The smart campus portal automatically opens the 3D map, highlights your scanned building, and shows the internal floor directory.</p></div>
            <div className="notice-card"><h4>3. Access Building Info</h4><p>View room directories, faculty offices, lab schedules, timetables, and building-specific facilities and services.</p></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function EventsPage({ showToast, goPage }) {
  return (
    <div style={{display:'flex',flexDirection:'column',flex:1}}>
      <div className="hero">
        <div className="hero-row"><CalIcon /><h2>Campus Events</h2></div>
        <p>Stay updated with upcoming academic events, technical fests, placement drives, workshops, and cultural programmes at AUCE.</p>
      </div>
      <div className="page-body">
        <div className="events-layout">
          <div>
            <div className="sec-hdr"><div className="sec-title">Upcoming Events</div></div>
            <div className="events-list">
              {events.map((e, i) => (
                <div key={i} className="ev-card" onClick={() => showToast(e.title)}>
                  <div className="ev-date"><div className="ev-day">{e.day}</div><div className="ev-mon">{e.mon}</div></div>
                  <div className="ev-info"><h4>{e.title}</h4><p>📍 {e.loc}</p><p style={{marginTop:4}}>{e.desc}</p><span className="ev-tag">{e.tag}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="ev-side">
            <div className="ev-side-card">
              <h4>Event Categories</h4>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {[['i-bl','Technical'],['i-vi','Academic'],['i-gr','Placement'],['i-or','Sports']].map(([cls,label]) => (
                  <div key={label} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 12px',background:'var(--bg)',borderRadius:8,cursor:'pointer'}} onClick={() => showToast('Filtering: '+label)}>
                    <div className={`qa-ico ${cls}`} style={{width:32,height:32,borderRadius:8}}><CalIcon /></div>
                    <span style={{fontSize:'.82rem',fontWeight:600}}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="ev-side-card">
              <h4>Important Dates</h4>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {[['18','APR','Registration Deadline','Semester Registration'],['05','MAY','Placement Orientation','Final year students'],['15','MAY','Annual Sports Day','AUCE Sports Ground']].map(([d,m,t,s]) => (
                  <div key={t} style={{display:'flex',gap:12,alignItems:'center'}}>
                    <div style={{background:'var(--blue-d)',color:'#fff',borderRadius:8,padding:'6px 9px',textAlign:'center',minWidth:42}}>
                      <div style={{fontSize:'1.1rem',fontWeight:700,lineHeight:1}}>{d}</div>
                      <div style={{fontSize:'.58rem',fontWeight:700,opacity:.9}}>{m}</div>
                    </div>
                    <div><div style={{fontSize:'.82rem',fontWeight:600,color:'var(--text)'}}>{t}</div><div style={{fontSize:'.72rem',color:'var(--text-m)'}}>{s}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ServicesPage({ showToast }) {
  const svcIcons = [
    <svg key="wifi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" strokeLinecap="round"/></svg>,
    <svg key="cart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="bus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="med" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="bank" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20" strokeLinecap="round"/></svg>,
    <svg key="post" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round"/></svg>,
    <svg key="hostel" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="sports" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="print" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" strokeLinecap="round"/></svg>,
    <svg key="lab" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="portal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0H3" strokeLinecap="round"/></svg>,
    <svg key="lib" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><BookIcon /></svg>,
  ];

  return (
    <div style={{display:'flex',flexDirection:'column',flex:1}}>
      <div className="hero"><h2>Campus Services</h2><p>Access all AUCE North Campus facilities and services from one centralised portal.</p></div>
      <div className="page-body">
        <div>
          <div className="sec-hdr"><div className="sec-title">All Campus Services</div></div>
          <div className="svc-grid">
            {services.map((s, i) => (
              <div key={s.n} className="svc-card" onClick={() => showToast('Opening ' + s.n + '...')}>
                <div className={`svc-ico ${s.c}`}>{svcIcons[i] || <BldgIcon />}</div>
                <div className="svc-name">{s.n}</div>
                <div className="svc-desc">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function HelpPage({ goPage, showToast }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{display:'flex',flexDirection:'column',flex:1}}>
      <div className="hero">
        <div className="hero-row"><HelpIcon /><h2>Help & Support</h2></div>
        <p>Get help navigating the campus portal, find emergency contacts, and browse frequently asked questions.</p>
      </div>
      <div className="page-body">
        <div className="help-layout">
          <div className="help-main">
            <div className="guide-card">
              <div className="guide-hdr">Quick Start Guide</div>
              {[['map','Campus Map','Navigate campus in interactive 3D','i-bl'],['departments','Departments','Browse all 25 departments and faculty','i-vi'],['events','Events','View upcoming campus events','i-am'],['qr','QR Access','Scan building QR codes for instant info','i-sl']].map(([page,title,desc,cls]) => (
                <div key={page} className="guide-row" onClick={() => goPage(page)}>
                  <div className={`g-ico ${cls}`}><MapIcon /></div>
                  <div className="g-txt"><h4>{title}</h4><p>{desc}</p></div>
                  <div className="g-chev"><ChevRight /></div>
                </div>
              ))}
            </div>
            <div className="faq-card">
              <div className="faq-hdr"><HelpIcon />Frequently Asked Questions</div>
              {faqs.map((f, i) => (
                <div key={i} className="faq-item">
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                    {f.q}
                    <span className="f-arr" style={{transform:openFaq===i?'rotate(180deg)':'none',transition:'.2s'}}><ChevDown /></span>
                  </button>
                  {openFaq===i && <div className="faq-a open">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
          <div className="help-side">
            <div style={{background:'var(--card)',borderRadius:'var(--r-lg)',border:'1px solid var(--border)',boxShadow:'var(--sh)',padding:'20px'}}>
              <div style={{fontFamily:"'Sora',sans-serif",fontSize:'.95rem',fontWeight:700,color:'var(--text)',marginBottom:14}}>Emergency Contacts</div>
              <div className="con-grid">
                {[['📞','Principal','Admin Block','0891-2844100'],['🚑','Medical','Near Gate','0891-2844111'],['🔧','IT Helpdesk','Block B','0891-2844200'],['🚨','Security','Main Gate','0891-2844000']].map(([icon,name,loc,tel]) => (
                  <div key={name} className="con-card">
                    <div style={{fontSize:'1.4rem',marginBottom:6}}>{icon}</div>
                    <h4>{name}</h4><p>{loc}</p><a href={`tel:${tel}`}>{tel}</a>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:'var(--card)',borderRadius:'var(--r-lg)',border:'1px solid var(--border)',boxShadow:'var(--sh)',padding:'20px'}}>
              <div style={{fontFamily:"'Sora',sans-serif",fontSize:'.95rem',fontWeight:700,color:'var(--text)',marginBottom:14}}>Quick Actions</div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {['Report an Issue','Submit Grievance','Request Wi-Fi Help','Fee Enquiry'].map(a => (
                  <button key={a} style={{padding:'10px 16px',border:'1.5px solid var(--border)',borderRadius:9,background:'#fff',cursor:'pointer',fontSize:'.83rem',fontWeight:600,color:'var(--text-s)',textAlign:'left',transition:'.13s'}} onClick={() => showToast(a + ' — Redirecting...')}>{a}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ProfilePage({ showToast }) {
  return (
    <div style={{display:'flex',flexDirection:'column',flex:1}}>
      <div className="hero"><h2>My Profile</h2><p>View and manage your student profile, academic records, and portal preferences.</p></div>
      <div className="page-body">
        <div className="profile-layout">
          <div className="profile-card">
            <div className="profile-hero-sec">
              <button className="p-edit-btn"><svg viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round"/></svg>Edit</button>
              <div className="p-ava"><UserIcon /><button className="p-cam"><svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeLinecap="round"/><circle cx="12" cy="13" r="4"/></svg></button></div>
              <h2>Ravi Kumar Sharma</h2>
              <p>19CS0134 · B.Tech CSE, 4th Year</p>
              <div className="p-badges"><span className="pbdg">AUCE Student</span><span className="pbdg">CSE Dept</span><span className="pbdg">2020–24 Batch</span></div>
            </div>
            <div className="p-info-list">
              {[['📧','Email','ravi.sharma@auce.ac.in'],['📞','Phone','+91 99876 54321'],['🏠','Address','Boys Hostel, Room 214'],['🎓','Programme','B.Tech (CSE)'],['🗓️','Admitted','August 2020'],['📊','CGPA','8.74 / 10']].map(([icon,lbl,val]) => (
                <div key={lbl} className="p-info-row">
                  <div style={{fontSize:'1.1rem'}}>{icon}</div>
                  <div><div className="pi-lbl">{lbl}</div><div className="pi-val">{val}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="profile-right">
            <div className="pinfo-box">
              <div className="pinfo-ttl">Academic Information</div>
              <div className="pinfo-grid">
                {[['Roll Number','19CS0134'],['Department','Computer Science'],['Section','A'],['Semester','VIII'],['Batch','2020–2024'],['Advisor','Prof. A. Ramakrishna']].map(([lbl,val]) => (
                  <div key={lbl} className="pic"><div className="pic-lbl">{lbl}</div><div className="pic-val">{val}</div></div>
                ))}
              </div>
            </div>
            <div className="pinfo-box">
              <div className="pinfo-ttl">Quick Actions</div>
              <div style={{padding:'16px 20px'}}>
                <div className="p-actions-grid">
                  {[['i-bl','Fee Details','View & Pay'],['i-vi','Results','Semester Grades'],['i-am','Attendance','View Records'],['i-tl','Hall Ticket','Download'],['i-gr','Bonafide','Request Cert'],['i-or','Hostel','Room Details']].map(([cls,lbl,sub]) => (
                    <div key={lbl} className="pact" onClick={() => showToast('Opening '+lbl+'...')}>
                      <div className={`pact-ico ${cls}`}><BldgIcon /></div>
                      <div><div className="pact-lbl">{lbl}</div><div style={{fontSize:'.72rem',color:'var(--text-m)',marginTop:2}}>{sub}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ─── Login Modal ──────────────────────────────────────────────────────────────
function LoginModal({ open, onClose, onLogin }) {
  return (
    <div className={`modal-overlay${open?' open':''}`} onClick={e => { if (e.target.className.includes('modal-overlay')) onClose(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}><XIcon /></button>
        <div className="modal-logo">
          <div style={{width:38,height:38,borderRadius:'50%',background:'var(--blue-l)',border:'2px solid var(--blue-m)',display:'flex',alignItems:'center',justifyContent:'center'}}><BrandEmblem /></div>
          <div><h3>AUCE Smart Campus</h3><p>North Campus Portal</p></div>
        </div>
        <h2>Sign In</h2>
        <p>Enter your student credentials to access the smart campus portal and personalised features.</p>
        <label className="form-lbl">Roll Number / Email</label>
        <input className="form-inp" type="text" placeholder="e.g. 19CS0134 or email@auce.ac.in" />
        <label className="form-lbl">Password</label>
        <input className="form-inp" type="password" placeholder="Enter your portal password" />
        <button className="form-submit" onClick={onLogin}>Sign In to Portal</button>
        <div className="form-forgot">Forgot password? Reset via Student Portal</div>
        <div className="form-divider"><span>or</span></div>
        <button style={{width:'100%',padding:11,border:'1.5px solid var(--border)',borderRadius:9,background:'#fff',cursor:'pointer',fontSize:'.84rem',fontWeight:600,color:'var(--text-s)'}} onClick={onLogin}>Continue as Guest</button>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('home');
  const [loginOpen, setLoginOpen] = useState(false);
  const [toast, setToast] = useState({ msg:'', visible:false });
  let toastTimer = null;

  const showToast = (msg) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToast({ msg, visible:true });
    toastTimer = setTimeout(() => setToast(t => ({...t, visible:false})), 2600);
  };

  const goPage = (id) => { setPage(id); window.scrollTo(0,0); };

  const navItems = [
    { section:'Navigation' },
    { id:'home', label:'Home', icon:<HomeIcon /> },
    { id:'map', label:'Campus Map', icon:<MapIcon /> },
    { section:'Academic' },
    { id:'departments', label:'Departments', icon:<BookIcon />, badge:'25' },
    { id:'directory', label:'Directory', icon:<PeopleIcon /> },
    { id:'events', label:'Events', icon:<CalIcon /> },
    { section:'Campus' },
    { id:'services', label:'Services', icon:<BldgIcon /> },
    { id:'qr', label:'QR Access', icon:<QRIcon /> },
    { section:'Account' },
    { id:'profile', label:'My Profile', icon:<UserIcon /> },
    { id:'help', label:'Help & Support', icon:<HelpIcon /> },
  ];

  const topLinks = ['home','map','departments','events','help'];

  const renderPage = () => {
    const props = { goPage, showToast };
    switch(page) {
      case 'home': return <HomePage {...props} />;
      case 'map': return <MapPage {...props} />;
      case 'departments': return <DepartmentsPage {...props} />;
      case 'directory': return <DirectoryPage {...props} />;
      case 'qr': return <QRPage {...props} />;
      case 'events': return <EventsPage {...props} />;
      case 'services': return <ServicesPage {...props} />;
      case 'help': return <HelpPage {...props} />;
      case 'profile': return <ProfilePage {...props} />;
      default: return <HomePage {...props} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      {/* Top Nav */}
      <header className="topnav">
        <button className="topnav-login" onClick={() => setLoginOpen(true)}>
          <LoginIcon />Login / Sign In
        </button>
        <div className="topnav-div"></div>
        <div className="topnav-brand">
          <div className="brand-emblem"><BrandEmblem /></div>
          <div className="brand-text"><h1>AU College of Engineering</h1><p>North Campus, Visakhapatnam</p></div>
        </div>
        <div className="topnav-links">
          {topLinks.map(id => (
            <button key={id} className={`tnl${page===id?' active':''}`} onClick={() => goPage(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g,' $1')}
            </button>
          ))}
          <div className="topnav-div"></div>
          <span className="topnav-badge">SMART CAMPUS</span>
        </div>
      </header>

      {/* Layout */}
      <div className="layout">
        {/* Sidebar */}
        <aside className="sidebar">
          {navItems.map((item, i) => {
            if (item.section) return <div key={i} className="sb-section">{item.section}</div>;
            return (
              <button key={item.id} className={`sb-item${page===item.id?' active':''}`} onClick={() => goPage(item.id)}>
                {item.icon}
                {item.label}
                {item.badge && <span className="sb-badge">{item.badge}</span>}
              </button>
            );
          })}
        </aside>

        {/* Main */}
        <main className="main">{renderPage()}</main>
      </div>

      {/* Login Modal */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={() => { setLoginOpen(false); showToast('Welcome back! Logged in successfully.'); }} />

      {/* Toast */}
      <Toast message={toast.msg} visible={toast.visible} />
    </>
  );
}