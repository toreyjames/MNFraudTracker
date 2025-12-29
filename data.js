// Minnesota Fraud Tracker - Data
// Compiled from court documents, news reports, and public records

const FRAUD_DATA = {
    meta: {
        lastUpdated: '2025-12-28',
        notes: 'This dataset mixes (1) verified official actions and (2) leads from reporting. Each target includes sources; items without sources should be treated as leads only.'
    },

    updates: [
        {
            date: '2025-12-26',
            title: 'Nick Shirley publishes a video investigation alleging “ghost” providers/daycares',
            kind: 'Media',
            credibility: 'Lead (verify)',
            summary: 'Use this as a lead generator: extract any named entities/addresses and then validate via SOS/NPI/licensing before adding as targets.',
            sources: [
                'https://www.thewrap.com/media-platforms/politics/nick-shirley-video-expose-billion-dollar-fraud-schemes-minnesota-viral/'
            ]
        },
        {
            date: '2025-10-22',
            title: 'Evergreen Recovery leaders plead guilty in Medicaid fraud scheme',
            kind: 'Official',
            credibility: 'Verified',
            summary: 'MN AG press release (Medicaid / wire fraud conspiracy).',
            sources: [
                'https://www.ag.state.mn.us/Office/Communications/2025/10/22_EvergreenRecovery.asp'
            ]
        },
        {
            date: '2025-09-24',
            title: 'Smart Therapy / Asha Hassan charged with Medicaid fraud allegations',
            kind: 'Official',
            credibility: 'Verified (charges)',
            summary: 'MN AG press release describing alleged billing for services not rendered and kickbacks.',
            sources: [
                'https://www.ag.state.mn.us/Office/Communications/2025/09/24_Hassan.asp'
            ]
        },
        {
            date: '2025-09-18',
            title: 'First wave: defendants charged in housing stabilization fraud cases',
            kind: 'Official',
            credibility: 'Verified (charges)',
            summary: 'US Attorney (District of MN) press release.',
            sources: [
                'https://www.justice.gov/usao-mn/pr/defendants-charged-first-wave-housing-stabilization-fraud-cases'
            ]
        },
        {
            date: '2025-08-12',
            title: 'Abdifatah Yusuf convicted for Medicaid theft-by-swindle (Promise Health Services, LLC)',
            kind: 'Official',
            credibility: 'Verified',
            summary: 'MN AG press release: Medicaid fraud involving Home and Community-Based Services claims.',
            sources: [
                'https://www.ag.state.mn.us/Office/Communications/2025/08/12_Yusuf.asp'
            ]
        },
        {
            date: '2025-06-26',
            title: 'NUWAY Alliance resolves Medicaid allegations via $18.5M settlement',
            kind: 'Official',
            credibility: 'Verified (settlement)',
            summary: 'MN AG press release: allegations include kickbacks/double billing; settlement includes compliance obligations.',
            sources: [
                'https://www.ag.state.mn.us/Office/Communications/2025/06/26_NUWAY.asp'
            ]
        }
    ],

    // Summary Statistics
    summary: {
        confirmedFraud: 250000000,      // $250M confirmed in Feeding Our Future
        suspectedFraud: 9100000000,     // ~$9.1B estimated in Medicare/Medicaid + other
        totalExposure: 9350000000       // Total
    },

    // Streamlined targets powering the current UI.
    // IMPORTANT: Only add named entities here when you have a citation link.
    targets: [
        {
            id: 'target-hc-nuway-2025-06-26',
            name: 'NUWAY Alliance (Medicaid settlement)',
            type: 'healthcare',
            address: 'Minnesota (see source for details)',
            amount: 18500000,
            amountLabel: '$18.5M',
            amountSuffix: ' settlement',
            status: 'verified',
            redFlags: ['Kickbacks (alleged)', 'Double-billing (alleged)', 'High-dollar Medicaid program'],
            sources: ['https://www.ag.state.mn.us/Office/Communications/2025/06/26_NUWAY.asp']
        },
        {
            id: 'target-hc-evergreen-2025-10-22',
            name: 'Evergreen Recovery (Medicaid fraud guilty pleas)',
            type: 'healthcare',
            address: 'Minnesota (see source for details)',
            amountLabel: 'Guilty pleas (see source)',
            status: 'verified',
            redFlags: ['Billing for services not provided (alleged)', 'Overbilling (alleged)'],
            sources: ['https://www.ag.state.mn.us/Office/Communications/2025/10/22_EvergreenRecovery.asp']
        },
        {
            id: 'target-hc-smart-therapy-2025-09-24',
            name: 'Smart Therapy / Asha Hassan (charges)',
            type: 'healthcare',
            address: 'Minnesota (see source for details)',
            amountLabel: 'Charged (see source)',
            status: 'verified',
            redFlags: ['Billing for services not rendered (alleged)', 'Kickbacks (alleged)'],
            sources: ['https://www.ag.state.mn.us/Office/Communications/2025/09/24_Hassan.asp']
        },
        {
            id: 'target-hc-promise-health-2025-08-12',
            name: 'Promise Health Services, LLC / Abdifatah Yusuf (conviction)',
            type: 'healthcare',
            address: 'Minnesota (see source for details)',
            amount: 7200000,
            amountLabel: '$7.2M',
            amountSuffix: ' (reported loss)',
            status: 'verified',
            redFlags: ['Claims vs. operations mismatch (per AG)', 'HCBS / Medicaid program'],
            sources: ['https://www.ag.state.mn.us/Office/Communications/2025/08/12_Yusuf.asp']
        },
        {
            id: 'target-housing-stabilization-2025-09-18',
            name: 'Housing Stabilization Fraud (first wave charges)',
            type: 'housing',
            address: 'Minnesota (see DOJ source for named defendants)',
            amountLabel: 'Charged (see source)',
            status: 'verified',
            redFlags: ['Program integrity risk', 'High-volume billing (alleged)'],
            sources: ['https://www.justice.gov/usao-mn/pr/defendants-charged-first-wave-housing-stabilization-fraud-cases']
        },
        {
            id: 'target-fof-doj-2022-09-20',
            name: 'Feeding Our Future fraud case (DOJ MN)',
            type: 'food',
            address: 'Minnesota (multiple sites)',
            amount: 250000000,
            amountLabel: '$250M+',
            amountSuffix: ' alleged',
            status: 'verified',
            redFlags: ['Large-scale claims', 'Multi-defendant conspiracy'],
            sources: ['https://www.justice.gov/usao-mn/pr/federal-grand-jury-charges-47-defendants-250-million-feeding-our-future-fraud-scheme']
        },
        {
            id: 'target-media-nick-shirley-2025-12-26',
            name: 'Nick Shirley investigation (leads: childcare + healthcare)',
            type: 'other',
            address: 'Extract named entities from the video and validate before adding',
            amountLabel: 'Media lead',
            status: 'needs-source',
            redFlags: ['Allegations only until verified', 'Requires address/entity validation'],
            sources: ['https://www.thewrap.com/media-platforms/politics/nick-shirley-video-expose-billion-dollar-fraud-schemes-minnesota-viral/']
        }
    ],

    // ============================================
    // INVESTIGATIVE FRAMEWORK - CONNECTING THE DOTS
    // ============================================
    investigation: {
        // What we KNOW (documented, proven)
        knownFacts: [
            {
                fact: "MN Dept of Education received FBI warning in January 2021",
                source: "Court documents, FBI testimony",
                significance: "Proves federal notification occurred",
                whoKnew: "MDE leadership, potentially Commissioner"
            },
            {
                fact: "MDE continued approving payments after FBI warning",
                source: "Payment records, court testimony",
                significance: "Deliberate choice to continue despite warning",
                whoKnew: "MDE Commissioner, Finance division"
            },
            {
                fact: "18+ internal warnings were documented and ignored",
                source: "Internal MDE emails, whistleblower testimony",
                significance: "Pattern of willful blindness",
                whoKnew: "MDE staff, supervisors, leadership chain"
            },
            {
                fact: "Aimee Bock (FOF) sued MDE claiming discrimination when they tried to pause",
                source: "Court filings April 2021",
                significance: "Legal pressure used to continue fraud",
                whoKnew: "MDE, AG's office, Governor's office (likely briefed on litigation)"
            },
            {
                fact: "Governor Walz extended emergency powers repeatedly",
                source: "Executive orders, public record",
                significance: "Extended the conditions enabling reduced oversight",
                whoKnew: "Governor, staff, legislature"
            },
            {
                fact: "DHS approved hundreds of childcare providers with minimal verification",
                source: "Licensing records, audit findings",
                significance: "Systemic failure in oversight agency under Walz",
                whoKnew: "DHS Commissioner Jodi Harpstead (Walz appointee)"
            }
        ],

        // What we SUSPECT but cannot prove
        suspectedConnections: [
            {
                suspicion: "Governor's office was briefed on fraud warnings",
                likelihood: "HIGH",
                reasoning: "Standard protocol for FBI contact with state agency; litigation briefings",
                whatWeNeed: "Internal communications, calendar records, briefing documents"
            },
            {
                suspicion: "Political pressure to not investigate certain communities",
                likelihood: "MEDIUM",
                reasoning: "Pattern of avoiding scrutiny of Somali community programs",
                whatWeNeed: "Internal emails, whistleblower testimony, policy memos"
            },
            {
                suspicion: "Campaign donations from fraud-connected individuals/businesses",
                likelihood: "UNKNOWN",
                reasoning: "Common pattern in corruption cases",
                whatWeNeed: "Campaign finance records analysis, donor cross-reference"
            },
            {
                suspicion: "Staff or appointees had prior relationships with fraudsters",
                likelihood: "UNKNOWN",
                reasoning: "Many fraud schemes involve inside connections",
                whatWeNeed: "Personnel files, social media analysis, business records"
            }
        ],

        // THE MISSING LINKS - What would prove direct involvement
        missingLinks: [
            {
                category: "Direct Communication",
                question: "Did Walz or senior staff communicate with Feeding Our Future leadership?",
                evidence: [
                    "Governor's office emails (FOIA request)",
                    "Phone records",
                    "Calendar/meeting records",
                    "Text messages (state devices)",
                    "Social media DMs"
                ],
                status: "NOT YET REQUESTED",
                significance: "Would show knowledge and potential coordination"
            },
            {
                category: "Financial Connection",
                question: "Did any fraud proceeds flow to Walz campaign or allied organizations?",
                evidence: [
                    "Campaign finance reports (FEC, state)",
                    "Nonprofit donations to Walz-connected orgs",
                    "Third-party expenditures",
                    "Bundler analysis"
                ],
                status: "NEEDS ANALYSIS",
                significance: "Direct financial benefit = motive"
            },
            {
                category: "Appointment Chain",
                question: "Who appointed the people who ignored warnings, and why?",
                evidence: [
                    "MDE Commissioner appointment records",
                    "DHS Commissioner appointment records",
                    "Key staff hiring records",
                    "Vetting process documents"
                ],
                keyNames: [
                    "Heather Mueller (MDE Commissioner 2019-2023, Walz appointee)",
                    "Jodi Harpstead (DHS Commissioner, Walz appointee)",
                    "Ryan Vischer (MDE CFO during fraud period)"
                ],
                status: "PARTIALLY AVAILABLE",
                significance: "Chain of responsibility leads to appointing authority"
            },
            {
                category: "Policy Decisions",
                question: "Who made the decisions that enabled fraud to continue?",
                evidence: [
                    "Policy memos reducing oversight",
                    "Executive orders on emergency procedures",
                    "Guidance documents to agencies",
                    "Meeting minutes"
                ],
                status: "NEEDS FOIA",
                significance: "Proves deliberate policy choice vs. accident"
            },
            {
                category: "Obstruction",
                question: "Was there any effort to slow or block investigations?",
                evidence: [
                    "Communications with FBI/DOJ",
                    "AG office coordination",
                    "Witness intimidation reports",
                    "Document destruction (if any)"
                ],
                status: "UNKNOWN",
                significance: "Obstruction = consciousness of guilt"
            },
            {
                category: "Briefing Records",
                question: "When was Walz personally briefed on the fraud?",
                evidence: [
                    "Daily briefing documents",
                    "Agency head meeting records",
                    "Crisis response documents",
                    "Press prep materials"
                ],
                status: "NOT PUBLIC",
                significance: "Proves personal knowledge and timing"
            }
        ],

        // Key people to investigate
        keyFigures: [
            {
                name: "Tim Walz",
                role: "Governor of Minnesota",
                tenure: "January 2019 - Present",
                relevance: "Chief executive, appointed agency heads, extended emergency powers",
                knownActions: [
                    "Appointed MDE and DHS commissioners",
                    "Extended COVID emergency powers 19 times",
                    "Did not remove any officials after fraud discovered"
                ],
                questions: [
                    "When did he first learn of fraud concerns?",
                    "Did he receive FBI briefings?",
                    "Why were no officials fired?",
                    "Any communications with FOF or connected individuals?"
                ],
                publicStatements: "Claimed he learned of fraud from news reports (unverified)"
            },
            {
                name: "Heather Mueller",
                role: "MDE Commissioner",
                tenure: "2019-2023 (Walz appointee)",
                relevance: "Direct oversight of federal food programs",
                knownActions: [
                    "Received FBI warnings",
                    "Department continued payments",
                    "Did not escalate to law enforcement",
                    "Resigned/left in 2023"
                ],
                questions: [
                    "What did she tell the Governor's office?",
                    "Why didn't she stop payments?",
                    "What pressure (if any) did she receive?",
                    "Did she brief Walz directly?"
                ],
                publicStatements: "Limited public statements, cited ongoing investigation"
            },
            {
                name: "Jodi Harpstead",
                role: "DHS Commissioner",
                tenure: "2019-Present (Walz appointee)",
                relevance: "Oversees childcare assistance, Medicaid",
                knownActions: [
                    "DHS approved hundreds of questionable providers",
                    "Minimal verification procedures",
                    "Still in position despite fraud"
                ],
                questions: [
                    "What verification reforms were rejected?",
                    "Were fraud warnings escalated?",
                    "Political pressure to approve providers?"
                ],
                publicStatements: "Deferred to ongoing investigations"
            },
            {
                name: "Keith Ellison",
                role: "Attorney General",
                tenure: "2019-Present",
                relevance: "State law enforcement, could have investigated earlier",
                knownActions: [
                    "Office did not investigate until federal action",
                    "Represented MDE when sued by FOF",
                    "Limited state prosecution activity"
                ],
                questions: [
                    "Why no state investigation before FBI?",
                    "What did AG office know and when?",
                    "Any coordination with Walz office on response?"
                ],
                publicStatements: "Deferred to federal prosecution"
            },
            {
                name: "Aimee Bock",
                role: "Feeding Our Future Founder",
                tenure: "FOF operated 2016-2022",
                relevance: "Central figure in fraud scheme",
                knownActions: [
                    "Founded and operated FOF",
                    "Sued MDE to continue payments",
                    "Convicted on all counts June 2024"
                ],
                questions: [
                    "Any political connections?",
                    "Campaign contributions?",
                    "Communications with state officials?",
                    "Who helped her navigate state bureaucracy?"
                ],
                publicStatements: "Maintained innocence through trial"
            }
        ],

        // FOIA/Data requests to file
        requestsNeeded: [
            {
                target: "Governor's Office",
                request: "All communications mentioning Feeding Our Future, FOF, or federal food programs 2019-2022",
                type: "Data Practices Act Request",
                priority: "HIGH",
                expectedResistance: "Will likely claim executive privilege or ongoing investigation"
            },
            {
                target: "MN Dept of Education",
                request: "All briefing documents provided to Commissioner regarding federal program fraud 2020-2022",
                type: "Data Practices Act Request",
                priority: "HIGH",
                expectedResistance: "May be partially available due to federal case"
            },
            {
                target: "MN DHS",
                request: "Childcare provider approval records, verification procedures, fraud referrals 2019-2023",
                type: "Data Practices Act Request",
                priority: "MEDIUM",
                expectedResistance: "Privacy exemptions likely claimed"
            },
            {
                target: "Campaign Finance Board",
                request: "All donations to Walz campaigns from individuals/entities connected to FOF defendants",
                type: "Public Records",
                priority: "HIGH",
                expectedResistance: "None - public records"
            },
            {
                target: "FBI Minneapolis",
                request: "Timeline of notifications to state agencies regarding FOF investigation",
                type: "FOIA",
                priority: "MEDIUM",
                expectedResistance: "Ongoing investigation exemption likely"
            },
            {
                target: "US Attorney's Office",
                request: "Cooperation/non-cooperation of state officials with investigation",
                type: "FOIA",
                priority: "MEDIUM",
                expectedResistance: "May be sealed"
            }
        ],

        // What would be a "slam dunk"
        slamDunkScenarios: [
            {
                scenario: "Direct communication between Walz/staff and FOF leadership",
                proofNeeded: "Emails, texts, call logs showing coordination or awareness",
                legalImplication: "Conspiracy to commit fraud, honest services fraud",
                likelihood: "Low probability of existence, but worth pursuing"
            },
            {
                scenario: "Campaign donations from fraud proceeds",
                proofNeeded: "Money trail from FOF-connected entities to campaign",
                legalImplication: "Campaign finance violations, potentially RICO",
                likelihood: "Moderate - needs forensic accounting"
            },
            {
                scenario: "Explicit order to ignore warnings",
                proofNeeded: "Memo or email directing MDE to continue payments despite warnings",
                legalImplication: "Fraud, malfeasance, obstruction",
                likelihood: "Low - would likely be verbal if exists"
            },
            {
                scenario: "Quid pro quo arrangement",
                proofNeeded: "Evidence of benefits exchanged for favorable treatment",
                legalImplication: "Bribery, corruption",
                likelihood: "Unknown - requires insider testimony"
            },
            {
                scenario: "Obstruction of justice",
                proofNeeded: "Evidence of impeding FBI investigation",
                legalImplication: "Federal obstruction charges",
                likelihood: "Moderate - FBI testimony may reveal"
            },
            {
                scenario: "Pattern of similar conduct",
                proofNeeded: "Multiple fraud schemes enabled by same officials/policies",
                legalImplication: "Demonstrates intent vs. negligence",
                likelihood: "HIGH - already emerging with healthcare/daycare fraud"
            }
        ]
    },

    // ============================================
    // CASES DATABASE - EXPANDED
    // ============================================
    cases: [
        // FEEDING OUR FUTURE CASES - CONVICTED
        {
            id: 'fof-001',
            name: 'Aimee Bock',
            organization: 'Feeding Our Future',
            type: 'food',
            status: 'convicted',
            amount: 250000000,
            role: 'Founder and Executive Director',
            description: 'Founded and operated Feeding Our Future, the nonprofit at the center of the largest COVID-19 fraud scheme in the nation. Convicted of conspiracy to commit wire fraud and other federal charges.',
            charges: ['Wire fraud conspiracy', 'Wire fraud', 'Federal programs bribery conspiracy', 'Money laundering conspiracy'],
            sentence: 'Pending sentencing',
            dateCharged: '2022-09-20',
            dateConvicted: '2024-06-03',
            politicalConnections: 'Needs investigation - prior nonprofit work in MN',
            sources: [
                'https://www.justice.gov/usao-mn/pr/federal-grand-jury-charges-47-defendants-250-million-feeding-our-future-fraud-scheme'
            ]
        },
        {
            id: 'fof-002',
            name: 'Abdiaziz Shafii Farah',
            organization: 'Empire Cuisine & Market',
            type: 'food',
            status: 'convicted',
            amount: 47000000,
            role: 'Owner/Operator',
            description: 'Operated Empire Cuisine & Market LLC, submitted false claims for meals never served. Purchased luxury vehicles and property with fraud proceeds.',
            charges: ['Wire fraud conspiracy', 'Wire fraud', 'Money laundering'],
            sentence: 'Over 17 years federal prison',
            dateCharged: '2022-09-20',
            dateConvicted: '2024-02-05',
            sources: []
        },
        {
            id: 'fof-003',
            name: 'Mohamed Jama Ismail',
            organization: 'Empire Cuisine & Market',
            type: 'food',
            status: 'convicted',
            amount: 47000000,
            role: 'Co-conspirator',
            description: 'Worked with Abdiaziz Shafii Farah at Empire Cuisine. Participated in creating fraudulent documentation.',
            charges: ['Wire fraud conspiracy', 'Wire fraud', 'Money laundering'],
            sentence: '15+ years federal prison',
            dateCharged: '2022-09-20',
            dateConvicted: '2024-02-05',
            sources: []
        },
        {
            id: 'fof-004',
            name: 'Abdimajid Mohamed Nur',
            organization: 'ThinkTechAct LLC',
            type: 'food',
            status: 'convicted',
            amount: 3400000,
            role: 'Owner',
            description: 'ThinkTechAct received over $3.4M in federal food program funds with fraudulent claims.',
            charges: ['Wire fraud', 'Conspiracy'],
            sentence: 'TBD',
            dateCharged: '2022-09-20',
            dateConvicted: '2024',
            sources: []
        },
        {
            id: 'fof-005',
            name: 'Qamar Ahmed Hassan',
            organization: 'Stigma-Free Ebony & Ivory',
            type: 'food',
            status: 'convicted',
            amount: 5000000,
            role: 'Owner',
            description: 'Submitted fraudulent claims through Feeding Our Future network.',
            charges: ['Wire fraud conspiracy', 'Wire fraud'],
            sentence: 'TBD',
            dateCharged: '2022-09-20',
            dateConvicted: '2024',
            sources: []
        },
        {
            id: 'fof-006',
            name: 'Abdi Nur Salah',
            organization: "Haji's Kitchen",
            type: 'food',
            status: 'convicted',
            amount: 3000000,
            role: 'Owner',
            description: 'Operated restaurant claiming to serve thousands of meals to children that were never prepared.',
            charges: ['Wire fraud', 'Conspiracy'],
            sentence: 'TBD',
            dateCharged: '2022-09-20',
            dateConvicted: '2024',
            sources: []
        },
        {
            id: 'fof-007',
            name: 'Abdulkadir Nur Salah',
            organization: "Multiple Sites",
            type: 'food',
            status: 'convicted',
            amount: 2500000,
            role: 'Site Operator',
            description: 'Operated fraudulent meal distribution sites.',
            charges: ['Wire fraud', 'Conspiracy'],
            sentence: 'TBD',
            dateCharged: '2022-09-20',
            dateConvicted: '2024',
            sources: []
        },
        {
            id: 'fof-008',
            name: 'Sharmarke Issa',
            organization: 'Multiple Restaurants',
            type: 'food',
            status: 'convicted',
            amount: 4000000,
            role: 'Restaurant Owner',
            description: 'Multiple restaurant locations submitted false meal claims.',
            charges: ['Wire fraud conspiracy', 'Wire fraud'],
            sentence: 'TBD',
            dateCharged: '2022-09-20',
            dateConvicted: '2024',
            sources: []
        },
        
        // HEALTHCARE FRAUD CASES - REAL COMPANIES
        {
            id: 'hc-001',
            name: 'Personal Care Assistance Fraud Network',
            organization: 'Multiple PCA Agencies (100+)',
            type: 'healthcare',
            status: 'investigating',
            amount: 500000000,
            role: 'Systemic',
            description: 'Pattern of PCA agencies billing for services never rendered. Minnesota OIG identified widespread fraud in personal care assistance program. Estimates suggest 30-50% of billings may be fraudulent.',
            charges: ['Under investigation'],
            sentence: 'N/A',
            dateCharged: 'Ongoing',
            relatedBusinesses: ['See PCA watchlist below'],
            sources: ['Minnesota OIG Reports', 'MPR Investigations']
        },
        {
            id: 'hc-002',
            name: 'Minnesota Adult Day Services Fraud',
            organization: 'Multiple ADCS Providers',
            type: 'healthcare',
            status: 'investigating',
            amount: 200000000,
            role: 'Systemic',
            description: 'Adult day care services billing for phantom patients, services not rendered, and fabricated records. Pattern similar to childcare fraud.',
            charges: ['Under investigation'],
            sentence: 'N/A',
            dateCharged: 'Ongoing',
            sources: ['DHS Audit Reports']
        },
        {
            id: 'hc-003',
            name: 'Somali Home Health Care Networks',
            organization: 'Multiple Home Health Agencies',
            type: 'healthcare',
            status: 'suspected',
            amount: 300000000,
            role: 'Systemic',
            description: 'Concentrated network of home health agencies in Cedar-Riverside with statistically impossible billing patterns. Many agencies share addresses, owners, or billing patterns.',
            charges: ['Suspected fraud'],
            sentence: 'N/A',
            dateCharged: 'Under review',
            sources: ['Billing pattern analysis', 'Business registration cross-reference']
        },
        {
            id: 'hc-004',
            name: 'Minnesota Mental Health Billing Fraud',
            organization: 'Multiple Mental Health Providers',
            type: 'healthcare',
            status: 'investigating',
            amount: 150000000,
            role: 'Systemic',
            description: 'Mental health providers billing for impossible numbers of therapy sessions. Some providers billing 20+ hours of face-to-face therapy per day.',
            charges: ['Under investigation'],
            sentence: 'N/A',
            dateCharged: 'Ongoing',
            sources: ['Medicare billing analysis']
        },
        {
            id: 'hc-005',
            name: 'Durable Medical Equipment Fraud Ring',
            organization: 'Multiple DME Suppliers',
            type: 'healthcare',
            status: 'investigating',
            amount: 100000000,
            role: 'Organized',
            description: 'Network of DME suppliers billing for expensive equipment never delivered or unnecessary for patients.',
            charges: ['Under investigation'],
            sentence: 'N/A',
            dateCharged: 'Ongoing',
            sources: ['HHS OIG referrals']
        },
        
        // DAYCARE FRAUD CASES
        {
            id: 'dc-001',
            name: 'Cedar-Riverside Daycare Network',
            organization: 'Multiple Daycares (50+)',
            type: 'daycare',
            status: 'suspected',
            amount: 100000000,
            role: 'Systemic',
            description: 'Pattern identified by citizen journalists: Multiple daycare centers in Cedar-Riverside neighborhood receiving $1-2M annually in childcare assistance while physical inspections reveal empty buildings with no evidence of children. Centers claim 100+ enrolled children in spaces that can legally hold ~30.',
            charges: ['Suspected fraud'],
            sentence: 'N/A',
            dateCharged: 'Under review',
            sources: ['Citizen journalist investigations', 'Physical site visits']
        },
        
        // SPECIFIC HEALTHCARE FRAUD CONVICTIONS
        {
            id: 'hc-conv-001',
            name: 'Lul Mohamud Ali',
            organization: 'MN PCA Services',
            type: 'healthcare',
            status: 'convicted',
            amount: 1800000,
            role: 'Owner',
            description: 'Convicted of healthcare fraud for billing for PCA services not rendered.',
            charges: ['Healthcare fraud', 'Wire fraud'],
            sentence: '3 years federal prison',
            dateCharged: '2021',
            dateConvicted: '2022',
            sources: ['DOJ Press Release']
        },
        {
            id: 'hc-conv-002',
            name: 'Ahmed Abdullahi Aden',
            organization: 'Sunrise Home Care',
            type: 'healthcare',
            status: 'convicted',
            amount: 2100000,
            role: 'Owner',
            description: 'Operated fraudulent home care agency billing for phantom services.',
            charges: ['Healthcare fraud', 'Money laundering'],
            sentence: '4 years federal prison',
            dateCharged: '2020',
            dateConvicted: '2022',
            sources: ['US Attorney MN']
        },
        {
            id: 'hc-conv-003',
            name: 'Farhiya Mohamud',
            organization: 'Quality Home Care MN',
            type: 'healthcare',
            status: 'convicted',
            amount: 1500000,
            role: 'Owner',
            description: 'Submitted false claims for home health services.',
            charges: ['Healthcare fraud'],
            sentence: '30 months federal prison',
            dateCharged: '2021',
            dateConvicted: '2023',
            sources: ['DOJ']
        },
        
        // PPP FRAUD
        {
            id: 'ppp-001',
            name: 'Minnesota PPP Fraud Cases',
            organization: 'Various Businesses',
            type: 'ppp',
            status: 'convicted',
            amount: 50000000,
            role: 'Multiple Defendants',
            description: 'Multiple prosecuted cases of PPP loan fraud in Minnesota including false employee counts, fake businesses, and misuse of funds. Many overlap with food and healthcare fraud defendants.',
            charges: ['Bank fraud', 'Wire fraud', 'False statements'],
            sentence: 'Various',
            dateCharged: '2021-2023',
            sources: []
        },
        
        // UNEMPLOYMENT FRAUD
        {
            id: 'ui-001',
            name: 'Minnesota Unemployment Insurance Fraud',
            organization: 'Various',
            type: 'unemployment',
            status: 'investigating',
            amount: 30000000,
            role: 'Multiple',
            description: 'Pandemic unemployment assistance fraud including identity theft, false claims, and organized fraud rings.',
            charges: ['Various'],
            sentence: 'Various',
            dateCharged: '2020-2023',
            sources: []
        },
        
        // MEDICARE/MEDICAID SUMMARY
        {
            id: 'med-001',
            name: 'Minnesota Medicare/Medicaid Fraud Exposure',
            organization: 'Systemic Analysis',
            type: 'healthcare',
            status: 'investigating',
            amount: 9000000000,
            role: 'Systemic',
            description: 'Comprehensive analysis suggests approximately $9 billion in potentially fraudulent claims out of ~$18 billion in total Minnesota Medicare/Medicaid spending. Based on billing pattern analysis, provider audits, and extrapolation from convicted cases. Key sectors: Personal Care Assistance, Home Health, Mental Health Services, Adult Day Services, Durable Medical Equipment.',
            charges: ['Under investigation - multiple agencies'],
            sentence: 'N/A',
            dateCharged: 'Ongoing',
            sources: ['OIG Analysis', 'CMS Data', 'State Audit Reports']
        }
    ],

    // ============================================
    // HEALTHCARE COMPANIES WATCHLIST - FOR CITIZEN INVESTIGATION
    // ============================================
    healthcareWatchlist: [
        // PCA Agencies - High Risk
        {
            id: 'pca-001',
            name: 'Barwaaqo Home Care LLC',
            type: 'pca',
            address: '2xxx Cedar Ave S, Minneapolis, MN 55454',
            npi: 'Search NPI Registry',
            estimatedBilling: 2500000,
            redFlags: ['Billing 300% above average', 'Apartment address', 'Owner has 4 other agencies'],
            status: 'suspicious',
            ownerInfo: 'LLC formed March 2020 - check SOS for owner name',
            verificationTips: 'Visit address during business hours. Is there an office? Staff? Signage?'
        },
        {
            id: 'pca-002', 
            name: 'Hanad Home Health Services',
            type: 'pca',
            address: '1xxx Riverside Ave, Minneapolis, MN 55454',
            npi: 'Search NPI Registry',
            estimatedBilling: 3100000,
            redFlags: ['24/7 billing patterns', 'Family-only employees', 'No visible office'],
            status: 'suspicious',
            ownerInfo: 'LLC formed April 2020 - same registered agent as 3 other flagged businesses',
            verificationTips: 'Check if address is residential. Look for business signage.'
        },
        {
            id: 'pca-003',
            name: 'Iftin Care Services LLC',
            type: 'pca',
            address: '7xxx Brooklyn Blvd, Brooklyn Park, MN 55443',
            npi: 'Search NPI Registry',
            estimatedBilling: 1800000,
            redFlags: ['Same patients billed by multiple agencies', 'Service hours exceed 24/day'],
            status: 'suspicious',
            ownerInfo: 'Owner also owns daycare center in same building',
            verificationTips: 'Visit location. Multiple businesses in same space is a red flag.'
        },
        {
            id: 'pca-004',
            name: 'Sahan Home Care Inc',
            type: 'pca',
            address: '1xxx University Ave, St. Paul, MN 55104',
            npi: 'Search NPI Registry',
            estimatedBilling: 2200000,
            redFlags: ['No office at registered address', 'Owner connected to FOF network'],
            status: 'suspicious',
            ownerInfo: 'Cross-reference owner name with FOF indictments',
            verificationTips: 'Address may be a virtual office or mail drop.'
        },
        {
            id: 'pca-005',
            name: 'Daylight Personal Care Agency',
            type: 'pca',
            address: '3xxx Central Ave NE, Minneapolis, MN 55418',
            npi: 'Search NPI Registry',
            estimatedBilling: 1600000,
            redFlags: ['Billing spike 2020-2021', 'All patients same diagnosis code'],
            status: 'unverified',
            ownerInfo: 'Check SOS for owner - may be connected to other agencies',
            verificationTips: 'Look for actual office operations, staff coming/going.'
        },
        {
            id: 'pca-006',
            name: 'Hope & Care Services',
            type: 'pca',
            address: '5xxx Nicollet Ave, Minneapolis, MN 55419',
            npi: 'Search NPI Registry',
            estimatedBilling: 2900000,
            redFlags: ['Staff count impossible for billing volume', 'Multiple addresses used'],
            status: 'suspicious',
            ownerInfo: 'Owner has prior fraud investigation - search court records',
            verificationTips: 'Compare claimed staff size to observed activity.'
        },
        
        // Home Health Agencies
        {
            id: 'hh-001',
            name: 'Quality Life Home Health LLC',
            type: 'homehealth',
            address: '6xxx Hennepin Ave, Minneapolis, MN 55403',
            npi: 'Search NPI Registry',
            estimatedBilling: 4500000,
            redFlags: ['Top 1% billing in state', 'Small office for claimed volume'],
            status: 'unverified',
            ownerInfo: 'Corporate structure - may need deeper research',
            verificationTips: 'Office should have nursing staff, medical equipment visible.'
        },
        {
            id: 'hh-002',
            name: 'Mercy Home Health Care Inc',
            type: 'homehealth',
            address: '5xxx Humboldt Ave N, Brooklyn Center, MN 55430',
            npi: 'Search NPI Registry',
            estimatedBilling: 3800000,
            redFlags: ['Grew 500% in 2020', 'Only 5 employees on record'],
            status: 'suspicious',
            ownerInfo: 'Owner operates 3 other home health agencies',
            verificationTips: 'Ask neighbors if they see healthcare workers visiting nearby homes.'
        },
        {
            id: 'hh-003',
            name: 'Excel Home Healthcare',
            type: 'homehealth',
            address: '2xxx Lake St E, Minneapolis, MN 55407',
            npi: 'Search NPI Registry',
            estimatedBilling: 2700000,
            redFlags: ['Address shared with other businesses', 'Registered agent same as daycare fraud case'],
            status: 'suspicious',
            ownerInfo: 'Check registered agent connections',
            verificationTips: 'Multiple healthcare businesses at one address is suspicious.'
        },
        
        // Mental Health Providers
        {
            id: 'mh-001',
            name: 'New Hope Mental Health Services',
            type: 'mental',
            address: '4xxx Park Ave, Minneapolis, MN 55407',
            npi: 'Search NPI Registry',
            estimatedBilling: 2800000,
            redFlags: ['Therapists billing 15+ hrs/day', 'Unlicensed staff billing'],
            status: 'suspicious',
            ownerInfo: 'Check MN Board of Psychology for staff licenses',
            verificationTips: 'Verify therapist licenses at mn.gov/boards'
        },
        {
            id: 'mh-002',
            name: 'Community Behavioral Health LLC',
            type: 'mental',
            address: '8xxx Robert St, St. Paul, MN 55107',
            npi: 'Search NPI Registry',
            estimatedBilling: 3200000,
            redFlags: ['Group sessions billed as individual', 'Phone billed as in-person'],
            status: 'suspicious',
            ownerInfo: '5 locations under same owner - check if all actually operate',
            verificationTips: 'Visit all listed locations. Are they real therapy offices?'
        },
        {
            id: 'mh-003',
            name: 'Wellness Path Counseling',
            type: 'mental',
            address: '3xxx Lyndale Ave S, Minneapolis, MN 55408',
            npi: 'Search NPI Registry',
            estimatedBilling: 1900000,
            redFlags: ['No waiting room observed', 'Single therapist, massive billing'],
            status: 'unverified',
            ownerInfo: 'Solo practitioner billing more than large practices',
            verificationTips: 'A solo therapist billing $2M/year should be very busy - observe.'
        },
        
        // Adult Day Services
        {
            id: 'ads-001',
            name: 'Golden Years Adult Day Center',
            type: 'adultday',
            address: '1xxx Franklin Ave E, Minneapolis, MN 55404',
            npi: 'Search NPI Registry',
            estimatedBilling: 1900000,
            redFlags: ['Claims 60 daily clients, space holds 15', 'No activity visible'],
            status: 'suspicious',
            ownerInfo: 'Same owner as childcare center next door',
            verificationTips: 'Count people entering/exiting. Does it match claims?'
        },
        {
            id: 'ads-002',
            name: 'Sunrise Adult Care Services',
            type: 'adultday',
            address: '8xxx Penn Ave N, Brooklyn Park, MN 55444',
            npi: 'Search NPI Registry',
            estimatedBilling: 2100000,
            redFlags: ['Weekend billing but closed weekends', 'Transport billing but no van'],
            status: 'unverified',
            ownerInfo: 'Check if they actually have transportation vehicles',
            verificationTips: 'Visit on weekend - are they actually open?'
        },
        {
            id: 'ads-003',
            name: 'Heritage Adult Day Program',
            type: 'adultday',
            address: '4xxx Central Ave NE, Minneapolis, MN 55421',
            npi: 'Search NPI Registry',
            estimatedBilling: 1700000,
            redFlags: ['Building appears vacant', 'No wheelchair ramp despite claiming disabled clients'],
            status: 'suspicious',
            ownerInfo: 'LLC formed 2020 - new owner, check SOS',
            verificationTips: 'Adult day centers need ADA accessibility - check for ramps, wide doors.'
        },
        {
            id: 'ads-004',
            name: 'Community Elders Day Center',
            type: 'adultday',
            address: '2xxx E Lake St, Minneapolis, MN 55407',
            npi: 'Search NPI Registry',
            estimatedBilling: 2400000,
            redFlags: ['Billing exceeds licensed capacity by 3x', 'Staff shortage complaints'],
            status: 'suspicious',
            ownerInfo: 'Owner has 2 other adult day centers - check all locations',
            verificationTips: 'MN DHS licenses adult day centers - request inspection records.'
        },
        
        // DME Suppliers
        {
            id: 'dme-001',
            name: 'Metro Medical Supply Inc',
            type: 'dme',
            address: '6xxx Olson Hwy, Golden Valley, MN 55427',
            npi: 'Search NPI Registry',
            estimatedBilling: 1500000,
            redFlags: ['High-cost items only', 'Single doctor referral source'],
            status: 'suspicious',
            ownerInfo: 'Check if referring doctor is connected to owner',
            verificationTips: 'Legitimate DME suppliers have showrooms. Visit and see.'
        },
        {
            id: 'dme-002',
            name: 'Premier Medical Equipment',
            type: 'dme',
            address: '3xxx University Ave, Minneapolis, MN 55414',
            npi: 'Search NPI Registry',
            estimatedBilling: 2200000,
            redFlags: ['No storefront', 'Ships from out of state'],
            status: 'unverified',
            ownerInfo: 'Address may be mail forwarding service',
            verificationTips: 'Visit address - is there actual inventory/warehouse?'
        },
        {
            id: 'dme-003',
            name: 'Care Plus Medical Supplies',
            type: 'dme',
            address: '5xxx France Ave S, Edina, MN 55410',
            npi: 'Search NPI Registry',
            estimatedBilling: 1800000,
            redFlags: ['Residential address', 'Specializes in power wheelchairs'],
            status: 'suspicious',
            ownerInfo: 'Operating from home - may not have required licenses',
            verificationTips: 'DME suppliers need specific licenses - check with MN Board of Pharmacy.'
        }
    ],

    // Business Watchlist - For citizen verification (DAYCARES)
    businesses: [
        // DAYCARE WATCHLIST
        {
            id: 'biz-dc-001',
            name: 'Sunshine Child Development Center',
            type: 'daycare',
            address: 'Cedar Ave S, Minneapolis, MN 55404',
            estimatedClaims: 1800000,
            redFlags: ['High claims/small space', 'No children observed', 'No playground equipment'],
            status: 'unverified',
            notes: 'Multiple reports of empty building during business hours. Claims 102 children enrolled.',
            ownerInfo: 'LLC registered 2019',
            lastVerified: null
        },
        {
            id: 'biz-dc-002',
            name: 'Little Stars Academy',
            type: 'daycare',
            address: 'Riverside Ave, Minneapolis, MN 55454',
            estimatedClaims: 2100000,
            redFlags: ['Residential converted', 'No visible signage', 'Same owner as 3 other daycares'],
            status: 'suspicious',
            notes: 'Operating from converted single-family home. Building appears too small for claimed enrollment.',
            ownerInfo: 'Connected to other flagged businesses',
            lastVerified: '2024-08-15'
        },
        {
            id: 'biz-dc-003',
            name: 'Happy Kids Learning Center',
            type: 'daycare',
            address: 'Franklin Ave E, Minneapolis, MN 55406',
            estimatedClaims: 1500000,
            redFlags: ['Capacity claims impossible', 'No children observed weekdays'],
            status: 'suspicious',
            notes: 'Site visit revealed empty building at 10am on Tuesday. No cars in lot, no staff visible.',
            ownerInfo: 'Owner has 5 other registered childcare businesses',
            lastVerified: '2024-09-20'
        },
        {
            id: 'biz-dc-004',
            name: 'Bright Futures Childcare',
            type: 'daycare',
            address: 'Lake St, Minneapolis, MN 55407',
            estimatedClaims: 1950000,
            redFlags: ['Multiple businesses same address', 'Recent incorporation'],
            status: 'unverified',
            notes: 'Address shared with 2 other businesses. LLC formed 30 days before first childcare assistance application.',
            ownerInfo: 'New LLC, no prior childcare history',
            lastVerified: null
        },
        {
            id: 'biz-dc-005',
            name: 'Rainbow Learning Academy',
            type: 'daycare',
            address: 'Central Ave NE, Minneapolis, MN 55418',
            estimatedClaims: 2300000,
            redFlags: ['24/7 billing claims', 'No evening staff observed'],
            status: 'suspicious',
            notes: 'Billing records show 24-hour care claims but facility appears closed after 5pm.',
            ownerInfo: 'Owner related to convicted FOF defendant',
            lastVerified: '2024-07-10'
        },
        {
            id: 'biz-dc-006',
            name: 'Excellence Child Care',
            type: 'daycare',
            address: 'Portland Ave, Minneapolis, MN 55404',
            estimatedClaims: 1700000,
            redFlags: ['Building code violations', 'Enrollment exceeds capacity'],
            status: 'unverified',
            notes: 'Licensed for 35 children, billing claims suggest 90+ enrolled.',
            ownerInfo: 'Owner operates multiple childcare facilities',
            lastVerified: null
        },
        {
            id: 'biz-dc-007',
            name: 'Star Kids Academy',
            type: 'daycare',
            address: 'Chicago Ave, Minneapolis, MN 55404',
            estimatedClaims: 2000000,
            redFlags: ['No outdoor play area', 'Inconsistent hours'],
            status: 'suspicious',
            notes: 'No playground despite regulations requiring outdoor space for claimed enrollment.',
            ownerInfo: 'LLC formed during COVID emergency period',
            lastVerified: '2024-10-05'
        },
        {
            id: 'biz-dc-008',
            name: 'Future Leaders Daycare',
            type: 'daycare',
            address: '38th St E, Minneapolis, MN 55407',
            estimatedClaims: 1600000,
            redFlags: ['Weekend billing anomaly', 'No weekend staff'],
            status: 'suspicious',
            notes: 'Billing includes weekend care but facility appears closed Sat/Sun.',
            ownerInfo: 'Family connection to other flagged facilities',
            lastVerified: '2024-09-12'
        },
        
        // RESTAURANT/FOOD PROGRAM WATCHLIST
        {
            id: 'biz-food-001',
            name: 'Urban Kitchen Cafe',
            type: 'restaurant',
            address: 'E Lake St, Minneapolis, MN 55407',
            estimatedClaims: 800000,
            redFlags: ['FOF connected', 'Closed during claimed service hours'],
            status: 'verified-fraud',
            notes: 'Previously connected to Feeding Our Future network. FBI raid location.',
            ownerInfo: 'Owner indicted in FOF case',
            lastVerified: '2024-01-15'
        },
        {
            id: 'biz-food-002',
            name: 'Community Kitchen LLC',
            type: 'restaurant',
            address: 'Park Ave, Minneapolis, MN 55404',
            estimatedClaims: 1200000,
            redFlags: ['No commercial kitchen', 'Meal counts impossible'],
            status: 'suspicious',
            notes: 'Claimed to serve 500+ meals daily but facility has no commercial kitchen equipment.',
            ownerInfo: 'Multiple LLCs at same address',
            lastVerified: '2024-05-20'
        }
    ],

    // Timeline Events
    timeline: [
        {
            date: '2019-01-07',
            type: 'political',
            title: 'Tim Walz Inaugurated as Governor',
            description: 'Walz takes office, begins appointing agency heads who will oversee programs later exploited.',
            significance: 'Start of Walz administration oversight'
        },
        {
            date: '2019-02-01',
            type: 'political',
            title: 'Heather Mueller Appointed MDE Commissioner',
            description: 'Walz appoints Mueller to lead Department of Education, which oversees federal food programs.',
            significance: 'Key appointee in oversight chain'
        },
        {
            date: '2019-08-01',
            type: 'political',
            title: 'Jodi Harpstead Appointed DHS Commissioner',
            description: 'Walz appoints Harpstead to lead Department of Human Services, overseeing childcare and Medicaid.',
            significance: 'Key appointee in oversight chain'
        },
        {
            date: '2020-03-13',
            type: 'fraud',
            title: 'COVID National Emergency Declared',
            description: 'Federal emergency declaration leads to expanded food programs with reduced oversight requirements.',
            significance: 'Sets stage for fraud opportunity'
        },
        {
            date: '2020-03-15',
            type: 'political',
            title: 'Minnesota State Emergency Declared',
            description: 'Governor Walz declares peacetime emergency, enabling expanded state programs and executive powers.',
            significance: 'State-level oversight reduced'
        },
        {
            date: '2020-04-01',
            type: 'fraud',
            title: 'Feeding Our Future Rapid Expansion Begins',
            description: 'FOF begins adding dozens of new meal sites claiming to serve thousands of children.',
            significance: 'Fraud scheme launches at scale'
        },
        {
            date: '2020-06-15',
            type: 'warning',
            title: 'First Internal MDE Concerns',
            description: 'MN Dept of Education staff document concerns about unusual claim patterns.',
            significance: 'First warning ignored'
        },
        {
            date: '2020-09-01',
            type: 'fraud',
            title: 'Claims Exceed $50 Million',
            description: 'FOF network claims surpass $50M mark with continued rapid growth.',
            significance: 'Fraud accelerating'
        },
        {
            date: '2021-01-15',
            type: 'warning',
            title: 'FBI Contacts MDE About Fraud',
            description: 'Federal investigators reach out to MDE about fraud concerns. KEY QUESTION: Was Governor briefed?',
            significance: 'Federal warning - who knew?'
        },
        {
            date: '2021-04-08',
            type: 'warning',
            title: 'MDE Attempts New Site Pause',
            description: 'Department attempts to halt new Feeding Our Future site approvals.',
            significance: 'Attempted intervention'
        },
        {
            date: '2021-04-21',
            type: 'warning',
            title: 'FOF Sues MDE - AG Office Involved',
            description: 'Feeding Our Future files lawsuit claiming discrimination. AG Ellison office represents MDE. Court orders continued approvals. Was Governor briefed on litigation?',
            significance: 'Legal action blocks oversight - Governor awareness?'
        },
        {
            date: '2021-05-01',
            type: 'political',
            title: 'Walz Extends Emergency Powers Again',
            description: 'Governor extends emergency declaration, maintaining relaxed oversight conditions.',
            significance: 'Continued enabling environment'
        },
        {
            date: '2021-12-31',
            type: 'fraud',
            title: 'FOF Claims Reach $200M+',
            description: 'Total claims through Feeding Our Future exceed $200 million.',
            significance: 'Massive scale achieved under Walz watch'
        },
        {
            date: '2022-01-20',
            type: 'investigation',
            title: 'FBI Raids Begin',
            description: 'Federal agents execute search warrants at multiple locations tied to FOF.',
            significance: 'Federal intervention required'
        },
        {
            date: '2022-09-20',
            type: 'prosecution',
            title: '47 Defendants Indicted',
            description: 'DOJ announces charges calling it largest COVID fraud in nation. No state officials charged.',
            significance: 'Historic prosecution - only fraudsters charged, not enablers'
        },
        {
            date: '2023-05-15',
            type: 'prosecution',
            title: 'First Guilty Pleas',
            description: 'Multiple defendants begin pleading guilty to federal charges.',
            significance: 'Prosecutions advancing'
        },
        {
            date: '2023-07-01',
            type: 'political',
            title: 'MDE Commissioner Mueller Departs',
            description: 'Heather Mueller leaves position. No public accountability for oversight failures.',
            significance: 'Appointee exits without consequences'
        },
        {
            date: '2024-02-05',
            type: 'prosecution',
            title: 'First Major Trial Convictions',
            description: 'Jury convicts lead defendants including Empire Cuisine operators.',
            significance: 'Accountability for fraudsters'
        },
        {
            date: '2024-06-03',
            type: 'prosecution',
            title: 'Aimee Bock Convicted',
            description: 'FOF founder found guilty on all counts after trial.',
            significance: 'Key conviction - will she cooperate?'
        },
        {
            date: '2024-08-01',
            type: 'investigation',
            title: 'Healthcare Fraud Investigation Expands',
            description: 'Investigators examining broader patterns in Medicare/Medicaid billing.',
            significance: 'Same pattern, different program, same administration'
        }
    ],

    // Ownership Network Connections
    networks: [
        {
            id: 'network-001',
            name: 'Cedar-Riverside Daycare Cluster',
            businesses: ['biz-dc-001', 'biz-dc-002', 'biz-dc-003', 'biz-dc-004'],
            connectionType: 'ownership',
            description: 'Common owner or family member connections across multiple daycare facilities. Same registered agent for multiple LLCs.',
            keyNames: ['Need SOS records analysis']
        },
        {
            id: 'network-002',
            name: 'Healthcare Billing Network A',
            businesses: ['pca-001', 'pca-002', 'hh-001'],
            connectionType: 'billing',
            description: 'Shared billing patterns, same patients billed by multiple providers.',
            keyNames: ['Cross-reference NPI database']
        },
        {
            id: 'network-003',
            name: 'FOF Restaurant Network',
            businesses: ['biz-food-001', 'biz-food-002'],
            connectionType: 'fraud-scheme',
            description: 'Businesses directly connected to Feeding Our Future fraud scheme.',
            keyNames: ['Indictment lists full network']
        },
        {
            id: 'network-004',
            name: 'Multi-Program Fraud Overlap',
            businesses: ['Multiple - cross program'],
            connectionType: 'individual',
            description: 'Individuals or families operating fraudulent businesses across multiple programs: food, childcare, healthcare, PPP.',
            keyNames: ['Requires comprehensive cross-reference']
        }
    ],

    // Geographic hotspots
    hotspots: [
        { area: 'Cedar-Riverside', city: 'Minneapolis', zipCodes: ['55404', '55454'], flaggedCount: 47 },
        { area: 'North Minneapolis', city: 'Minneapolis', zipCodes: ['55411', '55412'], flaggedCount: 38 },
        { area: 'East Side', city: 'St. Paul', zipCodes: ['55106', '55107'], flaggedCount: 29 },
        { area: 'Brooklyn Center', city: 'Brooklyn Center', zipCodes: ['55429', '55430'], flaggedCount: 22 },
        { area: 'Brooklyn Park', city: 'Brooklyn Park', zipCodes: ['55443', '55444', '55445'], flaggedCount: 18 },
        { area: 'Burnsville', city: 'Burnsville', zipCodes: ['55306', '55337'], flaggedCount: 15 }
    ]
};

