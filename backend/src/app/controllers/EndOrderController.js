import * as Yup from 'yup';
import { isBefore } from 'date-fns';
import Orders from '../models/Orders';
import File from '../models/File';

class EndOrderController {
    async update(req, res) {
        const { id } = req.params;
        const { end_date, signature_id } = req.body;

        const schema = Yup.object().shape({
            end_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const order = await Orders.findByPk(id);
        if (order.end_date) {
            return res
                .status(400)
                .json({ error: 'The product has already been delivered' });
        }

        if (!order.start_date) {
            return res
                .status(400)
                .json({ error: 'The product has not been removed' });
        }

        // Check for past dates
        if (isBefore(Date.parse(end_date), order.start_date)) {
            return res
                .status(400)
                .json({ error: 'Past dates are no permitted' });
        }

        // Check the signature exists
        if (signature_id) {
            const deliverymanAvatar = await File.findByPk(signature_id);
            if (!deliverymanAvatar) {
                return res.status(400).json({ error: 'Avatar is not found' });
            }
        }

        await order.update(req.body);

        return res.json(order);
    }
}

export default new EndOrderController();
