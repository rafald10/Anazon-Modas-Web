document.addEventListener("DOMContentLoaded", function() {

    /* =========================================
       0. CURSOR MÁGICO (PREMIUM)
       ========================================= */
    // Solo lo activamos en pantallas grandes para no molestar en táctil
    if (window.matchMedia("(min-width: 1024px)").matches) {
        
        // Crear elementos del cursor
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('cursor-dot');
        document.body.appendChild(cursorDot);

        const cursorOutline = document.createElement('div');
        cursorOutline.classList.add('cursor-outline');
        document.body.appendChild(cursorOutline);

        // Movimiento
        window.addEventListener("mousemove", function(e) {
            const posX = e.clientX;
            const posY = e.clientY;

            // El punto se mueve instantáneo
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // El círculo se mueve con un poco de animación fluida
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Detectar hover en elementos clickeables
        const clickables = document.querySelectorAll('a, button, .product-card, .category-card, .btn-call, .hamburger, input, .selector-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }

    /* =========================================
       1. COOKIES Y ANALYTICS
       ========================================= */
    const consentimiento = localStorage.getItem('anazon_cookie_consent');
    const banner = document.getElementById('cookie-banner');
    
    if (!consentimiento && banner) {
        banner.style.display = 'flex';
    } else if (consentimiento === 'aceptado') {
        activarCookiesDeTerceros();
    }

    /* =========================================
       2. MENÚ MÓVIL (HAMBURGUESA)
       ========================================= */
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
        // Cerrar al hacer click en un enlace
        document.querySelectorAll(".nav-links li a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    /* =========================================
       3. NAVBAR SCROLL EFECTO
       ========================================= */
    const header = document.querySelector('header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });
    }

});

/* =========================================
   FUNCIONES GLOBALES
   ========================================= */
function gestionCookies(accion) {
    const banner = document.getElementById('cookie-banner');
    if (accion === 'aceptar') {
        localStorage.setItem('anazon_cookie_consent', 'aceptado');
        activarCookiesDeTerceros();
    } else {
        localStorage.setItem('anazon_cookie_consent', 'rechazado');
    }
    if (banner) {
        banner.style.opacity = '0';
        setTimeout(() => { banner.style.display = 'none'; }, 300);
    }
}

function activarCookiesDeTerceros() {
    var G_ANALYTICS_ID = 'G-G-KCD93DFPHR';
    if (document.querySelector(`script[src*="${G_ANALYTICS_ID}"]`)) return;
    var script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + G_ANALYTICS_ID;
    script.async = true;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', G_ANALYTICS_ID);
}