var percent : number = 0.0;
var lastPlayed : number = Date.now();
var toPlayAgain : number;
while(true)
{
    lastPlayed = Date.now();
    toPlayAgain = lastPlayed + 62.5;
    percent += 0.01;
    percent = percent % 2.0;
    postMessage(percent, "xalala");
    while(Date.now() < toPlayAgain) { }
}