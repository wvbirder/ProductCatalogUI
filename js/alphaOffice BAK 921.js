/* .js for the Node.js Applicaiton.*/

//Holds json for future calls to manipulate data
var holder = null;
var productArray = new Array();
var productIndexArray = new Array();
var popupHTLMArray;
var topFactorVar = 15;
var leftFactorVar = 30;
//var widthVar = "200px";
var popupTopVar = 20;
var indexVar;
//var popupHeightVar = 300;

var popupTwitterContentHeightVar = 490;
var hashtagVar;

$(document).ready(function () {
    // NOTE: set the URL below to match your Application Container's Domain
    var path = location.protocol+'//'+location.hostname+':'+location.port;
    /*Gathers Product information from Node.js JSON endpoint*/
    $.getJSON('js/sample.json', function (data) {
    /*$.getJSON(path+'/products', function (data) {*/
    /*$.getJSON('https://localhost:8090/products', function (data) { */
        try{
            holder =data;
            buildHTML();
        }
        catch(err){
            console.log("Error retrieving the Product data from the JSON Endpoint.")
        }
    });

/*Build HTML from the JSON Feed.*/
    function buildHTML() {
        popupHTLMArray = document.getElementById("popupTable").innerHTML.split("~");
        popupHTLMArray[0] = popupHTLMArray[0].replace(" id=\"popupProductC4R1Spacer\"", "");
        popupHTLMArray[0] = popupHTLMArray[0].replace(" id=\"popupProductContentDiv\"", "");
        popupHTLMArray[1] = popupHTLMArray[1].replace(" id=\"popupTwitterContentTd\"", "");
        popupHTLMArray[1] = popupHTLMArray[1].replace(" id=\"popupProductC1R3Spacer\"", "");
        popupHTLMArray[1] = popupHTLMArray[1].replace(" id=\"popupControlTd\"", "");
        indexVar = 0;
        try {
    //Loop through JSON 
        $.each(holder.rows, function(index, details) { 
            productArray[details.PRODUCT_ID] = {parent_category_id: details.PARENT_CATEGORY_ID, category_id: details.CATEGORY_ID,
                product_name: details.PRODUCT_NAME, product_status: details.PRODUCT_STATUS, list_price: details.LIST_PRICE,
                warranty_period_months: details.WARRANTY_PERIOD_MONTHS, external_url: details.EXTERNAL_URL, hashtag: details.HASHTAG}                                                                              
            productIndexArray[indexVar] = details.PRODUCT_ID;             
            indexVar = indexVar + 1;                   
        });
        var columnNumberConst = 4;
        var tableVar = "<table id=\"allTable\" style=\"border-spacing:0px\">";
        for (i = 0; i < productIndexArray.length; i++) {
            if (i % columnNumberConst == 0) {
                tableVar = tableVar + "<tr>";
            }
            tableVar = tableVar + "<td class=\"productTd\"><table id=\"PROD" + productIndexArray[i] + "\" onclick=\"selectProduct(" +
                productIndexArray[i] + ")\" class=\"popupTable\">" + popupHTLMArray[0] +            
                innerProductPanelHTML(productIndexArray[i]) +             
                popupHTLMArray[1] + "</table></td>";                            
            if (i == (productIndexArray.length - 1)) {
                for (j = 0; j < (columnNumberConst - i % columnNumberConst - 1); j++) {
                    tableVar = tableVar + "<td>&nbsp;</td>";
                }
                tableVar = tableVar + "</tr>";
            } else if (i % columnNumberConst == (columnNumberConst - 1)) {
                tableVar = tableVar + "</tr>";
            }
        }
        tableVar = tableVar + "</table>";  
        var html_holder= "<div id=\"myProducts\">" + tableVar + "</div>";            
        console.log(html_holder);
        //display to page the new HTML
        $('#myProducts').replaceWith(html_holder);
        }
        catch(err){
            console.log("Error parsing the data in the JSON file");
        }
    }
});

function innerProductPanelHTML(indexParm) {
    var htmlVar = "<img src=\"" + productArray[indexParm].external_url +
            "\" class=\"productImage\"><div class=\"productNameDiv\">" + productArray[indexParm].product_name + "</div>Price: $" + 
            diplayPrice(productArray[indexParm].list_price) +  ""
    return htmlVar;
}

function diplayPrice(priceParm) {
    stringVar = Math.round(priceParm * 100).toString();
    stringVar = stringVar.substr(0, (stringVar.length - 2)) + "." + stringVar.substr(stringVar.length - 2);
    return stringVar;
}

