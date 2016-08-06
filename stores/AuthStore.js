/**
 * Created by aviad on 8/2/2016.
 */
import {createStore} from 'cartiv';
import API from './API'
import * as firebase from 'firebase';
// FireBase.createUser({
// 	email    : "bobtony@firebase.com",
// 	password : "correcthorsebatterystaple"
// }, function(error, userData) {
// 	if (error) {
// 		console.log("Error creating user:", error);
// 	} else {
// 		console.log("Successfully created user account with uid:", userData.uid);
// 	}
// });

const firebaseConfig = {
	apiKey: "AIzaSyDvHAflY3tpYWmqL3tYxTUZ29TDV17mHUM",
	authDomain: "brenda-139c4.firebaseapp.com",
	databaseURL: "https://brenda-139c4.firebaseio.com",
	storageBucket: "",
};
const firebaseRef = firebase.initializeApp(firebaseConfig);




function sanitizeUserData(user) {
	let clearUser={};
	user.providerData.forEach((profile) => {
		clearUser['displayName'] = profile.displayName || user.displayName;
		clearUser['email'] = profile.email ||  user.email;
		clearUser['photoURL'] = profile.photoURL || user.photoURL;
	});
	return clearUser;
}

let authStore = createStore(
	{
		/* this is the store config: */
		api: API, // listen to actions coming from api
		name: 'auth', // actions under 'auth' property, e.g: api.auth.smthn
		
		// config.actions is optional,
		// when not provided, all methods starting with 'on' will get called
		
		// config.actions can either be an array of strings or a filter function.
		actions: ['signUp','signIn','initFireBaseListener','clearErrors'], // specify methods that will get called when equivalent action triggered
	},
	{
		/* this is the store definition: */
		getInitialState(){ // same as React!
			return {
				isAuth:false,
				loading: false,
				error:true,
				user:null
			}
		},
		initFireBaseListener(){
			this.setState({loading:true});
			firebaseRef.auth().onAuthStateChanged((user)=>{
				if (user) {
					// User is signed in.
					let sanitizedUser = sanitizeUserData(user);
					console.log(user);
					this.setState({
						user:sanitizedUser,
						isAuth:true,
						error:false
					});
				} else {
					// No user is signed in.
					this.setState({
						isAuth:false,
						error:false
						
					});
				}
			});
			this.setState({loading:false});
			
		},
		clearErrors(){
			this.setState({
				error:false
			});
		},
		signUp(displayName, email, password){
			console.log('create user',email,password);
			firebaseRef.auth().createUserWithEmailAndPassword(email, password)
				.then((payload)=>{
					this.updateUserInfo({displayName: displayName});
				}).catch((error) =>{
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				
				this.setState({error:errorMessage});
				console.log('error', error);
			});
			
		},
		updateUserInfo(obj){
			let user = firebase.auth().currentUser;
			let purified = {
				displayName: obj['displayName'] || user.displayName,
				photoURL : obj['photoURL'] || user.photoURL
			};
			user.updateProfile(purified).then((payload)=>{
				console.log('name change PL',payload);
				// Update successful.
				this.setState({
					user: sanitizeUserData(firebase.auth().currentUser)
				})
			}, (error) =>{
				// An error happened.
				
				this.setState({error:error.message});
				console.log('error updating name', error);
			});
		},
		signIn(email, password){
			console.log('signin',email, password);
			this.setState({loading:true});
			firebase.auth().signInWithEmailAndPassword(email, password).then((payload)=>{
				// Observer should notify about login so basically nothing...
				
			}).catch((error)=> {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// ...
				this.setState({error:error.message});
			});
			this.setState({loading:false});
			
		}
	});
// createStore.allowHMR(module, authStore);
export default authStore;
