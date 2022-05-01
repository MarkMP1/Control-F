function clicked(){
    btn.value = "Searching";
    var CaseSensitive = document.getElementById('Case_Sensitive');
    var Entered_Text = document.getElementById('name').value;


    if (Entered_Text == ''){
        alert("Enter Text");
    }else{
        // Call Content Scripts
        chrome.tabs.query({}, function(tabs) {
            for(var i = 0; i < tabs.length; i++){
                if(!tabs[i].url.includes("chrome://")){
                    chrome.tabs.sendMessage(tabs[i].id, {data: Entered_Text}, function(resp){
                        console.log("pog!");
                    });
                }   
            }
        });
    }
    btn.value = "Find!";
    document.getElementById('name').value = '';
}

function createBox(inputted){
    let creation = document.createElement('div');
    creation.id = "creation";
    creation.className = "creation";
    creation.innerHTML = "<p>" + inputted + "</p>"
    document.body.appendChild(creation);
}


//Deletes All Children
function DeleteChildren(){
    const myNode = document.getElementsByClassName("creation");
    console.log(myNode);
    while(true){
        if(myNode.length >= 1){
            myNode[0].remove();
        }else{
            break;
        }
    }
}



// Listen for the response
chrome.runtime.onMessage.addListener( (msg, sender, sendResponse) => {    
    sendResponse({status: true});

    if(msg.type === "response"){
        var inputted;
        if (msg.data.length === 0){
            inputted = "No matches found on tab " + msg.tabIn + " (" + msg.tabName + ") " + "\n";
        }else if (msg.data.length === 1){
            inputted = msg.data.length + " match found on tab " +  msg.tabIn + " (" + msg.tabName + ") " + "\n";
        }else{
            inputted = msg.data.length + " matches found on tab " +  msg.tabIn + " (" + msg.tabName + ") " + "\n";
        }
        createBox(inputted);
        
    }
    return true;
});





//Button Clickers
var btn = document.querySelector(".btn")
btn.addEventListener("click", clicked)

var delete_button = document.querySelector(".delete");
delete_button.addEventListener("click", DeleteChildren)

// receive from backgrounds.js