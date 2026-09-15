# Bienvenido a MDRealtime

Entorno de lectura y edición de Markdown diseñado para colaborar con agentes de inteligencia artificial.

### Características
1. Lectura enriquecida: renderizado visual de títulos, listas de verificación interactivas, tablas, citas y bloques de código con tipografía ajustable.
2. Detección de cambios en disco: cuando un agente o proceso externo modifica el archivo, las modificaciones aparecen automáticamente sin recargar la página y preservando la posición de lectura.
3. Resaltado in situ: el texto nuevo o modificado se resalta en verde o amarillo para identificar las intervenciones directamente en el documento.
4. Bloqueo de concurrencia: al editar el documento, el archivo pasa temporalmente a solo lectura en el sistema de archivos para prevenir colisiones con agentes en segundo plano.
5. Listas de verificación interactivas: marcar o desmarcar casillas de tareas actualiza el archivo Markdown en disco de forma inmediata.

### Atajos de teclado
- Espacio o R: Limpiar marcas y fijar base de lectura.
- Ctrl+S: Guardar cambios y desbloquear el archivo.
- Ctrl+Z / Ctrl+Y: Deshacer y rehacer cambios.
- Ctrl+R: Recargar y forzar sincronización con el disco.
- Ctrl+Q: Cerrar la ventana.
- T: Cambiar tema visual (Oscuro, Claro, Sepia).
- H: Cambiar color de resaltado (Verde, Amarillo).
- S: Abrir ajustes de tipografía, tamaño y ancho de lectura.

Para abrir un documento desde la terminal:
`mdrealtime /ruta/al/documento.md`
