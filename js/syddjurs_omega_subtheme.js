/**
 * Hides print buttons for the iPad
 */
function hide_print_buttons(){
  jQuery(document).ready(function() {
     if (isTouchDevice()){
	jQuery(".print-button").hide();
     }
  }); 
}

/**
 * Fixes the bug when two click are needed to follow link on iPad
 */
function add_indicator_help_text(){
  jQuery(document).ready(function() {
      jQuery('.indicator-has-notes').each(function() {
	  jQuery(this).attr('title', 'Ikonet er ikke klikbart, men angiver at du har lavet en eller flere noter.');
      });
      jQuery('.indicator-has-speaker-paper').each(function() {
	  jQuery(this).attr('title', 'Ikonet er ikke klikbart, men angiver at du har oprettet et talepapir.');
      });
  });
}


/**
 *Add the listener to the tabler orientation property. On device rotation side menu is either forces to be closed, or shown
 */
function add_tablet_orientation_listener(){
  jQuery(document).ready(function() {
      jQuery(window).bind('orientationchange', function(event) {
	if (Math.abs(window.orientation) != 90) //vertical
	  hide_side_menu();
      });
  });
}

/**
 * Adds the behaviour of showing/hidng the right side panel with menu.
 */
function add_show_hide_menu_behaviour(){
   jQuery(document).ready(function() {
       jQuery("#show_hide_menu_button").click(function(){
 	    jQuery(".region-sidebar-second-inner").toggle();

	    if (jQuery("#show_hide_menu_button").val() == "⇐"){
		jQuery("#show_hide_menu_button").val("⇒");
		jQuery("#region-content").removeClass("grid-18");
		jQuery("#region-content").addClass("grid-24");
	    }
	    else{
		jQuery("#show_hide_menu_button").val("⇐");
		jQuery("#region-content").removeClass("grid-24");
		jQuery("#region-content").addClass("grid-18");
	    }
 	});
       var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
       
       if (width < 1000){
	    hide_side_menu();
       }
   });
}

/**
 * A funtion to hide the menu one time, is used on devices with small screen
 */
function hide_side_menu(){
  jQuery(document).ready(function() {
	  jQuery(".region-sidebar-second-inner").hide(); 
	  jQuery("#show_hide_menu_button").val("⇒");
	  jQuery("#region-content").removeClass("grid-18");
	  jQuery("#region-content").addClass("grid-24");
  });
}

/**
 * Adds the expand behaviour to bullet point on meeting or bullet-point view
 * 
 * @url is base url, used to send the parameted to attachment_add_expand_behaviour()
 */
function bullet_point_add_expand_behaviour(url){
   jQuery(document).ready(function() {   
	jQuery(".bullet-point-attachments .view-content .item-list .ul-item-list-dagsordenspunkt").each(function(index) {
	  jQuery(this).attr("id","attachments_container_"+index);
	  jQuery(this).hide();
	  
	  jQuery(this).parent().parent().parent().children(".hide_show_button_container").append("<input type='button' class='button' id='btn_hide_show_attachments_"+index+"' value='⇓'></a>");
	  jQuery("#btn_hide_show_attachments_"+index).click(function(){
 	    jQuery("#attachments_container_"+index).toggle();
	    
	    if (jQuery("#btn_hide_show_attachments_"+index).val() == "⇓")
		jQuery("#btn_hide_show_attachments_"+index).val("⇑");
	    else
		jQuery("#btn_hide_show_attachments_"+index).val("⇓");
	    
	    
 	  });
	  
	  attachment_add_expand_all_behaviour(this, index, url);  
	  attachment_add_expand_behaviour(this,index,url);
	});
   });
}

/**
 * Initiator function to add expand behaviour for bullet point, is used on bullet-point view
 * 
 * @url is base url, used to send the parameted to attachment_add_expand_behaviour()
 */
function bullet_point_details_init(url){
  jQuery(document).ready(function() {   
    jQuery(".item-list-dagsordenspunkt .ul-item-list-dagsordenspunkt").each(function(index) {
	attachment_add_expand_all_behaviour(this, index, url);  
	attachment_add_expand_behaviour(this, index, url);
    });
  });
}

/**
 * Add expand all behavious for bullet point - opens all of its children.
 * 
 * Also loads the comment of the attachment via Ajax and adds the annotator to it, if these actions has not been done before
 *
 */
function attachment_add_expand_all_behaviour(bulletPoint, bulletPointIndex, url){
  jQuery(bulletPoint).prepend("<input type='button' class='button hide_show_all_attachments_text' id='btn_hide_show_all_attachments_text_"+bulletPointIndex+"' value='⇊'></a>");
  jQuery("#btn_hide_show_all_attachments_text_"+bulletPointIndex).click(function(){
    
    
    if (jQuery("#btn_hide_show_all_attachments_text_"+bulletPointIndex).val() == "⇊"){
	jQuery("[id^=attachment_text_container_"+bulletPointIndex+"_]").each(function(index_attachment){
	  jQuery(this).show();
	  //handle single expand button
	  jQuery("#btn_hide_show_attachment_text_"+bulletPointIndex+"_"+index_attachment).val("⇑");
	  
	  attachment_load_content(bulletPointIndex, index_attachment, url);
	});
	
	jQuery("#btn_hide_show_all_attachments_text_"+bulletPointIndex).val("⇈");
    } else {
	jQuery("[id^=attachment_text_container_"+bulletPointIndex+"_]").hide();
	jQuery("#btn_hide_show_all_attachments_text_"+bulletPointIndex).val("⇊");
	
	//handle single expand button
	jQuery("[id^=btn_hide_show_attachment_text_"+bulletPointIndex+"_]").val("⇓");
    }
  });
}

