var startHighlight = {col:0,row:0};
var endHighlight = {col:0,row:0};
var cellHighlight = false;

$(function(){
    defaultWidth = {
        indicator: 30,
        taskMode: 80,
        taskName: 150,
        duration: 30,
        start: 150,
        finish: 150,
        prereq: 40
    };
    defaultHeight = 21;
    fillInGanttCels();
    initResize();
    initExcelEvents();
    
});

function initExcelEvents(){
    //Get the mousedown
    //Handle mousemove
    $(".gantt-cell").on("mousemove",handleCellOver);
    $('.gantt-cell').on("mousedown",handleCellDown);
    $('body').on("mouseup",handleCellUp)
}

function handleCellOver(e){

    //If the mouse is down over the cells, move the endHighlight
    if(cellHighlight){

        //Find the col
        var col = $(e.target).attr('col');

        //Find the row
        var row = $(e.target).closest('.gantt-row').attr('row');
        
        endHighlight.col = col;
        endHighlight.row = row;

        //If the mouse is near an edge scroll
        //scrollToCell(col,row);
        refreshCellHighlight();
    }
}

function getCol(offsetX){
    //Check lower bound
    if(offsetX<0){
        return 0;
    }

    //Check upper bound
    var width = $('#gantt_cell_wrapper').outerWidth();
    if(offsetX>width){
        //Later I will make this scroll the thing
        return 6;
    }
    
    var leftScroll = $('#gantt_cell_wrapper').scrollLeft();
    var col = 6;
    var total = leftScroll+offsetX;
    $('.gantt-row-header .gantt-cell-header').each(function(key,element){
        total -= $(element).outerWidth();
        if(total<=0){
            col = $(element).attr('col');
            return false;
        }
    });
    return col;

}

function getRow(offsetY){
    //Check lower bound
    if(offsetY<0){
        return 0;
    }

    //Check upper bound
    var height = $('#gantt_cell_wrapper').outerHeight();
    if(offsetY>height){
        //Later I will make this scroll the thing
        return 41;
    }
    
    var topScroll = $('#gantt_cell_wrapper').scrollTop();
    var row = 41;
    var total = topScroll+offsetY;
    $('.gantt-row').each(function(key,element){
        total -= $(element).outerHeight();
        if(total<=0){
            row = $(element).attr('row');
            return false;
        }
    });
    return row;
}

function scrollToCell(col,row){
    console.log("Scrolling to "+col+","+row);
}

function activateCell(col,row){
    var cell = $('.gantt-row[row='+row+']').find('.gantt-cell[col='+col+']');
    var width = cell.width();
    if(cell.hasClass('input-date')){
        activateInputDate();
    }
    else if(cell.hasClass('input-text')){
        activateInputText();
    }
    else if(cell.hasClass('input-number')){
        activateInputNumber();
    }
    cell.find('input').focus();
    function activateInputNumber(){
        //First check if the input already exists
        if(cell.find("input").length==0){
            //Insert or destroy the input
            cell.append($(`
                <input type="number" class="transparent" style="max-width:`+width+`px"></input>
            `));
        }
        else{
            console.log(cell.find('input').val());
        }
    }
    function activateInputText(){
        //First check if the input already exists
        if(cell.find("input").length==0){
            //Insert or destroy the input
            cell.append($(`
                <input type="text" class="transparent" style="max-width:`+width+`px"></input>
            `));
        }
        else{
            console.log(cell.find('input').val());
        }
    }
    function activateInputDate(){
        //First check if the input already exists
        if(cell.find("input").length==0){
            //Insert or destroy the input
            var datepicker = $(`<input type="date" class="transparent" style="max-width:`+width+`px"></input>`);
            cell.append(datepicker);
        }
        else{
            console.log(cell.find('input').val());
        }
    }
}
function handleCellUp(){
    //If the same cell is highlighted, activate it
    if(cellHighlight&&startHighlight.col == endHighlight.col
        &&startHighlight.row == endHighlight.row){
            activateCell(startHighlight.col,startHighlight.row);
    }
    cellHighlight = false;
}

function handleCellDown(e){
    console.log(e);
    //check the current startHighlight if it needs to be cleared


    //Gonna leave that there, but let's get the cell number instead
    var col = $(e.currentTarget).attr('col');
    var row = $(e.currentTarget).closest(".gantt-row").attr('row');
    //If it's NOT the same cell that as clicked
    if(startHighlight.col != col
        ||startHighlight.row != row){
        clearPending(startHighlight.col,startHighlight.row);
    }
    
    startHighlight.col = col;
    startHighlight.row = row;
    endHighlight.col = col;
    endHighlight.row = row;
    
    cellHighlight = true;
    window.getSelection().empty();
    refreshCellHighlight();
}

