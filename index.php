<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" href="css/main.css" type="text/css">
		<title>Monster: Encounters</title>
	</head>
	<body>
		<div id="wrapper">
			<header>
				<h1>Monster: Encounters</h1>
				<h2 id="monster_name"></h2>
			</header>
			<div class="stat_block_line">
				<span class="stat_block" id="accuracy">Accuracy: 0</span><span class="stat_block" id="strength">Strength: 0</span><span class="stat_block" id="evasion">Evasion: 0</span>
				<span class="stat_block" id="luck">Luck: 0</span><span class="stat_block" id="speed">Speed: 0</span><span class="stat_block" id="movement">Movement: 0</span>				
			</div>
			<div class="stat_block_line">
				<span class="stat_block" id="toughness">Toughness: 0</span><span class="stat_block" id="damage">Damage: 0</span><span class="stat_block" id="health">Health: 0</span><span class="stat_block" id="ai_cards">AI Cards: 0/0</span><span class="stat_block" id="hit_loc_cards">Hit Location Cards: 0/0</span>
			</div>
			<div id="controls">
				<h2>Controls</h2>
				<input id="monster_selector" list="monster_list" placeholder="Select from the list">
				<datalist id="monster_list">
				  <option value="White Lion Basic"></option>
				  <option value="White Lion Level 1"></option>
				  <option value="White Lion Level 2"></option>
				  <option value="White Lion Level 3"></option>
				  <option value="White Lion Golden Eyes"></option>
				  <option value="Phoenix Level 1"></option>
				  <option value="Phoenix Level 2"></option>
				  <option value="Phoenix Level 3"></option>
				</datalist>

				<br>
				<a class="button" id="setup">Generate Decks</a>
				<a class="button" id="draw_ai">Draw AI</a>
				<a class="button" id="draw_hit_loc">Draw Hit Location</a>
				<a class="button" id="deal_damage">Deal Damage</a>
				<a class="button" id="heal_damage">Heal Damage</a>
				<a class="button" id="reset">Reset Monster</a>
			</div>
			<div class="card_stack_1">
				<h2>AI</h2>
				<div id="ai_card">
				</div>
				<a class="button" id="mood">Setup Mood</a>
			</div>
			<div class="card_stack_2">
				<h2>Hit Location</h2>
				<div id="hit_card">
				</div>
				<a class="button" id="deal_critical">Critical Hit</a>
			</div>
			<div class="hr"><h2>Critical Wounds & Moods</h2></div>
			<div id="Moods_Wounds_Stack">
			</div>

		</div>
		<script   src="https://code.jquery.com/jquery-3.1.0.min.js"   integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s="   crossorigin="anonymous"></script>
		<script src="js/main.js"></script>
	</body>
</html>
