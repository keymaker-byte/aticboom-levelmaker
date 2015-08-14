/*
 * Copyright (C) 2015 Juan Francisco Rodríguez
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */

function Level() {
    this.floorSize = 4;
    this.bubbleNumber = 1;
    this.name = "";
    this.image = 1;
    this.world = 7;
    this.time = 1;
    this.floors = [];
    this.stairs = [];
    this.holes = [];
    this.walls = [];
    this.stars = [new Star(), new Star(), new Star()];
    this.keys = [];
    this.fans = [];
    this.fancies = [];
    this.extraBubbles = [];
    this.extraRopes = [];
    this.buttons = [];
    this.exit = new Exit();
    this.player = new Player();
}

function Floor() {
    this.image = 1;
    this.index = 0;
    this.resleft = 1;
    this.resright = 1;
    this.type = 0;
    this.dark = 0;
}

function Stair() {
    this.position = new Position();
    this.type = 0;
    this.index = 0;
}

function Hole() {
    this.position = new Position();
}

function Wall() {
    this.position = new Position();
}

function Star() {
    this.position = new Position();
}

function Key() {
    this.position = new Position();
    this.floorIndex = null;
}

function Fan() {
    this.position = new Position();
}

function Exit() {
    this.position = new Position();
    this.type = 1;
}

function Player() {
    this.position = new Position();
    this.speed = 0.12
}

function Fancy() {
    this.position = new Position();
    this.image = 1;
}

function Button() {
    this.position = new Position();
    this.stairIndex = 0;
}

function ExtraBubble() {
    this.position = new Position();
}

function ExtraRope() {
    this.position = new Position();
}

function Position() {
    this.x = 0;
    this.y = 0;
}

