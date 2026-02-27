// Game Configuration
const config = {
    gravity: 0.8,
    jumpForce: -15,
    moveSpeed: 5,
    levelWidth: 1500,
    coinValue: 10
};

// Game State
const state = {
    isPlaying: false,
    currentLevel: 1,
    score: 0,
    lives: 3,
    isJumping: false,
    isMovingLeft: false,
    isMovingRight: false,
    position: { x: 100, y: 100 },
    velocity: { x: 0, y: 0 },
    platforms: [],
    questionBlocks: [],
    skillBlocks: [],
    projectPlatforms: [],
    coins: [],
    backgroundOffset: 0
};

// DOM Elements
const elements = {
    startScreen: document.getElementById('start-screen'),
    gameContainer: document.getElementById('game-container'),
    gameOverScreen: document.getElementById('game-over-screen'),
    winScreen: document.getElementById('win-screen'),
    player: document.getElementById('player'),
    gameWorld: document.getElementById('game-world'),
    scoreDisplay: document.getElementById('score'),
    livesDisplay: document.getElementById('lives'),
    currentLevelDisplay: document.getElementById('current-level'),
    dialogueBox: document.getElementById('dialogue-box'),
    dialogueContent: document.getElementById('dialogue-content'),
    skillInfo: document.getElementById('skill-info'),
    skillTitle: document.getElementById('skill-title'),
    skillDetails: document.getElementById('skill-details'),
    skillProgress: document.getElementById('skill-progress'),
    projectModal: document.getElementById('project-modal'),
    projectTitle: document.getElementById('project-title'),
    projectDesc: document.getElementById('project-desc'),
    githubLink: document.getElementById('github-link'),
    liveDemo: document.getElementById('live-demo'),
    achievementModal: document.getElementById('achievement-modal'),
    achievementTitle: document.getElementById('achievement-title'),
    achievementDetails: document.getElementById('achievement-details'),
    coinsContainer: document.getElementById('coins-container'),
    bgMusic: document.getElementById('bg-music'),
    jumpSound: document.getElementById('jump-sound'),
    coinSound: document.getElementById('coin-sound'),
    blockSound: document.getElementById('block-sound')
};

// Audio Controls
const musicToggle = document.getElementById('music-toggle');
let isMusicEnabled = false;

// Input Handling
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    Space: false,
    Enter: false,
    KeyA: false,
    KeyD: false,
    KeyW: false
};

// Initialize Game
function init() {
    setupEventListeners();
    setupAudio();
    spawnCoins();
    optimizePerformance();
    animate();
}

// Event Listeners
function setupEventListeners() {
    // Start Game
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    document.getElementById('play-again-btn').addEventListener('click', restartGame);
    document.getElementById('view-traditional-btn').addEventListener('click', viewTraditional);
    
    // Music Toggle
    musicToggle.addEventListener('change', toggleMusic);
    
    // Keyboard Input
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Mouse Interactions
    setupInteractions();
    
    // Form Submission
    document.getElementById('contact-form').addEventListener('submit', handleContactForm);
    
    // Close Modals
    document.getElementById('close-project').addEventListener('click', closeProjectModal);
    document.getElementById('close-achievement').addEventListener('click', closeAchievementModal);
    
    // Contact Links
    document.getElementById('github-btn').addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://github.com/swarup-kumar-jena', '_blank');
    });
    
    document.getElementById('linkedin-btn').addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://linkedin.com/in/swarup-kumar-jena', '_blank');
    });
    
    document.getElementById('resume-btn').addEventListener('click', (e) => {
        e.preventDefault();
        // Download resume functionality
        alert('Resume download would happen here');
    });
}

function setupInteractions() {
    // Question Blocks
    document.querySelectorAll('.question-block').forEach(block => {
        block.addEventListener('click', () => hitQuestionBlock(block));
    });
    
    // Skill Blocks
    document.querySelectorAll('.skill-block').forEach(block => {
        block.addEventListener('click', () => revealSkill(block));
    });
    
    // Project Platforms
    document.querySelectorAll('.project-platform').forEach(platform => {
        platform.addEventListener('click', () => showProject(platform));
    });
    
    // Trophy Items
    document.querySelectorAll('.trophy-item').forEach(trophy => {
        trophy.addEventListener('click', () => showAchievement(trophy));
    });
}

function setupAudio() {
    // Preload audio
    elements.bgMusic.volume = 0.3;
    elements.jumpSound.volume = 0.5;
    elements.coinSound.volume = 0.7;
    elements.blockSound.volume = 0.5;
}

