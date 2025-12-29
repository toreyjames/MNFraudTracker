// Minnesota Fraud Tracker - Streamlined App

document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    setupNavigation();
    renderMeta();
    renderLatestUpdates();
    renderEvidenceTable();
    renderKnownFacts();
    renderKeyFigures();
    renderMissingLinks();
    renderSlamDunks();
    populateWatchlist();
    setupFilters();
    setupForms();
}

function renderMeta() {
    const lastUpdatedEl = document.getElementById('last-updated');
    if (lastUpdatedEl && FRAUD_DATA?.meta?.lastUpdated) {
        lastUpdatedEl.textContent = FRAUD_DATA.meta.lastUpdated;
    }
}

function renderLatestUpdates() {
    const container = document.getElementById('latest-updates');
    if (!container || !Array.isArray(FRAUD_DATA?.updates)) return;

    container.innerHTML = FRAUD_DATA.updates
        .slice()
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
        .slice(0, 6)
        .map(u => {
            const sourcesCount = (u.sources || []).length;
            const sourceLink = (u.sources && u.sources[0]) ? u.sources[0] : null;
            return `
                <div class="watchlist-card" data-type="other" data-area="suburbs" data-status="verified">
                    <div class="wl-header">
                        <span class="wl-name">${u.title}</span>
                        <span class="wl-type food">${u.kind || 'Update'}</span>
                    </div>
                    <div class="wl-address">${u.date || ''}</div>
                    <div class="wl-billing">${u.summary || ''}</div>
                    <div class="wl-flags">
                        <span class="wl-flag">Sources: ${sourcesCount}</span>
                        ${u.credibility ? `<span class="wl-flag">${u.credibility}</span>` : ''}
                    </div>
                    <div class="wl-actions">
                        ${sourceLink ? `<button class="wl-btn" onclick="window.open('${sourceLink}','_blank')">Open source</button>` : `<button class="wl-btn" disabled>Source needed</button>`}
                        <button class="wl-btn" onclick="goToSection('targets')">Targets →</button>
                        <button class="wl-btn" onclick="goToSection('records')">Records →</button>
                    </div>
                </div>
            `;
        })
        .join('');
}

function renderEvidenceTable() {
    const tbody = document.getElementById('evidence-tbody');
    if (!tbody || !Array.isArray(FRAUD_DATA?.targets)) return;

    const rows = FRAUD_DATA.targets
        .filter(t => (t.status || 'verified') === 'verified')
        .slice(0, 10)
        .map(t => {
            const source = (t.sources && t.sources[0]) ? t.sources[0] : null;
            const amount = t.amountLabel || (t.amount ? formatCurrency(t.amount) : '');
            const status = t.status || 'verified';
            return `
                <tr>
                    <td>${escapeHtml(t.name)}</td>
                    <td>${escapeHtml(t.type || '')}</td>
                    <td>${escapeHtml(amount)}${t.amountSuffix ? escapeHtml(t.amountSuffix) : ''}</td>
                    <td>${escapeHtml(status)}</td>
                    <td>${source ? `<a href="${source}" target="_blank">Open</a>` : '—'}</td>
                </tr>
            `;
        })
        .join('');

    tbody.innerHTML = rows || `<tr><td colspan="5">No sourced cases yet.</td></tr>`;
}

// ============================================
// INVESTIGATION FRAMEWORK RENDERING
// ============================================

function renderKnownFacts() {
    const container = document.getElementById('known-facts-grid');
    if (!container || !FRAUD_DATA?.investigation?.knownFacts) return;

    container.innerHTML = FRAUD_DATA.investigation.knownFacts.map(f => `
        <div class="evidence-item">
            <div class="evidence-fact">${escapeHtml(f.fact)}</div>
            <div class="evidence-note"><strong>Source:</strong> ${escapeHtml(f.source)}</div>
            <div class="evidence-note"><strong>Who knew:</strong> ${escapeHtml(f.whoKnew)}</div>
        </div>
    `).join('');
}

function renderKeyFigures() {
    const container = document.getElementById('key-figures-grid');
    if (!container || !FRAUD_DATA?.investigation?.keyFigures) return;

    container.innerHTML = FRAUD_DATA.investigation.keyFigures.map(f => `
        <div class="figure-item">
            <div class="figure-name">${escapeHtml(f.name)}</div>
            <div class="figure-role">${escapeHtml(f.role)}</div>
            <div class="figure-role">${escapeHtml(f.tenure)}</div>
            <div class="figure-questions">${(f.questions || []).slice(0, 2).map(q => `• ${escapeHtml(q)}`).join('<br>')}</div>
        </div>
    `).join('');
}

function renderMissingLinks() {
    const container = document.getElementById('missing-links-grid');
    if (!container || !FRAUD_DATA?.investigation?.missingLinks) return;

    container.innerHTML = FRAUD_DATA.investigation.missingLinks.map(m => `
        <div class="missing-item">
            <h4>${escapeHtml(m.category)}</h4>
            <p><strong>Question:</strong> ${escapeHtml(m.question)}</p>
            <div class="action-needed">
                <strong>Evidence needed:</strong><br>
                ${(m.evidence || []).slice(0, 3).map(e => `• ${escapeHtml(e)}`).join('<br>')}
            </div>
            <div class="evidence-note"><strong>Status:</strong> ${escapeHtml(m.status)}</div>
            <div class="evidence-note"><strong>Why it matters:</strong> ${escapeHtml(m.significance)}</div>
        </div>
    `).join('');
}