function LevelImage() {
    this.floors = [];
    this.stairs = [];
    this.holes = [];
    this.walls = [];
    this.stars = [];
    this.keys = [];
    this.fans = [];
    this.fancies = [];
    this.extraBubbles = [];
    this.extraRopes = [];
    this.buttons = [];
    this.player = $("#player_img");
    this.level = null;
    this.refresh = function () {
	//player
	this.player.css("left", this.level.player.position.x * 35 + "px");
	this.player.css("top", ((this.level.floorSize - (this.level.player.position.y + 1)) * 224 + 83) + "px");
	//floors
	var i = 0;
	while (i < this.floors.length) {
	    if (i == this.floors.length - 1) {
		this.floors[i].attr("src", "assets/floor5.png")
		$("#floor_imageForm_" + i).attr("disabled", "disabled");
		level.floors[i].image = 5;
	    } else {
		if (level.floors[i].image == 5) {
		    level.floors[i].image = 4;
		}
		this.floors[i].attr("src", "assets/floor" + this.level.floors[i].image + ".png")
		$("#floor_imageForm_" + i).removeAttr("disabled");
	    }
	    this.floors[i].css("top", ((this.level.floorSize - (i + 1)) * 224) + "px");
	    $("#floor_dark_" + i).remove();
	    if (this.level.floors[i].dark == 1) {
		var floor_dark_image = $("<img src=\"assets/dark.png\" id=\"floor_dark_" + i + "\" class=\"floor_state\" />");
		floor_dark_image.css("top", ((this.level.floors.length - (i + 1)) * 224) + "px");
		$("#screen").append(floor_dark_image);
	    }
	    $("#floor_fire_" + i).remove();
	    if (this.level.floors[i].type == 1) {
		var floor_fire_image = $("<img src=\"assets/fire.png\" id=\"floor_fire_" + i + "\" class=\"floor_state\" />");
		floor_fire_image.css("top", ((this.level.floors.length - (i + 1)) * 224) + "px");
		$("#screen").append(floor_fire_image);
	    }
	    $("#floor_wind_" + i).remove();
	    if (this.level.floors[i].resleft != 1) {
		var floor_wind_image;
		if (this.level.floors[i].resleft > 1) {
		    floor_wind_image = $("<img src=\"assets/wind_right.png\" id=\"floor_wind_" + i + "\" class=\"floor_state\" />");
		} else {
		    floor_wind_image = $("<img src=\"assets/wind_left.png\" id=\"floor_wind_" + i + "\" class=\"floor_state\" />");
		}
		floor_wind_image.css("top", ((this.level.floors.length - (i + 1)) * 224 + 50) + "px");
		floor_wind_image.css("left", "290px");
		$("#screen").append(floor_wind_image);
	    }
	    i++;
	}
	//stars
	i = 0;
	while (i < this.level.stars.length) {
	    $('#star_img_' + i).css("left", this.level.stars[i].position.x * 35 - 10 + "px");
	    $('#star_img_' + i).css("top", ((this.level.floorSize - (this.level.stars[i].position.y + 1)) * 224 + 138) + "px");
	    i++;
	}
	//stairs
	i = 0;
	if (this.level.stairs) {
	    while (i < this.level.stairs.length) {
		$('#stair_img_' + i).css("left", this.level.stairs[i].position.x * 35 - 10 + "px");
		if (this.level.stairs[i].type == 0) {
		    $('#stair_img_' + i).css("top", ((this.level.floorSize - (this.level.stairs[i].position.y + 1)) * 224 - 105) + "px");
		} else {
		    $('#stair_img_' + i).css("top", ((this.level.floorSize - (this.level.stairs[i].position.y + 1)) * 224 - 329) + "px");
		}
		i++;
	    }
	}
	//holes
	i = 0;
	if (this.level.holes) {
	    while (i < this.level.holes.length) {
		$('#hole_img_' + i).css("left", this.level.holes[i].position.x * 35 - 28 + "px");
		$('#hole_img_' + i).css("top", ((this.level.floorSize - (this.level.holes[i].position.y + 1)) * 224 + 175) + "px");
		i++;
	    }
	}
	//walls
	i = 0;
	if (this.level.walls) {
	    while (i < this.level.walls.length) {
		$('#wall_img_' + i).css("left", this.level.walls[i].position.x * 35 + "px");
		$('#wall_img_' + i).css("top", ((this.level.floorSize - (this.level.walls[i].position.y + 1)) * 224) + "px");
		i++;
	    }
	}
	//fans
	i = 0;
	if (this.level.fans) {
	    while (i < this.level.fans.length) {
		$('#fan_img_' + i).css("left", this.level.fans[i].position.x * 35 - 25 + "px");
		$('#fan_img_' + i).css("top", ((this.level.floorSize - (this.level.fans[i].position.y + 1)) * 224) + "px");
		i++;
	    }
	}
	//keys
	i = 0;
	if (this.level.keys) {
	    while (i < this.level.keys.length) {
		$('#key_img_' + i).css("left", this.level.keys[i].position.x * 35 + "px");
		$('#key_img_' + i).css("top", ((this.level.floorSize - (this.level.keys[i].position.y + 1)) * 224 + 130) + "px");
		i++;
	    }
	}
	//fancys
	i = 0;
	if (this.level.fancies) {
	    while (i < this.level.fancies.length) {
		$('#fancy_img_' + i).css("left", this.level.fancies[i].position.x * 35 - 65 + "px");
		$('#fancy_img_' + i).css("top", ((this.level.floorSize - (this.level.fancies[i].position.y + 1)) * 224 + 140) + "px");
		i++;
	    }
	}
	//extra bubbles
	i = 0;
	if (this.level.extraBubbles) {
	    while (i < this.level.extraBubbles.length) {
		$('#extraBubble_img_' + i).css("left", this.level.extraBubbles[i].position.x * 35 - 10 + "px");
		$('#extraBubble_img_' + i).css("top", ((this.level.floorSize - (this.level.extraBubbles[i].position.y + 1)) * 224 + 150) + "px");
		i++;
	    }
	}
	//extra ropes
	i = 0;
	if (this.level.extraRopes) {
	    while (i < this.level.extraRopes.length) {
		$('#extraRope_img_' + i).css("left", this.level.extraRopes[i].position.x * 35 - 10 + "px");
		$('#extraRope_img_' + i).css("top", ((this.level.floorSize - (this.level.extraRopes[i].position.y + 1)) * 224 + 150) + "px");
		i++;
	    }
	}
	//buttons
	i = 0;
	if (this.level.buttons) {
	    while (i < this.level.buttons.length) {
		$('#button_img_' + i).css("left", this.level.buttons[i].position.x * 35 + "px");
		$('#button_img_' + i).css("top", ((this.level.floorSize - (this.level.buttons[i].position.y + 1)) * 224 + 170) + "px");
		i++;
	    }
	}
	//json
	$("#json_text").val(JSON.stringify({"level": this.level}));
    };
    this.addFloor = function () {
	var floor_image = $("<img src=\"assets/floor.png\" id=\"floor_image_" + this.floors.length + "\" class=\"floor_image\" />");
	this.floors.push(floor_image);
	$("#screen").append(floor_image);
    };
    this.deleteFloor = function () {
	var floor_image = this.floors.pop();
	floor_image.remove();
	$("#floor_wind_" + this.floors.length).remove();
	$("#floor_fire_" + this.floors.length).remove();
	$("#floor_dark_" + this.floors.length).remove();
    };
    this.addStair = function () {
	var index = this.level.stairs.length;
	var stair_image = $("<img src=\"assets/stair.png\" id=\"stair_img_" + (index - 1) + "\" class=\"game_element\" />");
	this.stairs.push(stair_image);
	$("#screen").append(stair_image);
    };
    this.deleteStair = function (i) {
	this.stairs.pop().remove();
    };
    this.addHole = function () {
	var index = this.level.holes.length;
	var hole_image = $("<img src=\"assets/hole.png\" id=\"hole_img_" + (index - 1) + "\" class=\"game_element\" />");
	this.holes.push(hole_image);
	$("#screen").append(hole_image);
    };
    this.deleteHole = function (i) {
	this.holes.pop().remove();
    };
    this.addWall = function () {
	var index = this.level.walls.length;
	var wall_image = $("<img src=\"assets/wall.png\" id=\"wall_img_" + (index - 1) + "\" class=\"game_element\" />");
	this.walls.push(wall_image);
	$("#screen").append(wall_image);
    };
    this.deleteWall = function (i) {
	this.walls.pop().remove();
    };
    this.addKey = function () {
	var index = this.level.keys.length;
	var key_image = $("<img src=\"assets/key.png\" id=\"key_img_" + (index - 1) + "\" class=\"game_element\" />");
	this.keys.push(key_image);
	$("#screen").append(key_image);
    };
    this.deleteKey = function (i) {
	this.keys.pop().remove();
    };
    this.addFan = function () {
	var index = this.level.fans.length;
	var fan_image = $("<img src=\"assets/fan.png\" id=\"fan_img_" + (index - 1) + "\" class=\"game_element\" />");
	this.fans.push(fan_image);
	$("#screen").append(fan_image);
    };
    this.deleteFan = function (i) {
	this.fans.pop().remove();
    };
    this.addFancy = function () {
	var index = this.level.fancies.length;
	var fancy_image = $("<img src=\"assets/fancy.png\" id=\"fancy_img_" + (index - 1) + "\" class=\"game_element\" />");
	this.fancies.push(fancy_image);
	$("#screen").append(fancy_image);
    };
    this.deleteFancy = function (i) {
	this.fancies.pop().remove();
    };
    this.addExtraBubble = function () {
	var index = this.level.extraBubbles.length;
	var extraBubble_image = $("<img src=\"assets/extraBubble.png\" id=\"extraBubble_img_" + (index - 1) + "\" class=\"game_element\" />");
	this.extraBubbles.push(extraBubble_image);
	$("#screen").append(extraBubble_image);
    };
    this.deleteExtraBubble = function (i) {
	this.extraBubbles.pop().remove();
    };
    this.addExtraRope = function () {
	var index = this.level.extraRopes.length;
	var extraRope_image = $("<img src=\"assets/extraRope.png\" id=\"extraRope_img_" + (index - 1) + "\" class=\"game_element\" />");
	this.extraRopes.push(extraRope_image);
	$("#screen").append(extraRope_image);
    };
    this.deleteExtraRope = function (i) {
	this.extraRopes.pop().remove();
    };
    this.addButton = function () {
	var index = this.level.buttons.length;
	var button_image = $("<img src=\"assets/button.png\" id=\"button_img_" + (index - 1) + "\" class=\"game_element\" />");
	this.buttons.push(button_image);
	$("#screen").append(button_image);
    };
    this.deleteButton = function (i) {
	this.buttons.pop().remove();
    };
}

