import { Op } from 'sequelize';
import Orders from '../models/Orders';
import Recipients from '../models/Recipients';

class OrdersDeliveries {
    async index(req, res) {
        const { id } = req.params;

        const order = await Orders.findAll({
            where: {
                deliveryman_id: id,
                canceled_at: null,
                end_date: {
                    [Op.ne]: null,
                },
            },
            include: [
                {
                    model: Recipients,
                    as: 'recipient',
                    attributes: [
                        'name',
                        'email',
                        'street',
                        'number',
                        'complement',
                        'city',
                        'state',
                        'zip_code',
                    ],
                },
            ],
        });

        return res.json(order);
    }
}
export default new OrdersDeliveries();