function renderSlamDunks() {
    const container = document.getElementById('slamdunk-list');
    if (!container || !FRAUD_DATA?.investigation?.slamDunkScenarios) return;

    const likelihoodClass = {
        'HIGH': 'high',
        'Moderate': 'medium',
        'Low': 'low',
        'Unknown': 'low'
    };

    container.innerHTML = FRAUD_DATA.investigation.slamDunkScenarios.map(s => {
        const cls = likelihoodClass[s.likelihood] || 'low';
        return `
            <div class="sd-item ${cls}">
                <div class="sd-scenario">${escapeHtml(s.scenario)}</div>
                <div class="sd-why">
                    <strong>Proof needed:</strong> ${escapeHtml(s.proofNeeded)}<br>
                    <strong>Legal implication:</strong> ${escapeHtml(s.legalImplication)}
                </div>
                <div class="sd-status">Likelihood: ${escapeHtml(s.likelihood)}</div>
            </div>
        `;
    }).join('');
}

// Navigation
function setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            document.getElementById(section).classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

function goToSection(sectionId) {
    document.querySelector(`[data-section="${sectionId}"]`).click();
}

// Populate Watchlist
function populateWatchlist() {
    const grid = document.getElementById('watchlist-grid');
    if (!grid) return;
    
    const allItems = Array.isArray(FRAUD_DATA?.targets) ? FRAUD_DATA.targets : [];
    
    grid.innerHTML = allItems.map(item => createWatchlistCard(item)).join('');
}

function createWatchlistCard(item) {
    const typeLabels = {
        'healthcare': '🏥 Healthcare',
        'daycare': '👶 Childcare',
        'food': '🍽️ Food Programs',
        'housing': '🏠 Housing',
        'other': '📦 Other'
    };
    
    const area = getArea(item.address);
    const sourcesCount = (item.sources || []).length;
    const status = item.status || (sourcesCount ? 'verified' : 'needs-source');
    const amountLabel = item.amountLabel || (item.amount ? formatCurrency(item.amount) : formatCurrency(item.estimatedBilling || item.estimatedClaims));
    
    return `
        <div class="watchlist-card" data-type="${item.type}" data-area="${area}" data-status="${status}">
            <div class="wl-header">
                <span class="wl-name">${item.name}</span>
                <span class="wl-type ${item.type}">${typeLabels[item.type] || item.type}</span>
            </div>
            <div class="wl-address">${item.address}</div>
            <div class="wl-billing">${amountLabel}${item.amountSuffix ? item.amountSuffix : ''}</div>
            <div class="wl-flags">
                ${(item.redFlags || []).slice(0, 3).map(f => `<span class="wl-flag">${f}</span>`).join('')}
                <span class="wl-flag">Sources: ${sourcesCount}</span>
                ${sourcesCount === 0 ? `<span class="wl-flag">Needs source</span>` : ''}
            </div>
            <div class="wl-actions">
                <button class="wl-btn" onclick="window.open('https://www.google.com/maps/search/${encodeURIComponent(item.address)}','_blank')">📍 Map</button>
                <button class="wl-btn" onclick="window.open('https://mblsportal.sos.state.mn.us/','_blank')">🔎 SOS</button>
                ${sourcesCount ? `<button class="wl-btn" onclick="window.open('${item.sources[0]}','_blank')">Sources</button>` : `<button class="wl-btn" disabled>Sources</button>`}
            </div>
        </div>
    `;
}

function getArea(address) {
    const addr = address.toLowerCase();
    if (addr.includes('cedar') || addr.includes('riverside') || addr.includes('55454') || addr.includes('55404')) return 'cedar-riverside';
    if (addr.includes('north') || addr.includes('55411') || addr.includes('55412')) return 'north-mpls';
    if (addr.includes('st. paul') || addr.includes('st paul') || addr.includes('55104') || addr.includes('55106') || addr.includes('55107')) return 'st-paul';
    if (addr.includes('brooklyn')) return 'brooklyn';
    return 'suburbs';
}

