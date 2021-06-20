const { promises: fs } = require('fs');
const path = require('path');

(async () => {
    const v4RuleSetPath = path.join(__dirname, "../../node_modules/webpack/lib/RuleSet.js");
    let fileContent = await fs.readFile(v4RuleSetPath, 'utf8');
    const rx = /(?<="use strict";\n)(?!console\.warn)/;
    if (rx.test(fileContent)) {
        let message = "===== LOADED WEBPACK v4 lib/RuleSet.js =====";
        const messageLen = message.length;
        message += "\\n" + "=".repeat(messageLen);
        message = "=".repeat(messageLen) + "\\n" + message;
        fileContent = fileContent.replace(
            rx, 
            "console.warn(\'"+message+"\');\n"
        );
        await fs.writeFile(v4RuleSetPath, fileContent);
    }
})();