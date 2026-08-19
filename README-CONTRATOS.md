Integración de la sección "Contratos"
=====================================

Archivos añadidos:
- `contratos.html` — contiene el HTML del contrato exactamente como lo proporcionaste (no modificado).
- `contratos-widget.js` — script que añade una opción "Contratos" visible solo si el usuario es cliente y carga `contratos.html` en un modal.

Cómo integrarlo en tu sistema existente (sin modificar `contratos.html`):

1. Asegúrate de servir `contratos.html` y `contratos-widget.js` desde el mismo directorio que tu aplicación.
2. Incluye el script `contratos-widget.js` en las páginas donde quieras que aparezca la opción (ej: en tu layout principal). Por ejemplo:

```html
<script src="/contratos-widget.js"></script>
```

3. Detección de rol: el widget mostrará la opción solo si existe `window.userRole === 'client'` o si el `<body>` tiene `data-role="client"`.
   - Si tu app ya expone el rol de usuario en `window.userRole`, no necesitas hacer nada.
   - Alternativamente, añade `data-role="client"` al `<body>` para pruebas locales:

```html
<body data-role="client"> ... </body>
```

4. Comportamiento:
   - El widget buscará un menú en la página (selectores comunes) y añadirá un botón allí; si no encuentra ninguno, insertará un botón flotante.
   - Al pulsar la opción, abre un modal que carga `contratos.html` por fetch y ejecuta los scripts incluidos en ese archivo (por ejemplo la función `descargarPDF`).

Notas:
- No se modificó ningún contenido dentro de `contratos.html`.
- Si tu app usa rutas o un servidor que impide fetch a archivos estáticos, asegúrate de exponer `contratos.html` vía servidor.
- Puedo insertar el `<script>` directamente en tu layout si quieres; dime en qué archivo y lo haré sin cambiar `contratos.html`.
