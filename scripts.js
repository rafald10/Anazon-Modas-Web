/* =========================================
   1. LÓGICA DE COOKIES Y ANALYTICS
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {
    const consentimiento = localStorage.getItem('anazon_cookie_consent');
    if (!consentimiento) {
        var banner = document.getElementById('cookie-banner');
        if (banner) banner.style.display = 'flex';
    } else if (consentimiento === 'aceptado') {
        activarCookiesDeTerceros();
    }
});

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
    console.log("Analytics activado.");
}


/* =========================================
   2. LÓGICA DE LA TIENDA (PRODUCTOS, WHATSAPP, ETC.)
   ========================================= */

// Cambiar entre categorías
function verListaProductos(categoria) {
    // 1. Ocultar TODAS las pantallas y galerías primero
    safeHide('pantalla-seleccion');
    safeHide('pantalla-detalle');
    
    // Ocultamos las galerías de TODAS las páginas para evitar conflictos
    safeHide('galeria-maquillaje');
    safeHide('galeria-hogar');
    safeHide('galeria-bebe'); // <--- NUEVO
    safeHide('galeria-nino'); // <--- NUEVO
    
    // 2. Mostrar la pantalla contenedora
    safeShow('pantalla-productos', 'block');
    
    // 3. Mostrar la galería específica según el botón pulsado
    if(categoria === 'maquillaje') {
        safeShow('galeria-maquillaje', 'grid');
        setText('titulo-categoria', 'Beauty & Maquillaje');
    } 
    else if(categoria === 'hogar') {
        safeShow('galeria-hogar', 'grid');
        setText('titulo-categoria', 'Home & Decor');
    }
    else if(categoria === 'bebe') { // <--- NUEVO: Categoría Bebé
        safeShow('galeria-bebe', 'grid');
        setText('titulo-categoria', 'Moda Bebé');
    }
    else if(categoria === 'nino') { // <--- NUEVO: Categoría Niño
        safeShow('galeria-nino', 'block'); // Usamos 'block' porque será un mensaje de texto, no un grid
        setText('titulo-categoria', 'Moda Infantil');
    }

    window.scrollTo({ top: 100, behavior: 'smooth' });
}

// Volver a la selección de categorías
function volverAInicio() {
    safeHide('pantalla-productos');
    safeHide('pantalla-detalle');
    safeShow('pantalla-seleccion', 'block');
    window.scrollTo({ top: 100, behavior: 'smooth' });
}

// Ver detalle de un producto individual
function verProducto(imagen, titulo, precio, descripcion) {
    setSrc('detail-img', imagen);
    setText('detail-title', titulo);
    setText('detail-price', precio);
    setText('detail-desc-text', descripcion);
    setSrc('lightbox-img', imagen);

    let telefono = "34628890624"; 
    let mensaje = `Hola ANAZON, estoy interesado en este producto: ${titulo} (${precio}). ¿Está disponible?`;
    let btn = document.getElementById("whatsapp-btn");
    if(btn) btn.href = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    safeHide('pantalla-productos');
    safeShow('pantalla-detalle', 'block');
    window.scrollTo({ top: 100, behavior: 'smooth' });
}

function volverALista() {
    safeHide('pantalla-detalle');
    safeShow('pantalla-productos', 'block');
    window.scrollTo({ top: 100, behavior: 'smooth' });
}

function abrirLightbox() { safeShow('lightbox', 'flex'); }
function cerrarLightbox() { safeHide('lightbox'); }

/* --- Funciones auxiliares --- */
function safeHide(id) {
    var el = document.getElementById(id);
    if(el) el.style.display = 'none';
}
function safeShow(id, displayType) {
    var el = document.getElementById(id);
    if(el) el.style.display = displayType || 'block';
}
function setText(id, text) {
    var el = document.getElementById(id);
    if(el) el.innerText = text;
}
function setSrc(id, src) {
    var el = document.getElementById(id);
    if(el) el.src = src;
}
/* =========================================
   EFECTOS VISUALES Y MOVIMIENTO (NUEVO)
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. INICIAR SCROLL REVEAL (Aparición suave)
    const observerOptions = { threshold: 0.15 }; // Se activa al ver el 15% del elemento
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Seleccionamos elementos clave para animar
    const elementosParaAnimar = document.querySelectorAll('.product-card, .category-card, .section-header, .about-text, .visit-info-box');
    elementosParaAnimar.forEach(el => {
        el.classList.add('reveal-element'); // Les añadimos la clase base CSS
        observer.observe(el); // Los empezamos a vigilar
    });


    // 2. EFECTO TILT 3D EN PRODUCTOS (Movimiento con el ratón)
    const cards = document.querySelectorAll('.product-card, .selector-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posición X del ratón dentro de la tarjeta
            const y = e.clientY - rect.top;  // Posición Y
            
            // Calculamos el centro
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculamos la rotación (máximo 10 grados para no marear)
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;

            // Aplicamos la transformación
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // Al salir el ratón, vuelve a su sitio
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });


    // 3. NAVBAR EFECTO VIDRIO AL SCROLL
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

});

/* --- (MANTÉN AQUÍ TUS FUNCIONES ANTIGUAS: verListaProductos, verProducto, etc.) --- */
// ... tus funciones de verListaProductos, verProducto, etc. siguen igual ...