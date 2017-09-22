/* .js for the Node.js Applicaiton.*/

//Holds json for future calls to manipulate data
var holder = null;
var productArray = new Array();
var productIndexArray = new Array();
var topFactorVar = 15;
var leftFactorVar = 30;
var widthVar = "200px";
var popupTopVar = 20;
var popupWidthVar = 600;
var popupHeightVar = 300;


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

//hold the html to be dynamically built



indexVar = 0;
try {
//Loop through JSON 
$.each(holder.rows, function(index, details) { 
    productArray[details.PRODUCT_ID] = {parent_category_id: details.PARENT_CATEGORY_ID, category_id: details.CATEGORY_ID,
        product_name: details.PRODUCT_NAME, product_status: details.PRODUCT_STATUS, list_price: details.LIST_PRICE,
        warranty_period_months: details.WARRANTY_PERIOD_MONTHS, external_url: details.EXTERNAL_URL}                                                                              
    productIndexArray[indexVar] = details.PRODUCT_ID;             
    indexVar = indexVar + 1;                   
});
    var columnNumberConst = 4;
    var tableVar = "<table id=\"allTable\" style=\"border-spacing:0px\">";
    for (i = 0; i < productIndexArray.length; i++) {
        if (i % columnNumberConst == 0) {
            tableVar = tableVar + "<tr>";
        }
        tableVar = tableVar + "<td class=\"productTd\"><div id=\"PROD" + productIndexArray[i] + "\" onclick=\"selectProduct(" + productIndexArray[i] + ")\" class=\"products\"><img src=\"" + 
        productArray[productIndexArray[i]].external_url +
            "\"><div class=\"productNameDiv\"><h4>" + productArray[productIndexArray[i]].product_name + "</h4></div><h4>Price: $" + 
            diplayPrice(productArray[productIndexArray[i]].list_price) + 
            "</h4></div></td>";                     
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
    


//build HTML

var html_holder= "<div id=\"myProducts\">" + tableVar + "</div>" ;

console.log(html_holder);

//display to page the new HTML
$('#myProducts').replaceWith(html_holder);

}
catch(err){
  console.log("Error parsing the data in the JSON file");
}


}

});

function diplayPrice(priceParm) {
stringVar = Math.round(priceParm * 100).toString();
stringVar = stringVar.substr(0, (stringVar.length - 2)) + "." + stringVar.substr(stringVar.length - 2);
return stringVar;
}

var objVar;

function selectProduct(idParm) {
//    var objVar = $('#floatingProduct');

//    objVar = document.getElementById("floatingProduct");
    var offsetVar = getOffset(document.getElementById("PROD" + idParm));
    

/*    
    objVar.style.display = "block";
    objVar.style.top = (offsetVar.top - topFactorVar) + "px";
    objVar.style.left = (offsetVar.left - leftFactorVar) + "px";
    objVar.style.width = widthVar;
*/    
    startTransitionPosition(document.getElementById("PROD" + idParm));
//    setTimeout(function(){ objVar.className = "products productPopup"; }, 3000); 
    //objVar.className = "products productPopup";
}

function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}




var transitionCurveVar = 1.05;
var transitionNumberVar = 30;
var transitionIntervalVar = 5;

var incrementFactorArray = new Array();
var incrementFactorSumVar = 2;
incrementFactorArray[0] = 2
for (i = 1; i < transitionNumberVar; i++) {
    incrementFactorArray[i] = Math.pow(incrementFactorArray[(i - 1)], transitionCurveVar);
    incrementFactorSumVar = incrementFactorSumVar + incrementFactorArray[i];
}
var transitionIndexVar;
var transitionWidthIncrementVar;
var transitionHeightIncrementVar;
var transitionTopSignVar;
var transitionLeftSignVar;
var currentTopVar;
var currentLeftVar;
var currentWidthVar;
var currentHeightVar;
var endTopVar;
var endLeftVar;
var endWidthVar;
var endHeightVar;
var transitionObjVar;
var totalVerticalVar;
var totalHorizontalVar;

function startTransitionPosition(objParm) {
    objVar = document.getElementById("floatingProduct");
    var offsetVar = getOffset(objParm);
    objVar.style.display = "block";
    objVar.style.top = offsetVar.top + "px";
    objVar.style.left = offsetVar.left + "px";
    objVar.style.width = widthVar;
    transitionObjVar = objVar;
    currentTopVar =  offsetVar.top; // transitionObjVar.offsetTop;
    currentLeftVar = offsetVar.left // transitionObjVar.offsetLeft;
    currentWidthVar = transitionObjVar.offsetWidth;
    currentHeightVar = transitionObjVar.offsetHeight;
    endTopVar = popupTopVar + $(document).scrollTop();
    endWidthVar = popupWidthVar;
    endLeftVar = ($('body').innerWidth() - currentWidthVar)/2 + $(document).scrollLeft();
    endHeightVar = popupHeightVar;
    totalVerticalVar = endTopVar - currentTopVar;
    totalHorizontalVar = endLeftVar - currentLeftVar;
    transitionWidthIncrementVar = Math.ceil(endWidthVar - currentWidthVar)/transitionNumberVar;
    transitionHeightIncrementVar = Math.ceil(endHeightVar - currentHeightVar)/transitionNumberVar;
//    transitionTopSignVar = (endTopVar - currentTopVar)/Math.abs(endTopVar - currentTopVar);
//    transitionLeftSignVar = (endLeftVar - currentLeftVar)/Math.abs(endLeftVar - currentLeftVar);
    transitionIndexVar = 0;
    transitionPosition();
}

function transitionPosition() {
    transitionObjVar.style.top = currentTopVar + "px";
    transitionObjVar.style.left = currentLeftVar + "px";
    if (transitionIndexVar < 30) {
        currentTopVar = currentTopVar + (totalVerticalVar * (incrementFactorArray[transitionIndexVar]/incrementFactorSumVar));
        currentLeftVar = currentLeftVar + (totalHorizontalVar * (incrementFactorArray[(transitionNumberVar - transitionIndexVar - 1)]/incrementFactorSumVar));
        transitionIndexVar = transitionIndexVar + 1; 
        setTimeout(function(){ transitionPosition(); }, transitionIntervalVar);
    }
    else {
    transitionObjVar.style.top = endTopVar + "px";
    transitionObjVar.style.left = endLeftVar + "px";    
    }
}


