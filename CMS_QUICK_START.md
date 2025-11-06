# ⚡ Resumen Rápido: CMS en Netlify

## 🎯 Lo Que He Cambiado

✅ **Actualizado `src/pages/admin.astro`**
- Ahora detecta automáticamente si estás en desarrollo o producción
- En local: usa `test-repo` (modo de prueba)
- En Netlify: usa `git-gateway` (guarda en GitHub)

## 🚀 Pasos Esenciales en Netlify (5 minutos)

### 1. Habilitar Identity (1 min)
```
Netlify → Tu sitio → Site settings → Identity → Enable Identity
```

### 2. Habilitar Git Gateway (1 min)
```
Identity → Services → Git Gateway → Enable Git Gateway
```

### 3. Configurar Registro (1 min)
```
Identity → Registration → Selecciona "Invite only"
```

### 4. Invitarte a Ti Mismo (2 min)
```
Identity → Invite users → Escribe tu email → Enviar
Revisa tu email → Acepta invitación → Crea contraseña
```

### 5. Acceder al CMS
```
Ve a: https://tu-sitio.netlify.app/admin
Inicia sesión con tu email y contraseña
```

## ✅ ¡Listo!

Ahora cuando edites contenido en `/admin` y hagas clic en **Publish**:
- Los cambios se guardan en GitHub automáticamente
- Netlify detecta los cambios y construye el sitio
- Tu sitio se actualiza en ~2-5 minutos

## 📚 Para Más Detalles

Lee `CMS_NETLIFY_SETUP.md` para:
- Configuración avanzada
- Solución de problemas
- OAuth con GitHub
- Seguridad y permisos

## 💻 Desarrollo Local

Sigue usando dos terminales:

```bash
# Terminal 1
npm run dev

# Terminal 2  
npm run cms-proxy-server
```

Luego ve a `http://localhost:4321/admin`
