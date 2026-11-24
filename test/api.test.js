const test = require('node:test');
const assert = require('node:assert/strict');

const CategoriasControlador = require('../src/controlador/categoriasControlador');
const ClientesControlador = require('../src/controlador/clientesControlador');
const EmpleadosControlador = require('../src/controlador/empleadosControlador');
const ProductosControlador = require('../src/controlador/productosControlador');
const PedidosControlador = require('../src/controlador/pedidosControlador');
const DetallePedidoControlador = require('../src/controlador/detallePedidoControlador');

function response() {
    return {
        statusCode: undefined,
        body: undefined,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(body) {
            this.body = body;
            return this;
        }
    };
}

test('POST /api/categorias rechaza un nombre faltante', async () => {
    const res = response();
    await CategoriasControlador.crearCategoria({ body: {} }, res);
    assert.equal(res.statusCode, 400);
    assert.equal(res.body.exito, false);
});

test('POST /api/clientes rechaza cuando falta la ciudad', async () => {
    const res = response();
    await ClientesControlador.crear({ body: { nombre: 'Ana' } }, res);
    assert.equal(res.statusCode, 400);
});

test('POST /api/empleados rechaza cuando falta el area', async () => {
    const res = response();
    await EmpleadosControlador.crearEmpleado({ body: { nombre: 'Ana' } }, res);
    assert.equal(res.statusCode, 400);
});

test('POST /api/productos rechaza un cuerpo vacio', async () => {
    const res = response();
    await ProductosControlador.crearProducto({}, res);
    assert.equal(res.statusCode, 400);
});

test('POST /api/productos rechaza un precio negativo', async () => {
    const res = response();
    await ProductosControlador.crearProducto(
        { body: { nombre: 'Mouse', id_categoria: 1, precio: -5, costo: 10, stock: 3 } },
        res
    );
    assert.equal(res.statusCode, 400);
});

test('POST /api/pedidos rechaza un id_cliente invalido', async () => {
    const res = response();
    await PedidosControlador.crearPedido(
        { body: { id_cliente: 'abc', id_empleado: 1, canal: 'Web' } },
        res
    );
    assert.equal(res.statusCode, 400);
});

test('POST /api/detalle-pedido rechaza una cantidad de cero', async () => {
    const res = response();
    await DetallePedidoControlador.crearDetalle(
        { body: { id_pedido: 1, id_producto: 1, cantidad: 0, precio_unitario: 100 } },
        res
    );
    assert.equal(res.statusCode, 400);
});