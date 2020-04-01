import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isBefore, getHours, startOfDay, endOfDay, parseISO } from 'date-fns';
import Orders from '../models/Orders';

class StartOrderController {
    async update(req, res) {
        const { id } = req.params;
        const { start_date } = req.body;

        const schema = Yup.object().shape({
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const order = await Orders.findByPk(id);
        if (order.start_date) {
            return res
                .status(400)
                .json({ error: 'The product has already been withdrawn' });
        }

        // Check the number of the starts in the day
        const parseDate = parseISO(start_date);

        const { count: allDeliveries } = await Orders.findAndCountAll({
            where: {
                deliveryman_id: order.deliveryman_id,
                canceled_at: null,
                start_date: {
                    [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
                },
            },
        });

        if (allDeliveries === 6) {
            return res
                .status(401)
                .json({ error: 'You can not exceed 5 withdraw per day' });
        }

        // Check for past dates
        if (isBefore(Date.parse(start_date), new Date())) {
            return res
                .status(400)
                .json({ error: 'Past dates are no permitted' });
        }

        // Check the hour is between 8:00 and 18:00
        const date = new Date(start_date);
        const hour = getHours(date);

        if (hour <= 7 || hour >= 18) {
            return res.status(400).json({ error: 'Time not allowed' });
        }

        await order.update(req.body);

        return res.json(order);
    }
}

export default new StartOrderController();
