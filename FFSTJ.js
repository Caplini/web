let totals = 0

function addtotals() {
    let toadd = document.getElementById("count").value;
    let name = document.getElementById("itemname").value;

    totals += eval(toadd);
    document.getElementById("total").innerHTML = `${name}: ${totals}`;
}
