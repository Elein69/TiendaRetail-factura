import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Factura, FacturaRelations, ProductoFactura} from '../models';
import {ProductoFacturaRepository} from './producto-factura.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly productoFacturas: HasManyRepositoryFactory<ProductoFactura, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProductoFacturaRepository') protected productoFacturaRepositoryGetter: Getter<ProductoFacturaRepository>,
  ) {
    super(Factura, dataSource);
    this.productoFacturas = this.createHasManyRepositoryFactoryFor('productoFacturas', productoFacturaRepositoryGetter,);
    this.registerInclusionResolver('productoFacturas', this.productoFacturas.inclusionResolver);
  }
}