$(document).ready(function () {
    level = new Level();
    levelImage = new LevelImage();
    level.exit.position.y = 8;
    levelImage.level = level;
    changeFloorNumber();
    changePlayerPosition();
    levelImage.refresh();
});

function toggleSection(name, element) {
    var span = $(element).find('span');
    if (span.html() == "&gt;") {
	span.html("<");
	$('#' + name + '_list').slideDown();
    } else {
	span.html(">");
	$('#' + name + '_list').slideUp();
    }
}

function changeName() {
    level.name = $("#level_name").val();
    $("#json_text").val(JSON.stringify({"level": level}));
}

function changeWorld() {
    level.world = $("#level_world").val() - 0;
    $("#json_text").val(JSON.stringify({"level": level}));
}

function changeBubbleNumber() {
    level.bubbleNumber = $("#bubble_number").val() - 0;
    $("#json_text").val(JSON.stringify({"level": level}));
}

function changeTime() {
    level.time = $("#time").val() - 0;
    $("#json_text").val(JSON.stringify({"level": level}));
}

function changePlayerPosition() {
    var x = $("#player_x").val();
    var y = $("#player_y").val();
    $("#player_x_value").html(x);
    $("#player_y_value").html(y);
    level.player.position.x = x - 0;
    level.player.position.y = y - 1;
    levelImage.refresh();
}

