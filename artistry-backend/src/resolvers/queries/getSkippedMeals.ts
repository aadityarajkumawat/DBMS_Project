import dayjs from 'dayjs'
import { ResolverContext } from 'src/typings'

export async function getSkippedMeals(
    _: any,
    __: any,
    { prisma, request }: ResolverContext,
): Promise<any> {
    try {
        const userId = request.session.userId
        const date = new Date()
        const day = dayjs(date)

        const menu = await prisma.dailyMeals.findFirst({
            where: {
                date: '04/25/2022',
            },
        })

        if (!menu) return { mealsSkipped: null, error: 'server error' }

        const meals = await prisma.menu.findMany({
            where: {
                menu_id: menu.menu_id,
            },
        })

        if (meals.length < 4)
            return { mealsSkipped: null, error: 'server error' }

        const mealsSkipped = await prisma.mealsSkipped.findMany({
            where: {
                c_id: userId,
                skip_date: day.format('MM/DD/YYYY'),
            },
        })

        return { mealsSkipped, error: null }
    } catch (error) {
        return { mealsSkipped: [], error: error.message }
    }
}
