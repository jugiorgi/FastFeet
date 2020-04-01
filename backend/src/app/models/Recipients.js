import Sequelize, { Model } from 'sequelize';

class Recipients extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                street: Sequelize.STRING,
                number: Sequelize.STRING,
                complement: Sequelize.STRING,
                state: Sequelize.STRING,
                city: Sequelize.STRING,
                zip_code: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

export default Recipients;
