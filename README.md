# Gruppo Vocale Ancora | Web oficial

Sitio web oficial del **Gruppo Vocale Ancora**, un coro de música vocal en Zaragoza, España.

## 🎵 Sobre el Proyecto

Este es un sitio web moderno y rápido construido con Astro y Static CMS, diseñado específicamente para gestionar la presencia online del coro. Incluye funcionalidades para eventos, galería de conciertos, gestión de miembros y formularios de contacto.

## ✨ Características Principales

### 🎭 Gestión de Contenido
- **📅 Eventos y Conciertos**: Sistema completo para publicar próximos conciertos y archivo de eventos pasados
- **🖼️ Galería de Videos**: Integración con YouTube para mostrar videos de conciertos con thumbnails automáticas y modal inline
- **👥 Miembros del Coro**: Gestión de miembros por secciones (sopranos, altos, tenores, bajos) con fotos y roles
- **📝 Static CMS**: Editor visual para gestionar todo el contenido sin tocar código

### 📧 Comunicación
- **💌 Formulario de Contacto**: Integrado con Brevo (SendinBlue) para recibir mensajes
- **📰 Newsletter**: Suscripción a newsletter mediante Brevo con gestión de listas
- **🎯 Temas de Contacto**: Múltiples opciones (info conciertos, unirse al coro, consultas)

### 🚀 Rendimiento y SEO
- **⚡ Lighthouse 98-100**: Optimización extrema de velocidad de carga
- **🌍 SEO Optimizado**: URLs canónicas, OpenGraph, sitemap automático
- **🔍 Búsqueda de Texto**: Búsqueda rápida con Pagefind
- **♻️ Bajo CO2**: Emisiones de 0.05g - 0.07g CO2 por visita

### 🎨 Diseño
- **🌓 Modo Oscuro/Claro**: Cambio automático de tema
- **📱 Responsive**: Perfectamente adaptado a móviles, tablets y desktop
- **🎨 Bloques Dinámicos**: Sistema flexible de bloques para páginas personalizadas

## 🚀 Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Configuración General
WEBSITE_LANGUAGE=es
WEBSITE_TITLE=Gruppo Vocale Ancora
WEBSITE_DESCRIPTION=Coro de música vocal en Zaragoza
WEBSITE_URL=https://tu-sitio.netlify.app
WEBSITE_AUTHOR=Gruppo Vocale Ancora

# Slugs de Colecciones
BLOG_SLUG=eventos
PORTFOLIO_SLUG=miembros
MENU_SLUG=menu

# Configuración Regional
CURRENCY=EUR
UNITS=metric
NODE_VERSION=18

# Email y Contacto (Brevo recomendado)
FROM_EMAIL_ADDRESS=ancoragrupovocal@gmail.com
TO_EMAIL_ADDRESS=ancoragrupovocal@gmail.com
BREVO_API_KEY=tu-api-key-de-brevo

# Newsletter (Brevo - Gratis hasta 300 emails/día)
NEWSLETTER_PROVIDER=brevo
BREVO_LIST_ID=2

