import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/fastfeet-logo.png';
import { Container, Content, Profile } from './styles';

export default function Header() {
	const dispatch = useDispatch();
	const profile = useSelector(state => state.user.profile);

	function handleSignOut() {
		dispatch(signOut());
	}

	return (
		<Container>
			<Content>
				<nav>
					<img src={logo} alt="FastFeet" />
					<NavLink
						to="/orders"
						activeStyle={{
							color: '#444444',
						}}
					>
						ENCOMENDAS
					</NavLink>
					<NavLink
						to="/deliverymans"
						activeStyle={{
							color: '#444444',
						}}
					>
						ENTREGADORES
					</NavLink>
					<NavLink
						to="/recipients"
						activeStyle={{
							color: '#444444',
						}}
					>
						DESTINATÁRIOS
					</NavLink>
					<NavLink
						to="/problems"
						activeStyle={{
							color: '#444444',
						}}
					>
						PROBLEMAS
					</NavLink>
				</nav>

				<aside>
					<Profile>
						<div>
							<strong>{profile.name}</strong>
							<button type="button" onClick={handleSignOut}>
								sair do sistema
							</button>
						</div>
					</Profile>
				</aside>
			</Content>
		</Container>
	);
}
