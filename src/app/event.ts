export class Event {
    title:string
    description:string
    location:string
    time:string

    constructor(title:string, description?:string, location?:string, time?:string){
        this.title = title
        this.description = description ? description : null
        this.location = location ? location : "TBD"
        this.time = time ? time : "TBD"

    }
}
