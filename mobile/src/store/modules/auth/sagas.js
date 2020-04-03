import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
	try {
		const { id } = payload;

		const response = yield call(api.get, `deliveryman/${id}`);

		const { name } = response.data;

		yield put(signInSuccess(id, name));
	} catch (error) {
		Alert('Falha na autenticação', 'verifique seus dados');
		yield put(signFailure());
	}
}

export function signOut() {
	// history.push('/');
}

export default all([
	takeLatest('@auth/SIGN_IN_REQUEST', signIn),
	takeLatest('@auth/SIGN_OUT', signOut),
]);
