const calculateBtn = document.getElementById("calculateBtn");
const historyDiv = document.getElementById("history");
const clearBtn = document.getElementById("clearHistory");

calculateBtn.addEventListener("click", calculateBMI);

clearBtn.addEventListener("click", () => {
    historyDiv.innerHTML = "";
});

function calculateBMI(){

    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value) / 100;

    if(!age || !weight || !height){
        alert("Please enter valid details");
        return;
    }

    const bmi = (weight / (height * height)).toFixed(1);

    document.getElementById("result").innerText = "Your BMI: " + bmi;

    const categoryDiv = document.getElementById("category");
    let category = "";

    if(bmi < 18.5){
        category = "Underweight";
        categoryDiv.className = "category underweight";
    }
    else if(bmi < 24.9){
        category = "Normal";
        categoryDiv.className = "category normal";
    }
    else if(bmi < 29.9){
        category = "Overweight";
        categoryDiv.className = "category overweight";
    }
    else{
        category = "Obese";
        categoryDiv.className = "category obese";
    }

    categoryDiv.innerText = category;

   
    const item = document.createElement("div");
    item.className = "history-item";
    item.innerText = `Age:${age}, Gender:${gender}, BMI:${bmi}, ${category}`;
    historyDiv.appendChild(item);

    drawGauge(bmi);
}


function drawGauge(bmi){

    const canvas = document.getElementById("bmiGauge");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    const centerX = canvas.width/2;
    const centerY = canvas.height/2;
    const radius = 90;

    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#ddd";
    ctx.stroke();

    let percent = Math.min(bmi,40)/40;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, Math.PI + Math.PI*percent);
    ctx.lineWidth = 20;

    if(bmi < 18.5) ctx.strokeStyle = "#ffc107";
    else if(bmi < 24.9) ctx.strokeStyle = "#2ecc71";
    else if(bmi < 29.9) ctx.strokeStyle = "#ff5722";
    else ctx.strokeStyle = "#f44336";

    ctx.stroke();

   
    ctx.font = "22px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(bmi, centerX, centerY+10);


   

    const barWidth = 220;
    const barHeight = 12;
    const startX = centerX - barWidth/2;
    const startY = centerY + 60;

    
    ctx.fillStyle = "#ffc107";
    ctx.fillRect(startX, startY, barWidth*0.25, barHeight);

    ctx.fillStyle = "#2ecc71";
    ctx.fillRect(startX + barWidth*0.25, startY, barWidth*0.25, barHeight);

    
    ctx.fillStyle = "#ff5722";
    ctx.fillRect(startX + barWidth*0.5, startY, barWidth*0.25, barHeight);

    
    ctx.fillStyle = "#f44336";
    ctx.fillRect(startX + barWidth*0.75, startY, barWidth*0.25, barHeight);


   
    let indicatorX = startX + (Math.min(bmi,40)/40) * barWidth;

    ctx.beginPath();
    ctx.moveTo(indicatorX, startY - 5);
    ctx.lineTo(indicatorX, startY + barHeight + 5);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    ctx.stroke();
}