function optimizePerformance() {
    // Reduce layout thrashing by batching DOM reads/writes
    let rafId = null;
    let lastTime = 0;
    
    // Throttle collision detection
    const collisionThrottle = 16; // ~60fps
    
    // Optimize event listeners
    window.addEventListener('resize', debounce(updateResponsiveLayout, 250));
    
    // Prevent memory leaks
    window.addEventListener('beforeunload', cleanup);
    
    // Enable hardware acceleration for transforms
    elements.player.style.transform = 'translateZ(0)';
    elements.gameWorld.style.transform = 'translateZ(0)';
}

function updateResponsiveLayout() {
    // Adjust game world size for mobile devices
    const isMobile = window.innerWidth <= 768;
    const gameContainer = document.getElementById('game-container');
    
    if (isMobile) {
        gameContainer.style.height = '100vh';
        // Adjust player size for mobile
        elements.player.style.width = '30px';
        elements.player.style.height = '45px';
    } else {
        gameContainer.style.height = '100vh';
        elements.player.style.width = '40px';
        elements.player.style.height = '60px';
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function cleanup() {
    // Clean up audio
    if (elements.bgMusic) {
        elements.bgMusic.pause();
    }
    
    // Clean up event listeners (handled automatically on page unload)
    console.log('Game cleanup completed');
}

// Game Logic
function startGame() {
    state.isPlaying = true;
    state.score = 0;
    state.lives = 3;
    state.currentLevel = 1;
    state.position = { x: 100, y: 100 };
    state.velocity = { x: 0, y: 0 };
    
    updateHUD();
    showLevel(1);
    
    elements.startScreen.classList.remove('active');
    elements.startScreen.classList.add('hidden');
    elements.gameContainer.classList.add('active');
    elements.gameContainer.classList.remove('hidden');
    
    if (isMusicEnabled) {
        elements.bgMusic.play();
    }
}

function restartGame() {
    startGame();
}

function viewTraditional() {
    alert('Traditional portfolio view would open here');
}

function toggleMusic() {
    isMusicEnabled = musicToggle.checked;
    if (isMusicEnabled) {
        elements.bgMusic.play();
    } else {
        elements.bgMusic.pause();
    }
}

// Player Movement
function handleKeyDown(e) {
    if (!state.isPlaying) return;
    
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        state.isMovingLeft = true;
    }
    if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        state.isMovingRight = true;
    }
    if (e.code === 'ArrowUp' || e.code === 'Space' || e.code === 'KeyW') {
        if (!state.isJumping) {
            jump();
        }
    }
    if (e.code === 'Enter') {
        interact();
    }
}

function handleKeyUp(e) {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        state.isMovingLeft = false;
    }
    if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        state.isMovingRight = false;
    }
}

function jump() {
    state.velocity.y = config.jumpForce;
    state.isJumping = true;
    playSound(elements.jumpSound);
}

function movePlayer() {
    // Horizontal Movement
    if (state.isMovingLeft) {
        state.position.x -= config.moveSpeed;
        elements.player.style.transform = 'scaleX(-1)'; // Face left
    }
    if (state.isMovingRight) {
        state.position.x += config.moveSpeed;
        elements.player.style.transform = 'scaleX(1)'; // Face right
    }
    
    // Apply Gravity
    state.velocity.y += config.gravity;
    state.position.y += state.velocity.y;
    
    // Boundary Checks
    if (state.position.x < 0) state.position.x = 0;
    if (state.position.x > config.levelWidth - 40) state.position.x = config.levelWidth - 40;
    if (state.position.y > window.innerHeight) {
        loseLife();
    }
    
    // Update Player Position
    elements.player.style.left = state.position.x + 'px';
    elements.player.style.bottom = state.position.y + 'px';
    
    // Check Collisions
    checkCollisions();
}

function checkCollisions() {
    const playerRect = elements.player.getBoundingClientRect();
    
    // Platform Collisions
    const platforms = document.querySelectorAll('.platform');
    let onGround = false;
    
    platforms.forEach(platform => {
        const platformRect = platform.getBoundingClientRect();
        
        // Check if player is above platform and falling
        if (playerRect.bottom >= platformRect.top && 
            playerRect.bottom <= platformRect.top + 10 &&
            playerRect.right > platformRect.left &&
            playerRect.left < platformRect.right) {
            
            if (state.velocity.y > 0) {
                state.position.y = platformRect.top - playerRect.height;
                state.velocity.y = 0;
                state.isJumping = false;
                onGround = true;
            }
        }
    });
    
    // Coin Collisions
    const coins = document.querySelectorAll('.coin');
    coins.forEach(coin => {
        if (!coin.classList.contains('collected')) {
            const coinRect = coin.getBoundingClientRect();
            if (isColliding(playerRect, coinRect)) {
                collectCoin(coin);
            }
        }
    });
    
    // Level Transition
    if (state.position.x > config.levelWidth - 100) {
        nextLevel();
    }
}

