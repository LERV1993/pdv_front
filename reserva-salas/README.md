# 🏢 ReservaSalas - Sistema de Gestión de Reservas

Sistema moderno y completo para la gestión de reservas de salas, desarrollado con React y diseñado para facilitar la administración de espacios y recursos en organizaciones.

## 🚀 Características Principales

### � **Autenticación**
- **Sistema de login**: Autenticación JWT con roles (admin/usuario)
- **Perfiles diferenciados**: Interfaz específica según el rol del usuario
- **Sesiones seguras**: Token Bearer con renovación automática

### 🏢 **Gestión de Salas**
- **Catálogo de salas**: Visualización completa de todas las salas disponibles
- **Información detallada**: Capacidad, características y equipamiento de cada sala
- **Disponibilidad en tiempo real**: Estado actualizado de ocupación
- **Gestión administrativa**: CRUD completo de salas para administradores

### 📅 **Sistema de Reservas**
- **Reservas intuitivas**: Proceso guiado paso a paso
- **Calendario interactivo**: Selección visual de fechas y horarios
- **Verificación de conflictos**: Prevención automática de solapamientos
- **Gestión completa**: Crear, visualizar, modificar y cancelar reservas
- **Filtros avanzados**: Búsqueda por fecha, sala y estado

### 📊 **Panel de Administración**
- **Dashboard ejecutivo**: Métricas y estadísticas en tiempo real
- **Reportes detallados**: Análisis de uso y ocupación
- **Predicciones**: Algoritmos de predicción de ocupación semanal
- **Gestión integral**: Control total sobre salas, reservas y artículos

### 🎯 **Gestión de Artículos**
- **Inventario digital**: Catálogo de artículos y recursos disponibles
- **Asociación con reservas**: Vinculación de artículos específicos a reservas
- **Control de disponibilidad**: Gestión del estado de artículos

## 🛠️ **Stack Tecnológico**

### **Frontend**
- **React 19.1.1** - Biblioteca principal
- **Vite 7.1.7** - Herramienta de construcción ultrarrápida
- **TailwindCSS 3.4.18** - Framework de CSS utilitario
- **React Router DOM 7.9.4** - Enrutamiento SPA

### **Visualización de Datos**
- **Chart.js 4.5.1** - Gráficos interactivos
- **React-ChartJS-2 5.3.0** - Integración React-Chart.js

### **Herramientas de Desarrollo**
- **ESLint 9.36.0** - Linting y calidad de código
- **PostCSS 8.5.6** - Procesamiento de CSS
- **Autoprefixer 10.4.21** - Compatibilidad CSS automática

## 🏗️ **Arquitectura y Tecnologías**

### **Tecnologías Principales**
- ⚛️ **React 19.1.1** - Framework de UI
- ⚡ **Vite 7.1.7** - Build tool y dev server
- 🎨 **TailwindCSS 3.4.18** - Framework de estilos utility-first
- 📊 **Chart.js 4.5.1** - Visualización de datos y analytics
- 🔄 **React Router** - Navegación SPA
- 🔐 **Context API** - Gestión de estado de autenticación

### **Arquitectura del Proyecto**

```
src/
├── components/          # Componentes reutilizables
│   ├── admin/          # Componentes del dashboard administrativo
│   │   ├── WeeklyPredictionChart.jsx  # Predicción de ocupación
│   │   ├── AdminStats.jsx             # Estadísticas generales
│   │   ├── TabBookings.jsx            # Gestión de reservas
│   │   └── TabRooms.jsx               # Gestión de salas
│   ├── shared/         # Componentes compartidos (Header, Loader)
│   └── user/           # Componentes del usuario
│       ├── BookingForm.jsx            # Wizard de reserva (3 pasos)
│       ├── Calendar.jsx               # Selección de fecha
│       └── RoomSelector.jsx           # Selección de sala
├── config/             # Configuración centralizada
│   └── index.js       # Variables de entorno
├── context/            # Contextos de React
│   └── AuthContext.jsx # Autenticación y usuario actual
├── hooks/              # Custom hooks
│   └── useAuth.js     # Hook de autenticación
├── pages/              # Páginas principales
│   ├── AdminDashboard.jsx    # Dashboard administrativo
│   ├── UserDashboard.jsx     # Dashboard de usuario
│   └── AuthScreen.jsx        # Pantalla de login
├── services/           # Servicios de API
│   ├── apiService.js          # Cliente HTTP centralizado
│   ├── authService.js         # Autenticación
│   ├── bookingService.js      # Reservas
│   └── roomService.js         # Salas y disponibilidad
└── utils/              # Utilidades y helpers
```

