import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
const secret_iv = process.env.SECRET_IV

if (secret_iv == null)
    throw "secret_iv not defined in .env"

export function encrypt(password: string, token: string) {
    const key = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex')
        .substring(0, 32)
    const encryptionIV = crypto
        .createHash('sha256')
        .update(secret_iv || "")
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
            .update(secret_iv || "")
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
