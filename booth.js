//Function to perform binary Addition 
function addition(a, b) {
    let n = a.length;
    let m = b.length;
    let l = Math.max(n, m);
    a = a.padStart(l, '0');
    b = b.padStart(l, '0');
    let carry = 0;
    let ans = '';

    for (let i = l - 1; i >= 0; i--) {
        let tem = carry + parseInt(a[i]) + parseInt(b[i]);
        if (tem < 2) {
            ans = tem + ans;
            carry = 0;
        } else if (tem == 2) {
            ans = '0' + ans;
            carry = 1;
        } else if (tem == 3) {
            ans = '1' + ans;
            carry = 1;
        }
    }

    ans = ans.padStart(l, '0');
    return ans;
}

//Function to perform 1's Complement
function ones_complement(num) {
    let comp = '';
    for (let i = 0; i < num.length; i++) {
        if (num[i] === '0') {
            comp += '1';
        } else {
            comp += '0';
        }
    }
    return comp;
}

//function to perform 2's Complement
function twos_complement(num) {
    let one_com = ones_complement(num);
    let two_com = addition(one_com, '1');
    return two_com;
}

//Function to Convert number to binary
function set_bin(num) {
    let binary = "";
    let decimal = Math.abs(num)
    while (decimal > 0) {
        // if modulo of number with 2 is ‘1’, append 1 in front of binary string. Otherwise append 0.
        if (decimal % 2 == 1) {
            binary = "1" + binary;
        } else {
            binary = "0" + binary;
        }
        // divide number by 2.
        decimal = Math.floor(decimal / 2);
    }


    return binary;

}



//function to set Binary as signed (by 2's complement)
function set_signed(d, num) {
    if (d >= 0) {
        return '0' + num;
    } else {
        return '1' + twos_complement(num);
    }
}

function arow(c1, c2, c3, c4, c5, c6, c7) {
    row = -1
    var display = document.getElementById("mytable");
    var newRow = display.insertRow(row);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = c1;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = c2;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = c3;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = c4;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = c5;
    var cell6 = newRow.insertCell(5);
    cell6.innerHTML = c6;
    var cell7 = newRow.insertCell(6);
    cell7.innerHTML = c7;
}
//Main function to perform binary multiplication using Booth's algorithm
function booth_multiplication(multiplicand, multiplier) {
    //convert it to binary
    // var span = document.getElementById("multiplicand");
    // span.textContent = multiplicand;
    // var span1 = document.getElementById("multiplier");
    // span1.textContent = multiplier;


    var table = document.getElementById("myTable");
    let n1 = set_bin(multiplicand);
    let n2 = set_bin(multiplier);
    // console.log(n1, n2,set_bin(multiplicand),set_bin(multiplier));
    // let n1 = set_bin(multiplicand);
    // let n2 = set_bin(multiplier);
    let m = Math.max(n1.length, n2.length);
    n1 = n1.padStart(m, '0');
    n2 = n2.padStart(m, '0');
    //set value of br and qr and br1=br'+1 
    let br = set_signed(multiplicand, n1);
    let qr = set_signed(multiplier, n2);
    let br1 = twos_complement(br);

    console.log('br                        :', br);
    var span2 = document.getElementById("br");
    span2.textContent = br;
    console.log('br\' ( in 2\'s complement ) :', br1);
    var span3 = document.getElementById("br1");
    span3.textContent = br1;
    console.log("qr                        :", qr, '\n');
    var span4 = document.getElementById("qr");
    span4.textContent = qr;


    //set Accumlator with 0
    let ac = '0'.repeat(m + 1);
    let qn1 = '0';
    let qn = qr.slice(-1);

    console.log('Qn\tQn+1\t\t', 'AC', '\t', 'QR', '\t', 'Qn+1', '\t', 'SC');
    // arow()
    console.log('----------------------------------------------------');
    console.log('\t\tInitial\t', ac, '\t', qr, '\t', qn1, '\t', m + 1);
    arow("", "", "Initial", ac, qr, qn1, m+1);



    for (let i = 0; i <= m; i++) {
        const qn = qr[qr.length - 1];
        var a=0;
        // Condition for Subtraction
        if (qn === '1' && qn1 === '0') {
            a=1;
            ac = addition(ac, br1);
            console.log(qn, '\t', qn1, '\tSub BR\t', br1, '\t\t\t');
            arow(qn, qn1, "Sub BR", br1, "", "", "");
            // arow("","","-----------","","","","");
            console.log('\t\t\t', ac, '\t', qr, '\t\t');
            arow("", "", "", ac, qr, "", "");


        }

        // Condition for Addition
        else if (qn === '0' && qn1 === '1') {
            a=1;
            ac = addition(ac, br);
            console.log(qn, '\t', qn1, '\tAdd BR\t', br, '\t\t\t');
            arow(qn, qn1, "Add BR", br, "", "", "");
            console.log('\t\t\t', ac, '\t', qr, '\t\t');
            arow("", "", "", ac, qr, "", "");

        }

        // Performing ASHR
        qn1 = qr[qr.length - 1];
        qr = ac[ac.length - 1] + qr.slice(0, m);
        ac = ac[0] + ac.slice(0, m);
        console.log('\t\tAshr\t', ac, '\t', qr, '\t', qn1, '\t', m - i);
            // arow("", "", "ashr", ac, qr, qn1,m-i);

        if (a==1) {
            arow("", "", "ashr", ac, qr, qn1, m-i);

        }
        else {
            arow(qn, qn1, "ashr", ac, qr, qn1,m-i);
        }
    }

    const ans = ac + qr;
    if (ans[0] === '1') {
        console.log('Result : ', ans);
        var span8 = document.getElementById("res");
        span8.textContent = ans;
        const twosComp = twos_complement(ans);
        console.log('Result in decimal: -', parseInt(twosComp, 2));
        var span9 = document.getElementById("dres");
        span9.textContent = '-'+parseInt(twosComp, 2);      
    } else {
        console.log('Result : ', ans);
        var span8 = document.getElementById("res");
        span8.textContent = ans;
        console.log('Result in decimal: ', parseInt(ans, 2));
        var span9 = document.getElementById("dres");
        span9.textContent = parseInt(ans, 2); 
    }
}


