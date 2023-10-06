import crypto from 'crypto'
import {env} from '../env_check'

const algorithm = 'aes-256-cbc'
const {SECRET_IV} = env

export function encrypt(password: string, token: string) {
    const key = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex')
        .substring(0, 32)
    const encryptionIV = crypto
        .createHash('sha256')
        .update(SECRET_IV)
        .digest('hex')
        .substring(0, 16)
    const cipher = crypto.createCipheriv(algorithm, key, encryptionIV)
    return Buffer.from(
        cipher.update(token, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64')
}

export function decrypt(password: string, token: string) {
    try {
        const key = crypto
            .createHash('sha256')
            .update(password)
            .digest('hex')
            .substring(0, 32)
        const encryptionIV = crypto
            .createHash('sha256')
            .update(SECRET_IV)
            .digest('hex')
            .substring(0, 16)
        const buff = Buffer.from(token, 'base64')
        const decipher = crypto.createDecipheriv(algorithm, key, encryptionIV)
        return (
            decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
            decipher.final('utf8')
        )
    }
    catch (error) {
        return ""
    }
}
