import * as Yup from 'yup';
import { Op } from 'sequelize';
import Orders from '../models/Orders';
import Recipients from '../models/Recipients';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Queue from '../../lib/Queue';
import OrderMail from '../jobs/OrderMail';

class OrderController {
    async index(req, res) {
        const { page = 1, q } = req.query;

        if (q) {
            const order = await Orders.findAll({
                where: { product: { [Op.iLike]: q } },
                order: [['created_at', 'DESC']],
                limit: 10,
                offset: (page - 1) * 10,
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
                        include: [
                            {
                                model: File,
                                as: 'avatar',
                                attributes: ['id', 'name', 'path', 'url'],
                            },
                        ],
                    },
                    {
                        model: File,
                        as: 'signature',
                        attributes: ['id', 'name', 'path', 'url'],
                    },
                ],
            });

            const counter = await Orders.findAndCountAll({});
            const { count } = counter;
            return res.json({ order, count });
        }

        const order = await Orders.findAll({
            order: [['created_at', 'DESC']],
            limit: 10,
            offset: (page - 1) * 10,
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
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'name', 'path', 'url'],
                        },
                    ],
                },
                {
                    model: File,
                    as: 'signature',
                    attributes: ['id', 'name', 'path', 'url'],
                },
            ],
        });

        const counter = await Orders.findAndCountAll();

        const { count } = counter;
        return res.json({ order, count });
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { recipient_id, deliveryman_id, product } = req.body;

        const recipientExist = await Recipients.findByPk(recipient_id);

        const deliverymanExist = await Deliveryman.findByPk(deliveryman_id);

        if (!recipientExist && !deliverymanExist) {
            return res
                .status(400)
                .json({ error: 'Recipient and deliveryman are not found' });
        }
        if (!recipientExist) {
            return res.status(400).json({ error: 'Recipient is not found' });
        }
        if (!deliverymanExist) {
            return res.status(400).json({ error: 'deliveryman is not found' });
        }

        const order = await Orders.create({
            product,
            recipient_id,
            deliveryman_id,
        });

        const orderEmail = await Orders.findByPk(order.id, {
            include: [
                {
                    model: Recipients,
                    as: 'recipient',
                    attributes: [
                        'name',
                        'street',
                        'number',
                        'complement',
                        'state',
                        'city',
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

        await Queue.add(OrderMail.key, {
            orderEmail,
        });

        return res.json(order);
    }

    async update(req, res) {
        const { id } = req.params;
        const schema = Yup.object().shape({
            recipient_id: Yup.number(),
            deliveryman_id: Yup.number(),
            product: Yup.string(),
            start_date: Yup.date(),
            end_date: Yup.date(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const order = await Orders.findByPk(id);

        if (!order) {
            return res.status(400).json({ error: 'Order not found' });
        }

        const { start_date, end_date, canceled_at, signature_id } = req.body;

        if (start_date && order.start_date === start_date) {
            return res
                .status(400)
                .json({ error: 'You cannot change the date here' });
        }

        if (end_date && order.end_date === end_date) {
            return res
                .status(400)
                .json({ error: 'You cannot change the date here' });
        }

        if (signature_id && order.signature_id === signature_id) {
            return res
                .status(400)
                .json({ error: 'You cannot change the signature here' });
        }

        if (canceled_at && order.canceled_at === canceled_at) {
            return res
                .status(400)
                .json({ error: 'You cannot canceled the order here' });
        }

        await order.update(req.body);

        return res.json(order);
    }

    async delete(req, res) {
        const { id } = req.params;
        const order = await Orders.findByPk(id, {
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
            return res.status(400).json({
                error: 'Delivery has already been canceled',
                status: '400',
            });
        }

        order.canceled_at = new Date();

        await order.save();

        return res.json({ order, status: '200' });
    }
}

export default new OrderController();
