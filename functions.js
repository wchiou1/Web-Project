var week = ["S","M","T","W","T","F","S"];
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setUTCDate(date.getUTCDate() + days);
    return date;
}
Date.prototype.getWeekStart = function(){
    var date = new Date(this.valueOf());
    date.setUTCDate(date.getUTCDate() - date.getUTCDay());
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
function daysDiff(start,end){
    var startDate = new Date(start);
    var endDate = new Date(end);
    var timeDiff = endDate.getTime() - startDate.getTime();
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return diffDays;
}