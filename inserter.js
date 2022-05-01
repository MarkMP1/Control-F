console.log("Running.");
// chrome.runtime.sendMessage({data: document.documentElement.innerHTML});
// Receive stuffs
chrome.runtime.onMessage.addListener(
    function(msg, sender, sendResponse) {
        sendResponse({status: true});
        let pog = extraction();
        chrome.runtime.sendMessage({type: "SourceCode", data: pog, lookFor: msg.data}, function(resp){
            console.log("returned.");
        });
        return true;
    }
);

function extraction(){
    var documentString = document.body.innerHTML;
    var span = document.createElement('span');
    span.innerHTML = documentString;
    var children = span.querySelectorAll('*');
    var end = "";
    // "h1, h2, h3, h4, h5, h6, p, a"
    for(let i = 0; i < children.length; i++){
        if((children[i].tagName != "H1" && children[i].tagName != "H2" && children[i].tagName != "H3" && children[i].tagName != "H4" && children[i].tagName != "H5" && children[i].tagName != "H6" && children[i].tagName != "P" && children[i].tagName != "A")){
        }else{
            end += children[i].textContent + ' ';
        }
    }
    return end;
}
// console.log(extraction());

