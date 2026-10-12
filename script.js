/* ── PAGE LOADER ── */
(function () {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    window.addEventListener('load', function () {
        setTimeout(function () { loader.classList.add('hide'); }, 400);
        loader.addEventListener('transitionend', function () { loader.remove(); }, { once: true });
    });
})();

/* ── SCROLL REVEAL ── */
(function () {
    const sections = document.querySelectorAll('section');
    sections.forEach(function (section) {
        if (section.matches('.reveal, .reveal-group')) return;
        if (section.querySelector('.reveal, .reveal-group')) return;
        section.classList.add('reveal');
    });

    document.querySelectorAll('.offerings-heading, .offerings-grid').forEach(function (el) {
        if (el.classList.contains('offerings-heading')) {
            el.classList.add('reveal');
        } else {
            el.classList.add('reveal-group');
        }
    });

    const targets = document.querySelectorAll('.reveal, .reveal-group');
    if (!('IntersectionObserver' in window)) {
        targets.forEach(function (el) { el.classList.add('visible'); });
        return;
    }

    const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    targets.forEach(function (el) {
        io.observe(el);
    });
})();

/* ── NAV + ACTIVE LINKS ── */
(function () {
    const header = document.getElementById('header');
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const links = nav.querySelectorAll('li a');

    // Solid header after scrolling past the top
    function onScroll() {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile menu
    function setMenu(open) {
        nav.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    toggle.addEventListener('click', function () {
        setMenu(!nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setMenu(false);
    });

    // Keep the active nav link aligned with the section below the fixed header.
    const sections = Array.from(links)
        .map(function (a) {
            const href = a.getAttribute('href');
            return href && href.charAt(0) === '#' ? document.querySelector(href) : null;
        })
        .filter(Boolean)
        .sort(function (a, b) {
            return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
        });

    function updateActiveLink() {
        if (!sections.length) return;

        const scrollPosition = window.scrollY + header.offsetHeight + 8;
        let activeSection = sections[0];

        sections.forEach(function (section) {
            if (section.getBoundingClientRect().top + window.scrollY <= scrollPosition) {
                activeSection = section;
            }
        });

        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
            activeSection = sections[sections.length - 1];
        }

        links.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + activeSection.id);
        });
    }

    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    window.addEventListener('resize', updateActiveLink);
    window.addEventListener('hashchange', updateActiveLink);
})();