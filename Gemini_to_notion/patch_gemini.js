const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (const [regex, replacement] of replacements) {
        content = content.replace(regex, replacement);
    }
    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Patched ${filePath}`);
    }
}

const jsFiles = [
    "contents.e02f0287.js", 
    "auth.075e4944.js", 
    "popup.100f6462.js", 
    "static/background/index.js", 
    "options.95eda3f3.js"
];

const replacements = [
    // commonutil check
    [/return\s*[a-zA-Z0-9_]+\.isSubscribed\s*\|\|\s*""/g, 'return true'],
    // background check
    [/return\s*!![a-zA-Z0-9_]+\.isSubscribed\s*\|\|\s*!![a-zA-Z0-9_]+\.isSubscribed/g, 'return true'],
    // popup/options cache manager
    [/\(\s*0\s*,\s*[a-zA-Z0-9_]+\.CacheManager\s*\)\.getCustom\(\s*"isSubscribed"\s*\)/g, 'Promise.resolve(true)'],
    // options component
    [/isSubscribed:\s*[a-zA-Z0-9_]+/g, 'isSubscribed:true'],
    // Fix HTTP 400 when fetching conversation (updates payload to match new Gemini API format)
    [/JSON\.stringify\(\[e,10,t,1,\[1\],\[4\],null,1\]\)/g, 'JSON.stringify([e,100,t,1,[0],[4],null,1])']
];

jsFiles.forEach(f => {
    let p = path.join(__dirname, f);
    if (fs.existsSync(p)) {
        replaceInFile(p, replacements);
    }
});
