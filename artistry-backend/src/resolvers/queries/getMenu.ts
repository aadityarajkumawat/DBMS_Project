import dayjs from 'dayjs'
import { ResolverContext } from 'src/typings'

export async function getMenu(
    _: any,
    __: any,
    { prisma, request }: ResolverContext,
): Promise<any> {
    try {
        if (!request.session.userId) return { menu: [], error: 'unauthorized' }

        const date = new Date()
        const day = dayjs(date)

        const menu = await prisma.menu.findMany({
            where: {
                date: day.format('MM/DD/YYYY'),
            },
        })

        console.log(menu)

        return { menu, error: null }
    } catch (error) {
        return { menu: [], error: error.message }
    }
}
