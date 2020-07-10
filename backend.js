//HTTP request for JSON data
function httpGet(url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

//global variables

//to keep track of new data
prevHash = "";
oldTime = "N/A";
timeArr = []

//HTML info for creating the table
header = '<table style="width:100%"> <tr> <th> Block Height </th> <th> Date </th> <th> Time </th> <th> Elapsed Time </th> <th> Last Block Hash </th></tr>';
info = "";
footer = "</table>";

//URL for API request
url = "https://api.blockcypher.com/v1/eth/main";


//called from HTML
function main(){
    //gets JSON info
    var jsonObj=JSON.parse(httpGet(url));

    //extracts date and time from JSON
    var date = jsonObj.time.substring(0,10);
    var time = jsonObj.time.substring(11,19);
    //cannot calculate time elapsed since first block
    if (oldTime == "N/A"){
        var timeElapsed = "N/A";
    } else {
        //calculates time elapsed from 2 times
        var hour = parseInt(time.substring(0,2)) - parseInt(oldTime.substring(0,2));
        var minute = parseInt(time.substring(3,5)) - parseInt(oldTime.substring(3,5));
        var sec = parseInt(time.substring(6,8)) - parseInt(oldTime.substring(6,8));
        console.log(hour + ":" + minute + ":" + sec);
        if (hour != 0){
            var timeElapsed = (hour * 3600) + (minute * 60) + sec;
            timeArr.push(timeElapsed);
        } else if (minute != 0){
            var timeElapsed = (minute * 60) + sec;
            timeArr.push(timeElapsed);
        } else if (sec != 0){
            var timeElapsed = sec;
            timeArr.push(timeElapsed);
        }
    }

    //extracts hash from JSON
    var thisHash = jsonObj.hash;

    //if the same entry is returned from API, do nothing (no new block)
    if (prevHash == thisHash){
        return;
    }
    //update globals
    prevHash = thisHash;
    oldTime = time;

    //table info to be sent to HTML
    info = "<tr> <td>" + jsonObj.height + "</td> <td>" + date + "</td> <td>" + time + "</td> <td>" + timeElapsed + "</td> <td>"+ thisHash + "</td> </tr>" + info;

    //calculate hash rate
    var hashRate = 0;
    for (var i = 0; i < timeArr.length; i++){
        hashRate += timeArr[i];
    }
    hashRate /= timeArr.length;

    //send info to HTML
    document.getElementById("hashRate").innerHTML = "The current hash rate is: " + Math.round(hashRate * 100) / 100 + " seconds/block";
    document.getElementById("info").innerHTML = header + info + footer;

}
main();






