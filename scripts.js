document.addEventListener("DOMContentLoaded", function() {

    /* =========================================
       0. CURSOR MÁGICO (Solo PC)
       ========================================= */
    if (window.matchMedia("(min-width: 1024px)").matches) {
        
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('cursor-dot');
        const cursorOutline = document.createElement('div');
        cursorOutline.classList.add('cursor-outline');
        
        // Estilos base para el cursor
        cursorDot.style.cssText = "width: 8px; height: 8px; background-color: #D4AF37; border-radius: 50%; position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); box-shadow: 0 0 5px rgba(212, 175, 55, 0.5);";
        cursorOutline.style.cssText = "width: 40px; height: 40px; border: 2px solid rgba(212, 175, 55, 0.5); border-radius: 50%; position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); transition: left 0.1s, top 0.1s, width 0.2s, height 0.2s;";
        
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);

        // Movimiento
        window.addEventListener("mousemove", function(e) {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            
            cursorOutline.animate({
                left: e.clientX + 'px',
                top: e.clientY + 'px'
            }, { duration: 500, fill: "forwards" });
        });

        // Efecto Hover (Enlaces y botones)
        const clickables = document.querySelectorAll('a, button, .product-card, .category-card, input, .selector-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
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
       1. MENÚ MÓVIL (CORREGIDO)
       ========================================= */

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links a");

    if (hamburger && navMenu) {
        // A. Abrir/Cerrar menú
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            
            // Bloquear/Desbloquear scroll del fondo
            document.body.classList.toggle("no-scroll");
        });

        // B. Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("no-scroll");
            });
        });
    }

    /* =========================================
       2. NAVBAR SCROLL (Efecto cristal al bajar)
       ========================================= */
    const header = document.querySelector('header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });
    }

    /* =========================================
       3. GESTIÓN DE COOKIES (Inicio)
       ========================================= */
    const consentimiento = localStorage.getItem('anazon_cookie_consent');
    const banner = document.getElementById('cookie-banner');
    
    if (!consentimiento && banner) {
        banner.style.display = 'flex';
    } else if (consentimiento === 'aceptado') {
        activarCookiesDeTerceros();
    }

}); // <--- AQUÍ TERMINA EL DOMContentLoaded. ¡NO BORRES ESTO!


/* =========================================
   FUNCIONES GLOBALES (Fuera del evento de carga)
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
        banner.style.opacity = '0'; // Animación suave
        setTimeout(() => { banner.style.display = 'none'; }, 300);
    }
}

function activarCookiesDeTerceros() {
    var G_ANALYTICS_ID = 'G-G-KCD93DFPHR';
    // Evitar cargar el script si ya existe
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

// Funciones para la navegación interna de productos (SPA simple)
function verListaProductos(categoria) {
    const pantallaSeleccion = document.getElementById('pantalla-seleccion');
    const pantallaProductos = document.getElementById('pantalla-productos');
    
    // Ocultar selección, mostrar productos
    if(pantallaSeleccion) pantallaSeleccion.style.display = 'none';
    if(pantallaProductos) pantallaProductos.style.display = 'block';

    // Ocultar todas las galerías primero
    const galerias = document.querySelectorAll('.gallery-grid, #galeria-nino');
    galerias.forEach(g => g.style.display = 'none');

    // Mostrar solo la galería elegida
    const galeriaActiva = document.getElementById('galeria-' + categoria);
    if (galeriaActiva) {
        galeriaActiva.style.display = galeriaActiva.classList.contains('gallery-grid') ? 'grid' : 'block';
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

    // Rellenar datos
    document.getElementById('detail-img').src = imagen;
    const lightboxImg = document.getElementById('lightbox-img');
    if(lightboxImg) lightboxImg.src = imagen;
    
    document.getElementById('detail-title').innerText = titulo;
    document.getElementById('detail-price').innerText = precio;
    document.getElementById('detail-desc-text').innerText = descripcion;

    // Configurar botón WhatsApp
    const telefono = "34628890624";
    const mensaje = `Hola ANAZON, me interesa: ${titulo} (${precio}).`;
    const btnWhatsapp = document.getElementById('whatsapp-btn');
    if(btnWhatsapp) btnWhatsapp.href = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
    window.scrollTo(0, 0); // Subir arriba
}

function volverALista() {
    document.getElementById('pantalla-detalle').style.display = 'none';
    document.getElementById('pantalla-productos').style.display = 'block';
}

function abrirLightbox() {
    const lightbox = document.getElementById('lightbox');
    if(lightbox) lightbox.style.display = 'flex';
}

function cerrarLightbox() {
    const lightbox = document.getElementById('lightbox');
    if(lightbox) lightbox.style.display = 'none';
}