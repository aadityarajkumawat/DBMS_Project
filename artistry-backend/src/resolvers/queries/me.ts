import { Consumer } from '@prisma/client'
import { ResolverContext } from 'src/typings'

export async function me(
    _: any,
    __: any,
    { prisma, request }: ResolverContext,
): Promise<{ user: false | Consumer; error: string | null }> {
    try {
        if (!request.session.userId)
            return { user: false, error: 'Unauthorized' }

        const user = await prisma.consumer.findFirst({
            where: {
                c_id: request.session.userId,
            },
        })

        if (!user) return { user: false, error: 'User does not exists' }

        return { user, error: null }
    } catch (error) {
        return { user: false, error: error.message }
    }
}
