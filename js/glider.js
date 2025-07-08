// Constants for the grid and animation
const CELL_SIZE = 12;
const CELL_SPACING = 3;
const TOTAL_CELL_SIZE = CELL_SIZE + CELL_SPACING;
const ANIMATION_SPEED = 150;

// Function to get theme-aware cell color
function getCellColor() {
    // Get the current theme's primary color
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    
    // Get the opposite theme's primary color by checking which theme is active
    const bodyClass = document.body.className;
    
    if (bodyClass.includes('theme-sandstone')) {
        // Currently on Sandstone theme, use Charcoal Coffee primary
        return getComputedStyle(document.documentElement).getPropertyValue('--sandstone-primary-color').trim();
    } else if (bodyClass.includes('theme-charcoal-coffee')) {
        // Currently on Charcoal Coffee theme, use Sandstone primary
        return getComputedStyle(document.documentElement).getPropertyValue('--charcoal-primary-color').trim();
    } else {
        // Fallback - default to Charcoal Coffee primary
        return getComputedStyle(document.documentElement).getPropertyValue('--charcoal-primary-color').trim();
    }
}

// All patterns
const GLIDER_PATTERNS = [
    // Down-right
    [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1]
    ],
    // Down-left
    [
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 1]
    ],
    // Up-right
    [
        [1, 1, 1],
        [0, 0, 1],
        [0, 1, 0]
    ],
    // Up-left
    [
        [1, 1, 1],
        [1, 0, 0],
        [0, 1, 0]
    ]
];

const BLINKER = [[1], [1], [1]]; // Vertical blinker
const BLOCK = [[1, 1], [1, 1]];  // 2x2 block

// Add toggle button function
function addToggleButton() {
    const button = document.createElement('div');
    button.textContent = ':)';
    button.id = 'conway-toggle';
    button.className = 'theme-toggle';
    const themeSelector = document.querySelector('.theme-selector');
    if (themeSelector) {
        themeSelector.appendChild(button);
    } else {
        document.body.appendChild(button);
    }
    return button;
}

class GameGrid {
    static instance = null;
    
    constructor() {
        if (GameGrid.instance) {
            return GameGrid.instance;
        }
        
        this.liveCells = new Set();
        this.container = document.createElement('div');
        this.container.style.position = 'absolute';
        this.container.style.left = '0';
        this.container.style.top = '0';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.pointerEvents = 'none';
        document.querySelector('main').appendChild(this.container);
        
        this.isActive = false;
        this.intervalId = null;
        GameGrid.instance = this; 
    }

    initializeStaticPatterns() {
        // Find the project element
        const projectLink = Array.from(document.querySelectorAll('a')).find(
            el => el.textContent.includes('Music by Conway')
        );

        if (projectLink) {
            const rect = projectLink.getBoundingClientRect();
            const baseX = Math.floor(rect.left / TOTAL_CELL_SIZE) * TOTAL_CELL_SIZE;
            const baseY = Math.floor((rect.top + window.scrollY) / TOTAL_CELL_SIZE) * TOTAL_CELL_SIZE;

            // Add blinkers around the link
            this.addPattern(BLINKER, baseX - TOTAL_CELL_SIZE * 4, baseY);
            this.addPattern(BLINKER, baseX + rect.width + TOTAL_CELL_SIZE * 3, baseY);

            // Add blocks in corners
            this.addPattern(BLOCK, baseX - TOTAL_CELL_SIZE * 4, baseY - TOTAL_CELL_SIZE * 3);
            this.addPattern(BLOCK, baseX + rect.width + TOTAL_CELL_SIZE * 3, baseY - TOTAL_CELL_SIZE * 3);
            this.addPattern(BLOCK, baseX - TOTAL_CELL_SIZE * 4, baseY + TOTAL_CELL_SIZE * 3);
            this.addPattern(BLOCK, baseX + rect.width + TOTAL_CELL_SIZE * 3, baseY + TOTAL_CELL_SIZE * 3);

            // Add more blinkers
            this.addPattern(BLINKER, baseX - TOTAL_CELL_SIZE * 4, baseY - TOTAL_CELL_SIZE * 6);
            this.addPattern(BLINKER, baseX + rect.width + TOTAL_CELL_SIZE * 3, baseY - TOTAL_CELL_SIZE * 6);
            this.addPattern(BLINKER, baseX - TOTAL_CELL_SIZE * 4, baseY + TOTAL_CELL_SIZE * 6);
            this.addPattern(BLINKER, baseX + rect.width + TOTAL_CELL_SIZE * 3, baseY + TOTAL_CELL_SIZE * 6);
        }
    }