function changeFloorNumber() {
    var number = $("#floor_number").val();
    $("#floor_number_value").html(number);
    level.floorSize = number - 0;
    while (level.floors.length > number) {
	$("#floor_form_" + (level.floors.length - 1)).remove();
	level.floors.pop();
	levelImage.deleteFloor();
    }
    while (level.floors.length < number) {
	var f = new Floor();
	f.index = level.floors.length;
	level.floors.push(f);
	levelImage.addFloor();
	var floor_form = $("<div id=\"floor_form_" + f.index + "\" class=\"element_form\"></div>");
	floor_form.html($("#floor_form").html());
	floor_form.find('.element_header').html("Piso " + (f.index + 1));
	floor_form.find('input').attr("data-index", f.index);
	floor_form.find('input').each(function (i, element) {
	    $(element).attr("id", "floor" + $(element).attr("data_id") + $(element).attr("data-index"));
	});
	$("#floors_list").append(floor_form);
    }
    $(".floor_affected").attr("max", number);
    $(".floor_affected.noceil").attr("max", number - 1);
    $(".floor_affected").each(function (index, element) {
	$(element).change();
    });
    level.exit.position.x = 0;
    level.exit.position.y = number - 1;
    levelImage.refresh();
}

function setFloorDark(element) {
    var index = $(element).attr("data-index");
    if ($(element).attr("checked") == "checked") {
	level.floors[index].dark = 1;
    } else {
	level.floors[index].dark = 0;
    }
    levelImage.refresh();
}

function setFloorImage(element) {
    var index = $(element).attr("data-index");
    var value = $(element).val();
    level.floors[index].image = value - 0;
    levelImage.refresh();
}

function setFloorFire(element) {
    var index = $(element).attr("data-index") - 0;
    if ($(element).attr("checked") == "checked") {
	level.floors[index].type = 1;
    } else {
	level.floors[index].type = 0;
    }
    levelImage.refresh();
}

function setFloorWind(element) {
    var index = $(element).attr("data-index") - 0;
    var dv = $(element).val();
    level.floors[index].resleft = 1 + (dv - 0);
    level.floors[index].resright = 1 - dv;
    levelImage.refresh();
}

function changeObjectPosition(element) {
    var index = $(element).attr("data-index");
    var object = $(element).attr("data-object");
    var x = $("#" + object + "_x_" + index).val();
    var y = $("#" + object + "_y_" + index).val();
    console.log(object + " " + index + " " + x + "-" + y);
    $("#" + object + "_x_value_" + index).html(x);
    $("#" + object + "_y_value_" + index).html(y);
    if (object == "star") {
	level.stars[index].position.x = x - 0;
	level.stars[index].position.y = y - 1;
    }
    if (object == "stair") {
	level.stairs[index].position.x = x - 0;
	level.stairs[index].position.y = y - 1;
	var isUp = $("#" + object + "_type_" + index).attr("checked");
	if (isUp == "checked") {
	    level.stairs[index].type = 1;
	} else {
	    level.stairs[index].type = 0;
	}
    }
    if (object == "hole") {
	level.holes[index].position.x = x - 0;
	level.holes[index].position.y = y - 1;
    }
    if (object == "wall") {
	level.walls[index].position.x = x - 0;
	level.walls[index].position.y = y - 1;
    }
    if (object == "fan") {
	level.fans[index].position.x = x - 0;
	level.fans[index].position.y = y - 1;
    }
    if (object == "key") {
	level.keys[index].position.x = x - 0;
	level.keys[index].position.y = y - 1;
	var floor = $("#" + object + "_floorIndex_" + index).val();
	$("#" + object + "_floorIndex_value_" + index).html(floor);
	level.keys[index].floorIndex = floor - 1;
    }
    if (object == "fancy") {
	level.fancies[index].position.x = x - 0;
	level.fancies[index].position.y = y - 1;
	var image = $("#" + object + "_image_" + index).val();
	$("#" + object + "_image_value_" + index).html(image);
	level.fancies[index].image = image - 0;
    }
    if (object == "extraBubble") {
	level.extraBubbles[index].position.x = x - 0;
	level.extraBubbles[index].position.y = y - 1;
    }
    if (object == "extraRope") {
	level.extraRopes[index].position.x = x - 0;
	level.extraRopes[index].position.y = y - 1;
    }
    if (object == "button") {
	level.buttons[index].position.x = x - 0;
	level.buttons[index].position.y = y - 1;
	var stair = $("#" + object + "_stairIndex_" + index).val();
	$("#" + object + "_stairIndex_value_" + index).html(stair);
	level.buttons[index].stairIndex = stair - 1;
    }
    levelImage.refresh();
}

