import argon from 'argon2'
import { ResolverContext } from 'src/typings'

interface ConsumerLoginResponse {
    user: boolean
    error: string | null
}

export async function consumerLogin(
    _: any,
    args: { mail_id: string; password: string },
    { prisma, request }: ResolverContext,
): Promise<ConsumerLoginResponse> {
    const { mail_id, password } = args
    try {
        const user = await prisma.consumer.findFirst({
            select: {
                c_id: true,
                password: true,
            },
            where: {
                mail_id,
            },
        })

        if (!user) return { user: false, error: 'Invalid Credentials' }

        const passwordIsValid = await argon.verify(user.password, password)

        // return out off the function, in case the password is wrong
        if (!passwordIsValid)
            return { user: false, error: 'Invalid Credentials' }

        // set the user session
        request.session.userId = user.c_id

        return { user: true, error: null }
    } catch (error) {
        console.log(error)
        return { user: false, error: error.message }
    }
}
