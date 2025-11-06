# 🔐 Solución: Configurar Contraseña en Netlify Identity

## ✅ Problema Resuelto

He añadido el script de Netlify Identity a todas las páginas del sitio para que puedas configurar tu contraseña correctamente.

## 🎯 Cambios Realizados

1. **Añadido Netlify Identity Widget a todas las páginas** (`BaseHead.astro`)
   - El widget ahora está disponible en toda la web, no solo en `/admin`
   - Detecta automáticamente tokens de recuperación, invitación y confirmación
   
2. **Creada página especial de redirección** (`/identity-redirect`)
   - Maneja automáticamente los tokens del email
   - Muestra el proceso de configuración paso a paso
   - Redirige al admin después de configurar la contraseña

3. **Configuradas redirecciones en Netlify** (`netlify.toml`)
   - Los enlaces de Identity se manejan correctamente

## 🚀 Cómo Configurar Tu Contraseña (Nueva Invitación)

### Opción 1: Proceso Automático (Recomendado)

1. **Haz un nuevo deploy** del sitio con estos cambios
2. En Netlify, **invítate de nuevo**:
   - Ve a **Identity** en tu sitio de Netlify
   - Haz clic en tu usuario anterior (si existe) y elimínalo
   - Haz clic en **Invite users**
   - Introduce tu email
   - Haz clic en **Send invitation**

3. **Revisa tu email** de Netlify
4. **Haz clic en el enlace** "Accept the invite"
5. **Se abrirá automáticamente** un modal para configurar tu contraseña
6. **Introduce tu contraseña** (mínimo 6 caracteres)
7. **Serás redirigido** automáticamente a `/admin`

### Opción 2: Acceso Directo al Admin

Si el proceso automático no funciona:

1. Ve directamente a: `https://tu-sitio.netlify.app/admin`
2. Haz clic en el botón de login
3. Verás la opción "Forgot password?"
4. Introduce tu email
5. Recibirás un nuevo email con un enlace de recuperación
6. Sigue el enlace y configura tu contraseña

## 🔍 Qué Hace el Script Ahora

El widget de Netlify Identity ahora:

✅ Se carga en **todas las páginas** del sitio
✅ Detecta automáticamente tokens en la URL:
   - `recovery_token` (recuperación de contraseña)
   - `invite_token` (invitación)
   - `confirmation_token` (confirmación de email)
✅ Abre automáticamente el modal de configuración
✅ Redirige al admin después de login exitoso

## 📝 Verificar Que Todo Funciona

### Paso 1: Verificar que Identity está habilitado

```
Netlify → Tu sitio → Site settings → Identity
```

Debería decir: **Identity is enabled**

### Paso 2: Verificar Git Gateway

```
Identity → Services → Git Gateway
```

Debería decir: **Git Gateway is enabled**

### Paso 3: Probar el Flujo Completo

1. Haz un nuevo deploy con los cambios
2. Elimina el usuario anterior de Identity (si existe)
3. Invítate de nuevo
4. Revisa el email
5. Haz clic en el enlace
6. Debería aparecer el modal de configuración de contraseña

## ❓ Solución de Problemas

### El enlace del email no abre el modal

**Causas posibles:**
- Los cambios aún no están desplegados en Netlify
- Estás usando el enlace de una invitación anterior

**Solución:**
1. Haz un nuevo deploy
2. Espera a que termine (2-3 minutos)
3. Solicita una nueva invitación
4. Usa el enlace del nuevo email

### Aparece "No se encontró un token válido"

**Solución:**
- El enlace puede haber expirado (tokens expiran en 24 horas)
- Solicita una nueva invitación desde Netlify

### El modal se cierra inmediatamente

**Solución:**
- Limpia la caché del navegador (Cmd+Shift+R o Ctrl+Shift+R)
- Prueba en modo incógnito/privado
- Prueba con otro navegador

### Sigo sin poder configurar la contraseña

**Solución de último recurso:**

1. Ve a **Identity** en Netlify
2. Ve a **Settings**
3. Desactiva "Enable Identity"
4. Espera 30 segundos
5. Vuelve a activar "Enable Identity"
6. Habilita Git Gateway de nuevo
7. Invítate de nuevo

## 🎯 Checklist Final

Antes de intentar configurar la contraseña, verifica:

- [ ] Has hecho un nuevo deploy con los cambios
- [ ] El deploy ha terminado completamente
- [ ] Netlify Identity está habilitado
- [ ] Git Gateway está habilitado
- [ ] Has solicitado una nueva invitación (después del deploy)
- [ ] El email de invitación es reciente (menos de 24 horas)
- [ ] Estás usando el enlace completo del email

## 💡 Consejo Pro

Para evitar problemas:

1. **Siempre haz un deploy limpio** antes de invitar usuarios
2. **Elimina usuarios antiguos** antes de reinvitarlos
3. **No reutilices enlaces antiguos** de invitación
4. **Espera a que el deploy termine** antes de usar el enlace

## 📞 Siguiente Paso

Una vez que hayas configurado tu contraseña exitosamente:

1. Ve a `https://tu-sitio.netlify.app/admin`
2. Inicia sesión con tu email y contraseña
3. ¡Ya puedes editar contenido!

## 🔄 Para Nuevos Usuarios en el Futuro

Este mismo proceso funcionará para cualquier usuario que invites:
1. Invitar desde Netlify Identity
2. Usuario recibe email
3. Hace clic en el enlace
4. Configura su contraseña automáticamente
5. Accede al admin
