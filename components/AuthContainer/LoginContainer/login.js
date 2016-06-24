/**
 * Created by aviad on 6/22/2016.
 */


import React, {Component} from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { Button, Divider } from 'react-native-material-design'
import TextField from 'react-native-md-textinput'

const overrides={
	textColor:'black',
	backgroundColor:'black',
	rippleColor:'white'
};

class Login extends Component{

	render(){
		return(
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>
						Welcome To Brenda!
					</Text>
				</View>
				<View style={styles.loginContainer}>
					<TextField
						dense={true}
						label={'Username'}
						highlightColor={'#ffffff'}
						keyboardType={'default'}
						textColor={'#ffffff'}
						labelColor={'#ffffff'}
					/>
					<TextField
						dense={true}
						label={'Password'}
						highlightColor={'#ffffff'}
						keyboardType={'default'}
						textColor={'#ffffff'}
						labelColor={'#ffffff'}
						secureTextEntry={true}
					/>
					<View style={styles.signIn}>
						<Button text='Sign in' raised={true} />
					</View>
				</View>
				<View style={styles.signupContainer}>
					<Button
						text='or Sign up'
						raised={false}
						overrides={overrides}/>
				</View>
			</View>
		)

	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		flex: 1,
	},
	loginContainer:{
		marginTop:50,
		width:300,
	},
	titleContainer:{
		alignItems:'center',
		marginTop:100,
	},
	title:{
		color:'white',
		fontSize:25,
	},
	signIn:{
		marginTop:20
	},
	signupContainer:{
		marginTop:110,
		justifyContent:'flex-end'
	},
});

export default Login