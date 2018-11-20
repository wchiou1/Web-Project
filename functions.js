var week = ["S","M","T","W","T","F","S"];
Date.prototype.addDays = function(days) {
    console.log(days);
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
function dateToInput(date){
    return date.getUTCFullYear()+"-"+("0"+(date.getUTCMonth()+1)).slice(-2)+"-"+("0"+date.getUTCDate()).slice(-2);
}
function dayToWeek(day){
    return week[day];
}
function isWeekend(day){
    return day==0||day==6;
}
function reflow( element ) {
    if ( element === undefined ) {
        element = document.documentElement;
    }
    void( element.offsetHeight );
}