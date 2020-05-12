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
            prodpath += "https://www.dropbox.com/home/MeSo%20Campaigns/Accenture/" + $("#in-prod").val();
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

		// cl number
		if (cln.length > 0) {
			text += "h5. Cl Number\n";
			// for(var i=0; i < cln.length; i++) {
			// 	text += "{{" + cln[i] + "}} ";
			// }
			text += cln.join(', ');
			text += "\n";
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
