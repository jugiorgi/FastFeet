import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import Orders from '../models/Orders';
import File from '../models/File';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliverymanController {
    async index(req, res) {
        const { q, page = 1 } = req.query;

        if (q) {
            const deliveryman = await Deliveryman.findAll({
                order: [['created_at', 'DESC']],
                where: { name: { [Op.iLike]: q } },
                limit: 10,
                offset: (page - 1) * 10,
                attributes: ['id', 'name', 'email', 'avatar_id'],
                include: {
                    model: File,
                    as: 'avatar',
                    attributes: ['name', 'path', 'url'],
                },
            });

            const counter = await Deliveryman.findAndCountAll();

            const { count } = counter;
            return res.json({ deliveryman, count });
        }

        const deliveryman = await Deliveryman.findAll({
            order: [['created_at', 'DESC']],
            limit: 10,
            offset: (page - 1) * 10,
            attributes: ['id', 'name', 'email', 'avatar_id'],
            include: {
                model: File,
                as: 'avatar',
                attributes: ['name', 'path', 'url'],
            },
        });

        const counter = await Deliveryman.findAndCountAll();

        const { count } = counter;
        return res.json({ deliveryman, count });
    }

    async store(req, res) {
        const deliverymanExists = await Deliveryman.findOne({
            where: { email: req.body.email },
        });
        if (deliverymanExists) {
            return res.status(400).json({
                error: 'Deliveryman already exists.',
            });
        }
        const { id, name, email } = await Deliveryman.create(req.body);

        return res.json({
            id,
            name,
            email,
        });
    }

    async update(req, res) {
        const { id } = req.params;

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const deliveryman = await Deliveryman.findByPk(id);

        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not found' });
        }

        const { email, avatar_id } = req.body;

        if (email && email !== deliveryman.email) {
            const deliverymanExists = await Deliveryman.findOne({
                where: { email },
            });
            if (deliverymanExists) {
                return res.status(400).json({
                    error: 'Recipient already exists.',
                });
            }
        }

        if (avatar_id) {
            const deliverymanAvatar = await File.findByPk(avatar_id);
            if (!deliverymanAvatar) {
                return res.status(400).json({ error: 'Avatar is not found' });
            }
        }

        await deliveryman.update(req.body);

        return res.json(deliveryman);
    }

    async delete(req, res) {
        const deliveryman = await Deliveryman.findByPk(req.params.id);
        const order = await Orders.findAll({
            where: { deliveryman_id: req.params.id },
        });

        if (!deliveryman) {
            return res.status(401).json('Deliveryman does not exists');
        }

        await order.map(o =>
            o.destroy({ where: { deliveryman_id: req.params.id } })
        );

        const problem = await DeliveryProblem.findAll({
            where: { order_id: null },
        });

        await problem.map(p => p.destroy({ where: { order_id: null } }));

        await deliveryman.destroy({ where: { id: req.params.id } });

        const deliverymans = await Deliveryman.findAll({
            attributes: ['id', 'name', 'email', 'avatar_id'],
            include: {
                model: File,
                as: 'avatar',
                attributes: ['name', 'path', 'url'],
            },
        });

        return res.json(deliverymans);
    }
}

export default new DeliverymanController();
