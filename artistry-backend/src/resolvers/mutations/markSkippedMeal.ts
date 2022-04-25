import { ResolverContext } from 'src/typings'

export async function markSkippedMeal(
    _: any,
    args: any,
    { prisma, request }: ResolverContext,
): Promise<any> {
    try {
        if (!request.session.userId)
            return { status: false, error: 'Unauthorized' }

        const consumer = await prisma.consumer.findFirst({
            where: {
                c_id: request.session.userId,
            },
        })

        if (!consumer) return { status: false, error: 'Server Error' }

        const alreadySkipped = await prisma.mealsSkipped.findFirst({
            select: {
                meal_skipped_id: true,
            },
            where: {
                meal_type: args.meal_type,
                skip_date: args.skip_date,
            },
        })

        if (alreadySkipped) {
            await prisma.mealsSkipped.delete({
                where: {
                    meal_skipped_id: alreadySkipped.meal_skipped_id,
                },
            })
        } else {
            await prisma.mealsSkipped.create({
                data: {
                    c_id: request.session.userId,
                    meal_type: args.meal_type,
                    skip_date: args.skip_date,
                },
            })
        }

        return { status: true, error: null }
    } catch (error) {
        console.log(error)
        return { status: false, error: error.message }
    }
}
