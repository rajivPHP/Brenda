/**
 * Created by aviad on 6/20/2016.
 */

import React, { Component } from 'react'

import Login from './login'
import SignUp from './signUp'

class LoginContainer extends Component{
	constructor(props){
		super(props)
		this.state = {
			exist: true,
		}
	}
	userHasAccount(){
		this.setState({exist:true})
	}
	userDoesntHaveAccount(){
		this.setState({exist:false})
	}
	render(){
		return(
			this.state.exist?
				<Login click={this.userDoesntHaveAccount.bind(this)}/>
				:
				<SignUp click={this.userHasAccount.bind(this)}/>
		)
	}
}


export default LoginContainer