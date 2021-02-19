import React, { Component } from 'react';
import PasswordField from '../Form/PasswordField';
import EmailField from '../Form/EmailField';


class Signin extends Component {
	constructor (props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
		}
	}

	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value});
	}

	saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token', token);
	}

	onSubmitSignIn = (event) => {
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(data => {
			if (data.id && data.success === 'true') {
				this.saveAuthTokenInSession(data.token)
				this.props.getProfile(data)
			}
		})
	}

	render () {
		const { onRouteChange } = this.props;
		return (
			<div className='br3 shadow-5 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 center'>
				<div className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
				      <EmailField onEmailChange={ this.onEmailChange } />
				      <PasswordField onPasswordChange={this.onPasswordChange}/>
				    </fieldset>
				    <div className="">
				      <input
				      	onClick={this.onSubmitSignIn}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Sign in"
				      />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => onRouteChange('register')} 
				      className="f6 link dim black db pointer">Register</p>
				    </div>
				  </div>
				</div>
			</div>
		);
	}
}
	

export default Signin;