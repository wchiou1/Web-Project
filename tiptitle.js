//Sets up "tiptitles" which are tooltips in the vein of Rimworld
//Uses event propagation to capture the tooltip text and display it
var tt_offset = {x:15,y:10};
function initTipTitles(){
  //Capture the hover event
  $('body').on("mousemove", function(e){
    

    //Set the text
	
	//First check if target has the attribute
    let tt_text = $(e.target).attr('tip-title');
    if(tt_text==undefined||tt_text.length==0)
      //Check if the target children has the attribute
		tt_text = $(e.target).closest("[tip-title]").attr('tip-title');
	  
    $('#tiptitleText').text(tt_text);
	
	if(tt_text==undefined||tt_text.length==0){
		$('#tiptitleWrapper').addClass("no-display");
	}
	else{
		$("#tiptitleWrapper").removeClass("no-display");
	}

    //Set the coords
    let ox = e.offsetX;
    let oy = e.offsetY;

    let px = e.pageX;
    let py = e.pageY;
    $('#tiptitleWrapper')
      .css('left',e.pageX+tt_offset.x)
      .css('top',e.pageY+tt_offset.y);
  });

  $('body').prepend(
    '<div id="tiptitleWrapper">'+
      '<div id="tiptitleBody">'+
        '<div id="tiptitleText">tiptitle</div>'+
      '</div>'+
    '</div>');
}