import { cart } from "../types/Cart"
import { UserInfo } from "../types/UserInfo"

export type AppState = {
    mode : string ,
    cart : cart,
    userInfo ?: UserInfo
}