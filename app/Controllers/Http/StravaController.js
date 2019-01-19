'use strict'

const strava = require('strava-v3');

const User = use('App/Models/User')
const Request = use('Request')

class StravaController {


	async index ({view, request, auth, session, response}) {


		// get the cuurent user
		//console.log(auth);
    	let user = await User.findBy('email', 'martijnwip@gmail.com');
    	console.log(user);
    	//await auth.login(user);
    	await auth.remember(true).login(user)

		try {
		  await auth.check()
		} catch (error) {
		  response.send('You are not logged in')
		}	

		//let tokens = await this.getStravaTokens(request);

		//response.send(tokens);

		response.send('blaat');
		
		//return view.render('strava')
  	}

	async connect ({ request, auth, session, response }) {


		console.log(auth);


		const url = strava.oauth.getRequestAccessURL({scope:"activity:read"}) ;
	
		response.redirect(url)		
	}

	async getStravaTokens(request){



		return new Promise((resolve, reject) => {
		
			strava.oauth.getToken(request.get().code,function(err,payload,limits) {
			    	
				resolve(payload);

			});				

		});

	}  	




}

module.exports = StravaController