function isColliding(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function collectCoin(coin) {
    coin.classList.add('collected');
    coin.style.opacity = '0';
    state.score += config.coinValue;
    updateHUD();
    playSound(elements.coinSound);
}

function loseLife() {
    state.lives--;
    updateHUD();
    
    if (state.lives <= 0) {
        gameOver();
    } else {
        // Reset position
        state.position = { x: 100, y: 100 };
        state.velocity = { x: 0, y: 0 };
        elements.player.style.left = state.position.x + 'px';
        elements.player.style.bottom = state.position.y + 'px';
    }
}

function gameOver() {
    state.isPlaying = false;
    elements.bgMusic.pause();
    elements.gameOverScreen.classList.add('active');
    elements.gameOverScreen.classList.remove('hidden');
}

function nextLevel() {
    if (state.currentLevel < 5) {
        state.currentLevel++;
        showLevel(state.currentLevel);
        state.position = { x: 100, y: 100 };
        state.velocity = { x: 0, y: 0 };
        elements.player.style.left = state.position.x + 'px';
        elements.player.style.bottom = state.position.y + 'px';
    } else {
        winGame();
    }
}

function winGame() {
    state.isPlaying = false;
    elements.bgMusic.pause();
    document.getElementById('final-score').textContent = state.score;
    elements.winScreen.classList.add('active');
    elements.winScreen.classList.remove('hidden');
}

// Level Management
function showLevel(levelNum) {
    // Hide all levels
    document.querySelectorAll('.level').forEach(level => {
        level.classList.add('hidden');
        level.classList.remove('active');
    });
    
    // Show current level
    const level = document.getElementById(`level-${levelNum}`);
    level.classList.remove('hidden');
    level.classList.add('active');
    
    // Update HUD
    state.currentLevel = levelNum;
    elements.currentLevelDisplay.textContent = level.getAttribute('data-level-name');
    
    // Reset level-specific elements
    resetLevelElements(levelNum);
}

function resetLevelElements(levelNum) {
    // Reset question blocks
    if (levelNum === 1) {
        document.querySelectorAll('.question-block').forEach(block => {
            block.classList.remove('hit');
        });
        elements.dialogueBox.classList.add('hidden');
    }
    
    // Reset skill blocks
    if (levelNum === 2) {
        elements.skillInfo.classList.add('hidden');
    }
    
    // Reset project modal
    if (levelNum === 3) {
        elements.projectModal.classList.add('hidden');
    }
    
    // Reset achievement modal
    if (levelNum === 4) {
        elements.achievementModal.classList.add('hidden');
    }
}

// Interactive Elements
function hitQuestionBlock(block) {
    if (block.classList.contains('hit')) return;
    
    block.classList.add('hit');
    playSound(elements.blockSound);
    
    const info = block.getAttribute('data-info');
    elements.dialogueContent.textContent = info;
    elements.dialogueBox.classList.remove('hidden');
}

function revealSkill(block) {
    const skillName = block.getAttribute('data-skill');
    const skillData = getSkillData(skillName);
    
    elements.skillTitle.textContent = skillName;
    elements.skillDetails.textContent = skillData.description;
    elements.skillProgress.style.width = skillData.level + '%';
    elements.skillInfo.classList.remove('hidden');
    
    // Animate skill block
    block.style.transform = 'scale(1.2)';
    setTimeout(() => {
        block.style.transform = 'scale(1)';
    }, 200);
}

function showProject(platform) {
    const projectId = platform.getAttribute('data-project');
    const projectData = getProjectData(projectId);
    
    elements.projectTitle.textContent = projectData.title;
    elements.projectDesc.textContent = projectData.description;
    elements.githubLink.href = projectData.github;
    elements.liveDemo.href = projectData.live;
    
    elements.projectModal.classList.remove('hidden');
}

function showAchievement(trophy) {
    const achievementId = trophy.getAttribute('data-achievement');
    const achievementData = getAchievementData(achievementId);
    
    elements.achievementTitle.textContent = achievementData.title;
    elements.achievementDetails.textContent = achievementData.description;
    
    elements.achievementModal.classList.remove('hidden');
}

// Data Functions
function getSkillData(skillName) {
    const skills = {
        'Python': {
            description: 'Expert in Python programming with experience in web development, automation, and data analysis. Proficient with Django, Flask, and various Python libraries.',
            level: 85
        },
        'JavaScript': {
            description: 'Strong JavaScript skills with experience in modern frameworks and libraries. Experienced in both frontend and backend development.',
            level: 80
        },
        'CSS': {
            description: 'Advanced CSS skills including modern layouts, animations, and responsive design. Expert in CSS Grid, Flexbox, and preprocessors.',
            level: 90
        },
        'HTML': {
            description: 'Semantic HTML5 markup with accessibility best practices. Strong foundation in web standards and SEO principles.',
            level: 95
        },
        'Web Dev': {
            description: 'Full-stack web development experience with modern tools and frameworks. Skilled in creating responsive, user-friendly applications.',
            level: 85
        },
        'Security': {
            description: 'Cybersecurity knowledge gained from IIT Kharagpur workshop. Understanding of security best practices and defensive techniques.',
            level: 75
        }
    };
    return skills[skillName] || { description: 'Skill details coming soon!', level: 50 };
}

function getProjectData(projectId) {
    const projects = {
        'project1': {
            title: 'Portfolio Website',
            description: 'Interactive portfolio website built with HTML, CSS, and JavaScript. Features responsive design and modern UI elements.',
            github: 'https://github.com/swarup-kumar-jena/portfolio',
            live: 'https://swarup-kumar-jena.github.io/portfolio'
        },
        'project2': {
            title: 'Security Scanner',
            description: 'Python-based security scanning tool that identifies common vulnerabilities in web applications.',
            github: 'https://github.com/swarup-kumar-jena/security-scanner',
            live: '#'
        },
        'project3': {
            title: 'Game Project',
            description: '2D platformer game built with JavaScript and Canvas API. Features physics, animations, and multiple levels.',
            github: 'https://github.com/swarup-kumar-jena/game-project',
            live: 'https://swarup-kumar-jena.github.io/game-project'
        }
    };
    return projects[projectId] || {
        title: 'Project Title',
        description: 'Project description coming soon.',
        github: '#',
        live: '#'
    };
}

function getAchievementData(achievementId) {
    const achievements = {
        'iit-cert': {
            title: 'IIT Kharagpur Cyber Security Workshop',
            description: 'Successfully completed the Cyber Security Workshop conducted by IIT Kharagpur. Gained valuable insights into security best practices, defensive techniques, and modern cybersecurity challenges.'
        },
        'coding-badge': {
            title: 'Code Master',
            description: 'Achieved over 1000 hours of coding experience across various projects and learning modules. Demonstrates dedication to continuous learning and skill development.'
        },
        'web-dev': {
            title: 'Web Development Pro',
            description: 'Completed 5 major web development projects showcasing proficiency in modern web technologies, responsive design, and user experience principles.'
        }
    };
    return achievements[achievementId] || {
        title: 'Achievement',
        description: 'Achievement details coming soon.'
    };
}

// Modal Controls
function closeProjectModal() {
    elements.projectModal.classList.add('hidden');
}

function closeAchievementModal() {
    elements.achievementModal.classList.add('hidden');
}

// Forms and Interactions
function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real application, this would send to a backend
    alert(`Thank you, ${name}! Your message has been sent.`);
    
    // Reset form
    e.target.reset();
}

