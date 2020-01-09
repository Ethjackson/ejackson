var orderforcomp=[];
var orderforplayer=[];
var score= 0;

function btnstart_Click(){
    orderforcomp = [];
	document.getElementById("startButton").disabled = true;
	document.getElementById("buttonone").disabled = false;
	document.getElementById("buttontwo").disabled = false;
	document.getElementById("buttonthree").disabled = false;
	document.getElementById("buttonfour").disabled = false;
	document.getElementById("buttonfive").disabled = false;
	document.getElementById("buttonsix").disabled = false;
	sequencenext();
}
//Generates a random number and pushes it to the array.
function sequencenext() {
 orderforcomp.push(Math.floor(Math.random()*6));
 shownextseq(orderforcomp[orderforcomp.length - 1]);
 orderforplayer=[];
};
//Displays the colour and sound of each light
function shownextseq(element) {
    switch (element){
        case 0:              
            var audio1 = document.getElementById("soundbtn1");
            audio1.play();
			
			$("#buttonone").addClass("activated");
              setTimeout(function(){
                  $("#buttonone").removeClass("activated");
              },750)
              break;
        case 1:
            var audio2 = document.getElementById("soundbtn2");
            audio2.play();
			
			$("#buttontwo").addClass("activated");
              setTimeout(function () {
                  $("#buttontwo").removeClass("activated");
              }, 750)
            break;
        case 2:              
            var audio3 = document.getElementById("soundbtn3");
            audio3.play();
			
			$("#buttonthree").addClass("activated");
              setTimeout(function () {
                $("#buttonthree").removeClass("activated");
              }, 750)
            break;
        case 3:            
            var audio4 = document.getElementById("soundbtn4");
            audio4.play();
			
			$("#buttonfour").addClass("activated");
              setTimeout(function () {
                  $("#buttonfour").removeClass("activated");
              }, 750)
            break;
        case 4:            
            var audio5 = document.getElementById("soundbtn5");
            audio5.play();
			
			$("#buttonfive").addClass("activated");
            setTimeout(function () {
                $("#buttonfive").removeClass("activated");
            }, 750)
            break;
        case 5:           
            var audio6 = document.getElementById("soundbtn6");
            audio6.play();
			
			$("#buttonsix").addClass("activated");
            setTimeout(function () {
                $("#buttonsix").removeClass("activated");
            }, 750)
            break;
    }
 };
//Pushes user response in to a new array.
$(".btn").click(function(e){
        var clicktrack= $(this).attr("id");
        switch(clicktrack){
            case "buttonone":
                orderforplayer.push(0);
                shownextseq(0);
                break;
            case "buttontwo":
                orderforplayer.push(1);
                shownextseq(1);
                break;   
            case "buttonthree":
                orderforplayer.push(2);
                shownextseq(2);
                break;
            case "buttonfour":
                orderforplayer.push(3);
                shownextseq(3);
                break;
            case "buttonfive":
                orderforplayer.push(4);
                shownextseq(4);
                break;
            case "buttonsix":
                orderforplayer.push(5);
                shownextseq(5);
                break;
            }
        compareplaycomp(orderforplayer.length-1);
    });
	
	function increaseScore() {
    score++;
    $("#score").text(`Score so far: ${score} Keep Going!`);    
};
	
//Checking sequence matches so far
function compareplaycomp(arrindex) {
    if(orderforplayer[arrindex] === orderforcomp[arrindex]){
      if(orderforcomp.length === orderforplayer.length) {
          increaseScore()
           setTimeout(function () {
            sequencenext();
           }, 2000);
        }
    } else {
      gamelose();
    }
}
function gamelose(){
	$("h1").text("You Lose!");
    var audiolost = document.getElementById("soundbtngameover");
    audiolost.play();
		document.getElementById("startButton").disabled = false;
		document.getElementById("buttonone").disabled = true;
		document.getElementById("buttontwo").disabled = true;
		document.getElementById("buttonthree").disabled = true;
		document.getElementById("buttonfour").disabled = true;
		document.getElementById("buttonfive").disabled = true;
		document.getElementById("buttonsix").disabled = true;    
	if(score <= 5){
		$("#score").text("You scored: " + score + " Better luck next time!");
	}
	if(score > 5){
		$("#score").text("You scored: " + score + " You did great!");
	}
    score = 0;
    orderforcomp = [];
}

var lightState;
function getLightURI(element)
{
    var IP = "http://192.168.0.50/api/";
    var username = "stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz";
    var lights = "/lights/";
    var URI = IP + username + lights;
    return URI + element.attr("id")+"/";
}
function togglelight(element)
{
    var getState = $.getJSON(getLightURI(element), function (data)
    {
        var state = data["state"]["on"];
        if (state)
        {
            state = false;
        }
        else
        {
            state = true;
        }

        lightState = {"on" : state};

        $.ajax({
            url: getLightURI(element) + "state/",
            type: "PUT",
            data: JSON.stringify(lightState)
        })
    });
}
//Making functions to turn on the hue lights
$(document).ready(function()
{
    flashblue();
    flashred();
    flashyellow();
    flashgreen();
    flashsecondary();
    flashlight();
});
function flashblue() {
    $('#buttonone').click(function () {
        togglelight($(this));
        $.ajax({
            url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/1/state/",
            type: "PUT",
            data: JSON.stringify({"on":true,"bri":254,"hue":46920}),			
        });
		setTimeout(function () {
                $.ajax({
					url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/1/state/",
					type: "PUT",
					data: JSON.stringify({"on":false,}),
					});
            }, 750)
    })
}

function flashred() {
    $('#buttontwo').click(function () {
        togglelight($(this));
        $.ajax({
            url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/2/state/",
            type: "PUT",
            data: JSON.stringify({"on":true,"bri":254,"hue":65535}),
        });
		setTimeout(function () {
                $.ajax({
					url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/2/state/",
					type: "PUT",
					data: JSON.stringify({"on":false,}),
					});
            }, 750)
    })
}

function flashyellow() {
    $('#buttonthree').click(function () {
        togglelight($(this));
        $.ajax({
            url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/3/state/",
            type: "PUT",
            data: JSON.stringify({"on":true,"bri":254,"hue":9999}),
        });
		setTimeout(function () {
                $.ajax({
					url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/3/state/",
					type: "PUT",
					data: JSON.stringify({"on":false,}),
					});
            }, 750)
    })
}

function flashgreen() {
    $('#buttonfour').click(function () {
        togglelight($(this));
        $.ajax({
            url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/4/state/",
            type: "PUT",
            data: JSON.stringify({"on":true,"bri":254,"hue":25750}),
        });
		setTimeout(function () {
                $.ajax({
					url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/4/state/",
					type: "PUT",
					data: JSON.stringify({"on":false,}),
					});
            }, 750)
    })
}

function flashsecondary() {
    $('#buttonfive').click(function () {
        togglelight($(this));
        $.ajax({
            url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/5/state/",
            type: "PUT",
            data: JSON.stringify({"on":true,"bri":254,"hue":12299}),
        });
		setTimeout(function () {
                $.ajax({
					url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/5/state/",
					type: "PUT",
					data: JSON.stringify({"on":false,}),
					});
            }, 750)
    })
}

function flashlight() {
    $('#buttonsix').click(function () {
        togglelight($(this));
        $.ajax({
            url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/6/state/",
            type: "PUT",
            data: JSON.stringify({"on":true,"bri":254,"hue":33333}),
        });
		setTimeout(function () {
                $.ajax({
					url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/6/state/",
					type: "PUT",
					data: JSON.stringify({"on":false,}),
					});
            }, 750)
    })
}
