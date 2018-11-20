//Complementary to main but for the gantt chart
var today_date = new Date();
var past_date = new Date();
var future_date = new Date();
var gant_chart_cell_width = 11;
$(function(){
    today = dateToInput(today_date);
    past = dateToInput(past_date);
    future = dateToInput(future_date);
    fillInGanttChart();
});


function fillInGanttChart(){
    //Get the height of the table
    var height = $('#gantt_cells').height();
    var rows = Math.ceil(height/defaultHeight);
    //Create the row
    var header = $(`
        <div class="no-select gantt-chart-row-header table-row" style="height:`+defaultHeight+`px"></div>
    `);
    $("#gantt_chart").append(header);
    var rows = $(".gantt-row").not('.gantt-row-header').length;
    for(var i=0;i<rows;i++){
        $("#gantt_chart").append(`<div class="gantt-chart-row-body table-row"></div>`);
    }
    //Need to seed the days with current day
    seedGanttChart();

    //now add the days in
    
    for(var i=0;i<=90;i++){
        appendDay();
    }
}
function seedGanttChart(){
    //Get today's date(utc)
    var week_day = dayToWeek(today_date.getUTCDay());
    
    //Add the day to the header
    $('.gantt-chart-row-header').append(`<div class="gantt-chart-cell-header table-cell" date="`+today+`" style="min-width:`+gant_chart_cell_width+`px;">`+week_day+`</div>`);
    $('.gantt-chart-row-body').append(`<div class="gantt-chart-cell-body table-cell" style="width:5px;"></div>`)
    
}
function appendDay(){
    //Increment future by one
    future_date = future_date.addDays(1);
    //Add the cells
    var week_day = dayToWeek(future_date.getUTCDay());
    var weekend = (isWeekend(future_date.getUTCDay())?"gantt-chart-weekend":"");
    var sunday = (future_date.getUTCDay()==0?"sunday":"");
    //Add the day to the header
    $('.gantt-chart-row-header').append(`<div class="gantt-chart-cell-header table-cell" date="`+dateToInput(future_date)+`" style="min-width:`+gant_chart_cell_width+`px;">`+week_day+`</div>`);
    $('.gantt-chart-row-body').append(`<div class="gantt-chart-cell-body `+sunday+` `+weekend+` table-cell" style="width:5px;"></div>`)
}
function prependDay(){
    //Increment future by one
    past_date = past_date.addDays(-1);
    //Add the cells
    var week_day = dayToWeek(past_date.getUTCDay());
    var weekend = (isWeekend(past_date.getUTCDay())?"gantt-chart-weekend":"");
    var sunday = (future_date.getUTCDay()==0?"sunday":"");
    //Add the day to the header
    $('.gantt-chart-row-header').append(`<div class="gantt-chart-cell-header table-cell" date="`+dateToInput(past_date)+`" style="min-width:`+gant_chart_cell_width+`px;">`+week_day+`</div>`);
    $('.gantt-chart-row-body').append(`<div class="gantt-chart-cell-body `+sunday+` `+weekend+` table-cell" style="width:5px;"></div>`)
}