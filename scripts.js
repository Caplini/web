let x = 0;
let Cpower = 1;
let rebirth = 0;

function onclclick() {
    x += Cpower;
    document.getElementById("CILCKCOUNTER").innerHTML = `Clicks: ${x.toFixed(0)}`; 
    console.log(x);
}

function powerup() {
    let BuyNum = document.getElementById("multiBuy").value;
        console.log(BuyNum)

        BuyNum = Number(BuyNum)  
    if (x >= 100*BuyNum) {

        Cpower += BuyNum;
        x -= 100*BuyNum;
        document.getElementById("CILCKCOUNTER").innerHTML = `Clicks: ${x.toFixed(0)}`; 
        document.getElementById("CILCKPOWER").innerHTML = `Power: ${Cpower.toFixed(0)}`; 
        console.log(x);

    } else {
        alert(`you need atleast ${100*BuyNum} clicks. you have ${x.toFixed(0)} clicks.`);
    }
}

function rebirths() {
    if (x >= 1000000+(rebirth*100000)) {
        rebirth +=1;
        x = 0;
        Cpower = parseFloat(1+(rebirth/10));



        document.getElementById("rebirths").innerHTML = `Rebirths: ${rebirth.toFixed(0)}`;  
        document.getElementById("CILCKCOUNTER").innerHTML = `Clicks: ${x.toFixed(0)}`; 
        document.getElementById("CILCKPOWER").innerHTML = `Power: ${Cpower.toFixed(0)}`; 
        document.getElementById("rebirth").innerHTML = `Rebirth: ${1000000+(rebirth*100000)}`;
        console.log(rebirths);

    } else {
        alert(`you need atleast ${1000000+(rebirth*100000)} clicks. you have ${x.toFixed(0)} clicks.`);
    }
}

function SaveValues () {
    localStorage.setItem("clicks", x);
    localStorage.setItem("rebirthcount", rebirth);
    localStorage.setItem("Clickpower", Cpower);
}

function loadValues() {
    x = Number(localStorage.getItem("clicks"));
    rebirth = Number(localStorage.getItem("rebirthcount"));
    Cpower = Number(localStorage.getItem("Clickpower"));

    console.log(x, rebirth, Cpower);

    document.getElementById("rebirths").innerHTML = `Rebirths: ${rebirth.toFixed(0)}`;  
    document.getElementById("CILCKCOUNTER").innerHTML = `Clicks: ${x.toFixed(0)}`; 
    document.getElementById("CILCKPOWER").innerHTML = `Power: ${Cpower.toFixed(0)}`; 
}
