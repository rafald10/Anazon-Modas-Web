document.addEventListener("DOMContentLoaded", function() {

    /* =========================================
       0. CURSOR MÁGICO DORADO (PREMIUM)
       ========================================= */
    if (window.matchMedia("(min-width: 1024px)").matches) {
        
        // --- PUNTO CENTRAL (DORADO) ---
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('cursor-dot');
        Object.assign(cursorDot.style, {
            width: '8px',
            height: '8px',
            backgroundColor: '#D4AF37', // <--- COLOR DORADO
            borderRadius: '50%',
            position: 'fixed',
            top: '0',
            left: '0',
            pointerEvents: 'none',
            zIndex: '9999',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 5px rgba(212, 175, 55, 0.5)' // Un brillo suave
        });
        document.body.appendChild(cursorDot);

        // --- CÍRCULO EXTERNO (DORADO TRANSPARENTE) ---
        const cursorOutline = document.createElement('div');
        cursorOutline.classList.add('cursor-outline');
        Object.assign(cursorOutline.style, {
            width: '40px',
            height: '40px',
            border: '2px solid rgba(212, 175, 55, 0.5)', // <--- BORDE DORADO SUAVE
            borderRadius: '50%',
            position: 'fixed',
            top: '0',
            left: '0',
            pointerEvents: 'none',
            zIndex: '9999',
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.15s ease-out, top 0.15s ease-out'
        });
        document.body.appendChild(cursorOutline);

        // Movimiento
        window.addEventListener("mousemove", function(e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });

        // Efecto al pasar por encima de cosas (se hace más grande y dorado claro)
        const clickables = document.querySelectorAll('a, button, .product-card, .category-card, input, .selector-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(212, 175, 55, 0.1)'; // Fondo dorado muy sutil
                cursorOutline.style.borderColor = 'transparent';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = 'rgba(212, 175, 55, 0.5)';
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
       2. MENÚ MÓVIL
       ========================================= */
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
        document.querySelectorAll(".nav-links li a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    /* =========================================
       3. NAVBAR SCROLL
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

function verListaProductos(categoria) {
    document.getElementById('pantalla-seleccion').style.display = 'none';
    document.getElementById('pantalla-productos').style.display = 'block';

    const galerias = document.querySelectorAll('.gallery-grid, #galeria-nino');
    galerias.forEach(g => g.style.display = 'none');

    const galeriaActiva = document.getElementById('galeria-' + categoria);
    if (galeriaActiva) {
        if (galeriaActiva.classList.contains('gallery-grid')) {
            galeriaActiva.style.display = 'grid';
        } else {
            galeriaActiva.style.display = 'block';
        }
    }

    const titulo = document.getElementById('titulo-categoria');
    if (titulo) {
        titulo.innerText = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    }
}

function volverAInicio() {
    document.getElementById('pantalla-productos').style.display = 'none';
    document.getElementById('pantalla-seleccion').style.display = 'block';
}

function verProducto(imagen, titulo, precio, descripcion) {
    document.getElementById('pantalla-productos').style.display = 'none';
    document.getElementById('pantalla-detalle').style.display = 'block';

    document.getElementById('detail-img').src = imagen;
    document.getElementById('lightbox-img').src = imagen;
    document.getElementById('detail-title').innerText = titulo;
    document.getElementById('detail-price').innerText = precio;
    document.getElementById('detail-desc-text').innerText = descripcion;

    const telefono = "34628890624";
    const mensaje = `Hola ANAZON, me interesa: ${titulo} (${precio}).`;
    document.getElementById('whatsapp-btn').href = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
    window.scrollTo(0, 0);
}

function volverALista() {
    document.getElementById('pantalla-detalle').style.display = 'none';
    document.getElementById('pantalla-productos').style.display = 'block';
}

function abrirLightbox() {
    document.getElementById('lightbox').style.display = 'flex';
}

function cerrarLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}