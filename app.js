const express = require('express');
const clientesRouter = require('./src/rutas/clientesRutas');
const empleadosRouter = require('./src/rutas/empleadosRutas');
const categoriasRouter = require('./src/rutas/categoriasRutas');
const productosRouter = require('./src/rutas/productosRutas');
const pedidosRouter = require('./src/rutas/pedidosRutas');
const detallePedidoRouter = require('./src/rutas/detallePedidoRutas');

const app = express();

app.use(express.json());
app.use('/api/empleados', empleadosRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/categorias', categoriasRouter);
app.use('/api/productos', productosRouter);
app.use('/api/pedidos', pedidosRouter);
app.use('/api/detalle-pedido', detallePedidoRouter);

app.use((req, res) => {
  res.status(404).json({
    exito: false,
    mensaje: 'Ruta no encontrada'
  });
});


app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      exito: false,
      mensaje: 'El cuerpo de la petición no es un JSON válido'
    });
  }

  console.error('Error no controlado:', err);
  return res.status(500).json({
    exito: false,
    mensaje: 'Error interno del servidor'
  });
});

module.exports = app;