function selectProduct(idParm) {  
    if (lockVar) {
        return;
    }
    lockVar = true;
    hashtagVar = productArray[idParm].hashtag;
    popupObjVar = document.getElementById("popupTable");
    document.getElementById("popupProductContentDiv").innerHTML = innerProductPanelHTML(idParm);  
    selectedObjVar = document.getElementById("PROD" + idParm);
    var offsetVar = getOffset(selectedObjVar);
    popupObjVar.style.visibility = "visible";
    popupObjVar.style.top = offsetVar.top + "px";
    popupObjVar.style.left = offsetVar.left + "px";
    startTopVar = offsetVar.top;
    startLeftVar = offsetVar.left;    
    endTopVar = popupTopVar + $(document).scrollTop();
    endLeftVar = ($('body').innerWidth() - popupObjVar.offsetWidth)/2 + $(document).scrollLeft();    
    selectedObjVar.style.visibility = "hidden"; 
    modeVar = "EXPAND";
    startTransitionPosition();
}







var transitionCurveVar = 1.05;
var transitionPositionStepsVar = 30;
var transitionSizeStepsVar = 10;
var transitionIntervalVar = 7; //5;
var widthIncrementVar = 37;
var heightIncrementVar = 30;


var incrementFactorArray = new Array();
var incrementFactorSumVar = 2;
incrementFactorArray[0] = 2
for (i = 1; i < transitionPositionStepsVar; i++) {
    incrementFactorArray[i] = Math.pow(incrementFactorArray[(i - 1)], transitionCurveVar);
    incrementFactorSumVar = incrementFactorSumVar + incrementFactorArray[i];
}
var transitionIndexVar;
var currentTopVar;
var currentLeftVar;
var currentWidthVar = 1;
var currentHeightVar = 1;
var endTopVar;
var endLeftVar;
var startTopVar;
var startLeftVar; 
var popupObjVar;
var selectedObjVar;
var totalVerticalVar;
var totalHorizontalVar;
var modeVar;
var lockVar = false;

function startTransitionPosition() {
    if (modeVar == "EXPAND") {
        currentTopVar = startTopVar; 
        currentLeftVar = startLeftVar;       
        totalVerticalVar = endTopVar - currentTopVar;
        totalHorizontalVar = endLeftVar - currentLeftVar;    
    }
    else {
        totalVerticalVar = startTopVar - currentTopVar;
        totalHorizontalVar = startLeftVar - currentLeftVar;       
    }
    transitionIndexVar = 0;
    transitionPosition();
}

function transitionPosition() {
    popupObjVar.style.top = currentTopVar + "px";
    popupObjVar.style.left = currentLeftVar + "px";   
    if (transitionIndexVar < transitionPositionStepsVar) {    
        currentTopVar = currentTopVar + (totalVerticalVar * (incrementFactorArray[transitionIndexVar]/incrementFactorSumVar));
        currentLeftVar = currentLeftVar + (totalHorizontalVar * (incrementFactorArray[(transitionPositionStepsVar - transitionIndexVar - 1)]/incrementFactorSumVar));
        transitionIndexVar = transitionIndexVar + 1; 
        setTimeout(function(){ transitionPosition(); }, transitionIntervalVar);
    }
    else {
        if (modeVar == "EXPAND") {
            popupObjVar.style.top = endTopVar + "px";
            popupObjVar.style.left = endLeftVar + "px";    
            transitionIndexVar = 0;
            transitionSize();
        }
        else {     
            selectedObjVar.style.visibility = "visible"; 
            popupObjVar.style.visibility = "hidden";
            document.getElementById("popupProductContentDiv").innerHTML = "";
            lockVar = false;
        }           
    }  
}

function transitionSize() {
    document.getElementById("popupProductC4R1Spacer").style.width = currentWidthVar + "px";
    document.getElementById("popupProductC1R3Spacer").style.height = currentHeightVar + "px";    
    popupObjVar.style.left = currentLeftVar + "px";    
    if (transitionIndexVar < transitionSizeStepsVar) {
        currentLeftVar = currentLeftVar - widthIncrementVar;
        currentWidthVar = currentWidthVar + (2 * widthIncrementVar);
        currentHeightVar = Math.min((currentHeightVar + heightIncrementVar), (popupTwitterContentHeightVar - document.getElementById("popupProductContentDiv").offsetHeight));               
        transitionIndexVar = transitionIndexVar + 1; 
        setTimeout(function(){ transitionSize(); }, transitionIntervalVar);
    }
    else {
    document.getElementById("popupTwitterContentTd").innerHTML = "<table style=\"width:100%\"><td style=\"width:100%\"><div id=\"popupTwitterContentDiv\"></div></td><td><img src=\"Images/spacer.png\" style=\"width:10px;visibility:hidden;\" /></td></table>";  
    document.getElementById("popupTwitterContentDiv").style.height = popupTwitterContentHeightVar + "px"; 
    document.getElementById("popupControlTd").innerHTML = document.getElementById("popupControlTdFillerDiv").innerHTML;  
    getTwitter(hashtagVar);      
    }
}

