# 📱 Chat en tiempo real con Ionic y Firebase

¡Bienvenido a **BusKi**, una aplicación de chat en tiempo real! Se trata de un prototipo de app de mensajería utilizada por la empresa BusKa, un comparador de líneas de autobús, para conectar con sus usarios y clientes y resolver todas sus dudas y problemas. Esta app se ha desarrollado con **Ionic** y **Angular 17** para el frontend, y utilizando **Firebase** como backend y base de datos.

## 🚀 Características

- 💬 Mensajería en tiempo real
- 🔐 Autenticación con Firebase (Google)
- 🛡️ Protección de rutas
- 🔥 Base de datos en Firebase Firestore
- 📲 Interfaz moderna basada en Ionic

## 🛠️ Tecnologías Utilizadas

- **Ionic** + **Angular 17** para la interfaz
- **Firebase Authentication** para la gestión de usuarios
- **Firebase Firestore** como base de datos NoSQL

## 📦 Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Ipefor/busKi.git
   cd bus-ki
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura Firebase:
   - Crea un proyecto en Firebase
   - Habilita **Authentication** y **Firestore**
   - Copia las credenciales en el archivo `src/environments/environment.ts`:


   ```typescript
   export const environment = {
     production: false,
     firebaseConfig: {
       apiKey: "TU_API_KEY",
       authDomain: "TU_AUTH_DOMAIN",
       projectId: "TU_PROJECT_ID",
       storageBucket: "TU_STORAGE_BUCKET",
       messagingSenderId: "TU_MESSAGING_SENDER_ID",
       appId: "TU_APP_ID"
     }
   };
   ```

4. Ejecuta la aplicación:
   ```bash
   ionic serve
   ```

## 📸 Capturas de Pantalla

![imagen](https://github.com/user-attachments/assets/4d61f650-8883-4fc9-9312-dfa185bfbd86)

---

🎉 ¡Gracias por visitar este proyecto!

