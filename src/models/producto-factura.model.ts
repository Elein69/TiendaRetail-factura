import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Factura} from './factura.model';

@model({
  settings: {
    foreignKeys: {
      fk_productoFactura_id_factura: {
        name: 'fk_productoFactura_id_factura',
        entity: 'Factura',
        entityKey: 'id',
        foreignKey: 'id_factura',
      }
    },
  },
})
export class ProductoFactura extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  precio_unitario: number;

  @property({
    type: 'number',
    required: true,
  })
  id_producto: number;

  @belongsTo(() => Factura, {name: 'pertece_a'})
  id_factura: number;

  constructor(data?: Partial<ProductoFactura>) {
    super(data);
  }
}

export interface ProductoFacturaRelations {
  // describe navigational properties here
}

export type ProductoFacturaWithRelations = ProductoFactura & ProductoFacturaRelations;
