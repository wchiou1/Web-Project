//Complementary to main but for the gantt chart
var today_date = new Date();
var past_date = new Date().getWeekStart().addDays(-1);
console.log(past_date.getUTCDay());
var future_date = new Date().getWeekStart();
var gantt_chart_cell_width = 20;
$(function(){
    today = dateToInput(today_date);
    past = dateToInput(past_date);
    future = dateToInput(future_date);
    fillInGanttChart();
    markLine(today_date);
});

function updateGanttBar(row){
    //We will cancel if there is any information missing
    var cell_row = $("#gantt_cells .gantt-row[row='"+row+"']");
    
    //Get start
    var start = cell_row.find('.gantt-start input').val();
    if(start==undefined){
        console.error("no start");
        return;
    }

    //Get end
    var end = cell_row.find('.gantt-end input').val();
    if(end==undefined){
        console.error("no end");
        return;
    }
    var days = daysDiff(start,end);
    var length = (days+1)*gantt_chart_cell_width;

    //Create the bar
    var bar = $(`<div class="gantt-bar" row="`+row+`"></div>`);
    bar.css("width",length+"px");

    
    $('#gantt_chart_body .gantt-chart-row-body[row="'+row+'"]')
        .find('.gantt-bar').remove()
        .end()
        .find('.gantt-chart-cell-body[date="'+start+'"]')
        .append(bar);
}

function markLine(date){
    var date_string = dateToInput(date);
    var hours = date.getHours();
    var pos = hours/24*gantt_chart_cell_width;
    var marker = $(`<div class="date-marker"></div>`);
    marker.css("margin-left",pos+"px");
    $('.gantt-chart-cell-header[date="'+date_string+'"]').append(marker);
}

function fillInGanttChart(){
    //Get the height of the table
    var height = $('#gantt_cells').height();
    var rows = Math.ceil(height/defaultHeight);
    //Create the row
    var header = $(`
        <div class="no-select gantt-chart-row-header table-row" style="height:`+defaultHeight/2+`px"></div>
    `);
    $("#gantt_chart_header_labels").css('height',defaultHeight/2+"px");
    $("#gantt_chart_body").append(header);
    var rows = $(".gantt-row").not('.gantt-row-header').length;
    for(var i=0;i<rows;i++){
        $("#gantt_chart_body").append(`<div class="gantt-chart-row-body table-row" row=`+i+` style="height:`+defaultHeight+`px"></div>`);
    }
    
    for(var i=0;i<12;i++){
        appendWeek();
    }

    for(var i=0;i<3;i++){
        prependWeek();
    }
}
function appendWeek(){
    var future_input = dateToInput(future_date);
    //add label
    $('#gantt_chart_header_labels').append(`
        <div class="table-cell">
            <div class="gantt-chart-header-label" style="width:`+((gantt_chart_cell_width)*7-1)+`px">`+future_input+`</div>
        </div>`);

    for(var i=0;i<7;i++){
        appendDay();
    }
}
function prependWeek(){
    var past_input = dateToInput(past_date.getWeekStart());
    //add label
    $('#gantt_chart_header_labels').prepend(`
        <div class="table-cell">
            <div class="gantt-chart-header-label" style="width:`+((gantt_chart_cell_width)*7-1)+`px">`+past_input+`</div>
        </div>`);

    for(var i=0;i<7;i++){
        prependDay();
    }

    
}
function appendDay(){
    
    //Add the cells
    var week_day = dayToWeek(future_date.getUTCDay());
    var weekend = (isWeekend(future_date.getUTCDay())?"gantt-chart-weekend":"");
    var sunday = (future_date.getUTCDay()==0?"gantt-cell-white-separator":"");
    var saturday = (future_date.getUTCDay()==6?"gantt-cell-white-separator":"");
    //Add the day to the header
    $('.gantt-chart-row-header').append(`<div class="gantt-chart-cell-header `+sunday+` table-cell" date="`+dateToInput(future_date)+`" style="min-width:`+gantt_chart_cell_width+`px;">`+week_day+`</div>`);
    $('.gantt-chart-row-body').append(`<div class="gantt-chart-cell-body `+saturday+` `+weekend+` table-cell" date="`+dateToInput(future_date)+`" style="width:5px;"></div>`);
    //Increment future by one
    future_date = future_date.addDays(1);
}
function prependDay(){
    console.log(past_date);
    
    //Add the cells
    var week_day = dayToWeek(past_date.getUTCDay());
    var weekend = (isWeekend(past_date.getUTCDay())?"gantt-chart-weekend":"");
    var sunday = (past_date.getUTCDay()==0?"gantt-cell-white-separator":"");
    var saturday = (past_date.getUTCDay()==6?"gantt-cell-white-separator":"");
    //Add the day to the header
    $('.gantt-chart-row-header').prepend(`<div class="gantt-chart-cell-header `+sunday+` table-cell" date="`+dateToInput(past_date)+`" style="min-width:`+gantt_chart_cell_width+`px;">`+week_day+`</div>`);
    $('.gantt-chart-row-body').prepend(`<div class="gantt-chart-cell-body `+saturday+` `+weekend+` table-cell" date="`+dateToInput(past_date)+`" style="width:5px;"></div>`);
    //Decrement past by one
    past_date = past_date.addDays(-1);
}