function hidePopup() {
    document.getElementById("popupTwitterContentTd").innerHTML = "";
    document.getElementById("popupControlTd").innerHTML = "";
    document.getElementById("popupProductC4R1Spacer").style.width = "0px";
    document.getElementById("popupProductC1R3Spacer").style.height = "0px";    
    currentWidthVar = 1;
    currentHeightVar = 1;  
    popupObjVar.style.left = endLeftVar + "px";
    currentLeftVar = endLeftVar;
    modeVar = "CONTRACT";
    startTransitionPosition();
}    

function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft; // - el.scrollLeft;
        _y += el.offsetTop; // - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

/////////////////////////////////////////////////////////////////////
// GET TWITTER JSON AND PARSE
/////////////////////////////////////////////////////////////////////

var twitterArray;

function getTwitter(harshtagParm) {
    twitterArray = new Array();
    $.getJSON('js/twitter.json', function (data) {
    /*$.getJSON(path+'/products', function (data) {*/
    /*$.getJSON('https://localhost:8090/products', function (data) { */
        try{
            holder =data;
            buildTwitterArray();
        }
        catch(err){
            console.log("Error retrieving the Product data from the JSON Endpoint.")
        }
    });
    
 /*   
      var monthArray=new Array();
  monthArray[0]="Jan";
  month[1]="Feb";
  month[2]="Mar";
  month[3]="Apr";
  month[4]="May";
  month[5]="Jun";
  month[6]="Jul";
  month[7]="Aug";
  month[8]="Sep";
  month[9]="Oct";
  month[10]="Nov";
  month[11]="Dec";
  
  var monthArray = (
*/  
    var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var ampmArray = ["AM", "PM"];
    
    function buildTwitterArray() { 
        indexVar = 0;
        $.each(holder.tweets, function(index, details) {        
            if (details.text) { 
                if (details.text.search("#" + hashtagVar) > -1) {                 
                var hashtagsVar;          
                if (details.entities.hashtags[0]) {      
                    if (details.entities.hashtags[0].text) {
                        hashtagsVar = details.entities.hashtags[0].text;                          
                    }                           
                }                  
                var theDate = new Date(parseInt(details.timestamp_ms)); 
                var month = monthArray[theDate.getMonth()];
               // var day = "0" + theDate.getDate(); day = day.substr(-2);        
             //   var hour = theDate.getHours()%12 + " " + ampmArray[Math.floor(theDate.getHours()/12)];        
                var minute = "0" + theDate.getMinutes(); minute = minute.substr(-2);        
                
                
                var dateString = theDate.getHours()%12 + ":" + minute + " " + ampmArray[Math.floor(theDate.getHours()/12)] + " - " + month + " " +
                    theDate.getDate() + ", " + theDate.getFullYear()
                
                //var dateString = theDate.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute;
                
                
                
                
                                              
                twitterArray[indexVar] = {screenName: details.user.screen_name.trim().substr(0,20), tweetText: details.text, tweetDate: dateString};               
                indexVar = indexVar + 1;   
                }                                               
            }                                                  
        });       
    buildTwitterHTML("1");     
    }    
}

function buildTwitterHTML(sortParm) {
        var tweetSortArray = new Array();
        tweetSortArray[1] = [0, 1, 2];
        tweetSortArray[2] = [1, 0, 2];
        tweetSortArray[3] = [2, 0, 1];
        var sortVar = tweetSortArray[sortParm];
        var tweetHeaderArray = new Array();
        tweetHeaderArray[0] = "<td class=\"tweetHeader\"><img src=\"Images/spacer.png\" class=\"twitterScreenName\" />Screen Name</td>";
        tweetHeaderArray[1] = "<td class=\"tweetHeader\"><img src=\"Images/spacer.png\" class=\"twitterTweetText\" />Tweet Text</td>";
        tweetHeaderArray[2] = "<td class=\"tweetHeader\"><img src=\"Images/spacer.png\" class=\"twitterTweetDate\" />Tweet Date</td>";
        var tweetString = "<table class=\"twitterTable\"><tr>" + tweetHeaderArray[sortVar[0]] + tweetHeaderArray[sortVar[1]] + tweetHeaderArray[sortVar[2]] + "</tr>";            
        var tweetDisplayArray = new Array();
        var tweetRowArray = new Array();       
        for (i = 0; i < twitterArray.length; i++) {         
            tweetRowArray[0] = "<td>" +  twitterArray[i].screenName + "</td>";               
            tweetRowArray[1] = "<td>" +  formatTweetText(twitterArray[i].tweetText) + "</td>";   
            tweetRowArray[2] = "<td>" +  twitterArray[i].tweetDate + "</td>";      
            tweetDisplayArray[i] = "<tr>" + tweetRowArray[sortVar[0]] + tweetRowArray[sortVar[1]] + tweetRowArray[sortVar[2]] + "</tr>";      
        }        
        tweetDisplayArray.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });       
        for (i = 0; i < tweetDisplayArray.length; i++) {  
            tweetString = tweetString + tweetDisplayArray[i];
        }
        tweetString = tweetString + "</table>";        
        document.getElementById("popupTwitterContentDiv").innerHTML = tweetString;        
        document.getElementById("tweetNumberLabel").innerHTML = indexVar + " Tweets Total";
}

