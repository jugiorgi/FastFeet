import Sequelize, { Model } from 'sequelize';

class Order extends Model {
    static init(sequelize) {
        super.init(
            {
                product: Sequelize.STRING,
                canceled_at: Sequelize.DATE,
                start_date: Sequelize.DATE,
                end_date: Sequelize.DATE,
            },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Recipients, {
            foreignKey: 'recipient_id',
            as: 'recipient',
        });
        this.belongsTo(models.File, {
            foreignKey: 'signature_id',
            as: 'signature',
        });
        this.belongsTo(models.Deliveryman, {
            foreignKey: 'deliveryman_id',
            as: 'deliverymans',
        });
    }
}

export default Order;
