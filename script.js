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