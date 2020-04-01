import Mail from '../../lib/Mail';

class OrderMail {
    get key() {
        return 'OrderMail';
    }

    async handle({ data }) {
        const { orderEmail } = data;

        if (orderEmail.recipient.complement) {
            await Mail.sendMail({
                to: `${orderEmail.deliveryman.name} <${orderEmail.deliveryman.email}>`,
                subject: 'Nova encomenda',
                template: 'ordersWithComplements',
                context: {
                    deliveryman: orderEmail.deliveryman.name,
                    recipients: orderEmail.recipient.name,
                    product: orderEmail.product,
                    street: orderEmail.recipient.street,
                    number: orderEmail.recipient.number,
                    complement: orderEmail.recipient.complement,
                    state: orderEmail.recipient.state,
                    city: orderEmail.recipient.city,
                    zip_code: orderEmail.recipient.zip_code,
                },
            });
        } else {
            await Mail.sendMail({
                to: `${orderEmail.deliveryman.name} <${orderEmail.deliveryman.email}>`,
                subject: 'Nova encomenda',
                template: 'orders',
                context: {
                    deliveryman: orderEmail.deliveryman.name,
                    recipients: orderEmail.recipient.name,
                    product: orderEmail.product,
                    street: orderEmail.recipient.street,
                    number: orderEmail.recipient.number,
                    state: orderEmail.recipient.state,
                    city: orderEmail.recipient.city,
                    zip_code: orderEmail.recipient.zip_code,
                },
            });
        }
    }
}
export default new OrderMail();
