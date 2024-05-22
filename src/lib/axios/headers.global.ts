import { SessionService } from "@/features/session/services/session.service";


const session = SessionService.session

export const globalAxiosHeader = {

    Authorization: `Bearer ${session?.token}`

}