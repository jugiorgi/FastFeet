import Orders from '../models/Orders';
import Recipients from '../models/Recipients';

class DeliverymanOrdersController {
    async index(req, res) {
        const { id } = req.params;

        const order = await Orders.findAll({
            order: [['created_at', 'DESC']],
            where: { deliveryman_id: id, canceled_at: null, end_date: null },
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
        console.log(order);
        console.log('=============');
        return res.json(order);
    }
}

export default new DeliverymanOrdersController();
