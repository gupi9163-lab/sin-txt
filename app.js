// ========================================
// GLOBAL STATE
// ========================================
let deferredPrompt;
let currentScrollPosition = 0;
let navigationHistory = [];

// ========================================
// SERVICE WORKER REGISTRATION
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker available, reload page
                            newWorker.postMessage({ type: 'SKIP_WAITING' });
                            window.location.reload();
                        }
                    });
                });
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
        
        // Handle service worker updates
        let refreshing;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (refreshing) return;
            refreshing = true;
            window.location.reload();
        });
    });
}

// ========================================
// PWA INSTALL PROMPT
// ========================================
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Check if already installed
    if (!window.matchMedia('(display-mode: standalone)').matches) {
        showInstallPrompt();
    }
});

function showInstallPrompt() {
    const installPrompt = document.getElementById('installPrompt');
    const installButton = document.getElementById('installButton');
    
    if (installPrompt) {
        installPrompt.classList.remove('hidden');
        
        installButton.addEventListener('click', async () => {
            if (!deferredPrompt) return;
            
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                installPrompt.classList.add('hidden');
                localStorage.setItem('pwa-installed', 'true');
            }
            
            deferredPrompt = null;
        });
    }
}

// Hide install button if already installed
window.addEventListener('appinstalled', () => {
    document.getElementById('installPrompt').classList.add('hidden');
    localStorage.setItem('pwa-installed', 'true');
});

// Check if running as installed PWA
if (window.matchMedia('(display-mode: standalone)').matches || localStorage.getItem('pwa-installed') === 'true') {
    document.getElementById('installPrompt').classList.add('hidden');
}

// ========================================
// iOS INSTALL INFO
// ========================================
function checkiOS() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.navigator.standalone === true;
    
    if (isIOS && !isStandalone && localStorage.getItem('pwa-installed') !== 'true') {
        document.getElementById('iosInstallInfo').classList.remove('hidden');
    }
}

window.addEventListener('load', checkiOS);

// ========================================
// NAVIGATION FUNCTIONS
// ========================================
function showSection(sectionId) {
    // Save scroll position
    currentScrollPosition = window.scrollY;
    
    // Hide main menu
    document.getElementById('mainMenu').classList.add('hidden');
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
        
        // Add to navigation history
        navigationHistory.push({
            section: sectionId,
            scrollPosition: currentScrollPosition
        });
        
        // Scroll to top of section
        window.scrollTo(0, 0);
    }
}

function goBack() {
    const buraxilisSection = document.getElementById('buraxilis');
    const blokSection = document.getElementById('blok');
    
    // Check if we're in buraxilis calculator 9
    if (!buraxilisSection.classList.contains('hidden')) {
        const calculator9 = document.getElementById('buraxilisCalculator9');
        const calculator11 = document.getElementById('buraxilisCalculator11');
        const classSelect = document.getElementById('buraxilisClassSelect');
        
        if (!calculator9.classList.contains('hidden')) {
            // Return to class select
            calculator9.classList.add('hidden');
            classSelect.classList.remove('hidden');
            navigationHistory.pop();
            return;
        }
        
        if (!calculator11.classList.contains('hidden')) {
            // Return to class select
            calculator11.classList.add('hidden');
            classSelect.classList.remove('hidden');
            navigationHistory.pop();
            return;
        }
    }
    
    // Check if we're in blok calculator or subgroup
    if (!blokSection.classList.contains('hidden')) {
        const calculator = document.getElementById('blokCalculator');
        const subGroupSelect = document.getElementById('blokSubGroupSelect');
        const groupSelect = document.getElementById('blokGroupSelect');
        
        if (!calculator.classList.contains('hidden')) {
            // Return to sub-group select or group select
            calculator.classList.add('hidden');
            
            if (blokGroupData[selectedBlokGroup].subGroups) {
                subGroupSelect.classList.remove('hidden');
            } else {
                groupSelect.classList.remove('hidden');
            }
            navigationHistory.pop();
            return;
        }
        
        if (!subGroupSelect.classList.contains('hidden')) {
            // Return to group select
            subGroupSelect.classList.add('hidden');
            groupSelect.classList.remove('hidden');
            navigationHistory.pop();
            return;
        }
    }
    
    // Remove current page from history
    navigationHistory.pop();
    
    if (navigationHistory.length === 0) {
        // Return to main menu
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById('mainMenu').classList.remove('hidden');
        
        // Restore scroll position
        setTimeout(() => {
            window.scrollTo(0, currentScrollPosition);
        }, 0);
    } else {
        // Return to previous page in history
        const previousPage = navigationHistory[navigationHistory.length - 1];
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Show previous section
        const previousSection = document.getElementById(previousPage.section);
        if (previousSection) {
            previousSection.classList.remove('hidden');
            
            // Restore scroll position
            setTimeout(() => {
                window.scrollTo(0, previousPage.scrollPosition);
            }, 0);
        }
    }
}

