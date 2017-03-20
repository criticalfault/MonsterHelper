//$('document').ready(function(){
	"use strict";
	console.log("Script -> Loaded");

	var init = false;

	var basic = [];
	var advance = [];
	var legendary = [];

	var AIDeck = [];
	var AIDiscard = [];

	
	var hitLocPlayDeck = new Array();
	var hitLocDeckDiscard = [];

	var woundStack = [];

	var Moods = [];
	var Critical_Wounds = [];

	class Hit_Card
	{
		constructor(title, desc)
		{
			this.title = title;
			this.desc = desc;
		}


		ToString()
		{
			return this.title + "<br>===============================<br>" + this.desc;
		}
	}

	class AI_Card
	{
		constructor(title, level, desc)
		{
			this.title = title;
			this.level = level;
			this.desc = desc;
		}

		ToString()
		{
			return this.title + "<br>===============================<br>" + this.level + "<br>===============================<br>" + this.desc;
		}
	}

	$("#setup").click(function()
	{
		var $type = $("#monster_selector").val();

		if(  $type == "White Lion Basic" )
		{				
			if(!init)
			{
				Ajax_Hit_Locations("white_lion");
				Ajax_AI_Deck("white_lion", "basic");
				init = true;
				$("#monster_name").text("White Lion Basic");
				$("#toughness").text("Toughness: 6");
				$("#movement").text("Movement: 6");
			}
				
		}
		else if(  $type == "White Lion Level 1" )
		{
			if(!init)
			{
				Ajax_Hit_Locations("white_lion");
				Ajax_AI_Deck("white_lion", "lvl_1");
				init = true;
				$("#monster_name").text("White Lion Level 1");
				$("#toughness").text("Toughness: 8");
				$("#movement").text("Movement: 6");
			}
		}
		else if(  $type == "White Lion Level 2" )
		{
			if(!init)
			{
				Ajax_Hit_Locations("white_lion");
				Ajax_AI_Deck("white_lion", "lvl_2");
				init = true;
				$("#monster_name").text("White Lion Level 2");
				$("#toughness").text("Toughness: 10");
				$("#movement").text("Movement: 7");
				$("#speed").text("Speed: 1");
				$("#damage").text("Damage: 1");
			}
		}
		else if(  $type == "White Lion Level 3" )
		{
			if(!init)
			{
				Ajax_Hit_Locations("white_lion");
				Ajax_AI_Deck("white_lion", "lvl_3");
				init = true;
				$("#monster_name").text("White Lion Level 3");
				$("#toughness").text("Toughness: 14");
				$("#movement").text("Movement: 8");
				$("#speed").text("Speed: 2");
				$("#damage").text("Damage: 2");
				$("#accuracy").text("Accuracy: 2");
				$("#luck").text("Luck: 1")
			}
		}
		else if(  $type == "Phoenix Level 1" )
		{
			if(!init)
			{
				Ajax_Hit_Locations("Phoenix");
				Ajax_AI_Deck("Phoenix", "lvl_1");
				init = true;
				$("#monster_name").text("Phoenix Level 1");
				$("#toughness").text("Toughness: 10");
				$("#movement").text("Movement: 8");
			}
		}
		else if(  $type == "Phoenix Level 2" )
		{
			if(!init)
			{
				Ajax_Hit_Locations("Phoenix");
				Ajax_AI_Deck("Phoenix", "lvl_2");
				init = true;
				$("#monster_name").text("Phoenix Level 2");
				$("#toughness").text("Toughness: 12");
				$("#movement").text("Movement: 8");
				$("#speed").text("Speed: 1");
				$("#damage").text("Damage: 1");
			}
		}
		else if(  $type == "Phoenix Level 3" )
		{
			if(!init)
			{
				Ajax_Hit_Locations("Phoenix");
				Ajax_AI_Deck("Phoenix", "lvl_3");
				init = true;
				$("#monster_name").text("Phoenix Level 3");
				$("#toughness").text("Toughness: 16");
				$("#movement").text("Movement: 8");
				$("#speed").text("Speed: 2");
				$("#damage").text("Damage: 3");
				$("#evasion").text("Evasion: 1");
				$("#luck").text("Luck: 1");
			}
		}
	});

	function Ajax_AI_Deck(filepath, level)
	{
		var jqxhr = $.getJSON( "aidecks/"+filepath+".json", function() 
   		{
		  console.log( "successfully grabbed AI data" );
		}).done(function(data) 
		{
			generate_ai_deck(data, level, filepath);
			console.log("Successfully built AI deck");
		 }).fail(function() 
		 {
		 	alert("error in grabbing the ai_deck for " + filepath );
		    console.log( "error in grabbing the ai_deck for " + filepath );
		 });
	}


	function Ajax_Hit_Locations(filepath)
	{
   		var jqxhr = $.getJSON( "hitdecks/"+filepath+"_hitdeck.json", function() 
   		{
		  console.log( "successfully grabbed hit data" );
		}).done(function(data) 
		{
			generate_hit_deck(data);
			console.log("Successfully built deck");
		 }).fail(function() 
		 {
		 	alert("error in grabbing the hitdeck for " + filepath )
		    console.log( "error in grabbing the hitdeck for " + filepath );
		 });
	}

	function generate_ai_deck(data, level, filepath)
	{
		for(var i=0; i < data["Decks"]['Basic'].length; i++)
		{
			basic.push(new AI_Card(data["Decks"]['Basic'][i]['Title'],data["Decks"]['Basic'][i]['Level'], data["Decks"]['Basic'][i]['Desc'] ));
		}
		console.log("Created a basic deck with " + basic.length + " cards in it");
		
		for(var i=0; i < data["Decks"]['Advance'].length; i++)
		{
			advance.push(new AI_Card(data["Decks"]['Advance'][i]['Title'],data["Decks"]['Advance'][i]['Level'], data["Decks"]['Advance'][i]['Desc']))
		}
		console.log("Created an advance deck with " + advance.length + " cards in it");
		
		for(var i=0; i < data["Decks"]['Legendary'].length; i++)
		{
			legendary.push(new AI_Card(data["Decks"]['Legendary'][i]['Title'],data["Decks"]['Legendary'][i]['Level'], data["Decks"]['Legendary'][i]['Desc']))
		}
		console.log("Created a legendary deck with " + legendary.length + " cards in it");

		if(level == "basic" && filepath == "white_lion")
		{
			basic = shuffle(basic);
			advance = shuffle(advance);

			for(var i=0; i < 7; i++)
			{
				addBasic();
			}
		}
		else if(level == "lvl_1" && filepath == "white_lion")
		{
			basic = shuffle(basic);
			advance = shuffle(advance);

			for(var i=0; i < 7; i++)
			{
				addBasic();
			}
			for(var i=0; i < 3; i++)
			{
				addAdvance();
			}

		}	
		else if(level == "lvl_2" && filepath == "white_lion")
		{
			basic = shuffle(basic);
			advance = shuffle(advance);

			for(var i=0; i < 10; i++)
			{
				addBasic();
			}
			for(var i=0; i < 5; i++)
			{
				addAdvance();
			}
			
		}
		else if(level == "lvl_3" && filepath == "white_lion")
		{
			basic = shuffle(basic);
			advance = shuffle(advance);

			for(var i=0; i < 10; i++)
			{
				addBasic();
			}
			for(var i=0; i < 9; i++)
			{
				addAdvance();
			}

			//Add spot for legendary Cards

		} 
		else
		{
			console.log("Was passed an invalid level (or none at all), check ZE CODE!");
		}
		SetDisplayValues();
	}


	function SetDisplayValues()
	{
		$("#hit_loc_cards").text("Hit Location Cards: "+hitLocPlayDeck.length+"/"+hitLocDeckDiscard.length);
		$("#ai_cards").text("AI Cards: "+AIDeck.length+"/"+AIDiscard.length);
		$("#health").text("Health: " + (AIDeck.length + AIDiscard.length) +"/"+(AIDeck.length + AIDiscard.length + woundStack.length) );
	}


	function generate_hit_deck(data)
	{
		for(var i=0; i < data.length; i++)
		{
			hitLocPlayDeck.push( new Hit_Card(data[i]["Title"], data[i]['desc']));
		}
		hitLocPlayDeck = shuffle(hitLocPlayDeck);
		SetDisplayValues();	
	}


	function addBasic()
	{
		var x = Math.floor(Math.random() * basic.length);
	    var tempCard = basic[x];
		basic.splice(x,1);
		AIDeck.push(tempCard);

	}

	function addAdvance()
	{
		var x = Math.floor(Math.random() * advance.length);
		var tempCard = advance[x];
	    advance.splice(x,1);
		AIDeck.push(tempCard);
	}

	function addLegendary()
	{
		var x = Math.floor(Math.random() * legendary.length);
		var tempCard = legendary[x];
	    legendary.splice(x,1);
		AIDeck.push(tempCard);
	}

	function shuffle(array)
	{
	  var currentIndex = array.length, temporaryValue, randomIndex;
	  // While there remain elements to shuffle...
	  while (0 !== currentIndex)
	  {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

	$("#draw_ai").click(function()
	{
		if(AIDeck.length > 0)
		{
			AIDiscard.push(AIDeck.shift());
			$("#ai_card").html(AIDiscard[AIDiscard.length-1].ToString());
		}
		else
		{
			AIDeck = shuffle(AIDiscard);
			AIDiscard = [];
			$("#ai_card").html("");
		}
		$("#mood").css("display", "inline-block");
		SetDisplayValues();
	});

	$("#draw_hit_loc").click(function()
	{
		if(hitLocPlayDeck.length > 0)
		{
			hitLocDeckDiscard.push(hitLocPlayDeck.shift());
			$("#hit_card").html(hitLocDeckDiscard[hitLocDeckDiscard.length-1].ToString());
		}
		else
		{
			hitLocPlayDeck = shuffle(hitLocDeckDiscard);
			hitLocDeckDiscard = [];
			$("#hit_card").html("");
		}
		$("#deal_critical").css("display", "inline-block");
		SetDisplayValues();
	});

	$("#deal_damage").click(function()
	{
		if(AIDeck.length > 0)
		{
			console.log("AIDeck is" + AIDeck.length);
			woundStack.push(AIDeck.shift());
			$("#ai_card").html(AIDeck[AIDeck.length-1]);
		}
		else
		{
			AIDeck = shuffle(AIDiscard);
			AIDiscard = [];
			if(AIDeck.length == 0)
			{
				alert("Monster Defeated!");
				ResetMonster();
			}

			$("#ai_card").html("");
		}
		SetDisplayValues();
	});

	$("#heal_damage").click(function()
	{
		if(woundStack.length > 0)
		{
			AIDeck.push(woundStack.shift());
		}
		SetDisplayValues();
	});

	$("#mood").click(function()
	{
		console.log("Mood clicked");
		Moods.push( AIDiscard.shift() );
		$("#Moods_Wounds_Stack").append("<div class='Moods_Wounds' id='mood_wound_"+ (Moods.length-1)+"'>"+Moods[Moods.length-1].ToString()+"</div>");
		if(AIDiscard.length == 0)
		{
			$("#ai_card").html("");
		}
		else
		{
			$("#ai_card").html(AIDiscard[AIDiscard.length-1].ToString());
		}



		SetDisplayValues();
	});

	$("#deal_critical").click(function()
	{
		Critical_Wounds.push( hitLocDeckDiscard.pop() );
		$("#Moods_Wounds_Stack").append("<div class='Moods_Wounds' id='mood_wound_"+ (Critical_Wounds.length-1)+"'>"+Critical_Wounds[Critical_Wounds.length-1].ToString()+"</div>");
		if(hitLocDeckDiscard.length == 0)
		{
			$("#hit_card").html("");
		}
		else
		{
			$("#hit_card").html(hitLocDeckDiscard[hitLocDeckDiscard.length-1].ToString());
		}
		SetDisplayValues();
	});

	$("#reset").click(function()
	{
		ResetMonster();
	});


	function ResetMonster()
	{
		init = false;

		basic = [];
		advance = [];
		legendary = [];

		AIDeck = [];
		AIDiscard = [];
		
		hitLocPlayDeck = [];
		hitLocDeckDiscard = [];
		woundStack = [];

		Moods = [];
		Critical_Wounds = [];

		$("#toughness").text("Toughness: 0");
		$("#movement").text("Movement: 0");
		$("#speed").text("Speed: 0");
		$("#damage").text("Damage: 0");
		$("#luck").text("Luck: 0");
		$("#accuracy").text("Accuracy: 0");


		$("#monster_selector").val("");
		$("#monster_name").text("");
	}
//});