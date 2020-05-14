// JavaScript Document
$(document).ready(function() {

	// Funtion for enable the input for paths by checkbox
    $("#chk-prod").click(function() {
            if ($(this).is(":checked")) {
                //$('#ftp-path').toggle('slow');
                $("#in-prod").removeAttr("disabled");
                $("#in-prod").focus();
            } else {
                $("#in-prod").attr("disabled", "disabled");
            }
     });

     // VRBO Funtions
     $("#chk-vrbo").click(function() {
       if ($(this).is(":checked")) {
           //$('#ftp-path').toggle('slow');
           $("#in-vrbo,#add-vrbo" ).removeAttr("disabled");
           //$('#vrbo-group').toggle('slow');
           $("#in-vrbo").focus();
           } else {
             $("#in-vrbo,#add-vrbo").attr("disabled", "disabled");
           }
       });

       $("#add-vrbo").click(function(){
   		    var newcl = $('#in-vrbo').val();
   			  if(newcl !== ""){
   				      $('#vrbo-list').append("<div class='panel panel-default'><div class='panel-body'><p><span class='lbl vrbo'>mlp.hub." + newcl + ".page.heading</span><br><span class='lbl vrbo'>mlp.hub." + newcl + ".page.subheading</span><br><br><span class='lbl vrbo'>component.branding.heading." + newcl + "</span><br><span class='lbl vrbo'>component.branding.subheading." + newcl + "</span><br><br><span class='lbl vrbo'>mlp.component.destinations.heading." + newcl + "</span><br><br><span class='lbl vrbo'>component.listings.card.search." + newcl + "</span><br><span class='lbl vrbo'>component.listings.heading." + newcl + "</span><br><br><span class='lbl vrbo'>mlp.hub." + newcl + ".page.title</span><br><span class='lbl vrbo'>mlp.hub." + newcl + ".meta.description</span><br><br><span class='lbl vrbo'><b>*Hero Tags*</b></span><br><span class='lbl vrbo'>mlp_" + newcl + "_default_vrbo</span></p></div></div><button class='btn btn-danger remove-vrbo' style='float: right;margin-top: -10%; margin-bottom: .5em;'>Clean MPLs Section</button>");
   				$('#in-vrbo').val('').focus();
   			}
   		});

   		$( "#vrbo-list" ).delegate( ".remove-vrbo", "click", function() {
   			$( this ).prev().remove();
   			$( this ).remove();
   		});

	$("#inSignature").val(localStorage.signature);
	$("#inComments").val(localStorage.comments);

	$("#generate").click(function(){
		var urls = parseURL();
		var cln = parseCL();
		var comments = $('#inComments').val();

		var signature = $('#inSignature').val();
		var jiracodes = new Array();
		var jiracodesflat = "";

		localStorage.comments = $('#inComments').val();
		localStorage.signature = $('#inSignature').val();

		var text = "h5. PRODUCTION REPORT\n";
		// PATH
		// Production
        if ($('#chk-prod').is(":checked")) {
            prodpath = "h5. Image Path: \n";
            prodpath += "https://expediacorp.sharepoint.com/:f:/r/sites/MeSoCampaigns/Shared%20Documents/ACCENTURE/" + $("#in-prod").val();
            console.log(prodpath);
            text += prodpath + "\n";
        }

		// URLS
		for (var code in urls) {
			text += "h5. " + code + "\n";
			for(var i=0; i < urls[code].length; i++) {
				text += urls[code][i] + "\n";
			}
			text += "\n";
		}

		// changes
		changeslen = $("#changes input:checked").length;
		if(changeslen !== 0) {
			text += "h5. Changes \n";
			$("#changes input:checked").each(function( index ) {
				text += $(this).val();
				text += ( index + 1 === changeslen)?'':', ';
			});
			text += "\n";
		}

    // VRBO
		function parseCL() {
			var cln = new Array;
			$('#vrbo-list .vrbo').each(function( index ) {
				cln.push( $( this ).text() );
			});
			return cln;
			console.log(cln);
		}
		var cln = parseCL();
		if (cln.length > 0) {
			vrboMpls = "h5. MLPs Created for Vrbo\n";
			// for(var i=0; i < cln.length; i++) {
			// 	text += "{{" + cln[i] + "}} ";
			// }
			vrboMpls += cln.join('\n');
			vrboMpls += "\n";
			console.log(vrboMpls);
		text += vrboMpls + "\n";
		}

		// comments
		if (comments !== '') {
			text += "h5. Comments\n";
			text += comments;
			text += "\n";
		}

		// signature
		if (signature !== '') {
			text += "\n";
			text += signature;
			text += "\n";
		}

		// jira codes
		for (var code in urls) {
			jiracode = code_to_jiracode(code);
			if (jiracode !== "") {
				jiracodes[code_to_jiracode(code)] = code_to_jiracode(code);
			}
		}

		for (var code in jiracodes) {
				jiracodesflat += code + " | ";
		}

		console.log(jiracodes);

		$('#panelposcode').val(jiracodesflat);
		$('#panelcode').val(text).focus().select();
	});

	$("#clean").click(function(){
		var text = "";
		var urls = parseURL();

		console.log(urls);

		// URLS
		for (var code in urls) {
			text += code + "\n";
			for(var i=0; i < urls[code].length; i++) {
				text += urls[code][i] + "\n";
			}
			text += "\n";
		}

		$("#inUrls").val(text);

	});

	$("#clean_produ").click(function(){
		var text = "";
		var urls = parseURL();

		console.log(urls);

		// URLS
		for (var code in urls) {
			text += code + "\n";
			for(var i=0; i < urls[code].length; i++) {
				text += testing_to_live(urls[code][i]) + "\n";
			}
			text += "\n";
		}

		$("#inUrls").val(text);

	});

	$("#clean_testi").click(function(){
		var text = "";
		var urls = parseURL();

		console.log(urls);

		// URLS
		for (var code in urls) {
			text += code + "\n";
			for(var i=0; i < urls[code].length; i++) {
				text += live_to_testing(urls[code][i]) + "\n";
			}
			text += "\n";
		}

		$("#inUrls").val(text);

	});

	$("#clean_force").click(function(){
		var text = "";
		var urls = parseURL();

		console.log(urls);

		// URLS
		for (var code in urls) {
			text += code + "\n";
			for(var i=0; i < urls[code].length; i++) {
				text += force_hcom(urls[code][i],code) + "\n";
			}
			text += "\n";
		}

		$("#inUrls").val(text);

	});
});