function addStair() {
    if (!level.stairs) {
	level.stairs = [];
    }
    if (!$("#stairs_list").is(":visible")) {
	$("#stairs_list").slideDown();
	$("#stairs_header h4 span").html("<");
    }
    var index = level.stairs.length;
    var stair_form = $("<div class=\"element_form\" id=\"stair_form_" + index + "\"></div>");
    stair_form.html($('#stair_form').html());
    stair_form.find('input').attr("data-index", index).attr("data-object", "stair").each(function (i, element) {
	$(element).attr("id", "stair" + $(element).attr("data_id") + index);
    });
    stair_form.find('.element_header').html("Escalera " + (index + 1 - 0));
    stair_form.find('label span').each(function (i, element) {
	$(element).attr("id", "stair" + $(element).attr("data_id") + index);
    });
    $("#stairs_list").append(stair_form);
    var stair = new Stair();
    stair.index = level.stairs.length;
    level.stairs.push(stair);
    levelImage.addStair();
    $("#stair_y_" + index).change();
    $(".stair_affected").attr("max", level.stairs.length);
    //levelImage.refresh();

}

function removeStair() {
    if (!$("#stairs_list").is(":visible")) {
	$("#stairs_list").slideDown();
	$("#stairs_header h4 span").html("<");
    }
    levelImage.deleteStair();
    level.stairs.pop();
    levelImage.refresh();
    $("#stair_form_" + level.stairs.length).remove();
    $(".stair_affected").attr("max", level.stairs.length);
    if (level.stairs.length == 0) {
	if (level.buttons) {
	    while (level.buttons.length > 0) {
		removeButton();
	    }
	}
    }
}

function addHole() {
    if (!level.holes) {
	level.holes = [];
    }
    if (!$("#holes_list").is(":visible")) {
	$("#holes_list").slideDown();
	$("#holes_header h4 span").html("<");
    }
    var index = level.holes.length;
    var hole_form = $("<div class=\"element_form\" id=\"hole_form_" + index + "\"></div>");
    hole_form.html($('#nobottom_form').html());
    hole_form.find('input').attr("data-index", index).attr("data-object", "hole").each(function (i, element) {
	$(element).attr("id", "hole" + $(element).attr("data_id") + index);
    });
    hole_form.find('.element_header').html("Hoyo " + (index + 1 - 0));
    hole_form.find('label span').each(function (i, element) {
	$(element).attr("id", "hole" + $(element).attr("data_id") + index);
    });
    $("#holes_list").append(hole_form);
    level.holes.push(new Hole());
    levelImage.addHole();
    $("#hole_y_" + index).change();
    //levelImage.refresh();

}

function removeHole() {
    if (!$("#holes_list").is(":visible")) {
	$("#holes_list").slideDown();
	$("#holes_header h4 span").html("<");
    }
    levelImage.deleteHole();
    level.holes.pop();
    levelImage.refresh();
    $("#hole_form_" + level.holes.length).remove();
}

function addWall() {
    if (!level.walls) {
	level.walls = [];
    }
    if (!$("#walls_list").is(":visible")) {
	$("#walls_list").slideDown();
	$("#walls_header h4 span").html("<");
    }
    var index = level.walls.length;
    var wall_form = $("<div class=\"element_form\" id=\"wall_form_" + index + "\"></div>");
    wall_form.html($('#noceil_form').html());
    wall_form.find('input').attr("data-index", index).attr("data-object", "wall").each(function (i, element) {
	$(element).attr("id", "wall" + $(element).attr("data_id") + index);
    });
    wall_form.find('.element_header').html("Muro " + (index + 1 - 0));
    wall_form.find('label span').each(function (i, element) {
	$(element).attr("id", "wall" + $(element).attr("data_id") + index);
    });
    $("#walls_list").append(wall_form);
    level.walls.push(new Wall());
    levelImage.addWall();
    $("#wall_y_" + index).change();
    //levelImage.refresh();

}

function removeWall() {
    if (!$("#walls_list").is(":visible")) {
	$("#walls_list").slideDown();
	$("#walls_header h4 span").html("<");
    }
    levelImage.deleteWall();
    level.walls.pop();
    levelImage.refresh();
    $("#wall_form_" + level.walls.length).remove();
}

function addFan() {
    if (!level.fans) {
	level.fans = [];
    }
    if (!$("#fans_list").is(":visible")) {
	$("#fans_list").slideDown();
	$("#fans_header h4 span").html("<");
    }
    var index = level.fans.length;
    var fan_form = $("<div class=\"element_form\" id=\"fan_form_" + index + "\"></div>");
    fan_form.html($('#noceil_form').html());
    fan_form.find('input').attr("data-index", index).attr("data-object", "fan").each(function (i, element) {
	$(element).attr("id", "fan" + $(element).attr("data_id") + index);
    });
    fan_form.find('.element_header').html("Vapor " + (index + 1 - 0));
    fan_form.find('label span').each(function (i, element) {
	$(element).attr("id", "fan" + $(element).attr("data_id") + index);
    });
    $("#fans_list").append(fan_form);
    level.fans.push(new Fan());
    levelImage.addFan();
    $("#fan_y_" + index).change();
    //levelImage.refresh();

}

