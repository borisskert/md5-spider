const settings = require('./settings');

const removeByExpression = (text, regexp) => {
    const regExp = new RegExp(regexp);

    let newText = text;
    let replacedText = text.replace(regExp, '');

    while(replacedText !== newText) {
        newText = replacedText;
        replacedText = newText.replace(regExp, '');
    }

    return replacedText;
}

const cleanup = (text) => {
    let ignoredExpressions = settings.read().ignores;
    return ignoredExpressions.reduce(removeByExpression, text);
}

module.exports = cleanup;
