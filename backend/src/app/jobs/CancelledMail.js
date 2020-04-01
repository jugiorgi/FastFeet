import Mail from '../../lib/Mail';

class CancelledMail {
    get key() {
        return 'CancelledMail';
    }

    async handle({ data }) {
        const { order } = data;

        await Mail.sendMail({
            to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
            subject: 'Entrega cancelada',
            template: 'cancelledMail',
            context: {
                deliveryman: order.deliveryman.name,
                product: order.product,
                street: order.recipient.street,
                number: order.recipient.number,
                complement: order.recipient.complement,
                state: order.recipient.state,
                city: order.recipient.city,
                zip_code: order.recipient.zip_code,
            },
        });
    }
}
export default new CancelledMail();
