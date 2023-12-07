const fs = require('fs');
const path = require('node:path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" }).split(/\r?\n/).map(line => {
    line = line.split(' ')
    return {hand: line[0], bid: Number(line[1])}
})

input.sort((a, b) => determineRank(a.hand, b.hand));

console.log(input.reduce((total, curr, i) => total + curr.bid * (i+1), 0))

console.log(determineRank('32T3K', '33T3K'))
function determineRank(a, b){
    const cardOrder = '23456789TJQKA';
    // console.log(getType(a))
    let typeDiff = getType(a) - getType(b);

    if(typeDiff == 0){
        for (let i = 0; i < a.length; i++) {
            if(cardOrder.indexOf(a[i]) != cardOrder.indexOf(b[i])){
                return cardOrder.indexOf(a[i]) - cardOrder.indexOf(b[i])
            }
        }
    }

    return typeDiff;

}

function getType(hand){
    let handCount = [];
    while(hand.length > 0){
        let len = hand.length;
        hand = hand.replaceAll(hand[0], '')
        handCount.push(len - hand.length);
    }

    let handTypes = ['11111', '1112', '122', '113', '23', '14', '5']

    return handTypes.indexOf(handCount.sort().join(''));
}