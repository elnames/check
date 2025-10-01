# Instrucciones para Configurar Firebase

## Paso 1: Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Nombra tu proyecto (ejemplo: "propuesta-romantica")
4. Desactiva Google Analytics (no es necesario)
5. Haz clic en "Crear proyecto"

## Paso 2: Configurar la aplicación web

1. En la página principal del proyecto, haz clic en el ícono `</>`  (Web)
2. Registra tu aplicación con un apodo (ejemplo: "web-app")
3. NO marques "Firebase Hosting"
4. Haz clic en "Registrar app"
5. Copia todo el objeto `firebaseConfig` que aparece
6. Pega la configuración en el archivo `firebase-config.js`, reemplazando los valores de ejemplo

## Paso 3: Habilitar Firestore Database

1. En el menú lateral, ve a "Compilación" > "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de producción"
4. Elige una ubicación (ejemplo: `southamerica-east1` para Chile/Argentina)
5. Haz clic en "Habilitar"

## Paso 4: Configurar reglas de seguridad de Firestore

1. Ve a la pestaña "Reglas" en Firestore
2. Reemplaza las reglas con estas (permiten lectura/escritura pública):

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

3. Haz clic en "Publicar"

## Paso 5: Habilitar Storage (opcional, para archivos grandes)

1. En el menú lateral, ve a "Compilación" > "Storage"
2. Haz clic en "Comenzar"
3. Selecciona "Comenzar en modo de producción"
4. Usa la misma ubicación que Firestore
5. Haz clic en "Listo"

## Paso 6: Configurar reglas de Storage

1. Ve a la pestaña "Reglas" en Storage
2. Reemplaza las reglas con estas:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

3. Haz clic en "Publicar"

## Paso 7: Subir los cambios a GitHub

```bash
git add .
git commit -m "Add Firebase integration"
git push origin main
```

## Paso 8: Verificar en Vercel

Vercel automáticamente detectará los cambios y desplegará la nueva versión con Firebase integrado.

## ¡Listo!

Ahora las imágenes y videos se guardarán en la nube y se podrán ver desde cualquier dispositivo 💕

## Notas importantes:

- Las reglas de seguridad actuales permiten acceso público. Si quieres más seguridad, puedes agregar autenticación más adelante.
- Firebase tiene un plan gratuito generoso (Spark Plan) que incluye:
  - 1 GB de almacenamiento en Firestore
  - 10 GB de transferencia de datos al mes
  - 50,000 lecturas por día
  - 20,000 escrituras por día
- Esto es más que suficiente para una página personal con unos cuantos recuerdos.

