import fetch from 'isomorphic-unfetch';
import * as types from './constants';
import * as action from "./constants";
const axios = require('axios');


// export function getData(path) {
// 	return fetch(`${types.apiUrl}${path}`)
// 		.then((res) => res.json())
// 		.then((data) => data)
// 		.catch((error) => console.log('Error: ', error));
// }

export function getData(path) {
	return axios.get('https://altona.blockaction.io/adminapi/organisation-info/client')
	.then(function (response) {
		if(response.data.data.dataList[0].active === true) {
		return fetch(`${types.apiUrl}${path}`)
		.then((res) => res.json())
		.then((data) => data)
		.catch((error) => console.log('Error: ', error));

		} else {
		    return [];
		}
	})
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

}

// export const postData = (path, data) => {
// 	try {
// 		return fetch(`${types.apiUrl}${path}`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 				// authorization: 'Bearer ' + Token
// 			},
// 			body: JSON.stringify(data)
// 		})
// 			.then((res) => res.json())
// 			.then((data) => data);
// 	} catch (err) {
// 		throw err;
// 	}
// };


export const postData = (path, data) => {
	try {

		axios.get('https://altona.blockaction.io/adminapi/organisation-info/client')
		.then(function (response) {
		  if(response.data.data.dataList[0].active === true) {
	  
			return fetch(`${types.apiUrl}${path}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
					// authorization: 'Bearer ' + Token
				},
				body: JSON.stringify(data)
			})
				.then((res) => res.json())
				.then((data) => data);
			
		  } else {
			  return [];		  }
		})
		.catch(function (error) {
		  // handle error
		  console.log(error);
		})
		.finally(function () {
		  // always executed
		});

	
	} catch (err) {
		throw err;
	}
};

export const putData = (path, data = '') => {
	try {
		return fetch(`${types.apiUrl}${path}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((res) => res.json())
			.then((data) => data);
	} catch (err) {
		throw err;
	}
};