### **Configuración Centralizada**

El proyecto utiliza un sistema de configuración centralizado en `src/config/index.js`:

```javascript
// Configuración base
export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
export const isDevelopment = import.meta.env.MODE === 'development';
export const isProduction = import.meta.env.MODE === 'production';
```

Todos los servicios importan esta configuración:

```javascript
import config from '../config';
const API_URL = config.apiBaseUrl;
```

## 🚀 **Instalación y Configuración**

### **Prerrequisitos**
- **Node.js** >= 16.0.0
- **npm** >= 7.0.0 o **yarn** >= 1.22.0
- **Backend API** ejecutándose en `http://localhost:8080`

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/LERV1993/pdv_front.git
cd reserva-salas
```

### **2. Instalar Dependencias**
```bash
npm install
# o
yarn install
```

### **3. Configurar Variables de Entorno**

Copiar el archivo de ejemplo y configurar según tu entorno:

```bash
cp .env.example .env.local
```

Editar `.env.local` con tus configuraciones:

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:8080
```

**Archivos de entorno disponibles:**
- `.env` - Variables base compartidas
- `.env.development` - Configuración para desarrollo
- `.env.production` - Configuración para producción
- `.env.local` - Configuración local personal (no se sube a git)

**Nota:** Los archivos `.env.local` y `.env.*.local` están en `.gitignore` y no se subirán al repositorio.

### **4. Ejecutar en Desarrollo**
```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en: `http://localhost:5173`

### **5. Construir para Producción**
```bash
npm run build
# o
yarn build
```

### **6. Previsualizar Build de Producción**
```bash
npm run preview
# o
yarn preview
```

## 🔧 **Scripts Disponibles**

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta ESLint para verificar calidad del código |

## 🌐 **API Backend**

### **Base URL**
```
http://localhost:8080
```

Documentación Swagger disponible en: `http://localhost:8080/v3/api-docs`

### **Autenticación**

Todos los endpoints (excepto `/auth/login`) requieren un token JWT en el header:
```
Authorization: Bearer <jwt-token>
```

### **Endpoints Principales**

#### **Autenticación**
```http
POST /auth/login
Content-Type: application/json

Body: 
{
  "username": "admin@reservas.com",
  "password": "admin123"
}

Response:
{
  "username": "admin@reservas.com",
  "message": "Authentication successful",
  "jwt": "eyJhbGciOiJIUzM4NCJ9..."
}
```

#### **Salas (Rooms)**
```http
GET /rooms
Response: [
  { "id": 1, "name": "Sala A3", "capacity": 15 }
]

POST /rooms
Body: { "id": null, "name": "Sala A3", "capacity": 32 }

PUT /rooms
Body: { "id": 1, "name": "Sala A3 - edited", "capacity": 20 }

DELETE /rooms/{id}
```

#### **Reservaciones (Reservations)**
```http
GET /reservation
Response: [
  {
    "id": 1,
    "id_room": 3,
    "id_people": 5,
    "date_hour_start": "2025-10-18 11:00:00",
    "date_hour_end": "2025-10-18 12:00:00"
  }
]

GET /reservation/get-all-reservation-details
Response: [
  {
    "id": 1,
    "room": { "id": 3, "name": "Sala A", "capacity": 10 },
    "people": { "id": 5, "name": "Juan", "email": "juan@example.com" },
    "date_hour_start": "2025-10-18 11:00:00",
    "date_hour_end": "2025-10-18 12:00:00",
    "articles": [
      { "id": 1, "name": "Proyector", "available": true }
    ]
  }
]

GET /reservation/reservation-details/{id}
Response: { ...detalles completos de una reserva... }

GET /reservation/reservation-details-by-person/{id}
Response: [ ...todas las reservas de una persona... ]

POST /reservation
Body: {
  "id": null,
  "id_room": 3,
  "id_people": 5,
  "date_hour_start": "2025-10-18 11:00:00",
  "date_hour_end": "2025-10-18 12:00:00",
  "ids_articles": [1, 2, 3]
}

PUT /reservation
Body: { ...mismos campos con id obligatorio... }

DELETE /reservation/{id}
```