function removeFan() {
    if (!$("#fans_list").is(":visible")) {
	$("#fans_list").slideDown();
	$("#fans_header h4 span").html("<");
    }
    levelImage.deleteFan();
    level.fans.pop();
    levelImage.refresh();
    $("#fan_form_" + level.fans.length).remove();
}

function addKey() {
    if (!level.keys) {
	level.keys = [];
    }
    if (!$("#keys_list").is(":visible")) {
	$("#keys_list").slideDown();
	$("#keys_header h4 span").html("<");
    }
    var index = level.keys.length;
    var key_form = $("<div class=\"element_form\" id=\"key_form_" + index + "\"></div>");
    key_form.html($('#water_form').html());
    key_form.find('input').attr("data-index", index).attr("data-object", "key").each(function (i, element) {
	$(element).attr("id", "key" + $(element).attr("data_id") + index);
    });
    key_form.find('.element_header').html("Agua " + (index + 1 - 0));
    key_form.find('label span').each(function (i, element) {
	$(element).attr("id", "key" + $(element).attr("data_id") + index);
    });
    $("#keys_list").append(key_form);
    level.keys.push(new Key());
    levelImage.addKey();
    $("#key_y_" + index).change();
    //levelImage.refresh();

}

function removeKey() {
    if (!$("#keys_list").is(":visible")) {
	$("#keys_list").slideDown();
	$("#keys_header h4 span").html("<");
    }
    levelImage.deleteKey();
    level.keys.pop();
    levelImage.refresh();
    $("#key_form_" + level.keys.length).remove();
}


function addFancy() {
    if (!level.fancies) {
	level.fancies = [];
    }
    if (!$("#fancys_list").is(":visible")) {
	$("#fancys_list").slideDown();
	$("#fancys_header h4 span").html("<");
    }
    var index = level.fancies.length;
    var fancy_form = $("<div class=\"element_form\" id=\"fancy_form_" + index + "\"></div>");
    fancy_form.html($('#fancy_form').html());
    fancy_form.find('input').attr("data-index", index).attr("data-object", "fancy").each(function (i, element) {
	$(element).attr("id", "fancy" + $(element).attr("data_id") + index);
    });
    fancy_form.find('.element_header').html("Hint " + (index + 1 - 0));
    fancy_form.find('label span').each(function (i, element) {
	$(element).attr("id", "fancy" + $(element).attr("data_id") + index);
    });
    $("#fancys_list").append(fancy_form);
    level.fancies.push(new Fancy());
    levelImage.addFancy();
    $("#fancy_y_" + index).change();
    //levelImage.refresh();

}

function removeFancy() {
    if (!$("#fancys_list").is(":visible")) {
	$("#fancys_list").slideDown();
	$("#fancys_header h4 span").html("<");
    }
    levelImage.deleteFancy();
    level.fancies.pop();
    levelImage.refresh();
    $("#fancy_form_" + level.fancies.length).remove();
}

function addExtraRope() {
    if (!level.extraRopes) {
	level.extraRopes = [];
    }
    if (!$("#extraRopes_list").is(":visible")) {
	$("#extraRopes_list").slideDown();
	$("#extraRopes_header h4 span").html("<");
    }
    var index = level.extraRopes.length;
    var extraRope_form = $("<div class=\"element_form\" id=\"extraRope_form_" + index + "\"></div>");
    extraRope_form.html($('#position_form').html());
    extraRope_form.find('input').attr("data-index", index).attr("data-object", "extraRope").each(function (i, element) {
	$(element).attr("id", "extraRope" + $(element).attr("data_id") + index);
    });
    extraRope_form.find('.element_header').html("Extra Rope " + (index + 1 - 0));
    extraRope_form.find('label span').each(function (i, element) {
	$(element).attr("id", "extraRope" + $(element).attr("data_id") + index);
    });
    $("#extraRopes_list").append(extraRope_form);
    level.extraRopes.push(new ExtraRope());
    levelImage.addExtraRope();
    $("#extraRope_y_" + index).change();
    //levelImage.refresh();

}

function removeExtraRope() {
    if (!$("#extraRopes_list").is(":visible")) {
	$("#extraRopes_list").slideDown();
	$("#extraRopes_header h4 span").html("<");
    }
    levelImage.deleteExtraRope();
    level.extraRopes.pop();
    levelImage.refresh();
    $("#extraRope_form_" + level.fancies.length).remove();
}


