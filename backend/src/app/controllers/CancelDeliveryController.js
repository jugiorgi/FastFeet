import Deliveryman from '../models/Deliveryman';
import Order from '../models/Orders';
import Queue from '../../lib/Queue';
import CancelledMail from '../jobs/CancelledMail';
import Recipients from '../models/Recipients';
import DeliveryProblem from '../models/DeliveryProblem';

class CancelDeliveryController {
    async delete(req, res) {
        const { id } = req.params;

        const order = await Order.findByPk(id, {
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
                {
                    model: Deliveryman,
                    as: 'deliverymans',
                    attributes: ['name', 'email'],
                },
            ],
        });

        if (order.canceled_at) {
            return res
                .status(400)
                .json({ error: 'Delivery has already been canceled' });
        }

        order.canceled_at = new Date();

        await Queue.add(CancelledMail.key, {
            order,
        });

        await DeliveryProblem.destroy({ where: { order_id: id } });

        await order.save();

        return res.json(order);
    }
}
export default new CancelDeliveryController();