// ========================================
// BURAXILIŞ BAL HESABLAMA - 9-CU SİNİF
// ========================================
function selectBuraxilisClass9() {
    // Hide class select
    document.getElementById('buraxilisClassSelect').classList.add('hidden');
    
    // Show 9-cu sinif calculator
    const calculator = document.getElementById('buraxilisCalculator9');
    calculator.classList.remove('hidden');
    
    // Reset inputs
    document.getElementById('azQapali9').value = '';
    document.getElementById('azAciq9').value = '';
    document.getElementById('riyQapali9').value = '';
    document.getElementById('riyAciq9').value = '';
    document.getElementById('riyEtrafli9').value = '';
    document.getElementById('xariciSecim9').value = '';
    document.getElementById('xariciQapali9').value = '';
    document.getElementById('xariciAciq9').value = '';
    document.getElementById('xariciYazili9').value = '';
    
    // Set placeholders
    document.getElementById('azQapali9').placeholder = '0';
    document.getElementById('azAciq9').placeholder = '0';
    document.getElementById('riyQapali9').placeholder = '0';
    document.getElementById('riyAciq9').placeholder = '0';
    document.getElementById('riyEtrafli9').placeholder = '0';
    document.getElementById('xariciSecim9').placeholder = '0';
    document.getElementById('xariciQapali9').placeholder = '0';
    document.getElementById('xariciAciq9').placeholder = '0';
    document.getElementById('xariciYazili9').placeholder = '0';
    
    // Hide result
    document.getElementById('buraxilisResult9').classList.add('hidden');
    
    // Save navigation state
    navigationHistory.push({
        section: 'buraxilis',
        subsection: 'calculator9',
        scrollPosition: 0
    });
}

