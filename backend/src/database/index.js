import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Recipients from '../app/models/Recipients';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';
import Orders from '../app/models/Orders';
import DeliveryProblem from '../app/models/DeliveryProblem';

const models = [User, Recipients, File, Deliveryman, Orders, DeliveryProblem];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
