# 🎨 Configuración del CMS en Netlify

## ✅ Cambios Realizados

He actualizado `src/pages/admin.astro` para que el CMS funcione automáticamente tanto en desarrollo local como en producción (Netlify):

- **En desarrollo local**: Usa `test-repo` (modo de prueba sin Git)
- **En Netlify**: Usa `git-gateway` (guarda cambios en tu repositorio GitHub)

## 📋 Pasos para Configurar el CMS en Netlify

### 1. Habilitar Netlify Identity

1. Ve a tu sitio en [Netlify](https://app.netlify.com)
2. Ve a **Site settings** > **Identity**
3. Haz clic en **Enable Identity**

### 2. Habilitar Git Gateway

1. En la misma página de Identity
2. Ve a **Services** > **Git Gateway**
3. Haz clic en **Enable Git Gateway**

### 3. Configurar Registro de Usuarios

Puedes elegir entre dos opciones:

#### Opción A: Solo Invitación (Recomendado)
1. En **Identity** > **Registration**
2. Selecciona **Invite only**
3. Esto significa que solo tú puedes invitar usuarios al CMS

#### Opción B: Registro Abierto (No recomendado para producción)
1. En **Identity** > **Registration**
2. Selecciona **Open**
3. Cualquiera puede registrarse (úsalo solo para pruebas)

### 4. Invitar Usuarios al CMS

1. Ve a **Identity** en tu sitio de Netlify
2. Haz clic en **Invite users**
3. Introduce el email del usuario (puede ser tu propio email)
4. El usuario recibirá un email de invitación
5. Sigue el enlace del email para crear una contraseña

### 5. Configurar External OAuth (Opcional pero Recomendado)

Para mejor seguridad, configura OAuth con GitHub:

1. Ve a **Site settings** > **Identity** > **External providers**
2. Haz clic en **Add provider** > **GitHub**
3. Sigue las instrucciones para crear una OAuth App en GitHub:
   - Ve a GitHub Settings > Developer settings > OAuth Apps > New OAuth App
   - **Application name**: `Ancora CMS` (o el nombre que prefieras)
   - **Homepage URL**: `https://tu-sitio.netlify.app`
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
4. Copia el **Client ID** y **Client Secret** a Netlify
5. Haz clic en **Install provider**

### 6. Acceder al CMS

1. Ve a `https://tu-sitio.netlify.app/admin`
2. Inicia sesión con:
   - Email y contraseña (si usaste invitación)
   - O GitHub (si configuraste OAuth)
3. ¡Ya puedes editar tu contenido!

## 🔐 Configuración de Seguridad (Recomendado)

### Limitar Acceso por Email

1. Ve a **Identity** > **Settings** > **Emails**
2. Configura dominios permitidos si quieres restringir acceso

### Configurar 2FA (Autenticación de Dos Factores)

Netlify Identity soporta 2FA automáticamente si lo habilitas en tu cuenta de GitHub (cuando uses OAuth).

## 🚀 Flujo de Trabajo

### Cuando Editas en el CMS

1. Haces cambios en `/admin`
2. Haces clic en **Publish** (Publicar)
3. Los cambios se guardan en tu repositorio GitHub
4. Netlify detecta los cambios automáticamente
5. Se construye y despliega la nueva versión
6. Tu sitio se actualiza en ~2-5 minutos

### Desarrollo Local vs Producción

- **Local** (`npm run dev`):
  - Usa `test-repo` (cambios temporales, no se guardan en Git)
  - Necesitas el proxy server: `npm run cms-proxy-server`
  
- **Producción** (Netlify):
  - Usa `git-gateway` (cambios se guardan en GitHub)
  - No necesita proxy server
  - Los cambios activan un nuevo deploy automáticamente

## 📝 Comandos de Desarrollo Local

```bash
# Terminal 1: Servidor de desarrollo
npm run dev

# Terminal 2: Proxy del CMS (solo para desarrollo local)
npm run cms-proxy-server
```

Luego accede a `http://localhost:4321/admin`

## ❓ Solución de Problemas

### Error: "Error loading the CMS configuration"

**Solución**: Verifica que:
- Git Gateway esté habilitado en Netlify
- El usuario esté invitado y haya aceptado la invitación
- Estés accediendo desde `https://` (no `http://`)

### Error: "Failed to persist entry"

**Solución**: 
- Verifica que Git Gateway tenga permisos para escribir en el repositorio
- Asegúrate de que la rama configurada (main) existe
- Revisa que no haya restricciones en tu repositorio GitHub

### No puedo iniciar sesión

**Solución**:
- Verifica que Netlify Identity esté habilitado
- Asegúrate de haber aceptado la invitación por email
- Si usas OAuth, verifica que la configuración de GitHub esté correcta

### Los cambios no se reflejan en el sitio

**Solución**:
- Espera 2-5 minutos para que Netlify construya el sitio
- Ve a **Deploys** en Netlify para ver el estado
- Revisa los logs si hay errores en el build

### El CMS está lento

**Solución**:
- Netlify Identity tiene un límite gratuito de 1000 usuarios activos/mes
- El rendimiento mejora con un plan de pago si tienes muchos usuarios
- Reduce el tamaño de las imágenes en `media_library`

## 🎯 Checklist Final

Antes de usar el CMS en producción, verifica:

- [ ] Netlify Identity está habilitado
- [ ] Git Gateway está habilitado
- [ ] Has invitado al menos un usuario
- [ ] El usuario ha aceptado la invitación
- [ ] Puedes acceder a `/admin` en tu sitio en Netlify
- [ ] Puedes iniciar sesión correctamente
- [ ] Los cambios que haces en el CMS se guardan en GitHub
- [ ] Un nuevo deploy se activa automáticamente después de publicar

## 🔗 Enlaces Útiles

- [Documentación de Netlify Identity](https://docs.netlify.com/visitor-access/identity/)
- [Documentación de Git Gateway](https://docs.netlify.com/visitor-access/git-gateway/)
- [Static CMS Docs](https://staticjscms.netlify.app/)

## 💡 Consejo Pro

Para desarrollo local, sigue usando el proxy server (`npm run cms-proxy-server`). Esto te permite editar contenido sin hacer commits en Git. Cuando estés satisfecho con los cambios, haz commit manualmente.

En producción (Netlify), los cambios del CMS van directamente a Git y activan deploys automáticos.
