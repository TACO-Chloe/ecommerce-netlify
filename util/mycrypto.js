import { pbkdf2Sync, createCipher, createDecipher } from 'crypto'
import { DeviceUUID } from '@/util/device-uuid'

let uuid = new DeviceUUID().get();
let key = pbkdf2Sync(uuid,'salt.salt.salt', 64, 64, 'sha512').toString('base64')

export function myEncrypt(data) {
	try {
		let cipher = createCipher('aes-256-cbc', key.toString())
		let res = cipher.update(data, 'utf8', 'base64')
		res += cipher.final('base64')
		return res
	} catch (e) {
		return e
	}
}   

export function myDecrypt(data) {
    try {
      let decipher = createDecipher('aes-256-cbc', key.toString())
      let res = decipher.update(data, 'base64', 'utf8')
      res += decipher.final('utf8')
      return res
    } catch (e) {
      return e
    }
  }


export default {myEncrypt,myDecrypt}
