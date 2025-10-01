# ☁️ Configurar Cloudinary (Gratis - 25GB)

## 📋 Paso 1: Crear cuenta en Cloudinary

1. Ve a: **https://cloudinary.com/users/register_free**
2. Regístrate con Google o email
3. Confirma tu email si es necesario

---

## 📦 Paso 2: Obtener tu Cloud Name

1. Una vez dentro, ve al **Dashboard** (página principal)
2. En la parte superior verás una sección que dice **"Product Environment Credentials"**
3. Copia el valor de **"Cloud Name"** (ejemplo: `dxxxxxxxx`)

---

## ⚙️ Paso 3: Crear Upload Preset (IMPORTANTE)

1. En el menú lateral de Cloudinary, ve a **Settings** (⚙️ Configuración)
2. Haz clic en la pestaña **Upload**
3. Baja hasta encontrar **"Upload presets"**
4. Haz clic en **"Add upload preset"**
5. Configura así:

   - **Preset name**: `propuesta_indecente`
   - **Signing mode**: Selecciona **"Unsigned"** ⚠️ MUY IMPORTANTE
   - **Folder**: (déjalo vacío o pon `propuesta-indecente`)
   - Deja todo lo demás por defecto

6. Haz clic en **"Save"**

---

## 🔧 Paso 4: Configurar en tu proyecto

1. Abre el archivo **`cloudinary-config.js`** en tu proyecto
2. Reemplaza `'TU_CLOUD_NAME'` con tu Cloud Name real

**Ejemplo:**
```javascript
const CLOUDINARY_CONFIG = {
    cloudName: 'dxxxxxxxx', // 👈 Tu Cloud Name aquí
    uploadPreset: 'propuesta_indecente'
};
```

3. Guarda el archivo

---

## 📊 Límites del plan gratuito:

✅ **25 GB** de almacenamiento  
✅ **25 GB** de ancho de banda/mes  
✅ **25,000** transformaciones/mes  
✅ **Imágenes** ilimitadas  
✅ **Videos** hasta 100MB cada uno  

---

## ✅ Verificar que funciona

1. Sube los cambios a GitHub
2. Abre la página web
3. Intenta subir una foto
4. Debería decir "☁️ Subiendo a la nube..." y luego "¡Recuerdo agregado con éxito! 💕"

---

## 🐛 Si hay errores:

### Error 401 (Unauthorized):
- Verifica que el Upload Preset sea **"Unsigned"** (sin firma)
- Verifica que el nombre del preset sea exactamente `propuesta_indecente`

### Error de red:
- Verifica tu conexión a internet
- Verifica que el Cloud Name esté correcto

---

## 🎉 ¡Listo!

Ahora puedes subir fotos y videos de alta calidad sin límites de compresión! 💕

