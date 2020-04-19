import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useUser } from '../lib/hooks';

const SignupPage = () => {
	const [user, { mutate }] = useUser();
	const [errorMsg, setErrorMsg] = useState('');

	// call whenever user changes (ex. right after signing up successfully)
	useEffect(() => {
		// redirect to home if user is authenticated
		if (user) Router.replace('/');
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const body = {
			username: e.currentTarget.username.value,
			password: e.currentTarget.password.value,
		};
		const res = await fetch('/api/user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
		const data = await res.json();

		if (res.status === 200) {
			// writing our user object to the state
			mutate(data.user);
		} else {
			// set error message
			setErrorMsg(data.message);
		}
	};

	return (
		<>
			<Head>
				<title>Sign up</title>
			</Head>
			<div>
				<h2>Sign up</h2>
				<form onSubmit={handleSubmit}>
					{errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
					<label htmlFor="username">
						<input
							id="username"
							name="username"
							type="text"
							placeholder="Your name"
						/>
					</label>
					<label htmlFor="password">
						<input
							id="password"
							name="password"
							type="password"
							placeholder="Create a password"
						/>
					</label>
					<button type="submit">Sign up</button>
				</form>
			</div>
		</>
	);
};

export default SignupPage;