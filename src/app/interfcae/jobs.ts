import { User } from './user';
export interface Jobs {
    id:number,
    title:string
    body:string
    location:string
    applicants:User[]
}
