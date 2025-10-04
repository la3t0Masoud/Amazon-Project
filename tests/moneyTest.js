import { formatCurrencey } from "../scripts/utils/money.js";

console.log(`test suite: format Currency`)
console.log(`converts cents into dollars`)


if (formatCurrencey(2095) === '20.95'){
    console.log(`passed`);
}else{
    console.log('failed');
}
console.log(`work with 0`);



if(formatCurrencey(0)==='0.00'){
    console.log('2nd passed')
}else{
    console.log(`2nd failed`)
}

console.log(`rounds up to nearist cent`)

if(formatCurrencey(2000.4)===`20.00`){
    console.log(`passed`);
    

}else{
    console.log(`failed`)
}