const express = require('express');
const path = require('path');
const i18n = require('i18n');
const cookieParser = require('cookie-parser');

const app = express();

// Configuración i18n
i18n.configure({
  locales: ['es', 'en'],
  directory: path.join(__dirname, 'i18n'),
  defaultLocale: 'es',
  queryParameter: 'lang',
  cookie: 'lang',
  autoReload: true,
  syncFiles: false,
  updateFiles: true,
  objectNotation: true
});

app.use(cookieParser());

// Inicialización de i18n
app.use(i18n.init);

// Middleware para forzar 'es' si no llega lang
app.use((req, res, next) => {
  if (!req.query.lang) {
    req.setLocale('es');
  }
  res.locals.__ = res.__;
  res.locals.locale = req.getLocale();
  next();
});

// Configurar EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas válidas
app.get('/', (req, res) => {
  // Datos de gatos en adopción
  const gatosEnAdopcion = [
    { 
      nombre: 'Luna', 
      edad: '2 años', 
      sexo: 'Hembra', 
      imagen: '/images/gato1.jpg', 
      descripcion: 'Luna es una gata muy cariñosa y juguetona.' 
    },
    { 
      nombre: 'Simba', 
      edad: '1 año', 
      sexo: 'Macho', 
      imagen: '/images/gato2.jpg', 
      descripcion: 'Simba es un gato tranquilo y observador.' 
    },
    { 
      nombre: 'Milo', 
      edad: '3 años', 
      sexo: 'Macho', 
      imagen: '/images/gato3.jpg', 
      descripcion: 'Milo es un gato curioso y aventurero.' 
    },
    { 
      nombre: 'Nala', 
      edad: '4 años', 
      sexo: 'Hembra', 
      imagen: '/images/gato4.jpg', 
      descripcion: 'Nala es una gata elegante y cariñosa.' 
    }
  ];

  // Asegúrate de que `req.getLocale` esté configurado con i18n
  const currentLocale = req.getLocale ? req.getLocale() : 'es';

  // Renderizar la vista principal
  res.render('index', {
    title: 'Inicio',
    gatos: gatosEnAdopcion,
    locale: currentLocale
  });
});



// Middleware de manejo de errores 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Página no encontrada' });
});

// Middleware de manejo de errores 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Error interno del servidor' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
