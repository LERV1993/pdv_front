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

## 🏗️ **Arquitectura del Proyecto**

```
src/
├── components/           # Componentes reutilizables
│   ├── admin/           # Componentes específicos del administrador
│   ├── shared/          # Componentes compartidos
│   └── user/            # Componentes específicos del usuario
├── context/             # Contextos de React (AuthContext)
├── hooks/               # Hooks personalizados
├── pages/               # Páginas principales de la aplicación
├── services/            # Servicios para API y lógica de negocio
│   ├── apiService.js    # Cliente HTTP base
│   ├── authService.js   # Autenticación y usuarios
│   ├── roomService.js   # Gestión de salas
│   ├── reservationService.js # Gestión de reservas
│   ├── articleService.js # Gestión de artículos
│   └── analyticsService.js # Análisis y reportes
├── styles/              # Estilos globales y utilidades
├── utils/               # Funciones utilitarias
└── config/              # Configuraciones de la aplicación
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
Crear archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=ReservaSalas
VITE_APP_VERSION=1.0.0
```

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

La aplicación requiere un backend que proporcione los siguientes endpoints:

### **Autenticación**
- `POST /auth/login` - Iniciar sesión
- `GET /auth/users` - Obtener usuarios

### **Salas**
- `GET /rooms` - Listar todas las salas
- `GET /rooms/{id}` - Obtener sala específica
- `POST /rooms` - Crear nueva sala
- `PUT /rooms/{id}` - Actualizar sala
- `DELETE /rooms/{id}` - Eliminar sala

### **Reservas**
- `GET /reservation/get-all-reservation-details` - Listar reservas con detalles
- `GET /reservation/{id}` - Obtener reserva específica
- `POST /reservation` - Crear nueva reserva
- `DELETE /reservation/{id}` - Eliminar reserva
- `GET /reservation/user/{userId}` - Reservas por usuario
- `GET /reservation/room/{roomId}` - Reservas por sala

### **Artículos**
- `GET /articles` - Listar artículos
- `GET /articles/{id}` - Obtener artículo específico
- `POST /articles` - Crear artículo
- `PUT /articles/{id}` - Actualizar artículo
- `DELETE /articles/{id}` - Eliminar artículo

## 👥 **Roles y Permisos**

### **Usuario Regular**
- ✅ Ver salas disponibles
- ✅ Crear reservas propias
- ✅ Ver y cancelar reservas propias
- ✅ Asociar artículos a reservas

### **Administrador**
- ✅ Todas las funciones de usuario regular
- ✅ Gestionar usuarios (crear, editar, eliminar)
- ✅ Gestionar salas (CRUD completo)
- ✅ Gestionar artículos (CRUD completo)
- ✅ Ver todas las reservas del sistema
- ✅ Cancelar cualquier reserva
- ✅ Acceso a reportes y analytics
- ✅ Dashboard ejecutivo con métricas

## 🎨 **Características de UI/UX**

- **Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- **Tema Oscuro/Claro**: Interfaz adaptable a preferencias del usuario
- **Animaciones Suaves**: Transiciones CSS para mejor experiencia
- **Feedback Visual**: Indicadores de estado y confirmaciones
- **Accesibilidad**: Cumple estándares WCAG básicos
- **Loading States**: Indicadores de carga para mejor UX

## 🔒 **Seguridad**

- **Autenticación basada en tokens**: Sistema seguro de sesiones
- **Validación de permisos**: Control de acceso por rol
- **Sanitización de datos**: Prevención de XSS y ataques similares
- **HTTPS Ready**: Preparado para despliegue seguro

## 📈 **Performance**

- **Code Splitting**: Carga bajo demanda de componentes
- **Lazy Loading**: Optimización de imágenes y recursos
- **Caching Inteligente**: Gestión eficiente de datos en cache
- **Bundle Optimization**: Tamaño mínimo de archivos JavaScript

## 🚀 **Despliegue**

### **Vercel (Recomendado)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### **Netlify**
```bash
# Build del proyecto
npm run build

# Subir carpeta dist/ a Netlify
```

### **Servidor Tradicional**
```bash
# Build del proyecto
npm run build

# Servir carpeta dist/ con cualquier servidor web
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
