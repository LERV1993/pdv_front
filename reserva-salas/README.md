# 🏢 ReservaSalas - Sistema de Gestión de Reservas

Sistema moderno y completo para la gestión de reservas de salas, desarrollado con React y diseñado para facilitar la administración de espacios y recursos en organizaciones.

## 🚀 Características Principales

### 👥 **Gestión de Usuarios**
- **Autenticación dual**: Sistema de login para usuarios regulares y administradores
- **Perfiles diferenciados**: Interfaz específica según el rol del usuario
- **Gestión de usuarios**: Los administradores pueden crear, editar y gestionar usuarios

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
- **Filtros avanzados**: Búsqueda por fecha, sala, usuario y estado

### 📊 **Panel de Administración**
- **Dashboard ejecutivo**: Métricas y estadísticas en tiempo real
- **Reportes detallados**: Análisis de uso y ocupación
- **Predicciones**: Algoritmos de predicción de ocupación semanal
- **Gestión integral**: Control total sobre usuarios, salas y reservas

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

Documentación Swagger disponible en: `http://localhost:8080/swagger-ui`

### **Endpoints Principales**

#### **Autenticación**
```
POST /auth/login
Body: { "email": "string", "password": "string" }
Response: { "token": "jwt-token", "user": {...} }

GET /people
Response: [{ "id": 1, "name": "...", "email": "...", "isAdmin": true }]
```

#### **Salas**
```
GET /salas
Response: [{ "id": 1, "nombre": "Sala A", "capacidad": 10, "tipo": "Reunión" }]

GET /salas/{id}
Response: { "id": 1, "nombre": "Sala A", "capacidad": 10 }

POST /salas
Body: { "nombre": "string", "capacidad": number, "tipo": "string" }

PUT /salas/{id}
DELETE /salas/{id}
```

#### **Reservas**
```
GET /reservas
Response: [{
  "id": 1,
  "usuario": "Usuario",
  "salaId": 1,
  "fecha": "2024-01-15",
  "horaInicio": "09:00",
  "horaFin": "18:00",
  "estado": "confirmada"
}]

POST /reservas
Body: {
  "salaId": 1,
  "fecha": "2024-01-15",
  "horaInicio": "09:00",
  "horaFin": "18:00",
  "articulos": ["Proyector", "Laptop"]
}

PUT /reservas/{id}
DELETE /reservas/{id}
```

#### **Disponibilidad**
```
GET /salas/{id}/disponibilidad?fecha=2024-01-15
Response: {
  "disponible": true,
  "horariosOcupados": ["10:00-12:00", "14:00-16:00"]
}
```

#### **Analytics y Predicciones**
```
GET /analytics/predictions
Response: {
  "sala1": { "peak_day": "tuesday", "low_day": "friday" },
  "sala2": { "peak_day": "wednesday", "low_day": "monday" }
}
```

### **Manejo de Errores**

El sistema implementa un mecanismo de fallback automático:
- **Modo Online**: Usa backend API en `http://localhost:8080`
- **Modo Offline**: Usa localStorage como respaldo temporal
- **Reconexión Automática**: Intenta reconectar al API cuando esté disponible

```javascript
// Ejemplo de servicio con fallback
export const getReservations = async () => {
  try {
    const response = await apiService.get('/reservas');
    return response.data;
  } catch (error) {
    console.warn('API no disponible, usando datos locales');
    return JSON.parse(localStorage.getItem('reservations') || '[]');
  }
};
```

### **Artículos**
```
GET /articulos
Response: [{ "id": 1, "nombre": "Proyector", "categoria": "Tecnología", "disponible": true }]

GET /articulos/{id}
Response: { "id": 1, "nombre": "Proyector", "categoria": "Tecnología" }

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
