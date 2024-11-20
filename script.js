// Randomized texts for greeting
const randomMessages = [
    "Niceeeeee!",
    "GOOOO!",
    "let thy anger out!",
    "Take it out on that bitch!",
    "Keep going, you're doing great!",
    "punch that mf!",
    "Let's gooooo!",
    "You got this, kill it!"
];

let hp = 100; // Starting HP
let injuryStage = 0;
let isGameOver = false;

document.getElementById('submitBtn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    if (name) {
        // Randomly select a message for greeting
        const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        document.getElementById('greeting').textContent = `${randomMessage}`;
        document.getElementById('namePrompt').style.display = 'none';
        document.getElementById('smileyContainer').style.display = 'block';
        updateHPBar();
    }
});

// Function to update HP bar
function updateHPBar() {
    const hpBar = document.getElementById('hpBar');
    const hpPercentage = hp + '%';
    hpBar.innerHTML = `<span style="width: ${hpPercentage}"></span>`;
}

function punchSmiley(event) {
    if (isGameOver) return; // Prevent further clicks if game is over

    const smiley = document.getElementById('smiley');
    const punchMark = document.getElementById('punchMark');
    const emojiWrapper = document.getElementById('emojiWrapper');

    // Generate random position for the punch within the emoji's container
    const maxX = emojiWrapper.offsetWidth - 50;
    const maxY = emojiWrapper.offsetHeight - 50;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Position the punch mark at the random coordinates
    punchMark.style.left = `${randomX}px`;
    punchMark.style.top = `${randomY}px`;

    // Make punchMark visible and hide it after a brief moment
    punchMark.classList.add('show');
    setTimeout(() => {
        punchMark.classList.remove('show');
    }, 300);

    // Randomize the greeting text every click
    const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    document.getElementById('greeting').textContent = `${randomMessage}`;

    // Reduce HP by 10 on each click
    hp -= 5;
    updateHPBar();

    // Check if HP is depleted
    if (hp <= 0) {
        smiley.textContent = "💀"; // Change to 💀 emoji when HP is 0
        isGameOver = true;
        document.getElementById('greeting').textContent = "You killed that bish.";
    } else {
        // Increment injury stage and update smiley emoji
        if (injuryStage < 15) {
            setTimeout(() => {
                injuryStage++;

                if (injuryStage === 1) {
                    smiley.textContent = "😐";  // Slightly hurt
                } else if (injuryStage === 10) {
                    smiley.textContent = "🥴";  // More hurt
                } else if (injuryStage === 14) {
                    smiley.textContent = "🤕";  // Seriously hurt
                }
            }, 500); // Delay before moving to the next stage
        }
    }
}

// Fire background effect
function createFireEffect() {
    const fireBackground = document.getElementById('fireBackground');
    for (let i = 0; i < 10; i++) {
        const fire = document.createElement('span');
        fire.textContent = "🔥";
        fire.style.animationDuration = `${Math.random() * 3 + 2}s`;
        fireBackground.appendChild(fire);
    }
}

// Call fire effect when page loads
createFireEffect();
