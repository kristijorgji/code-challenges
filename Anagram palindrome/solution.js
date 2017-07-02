function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//hash map to have o(1) search complexity

var rules = {};
rules['AB'] = 'AA';
rules['BA'] = 'AA';
rules['CB'] = 'CC';
rules['BC'] = 'CC';
rules['AA'] = 'A';
rules['CC'] = 'C';

function solution(S) {
    var buffer = '';
    var usefulRulesKeys = [];
    
    for (var i = 0; i < S.length; i++) {
            buffer += S[i];
            if (rules[buffer]) {
                    usefulRulesKeys.push(buffer);
                }
            buffer = S[i];
        }
        
    if  (usefulRulesKeys.length == 0) {
            return S;
        }
        
    var randomRuleKey = usefulRulesKeys[getRandomInt(0, usefulRulesKeys.length -1)];
    S = S.replace(randomRuleKey, rules[randomRuleKey]);
    
    return solution(S);
}