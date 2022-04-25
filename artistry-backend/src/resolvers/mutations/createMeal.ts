import dayjs from 'dayjs'
import { ResolverContext } from 'src/typings'
import isoWeek from 'dayjs/plugin/isoWeek'
import { v4 as uuid } from 'uuid'

dayjs.extend(isoWeek)

export async function createMeal(
    _: any,
    __: any,
    { prisma, request }: ResolverContext,
): Promise<any> {
    const ID = uuid()
    try {
        if (!request.session.userId)
            return { status: false, error: 'Unauthorized' }

        await prisma.dailyMeals.create({
            data: {
                menu_id: ID,
                date: dayjs(new Date()).format('MM/DD/YYYY'),
                day: '',
                menu: {
                    create: [
                        {
                            breakfast: 'Idli, Sambhar, Sprouts',
                            lunch: 'Soyabeen Masala, Dhai, Rajma, Rice',
                            snacks: 'Dabeli',
                            dinner: 'Matar Paneer, Dal, Onion Rice, Sweet: Besan Chakki',
                            date: '04/25/2022',
                        },
                        {
                            breakfast: 'Dal Pakwan, Sprouts',
                            lunch: 'Aloo Chhole, Bhindi-Pyaaz, Dal, Rice',
                            snacks: 'Plain Maggi',
                            dinner: 'Methi Malai Matar, Sev Tamatar, Dal, Rice',
                            date: '04/26/2022',
                        },
                        {
                            breakfast: 'Aloo Paratha, Fruits',
                            lunch: 'Chawla (Lobia), Kundru, Dal, Rice',
                            snacks: 'Samosa',
                            dinner: 'Malai Kofta, Pyaaz Sabzi, Dal, Rice, Egg Curry*',
                            date: '04/27/2022',
                        },
                        {
                            breakfast: 'Uttapam, Coconut Chutney, Sprouts',
                            lunch: 'Aloo Methi, Palak Paneer, Dal, Rice',
                            snacks: 'Pav Bhaji',
                            dinner: 'Corn Capsicum, Dal Fry, Jeera Rice, Sweet: Custard',
                            date: '04/28/2022',
                        },
                        {
                            breakfast: 'Poha, Fruits',
                            lunch: 'Mushroom Matar Masala, Kale Chane, Rice, Dal',
                            snacks: 'Sev Puri',
                            dinner: 'Paneer Butter Masala, Dal, Rice, Sweet: Puran Poli',
                            date: '04/29/2022',
                        },
                        {
                            breakfast: 'Moong Masala Puri, Fruits',
                            lunch: 'Masala Bhindi, Besan Gatta, Dal Tadka, Rice',
                            snacks: 'Pakoda',
                            dinner: 'Mix Veg, AlooPyaaz, Dal (Sambh Arstyle), Rice',
                            date: '04/30/2022',
                        },
                        {
                            breakfast: 'Masala Dosa, Groundnut chutney, fruits',
                            lunch: 'Aloo Capsicum, Khadi Pakoda, Rice',
                            snacks: 'French Fries',
                            dinner: 'Chhole Kulche, Pulav, Raita, Sweet: Ice-Cream (Butter Scotch)',
                            date: '05/01/2022',
                        },
                    ],
                },
            },
        })

        return { status: true, error: null }
    } catch (error) {
        console.log(error)
        return { status: false, error: error.message }
    }
}
