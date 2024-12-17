# Proyecto Web

Este repositorio contiene una aplicación full-stack con un backend y un frontend organizados para el desarrollo de esta.

---

## Backend: Carpeta demo

El backend sigue una estructura basada en la arquitectura MVC (Modelo-Vista-Controlador) y está dividido en:

### 1. Model
- Representa la estructura de datos que se almacena en la base de datos.
- Contiene las clases entidad con atributos que corresponden a las columnas de las tablas.

### 2. Repository
- Define la lógica de acceso a la base de datos.
- Utiliza interfaces que extienden de JpaRepository (o similares).
- Proporciona métodos CRUD básicos como save(), findById() y delete().

### 3. Service
- Contiene la lógica de negocio de la aplicación.
- Es una capa intermedia entre el controller y el repository.
- Se encarga de realizar operaciones más complejas utilizando los repositorios.

### 4. Controller
- Expone los endpoints HTTP para interactuar con el backend.
- Recibe las peticiones, las delega al **service y devuelve la respuesta.

---

## Frontend

El frontend está organizado en varias subcarpetas siguiendo:

### 1. src
Carpeta principal que contiene el código fuente del frontend.

### 2. Components
- Contiene los componentes reutilizables de la interfaz.
- Cada componente tiene:
  - .html → Vista
  - .css → Estilos
  - .ts → Lógica del componente

### 3. Services
Define los servicios que gestionan la comunicación HTTP con el backend.

### 4. Assets
Contiene archivos estáticos como imágenes, fuentes o archivos JSON.

### 5. Routing
- Define la configuración de las rutas de la aplicación.
- Permite navegar entre componentes y páginas.

### 6. Utils o Helpers
Contiene funciones auxiliares reutilizables en toda la aplicación.

---

## Interacción entre Backend y Frontend

1. El frontend realiza peticiones HTTP a través de servicios a los endpoints del backend.
2. El backend responde con datos en formato JSON.
3. El frontend procesa la respuesta y actualiza la interfaz de usuario.

---

## Tecnologías utilizadas
- Backend: Java, Spring Boot.
- Frontend: HTML, CSS,  framework Angular.
- Base de datos: h2.

---

## Instalación y Ejecución
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/pmgespina/web.git
   ```

2. Backend:
   - Navega a la carpeta demo.
   - Compila y ejecuta el backend con el comando
     ```bash
     ./mvnw spring-boot:run
     ```

3. Frontend:
   - Navega a la carpeta del frontend.
   - Instala dependencias y ejecuta el servidor:
     ```bash
     ng serve --open
     ```

4. Accede a la aplicación en http://localhost:4200
