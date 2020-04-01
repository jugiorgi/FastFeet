import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipients from '../models/Recipients';
import Orders from '../models/Orders';

class RecipientsController {
    async index(req, res) {
        const { q, page = 1 } = req.query;

        if (q) {
            const recipients = await Recipients.findAll({
                order: [['created_at', 'DESC']],
                limit: 10,
                offset: (page - 1) * 10,
                where: { name: { [Op.iLike]: q } },
            });

            const counter = await Recipients.findAndCountAll();

            const { count } = counter;
            return res.json({ recipients, count });
        }

        const recipients = await Recipients.findAll({
            order: [['created_at', 'DESC']],
            limit: 10,
            offset: (page - 1) * 10,
        });

        const counter = await Recipients.findAndCountAll();

        const { count } = counter;
        return res.json({ recipients, count });
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            street: Yup.string().required(),
            number: Yup.string().required(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            zip_code: Yup.string()
                .required()
                .max(8),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const recipientExists = await Recipients.findOne({
            where: { email: req.body.email },
        });

        if (recipientExists) {
            return res.status(400).json({
                error: 'Recipients already exists.',
            });
        }
        const {
            id,
            name,
            email,
            street,
            number,
            complement,
            state,
            city,
            zip_code,
        } = await Recipients.create(req.body);

        return res.json({
            id,
            name,
            email,
            street,
            number,
            complement,
            state,
            city,
            zip_code,
        });
    }

    async update(req, res) {
        const { id } = req.params;
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            street: Yup.string(),
            number: Yup.string(),
            complement: Yup.string(),
            state: Yup.string(),
            city: Yup.string(),
            zip_code: Yup.string().max(8),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const recipient = await Recipients.findByPk(id);

        if (!recipient) {
            return res.status(400).json({ error: 'Recipients does not found' });
        }

        const { email } = req.body;

        if (email && email !== recipient.email) {
            const recipientsExists = await Recipients.findOne({
                where: { email },
            });
            if (recipientsExists) {
                return res.status(400).json({
                    error: 'Recipient already exists.',
                });
            }
        }

        const {
            name,
            street,
            number,
            state,
            complement,
            city,
            zip_code,
        } = await recipient.update(req.body);

        return res.json({
            id,
            name,
            email,
            street,
            number,
            state,
            complement,
            city,
            zip_code,
        });
    }

    async delete(req, res) {
        const recipient = await Recipients.findByPk(req.params.id);
        const order = await Orders.findAll({
            where: { recipient_id: req.params.id },
        });

        if (!recipient) {
            return res.status(401).json('Recipient does not exists');
        }

        order.map(o => o.destroy({ where: { recipient_id: req.params.id } }));

        await recipient.destroy({ where: { id: req.params.id } });

        const recipients = await Recipients.findAll({});

        return res.json(recipients);
    }
}

export default new RecipientsController();