function interact() {
    // Handle Enter key interactions
    if (elements.dialogueBox.classList.contains('hidden')) {
        // Look for nearby interactive elements
        const playerRect = elements.player.getBoundingClientRect();
        const blocks = document.querySelectorAll('.question-block');
        
        for (let block of blocks) {
            const blockRect = block.getBoundingClientRect();
            if (Math.abs(playerRect.left - blockRect.right) < 50 || 
                Math.abs(playerRect.right - blockRect.left) < 50) {
                hitQuestionBlock(block);
                break;
            }
        }
    } else {
        elements.dialogueBox.classList.add('hidden');
    }
}

// Audio and Visual Effects
function playSound(sound) {
    if (isMusicEnabled) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Audio play prevented:', e));
    }
}

function spawnCoins() {
    // Create coins for each level
    const coinPositions = [
        { x: 200, y: 150 }, { x: 300, y: 150 }, { x: 400, y: 150 },
        { x: 600, y: 200 }, { x: 700, y: 200 }, { x: 800, y: 200 },
        { x: 1000, y: 150 }, { x: 1100, y: 150 }, { x: 1200, y: 150 }
    ];
    
    coinPositions.forEach(pos => {
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.style.left = pos.x + 'px';
        coin.style.bottom = pos.y + 'px';
        elements.coinsContainer.appendChild(coin);
    });
}

// HUD Updates
function updateHUD() {
    elements.scoreDisplay.textContent = state.score;
    elements.livesDisplay.textContent = state.lives;
}

// Game Loop
function animate() {
    if (state.isPlaying) {
        movePlayer();
    }
    
    requestAnimationFrame(animate);
}

// Initialize Game
init();