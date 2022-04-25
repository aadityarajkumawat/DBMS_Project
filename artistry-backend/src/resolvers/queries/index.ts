import { getMenu } from './getMenu'
import { getSkippedMeals } from './getSkippedMeals'
import { me } from './me'

const resolvers = { me, getSkippedMeals, getMenu }

const rtt: Partial<Record<keyof typeof resolvers, any>> = {
    me: typeof me,
    getSkippedMeals: typeof getSkippedMeals,
    getMenu: typeof getMenu,
} as const

for (let key of Object.keys(resolvers) as Array<keyof typeof resolvers>) {
    rtt[key] = typeof resolvers[key]
}

export type Queries = typeof rtt
export default resolvers
