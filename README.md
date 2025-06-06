# 📱 Chat en tiempo real con Ionic y Firebase

¡Bienvenido a **BusKi**, un chat en tiempo real! Se trata de un prototipo de app de mensajería utilizada por la empresa BusKa, un comparador de líneas de autobús, para conectar con sus usarios y clientes y resolver todas sus dudas y problemas. Para su desarrollo, se ha utilizado **Ionic** y **Angular 17** para el frontend, y **Firebase** como backend y base de datos.

## 🚀 Características

- 💬 Mensajería en tiempo real
- 🔐 Autenticación con Firebase (Google)
- 🛡️ Protección de rutas
- 🔥 Base de datos en Firebase Firestore
- 📲 Interfaz moderna basada en Ionic

## 🛠️ Tecnologías utilizadas

- **Ionic** y **Angular 17** para la interfaz
- **Firebase Authentication** para la gestión de usuarios
- **Firebase Realtime Database** como base de datos NoSQL

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
   - Habilita **Authentication** y **Realtime Database**
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

## ❌ Gestión de errores

1. Si al hacer el ionic serve salta este error:

  ```Error: node_modules/@angular/fire/compat/database/interfaces.d.ts:47:18 - error TS2430: Interface 'DatabaseSnapshotExists<T>' incorrectly extends interface 'DataSnapshot'.
  Types of property 'forEach' are incompatible.
    Type '(action: (a: DatabaseSnapshot<T>) => boolean) => boolean' is not assignable to type '(action: (a: DataSnapshot & { key: string; }) => boolean | void) => boolean'.
      Types of parameters 'action' and 'action' are incompatible.
        Types of parameters 'a' and 'a' are incompatible.
          Type 'DatabaseSnapshot<T>' is not assignable to type 'DataSnapshot & { key: string; }'.
            Type 'DatabaseSnapshotExists<T>' is not assignable to type 'DataSnapshot & { key: string; }'.
              Type 'DatabaseSnapshotExists<T>' is not assignable to type 'DataSnapshot'.
                Types of property 'forEach' are incompatible.
                  Type '(action: (a: DatabaseSnapshot<T>) => boolean) => boolean' is not assignable to type '(action: (a: DataSnapshot & { key: string; }) => boolean | void) => boolean'.
                    Types of parameters 'action' and 'action' are incompatible.
                      Types of parameters 'a' and 'a' are incompatible.
                        Type 'DatabaseSnapshot<T>' is not assignable to type 'DataSnapshot & { key: string; }'.
                          Type 'DatabaseSnapshotDoesNotExist<T>' is not assignable to type 'DataSnapshot & { key: string; }'.
                            Type 'DatabaseSnapshotDoesNotExist<T>' is not assignable to type '{ key: string; }'.
                              Types of property 'key' are incompatible.
                                Type 'string | null' is not assignable to type 'string'.
                                  Type 'null' is not assignable to type 'string'.

47 export interface DatabaseSnapshotExists<T> extends firebase.database.DataSnapshot {
                    ~~~~~~~~~~~~~~~~~~~~~~


Error: node_modules/@angular/fire/compat/database/interfaces.d.ts:52:18 - error TS2430: Interface 'DatabaseSnapshotDoesNotExist<T>' incorrectly extends interface 'DataSnapshot'.
  Types of property 'forEach' are incompatible.
    Type '(action: (a: DatabaseSnapshot<T>) => boolean) => boolean' is not assignable to type '(action: (a: DataSnapshot & { key: string; }) => boolean | void) => boolean'.
      Types of parameters 'action' and 'action' are incompatible.
        Types of parameters 'a' and 'a' are incompatible.
          Type 'DatabaseSnapshot<T>' is not assignable to type 'DataSnapshot & { key: string; }'.
            Type 'DatabaseSnapshotDoesNotExist<T>' is not assignable to type 'DataSnapshot & { key: string; }'.
              Type 'DatabaseSnapshotDoesNotExist<T>' is not assignable to type 'DataSnapshot'.
                Types of property 'forEach' are incompatible.
                  Type '(action: (a: DatabaseSnapshot<T>) => boolean) => boolean' is not assignable to type '(action: (a: DataSnapshot & { key: string; }) => boolean | void) => boolean'.
                    Types of parameters 'action' and 'action' are incompatible.
                      Types of parameters 'a' and 'a' are incompatible.
                        Type 'DatabaseSnapshot<T>' is not assignable to type 'DataSnapshot & { key: string; }'.
                          Type 'DatabaseSnapshotExists<T>' is not assignable to type 'DataSnapshot & { key: string; }'.
                            Type 'DatabaseSnapshotExists<T>' is not assignable to type '{ key: string; }'.
                              Types of property 'key' are incompatible.
                                Type 'string | null' is not assignable to type 'string'.
                                  Type 'null' is not assignable to type 'string'.

52 export interface DatabaseSnapshotDoesNotExist<T> extends firebase.database.DataSnapshot {
```

2. Modifica el archivo así:

  ```typescript
export interface DatabaseSnapshotExists<T> extends firebase.database.DataSnapshot {
    exists(): true;
    val(): T;
    // forEach(action: (a: DatabaseSnapshot<T>) => boolean): boolean;
    forEach(action: (a: firebase.database.DataSnapshot & { key: string }) => boolean | void): boolean;
}
export interface DatabaseSnapshotDoesNotExist<T> extends firebase.database.DataSnapshot {
    exists(): false;
    val(): null;
    // forEach(action: (a: DatabaseSnapshot<T>) => boolean): boolean;
    forEach(action: (a: firebase.database.DataSnapshot & { key: string }) => boolean | void): boolean;
}
```

3. Si te salta este error:

  ```typescript
Error: Cannot find module 'postcss-modules-local-by-default'
```

4. Instala de nuevo postcss:

```bash
npm i postcss
```

## 📸 Capturas de pantalla

![imagen](https://github.com/user-attachments/assets/4d61f650-8883-4fc9-9312-dfa185bfbd86)


