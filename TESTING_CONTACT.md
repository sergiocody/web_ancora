# 🧪 Cómo Probar el Formulario de Contacto con Brevo

## 📋 Problema que estás viendo

Si no aparecen logs en Netlify Functions para `contact-brevo`, puede ser porque:

1. **La función aún no se ha invocado** - Nadie ha usado el formulario desde el deploy
2. **Hay un error antes de que se ejecute** - El path está mal configurado
3. **La función no se desplegó correctamente** - Revisar el deploy log

## 🔍 Cómo Verificar que se Desplegó Correctamente

### Opción 1: Ver el Log de Deploy en Netlify

1. Ve a [Netlify](https://app.netlify.com)
2. Selecciona tu sitio
3. Ve a **Deploys**
4. Haz clic en el deploy más reciente (el commit `219c083`)
5. Busca en el log la sección de **Edge Functions**
6. Deberías ver algo como:
   ```
   ◈ 5 new edge functions
     ├─ contact-brevo
     ├─ contact-mailgun
     ├─ contact-postmark
     ├─ contact-slack
     └─ subscribe-mailchimp
   ```

### Opción 2: Probar en Producción

Ve a tu sitio en producción y prueba el formulario de contacto:

**URL de tu sitio Netlify + la página de contacto**

Por ejemplo, desde la página principal, haz clic en el botón de contacto.

### Opción 3: Usar la Página de Test

He creado un archivo `test-contact.html` en la raíz del proyecto. Para usarlo:

1. **Cópialo a la carpeta `public/`**:
   ```bash
   cp test-contact.html public/
   ```

2. **Haz build y push**:
   ```bash
   npm run build
   git add public/test-contact.html
   git commit -m "Add contact form test page"
   git push
   ```

3. **Accede a la página**:
   ```
   https://tu-sitio.netlify.app/test-contact.html
   ```

4. **Prueba el formulario** y revisa:
   - La consola del navegador (F12 → Console)
   - Los logs de Functions en Netlify

## 🛠️ Probar Localmente con Netlify Dev

Si quieres probar localmente con las edge functions:

```bash
# Instalar Netlify CLI (si no lo tienes)
npm install -g netlify-cli

# Autenticarte con Netlify
netlify login

# Vincular el proyecto
netlify link

# Configurar las variables de entorno localmente
# Crea un archivo .env con:
BREVO_API_KEY=tu-api-key
FROM_EMAIL_ADDRESS=ancoragrupovocal@gmail.com
TO_EMAIL_ADDRESS=ancoragrupovocal@gmail.com

# Ejecutar en modo desarrollo
netlify dev
```

Esto iniciará el servidor local con las edge functions funcionando en `http://localhost:8888`

## 📊 Ver los Logs en Netlify

### Logs de Functions en Tiempo Real

Una vez que hayas probado el formulario (ya sea desde test-contact.html o desde el sitio real):

1. Ve a **Functions** en Netlify
2. Haz clic en `contact-brevo`
3. Deberías ver:
   - **Recent invocations** (llamadas recientes)
   - **Duration** (duración)
   - **Status code** (200 = éxito, 400/500 = error)
   - **Logs** (haz clic en una invocación para ver los detalles)

### Logs Detallados

En los logs verás mensajes como:

**Si funciona bien:**
```
Contact form data: { name: 'Test', email: 'test@test.com', topic: '...' }
Sending email via Brevo API...
Email sent successfully via Brevo
```

**Si hay error:**
```
Error parsing request: ...
// o
BREVO_API_KEY not configured
// o
Brevo API error: { code: 'invalid_parameter', message: '...' }
```

## ✅ Checklist de Verificación

- [ ] Variables de entorno configuradas en Netlify:
  - `BREVO_API_KEY`
  - `FROM_EMAIL_ADDRESS`
  - `TO_EMAIL_ADDRESS`
- [ ] Deploy completado sin errores
- [ ] Edge function `contact-brevo` aparece en el log de deploy
- [ ] Formulario de contacto configurado con `provider: brevo` en `contact.mdx`
- [ ] Probar el formulario desde el sitio en producción
- [ ] Revisar logs en Functions después de enviar

## 🔧 Verificar API Key de Brevo

Para asegurarte de que tu API key es válida:

1. Ve a [Brevo Dashboard](https://app.brevo.com/settings/keys/api)
2. Verifica que la API key existe y está activa
3. Copia la key exacta (sin espacios extra)
4. Pégala en las variables de entorno de Netlify

## 📞 Próximos Pasos

1. **Prueba el formulario** desde tu sitio en producción
2. **Revisa los logs** en Netlify Functions
3. **Envíame** los logs que veas (o un screenshot) si hay algún error

El código ahora tiene mucho mejor logging, así que cualquier error será más fácil de detectar. 🎯
