/**
 * Created by aviad on 6/20/2016.
 */

import React, {Component} from 'react'
import {Text, StyleSheet} from 'react-native'
import LoginContainer from './LoginContainer/loginContainer'
import LinearGradient from 'react-native-linear-gradient'


import {connect} from 'cartiv';
import authStore from './../../stores/AuthStore';
import API from './../../stores/API'

// @connect(authStore)
class AuthContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			isAuth:false
		}
	}
	render(){
		console.log(this);
		return (
			!this.state.isAuth?
				// Not authenticated
				<LinearGradient colors={gradientColor} style={[styles.container]}>
					<LoginContainer />
				</LinearGradient>
				:
				// Is authenticated
				<Text>
					yes Auth
				</Text>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
const gradientColor = ['#D129BA', '#6B2162' , '#45153f'];
export default AuthContainer