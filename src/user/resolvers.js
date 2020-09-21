// import jwt from 'jsonwebtoken'
// import { ACCESS_TOKEN_SECRET } from '../config'

// export default {
// 	token: (root) => {
// 		jwt.verify(root.accessToken, ACCESS_TOKEN_SECRET, (err, usr) => {
// 			if (err) return console.log(err)
// 			console.log('verified')
// 			console.log(usr)
// 		})
// 	}
// }