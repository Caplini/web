let totals1 = 0
let totals2 = 0

function addtotals1() {
    let toadd = document.getElementById("count1").value;
    let name = document.getElementById("itemname1").value;

    totals1 += eval(toadd);
    document.getElementById("total1").innerHTML = `${name}: ${totals1}`;
}

function addtotals2() {
    let toadd = document.getElementById("count2").value;
    let name = document.getElementById("itemname2").value;

    totals2 += eval(toadd);
    document.getElementById("total2").innerHTML = `${name}: ${totals2}`;
}

