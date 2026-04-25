/* ─── Loader ─── */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('fade-out');
    }, 2000);
});

/* ─── Custom cursor ─── */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px'; });
(function animRing() {
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
})();

/* ─── Nav toggle ─── */
document.getElementById('navToggle').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
}));

/* ─── Particle canvas ─── */
(function () {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, pts = [];
    const NUM = 72, CONNECT = 120, COLORS = ['rgba(99,102,241,.7)', 'rgba(236,72,153,.6)', 'rgba(6,182,212,.6)', 'rgba(245,158,11,.5)'];
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', () => { resize(); init(); });
    function init() {
        pts = [];
        for (let i = 0; i < NUM; i++) pts.push({
            x: Math.random() * W, y: Math.random() * H,
            vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
            r: Math.random() * 2 + 1, c: COLORS[Math.floor(Math.random() * COLORS.length)]
        });
    }
    init();
    function draw() {
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < pts.length; i++) {
            const p = pts[i];
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.c; ctx.fill();
            for (let j = i + 1; j < pts.length; j++) {
                const q = pts[j];
                const d = Math.hypot(p.x - q.x, p.y - q.y);
                if (d < CONNECT) {
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = p.c.replace('.7', String((1 - d / CONNECT) * .25));
                    ctx.lineWidth = .6; ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
})();

/* ─── Skill bars via IntersectionObserver ─── */
(function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const bar = e.target.querySelector('.bar-fill');
                const pct = e.target.dataset.pct;
                if (bar) bar.style.width = pct + '%';
                observer.unobserve(e.target);
            }
        });
    }, { threshold: .3 });
    document.querySelectorAll('.skill-item').forEach(el => observer.observe(el));
})();

/* ─── Scroll reveal ─── */
(function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: .15 });
    document.querySelectorAll('.tl-item,.proj-card,.edu-card').forEach(el => observer.observe(el));
})();