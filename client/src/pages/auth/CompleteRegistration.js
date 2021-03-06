import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useMutation } from '@apollo/react-hooks';
import AuthForm from '../../components/forms/AuthForm';
import { USER_CREATE } from '../../graphql/mutations';

const CompleteRegistration = () => {
	const { dispatch } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	let history = useHistory();

	// pulling email from localStorage for verification
	useEffect(() => {
		setEmail(window.localStorage.getItem('emailForRegistration'));
	}, [history]);

	const [userCreate] = useMutation(USER_CREATE);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		// validation
		if (!email || !password) {
			toast.error('Please fill in the fields');
			return;
		}

		try {
			// checking if valid from firebase server
			const result = await auth.signInWithEmailLink(
				email,
				window.location.href // grabbing the url
			);

			// if email is verifed
			if (result.user.emailVerified) {
				window.localStorage.removeItem('emailForRegistration');

				// now accessing the user from firebase and updating password and getting authtoken (similar to jsonwebtoken)
				let user = auth.currentUser;
				await user.updatePassword(password);
				const idTokenResult = await user.getIdTokenResult();

				// updating the Global context
				dispatch({
					type: 'LOGGED_IN_USER',
					payload: { email: user.email, token: idTokenResult.token },
				});

				userCreate();
				history.push('/profile');
			}
		} catch (error) {
			console.log('Register complete error', error.message);
			setLoading(false);
			toast.error(error.message);
		}
	};

	return (
		<div className="container mt-4">
			{loading ? (
				<h4 className="text-warning">Loading...</h4>
			) : (
				<h1 className="text-center">Complete Your Register</h1>
			)}
			<AuthForm
				email={email}
				setEmail={setEmail}
				loading={loading}
				handleSubmit={handleSubmit}
				password={password}
				setPassword={setPassword}
				showPasswordInput={true}
			/>
		</div>
	);
};

export default CompleteRegistration;