/**
 * Adds expand behaviour on a single attachment.
 * 
 * Also calls attachment_load_content
 */
function attachment_add_expand_behaviour(bulletPoint, bulletPointIndex, url){
  jQuery(bulletPoint).children("li").children(".attachment_text_container").each(function(index_attachment){
    jQuery(this).attr("id","attachment_text_container_"+bulletPointIndex+"_"+index_attachment);
    jQuery(this).hide();

    jQuery(this).parent().prepend("<input type='button' class='button hide_show_attachment_text' id='btn_hide_show_attachment_text_"+bulletPointIndex+"_"+index_attachment+"' value='⇓'></a>");
    jQuery("#btn_hide_show_attachment_text_"+bulletPointIndex+"_"+index_attachment).click(function(){
      //hide or show the content container
      jQuery("#attachment_text_container_"+bulletPointIndex+"_"+index_attachment).toggle();
      
      attachment_load_content(bulletPointIndex, index_attachment, url);
      
      //change the arrow button icon
      if (jQuery("#btn_hide_show_attachment_text_"+bulletPointIndex+"_"+index_attachment).val() == "⇓")
	jQuery("#btn_hide_show_attachment_text_"+bulletPointIndex+"_"+index_attachment).val("⇑");
      else
	jQuery("#btn_hide_show_attachment_text_"+bulletPointIndex+"_"+index_attachment).val("⇓");
      
      //handle expand all
      if (jQuery("[id^=btn_hide_show_attachment_text_"+bulletPointIndex+"_][value='⇓']").length > 0)
	jQuery("#btn_hide_show_all_attachments_text_"+bulletPointIndex).val("⇊");
      else
	jQuery("#btn_hide_show_all_attachments_text_"+bulletPointIndex).val("⇈");
      
      
    });
  });	
}

/**
 * Loads the content of the attachment and places it into the container
 * 
 * Also loads the comment of the attachment via Ajax and adds the annotator to it, if these actions has not been done before
 */
function attachment_load_content(bulletPointIndex, index_attachment, url){
    //load the content on first click and add the annotator
    if (jQuery("#attachment_text_container_"+bulletPointIndex+"_"+index_attachment).children().contents().first().text() == "Vent venligst..."){
      //get meeting id, bullet-point id and bilag id		
      classes = jQuery("#attachment_text_container_"+bulletPointIndex+"_"+index_attachment).children().attr('class').split(' ');
      var cl = jQuery.grep(classes, function(string, i){
	return (string.indexOf("bpa-") == 0);
      });
      
      cl_arr = String(cl).split("-");
      var bilag_id = cl_arr[3];
      var bullet_point_id = cl_arr[2];
      var meeting_id = cl_arr[1];
      
      //add real content
      jQuery.get(url + "meeting/" + meeting_id + "/bullet-point/" + bullet_point_id + "/bullet-point-attachment-raw/" + bilag_id, function(html) {
	//remove dummy text
	jQuery("#attachment_text_container_"+bulletPointIndex+"_"+index_attachment).children().contents().first().remove();
	jQuery("#attachment_text_container_"+bulletPointIndex+"_"+index_attachment).children().contents().first().remove();
	
	jQuery("#attachment_text_container_"+bulletPointIndex+"_"+index_attachment).children().first().append(html);
	
	//add annotator to it
	add_annotator(meeting_id, bullet_point_id, bilag_id, ".bpa-" + meeting_id + "-" + bullet_point_id + "-" + bilag_id,url, false);
      });
	
    }
}

/**
 * Adds notes indicators, to bullet point attachment
 * 
 */
function bullet_point_attachment_add_notes_indicator(ids){
  jQuery(document).ready(function() {
	jQuery(".indicator-has-no-notes").each(function(){
	  if (ids.indexOf(parseInt(this.id)) != -1){
	    jQuery(this).attr("class","indicator-has-notes");
	  }
	});
   });
}

/**
 * Hides quick annotate button is device is not touchable
 * 
 */
function hide_quick_annotate_buttons(){
   jQuery(document).ready(function() {
     if (!isTouchDevice()){
	jQuery(".quick-annotate-button").hide();
	jQuery(".quick-annotate-container").removeClass("quick-annotate-container");
     }
   });  
}

/**
 * Checks if device is touchable
 * 
 */
function isTouchDevice(){
  return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
}

function addPagescroller(){
  if (isTouchDevice()){
    jQuery(document).ready(function() {
	jQuery('.bullet-point-attachments').pageScroller({
	      navigation: true,
	      sectionClass: 'views-field-php-4',
	});	
	
	var maxPages = jQuery('.views-field-php-4').size();
	var page = 0;
	
	jQuery('.bullet-point-attachments').prepend('<div id="arrow-controls" class="light right">'
	+ '<a href="#" class="prev"></a><br/>'
	+ '<a href="#" class="next"></a>'
	+ '</div>');
	
	// assigns 'next' API command to link
	jQuery('#arrow-controls .next').bind('click', function(e){
		e.preventDefault();
		if (page < maxPages)
		  page++;
		console.log(pageScroller.current);
		//pageScroller.goTo(page);
		pageScroller.next();
	});

	// assigns 'previous' API command to link		
	jQuery('#arrow-controls .prev').bind('click', function(e){
		e.preventDefault();
		if (page > 1)
		  page--;
		console.log(pageScroller.current);
		//pageScroller.goTo(page);
		pageScroller.prev();
	});
    }); 
  }
}
