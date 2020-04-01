import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemsController {
    async index(req, res) {
        const { page = 1 } = req.query;
        const problems = await DeliveryProblem.findAll({
            order: [['created_at', 'DESC']],
            limit: 10,
            offset: (page - 1) * 10,
        });

        const counter = await DeliveryProblem.findAndCountAll();

        const { count } = counter;
        return res.json({ problems, count });
    }

    async store(req, res) {
        const { id } = req.params;
        const { description } = req.body;
        const schema = Yup.object().shape({
            description: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const problems = await DeliveryProblem.create({
            order_id: id,
            description,
        });

        return res.json(problems);
    }
}

export default new DeliveryProblemsController();