function calculateBuraxilis9() {
    // Get input values
    const azQapali = parseInt(document.getElementById('azQapali9').value) || 0;
    const azAciq = parseInt(document.getElementById('azAciq9').value) || 0;
    const riyQapali = parseInt(document.getElementById('riyQapali9').value) || 0;
    const riyAciq = parseInt(document.getElementById('riyAciq9').value) || 0;
    const riyEtrafli = parseInt(document.getElementById('riyEtrafli9').value) || 0;
    const xariciSecim = parseInt(document.getElementById('xariciSecim9').value) || 0;
    const xariciQapali = parseInt(document.getElementById('xariciQapali9').value) || 0;
    const xariciAciq = parseInt(document.getElementById('xariciAciq9').value) || 0;
    const xariciYazili = parseFloat(document.getElementById('xariciYazili9').value) || 0;
    
    // Validate Azərbaycan dili
    if (azQapali > 20 || azAciq > 10) {
        alert('Azərbaycan dili: Qapalı max 20, Açıq max 10!');
        return;
    }
    
    // Validate Riyaziyyat
    if (riyQapali > 13 || riyAciq > 5 || riyEtrafli > 7) {
        alert('Riyaziyyat: Qapalı max 13, Açıq max 5, Ətraflı max 7!');
        return;
    }
    
    // Validate Xarici dil (9-cu sinif)
    if (xariciSecim > 4 || xariciQapali > 22 || xariciAciq > 2 || xariciYazili < 0 || xariciYazili > 5) {
        alert('Xarici dil: Seçim max 4, Qapalı max 22, Açıq max 2, Yazılı 0-5 aralığında!');
        return;
    }
    
    // Calculate Azərbaycan dili: 2.5 * (2*açıq + qapalı)
    let azScore = 2.5 * (2 * azAciq + azQapali);
    azScore = Math.min(azScore, 100);
    
    // Calculate Riyaziyyat: 3.125 * (2*ətraflı + açıq + qapalı)
    let riyScore = 3.125 * (2 * riyEtrafli + riyAciq + riyQapali);
    riyScore = Math.min(riyScore, 100);
    
    // Calculate Xarici dil (9-cu sinif düsturu)
    // Seçim balı hesabla
    let secimScore = 0;
    if (xariciSecim === 4) {
        secimScore = 1;
    } else if (xariciSecim === 3) {
        secimScore = 0.5;
    } else {
        secimScore = 0;
    }
    
    // Xarici dil: Seçim (1 bal) + Açıq (2×2=4 bal) + Qapalı (22×1=22 bal) + Yazılı (0-5 bal) = max 32 bal
    const xariciRawScore = secimScore + (xariciAciq * 2) + (xariciQapali * 1) + xariciYazili;
    
    // Düstur: (cəmi × 100) ÷ 30
    let xariciScore = (xariciRawScore * 100) / 30;
    xariciScore = Math.min(xariciScore, 100);
    
    // Total score
    let totalScore = azScore + riyScore + xariciScore;
    totalScore = Math.min(totalScore, 300);
    
    // Determine grade
    let grade = '';
    let gradeClass = '';
    
    if (totalScore === 0) {
        grade = '0 BAL';
        gradeClass = 'weak';
    } else if (totalScore >= 300) {
        grade = 'MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ';
        gradeClass = 'excellent';
    } else if (totalScore >= 250) {
        grade = 'ÇOX YAXŞI';
        gradeClass = 'very-good';
    } else if (totalScore >= 160) {
        grade = 'YAXŞI';
        gradeClass = 'good';
    } else if (totalScore >= 140) {
        grade = 'KAFİ';
        gradeClass = 'sufficient';
    } else if (totalScore >= 120) {
        grade = 'ZƏİF';
        gradeClass = 'weak';
    } else {
        grade = 'YAXŞI OLACAQ';
        gradeClass = 'weak';
    }
    
    // Display result
    const resultDiv = document.getElementById('buraxilisResult9');
    resultDiv.innerHTML = `
        <div class="result-stats">
            <h4>Fənlər üzrə ballar:</h4>
            <div class="stat-item">
                <span class="stat-label">Azərbaycan dili:</span>
                <span class="stat-value">${azScore.toFixed(2)}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Riyaziyyat:</span>
                <span class="stat-value">${riyScore.toFixed(2)}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Xarici dil:</span>
                <span class="stat-value">${xariciScore.toFixed(2)}</span>
            </div>
        </div>
        <div class="result-total">
            <div class="result-total-label">Ümumi bal</div>
            <div class="result-total-value">${totalScore.toFixed(2)}</div>
            <div class="result-total-label">/ 300</div>
        </div>
        <div class="result-grade ${gradeClass}">
            ${grade}
        </div>
    `;
    
    resultDiv.classList.remove('hidden');
    
    // Scroll to result
    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// ========================================
// BURAXILIŞ BAL HESABLAMA - 11-Cİ SİNİF
// ========================================
function selectBuraxilisClass11() {
    // Hide class select
    document.getElementById('buraxilisClassSelect').classList.add('hidden');
    
    // Show 11-ci sinif calculator
    const calculator = document.getElementById('buraxilisCalculator11');
    calculator.classList.remove('hidden');
    
    // Reset inputs
    document.getElementById('azQapali11').value = '';
    document.getElementById('azAciq11').value = '';
    document.getElementById('riyQapali11').value = '';
    document.getElementById('riyAciq11').value = '';
    document.getElementById('riyEtrafli11').value = '';
    document.getElementById('xariciQapali11').value = '';
    document.getElementById('xariciAciq11').value = '';
    
    // Set placeholders
    document.getElementById('azQapali11').placeholder = '0';
    document.getElementById('azAciq11').placeholder = '0';
    document.getElementById('riyQapali11').placeholder = '0';
    document.getElementById('riyAciq11').placeholder = '0';
    document.getElementById('riyEtrafli11').placeholder = '0';
    document.getElementById('xariciQapali11').placeholder = '0';
    document.getElementById('xariciAciq11').placeholder = '0';
    
    // Hide result
    document.getElementById('buraxilisResult11').classList.add('hidden');
    
    // Save navigation state
    navigationHistory.push({
        section: 'buraxilis',
        subsection: 'calculator11',
        scrollPosition: 0
    });
}

function calculateBuraxilis11() {
    // Get input values
    const azQapali = parseInt(document.getElementById('azQapali11').value) || 0;
    const azAciq = parseInt(document.getElementById('azAciq11').value) || 0;
    const riyQapali = parseInt(document.getElementById('riyQapali11').value) || 0;
    const riyAciq = parseInt(document.getElementById('riyAciq11').value) || 0;
    const riyEtrafli = parseInt(document.getElementById('riyEtrafli11').value) || 0;
    const xariciQapali = parseInt(document.getElementById('xariciQapali11').value) || 0;
    const xariciAciq = parseInt(document.getElementById('xariciAciq11').value) || 0;
    
    // Validate Azərbaycan dili
    if (azQapali > 20 || azAciq > 10) {
        alert('Azərbaycan dili: Qapalı max 20, Açıq max 10!');
        return;
    }
    
    // Validate Riyaziyyat
    if (riyQapali > 13 || riyAciq > 5 || riyEtrafli > 7) {
        alert('Riyaziyyat: Qapalı max 13, Açıq max 5, Ətraflı max 7!');
        return;
    }
    
    // Validate Xarici dil (11-ci sinif)
    if (xariciQapali > 23 || xariciAciq > 7) {
        alert('Xarici dil: Qapalı max 23, Açıq max 7!');
        return;
    }
    
    // Calculate Azərbaycan dili: 2.5 * (2*açıq + qapalı)
    let azScore = 2.5 * (2 * azAciq + azQapali);
    azScore = Math.min(azScore, 100);
    
    // Calculate Riyaziyyat: 3.125 * (2*ətraflı + açıq + qapalı)
    let riyScore = 3.125 * (2 * riyEtrafli + riyAciq + riyQapali);
    riyScore = Math.min(riyScore, 100);
    
    // Calculate Xarici dil (11-ci sinif düsturu)
    let xariciScore;
    
    // Mükəmməl cavab yoxlaması: 23 qapalı və 7 açıq = 100 bal
    if (xariciQapali === 23 && xariciAciq === 7) {
        xariciScore = 100;
    } else {
        // Düstur: 2.7 × (2×açıq + qapalı)
        xariciScore = 2.7 * (2 * xariciAciq + xariciQapali);
        xariciScore = Math.min(xariciScore, 100);
    }
    
    // Total score
    let totalScore = azScore + riyScore + xariciScore;
    totalScore = Math.min(totalScore, 300);
    
    // Determine grade
    let grade = '';
    let gradeClass = '';
    
    if (totalScore === 0) {
        grade = '0 BAL';
        gradeClass = 'weak';
    } else if (totalScore >= 300) {
        grade = 'MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ';
        gradeClass = 'excellent';
    } else if (totalScore >= 250) {
        grade = 'ÇOX YAXŞI';
        gradeClass = 'very-good';
    } else if (totalScore >= 160) {
        grade = 'YAXŞI';
        gradeClass = 'good';
    } else if (totalScore >= 140) {
        grade = 'KAFİ';
        gradeClass = 'sufficient';
    } else if (totalScore >= 120) {
        grade = 'ZƏİF';
        gradeClass = 'weak';
    } else {
        grade = 'YAXŞI OLACAQ';
        gradeClass = 'weak';
    }
    
    // Display result
    const resultDiv = document.getElementById('buraxilisResult11');
    resultDiv.innerHTML = `
        <div class="result-stats">
            <h4>Fənlər üzrə ballar:</h4>
            <div class="stat-item">
                <span class="stat-label">Azərbaycan dili:</span>
                <span class="stat-value">${azScore.toFixed(2)}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Riyaziyyat:</span>
                <span class="stat-value">${riyScore.toFixed(2)}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Xarici dil:</span>
                <span class="stat-value">${xariciScore.toFixed(2)}</span>
            </div>
        </div>
        <div class="result-total">
            <div class="result-total-label">Ümumi bal</div>
            <div class="result-total-value">${totalScore.toFixed(2)}</div>
            <div class="result-total-label">/ 300</div>
        </div>
        <div class="result-grade ${gradeClass}">
            ${grade}
        </div>
    `;
    
    resultDiv.classList.remove('hidden');
    
    // Scroll to result
    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// ========================================
// BLOK BAL HESABLAMA
// ========================================
let selectedBlokGroup = null;
let selectedBlokSubGroup = null;
let blokSubjects = [];

const blokGroupData = {
    1: {
        name: '1-ci qrup',
        subGroups: {
            'RI': { name: 'Rİ', subjects: ['Riyaziyyat', 'Fizika', 'İnformatika'], maxScores: [150, 150, 100] },
            'RK': { name: 'RK', subjects: ['Riyaziyyat', 'Fizika', 'Kimya'], maxScores: [150, 150, 100] }
        }
    },
    2: {
        name: '2-ci qrup',
        subjects: ['Riyaziyyat', 'Tarix', 'Coğrafiya'],
        maxScores: [150, 150, 100]
    },
    3: {
        name: '3-cü qrup',
        subGroups: {
            'DT': { name: 'DT', subjects: ['Azərbaycan dili', 'Tarix', 'Ədəbiyyat'], maxScores: [150, 150, 100] },
            'TC': { name: 'TC', subjects: ['Azərbaycan dili', 'Tarix', 'Coğrafiya'], maxScores: [150, 150, 100] }
        }
    },
    4: {
        name: '4-cü qrup',
        subjects: ['Biologiya', 'Kimya', 'Fizika'],
        maxScores: [150, 150, 100]
    }
};

function selectBlokGroup(groupNumber) {
    selectedBlokGroup = groupNumber;
    const groupData = blokGroupData[groupNumber];
    
    // Hide group select
    document.getElementById('blokGroupSelect').classList.add('hidden');
    
    if (groupData.subGroups) {
        // Show sub-group select
        const subGroupSelect = document.getElementById('blokSubGroupSelect');
        const subGroupTitle = document.getElementById('blokSubGroupTitle');
        const subGroupButtons = document.getElementById('blokSubGroupButtons');
        
        subGroupTitle.textContent = 'Alt qrup seçin:';
        subGroupButtons.innerHTML = '';
        
        Object.keys(groupData.subGroups).forEach(key => {
            const button = document.createElement('button');
            button.className = 'select-button';
            button.textContent = groupData.subGroups[key].name;
            button.onclick = () => selectBlokSubGroup(key);
            subGroupButtons.appendChild(button);
        });
        
        subGroupSelect.classList.remove('hidden');
        
        // Save navigation state
        navigationHistory.push({
            section: 'blok',
            subsection: 'subgroup',
            scrollPosition: 0
        });
    } else {
        // No sub-groups, show calculator directly
        blokSubjects = groupData.subjects;
        const maxScores = groupData.maxScores;
        showBlokCalculator(groupData.name, blokSubjects, maxScores);
    }
}

function selectBlokSubGroup(subGroupKey) {
    selectedBlokSubGroup = subGroupKey;
    const groupData = blokGroupData[selectedBlokGroup];
    const subGroupData = groupData.subGroups[subGroupKey];
    
    // Hide sub-group select
    document.getElementById('blokSubGroupSelect').classList.add('hidden');
    
    blokSubjects = subGroupData.subjects;
    const maxScores = subGroupData.maxScores;
    showBlokCalculator(`${groupData.name} - ${subGroupData.name}`, blokSubjects, maxScores);
    
    // Save navigation state
    navigationHistory.push({
        section: 'blok',
        subsection: 'calculator',
        scrollPosition: 0
    });
}

function showBlokCalculator(title, subjects, maxScores) {
    const calculator = document.getElementById('blokCalculator');
    const groupTitle = document.getElementById('blokGroupTitle');
    const subjectsDiv = document.getElementById('blokSubjects');
    
    groupTitle.textContent = title;
    subjectsDiv.innerHTML = '';
    
    subjects.forEach((subject, index) => {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'subject-group';
        subjectDiv.innerHTML = `
            <h4>${subject} (maksimum: ${maxScores[index]} bal)</h4>
            <div class="input-row">
                <label>Düzgün qapalı (max 22):</label>
                <input type="number" id="blok_${index}_duzgun" min="0" max="22" placeholder="0">
            </div>
            <div class="input-row">
                <label>Səhv qapalı (max 22):</label>
                <input type="number" id="blok_${index}_sehv" min="0" max="22" placeholder="0">
            </div>
            <div class="input-row">
                <label>Açıq (max 5):</label>
                <input type="number" id="blok_${index}_aciq" min="0" max="5" placeholder="0">
            </div>
            <div class="input-row">
                <label>Ətraflı (max 3):</label>
                <input type="number" id="blok_${index}_etrafli" min="0" max="3" placeholder="0">
            </div>
        `;
        subjectsDiv.appendChild(subjectDiv);
    });
    
    calculator.classList.remove('hidden');
    document.getElementById('blokResult').classList.add('hidden');
}

function calculateBlok() {
    const groupData = blokGroupData[selectedBlokGroup];
    let subjects, maxScores;
    
    if (groupData.subGroups && selectedBlokSubGroup) {
        const subGroupData = groupData.subGroups[selectedBlokSubGroup];
        subjects = subGroupData.subjects;
        maxScores = subGroupData.maxScores;
    } else {
        subjects = groupData.subjects;
        maxScores = groupData.maxScores;
    }
    
    const scores = [];
    let totalScore = 0;
    let hasEmptyInput = false;
    
    // First check if all inputs are filled
    subjects.forEach((subject, index) => {
        const duzgunInput = document.getElementById(`blok_${index}_duzgun`).value;
        const sehvInput = document.getElementById(`blok_${index}_sehv`).value;
        const aciqInput = document.getElementById(`blok_${index}_aciq`).value;
        const etrafliInput = document.getElementById(`blok_${index}_etrafli`).value;
        
        // Check if any input is empty
        if (duzgunInput === '' || sehvInput === '' || aciqInput === '' || etrafliInput === '') {
            hasEmptyInput = true;
        }
    });
    
    // Show error if any input is empty
    if (hasEmptyInput) {
        alert('Zəhmət olmasa bütün xanaları doldurun!');
        return;
    }
    
    // Calculate scores
    subjects.forEach((subject, index) => {
        const duzgun = parseInt(document.getElementById(`blok_${index}_duzgun`).value);
        const sehv = parseInt(document.getElementById(`blok_${index}_sehv`).value);
        const aciq = parseInt(document.getElementById(`blok_${index}_aciq`).value);
        const etrafli = parseInt(document.getElementById(`blok_${index}_etrafli`).value);
        
        // Validate inputs
        if (duzgun > 22 || sehv > 22 || aciq > 5 || etrafli > 3) {
            alert('Zəhmət olmasa düzgün qiymətlər daxil edin!');
            return;
        }
        
        // Validate that duzgun + sehv <= 22
        if (duzgun + sehv > 22) {
            alert(`${subject} fənni üçün düzgün və səhv qapalıların cəmi 22-dən çox ola bilməz!`);
            return;
        }
        
        // Check for perfect score: 22 düzgün, 0 səhv, 5 açıq, 3 ətraflı = 100% (maksimum bal)
        let subjectScore;
        if (duzgun === 22 && sehv === 0 && aciq === 5 && etrafli === 3) {
            // Perfect score: maksimum bal
            subjectScore = maxScores[index];
        } else {
            // Calculate score using provided formula
            // Qapalı: (düzgün - 0.25*səhv) * 3.03
            let qapaliScore = (duzgun - 0.25 * sehv) * 3.03;
            if (qapaliScore < 0) qapaliScore = 0;
            
            // Açıq və ətraflı: (açıq + 2*ətraflı) * 3.03
            const aciqEtrafliScore = (aciq + 2 * etrafli) * 3.03;
            
            // Total for this subject (not limited by maxScore)
            let rawSubjectScore = qapaliScore + aciqEtrafliScore;
            
            // Calculate actual score as percentage of maxScore
            // Məsələn: 80 bal çıxıbsa 150 ballıq fənn üçün: (80/100)*150 = 120 bal
            subjectScore = (rawSubjectScore / 100) * maxScores[index];
            subjectScore = Math.min(subjectScore, maxScores[index]);
        }
        
        scores.push({ subject, score: subjectScore, maxScore: maxScores[index] });
        totalScore += subjectScore;
    });
    
    totalScore = Math.min(totalScore, 400);
    
    // Determine grade
    let grade = '';
    let gradeClass = '';
    
    if (totalScore === 0) {
        grade = '0 BAL';
        gradeClass = 'weak';
    } else if (totalScore >= 400) {
        grade = 'MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ';
        gradeClass = 'excellent';
    } else if (totalScore >= 250) {
        grade = 'ÇOX YAXŞI';
        gradeClass = 'very-good';
    } else if (totalScore >= 160) {
        grade = 'YAXŞI';
        gradeClass = 'good';
    } else if (totalScore >= 140) {
        grade = 'KAFİ';
        gradeClass = 'sufficient';
    } else if (totalScore >= 120) {
        grade = 'ZƏİF';
        gradeClass = 'weak';
    } else {
        grade = 'YAXŞI OLACAQ';
        gradeClass = 'weak';
    }
    
    // Display result
    const resultDiv = document.getElementById('blokResult');
    let statsHTML = '<div class="result-stats"><h4>Fənlər üzrə ballar:</h4>';
    
    scores.forEach(item => {
        statsHTML += `
            <div class="stat-item">
                <span class="stat-label">${item.subject}:</span>
                <span class="stat-value">${item.score.toFixed(2)} / ${item.maxScore}</span>
            </div>
        `;
    });
    
    statsHTML += '</div>';
    
    resultDiv.innerHTML = `
        ${statsHTML}
        <div class="result-total">
            <div class="result-total-label">Ümumi bal</div>
            <div class="result-total-value">${totalScore.toFixed(2)}</div>
            <div class="result-total-label">/ 400</div>
        </div>
        <div class="result-grade ${gradeClass}">
            ${grade}
        </div>
    `;
    
    resultDiv.classList.remove('hidden');
    
    // Scroll to result
    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// ========================================
// YAŞ HESABLAYICI
// ========================================
function calculateAge() {
    const day = parseInt(document.getElementById('yasDay').value);
    const month = parseInt(document.getElementById('yasMonth').value);
    const year = parseInt(document.getElementById('yasYear').value);
    
    // Validate input
    if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
        alert('Zəhmət olmasa düzgün tarix daxil edin!');
        return;
    }
    
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    
    // Validate date
    if (isNaN(birthDate.getTime()) || birthDate > today) {
        alert('Zəhmət olmasa düzgün tarix daxil edin!');
        return;
    }
    
    // Calculate age in years
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    // Calculate total days lived
    const timeDiff = today.getTime() - birthDate.getTime();
    const daysLived = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Calculate days until next birthday
    let nextBirthday = new Date(today.getFullYear(), month - 1, day);
    if (nextBirthday < today) {
        nextBirthday = new Date(today.getFullYear() + 1, month - 1, day);
    }
    const daysUntilBirthday = Math.floor((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    // Display result
    const resultDiv = document.getElementById('yasResult');
    resultDiv.innerHTML = `
        <div class="result-stats">
            <div class="stat-item">
                <span class="stat-label">Yaşınız:</span>
                <span class="stat-value">${age} il</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Yaşadığınız günlər:</span>
                <span class="stat-value">${daysLived.toLocaleString('az-AZ')} gün</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Növbəti ad gününə:</span>
                <span class="stat-value">${daysUntilBirthday} gün</span>
            </div>
        </div>
    `;
    
    resultDiv.classList.remove('hidden');
    
    // Scroll to result
    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// ========================================
// INITIALIZATION
// ========================================
console.log('Bal Hesablayıcı yükləndi');
