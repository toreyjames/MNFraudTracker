# Minnesota Fraud Tracker

**Citizen Journalism Database - Documenting the Largest State-Level Fraud in U.S. History**

## Overview

This project tracks and documents the unprecedented scale of fraud that occurred in Minnesota, particularly during the COVID-19 pandemic. It serves as a resource for citizen journalists, investigators, and concerned citizens to understand the scope of fraud and contribute to ongoing verification efforts.

### Key Statistics
- **Confirmed Fraud:** $250M+ (Feeding Our Future alone)
- **Suspected Healthcare Fraud:** ~$9B (estimated from Medicare/Medicaid patterns)
- **Additional Suspected Fraud:** $100M+ (daycare, PPP, unemployment)

## Features

### 📊 Dashboard
- Real-time fraud totals with animated counters
- Breakdown by sector (food programs, healthcare, childcare, etc.)
- Key figures and government officials involved
- Overview of major fraud schemes

### 📅 Timeline
- Chronological view of fraud events
- Filter by event type (fraud, warnings, investigations, prosecutions)
- Documented pattern of ignored warnings by state agencies

### 🗂️ Case Database
- Searchable database of all known fraud cases
- Court documents and conviction records
- Filter by type, status, and amount
- Links to official sources

### 🏢 Business Watchlist
- Businesses flagged for potential fraud
- Citizen verification guides
- Red flag indicators
- Direct links to Google Maps and Secretary of State records
- Status tracking (unverified, suspicious, verified fraud, cleared)

### 🔗 Pattern Analysis
- Ownership network connections
- Geographic concentration analysis
- Billing anomaly indicators
- Regulatory failure documentation

### 📚 Resources
- Links to court documents
- News coverage archives
- Government record databases
- Research tools
- Video documentation

### ✏️ Contribute
- Submit tips about suspicious businesses
- Report site visits
- Document observations
- Help build the verification database

## Getting Started

### View the Tracker

Simply open `index.html` in any modern web browser. No server required - it's a static site that runs entirely in your browser.

```bash
# Option 1: Double-click index.html

# Option 2: Use a local server
npx serve .

# Option 3: Python server
python -m http.server 8000
```

### File Structure

```
├── index.html     # Main application
├── styles.css     # All styling
├── data.js        # Fraud case data and business watchlist
├── app.js         # Application logic
└── README.md      # This file
```

## Contributing Data

### Adding New Cases

Edit `data.js` and add entries to the `cases` array:

```javascript
{
    id: 'unique-id',
    name: 'Defendant Name',
    organization: 'Organization Name',
    type: 'food|healthcare|daycare|ppp|unemployment',
    status: 'convicted|indicted|suspected|investigating',
    amount: 1000000,
    role: 'Owner/Operator',
    description: 'Detailed description...',
    charges: ['Charge 1', 'Charge 2'],
    sentence: 'X years',
    dateCharged: 'YYYY-MM-DD',
    sources: ['https://...']
}
```

### Adding Businesses to Watchlist

Add entries to the `businesses` array:

```javascript
{
    id: 'biz-unique-id',
    name: 'Business Name',
    type: 'daycare|healthcare|homehealth|mental|dme|restaurant',
    address: 'Full Address',
    estimatedClaims: 1000000,
    redFlags: ['Flag 1', 'Flag 2'],
    status: 'unverified|suspicious|verified-fraud|cleared',
    notes: 'Observation notes...',
    ownerInfo: 'Owner details...',
    lastVerified: 'YYYY-MM-DD' or null
}
```

## Citizen Verification Guide

### What to Look For

**Daycares:**
- Signs of children (toys, art, cribs visible)
- Playground equipment
- Staff present during business hours
- Vehicles coming and going
- Proper signage

**Healthcare Facilities:**
- Actual patients entering/exiting
- Professional medical signage
- Appropriate facility appearance
- Staff in medical attire

**Red Flags:**
- Empty building during claimed hours
- No signage or professional presence
- Residential address for commercial claims
- Multiple businesses at same address
- Recent incorporation before first claims

### Safety Guidelines

1. **Be Legal:** Do not trespass or enter private property
2. **Be Respectful:** These are allegations until proven in court
3. **Be Safe:** If you observe suspicious activity, contact law enforcement
4. **Document Everything:** Photos, timestamps, specific details

## Official Reporting Channels

If you have evidence of fraud, report to:

- **FBI Minneapolis:** (763) 569-8000
- **HHS OIG Hotline:** 1-800-HHS-TIPS
- **USDA OIG Hotline:** 1-800-424-9121
- **Minnesota Attorney General:** (651) 296-3353

## Legal Disclaimer

**Presumption of Innocence:** All individuals and businesses listed are presumed innocent until proven guilty in a court of law. Inclusion does not constitute accusation of criminal wrongdoing.

**Information Accuracy:** While we strive for accuracy, information is compiled from public sources and citizen reports and may contain errors.

**No Legal Advice:** Nothing in this database constitutes legal advice.

## Data Sources

- Federal court documents (PACER)
- DOJ press releases
- Minnesota Secretary of State business records
- Investigative journalism (Star Tribune, Fox 9, Alpha News)
- Citizen journalist reports

## Future Development

- [ ] Interactive map visualization
- [ ] D3.js network graphs
- [ ] Backend database for submissions
- [ ] API for data access
- [ ] Mobile app
- [ ] Automated billing pattern analysis
- [ ] Integration with court record APIs

## License

This project is released for public interest and journalism purposes. Data compiled from public sources.

---

*"Sunlight is said to be the best of disinfectants."* - Justice Louis Brandeis