function addExtraBubble() {
    if (!level.extraBubbles) {
	level.extraBubbles = [];
    }
    if (!$("#extraBubbles_list").is(":visible")) {
	$("#extraBubbles_list").slideDown();
	$("#extraBubbles_header h4 span").html("<");
    }
    var index = level.extraBubbles.length;
    var extraBubble_form = $("<div class=\"element_form\" id=\"extraBubble_form_" + index + "\"></div>");
    extraBubble_form.html($('#position_form').html());
    extraBubble_form.find('input').attr("data-index", index).attr("data-object", "extraBubble").each(function (i, element) {
	$(element).attr("id", "extraBubble" + $(element).attr("data_id") + index);
    });
    extraBubble_form.find('.element_header').html("Extra Bubble " + (index + 1 - 0));
    extraBubble_form.find('label span').each(function (i, element) {
	$(element).attr("id", "extraBubble" + $(element).attr("data_id") + index);
    });
    $("#extraBubbles_list").append(extraBubble_form);
    level.extraBubbles.push(new ExtraBubble());
    levelImage.addExtraBubble();
    $("#extraBubble_y_" + index).change();
    //levelImage.refresh();

}

function removeExtraBubble() {
    if (!$("#extraBubbles_list").is(":visible")) {
	$("#extraBubbles_list").slideDown();
	$("#extraBubbles_header h4 span").html("<");
    }
    levelImage.deleteExtraBubble();
    level.extraBubbles.pop();
    levelImage.refresh();
    $("#extraBubble_form_" + level.fancies.length).remove();
}

function addButton() {
    if (!level.buttons) {
	level.buttons = [];
    }
    if (level.stairs.length == 0) {
	alert("No hay escaleras disponibles");
	return;
    }
    if (!$("#buttons_list").is(":visible")) {
	$("#buttons_list").slideDown();
	$("#buttons_header h4 span").html("<");
    }
    var index = level.buttons.length;
    var button_form = $("<div class=\"element_form button_form\" id=\"button_form_" + index + "\"></div>");
    button_form.html($('#button_form').html());
    button_form.find('input').attr("data-index", index).attr("data-object", "button").each(function (i, element) {
	$(element).attr("id", "button" + $(element).attr("data_id") + index);
    });
    button_form.find('.element_header').html("Bot&oacute;n " + (index + 1 - 0));
    button_form.find('label span').each(function (i, element) {
	$(element).attr("id", "button" + $(element).attr("data_id") + index);
    });
    $("#buttons_list").append(button_form);
    level.buttons.push(new Button());
    levelImage.addButton();
    $("#button_y_" + index).change();
    //levelImage.refresh();

}

function removeButton() {
    if (!$("#buttons_list").is(":visible")) {
	$("#buttons_list").slideDown();
	$("#buttons_header h4 span").html("<");
    }
    levelImage.deleteButton();
    level.buttons.pop();
    levelImage.refresh();
    $("#button_form_" + level.fancies.length).remove();
}

