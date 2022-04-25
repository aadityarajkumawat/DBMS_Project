import { consumerLogin } from './consumerLogin'
import { consumerRegister } from './consumerRegister'
import { createMeal } from './createMeal'
import { markSkippedMeal } from './markSkippedMeal'

export default { consumerLogin, consumerRegister, markSkippedMeal, createMeal }

export interface Mutations {
    consumerLogin: typeof consumerLogin
    consumerRegister: typeof consumerRegister
    markSkippedMeal: typeof markSkippedMeal
    createMeal: typeof createMeal
}