function formatCurrency(value) {
    if (!value) return '$0';
    if (value >= 1000000000) return '$' + (value / 1000000000).toFixed(1) + 'B';
    if (value >= 1000000) return '$' + (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return '$' + Math.round(value / 1000) + 'K';
    return '$' + value;
}

// Filters
function setupFilters() {
    const typeFilter = document.getElementById('type-filter');
    const statusFilter = document.getElementById('status-filter');
    const searchInput = document.getElementById('search-input');
    
    [typeFilter, statusFilter].forEach(el => {
        if (el) el.addEventListener('change', filterWatchlist);
    });
    if (searchInput) searchInput.addEventListener('input', filterWatchlist);
}

function filterWatchlist() {
    const type = document.getElementById('type-filter')?.value || 'all';
    const status = document.getElementById('status-filter')?.value || 'all';
    const search = document.getElementById('search-input')?.value.toLowerCase() || '';
    
    document.querySelectorAll('.watchlist-card').forEach(card => {
        const matchType = type === 'all' || card.dataset.type === type;
        const matchStatus = status === 'all' || card.dataset.status === status;
        const matchSearch = search === '' || card.textContent.toLowerCase().includes(search);
        
        card.style.display = (matchType && matchStatus && matchSearch) ? '' : 'none';
    });
}

function filterInvestigate(type) {
    goToSection('targets');
    setTimeout(() => {
        const typeFilter = document.getElementById('type-filter');
        if (typeFilter) {
            typeFilter.value = type;
            filterWatchlist();
        }
    }, 100);
}

function escapeHtml(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Forms
function setupForms() {
    const submitForm = document.getElementById('submit-form');
    if (submitForm) {
        submitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            console.log('Submission:', Object.fromEntries(data));
            
            // Store locally
            const submissions = JSON.parse(localStorage.getItem('mn-fraud-submissions') || '[]');
            submissions.push({ ...Object.fromEntries(data), timestamp: new Date().toISOString() });
            localStorage.setItem('mn-fraud-submissions', JSON.stringify(submissions));
            
            alert('Thank you! Your findings have been recorded.');
            closeSubmitModal();
            e.target.reset();
        });
    }
}

// Modals
function showFOIAModal() {
    const modal = document.getElementById('foia-modal');
    const templates = document.getElementById('foia-templates');
    
    templates.innerHTML = `
        <div class="foia-template">
            <h4>Governor's Office Communications</h4>
            <div class="foia-text" id="foia-governor">Minnesota Government Data Practices Act Request

TO: Office of the Governor of Minnesota
FROM: [Your Name]
DATE: [Date]

Pursuant to the Minnesota Government Data Practices Act (Minn. Stat. Ch. 13), I request copies of the following public government data:

1. All emails, letters, memoranda, and other communications sent to or from the Governor's office mentioning "Feeding Our Future," "FOF," "Aimee Bock," or federal child nutrition programs, from January 1, 2019 to December 31, 2022.

2. All briefing documents, meeting notes, or summaries provided to the Governor regarding federal food program fraud investigations during the same period.

3. Calendar entries and meeting records showing communications with the Minnesota Department of Education regarding federal program oversight.

I request this data in electronic format. Please respond within 10 business days as required by law.

[Your Name]
[Your Address]
[Your Email]</div>
            <button class="copy-btn" onclick="copyToClipboard('foia-governor')">📋 Copy to Clipboard</button>
        </div>
        
        <div class="foia-template">
            <h4>MDE Briefing Documents</h4>
            <div class="foia-text" id="foia-mde">Minnesota Government Data Practices Act Request

TO: Minnesota Department of Education
FROM: [Your Name]  
DATE: [Date]

Pursuant to the Minnesota Government Data Practices Act, I request:

1. All internal communications, warnings, or concerns raised about Feeding Our Future or affiliated meal sites from 2019-2022.

2. Records of contact with the FBI regarding fraud concerns.

3. Decision documents regarding continued payments to Feeding Our Future after concerns were raised.

4. Communications between MDE and the Governor's office regarding federal food program issues.

[Your contact information]</div>
            <button class="copy-btn" onclick="copyToClipboard('foia-mde')">📋 Copy to Clipboard</button>
        </div>
        
        <div class="foia-template">
            <h4>Campaign Finance Cross-Reference</h4>
            <div class="foia-text" id="foia-campaign">Research Steps - Campaign Finance Analysis

1. Go to: https://cfb.mn.gov/
2. Search for "Tim Walz" campaign contributions
3. Download contributor lists for 2018-2024

Cross-reference these names with:
- FOF indictment defendant list (70+ names)
- Business owners from fraud watchlist
- Registered agents of flagged businesses

Look for:
- Direct donations from defendants
- Donations from businesses at same addresses as fraud sites
- Donations clustered around key dates (after payments approved, before investigation)</div>
            <button class="copy-btn" onclick="copyToClipboard('foia-campaign')">📋 Copy to Clipboard</button>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeFOIAModal() {
    document.getElementById('foia-modal').classList.remove('active');
}

function showSubmitModal() {
    document.getElementById('submit-modal').classList.add('active');
}

function closeSubmitModal() {
    document.getElementById('submit-modal').classList.remove('active');
}

function copyFOIA(type) {
    showFOIAModal();
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

// Share Functions
function shareTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('MN Fraud Tracker - Investigating the largest state-level fraud in US history. $9B+ in suspected fraud under Walz administration.');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied!');
    });
}

// Close modals on escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeFOIAModal();
        closeSubmitModal();
    }
});

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Console branding
console.log('%cMN Fraud Tracker', 'font-size: 20px; font-weight: bold; color: #dc2626;');
console.log('%cCitizen Investigation Platform', 'font-size: 12px; color: #a8a29e;');