#### **Artículos (Articles)**
```http
GET /articles
Response: [
  { "id": 1, "name": "Proyector Gadnic 8000", "available": false }
]

GET /articles/available
Response: [ ...artículos con available: true... ]

GET /articles/not-available
Response: [ ...artículos con available: false... ]

POST /articles-reservation/available
Body: { "date": "2025-10-18 11:00:00" }
Response: [ ...artículos disponibles en esa fecha... ]

POST /articles
Body: { "id": null, "name": "Notebook Dell", "available": true }

PUT /articles
Body: { "id": 18, "name": "Notebook Dell small", "available": false }

DELETE /articles/{id}
```

### **Formato de Fechas**

Las fechas deben enviarse en formato `YYYY-MM-DD HH:MM:SS`:
```javascript
// Ejemplo
"date_hour_start": "2025-10-18 11:00:00"
"date_hour_end": "2025-10-18 12:00:00"
```

**Nota**: La base de datos almacena en UTC, las consultas deben hacerse en GMT-3 (Buenos Aires).

### **Servicios del Frontend**

Todos los servicios están completamente integrados con la API:

#### **reservationService.js**
```javascript
import { reservationService } from './services/reservationService';

// Obtener todas las reservas con detalles
const reservations = await reservationService.getAllReservationDetails();

// Obtener reservas de un usuario
const userReservations = await reservationService.getUserReservations(userId);

// Crear reserva
const newReservation = await reservationService.createReservation({
  roomId: 3,
  userId: 5,
  startTime: "2025-10-18 11:00:00",
  endTime: "2025-10-18 12:00:00",
  articles: [1, 2, 3]
});

// Eliminar reserva
await reservationService.deleteReservation(reservationId);
```

#### **itemsService.js**
```javascript
import { itemsService } from './services/itemsService';

// Obtener todos los artículos
const articles = await itemsService.getAll();

// Obtener artículos disponibles
const available = await itemsService.getAvailable();

// Obtener artículos disponibles en una fecha
const availableByDate = await itemsService.getAvailableByDate("2025-10-18 11:00:00");

// Agregar artículo
const newArticle = await itemsService.add({
  nombre: "Proyector",
  disponible: true
});
```

#### **salasService.js / roomService.js**
```javascript
import { salasService } from './services/salasService';

// Obtener todas las salas
const rooms = await salasService.getAll();

// Agregar sala
const newRoom = await salasService.add({
  nombre: "Sala Nueva",
  capacidad: 20
});

// Actualizar sala
await salasService.update(roomId, { nombre: "Sala Editada", capacidad: 25 });
```

### **Manejo de Errores**

Todos los servicios manejan errores y devuelven arrays vacíos o lanzan excepciones según corresponda:

POST /articulos
Body: { "nombre": "string", "categoria": "string", "disponible": boolean }

