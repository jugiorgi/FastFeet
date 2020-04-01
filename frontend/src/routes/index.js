import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Orders from '~/pages/Orders/Order';
import Deliverymans from '~/pages/Deliverymans/Deliveryman';
import Recipients from '~/pages/Recipients/Recipient';
import Problems from '~/pages/Problems';
import OrderRegister from '~/pages/Orders/OrderRegister';
import DeliverymanRegister from '~/pages/Deliverymans/DeliverymanRegister';
import RecipientRegister from '~/pages/Recipients/RecipientRegister';
import OrderEdit from '~/pages/Orders/OrderEdit';
import DelivertymanEdit from '~/pages/Deliverymans/DeliverymanEdit';
import RecipientEdit from '~/pages/Recipients/RecipientEdit';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={SignIn} />

			<Route path="/orders" component={Orders} isPrivate />
			<Route path="/deliverymans" component={Deliverymans} isPrivate />
			<Route path="/recipients" component={Recipients} isPrivate />
			<Route path="/problems" component={Problems} isPrivate />
			<Route path="/register/order" component={OrderRegister} isPrivate />
			<Route
				path="/register/deliveryman"
				component={DeliverymanRegister}
				isPrivate
			/>
			<Route path="/register/recipient" component={RecipientRegister} isPrivate />
			<Route path="/edit/order" component={OrderEdit} isPrivate />
			<Route path="/edit/deliveryman" component={DelivertymanEdit} isPrivate />
			<Route path="/edit/recipient" component={RecipientEdit} isPrivate />

			<Route path="/" component={() => <h1>404</h1>} />
		</Switch>
	);
}
