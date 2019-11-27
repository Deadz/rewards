var cards   = [];
var max     = 0;
var rest    = 0;
var percent = 0;

$.ajax(
{
	url: 'https://steemmonsters.com/cards/get_details/',
	dataType: 'json',
	success: function(data)
	{
		cards = data;
		cards.forEach(function(card)
		{
			if(card["editions"].search("3") > -1)
			{
				$("#tab").append("<button id="+card['id']+" class='w3-bar-item w3-button' onclick='showCard("+card['id']+")'>"+card["name"]+"</button>");
			}
		});
	}
});

function showCard(id)
{
	$("button").removeClass("w3-red");
	$("#"+id).toggleClass("w3-red");
	$("#name").text(cards[id-1]["name"]);
	$("#smImage").attr("src","https://d36mxiodymuqjm.cloudfront.net/cards_beta/"+cards[id-1]["name"]+".png")
	switch(cards[id-1]["rarity"])
	{
	  case 1:
	    $("#max").text("400000");
	    max = 400000;
	    break;
	  case 2:
	  	$("#max").text("100000");
	  	max = 100000;
	  	break
	  case 3:
	  	$("#max").text("40000");
	  	max = 40000;
	    break;
	  default:
	  	$("#max").text("10000");
	  	max = 10000;
	}
	$("#now").text(cards[id-1]["total_printed"]);
	rest = max-cards[id-1]["total_printed"];
	$("#rest").text(rest);
	percent = (rest/max*100).toFixed(2);
	$("#percent").text(percent);
	if(percent < 6)
		$("#remaining").attr("class", "w3-text-red");
	else
	{
		if(percent > 4 && percent < 21)
			$("#remaining").attr("class", "w3-text-orange");
		else
			$("#remaining").attr("class", "w3-text-green");	
	}
}