PUT /articulos/{id}
DELETE /articulos/{id}
```

## 👥 **Roles y Permisos**

### **Usuario Regular**
- ✅ Ver salas disponibles
- ✅ Crear reservas propias (día completo: 09:00-18:00)
- ✅ Ver y cancelar reservas propias
- ✅ Seleccionar artículos para reservas
- ✅ Wizard de reserva en 3 pasos:
  1. **Seleccionar Sala** - Ver capacidad y tipo
  2. **Seleccionar Fecha** - Calendario con disponibilidad
  3. **Seleccionar Artículos** - Equipamiento necesario

### **Administrador**
- ✅ Todas las funciones de usuario regular
- ✅ Gestionar usuarios (crear, editar, eliminar)
- ✅ Gestionar salas (CRUD completo)
- ✅ Gestionar artículos (CRUD completo)
- ✅ Ver todas las reservas del sistema
- ✅ Cancelar cualquier reserva
- ✅ Dashboard de analytics con:
  - **Predicción de Ocupación** - Gráfico de días pico y bajos por sala
  - **Estadísticas** - Total de reservas, salas, usuarios
  - **Reportes** - Uso por sala, tendencias semanales
## 🎨 **Características de UI/UX**

### **Sistema de Reservas Simplificado**
- **Wizard de 3 Pasos**: Proceso guiado para crear reservas
  1. Selección de sala con detalles de capacidad y tipo
  2. Calendario interactivo con disponibilidad en tiempo real
  3. Selección múltiple de artículos necesarios
- **Reservas de Día Completo**: Sistema simplificado (09:00-18:00)
- **Barra de Progreso**: Indicador visual del paso actual

### **Dashboard Administrativo**
- **Analytics con Chart.js**: Visualización de datos interactiva
- **Predicción de Ocupación**: Gráfico semanal mostrando días pico y bajos
- **Estadísticas en Tiempo Real**: Métricas de reservas, salas y usuarios
- **Gestión por Tabs**: Organización clara de funcionalidades

### **Experiencia General**
- **Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- **Tema Oscuro/Claro**: Interfaz adaptable a preferencias del usuario
- **Animaciones Suaves**: Transiciones CSS para mejor experiencia
- **Feedback Visual**: Indicadores de estado y confirmaciones
- **Accesibilidad**: Cumple estándares WCAG básicos
- **Loading States**: Indicadores de carga para mejor UX

## 🔒 **Seguridad**

- **Autenticación basada en tokens**: Sistema seguro de sesiones con JWT
- **Validación de permisos**: Control de acceso por rol (usuario/admin)
- **Sanitización de datos**: Prevención de XSS y ataques similares
- **Variables de entorno**: Configuración sensible protegida
- **HTTPS Ready**: Preparado para despliegue seguro
- **Fallback automático**: Sistema resiliente con localStorage como respaldo

## 📈 **Performance**

- **Code Splitting**: Carga bajo demanda de componentes
- **Lazy Loading**: Optimización de imágenes y recursos
- **Caching Inteligente**: Gestión eficiente de datos en cache con localStorage
- **Bundle Optimization**: Tamaño mínimo de archivos JavaScript con Vite
- **API centralizada**: Cliente HTTP único para todas las peticiones

## 🚀 **Despliegue**

### **Variables de Entorno para Producción**

Antes de desplegar, configurar las variables de entorno según el hosting:

**Vercel / Netlify:**
```bash
VITE_API_BASE_URL=https://tu-api.com
```

**Servidor Tradicional:**
Editar `.env.production`:
```env
VITE_API_BASE_URL=https://tu-api-produccion.com
```

### **Vercel (Recomendado)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Configurar variables de entorno en Vercel Dashboard:
# Settings → Environment Variables → VITE_API_BASE_URL
```

### **Netlify**
```bash
# Build del proyecto
npm run build

# Subir carpeta dist/ a Netlify
# Configurar variables en: Site Settings → Environment Variables
```

### **Servidor Tradicional**
```bash
# Build del proyecto con .env.production configurado
npm run build

# Servir carpeta dist/ con cualquier servidor web (nginx, apache, etc.)
```

## 🛠️ **Desarrollo**

### **Estructura de Servicios**

```javascript
// apiService.js - Cliente HTTP centralizado
import config from '../config';

const API_URL = config.apiBaseUrl;

export const apiService = {
  get: (endpoint) => fetch(`${API_URL}${endpoint}`),
  post: (endpoint, data) => fetch(`${API_URL}${endpoint}`, {...}),
  // ...
};

// authService.js - Autenticación con fallback
export const login = async (email, password) => {
  try {
    // Intenta API backend
    const response = await apiService.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    // Fallback a localStorage
    console.warn('API offline, usando datos locales');
    return validateLocalCredentials(email, password);
  }
};
```

### **Sistema de Reservas**

El flujo de reserva sigue 3 pasos:

```javascript
// Paso 1: Selección de sala
const [selectedRoom, setSelectedRoom] = useState(null);

// Paso 2: Selección de fecha
const [selectedDate, setSelectedDate] = useState(null);

// Paso 3: Selección de artículos
const [selectedArticles, setSelectedArticles] = useState([]);

// Crear reserva día completo (09:00-18:00)
const booking = {
  salaId: selectedRoom.id,
  fecha: selectedDate,
  horaInicio: '09:00',
  horaFin: '18:00',
  articulos: selectedArticles
};
```

### **Analytics y Predicciones**

```javascript
// WeeklyPredictionChart.jsx
const predictionData = {
  sala1: { peak_day: 'tuesday', low_day: 'friday' },
  sala2: { peak_day: 'wednesday', low_day: 'monday' }
};

// Genera gráfico Chart.js con líneas de predicción
<Line data={chartData} options={chartOptions} />
```

## 🤝 **Contribución**

1. Fork el proyecto
2. Crear una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 **Autor**

**LERV1993**
- GitHub: [@LERV1993](https://github.com/LERV1993)

## 🆘 **Soporte**

Si encuentras algún problema o tienes preguntas:

1. Revisa los [Issues existentes](https://github.com/LERV1993/pdv_front/issues)
2. Crea un nuevo Issue si es necesario
3. Proporciona la mayor información posible sobre el problema

---

⭐ ¡Si te gusta este proyecto, dale una estrella en GitHub!