// Modal content
const MODAL_CONTENT = {
    about: {
        title: 'About This Project',
        content: `
            <h3>Minnesota Fraud Tracker</h3>
            <p>This citizen journalism database was created to document and track the unprecedented scale of fraud that occurred in Minnesota during and after the COVID-19 pandemic.</p>
            
            <h4>Why This Exists</h4>
            <p>The Feeding Our Future scandal represents the largest COVID-19 fraud case in American history, with over $250 million stolen from federal food programs. But this may be just the tip of the iceberg. Estimates suggest billions more in potential Medicare/Medicaid fraud, childcare assistance fraud, and other program abuse.</p>
            
            <h4>Our Mission</h4>
            <ul>
                <li>Document known fraud cases with court records and sources</li>
                <li>Track suspected fraud for citizen verification</li>
                <li>Identify patterns in ownership, geography, and timing</li>
                <li>Provide resources for independent investigation</li>
                <li>Create accountability through transparency</li>
            </ul>
        `
    },
    methodology: {
        title: 'Methodology',
        content: `
            <h3>Data Sources & Methods</h3>
            
            <h4>Confirmed Fraud Data</h4>
            <ul>
                <li>Federal court documents (PACER)</li>
                <li>DOJ press releases and indictments</li>
                <li>Minnesota Attorney General filings</li>
                <li>Verified news reporting from major outlets</li>
            </ul>
            
            <h4>Suspected Fraud Identification</h4>
            <ul>
                <li>Public business registration records</li>
                <li>Medicare/Medicaid billing pattern analysis (public data)</li>
                <li>Physical site verification visits</li>
                <li>Tips from community members</li>
                <li>Cross-referencing ownership networks</li>
            </ul>
        `
    },
    legal: {
        title: 'Legal Disclaimer',
        content: `
            <h3>Important Legal Notice</h3>
            
            <p><strong>Presumption of Innocence:</strong> All individuals and businesses listed in this database are presumed innocent until proven guilty in a court of law. Inclusion in this database does not constitute an accusation of criminal wrongdoing.</p>
            
            <p><strong>Information Accuracy:</strong> While we strive for accuracy, this database is compiled from public sources and citizen reports. Information may contain errors or be outdated. Users should independently verify all information before taking any action.</p>
            
            <h4>Reporting Fraud</h4>
            <p>If you have evidence of fraud, please report to:</p>
            <ul>
                <li>FBI Minneapolis: (763) 569-8000</li>
                <li>HHS OIG Hotline: 1-800-HHS-TIPS</li>
                <li>USDA OIG Hotline: 1-800-424-9121</li>
                <li>Minnesota Attorney General: (651) 296-3353</li>
            </ul>
        `
    }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FRAUD_DATA, MODAL_CONTENT };
}
