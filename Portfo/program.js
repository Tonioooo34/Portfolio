console.log(document.getElementById("text1"))

const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "Du Design Graphique.",
    "De l'Animation 3D.",
    "Du Motion Design.",
    "De l'Ui/Ux Design.",
    "Du Prototypage.",

];

const morphTime = 1;
const cooldownTime = 0.7;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

console.log(elts,texts,texts[textIndex % texts.length])
elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();



const cardDiv = document.getElementById('cardDiv');
const imgCard = document.getElementById('card2');



cardDiv.addEventListener('mouseenter', (e) => {
    bounds = cardDiv.getBoundingClientRect();
    rotateToMouse(e)
    document.addEventListener('mousemove', rotateToMouse);
});
  
cardDiv.addEventListener('mouseleave', () => {
    document.removeEventListener('mousemove', rotateToMouse);
    cardDiv.style.transform = '';
    cardDiv.style.background = '';
    imgCard.style.filter = `
        drop-shadow(5px 5px 20px rgb(100, 100, 100))
    `;
});



function rotateToMouse(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2
    }
    const distance = Math.sqrt(center.x**2 + center.y**2);

    cardDiv.style.transform = `
        perspective(50em)
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
            ${center.y / 100},
            ${-center.x / 100},
            0,
            ${Math.log(distance)* 2}deg
        )
    `
    //filter: drop-shadow(10px 10px 20px rgb(85, 85, 85));
    imgCard.style.filter = `
        drop-shadow(5px 5px 15px rgb(50, 50, 50))
    `;
  }


  document.addEventListener("mousemove", function(event) {
    const x = event.clientX - 20;
    const y = event.clientY - 20;
    const cursor = document.querySelector("#cursor");
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
  });

  document.addEventListener("scroll", function(event) {
    const cursor = document.querySelector("#cursor");
    cursor.style.left = event.clientX;
    cursor.style.top = event.clientY;
  });
  
  document.addEventListener("mousedown",function(event) {
    document.getElementById("cursor").style.transform = 'scale(0.5)';
  })

  document.addEventListener("mouseup",function(event) {
    document.getElementById("cursor").style.transform = 'scale(1)';
  })