function formatTweetText(stringParm) { 
    var tweetVar = "  " + stringParm + "  "; 
    var locationVar;
    var linkTextVar = "";
    var hrefVar;
    var tweetFirstArray;
    var tweetSecondArray = new Array();
    function secondArrayObj () {
        var linkString = "";
        var textString = "";
    }    
    tweetVar = tweetVar.replace(/€H1/g, '');    
    tweetVar = tweetVar.replace(/€H2/g, ''); 
    tweetVar = tweetVar.replace(/€H3/g, '');     
    tweetVar = tweetVar.replace(/€S1/g, '');     
    tweetVar = tweetVar.replace(/€S2/g, '');        
    tweetVar = tweetVar.replace(/€S3/g, '');    
    tweetVar = tweetVar.replace(/#/g, '^^#');
    tweetVar = tweetVar.replace(/@/g, '^^@');
    tweetVar = tweetVar.replace(/http:\/\//g, '^^http://');
    tweetVar = tweetVar.replace(/https:\/\//g, '^^https://');
    tweetFirstArray = tweetVar.split("^^");
    for (j = 1; j < tweetFirstArray.length; j++) {
        tweetSecondArray[j] = new secondArrayObj;
        locationVar = tweetFirstArray[j].indexOf(' ');
        tweetSecondArray[j].linkString = tweetFirstArray[j].substr(0, locationVar);
        tweetSecondArray[j].textString = tweetFirstArray[j].substr(locationVar);
        if ((tweetSecondArray[j].linkString.slice(-1) == ".")||(tweetSecondArray[j].linkString.slice(-1) == "?")||(tweetSecondArray[j].linkString.slice(-1) == "!")||
            (tweetSecondArray[j].linkString.slice(-1) == ",")||(tweetSecondArray[j].linkString.slice(-1) == ")")) {
            tweetSecondArray[j].textString = tweetSecondArray[j].linkString.slice(-1) + tweetSecondArray[j].textString; 
            tweetSecondArray[j].linkString = tweetSecondArray[j].linkString.substr(0, (tweetSecondArray[j].linkString.length - 1));
        }
        if (tweetSecondArray[j].linkString.charAt(0) == "#") {
            linkTextVar = tweetSecondArray[j].linkString;
            hrefVar = "https://twitter.com/hashtag/" + linkTextVar.substr(1) + "?src=hash";
        }
        else if (tweetSecondArray[j].linkString.charAt(0) == "@") {
            linkTextVar = tweetSecondArray[j].linkString;
            hrefVar = "https://twitter.com/" + linkTextVar.substr(1);
        }
        else if (tweetSecondArray[j].linkString.substr(0, 11) == "http://www.") {
            hrefVar = tweetSecondArray[j].linkString;
            linkTextVar = hrefVar.substr(11, 23);        
        }
        else if (tweetSecondArray[j].linkString.substr(0, 12) == "https://www.") {
            hrefVar = tweetSecondArray[j].linkString;
            linkTextVar = hrefVar.substr(12, 23);        
        }
        else if (tweetSecondArray[j].linkString.substr(0, 7) == "http://") {
            hrefVar = tweetSecondArray[j].linkString;
            linkTextVar = hrefVar.substr(7, 23);        
        }
        else if (tweetSecondArray[j].linkString.substr(0, 8) == "https://") {
            hrefVar = tweetSecondArray[j].linkString;
            linkTextVar = hrefVar.substr(8, 23);        
        }
        if (linkTextVar != "") {
            tweetSecondArray[j].linkString = "<a href=\"" + hrefVar + "\" target=\"_blank\">" + linkTextVar + "</a>";
        }
    }
    tweetVar = tweetFirstArray[0];
    for (j = 1; j < tweetSecondArray.length; j++) {
        tweetVar = tweetVar + tweetSecondArray[j].linkString +  tweetSecondArray[j].textString; 
    }
    return tweetVar.trim();
}







