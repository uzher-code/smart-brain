import React, { Component } from 'react'
import PasswordField from '../Form/PasswordField';
import EmailField from '../Form/EmailField';
import NameField from '../Form/NameField';

class Register extends Component {
	constructor (props) {
		super(props);
		this.state = {
			registerEmail: '',
			registerName: '',
			registerPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({ registerEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({ registerPassword: event.target.value});
	}

	onNameChange = (event) => {
		this.setState({ registerName: event.target.value});
	}

	saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token', token);
	}

	onSubmitRegister = (event) => {
		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.registerEmail,
				password: this.state.registerPassword,
				name: this.state.registerName
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
		return (
			<div className='br3 shadow-5 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 center'>
				<div className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0 center">Register</legend>
				      <NameField onNameChange={ this.onNameChange } />
				      <EmailField onEmailChange={ this.onEmailChange } />
				      <PasswordField onPasswordChange={this.onPasswordChange}/>
				    </fieldset>
				    <div className="">
				      <input
				      	onClick={this.onSubmitRegister}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Register"
				      />
				    </div>
				  </div>
				</div>
			</div>
		);
	}
}
	

export default Register;