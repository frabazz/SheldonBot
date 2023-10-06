import {z} from 'zod'

const EnvSchema = z.object({
    POLL_TIME : z.string().transform(Number),
    TOKEN : z.string(),
    CHALLENGE : z.string(),
    DB_CONNECTION : z.string(),
    CLIENT_ID : z.string(),
    SECRET_IV : z.string()
})

const parsed = EnvSchema.safeParse(process.env)

if(!parsed.success)
    throw new Error(JSON.stringify(parsed.error.format(), null, 4))

export const env = parsed.data
