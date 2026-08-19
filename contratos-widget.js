// contratos-widget.js
// Inserta una opción 'Contratos' visible solo para clientes y carga 'contratos.html' en un modal.
(function(){
    // Detectar rol de cliente
    const isClient = (window.userRole && window.userRole === 'client') || (document.body && document.body.dataset && document.body.dataset.role === 'client');
    if (!isClient) return;

    // Crear modal base
    function createModal() {
        const overlay = document.createElement('div');
        overlay.id = 'contratos-overlay';
        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.background = 'rgba(0,0,0,0.6)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '999999';

        const container = document.createElement('div');
        container.id = 'contratos-container';
        container.style.width = '95%';
        container.style.maxWidth = '1100px';
        container.style.maxHeight = '90%';
        container.style.overflow = 'auto';
        container.style.background = '#fff';
        container.style.borderRadius = '8px';
        container.style.position = 'relative';
        container.style.padding = '18px';

        const closeBtn = document.createElement('button');
        closeBtn.innerText = '✕';
        closeBtn.style.position = 'absolute';
        closeBtn.style.right = '10px';
        closeBtn.style.top = '10px';
        closeBtn.style.border = 'none';
        closeBtn.style.background = 'transparent';
        closeBtn.style.fontSize = '20px';
        closeBtn.style.cursor = 'pointer';

        closeBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        container.appendChild(closeBtn);

        const content = document.createElement('div');
        content.id = 'contratos-modal-content';
        container.appendChild(content);

        overlay.appendChild(container);
        return { overlay, content };
    }

    // Insertar botón en menú si existe, si no crear botón flotante
    function insertMenuButton(openHandler) {
        const selectors = ['#menu', '.menu', 'nav', '.navbar', '.sidebar', '#nav', '.nav', '.main-menu'];
        for (const sel of selectors) {
            const el = document.querySelector(sel);
            if (el) {
                const btn = document.createElement('button');
                btn.id = 'contratos-menu-btn';
                btn.textContent = 'Contratos';
                btn.style.marginLeft = '8px';
                btn.style.padding = '6px 10px';
                btn.style.cursor = 'pointer';
                btn.addEventListener('click', openHandler);
                el.appendChild(btn);
                return;
            }
        }

        // Fallback: botón flotante inferior derecho
        const floatBtn = document.createElement('button');
        floatBtn.id = 'contratos-float-btn';
        floatBtn.textContent = 'Contratos';
        floatBtn.style.position = 'fixed';
        floatBtn.style.right = '20px';
        floatBtn.style.bottom = '20px';
        floatBtn.style.zIndex = '99999';
        floatBtn.style.background = '#2563eb';
        floatBtn.style.color = '#fff';
        floatBtn.style.border = 'none';
        floatBtn.style.padding = '10px 14px';
        floatBtn.style.borderRadius = '999px';
        floatBtn.style.cursor = 'pointer';
        floatBtn.addEventListener('click', openHandler);
        document.body.appendChild(floatBtn);
    }

    // Cargar contratos.html y ejecutar scripts dentro
    async function loadAndShow() {
        const resp = await fetch('contratos.html');
        if (!resp.ok) {
            alert('No fue posible cargar la sección Contratos.');
            return;
        }
        const htmlText = await resp.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        // Extract body content
        const bodyContent = doc.body.innerHTML;

        const { overlay, content } = createModal();
        content.innerHTML = bodyContent;

        // Execute scripts from fetched HTML
        const scripts = doc.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const s = document.createElement('script');
            if (oldScript.src) {
                s.src = oldScript.src;
                s.async = false;
            } else {
                s.textContent = oldScript.textContent;
            }
            document.body.appendChild(s);
        });

        document.body.appendChild(overlay);
    }

    // Insert button and wire handler
    insertMenuButton(loadAndShow);

})();
