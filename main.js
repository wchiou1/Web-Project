$(function(){
    defaultWidth = {
        indicator: 50,
        taskMode: 80,
        taskName: 120,
        duration: 80,
        start: 80,
        finish: 80,
        prereq: 80
    };
    defaultHeight = 20;
    fillInGanttCels();
});

function fillInGanttCels(){
    //Get the height of the table
    var height = $('#gantt_cells').height();
    var rows = Math.ceil(height/defaultHeight);
    //Create the row
    var row = $(`
        <div class="gantt-row table-row" row=`+i+` style="height:`+defaultHeight+`px">
            <div class="gantt-indicator gantt-cell-header table-cell" cell=1 style="width:`+defaultWidth.indicator+`px;"><span>I</span></div>
            <div class="gantt-taskmode gantt-cell-header table-cell" cell=2 style="width:`+defaultWidth.taskMode+`px;">Task Mode</div>
            <div class="gantt-taskname gantt-cell-header table-cell" cell=2 style="width:`+defaultWidth.taskName+`px;">Task Name</div>
            <div class="gantt-duration gantt-cell-header table-cell" cell=3 style="width:`+defaultWidth.duration+`px;">Duration</div>
            <div class="gantt-start gantt-cell-header table-cell" cell=4 style="width:`+defaultWidth.start+`px;">Start</div>
            <div class="gantt-end gantt-cell-header table-cell" cell=5 style="width:`+defaultWidth.finish+`px;">Finish</div>
            <div class="gantt-prereq gantt-cell-header table-cell" cell=6 style="width:`+defaultWidth.prereq+`px;">PreReq</div>
        </div>
    `);
    $("#gantt_cells").append(row);
    for(var i = 0; i<rows; i++){
        //Create the row
        var row = $(`
            <div class="gantt-row table-row" row=`+i+` style="height:`+defaultHeight+`px">
                <div class="gantt-indicator gantt-cell table-cell" cell=1></div>
                <div class="gantt-taskmode gantt-cell table-cell" cell=2></div>
                <div class="gantt-taskname gantt-cell table-cell" cell=2></div>
                <div class="gantt-duration gantt-cell table-cell" cell=3></div>
                <div class="gantt-start gantt-cell table-cell" cell=4></div>
                <div class="gantt-end gantt-cell table-cell" cell=5></div>
                <div class="gantt-prereq gantt-cell table-cell" cell=6></div>
            </div>
        `);
        $("#gantt_cells").append(row);
    }
}
