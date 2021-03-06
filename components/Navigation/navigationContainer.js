/**
 * Created by aviad on 8/8/2016.
 */

import React, { Component } from 'react'
import {
	View,
	Text,
	Navigator,
	StyleSheet} from 'react-native'
import {Button} from 'apsl-react-native-button'
import componentsConfig from './componentsConfig'

class NavigationContainer extends Component{
	constructor(props){
		super(props)
	}
	_sceneLogic(route, navigator){
		return route.component
	}
	get _navigationBar(){
		return 	<Navigator.NavigationBar
			routeMapper={{
				LeftButton: this._leftNavButton.bind(this),
				RightButton: this._rightNavButtonConfig.bind(this),
				Title: this._titleNavConfig.bind(this)
			}}
			style={styles.navigationBar}
		/>
	}
	_titleNavConfig(route, navigator, index, navState){
		return (
			<View style={styles.navTitleContainer}>
				<Text style={styles.navTitle}>{route.title}</Text>
			</View>
		)
	}
	_leftNavButton(route, navigator, index, navState){
		return <View style={styles.navButtonContainer}>{route.generateLeftButton(route, navigator, index, navState)}</View>
	}
	_rightNavButtonConfig(route, navigator, index, navState){
		return <View style={styles.navButtonContainer}>{route.generateRightButton(route, navigator, index, navState)}</View>
	}
	
	render(){
		return(
			<Navigator
				initialRoute={componentsConfig.getInitialComponent}
				initialRouteStack={componentsConfig.getComponents}
				renderScene={this._sceneLogic.bind(this)}
				navigationBar={this._navigationBar}
			/>
		)
	}
}

const styles= StyleSheet.create({
	navigationBar:{
		flex:1,
		// flexDirection:'row',
		padding:0,
		backgroundColor: 'rgba(216, 27, 96, 1)',
		height: 61,
		shadowColor: 'black',
		shadowOpacity: 1.0,
		elevation:8,
		borderBottomLeftRadius:2,
		borderBottomRightRadius:2
	},
	leftNavButton:{
		color:'white'
	},
	rightNavButton:{
		color:'white',
	},
	navButtonContainer:{
		flex:1,
		width:50,
		alignItems:'center',
		justifyContent:'center'
	},
	navTitleContainer:{
		flex:1,
		flexDirection:'row',
		width:220,
		justifyContent: 'center',
		// alignItems: 'center',
		marginTop:5,
	},
	navTitle:{
		textAlign:'center',
		fontWeight:'400',
		fontSize:26,
		color:'white',
	}
});
export default NavigationContainer