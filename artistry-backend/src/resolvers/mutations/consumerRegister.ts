import { ResolverContext } from 'src/typings'
import argon from 'argon2'

type ConsumerRegisterArgs = {
    f_name: string
    m_name: string
    l_name: string
    mail_id: string
    password: string
    c_type: string
}

export async function consumerRegister(
    _: any,
    args: ConsumerRegisterArgs,
    { prisma, request }: ResolverContext,
): Promise<any> {
    try {
        // find if user with same mail already exists
        const users = await prisma.consumer.count({
            where: {
                mail_id: args.mail_id,
            },
        })

        // if atleast one user is found, return
        if (users > 0) return { user: false, error: 'User already exists' }

        // if the user does not exist, the create new user

        // but first get the hashed version of the plain
        // password entered by the user.
        const hashedPassword = await argon.hash(args.password)

        const user = await prisma.consumer.create({
            data: {
                ...args,
                password: hashedPassword,
            },
        })

        // set the user session
        request.session.userId = user.c_id

        return { user: true, error: null }
    } catch (error) {
        console.log(error)
        return { user: false, error: error.message }
    }
}
