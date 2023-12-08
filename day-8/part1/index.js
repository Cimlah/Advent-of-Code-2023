const fs = require('fs');
const path = require('node:path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" }).split(/\r?\n\r?\n/)

const directions = input.shift();
const nodes = input[0].split(/\n/).reduce((map, line) => {
    let {node, left, right} = [...line.matchAll(/(?<node>\w{3}) = \((?<left>\w{3}), (?<right>\w{3})/g)][0].groups;
    map.set(node, {L:left, R:right})
    return map;
}, new Map())

console.log(nodes);

let currentNode = 'AAA';
let steps = 0;
for(let i = 0; i < directions.length; i++){
    // console.log({i, currentNode, dir: directions[i], next:nodes.get(currentNode)[directions[i]] });
    currentNode = nodes.get(currentNode)[directions[i]]
    // console.log(currentNode);
    if(currentNode == 'ZZZ'){
        steps += i + 1;
        break;
    }
    if(i == directions.length -1){
        steps += i + 1;
        i = -1;
    }
}

console.log(currentNode, steps);