function importJson() {
    var jsonText = $("#json_text").val().replace(/[\n\r\t]/g, "").replace(/\s\s/g, "");
    $("#json_text").val(jsonText);
//    try{
    while (levelImage.stairs.length > 0) {
	removeStair();
    }
    while (levelImage.holes.length > 0) {
	removeHole();
    }
    while (levelImage.walls.length > 0) {
	removeWall();
    }
    while (levelImage.keys.length > 0) {
	removeKey();
    }
    while (levelImage.fans.length > 0) {
	removeFan();
    }
    while (levelImage.fancies.length > 0) {
	removeFancy();
    }
    //And into the Bastion
    var nlevel = $.parseJSON(jsonText).level;
    console.log(nlevel);
//        level = new Level();
//        levelImage.level = level;
    //level data
    $('#level_name').val(nlevel.name);
    $('#level_world').val(nlevel.world);
    $('#floor_number').val(nlevel.floorSize);
    $('#bubble_number').val(nlevel.bubbleNumber);
    $('#time').val(nlevel.time);
    //player
    $('#player_x').val(nlevel.player.position.x - 1);
    $('#player_y').val(nlevel.player.position.y + 1 - 0);
    //floors
    changeFloorNumber();
    //doblones
    var i = 0;
    while (i < nlevel.stars.length) {
	$('#star_x_' + i).val(nlevel.stars[i].position.x - 0);
	$('#star_y_' + i).val(nlevel.stars[i].position.y + (1 - 0));
	$('#star_y_' + i).change();
	i++;
    }
    //stairs
    i = 0;
    if (nlevel.stairs) {
	while (i < nlevel.stairs.length) {
	    addStair();
	    $('#stair_x_' + i).val(nlevel.stairs[i].position.x - 0);
	    $('#stair_y_' + i).val(nlevel.stairs[i].position.y + (1 - 0));
	    if (nlevel.stairs[i].type == 1) {
		$('#stair_type_' + i).attr("checked", "checked");
	    }
	    $('#stair_y_' + i).change();
	    i++;
	}
    }
    //holes
    i = 0;
    if (nlevel.holes) {
	while (i < nlevel.holes.length) {
	    addHole();
	    $('#hole_x_' + i).val(nlevel.holes[i].position.x - 0);
	    $('#hole_y_' + i).val(nlevel.holes[i].position.y + (1 - 0));
	    $('#hole_y_' + i).change();
	    i++;
	}
    }
    //walls
    i = 0;
    if (nlevel.walls) {
	while (i < nlevel.walls.length) {
	    addWall();
	    $('#wall_x_' + i).val(nlevel.walls[i].position.x - 0);
	    $('#wall_y_' + i).val(nlevel.walls[i].position.y + (1 - 0));
	    $('#wall_y_' + i).change();
	    i++;
	}
    }
    //key
    i = 0;
    if (nlevel.keys) {
	while (i < nlevel.keys.length) {
	    addKey();
	    $('#key_x_' + i).val(nlevel.keys[i].position.x - 0);
	    $('#key_y_' + i).val(nlevel.keys[i].position.y + (1 - 0));
	    $('#key_floorIndex_' + i).val(nlevel.keys[i].floorIndex + (1 - 0));
	    $('#key_y_' + i).change();
	    i++;
	}
    }
    //fans
    i = 0;
    if (nlevel.fans) {
	while (i < nlevel.fans.length) {
	    addFan();
	    $('#fan_x_' + i).val(nlevel.fans[i].position.x + -0);
	    $('#fan_y_' + i).val(nlevel.fans[i].position.y + (1 - 0));
	    $('#fan_y_' + i).change();
	    i++;
	}
    }
    //fancies
    i = 0;
    if (nlevel.fancies) {
	while (i < nlevel.fancies.length) {
	    addFancy();
	    $('#fancy_x_' + i).val(nlevel.fancies[i].position.x + -0);
	    $('#fancy_y_' + i).val(nlevel.fancies[i].position.y + (1 - 0));
	    $('#fancy_image_' + i).val(nlevel.fancies[i].image);
	    $('#fancy_y_' + i).change();
	    i++;
	}
    }
    //extraBubbles
    i = 0;
    if (nlevel.extraBubbles) {
	while (i < nlevel.extraBubbles.length) {
	    addExtraBubble();
	    $('#extraBubble_x_' + i).val(nlevel.extraBubbles[i].position.x + -0);
	    $('#extraBubble_y_' + i).val(nlevel.extraBubbles[i].position.y + (1 - 0));
	    $('#extraBubble_y_' + i).change();
	    i++;
	}
    }
    //extraRopes
    i = 0;
    if (nlevel.extraRopes) {
	while (i < nlevel.extraRopes.length) {
	    addExtraRope();
	    $('#extraRope_x_' + i).val(nlevel.extraRopes[i].position.x + -0);
	    $('#extraRope_y_' + i).val(nlevel.extraRopes[i].position.y + (1 - 0));
	    $('#extraRope_y_' + i).change();
	    i++;
	}
    }
    //button
    i = 0;
    if (nlevel.buttons) {
	while (i < nlevel.buttons.length) {
	    addButton();
	    $('#button_x_' + i).val(nlevel.buttons[i].position.x - 0);
	    $('#button_y_' + i).val(nlevel.buttons[i].position.y + (1 - 0));
	    $('#button_stairIndex_' + i).val(nlevel.buttons[i].stairIndex + (1 - 0));
	    $('#button_y_' + i).change();
	    i++;
	}
    }
    //floorStats
    i = 0;
    console.log(level);
    while (i < nlevel.floors.length) {
	console.log(nlevel.floors[i]);
	if (nlevel.floors[i].resleft > nlevel.floors[i].resright) {
	    $('#floor_windForm_' + i).val(0.5);
	    $('#floor_windForm_' + i).change();
	} else if (nlevel.floors[i].resleft < nlevel.floors[i].resright) {
	    $('#floor_windForm_' + i).val(-0.5);
	    $('#floor_windForm_' + i).change();
	}
	if (nlevel.floors[i].type == 1) {
	    $('#floor_typeForm_' + i).attr("checked", "checked");
//                $('#floor_typeForm_'+i).click();
	    //$('#floor_typeForm_'+i).click();
	    level.floors[i].type = 1;
	}
	else {
	    level.floors[i].type = 0;
	}
	if (nlevel.floors[i].dark == 1) {
	    $('#floor_darkForm_' + i).attr("checked", "checked");
//                $('#floor_darkForm_'+i).click();
//                $('#floor_darkForm_'+i).click();
	    level.floors[i].dark = 1;
	} else {
	    level.floors[i].dark = 0;
	}
	$('#floor_imageForm_' + i).val(nlevel.floors[i].image);
	level.floors[i].image = nlevel.floors[i].image;
	$('#floor_imageForm_' + i).change();

	i++;
    }
    changePlayerPosition();
    level = nlevel;
    levelImage.level = nlevel;
    //levelImage.refresh();
    $("#floor_number").change();


//    }catch(e){
//        console.log(e);
//        alert("Bad Json"+e.toString())
//    }

}