    enable() {
        if (!this.isActive) {
            this.isActive = true;
            this.initializeStaticPatterns(); // Reinitialize patterns when activated
            this.intervalId = setInterval(() => this.step(), ANIMATION_SPEED);
            const button = document.getElementById('conway-toggle');
            if (button) button.textContent = ':o';
            document.addEventListener('click', this.handleClick);
        }
    }

    disable() {
        if (this.isActive) {
            this.isActive = false;
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
            const button = document.getElementById('conway-toggle');
            if (button) button.textContent = ':)';
            document.removeEventListener('click', this.handleClick);
            this.liveCells.clear();
            this.render();
        }
    }

    handleClick = (event) => {
        if (!this.isActive) return;
        const baseX = Math.floor(event.clientX / TOTAL_CELL_SIZE) * TOTAL_CELL_SIZE;
        const baseY = Math.floor((event.clientY + window.scrollY) / TOTAL_CELL_SIZE) * TOTAL_CELL_SIZE;
        
        const patternIndex = Math.floor(Math.random() * GLIDER_PATTERNS.length);
        const pattern = GLIDER_PATTERNS[patternIndex];
        
        this.addPattern(pattern, baseX, baseY);
    }

    addPattern(pattern, baseX, baseY) {
        pattern.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    this.liveCells.add(`${baseX + (x * TOTAL_CELL_SIZE)},${baseY + (y * TOTAL_CELL_SIZE)}`);
                }
            });
        });
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        
        for (let cellPos of this.liveCells) {
            const [x, y] = cellPos.split(',').map(Number);
            const cellElement = document.createElement('div');
            cellElement.style.position = 'absolute';
            cellElement.style.left = `${x}px`;
            cellElement.style.top = `${y}px`;
            cellElement.style.width = `${CELL_SIZE}px`;
            cellElement.style.height = `${CELL_SIZE}px`;
            cellElement.style.backgroundColor = getCellColor();
            this.container.appendChild(cellElement);
        }
    }

    getNeighbors(x, y) {
        const neighbors = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                neighbors.push(`${x + dx * TOTAL_CELL_SIZE},${y + dy * TOTAL_CELL_SIZE}`);
            }
        }
        return neighbors;
    }

    step() {
        const newCells = new Set();
        const candidates = new Set();
        
        for (let cellPos of this.liveCells) {
            const [x, y] = cellPos.split(',').map(Number);
            candidates.add(cellPos);
            this.getNeighbors(x, y).forEach(pos => candidates.add(pos));
        }

        for (let cellPos of candidates) {
            const [x, y] = cellPos.split(',').map(Number);
            const neighbors = this.getNeighbors(x, y);
            const liveNeighbors = neighbors.filter(pos => this.liveCells.has(pos)).length;

            if (this.liveCells.has(cellPos)) {
                if (liveNeighbors === 2 || liveNeighbors === 3) {
                    newCells.add(cellPos);
                }
            } else {
                if (liveNeighbors === 3) {
                    newCells.add(cellPos);
                }
            }
        }

        this.liveCells = newCells;
        this.render();

        const mainRect = document.querySelector('main').getBoundingClientRect();
        for (let cellPos of this.liveCells) {
            const [x, y] = cellPos.split(',').map(Number);
            if (x > mainRect.width || y > mainRect.height || x < 0 || y < 0) {
                this.liveCells.delete(cellPos);
            }
        }
    }
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const grid = new GameGrid();
    const toggleButton = addToggleButton();
    
    toggleButton.addEventListener('click', () => {
        if (grid.isActive) {
            grid.disable();
        } else {
            grid.enable();
        }
    });
});