import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemByIdController {
    async index(req, res) {
        const problems = await DeliveryProblem.findAll({
            order: [['created_at', 'DESC']],
            where: {
                order_id: req.params.id,
            },
        });

        return res.json(problems);
    }
}
export default new DeliveryProblemByIdController();
