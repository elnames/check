# 🔐 Configurar Reglas de Firebase Storage

## ⚠️ IMPORTANTE - Debes configurar estas reglas en Firebase Console

### 1. Ve a Firebase Console
1. Abre https://console.firebase.google.com
2. Selecciona tu proyecto **propuesta-indecente**
3. En el menú lateral, haz clic en **Storage**
4. Haz clic en la pestaña **Rules** (Reglas)

### 2. Copia y pega estas reglas:

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Permitir lectura y escritura a todos en la carpeta memories
    match /memories/{allPaths=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

### 3. Haz clic en **Publicar** (Publish)

---

## 🎯 ¿Qué hace esto?

- ✅ Permite que **cualquier persona** pueda subir fotos/videos a la carpeta `memories/`
- ✅ Permite que **cualquier persona** pueda ver las fotos/videos
- ✅ Todos los archivos se guardan en la carpeta `memories/` dentro de Storage
- ✅ Los archivos se nombran automáticamente con timestamp único

---

## 📊 Límites Gratuitos de Firebase Storage:

- **Almacenamiento**: 5 GB gratis
- **Descarga**: 1 GB/día gratis
- **Subida**: 20,000 operaciones/día gratis

Con estos límites, puedes almacenar **cientos de fotos** y **decenas de videos** sin problema! 💕

---

## 🔒 Nota de Seguridad:

Estas reglas permiten acceso público porque es una página romántica entre dos personas.
Si quisieras más seguridad en el futuro, podrías:
- Agregar autenticación de Firebase
- Limitar por tamaño de archivo
- Restringir tipos de archivo

Pero para tu caso de uso actual, estas reglas son perfectas! ✨

