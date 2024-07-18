# Proyecto de Node.js para Registrar Nombres y Apellidos

Esta aplicación en Node.js permite registrar nombres y apellidos mediante una solicitud HTTP POST. Los nombres y apellidos registrados recientemente (en los últimos 10 minutos) no se pueden volver a registrar hasta que pase el tiempo especificado.

## Instalación

1. Clona este repositorio:
    ```sh
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2. Instala las dependencias del proyecto:
    ```sh
    npm install
    ```
## Ejecución de la Aplicación

Para iniciar el servidor, ejecuta el siguiente comando:
```sh
npm start
```

## Ejecución de Tests

Este proyecto utiliza Jest para los tests.

Ejecutar los tests con el siguiente comando:
    ```sh
    npm test
    ```

## Uso de la API

POST /names
Registra un nuevo nombre y apellido. Si el nombre y apellido ya han sido registrados en los últimos 10 minutos, se devuelve un error.

##### Solicitud

- **URL**: `http://localhost:3000/names`
- **Método**: `POST`
- **Headers**: `Content-Type: application/json`
- **Cuerpo (JSON)**:
    ```json
    {
        "name": "Juan",
        "lastName": "Pérez"
    }
    ```


##### Respuestas

- **200 OK**: Nombre y apellido registrados correctamente.
    ```json
    {
        "message": "Nombre: Juan, Apellido: Pérez"
    }
    ```

- **400 Bad Request**: Faltan campos requeridos.
    ```json
    {
        "error": "Faltan campos: nombre y apellido son requeridos"
    }
    ```

- **409 Conflict**: El nombre y apellido ya han sido registrados recientemente.
    ```json
    {
        "error": "El nombre y apellido ya han sido registrados en los últimos 10 minutos"
    }
    ```