function clearPending(col,row){
    //Check if the input is empty
    var cell = $('.gantt-row[row='+row+']').find('.gantt-cell[col='+col+']');
    var input = cell.find('input');
    var val = input.val();
    if(!val){
        //There is no data, remove the input
        input.remove();
    }
}

function refreshCellHighlight(){
    //Get lower col
    //Get higher col
    //Get lower row
    //Get higher row
    var col1 = startHighlight.col;
    var col2 = endHighlight.col;
    var row1 = parseInt(startHighlight.row)+1;
    var row2 = parseInt(endHighlight.row)+1;

    var lowerCol = Math.min(col1,col2);
    var higherCol = Math.max(col1,col2);
    var lowerRow = Math.min(row1,row2);
    var higherRow = Math.max(row1,row2);

    //Create CSS Selection
    var selection = "";
    for(var i = lowerCol;i<=higherCol;i++){
        selection += ".gantt-cell[col="+i+"],";
    }
    selection = selection.slice(0, -1);

    //Set background classes
    var rows = $('.gantt-row');
    $('.cell-highlight').removeClass('cell-highlight');
    for(var i = lowerRow;i<=higherRow;i++){
        $(rows[i]).find(selection).addClass('cell-highlight');
    }

}

function initResize(){
    $('#gantt_table_cell_wrapper').resizable({
        handles: "e, s, w"
      });
    $('.gantt-cell-header').resizable({
        handles: "e",
        resize: function(e){
            if($(e.target).hasClass('input-date')){
                //We want to resize all the inputs
                var col = $(e.target).attr('col');
                var style = $(e.target).attr("style");
                var width = style.split("width: ")[1].split(";")[0];
                $('.gantt-cell[col='+col+'] input')
                    .css("max-width",width);
            }
            else{
                var col = $(e.target).attr('col');
                var width = $(e.target).width();
                $('.gantt-cell[col='+col+'] input')
                    .css("max-width",width);
            }
        }
    });
}

function fillInGanttCels(){
    //Get the height of the table
    var height = $('#gantt_cells').height();
    var rows = Math.ceil(height/defaultHeight);
    //Create the row
    var row = $(`
        <div class="no-select gantt-row gantt-row-header table-row" row=`+i+` style="height:`+defaultHeight+`px">
            <div class="no-select gantt-indicator gantt-cell-header table-cell" col=0 style="width:`+defaultWidth.indicator+`px;"><span>I</span></div>
            <div class="no-select gantt-taskmode gantt-cell-header table-cell" col=1 style="width:`+defaultWidth.taskMode+`px;">Task Mode</div>
            <div class="no-select input-text gantt-taskname gantt-cell-header table-cell" col=2 style="width:`+defaultWidth.taskName+`px;">Task Name</div>
            <div class="no-select input-number gantt-duration gantt-cell-header table-cell" col=3 style="width:`+defaultWidth.duration+`px;">Duration</div>
            <div class="no-select input-date gantt-start gantt-cell-header table-cell" col=4 style="width:`+defaultWidth.start+`px;">Start</div>
            <div class="no-select input-date gantt-end gantt-cell-header table-cell" col=5 style="width:`+defaultWidth.finish+`px;">Finish</div>
            <div class="no-select input-number gantt-prereq gantt-cell-header table-cell" col=6 style="width:`+defaultWidth.prereq+`px;">PreReq</div>
        </div>
    `);
    $("#gantt_cells").append(row);
    for(var i = 0; i<rows; i++){
        //Create the row
        var row = $(`
            <div class="no-select gantt-row table-row" row=`+i+` style="height:`+defaultHeight+`px">
                <div class="no-select gantt-indicator gantt-cell table-cell" col=0></div>
                <div class="no-select gantt-taskmode gantt-cell table-cell" col=1></div>
                <div class="no-select input-text gantt-taskname gantt-cell table-cell" col=2></div>
                <div class="no-select input-number gantt-duration gantt-cell table-cell" col=3></div>
                <div class="no-select input-date gantt-start gantt-cell table-cell" col=4></div>
                <div class="no-select input-date gantt-end gantt-cell table-cell" col=5></div>
                <div class="no-select input-number gantt-prereq gantt-cell table-cell" col=6></div>
            </div>
        `);
        $("#gantt_cells").append(row);
    }
}
