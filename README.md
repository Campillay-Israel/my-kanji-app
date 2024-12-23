# My Kanji

## Descripción
**My Kanji** es una aplicación interactiva diseñada para ayudar a los usuarios a gestionar y aprender vocabulario japonés. La aplicación permite añadir, buscar y organizar tarjetas de vocabulario ("kotobas") con información detallada como lectura, significado en español e inglés, frases de ejemplo, y más. Además, ofrece una interfaz amigable y adaptativa gracias a tecnologías modernas.

## Funcionalidades principales
- **Autenticación de usuarios**: permite el registro y el inicio de sesión.
- **Gestión de tarjetas de vocabulario**:
  - Añadir nuevas tarjetas.
  - Anclar tarjetas en la vista.
  - Buscar palabras clave dentro de las tarjetas.
  - Mostrar mensajes dinámicos según el estado de la búsqueda.
- **Adaptabilidad**:
  - Rutas protegidas que redirigen a los usuarios no autenticados.
  - Interfaz responsiva que se adapta a distintos dispositivos.


## Tecnologías utilizadas

### Frontend
- **React**: utilizado para crear la interfaz de usuario de manera dinámica y modular.
  - Justificación: su capacidad para crear componentes reutilizables facilita el desarrollo y mantenimiento.
- **React Router DOM**: implementado para gestionar la navegación entre rutas.
  - Justificación: simplifica la creación de rutas protegidas y la experiencia de navegación.
- **Axios**: utilizado para gestionar las solicitudes HTTP hacia la API.
  - Justificación: es una librería popular y eficiente para manejar peticiones asíncronas.
- **React Icons**: usado para incorporar iconos.
  - Justificación: mejora la estética y la accesibilidad del diseño.
- **React Modal**: implementado para mostrar modales.
  - Justificación: facilita la gestión de elementos emergentes sin complicaciones.
- **Tailwind CSS**: utilizado para el diseño y la estructura de estilos.
  - Justificación: su enfoque "utility-first" permite estilos rápidos y consistentes sin necesidad de archivos CSS extensos.

### Backend
- **API basada en Node.js y MongoDB**:
  - Se utilizó `Express` para crear rutas y controladores.
  - Base de datos MongoDB con el modelo Koto, diseñado para almacenar la información de las tarjetas de vocabulario.

### DevTools
- **Vite**: herramienta utilizada para construir el proyecto.
- **ESLint**: utilizado para mantener estándares de calidad en el código.
- **PostCSS con autoprefixer**: herramienta para garantizar compatibilidad con diferentes navegadores.


## Instalación y ejecución

### Pasos
1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Accede a la aplicación en tu navegador en `http://localhost:5173`.

### Scripts disponibles
- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: construye la aplicación para producción.
- `npm run lint`: ejecuta ESLint para verificar el código.
- `npm run preview`: sirve la aplicación construida localmente.


## Próximos pasos
- Implementar internacionalización (i18n) para soportar múltiples idiomas.
- Añadir más opciones de personalización para las tarjetas de vocabulario.
- Mejorar la seguridad y validación de datos en el backend.
- Exportación de Tarjetas:Permitir a los usuarios exportar sus tarjetas en formato PDF o CSV.


- Gamificación: Agregar logros y estadísticas para motivar a los usuarios a aprender 

## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para sugerencias o mejoras.

---
**Desarrollado con pasión por el aprendizaje del japonés.**