# Newsletter Alternativa (Mailchimp)
# NEWSLETTER_PROVIDER=mailchimp
# MAILCHIMP_API_KEY=XXXXXXXXXXXXXXXX-us21
# MAILCHIMP_SERVER_PREFIX=us21
# MAILCHIMP_LIST_ID=XXXXXXXXX
```

### 2. Obtener Credenciales de Brevo

**API Key:**
1. Crea una cuenta gratis en [Brevo](https://www.brevo.com)
2. Ve a https://app.brevo.com/settings/keys/api
3. Crea una nueva API key
4. Cópiala a `BREVO_API_KEY`

**List ID para Newsletter:**
1. Ve a https://app.brevo.com/contacts/lists
2. Crea una nueva lista o usa una existente
3. En la URL verás algo como `/lists/list/id/2` - ese número es tu List ID
4. Cópialo a `BREVO_LIST_ID`

### 3. Configurar Static CMS

El CMS está configurado para usar GitHub con Netlify Identity. Para desarrollo local:

1. Inicia el servidor proxy del CMS:
```bash
npm run cms-proxy-server
```

2. En otro terminal, inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Accede al CMS en: http://localhost:4321/admin/

Para producción, el CMS se conecta automáticamente a GitHub a través de Netlify.

### 4. Instalar Dependencias

```bash
$ npm install
```

### 5. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

## 📝 Gestión de Contenido

### Eventos y Conciertos
- **Ubicación**: `src/content/eventos/`
- **Tipos**: Próximos conciertos y archivo de eventos pasados
- **Campos**: Título, fecha, ubicación, tipo de evento, imagen destacada

### Galería de Videos
- **Ubicación**: `src/content/gallery/`
- **Integración**: YouTube con thumbnails automáticas
- **Características**: Modal inline, autoplay, responsive

### Miembros del Coro
- **Ubicación**: `src/content/miembros/`
- **Secciones**: Sopranos, Altos, Tenores, Bajos, Director
- **Bloque Members**: Sistema de grid para mostrar fotos y nombres de miembros individuales

### Páginas Estáticas
- **Ubicación**: `src/content/page/`
- **Sistema de Bloques**: TextImage, Features, ImageGallery, Members, RichText

## 📧 Funcionalidades de Contacto

### Formulario de Contacto
- **Proveedor**: Brevo (SendinBlue)
- **Características**: 
  - Múltiples temas de consulta
  - Email de respuesta automática
  - Validación de campos
  - Logging detallado

### Newsletter
- **Proveedor**: Brevo (recomendado) o Mailchimp
- **Ubicación**: Footer de todas las páginas
- **Funcionalidad**: Suscripción con validación de email y detección de duplicados


## 🛸 Comandos Disponibles

| Comando                    | Descripción                                               |
| :------------------------- | :-------------------------------------------------------- |
| `npm install`              | Instalar dependencias                                      |
| `npm run dev`              | Iniciar servidor de desarrollo en `localhost:4321`         |
| `npm run cms-proxy-server` | Iniciar servidor proxy de Static CMS para desarrollo local|
| `npm run build`            | Compilar sitio para producción en `./dist/`                |
| `npm run preview`          | Previsualizar build localmente antes de desplegar          |

## 🚀 Despliegue en Netlify

### Configuración Requerida

1. **Variables de Entorno en Netlify**:
   - Ve a Site settings → Environment variables
   - Añade todas las variables del archivo `.env`
   - Especialmente importantes:
     - `BREVO_API_KEY`
     - `FROM_EMAIL_ADDRESS`
     - `TO_EMAIL_ADDRESS`
     - `NEWSLETTER_PROVIDER`
     - `BREVO_LIST_ID`

2. **Edge Functions**:
   - Se despliegan automáticamente
   - Funciones disponibles:
     - `/api/contact-brevo` - Formulario de contacto
     - `/api/subscribe-brevo` - Suscripción newsletter

3. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

## 📚 Stack Tecnológico

- **Framework**: [Astro v5](https://astro.build) - SSG ultrarrápido
- **CMS**: [Static CMS](https://www.staticcms.org) - Editor visual Git-based
- **UI Components**: Vue 3 - Componentes interactivos
- **Estilos**: TailwindCSS - Utility-first CSS
- **Búsqueda**: Pagefind - Búsqueda de texto completo
- **Email**: Brevo (SendinBlue) - Contacto y newsletter
- **Hosting**: Netlify - Edge functions y CDN global
- **Gestión de Imágenes**: astro-imagetools - Optimización automática

## 📖 Documentación Adicional

- **NETLIFY_SETUP.md**: Guía completa de configuración de Netlify
- **TESTING_CONTACT.md**: Cómo probar y debuggear el formulario de contacto
- **Configuración CMS**: Ver archivos en `src/cms/` para personalizar el editor

## 🎵 Sobre Gruppo Vocale Ancora

Coro de música vocal ubicado en Zaragoza, España. Este sitio web gestiona toda la presencia online del coro incluyendo:
- Información sobre próximos conciertos
- Galería de videos de actuaciones
- Información de los miembros del coro
- Formulario de contacto para consultas
- Newsletter para mantenerse informado

## 📝 Licencia

Basado en Nebulix theme. Para más información sobre licencias, consulta el archivo LICENSE.md.

## 🎭 Créditos

- **Theme Original**: [Nebulix](https://nebulix.unfolding.io) by Unfolding.io
- **Personalización**: Adaptado para Grupo Vocal Ancora
- **Tecnología**: Powered by Astro, Static CMS, Brevo y Netlify




