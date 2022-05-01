// Get all tabs

var tabsList;
async function getCurrentTab() {
    tabsList = await chrome.tabs.query({});
}
getCurrentTab();

// Insert content script into every website, without refreshing (basically includes all websites even before installation)
// After installation, our manifest conditions already make it so that it's automatically added.

chrome.runtime.onInstalled.addListener(async () =>{
    getCurrentTab();
    console.log(tabsList);
    var manifest = chrome.runtime.getManifest().content_scripts;
    for(let j = 0; j < tabsList.length; j++){
        if(!tabsList[j].url.includes("chrome://")){
            chrome.scripting.executeScript({
                target: {tabId: tabsList[j].id},
                files: manifest[0].js,
            });
        }
    }
});








// Boyer Moore Algorithm
function generate_shift_table(pattern) {
    var skip_list;
    skip_list = {};

    for (let i = 0, _pj_a = pattern.length; i < _pj_a; i += 1) {
        skip_list[pattern[i]] = Math.max(1, pattern.length - i - 1);
    }

    return skip_list;
}

function get(object, key, default_value) {
    var result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
}

function boyer_moore_search(source, pattern) {
    var answer, bad_char, i, j, shift, skips;
    bad_char = generate_shift_table(pattern);
    // console.log(bad_char);
    i = pattern.length - 1;
    answer = [];

    while (i <= source.length - 1) {
        j = 0;

        while (j < pattern.length && pattern[pattern.length - j - 1] === source[i - j]) {
            j += 1;
        }

        if (j === pattern.length) {
            answer.push(i - pattern.length + 1);
            i += 1;
            continue;
        } else {
            shift = get(bad_char, source[i + j], pattern.length)

            if (shift === 0) {
                shift = pattern.length - 1;
            }

            skips = shift - j;
            i += skips;
        }
    }

    return answer;
}






// Receive stuff
var lol = 0;
chrome.runtime.onMessage.addListener( (msg, sender, sendResponse) => {
    console.log("wtf is this bug");
    sendResponse({status: true});
    getCurrentTab();
    var pog = 0;

    for(var k = 0; k < tabsList.length; k++){

        if(!tabsList[k].url.includes("chrome://")){
            pog++;
        }

    }

        // console.log(msg.data);
        // console.log(msg.lookFor);
    var results = boyer_moore_search(msg.data, msg.lookFor);
    console.log(results);
    chrome.runtime.sendMessage({type: "response", data: results, tabIn: sender.tab.index, tabName: sender.tab.title}, function(resp){
        console.log("all clear");
    });
    return true;
});
