export default class DateUtils {
    // 2025-03-21T14:14
    static formatDateToAPI(date:string){
        let newDate = date.replace("T", "-").split("-");

        let [ year, month, day, hour ] = newDate;

        return `${day}/${month}/${year} ${hour}`;
    }

    // 2025-03-21T14:14
    static formatDateToView(date:string){
        let newDate = date.replace("T", "-").replace(/(?:\:[0-9]{2}.[0-9]{6}Z|\:[0-9]{2}Z)/, "").split("-");

        let [ year, month, day, hour ] = newDate;

        return `${day}/${month}/${year} ${hour}`;
    }

}