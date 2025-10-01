# 🔥 CONFIGURACIÓN RÁPIDA DE FIREBASE

## ⏱️ Tiempo estimado: 5-10 minutos

## 📋 PASO 1: Crear Proyecto Firebase

1. Abre https://console.firebase.google.com/
2. Haz clic en **"Agregar proyecto"** o **"Create a project"**
3. Nombre del proyecto: `propuesta-romantica` (o el que quieras)
4. **Desactiva** Google Analytics (no lo necesitas)
5. Haz clic en **"Crear proyecto"**
6. Espera a que se cree (30 segundos aprox)
7. Haz clic en **"Continuar"**

## 📱 PASO 2: Registrar App Web

1. En la página principal del proyecto, haz clic en el ícono **`</>`** (Web)
2. Apodo de la app: `web-app`
3. **NO** marques "Firebase Hosting"
4. Haz clic en **"Registrar app"**
5. **IMPORTANTE:** Verás un código como este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "propuesta-romantica.firebaseapp.com",
  projectId: "propuesta-romantica",
  storageBucket: "propuesta-romantica.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

6. **COPIA TODO** ese objeto `firebaseConfig`
7. Ábrelo archivo `firebase-config.js` de tu proyecto
8. **REEMPLAZA** el objeto firebaseConfig con el que copiaste
9. Haz clic en **"Continuar a la consola"**

## 🗄️ PASO 3: Habilitar Firestore Database

1. En el menú lateral izquierdo, busca **"Compilación"** o **"Build"**
2. Haz clic en **"Firestore Database"**
3. Haz clic en **"Crear base de datos"** o **"Create database"**
4. Selecciona **"Comenzar en modo de producción"** o **"Start in production mode"**
5. Ubicación: Elige la más cercana (ej: `southamerica-east1` para Chile/Argentina)
6. Haz clic en **"Habilitar"** o **"Enable"**
7. Espera a que se cree la base de datos

## 🔐 PASO 4: Configurar Reglas de Seguridad

1. En Firestore Database, ve a la pestaña **"Reglas"** o **"Rules"**
2. **REEMPLAZA TODO** el contenido con esto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /memories/{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Haz clic en **"Publicar"** o **"Publish"**

## ✅ PASO 5: Verificar que Funciona

1. Guarda todos los cambios en `firebase-config.js`
2. Sube los cambios a GitHub:
   ```bash
   git add .
   git commit -m "Configure Firebase"
   git push check main
   ```
3. Espera a que Vercel despliegue (1-2 minutos)
4. Abre tu página web
5. Intenta subir una foto de prueba
6. Si funciona, verás el mensaje: **"¡Recuerdo agregado con éxito! 💕"**

## 🎉 ¡LISTO!

Ahora las fotos y videos se guardarán en la nube y se verán en todos los dispositivos.

## ⚠️ IMPORTANTE

- Las reglas actuales permiten acceso público (cualquiera puede leer/escribir)
- Para una página personal es suficiente
- Si quieres más seguridad, puedes agregar autenticación después

## 🆓 Plan Gratuito

Firebase tiene un plan gratuito muy generoso:
- ✅ 1 GB de almacenamiento
- ✅ 10 GB de transferencia al mes  
- ✅ 50,000 lecturas por día
- ✅ 20,000 escrituras por día

Más que suficiente para tu página 💕

## 🐛 Problemas Comunes

### "Firebase is not defined"
- Verifica que copiaste bien el `firebaseConfig`
- Asegúrate de que subiste los cambios a GitHub

### "Permission denied"
- Verifica que configuraste las reglas de Firestore correctamente
- Asegúrate de hacer clic en "Publicar"

### Las fotos no aparecen
- Abre la consola del navegador (F12)
- Busca errores en rojo
- Verifica que el `projectId` sea correcto

