# 🚀 Guía de Despliegue en Netlify

## Problema Resuelto

El error `WEBSITE_LANGUAGE is not defined` se debe a que las variables de entorno del archivo `.env` no están disponibles en Netlify durante el build. Este archivo te explica cómo solucionarlo.

## 📋 Pasos para Configurar Variables de Entorno en Netlify

### 1. Accede a la Configuración de tu Sitio

1. Ve a [Netlify](https://app.netlify.com)
2. Selecciona tu sitio
3. Ve a **Site settings** (Configuración del sitio)
4. En el menú lateral, ve a **Build & deploy** > **Environment**
5. Haz clic en **Environment variables**

### 2. Añade las Variables de Entorno Obligatorias

Haz clic en **Add a variable** y añade cada una de estas variables:

#### Variables Esenciales (OBLIGATORIAS)

```
WEBSITE_LANGUAGE = es
WEBSITE_TITLE = Grupo Vocal Ancore
WEBSITE_DESCRIPTION = Coral de música en Zaragoza
WEBSITE_URL = https://tu-sitio.netlify.app
WEBSITE_AUTHOR = Grupo Vocal Ancore
BLOG_SLUG = eventos
PORTFOLIO_SLUG = miembros
MENU_SLUG = menu
CURRENCY = EUR
UNITS = metric
NODE_VERSION = 18
```

#### Variables para Email (si usas el formulario de contacto)

```
FROM_EMAIL_ADDRESS = ancoragrupovocal@gmail.com
TO_EMAIL_ADDRESS = ancoragrupovocal@gmail.com
BREVO_API_KEY = tu-api-key-de-brevo
```

> **Nota sobre Brevo**: Obtén tu API key en https://app.brevo.com/settings/keys/api

#### Variables para Newsletter (si usas Mailchimp)

```
NEWSLETTER_PROVIDER = mailchimp
MAILCHIMP_API_KEY = tu-api-key
MAILCHIMP_SERVER_PREFIX = us21
MAILCHIMP_LIST_ID = tu-list-id
```

#### Variables para Tienda (si usas Snipcart)

```
SNIPCART_KEY = tu-public-key-de-snipcart
```

### 3. Guarda y Redespliegue

1. Después de añadir todas las variables, haz clic en **Save**
2. Ve a **Deploys** (Despliegues)
3. Haz clic en **Trigger deploy** > **Deploy site**

## ✅ Verificación

Después del nuevo deploy, el sitio debería construirse correctamente. Puedes verificar:

1. El build completa sin errores
2. El sitio se muestra en el idioma español
3. La navegación funciona correctamente

## 🔧 Valores por Defecto en netlify.toml

He configurado algunos valores por defecto en `netlify.toml` que se usarán si no están definidos en la UI:

- `WEBSITE_LANGUAGE = "es"`
- `CURRENCY = "EUR"`
- `UNITS = "metric"`
- `NODE_VERSION = "18"`

Estos valores se pueden sobrescribir añadiendo variables con el mismo nombre en la UI de Netlify.

## 📝 Archivo de Referencia

Puedes consultar el archivo `netlify.env.example` para ver una lista completa de todas las variables disponibles con ejemplos.

## ❓ Solución de Problemas

### Error: "WEBSITE_LANGUAGE is not defined"

- Verifica que hayas añadido `WEBSITE_LANGUAGE = es` en las variables de entorno de Netlify
- Asegúrate de que el valor es en minúsculas: `es`, `en`, `fr`, etc. (NO `ES`, `EN`)
- Después de añadir la variable, haz un nuevo deploy

### El sitio se muestra en inglés en lugar de español

- Verifica que `WEBSITE_LANGUAGE = es` (en minúsculas)
- Limpia la caché de Netlify: Deploys > Trigger deploy > Clear cache and deploy site

### Las funciones edge no funcionan

- Verifica que las variables de email (FROM_EMAIL_ADDRESS, TO_EMAIL_ADDRESS, BREVO_API_KEY) están configuradas
- Las edge functions pueden tardar unos minutos en activarse después del deploy

## 🎯 Próximos Pasos

1. Configura las variables de entorno en Netlify
2. Haz un nuevo deploy
3. Verifica que el sitio funciona correctamente
4. Configura tu dominio personalizado (opcional)
5. Añade tu API key real de Brevo para el formulario de contacto

## 📞 Contacto

Si tienes problemas, revisa los logs de build en Netlify para ver mensajes de error específicos.
