/* Payments Academy — course content
   Source material: Sibos 2026 fast-enablement sprint.
   Every resource linked here is free to access. */

window.COURSE = {
  meta: {
    title: "Payments Academy",
    tagline: "From payment-flow fundamentals to defensible architectural depth",
    event: "Prepared for Sibos 2026 · Miami · 28 Sep – 1 Oct",
    verified: "September 2026"
  },

  modules: [

  /* ================= MODULE 0 ================= */
  {
    id: "orientation",
    n: "00",
    title: "Orientation",
    subtitle: "What you are actually preparing for, and the numbers that carry the argument",
    units: [
      {
        id: "the-brief",
        title: "The brief",
        mins: 20,
        objective: "Understand what the session is really about and the three claims you need to own.",
        blocks: [
          { t: "p", v: "The session title <em>Scale Without Sacrifice: Architecting High Volume, Always-On Payment Systems</em> is lifted almost word-for-word from a joint Icon Solutions / MongoDB whitepaper. That paper is a benchmark: Icon's IPF running on MongoDB Atlas, pushed from 500 to 6,000 payments per second, then deliberately broken to see what happens." },
          { t: "p", v: "If you learn one artefact in this course, make it that one. The audience will treat it as the evidence base for everything claimed on stage." },
          { t: "h", v: "Your credibility problem, narrowed" },
          { t: "p", v: "This is not \"become a payments expert\". It is three specific things:" },
          { t: "ul", v: [
            "<strong>Domain fluency</strong> — nothing said on the panel is new to you.",
            "<strong>Architectural depth</strong> — you can defend the benchmark against a sceptical head of payments engineering.",
            "<strong>A point of view that is yours</strong> — the data layer as the thing that decides whether a payment platform scales, stays up, and can feed an AI."
          ]},
          { t: "h", v: "Three claims to own, in your own words" },
          { t: "ul", v: [
            "<strong>Scale is an architecture choice, not a hardware purchase.</strong> The benchmark scaled near-linearly by adding shards and pods, not by buying a bigger box — the opposite of how most incumbent payment engines were built.",
            "<strong>Resilience is a data-model property.</strong> Zero data loss under an ungraceful node kill came from event sourcing plus a durable journal. Recovery meant rehydrating state from persisted events, not restoring from a backup.",
            "<strong>ISO 20022 made payments a data problem.</strong> Rich, nested, versioned, jurisdiction-variant messages are what AI and agentic use cases feed on — and are exactly what relational payment schemas handle worst."
          ]},
          { t: "note", v: "Work the modules in order. Modules 1–4 buy vocabulary and arguments; modules 5–7 buy defensible depth. The architecture only lands once you know what a payment actually has to do." }
        ],
        resources: [
          { tag: "Core", title: "Scale your payments technology without sacrifice", url: "https://iconsolutions.com/whitepapers/scale-your-payments-technology-without-sacrifice", note: "The benchmark behind the session title. Read it three times: now, again at the infrastructure module, and the night before." },
          { tag: "Webinar", title: "Payment modernisation with Icon Solutions & MongoDB", url: "https://iconsolutions.com/webinars/payment-modernsation-with-icon-solutions-and-mongodb", note: "How the two organisations already tell this story jointly. Match the framing, then add to it." },
          { tag: "Agenda", title: "Sibos 2026 conference programme", url: "https://www.sibos.com/programme/conference", note: "Scan the adjacent sessions. Knowing what the room heard an hour before you is worth an hour of prep." }
        ],
        check: [
          "State the three claims from memory, in your own phrasing, in under 60 seconds.",
          "Name the one thing you would tell a bank <em>not</em> to do. Having it ready disarms the \"vendor pitch\" objection before it is raised."
        ]
      },
      {
        id: "numbers",
        title: "Twelve numbers to know cold",
        mins: 25,
        objective: "Be able to quote the decisive figures without reaching for notes.",
        blocks: [
          { t: "p", v: "Half of perceived expertise is quoting the right figure at the right moment. These are the ones that will actually come up." },
          { t: "stats", v: [
            { n: "6,000", c: "End-to-end payments per second sustained in the IPF benchmark, across 12 processing steps", s: "Icon × MongoDB", hi: true },
            { n: "0.51 s", c: "Mean end-to-end latency at peak; persistence under 30 ms", s: "Icon × MongoDB", hi: true },
            { n: "~430k", c: "Database operations per second at peak — 236k on the event journal, 196k on the ODS", s: "Icon × MongoDB", hi: true },
            { n: "<90 s", c: "Recovery from an ungraceful node kill under live load, zero data loss, no manual intervention", s: "Icon × MongoDB", hi: true },
            { n: "~5 s", c: "Atlas primary failover, with payment processing continuing throughout", s: "Icon × MongoDB", hi: true },
            { n: "11", c: "Shards total — 5 for the event journal, 6 for the ODS, each M80 (32 vCPU / 128 GB)", s: "Icon × MongoDB" },
            { n: "9 Oct 2025", c: "Euro-area deadline for sending instant payments and offering Verification of Payee", s: "EU Instant Payments Regulation" },
            { n: "Nov 2025", c: "End of MT/MX coexistence for cross-border payment instructions on Swift", s: "CBPR+" },
            { n: "128 M", c: "RTP transactions in Q1 2026 ($480 bn) against FedNow's 2.73 M ($271 bn)", s: "Richmond Fed" },
            { n: "0.12", c: "US fast payments per person per month — against 35 in Thailand, 27 in Brazil", s: "Richmond Fed" },
            { n: "17", c: "Banks piloting live tokenised-deposit transfers on Swift's shared ledger since July 2026", s: "Swift" },
            { n: "~2028", c: "Realistic application date for PSD3 / PSR after the late-2025 political agreement", s: "EU co-legislators" }
          ]},
          { t: "note", v: "Two of these are traps. The RTP/FedNow comparison is not a winner-and-loser story — the average tickets are $3,750 and $99,414 respectively, which means different use-case portfolios. And the 6,000 TPS figure is a controlled benchmark with no core banking system in the loop; say so before someone else does." }
        ],
        resources: [
          { tag: "Regulator", title: "FedNow and the development of U.S. fast payments", url: "https://www.richmondfed.org/publications/research/economic_brief/2026/eb_26-28", note: "Richmond Fed, 2026. The best free source for current US instant-payments numbers." },
          { tag: "Regulator", title: "ECB — Instant Payments Regulation", url: "https://www.ecb.europa.eu/paym/integration/retail/instant_payments/html/instant_payments_regulation.en.html", note: "Authoritative compliance dates. Screenshot the table; you will be asked." }
        ],
        check: [
          "Recite the five benchmark figures without notes.",
          "Explain the RTP vs FedNow gap in one sentence that does not declare a winner."
        ]
      }
    ]
  },

  /* ================= MODULE 1 ================= */
  {
    id: "anatomy",
    n: "01",
    title: "Anatomy of a payment",
    subtitle: "What happens between \"send\" and \"credited\" — and where the money actually moves",
    units: [
      {
        id: "lifecycle",
        title: "The payment lifecycle",
        mins: 45,
        objective: "Narrate a payment end to end from memory, including the steps everyone forgets.",
        blocks: [
          { t: "h", v: "The four-step spine" },
          { t: "ol", v: [
            "<strong>Initiation</strong> — the instruction arrives from a channel: API, host-to-host file, branch, card terminal, scheme gateway.",
            "<strong>Validation and enrichment</strong> — format, scheme rulebook, business rules, account and routing resolution, currency, calendar and cut-off logic.",
            "<strong>Clearing</strong> — the exchange of payment instructions and the calculation of obligations between participants.",
            "<strong>Settlement</strong> — the actual discharge of those obligations, in central bank money or commercial bank money."
          ]},
          { t: "h", v: "The steps everyone forgets" },
          { t: "ul", v: [
            "Sanctions screening — a hard latency cost on every single payment, and a frequent source of holds.",
            "Fraud scoring and Verification of Payee.",
            "Limit and liquidity checks — can this customer, and can this bank, actually afford it right now?",
            "Accounting and posting — usually the slowest and most legacy-bound integration in the platform.",
            "Advice, reporting and reconciliation.",
            "Exception handling — investigations, recalls, returns and repairs. Where most operational cost lives."
          ]},
          { t: "h", v: "A payment is a state machine" },
          { t: "p", v: "Every payment must reach a terminal state — settled, rejected, returned. Non-terminal states (pending investigation, on hold, awaiting cover) are where risk accumulates. Hold on to this framing: everything in the architecture modules depends on seeing a payment this way." }
        ],
        resources: [
          { tag: "Rulebook", title: "European Payments Council rulebooks", url: "https://www.europeanpaymentscouncil.eu/", note: "The SCT Inst rulebook is the clearest free document anywhere on how an instant scheme works end to end, including timeouts and R-transactions." },
          { tag: "Regulator", title: "BIS CPMI cross-border payments programme", url: "https://www.bis.org/committees/cpmi/cross-border-payments/overview", note: "The definitional home for clearing, settlement and correspondent banking. Skim the overview and glossary." }
        ],
        check: [
          "Draw, without looking, the message exchange for a euro instant payment that succeeds — and one that times out at the beneficiary bank.",
          "List the six steps between validation and settlement that are not \"clearing\"."
        ]
      },
      {
        id: "rails-terminology",
        title: "Rails — and the words everyone confuses",
        mins: 40,
        objective: "Define a payment rail, and separate real-time, instant and account-to-account for good.",
        blocks: [
          { t: "h", v: "What a rail actually is" },
          { t: "p", v: "\"Rail\" is a metaphor that has hardened into a term of art. A payment rail is the combination of four things: a <strong>scheme rulebook</strong> (who may participate, what they must do, in what time, and who is liable), a <strong>message standard</strong>, the <strong>infrastructure</strong> that carries the messages, and a <strong>settlement arrangement</strong> that discharges the resulting obligations." },
          { t: "p", v: "Miss any one of those and you do not have a rail. This is why people argue about whether stablecoins are a rail: the infrastructure and messaging exist, the rulebook and the settlement finality are the contested parts." },
          { t: "p", v: "Rails are shared infrastructure. Products ride on them — Bizum, Zelle, Wero and a bank's own mobile app are not rails, they are propositions sitting on top of one. Keeping that distinction straight in conversation is a small thing that signals you know the domain." },
          { t: "h", v: "Three words that are not synonyms" },
          { t: "ul", v: [
            "<strong>Real-time payments</strong> — generic: clearing and confirmation within seconds, around the clock. Beware that <em>RTP</em> is also a proper noun, The Clearing House's US network. When someone says \"RTP\" in a US context, ask which one they mean; the ambiguity causes real confusion in vendor conversations.",
            "<strong>Instant payments</strong> — the European scheme and regulatory term, with a precise definition: funds available to the beneficiary within ten seconds, 24/7/365, and irrevocable once accepted. SCT Inst and the Instant Payments Regulation use it this way.",
            "<strong>Account-to-account (A2A)</strong> — describes the <em>route</em>: money moves bank account to bank account without a card network in the middle. It says nothing about speed."
          ]},
          { t: "callout", title: "The distinction to hold on to", v: "A2A is about <strong>topology</strong>. Real-time and instant are about <strong>speed and finality</strong>. They are independent axes. A standard SEPA Credit Transfer is A2A and slow. A card payment is fast to authorise and not A2A at all. SCT Inst happens to be both — which is exactly why people collapse the terms." },
          { t: "h", v: "The grid, filled in" },
          { t: "table", head: ["Instrument", "A2A?", "Speed", "Reversible?"], rows: [
            ["SCT Inst / FedNow / RTP", "Yes", "Seconds, 24/7", "No — irrevocable once accepted"],
            ["SCT (standard SEPA)", "Yes", "Next business day", "Only by recall request, at the beneficiary's discretion"],
            ["SEPA Direct Debit Core", "Yes", "Days, on a mandate cycle", "Yes — 8 weeks no-questions-asked refund"],
            ["ACH credit (US)", "Yes", "Batch, same-day option", "Limited return rights"],
            ["Card payment", "No — via scheme rails", "Authorisation in seconds, settlement in days", "Yes — chargeback rights"],
            ["Card push / OCT", "No", "Near-instant to the card", "Limited"],
            ["Zelle", "Overlay on A2A", "Feels instant to the user", "Very limited"]
          ]},
          { t: "note", v: "Read the reversibility column as the risk column. Irrevocability is what makes instant rails attractive to a merchant and terrifying to a fraud team — it is also why Verification of Payee exists, and why authorised push payment fraud became a policy problem rather than a bank problem." }
        ],
        resources: [
          { tag: "Primer", title: "What are payment rails?", url: "https://stripe.com/resources/more/what-are-payment-rails", note: "Stripe. The clearest short explanation of the concept, and free." },
          { tag: "Primer", title: "Real-time payments explained", url: "https://stripe.com/resources/more/real-time-payments-explained", note: "Useful for how the term is used commercially, as against how schemes define it." },
          { tag: "Primer", title: "Real-time payments vs. ACH", url: "https://stripe.com/resources/more/real-time-payments-vs-ach", note: "Settlement speed, reversibility and when each is the right choice — the reversibility framing is the valuable part." },
          { tag: "Primer", title: "Pay by bank vs. cards: the real cost", url: "https://stripe.com/resources/more/pay-by-bank-vs-cards", note: "A2A versus cards from the merchant's side, which is where the economics actually bite." }
        ],
        check: [
          "Define a payment rail in one sentence using all four components.",
          "Give an example of something that is A2A but not instant, and something that is instant but not A2A.",
          "Explain why irrevocability is both the selling point and the central risk of instant rails."
        ]
      },
      {
        id: "clearing-settlement",
        title: "Clearing is not settlement",
        mins: 35,
        objective: "Distinguish RTGS from deferred net settlement, and explain how instant schemes sit between them.",
        blocks: [
          { t: "h", v: "Two settlement models" },
          { t: "ul", v: [
            "<strong>RTGS — real-time gross settlement.</strong> Every payment settles individually and finally in central bank money. No netting, no credit risk between participants, but high liquidity demand. T2 in the euro area, Fedwire in the US.",
            "<strong>DNS — deferred net settlement.</strong> Obligations accumulate and net down, settling in cycles. Liquidity-efficient, but participants carry exposure to each other between cycles. ACH and CHIPS work this way."
          ]},
          { t: "h", v: "Where instant payments sit" },
          { t: "p", v: "Instant schemes are a hybrid: instant and final to the customer, but underneath either prefunded (participants park cash at the clearing and settlement mechanism) or net-settled on a short cycle. This is why prefunding is a real treasury cost and a common objection in any instant-payments business case." },
          { t: "h", v: "Push versus pull" },
          { t: "p", v: "Credit transfer, direct debit, card authorisation-then-capture, request-to-pay. Each has a different failure mode and a different dispute regime — which is exactly where card economics and account-to-account economics diverge. A card chargeback and a SEPA direct debit refund look similar to a customer and nothing alike to a bank." },
          { t: "note", v: "The single most useful sentence you can carry out of this unit: a customer can be told a payment is confirmed before settlement has occurred, and someone is carrying risk in that gap. Know who, for each rail." }
        ],
        resources: [
          { tag: "Regulator", title: "BIS CPMI — Enhancing cross-border payments step by step", url: "https://www.bis.org/cpmi/publ/brief13.pdf", note: "Short, dense, written by the people who set the agenda." }
        ],
        check: [
          "Explain in two sentences why a payment can be confirmed to a customer before settlement, and who carries the risk.",
          "Describe what prefunding is and why a treasurer objects to it."
        ]
      },
      {
        id: "messages",
        title: "The message layer and identifiers",
        mins: 40,
        objective: "Read an ISO 20022 message name and know instantly what it does.",
        blocks: [
          { t: "h", v: "How to read a message name" },
          { t: "p", v: "The four-letter prefix is the business domain; the number identifies the message. Learn these six and you can follow almost any payments conversation:" },
          { t: "table", head: ["Message", "Domain", "What it is"], rows: [
            ["pain.001", "Payments Initiation", "Customer credit transfer initiation — corporate to bank"],
            ["pacs.008", "Payments Clearing & Settlement", "Interbank customer credit transfer. The workhorse"],
            ["pacs.002", "Payments Clearing & Settlement", "Payment status report — accepted, rejected, pending"],
            ["pacs.004", "Payments Clearing & Settlement", "Payment return"],
            ["camt.056", "Cash Management", "Request to cancel a payment. Opening move of most investigations"],
            ["camt.053", "Cash Management", "Bank-to-customer statement"]
          ]},
          { t: "h", v: "Identifiers" },
          { t: "ul", v: [
            "<strong>IBAN</strong> — account identifier. <strong>BIC</strong> — institution identifier. <strong>LEI</strong> — legal entity identifier, increasingly required for corporates.",
            "<strong>UETR</strong> — the Unique End-to-end Transaction Reference. A UUID carried unchanged across every intermediary. This is what made Swift gpi tracking possible, and it is the answer to \"where is my payment?\".",
            "<strong>End-to-end ID vs transaction ID vs instruction ID</strong> — three different references with three different lifetimes. Confusing them is a genuinely common production bug, and knowing the difference is a credible detail to drop."
          ]},
          { t: "note", v: "Spend a real hour inside an actual pacs.008 definition on iso20022.org. It is worth ten hours of vendor explainers, and it is where the data-layer argument later in this course comes from — the message is deeply nested, optional-field-heavy, and versioned annually." }
        ],
        resources: [
          { tag: "Standard", title: "ISO 20022 message catalogue", url: "https://www.iso20022.org/", note: "Open pacs.008 and read the real message definition." },
          { tag: "Standard", title: "Swift ISO 20022 resource centre", url: "https://www.swift.com/standards/iso-20022", note: "Swift's own primers and FAQs — the framing the Sibos audience uses." }
        ],
        check: [
          "Given camt.029, camt.110 and pain.008, say what each does.",
          "Explain the UETR to a non-technical executive in 20 seconds."
        ]
      },
      {
        id: "flows",
        title: "Inbound and outbound flows",
        mins: 40,
        objective: "Describe both directions of a payment platform, and explain why they are not mirror images.",
        blocks: [
          { t: "p", v: "Payment platforms are almost always discussed as if there were one flow. There are two, they have different failure modes, and the difference is the single most useful thing to understand before looking at any architecture." },
          { t: "h", v: "Outbound — you set the pace" },
          { t: "ol", v: [
            "Instruction arrives from a channel — API, file, branch, mobile.",
            "Validate, enrich, resolve routing: which rail can reach this beneficiary, and what does that rail cost and require?",
            "Risk gauntlet — sanctions, fraud, Verification of Payee, limits, duplicate detection.",
            "Liquidity and limit check: can the customer afford it, and can the bank fund it on this rail right now?",
            "Debit the customer, or reserve the funds.",
            "Format to the scheme and submit.",
            "Wait for the status message, then confirm to the customer — or unwind everything you just did."
          ]},
          { t: "p", v: "The hard part is step seven. Between submission and confirmation there is a window where the outcome is genuinely unknown, and your system must model that as a state rather than an error." },
          { t: "h", v: "Inbound — someone else started the clock" },
          { t: "ol", v: [
            "The scheme delivers a <code>pacs.008</code>. You did not choose when.",
            "Validate, screen, resolve the beneficiary account, check its status — closed, blocked, dormant, wrong currency.",
            "Decide: accept, reject, or accept-without-posting — <em>within the scheme SLA</em>.",
            "Post the credit and make funds available.",
            "Send the <code>pacs.002</code> status back."
          ]},
          { t: "callout", title: "The asymmetry is the whole point", v: "Outbound, you control the pace and can queue work. Inbound, a clock someone else started is already running, and under the Instant Payments Regulation you cannot decline to be reachable. That is why availability requirements bite hardest on the inbound path, and why inbound screening has to be pre-computed or extremely fast — you cannot ask the sender to wait while you think." },
          { t: "h", v: "The flows people forget" },
          { t: "ul", v: [
            "<strong>On-us payments</strong> — both legs at the same institution. They never touch a scheme, so they are routinely missing from capacity models and reconciliation designs, and then someone notices that a third of volume was never counted.",
            "<strong>Returns and R-transactions</strong> — an outbound payment that comes back is an inbound event on a payment you thought was finished.",
            "<strong>Recalls</strong> — a <code>camt.056</code> arriving about a payment you sent is an inbound request that triggers outbound work, and needs a human decision inside a scheme deadline.",
            "<strong>Investigations</strong> — the long-tail flow with no SLA, the highest cost per item, and the worst tooling in most banks."
          ]}
        ],
        resources: [
          { tag: "Primer", title: "Money movement explained", url: "https://stripe.com/resources/more/money-movement-explained", note: "Stripe. How funds actually travel, end to end — a good sanity check on your mental model of both directions." },
          { tag: "Primer", title: "Reason codes for failed SEPA Direct Debits", url: "https://stripe.com/resources/more/sepa-reason-codes", note: "Stripe. The R-transaction reason codes in plain language — this is what the return path actually looks like in production." }
        ],
        check: [
          "Draw both flows side by side and mark where the SLA clock is running in each.",
          "Explain why on-us payments are the most commonly forgotten volume in a capacity model.",
          "State what your system should do when a submitted payment gets no response at all."
        ]
      }
    ]
  },

  /* ================= MODULE 02 — SETTLEMENT ================= */
  {
    id: "settlement",
    n: "02",
    title: "Settlement and scheme mechanics",
    subtitle: "Netting versus instant finality, pull versus prompt, and what the SLAs actually say",
    units: [
      {
        id: "net-vs-instant",
        title: "Net settlement versus instant schemes",
        mins: 40,
        objective: "Explain why instant finality changes the liquidity model, and what that does to the architecture.",
        blocks: [
          { t: "h", v: "Deferred net settlement, and why it was invented" },
          { t: "p", v: "In a netting system, obligations accumulate over a cycle and are then offset multilaterally: if you owe me 100 and I owe you 90, only 10 moves. The liquidity saving is enormous — netting routinely reduces the funds that must actually settle by an order of magnitude — which is precisely why ACH, CHIPS and STEP2 are built this way." },
          { t: "p", v: "The price is risk between cycles. Participants are exposed to each other until settlement completes, which is why netting systems carry <strong>net debit caps</strong>, collateral requirements and loss-sharing arrangements describing what happens if a participant fails before the cycle settles. Those arrangements are the least glamorous and most important part of the rulebook." },
          { t: "h", v: "Instant schemes cannot net" },
          { t: "p", v: "If every payment is final the moment it is accepted, there is no cycle to net across. Each one must be backed by real funds at the moment it happens — 24 hours a day, including weekends when the RTGS system that would normally top you up is closed." },
          { t: "table", head: ["Scheme", "Settlement model", "What a participant must hold"], rows: [
            ["TIPS", "Per transaction, in central bank money, instantly", "A Dedicated Cash Account at the central bank, funded around the clock"],
            ["RT1 (EBA CLEARING)", "Real-time gross settlement in immediately available central bank funds", "Position on a technical account — migrated into TIPS in December 2021, so liquidity is managed in one place and payments flow between RT1 and TIPS participants"],
            ["FedNow", "Instant settlement in participants' Federal Reserve master accounts", "Master account balance, with a separate liquidity transfer mechanism for out-of-hours top-ups"],
            ["RTP (The Clearing House)", "Prefunded joint account at the Federal Reserve", "A funded share of the shared position"],
            ["STEP2", "Deferred net settlement in cycles", "Capacity within the net debit cap"]
          ]},
          { t: "callout", title: "The architectural consequence", v: "In a batch world the liquidity question is answered once per cycle by a treasury team. In an instant world it is answered per payment, in milliseconds, at three in the morning on a Sunday. Real-time position keeping stops being a treasury report and becomes a hot path in the payment engine — which is to say, it becomes a data problem." },
          { t: "p", v: "Weekend and holiday liquidity is the practical pain nobody mentions in vendor decks: the instant rail is open, the RTGS that funds it is not, and someone has to have parked enough cash on Friday to survive until Monday without over-funding and carrying the cost." }
        ],
        resources: [
          { tag: "Primer", title: "Gross vs. net settlement", url: "https://stripe.com/resources/more/gross-vs-net-settlement", note: "Stripe. Short, clear, and exactly the right level for explaining this to a non-specialist." },
          { tag: "Operator", title: "RT1 — EBA CLEARING", url: "https://www.ebaclearing.eu/services-instant-payments/rt1/", note: "Primary source on RT1's settlement model, reach and its relationship to TIPS." },
          { tag: "Operator", title: "STEP2-T settlement", url: "https://www.ebaclearing.eu/services-sepa-payments/step2-t/settlement/", note: "The netting side of the same house — useful directly against the RT1 page." },
          { tag: "Primer", title: "Global settlement systems: what slows them down", url: "https://stripe.com/resources/more/global-settlement-systems", note: "Good framing for why settlement, not messaging, is usually the constraint." }
        ],
        check: [
          "Explain net debit caps and loss-sharing to someone who has only seen instant rails.",
          "Say why weekend liquidity is harder than weekday liquidity, and what a bank does about it.",
          "Describe what real-time position keeping demands of a data platform that a nightly batch does not."
        ]
      },
      {
        id: "dd-vs-rtp",
        title: "Direct debits versus request to pay",
        mins: 40,
        objective: "Understand pull payments, and why request to pay is not a payment instrument at all.",
        blocks: [
          { t: "h", v: "Direct debit is a pull" },
          { t: "p", v: "The creditor initiates, on the authority of a <strong>mandate</strong> the debtor granted earlier. Everything distinctive about direct debit follows from that inversion: the payer is not present at the moment of payment, so the scheme protects them afterwards instead." },
          { t: "ul", v: [
            "<strong>SDD Core</strong> — consumers. An unconditional refund right for eight weeks, no reason required, and thirteen months for an unauthorised collection. That refund right is the product.",
            "<strong>SDD B2B</strong> — businesses. No refund right, and in exchange the debtor's bank must verify the mandate before paying.",
            "<strong>The mandate machinery</strong> — Unique Mandate Reference, Creditor Identifier, amendment and cancellation handling, and a pre-notification obligation before each collection.",
            "<strong>R-transactions</strong> — rejects, refusals, returns, refunds and reversals, each with a different originator, a different deadline and a different liability outcome. This is where the operational cost of direct debit lives."
          ]},
          { t: "h", v: "Request to Pay is a message, not money" },
          { t: "p", v: "SEPA Request-to-Pay (SRTP) is a <em>messaging</em> scheme layered above the payment rails. The payee asks the payer to pay; the payer accepts, rejects, defers or pays in part; and if they accept, a perfectly ordinary credit transfer — usually an instant one — does the actual moving. No money travels on the RtP scheme itself." },
          { t: "callout", title: "Why this matters strategically", v: "Direct debit gives control to the creditor. Request to Pay hands control back to the payer while keeping the creditor's ability to prompt. Pair RtP with an instant credit transfer and you get billing with the creditor's certainty of being asked, the payer's control, immediate finality and no refund liability — which is why it is a structural threat to both direct debit and card-on-file billing." },
          { t: "h", v: "Why it is architecturally awkward" },
          { t: "p", v: "An RtP is a conversation, not a transaction. It has its own lifecycle — issued, accepted, rejected, deferred, partially accepted, expired — that is separate from the lifecycle of the payment it eventually triggers, and the two must be correlated afterwards. It is a state machine sitting on top of another state machine, with a many-to-one relationship between them. Rigid schemas handle this badly, which is a point worth having ready." },
          { t: "p", v: "The UK equivalents to know by name: Pay.UK's Request to Pay, and <strong>variable recurring payments</strong>, the open-banking mechanism that lets a payer authorise repeated variable-amount payments within limits they set — the closest thing yet to a direct debit the payer actually controls." }
        ],
        resources: [
          { tag: "Rulebook", title: "SEPA Request-to-Pay scheme rulebook v4.0", url: "https://www.europeanpaymentscouncil.eu/document-library/rulebooks/sepa-request-pay-scheme-rulebook-version-v40", note: "EPC. Read the status model — it is the part that surprises architects." },
          { tag: "Primer", title: "The SEPA Request-to-Pay scheme explained", url: "https://www.redbridgedta.com/market-intelligence/the-sepa-request-to-pay-scheme-explained/", note: "A shorter way in, from the corporate treasury side." },
          { tag: "Primer", title: "Recurring payments: direct debit vs. card billing", url: "https://stripe.com/gb/resources/more/recurring-payment-processing-101", note: "Stripe. The commercial trade-offs between pull mechanisms, which is how a business actually chooses." }
        ],
        check: [
          "Explain the eight-week refund right and who carries the risk it creates.",
          "State, in one sentence, why Request to Pay is not a payment method.",
          "Describe the correlation problem between an RtP and the credit transfer that settles it."
        ]
      },
      {
        id: "slas",
        title: "SEPA Inst and FedNow: the SLAs in detail",
        mins: 45,
        objective: "Know the timing rules of both schemes precisely enough to reason about a latency budget.",
        blocks: [
          { t: "h", v: "SCT Inst" },
          { t: "ul", v: [
            "<strong>Ten seconds</strong> maximum, measured from the moment the originator's PSP accepts the transaction as valid to the beneficiary PSP confirming that funds are available.",
            "<strong>Twenty seconds</strong> is the hard ceiling for exceptional cases — not a second budget you may plan against.",
            "<strong>24/7/365</strong>, with every participant technically obliged to be available.",
            "<strong>€100,000</strong> scheme maximum per transaction, reviewed annually, with participants free to agree higher limits bilaterally or multilaterally.",
            "<strong>ISO 20022 XML</strong> throughout.",
            "The originator's PSP <em>cannot</em> unilaterally reject once the timer is running — it must wait for a negative confirmation or the timeout. This is the rule that forces you to model \"outcome unknown\" properly."
          ]},
          { t: "h", v: "FedNow" },
          { t: "ul", v: [
            "A <strong>20-second</strong> timeout clock, configurable by the Reserve Banks.",
            "The clock starts from the <strong>message creation timestamp</strong>, not from when FedNow receives it — so your own clock skew and internal queuing eat the budget before the network sees the message.",
            "The receiving institution may reserve <strong>1–5 seconds</strong> for its own response processing. If insufficient time remains for that reserved window, FedNow rejects the message immediately rather than forwarding it.",
            "The receiver answers accept, reject, or <strong>accept without posting (ACWP)</strong> — the escape hatch for when it will honour the payment but cannot complete posting inside the window.",
            "On timeout, FedNow rejects with a <code>pacs.002</code>. A resubmission needs a <strong>new message identifier</strong>, or it is rejected as a duplicate.",
            "If no confirmation arrives, wait until <strong>25 seconds</strong> have elapsed before sending a <code>pacs.028</code> status request — sending it earlier risks creating the duplicate you are trying to avoid."
          ]},
          { t: "table", head: ["", "SCT Inst", "FedNow", "RTP (TCH)"], rows: [
            ["Target time", "10 s (20 s hard ceiling)", "20 s configurable", "Seconds"],
            ["Clock starts", "Originator PSP acceptance", "Message creation timestamp", "On submission"],
            ["Per-transaction cap", "€100,000, bilaterally raisable", "Set by the Reserve Banks, institution-configurable", "Set by TCH, institution-configurable"],
            ["Settlement", "TIPS or RT1, central bank money", "Fed master accounts", "Prefunded joint account"],
            ["Partial-accept option", "No", "Accept without posting", "No"]
          ]},
          { t: "callout", title: "The reading that matters", v: "Both schemes make the unknown outcome a first-class case, and both defend against duplicates explicitly — new message IDs on resubmission, a mandatory wait before a status enquiry. That is a rulebook telling you to build idempotency and a status-request pattern. Take it literally; it is the same requirement the integrity unit arrives at from the engineering side." },
          { t: "p", v: "The other practical point: ten seconds is the budget for the <em>whole chain</em>, not for your hop. Screening, fraud scoring, account resolution, posting, and the network itself all come out of it. Your internal share is a fraction — which is why sub-30-millisecond persistence in the benchmark is worth talking about, and why anyone quoting a database latency without stating the scheme budget it fits inside is not really making an argument." }
        ],
        resources: [
          { tag: "Spec", title: "FedNow: understanding the payment timeout clock", url: "https://explore.fednow.org/resources/readiness-guide-understanding-the-payment-timeout-clock.pdf", note: "Federal Reserve, PDF. Short and unusually concrete. Read it once properly." },
          { tag: "Spec", title: "FedNow Service Operating Procedures", url: "https://www.frbservices.org/binaries/content/assets/crsocms/resources/rules-regulations/093025-fednow-service-operating-procedures.pdf", note: "The full rulebook, PDF. Skim the message-flow and exception sections." },
          { tag: "Spec", title: "FedNow ISO 20022 messages overview", url: "https://explore.fednow.org/resources/readiness-guide-iso-20022.pdf", note: "Which messages FedNow uses and how they differ from the CBPR+ usage you have already seen." },
          { tag: "Rulebook", title: "EPC SCT Inst rulebook and implementation guidelines", url: "https://www.europeanpaymentscouncil.eu/what-we-do/epc-payment-schemes/sepa-instant-credit-transfer/sepa-instant-credit-transfer-rulebook", note: "The authoritative source for the ten-second rule and everything around it." }
        ],
        check: [
          "State both schemes' clocks, including what starts each one.",
          "Explain accept-without-posting and why FedNow needed it.",
          "Decompose the SCT Inst ten seconds across screening, fraud, orchestration, persistence and posting — and say which one you would attack first."
        ]
      }
    ]
  },

  /* ================= MODULE 2 ================= */
  {
    id: "rails",
    n: "03",
    title: "The rails, market by market",
    subtitle: "Europe, the United States, and what happens when a payment crosses a border",
    units: [
      {
        id: "europe",
        title: "Europe",
        mins: 40,
        objective: "Name the scheme, the infrastructure and the settlement model for any euro payment.",
        blocks: [
          { t: "h", v: "Schemes" },
          { t: "ul", v: [
            "<strong>SCT</strong> — SEPA Credit Transfer. The standard euro credit transfer.",
            "<strong>SCT Inst</strong> — the instant variant. Ten seconds end to end, 24/7/365.",
            "<strong>SDD Core and SDD B2B</strong> — SEPA Direct Debit for consumers and businesses, with different refund rights.",
            "<strong>One-Leg Out (OCT/OLO)</strong> — scheme variants for payments where one leg sits outside the EEA."
          ]},
          { t: "h", v: "Infrastructure" },
          { t: "ul", v: [
            "<strong>T2</strong> — the Eurosystem's RTGS, where high-value euro payments settle in central bank money.",
            "<strong>TIPS</strong> — TARGET Instant Payment Settlement. Instant settlement in central bank money, 24/7/365, operated by the Eurosystem.",
            "<strong>RT1</strong> and <strong>STEP2</strong> — EBA CLEARING's instant and bulk clearing and settlement mechanisms.",
            "Note that TIPS and RT1 are <em>competing</em> CSMs for euro instant payments with different liquidity models. Knowing that distinction marks you as someone who has looked at the plumbing."
          ]},
          { t: "h", v: "The domestic overlays" },
          { t: "p", v: "Wero, from the European Payments Initiative, is the sovereignty play — an attempt to build a European account-to-account alternative to the card schemes. It has to displace entrenched national incumbents to succeed: iDEAL in the Netherlands, Bizum in Spain, Blik in Poland, Swish in Sweden. Treat its prospects as an open question rather than a foregone conclusion in either direction." }
        ],
        resources: [
          { tag: "Rulebook", title: "European Payments Council", url: "https://www.europeanpaymentscouncil.eu/", note: "Scheme rulebooks, free PDFs. The SCT Inst rulebook is the one to read." },
          { tag: "Regulator", title: "ECB payments statistics", url: "https://www.ecb.europa.eu/press/stats/paysec/html/index.en.html", note: "Hard volume and value data by instrument. Useful for sanity-checking any vendor claim." }
        ],
        check: [
          "Name the rail and settlement model for: a €12 retail instant payment, a €4 m corporate treasury transfer, and a monthly gym direct debit.",
          "Explain in one sentence what TIPS gives a bank that RT1 does not."
        ]
      },
      {
        id: "united-states",
        title: "The United States",
        mins: 40,
        objective: "Explain the US rail landscape and, more importantly, why instant adoption has been slow.",
        blocks: [
          { t: "h", v: "Five rails" },
          { t: "ul", v: [
            "<strong>ACH</strong> — Nacha-governed, batch, with same-day options. Enormous volume, very low cost.",
            "<strong>Fedwire Funds</strong> — the Fed's RTGS for high-value payments, now ISO 20022-native.",
            "<strong>CHIPS</strong> — privately operated, netted, high-value.",
            "<strong>RTP</strong> — The Clearing House's instant rail, launched 2017.",
            "<strong>FedNow</strong> — the Federal Reserve's instant rail, launched July 2023."
          ]},
          { t: "h", v: "The adoption gap is the story" },
          { t: "table", head: ["", "RTP", "FedNow"], rows: [
            ["Q1 2026 volume", "128 million", "2.73 million"],
            ["Q1 2026 value", "$480 bn", "$271 bn"],
            ["Average ticket", "$3,750", "$99,414"],
            ["Participants", "1,193", "1,725 (19.7% of US institutions)"]
          ]},
          { t: "p", v: "RTP does roughly 47× FedNow's volume at about 1/26th the average ticket. That is two different use-case portfolios, not a winner and a loser." },
          { t: "p", v: "The bigger number: the US runs at <strong>0.12 fast payments per person per month</strong>, against 35 in Thailand, 27 in Brazil and 13 in Sweden. The honest reason is that Zelle, same-day ACH, card push payments and wallets already deliver an instant <em>feel</em>. There is no burning consumer need for true real-time settlement." },
          { t: "h", v: "Cards still dominate the revenue pool" },
          { t: "p", v: "Interchange, scheme fees and acquiring. The US has no interchange cap; Europe has had one since 2015. That single regulatory difference explains most of the divergence in merchant behaviour and account-to-account adoption between the two markets — and it is the bridge into the business-models module." }
        ],
        resources: [
          { tag: "Regulator", title: "FedNow and the development of U.S. fast payments", url: "https://www.richmondfed.org/publications/research/economic_brief/2026/eb_26-28", note: "Richmond Fed, 2026. Current figures and an honest account of the adoption barriers." },
          { tag: "Operator", title: "The Clearing House — RTP", url: "https://www.theclearinghouse.org/payment-systems/rtp", note: "Scheme documentation and use-case material from the operator." },
          { tag: "Operator", title: "Federal Reserve FedNow Service", url: "https://www.frbservices.org/financial-services/fednow", note: "Participant lists, specifications and operating hours." }
        ],
        check: [
          "Answer in 30 seconds: \"Why hasn't the US gone the way of Brazil's Pix?\"",
          "Explain why a US bank and a European bank build the instant-payments business case differently."
        ]
      },
      {
        id: "gateways",
        title: "Gateways, and where every acronym sits",
        mins: 40,
        objective: "Place gateway, RTGS, ACH, RT1, STEP2 and TIPS on one map and never confuse them again.",
        blocks: [
          { t: "h", v: "What a payment gateway is" },
          { t: "p", v: "The term comes from card acceptance: the component that takes a payment request from a merchant's checkout, secures and tokenises the card data, and routes it to an acquirer or processor. Crucially, a gateway <strong>does not clear or settle anything</strong>. It is an access layer — connectivity, protocol translation, security and routing." },
          { t: "p", v: "The word has since spread. Banks talk about a SWIFT gateway, a scheme gateway, a FedNow gateway. The meaning is consistent: a boundary component that fronts a network so the systems behind it do not each have to speak that network's protocol. When someone says gateway, the question to ask is <em>which boundary</em>." },
          { t: "p", v: "Do not confuse it with <strong>payment orchestration</strong>, which sits a layer above and routes across multiple gateways and PSPs — choosing between them on cost, authorisation rates or availability." },
          { t: "h", v: "The four-layer map" },
          { t: "table", head: ["Layer", "What it does", "Examples"], rows: [
            ["Acceptance / access", "Gets the instruction in, secures it, translates protocol", "Card gateway, PSP, acquirer; bank channels, host-to-host, APIs, scheme gateways"],
            ["Processing", "Validates, screens, orchestrates, posts, manages state", "The payment hub — IPF, Temenos, Oracle"],
            ["Clearing (CSM)", "Exchanges instructions between institutions and calculates obligations", "RT1, STEP2, TIPS, FedACH, EPN, CHIPS"],
            ["Settlement", "Discharges the obligations with real money", "T2, Fedwire, TIPS, Fed master accounts"]
          ]},
          { t: "h", v: "Now the acronyms, placed" },
          { t: "ul", v: [
            "<strong>RTGS</strong> — both a settlement <em>model</em> (gross, immediate, final, in central bank money) and the systems that implement it: T2 in the euro area, Fedwire in the US. Settlement layer.",
            "<strong>ACH</strong> — automated clearing house. Generically a batch, netted clearing system; in the US specifically the networks operating under Nacha rules, FedACH and EPN. Clearing layer.",
            "<strong>STEP2</strong> — EBA CLEARING's pan-European bulk CSM for SEPA credit transfers and direct debits. Europe's closest equivalent to an ACH: netted, cyclical. Clearing layer.",
            "<strong>RT1</strong> — EBA CLEARING's instant CSM for SCT Inst and One-Leg-Out instant transfers. Real-time gross, not netted. Clearing layer, settling in central bank funds.",
            "<strong>TIPS</strong> — the Eurosystem's instant settlement service. It spans both layers: it clears and it settles, in central bank money, on Dedicated Cash Accounts."
          ]},
          { t: "callout", title: "The relationship people get wrong", v: "RT1 and TIPS are often described as competitors, and for instant clearing they are. But RT1's technical account migrated into TIPS in December 2021, so RT1 settles through TIPS and a participant can manage liquidity for both in one place and exchange instant payments across them. \"Competing but interconnected\" is the accurate phrase, and using it correctly is a quiet credibility signal." },
          { t: "p", v: "One more distinction worth keeping sharp: TIPS is not simply \"the European FedNow\". FedNow is an operator-run clearing and settlement service that institutions join directly. TIPS is a settlement service that both institutions <em>and other clearing mechanisms</em> connect to. The topologies differ, and so do the liquidity models." }
        ],
        resources: [
          { tag: "Primer", title: "Payment orchestration vs. payment gateway", url: "https://stripe.com/resources/more/payment-orchestration-vs-payment-gateway", note: "Stripe. Settles the gateway-versus-orchestration confusion in ten minutes." },
          { tag: "Primer", title: "The payment industry ecosystem explained", url: "https://stripe.com/resources/more/the-payment-industry-ecosystem-explained", note: "Stripe. The acceptance side of the map, which bank-centric material tends to skip." },
          { tag: "Operator", title: "RT1 — EBA CLEARING", url: "https://www.ebaclearing.eu/services-instant-payments/rt1/", note: "Primary source on RT1 and its interconnection with TIPS." },
          { tag: "Regulator", title: "ECB — TARGET services", url: "https://www.ecb.europa.eu/paym/target/html/index.en.html", note: "T2 and TIPS from the operator. The authority on what settles where." }
        ],
        check: [
          "Place all five acronyms on the four-layer map from memory.",
          "Explain the RT1 and TIPS relationship in one accurate sentence.",
          "Say what a gateway does <em>not</em> do — and why that matters when someone proposes replacing one."
        ]
      },
      {
        id: "cross-border",
        title: "Cross-border",
        mins: 40,
        objective: "Explain correspondent banking, the G20 targets, and what is actually changing.",
        blocks: [
          { t: "h", v: "How it works today" },
          { t: "p", v: "Correspondent banking: a chain of banks holding accounts with each other. <strong>Nostro</strong> is our account with them; <strong>vostro</strong> is their account with us. A cover payment moves the funds along the chain while the instruction travels over Swift. The costs are the chain length, the trapped liquidity in nostro accounts, and the compliance check at every hop." },
          { t: "p", v: "De-risking has shortened the chains and concentrated corridors, which is good for cost and bad for access — one of the reasons the G20 got involved." },
          { t: "h", v: "The G20 roadmap" },
          { t: "p", v: "Four targets, and you should know all four: <strong>cost, speed, access, transparency</strong>. Swift gpi and the UETR addressed transparency and much of speed. Cost and access remain stubborn." },
          { t: "h", v: "What is changing" },
          { t: "ul", v: [
            "<strong>Interlinking</strong> — connecting domestic instant systems directly rather than routing through correspondents. Project Nexus is the multilateral attempt; bilateral scheme links already exist.",
            "<strong>Tokenised deposits</strong> — Swift's shared blockchain ledger went into live pilot on 9 July 2026 with 17 banks across six continents, moving funds continuously before final settlement through existing systems. Concept to activation in nine months.",
            "<strong>Stablecoins</strong> — now a regulated instrument in both major markets, and therefore a genuine cross-border option rather than a crypto curiosity. Covered in the regulation module."
          ]},
          { t: "note", v: "The Swift ledger will be a hallway topic in Miami. Read the primary press release rather than the coverage — the coverage overstates it in both directions." }
        ],
        resources: [
          { tag: "Regulator", title: "FSB — G20 Roadmap for Enhancing Cross-border Payments", url: "https://www.fsb.org/uploads/P091025-1.pdf", note: "The targets everyone cites at Sibos." },
          { tag: "News", title: "Swift's shared blockchain ledger goes live with 17 banks", url: "https://www.swift.com/news-events/press-releases/swifts-blockchain-ledger-ready-use-17-banks-set-pioneer-tokenised-cross-border-payments-trusted-global-infrastructure", note: "July 2026. Primary source." }
        ],
        check: [
          "Name the four G20 targets and say which two have moved most.",
          "Explain what tokenised deposits change about the correspondent model — and what they do not."
        ]
      }
    ]
  },

  /* ================= MODULE 3 ================= */
  {
    id: "economics",
    n: "04",
    title: "Where the money is made",
    subtitle: "Business models in Europe and the United States, and why they diverge",
    units: [
      {
        id: "revenue-lines",
        title: "The five revenue lines",
        mins: 35,
        objective: "Explain whose P&L a platform decision hits.",
        blocks: [
          { t: "p", v: "Technology arguments lose to economics arguments inside a bank. If you can name the P&L line, you stop being the database person and start being the industry principal." },
          { t: "ol", v: [
            "<strong>Transaction fees</strong> — per-payment pricing, heavily commoditised in Europe.",
            "<strong>Interchange and scheme fees</strong> — the card stack. Capped in the EU since 2015, uncapped in the US.",
            "<strong>Float and net interest income</strong> — earnings on balances held between instruction and settlement.",
            "<strong>FX spread</strong> — often the largest single margin in cross-border, and the one PSD3 forces into the open.",
            "<strong>Value-added services</strong> — data, fraud, reconciliation, working capital, cash forecasting."
          ]},
          { t: "callout", title: "The uncomfortable truth about instant payments", v: "Instant rails destroy float and compress transaction fees. There is almost never an incremental-revenue case for instant payments infrastructure. The defensible cases are regulatory deadlines, cost-to-serve, and the ability to launch a new scheme without running a programme. Saying this out loud, against your own interest, is one of the strongest credibility moves available to you." },
          { t: "h", v: "Cost-to-serve is the real metric" },
          { t: "ul", v: [
            "Cost per transaction at peak, not at average.",
            "Cost of a failed payment — typically an order of magnitude higher than a successful one.",
            "Cost of an investigation, and the straight-through rate that determines how many you get.",
            "Cost of absorbing a scheme mandate release, twice a year, forever."
          ]},
          { t: "p", v: "These four are what a payments COO actually manages. They are also the bridge from architecture to economics: every one of them is a function of platform design." }
        ],
        resources: [
          { tag: "Report", title: "McKinsey Global Payments Report", url: "https://www.mckinsey.com/industries/financial-services/our-insights/global-payments-report", note: "Free, annual, and the source most of the room silently quotes. Read the revenue-pool section closely." }
        ],
        check: [
          "Build the one-slide business case for a European bank replacing its payment engine, given that instant payments generate almost no incremental fee revenue.",
          "Explain why the same bank in the US would build it differently."
        ]
      },
      {
        id: "institutions",
        title: "Who is who, and what their licence lets them do",
        mins: 40,
        objective: "Name the institution types in any payment flow and say what each is licensed and exposed to.",
        blocks: [
          { t: "p", v: "Two rules make this whole taxonomy tractable. <strong>The licence determines what you are allowed to do. The risk you bear determines what you buy.</strong> Everything below is an application of those two." },
          { t: "h", v: "The account-holding side" },
          { t: "ul", v: [
            "<strong>Banks / credit institutions</strong> — take deposits, hold customer accounts, and can hold accounts at the central bank. Direct access to RTGS settlement is the deepest structural privilege in payments, and it is what everyone else is ultimately renting.",
            "<strong>Payment institutions (PIs)</strong> — licensed under PSD2, and under PSD3 in a regime merged with e-money. They execute payments but cannot take deposits. EU policy has been steadily opening payment-system access to them, and under the Instant Payments Regulation non-bank PSPs pick up instant obligations from April 2027.",
            "<strong>E-money institutions (EMIs)</strong> — issue electronic money against received funds. PSD3 folds them into the payment-institution regime, which is one of the package's quieter but more consequential changes.",
            "<strong>Banking-as-a-service providers</strong> — rent their licence and rails to non-licensed brands. The regulatory question is always who is actually accountable when something fails."
          ]},
          { t: "h", v: "The card side" },
          { t: "ul", v: [
            "<strong>Issuer</strong> — gives the cardholder the card, carries credit and fraud loss.",
            "<strong>Acquirer</strong> — contracts with the merchant, carries merchant credit risk and chargeback exposure.",
            "<strong>Scheme</strong> — Visa, Mastercard and the domestic schemes. Sets rules, sets interchange, moves no money itself.",
            "<strong>Processor</strong> — does the technical work on behalf of issuers or acquirers. A large share of the industry's actual transaction processing sits here, invisibly.",
            "<strong>Payment facilitator (PayFac)</strong> — aggregates sub-merchants under its own acquiring relationship, taking on their onboarding and fraud risk in exchange for speed and margin.",
            "<strong>Merchant of record</strong> — the legal seller. Owns tax, compliance and chargeback liability for the sale. Distinct from who processes the payment, and routinely confused with it."
          ]},
          { t: "h", v: "The open-banking side" },
          { t: "ul", v: [
            "<strong>AISP</strong> — account information service provider. Reads account data with the customer's consent.",
            "<strong>PISP</strong> — payment initiation service provider. Initiates a payment directly from the customer's bank account, bypassing the card rails entirely. This is the licence that makes A2A commerce possible.",
            "<strong>TPP</strong> — the umbrella term for both. FIDA extends the same logic beyond payment accounts into the wider product estate."
          ]},
          { t: "h", v: "Which institutions show up in which model" },
          { t: "table", head: ["Business model", "Institutions in the flow", "Who carries the risk"] , rows: [
            ["Card e-commerce", "Issuer, scheme, acquirer, gateway/PSP, processor, merchant", "Issuer (fraud), acquirer (merchant default and chargebacks)"],
            ["Marketplace / platform", "PayFac or merchant of record, acquirer, scheme, sub-merchants", "The PayFac or MoR, for onboarding, fraud and tax"],
            ["A2A / pay by bank", "PISP, payer's bank, payee's bank, CSM", "Largely the payer's bank — no chargeback mechanism to fall back on"],
            ["Domestic instant transfer", "Both banks, CSM, settlement service", "Both banks; irrevocability means fraud loss lands hard"],
            ["Direct debit billing", "Creditor, creditor bank, debtor bank, CSM", "Creditor and creditor bank, through refund rights"],
            ["Cross-border correspondent", "Originating bank, correspondents, beneficiary bank, Swift", "Each bank in the chain, plus compliance exposure at every hop"],
            ["Embedded finance", "Brand, BaaS provider, licensed bank, scheme or CSM", "The licensed entity, whatever the brand's contract says"]
          ]},
          { t: "note", v: "The pattern worth naming out loud: whoever bears settlement and fraud risk buys resilience and real-time data; whoever bears neither buys flexibility and speed to market. That single sentence predicts most technology procurement in this industry, and it is a genuinely useful thing to be able to say on a panel." }
        ],
        resources: [
          { tag: "Primer", title: "The payment industry ecosystem explained", url: "https://stripe.com/resources/more/the-payment-industry-ecosystem-explained", note: "Stripe. The best free map of who does what on the acceptance side." },
          { tag: "Primer", title: "Merchant of record vs. payment facilitator", url: "https://stripe.com/resources/more/merchant-of-record-vs-payment-facilitator", note: "Clears up the distinction most people get wrong." },
          { tag: "Primer", title: "Payment processor vs. payment facilitator", url: "https://stripe.com/resources/more/payment-processor-vs-payment-facilitator-how-they-are-different-and-how-to-choose-one", note: "The other commonly confused pair." },
          { tag: "Primer", title: "Payfacs: a guide to payment facilitation", url: "https://stripe.com/guides/payfacs", note: "Longer guide, worth it if the marketplace model is new to you." }
        ],
        check: [
          "For a marketplace paying out to sellers in three countries, list every institution in the flow and who carries which risk.",
          "Explain what a PISP can do that a card gateway cannot.",
          "State why direct access to central bank settlement is the structural divide in this industry."
        ]
      },
      {
        id: "operators",
        title: "Operator archetypes and risk",
        mins: 30,
        objective: "Know who bears which risk, because that determines who buys what technology.",
        blocks: [
          { t: "table", head: ["Archetype", "Makes money from", "Bears"], rows: [
            ["Bank / PSP", "Fees, float, NII, FX", "Settlement, credit, compliance, fraud"],
            ["Acquirer", "Merchant service charge", "Merchant credit risk, chargebacks"],
            ["Processor", "Per-transaction processing fees", "Operational and availability risk"],
            ["Scheme", "Scheme fees, assessments", "Rule-setting, brand, systemic risk"],
            ["PayFac", "Margin on sub-merchant pricing", "Sub-merchant onboarding and fraud risk"],
            ["Orchestration layer", "Routing, VAS, subscription", "Almost no financial risk — which shapes what they build"],
            ["Embedded finance platform", "Take rate on the flow", "Depends entirely on the licensing structure"]
          ]},
          { t: "p", v: "The pattern worth naming: whoever bears settlement and fraud risk buys resilience and real-time data. Whoever bears neither buys flexibility and speed to market. That single distinction predicts most technology procurement in payments." },
          { t: "h", v: "Europe and the United States, compared" },
          { t: "ul", v: [
            "<strong>Europe:</strong> interchange capped, SEPA has commoditised the credit transfer, the Instant Payments Regulation forbids charging more for instant than for standard. Banks compete on services and cost-to-serve, and the strategic fight is over who owns the customer interface — Wero, wallets, open banking — not the rail.",
            "<strong>United States:</strong> uncapped credit interchange, a large and profitable card stack, and instant rails positioned around use cases with real willingness to pay — earned wage access, insurance disbursements, gig payouts, and B2B where the rich remittance data is itself the product."
          ]}
        ],
        resources: [
          { tag: "Trade", title: "Payments Dive", url: "https://www.paymentsdive.com/", note: "Daily read. Free." },
          { tag: "Trade", title: "Finextra", url: "https://www.finextra.com/", note: "Broader fintech and banking technology coverage." },
          { tag: "Trade", title: "The Payments Association", url: "https://thepaymentsassociation.org/", note: "Strong on European regulation and industry positioning." }
        ],
        check: [
          "For each of the seven archetypes, say in one phrase what they would most want from a payment platform.",
          "Explain why an orchestration layer and a clearing bank make opposite technology choices."
        ]
      }
    ]
  },

  /* ================= MODULE 4 ================= */
  {
    id: "regulation",
    n: "05",
    title: "Regulation and the 2026 agenda",
    subtitle: "Every rule on this list is, underneath, a data requirement",
    units: [
      {
        id: "clock",
        title: "The compliance clock",
        mins: 35,
        objective: "Know what falls due when, and what each deadline does to the data estate.",
        blocks: [
          { t: "p", v: "This is the single most useful table in the course. The right-hand column is your argument: every one of these is a data requirement wearing a regulatory hat." },
          { t: "table", head: ["When", "What", "Data consequence"], rows: [
            ["9 Jan 2025", "IPR: euro-area PSPs must <em>receive</em> instant payments; no price premium", "24/7/365 availability becomes a legal obligation, not an SLA"],
            ["9 Oct 2025", "IPR: euro-area PSPs must <em>send</em> instant; Verification of Payee live", "Sub-second name-matching against beneficiary data on every payment"],
            ["Nov 2025", "End of MT/MX coexistence for cross-border payment instructions", "ISO 20022 is now the wire format; unconverted MT is rejected"],
            ["Nov 2026", "CBPR+: MT101 invalid; unstructured postal addresses rejected", "Structured or hybrid address data must exist in the customer master — a data-quality programme, not a messaging one"],
            ["Jan–Jul 2027", "IPR obligations extend to non-euro-area and non-bank PSPs", "Multi-currency, multi-jurisdiction instant processing"],
            ["Nov 2027", "CBPR+: exceptions &amp; investigations move to camt.110/111 and camt.029/056", "Case management becomes structured and machine-readable — the opening for agentic investigation"],
            ["~Q2/Q3 2028", "PSD3 / PSR apply after transposition", "Fraud-data sharing between PSPs, IBAN-name checks EU-wide, extended liability"],
            ["Nov 2028", "CBPR+: statements and direct debits migrate to camt.05x and pain.008", "The last MT strongholds fall; ISO-native end to end"]
          ]},
          { t: "note", v: "Re-check the PSD3/PSR dates the week of any event you speak at. Publication timing is still moving." }
        ],
        resources: [
          { tag: "Timeline", title: "ISO 20022 deadlines from 2026 onwards", url: "https://www.redcompasslabs.com/insights/what-now-iso-20022-deadlines-in-2026-onwards/", note: "RedCompass Labs. The clearest free breakdown of what falls due each November through 2028." },
          { tag: "Standard", title: "Swift ISO 20022 implementation FAQs", url: "https://www.swift.com/standards/iso-20022/iso-20022-faqs/implementation", note: "Primary source on coexistence, conversion and contingency validation." }
        ],
        check: [
          "Recite the four dates between now and the end of 2028 that change what a bank must store.",
          "Explain the structured-address requirement to a non-technical executive in under a minute, including why it is a customer-data problem rather than a messaging one."
        ]
      },
      {
        id: "ipr-vop",
        title: "The Instant Payments Regulation and Verification of Payee",
        mins: 35,
        objective: "Explain the most operationally interesting requirement in the whole European package.",
        blocks: [
          { t: "h", v: "The obligations" },
          { t: "table", head: ["Obligation", "Euro area", "Non-euro area"], rows: [
            ["Receive instant payments", "9 Jan 2025", "9 Jan 2027"],
            ["Equality of charges", "9 Jan 2025", "9 Jan 2027"],
            ["Send instant payments", "9 Oct 2025", "9 Jul 2027"],
            ["Verification of Payee", "9 Oct 2025", "9 Jul 2027"],
            ["Non-bank PSPs (receive / send)", "9 Apr 2027", "9 Apr / 9 Jul 2027"]
          ]},
          { t: "h", v: "Why VoP is the interesting one" },
          { t: "p", v: "Verification of Payee checks the beneficiary name against the IBAN before the payment is sent, and returns one of three outcomes: <strong>match</strong>, <strong>close match</strong> (with the actual name disclosed), or <strong>no match</strong>. The payer then chooses whether to proceed — and if they proceed against a warning, liability shifts." },
          { t: "p", v: "Three things this forces on a bank, and they are all data-platform capabilities:" },
          { t: "ol", v: [
            "A <strong>real-time queryable beneficiary directory</strong>, available 24/7 with sub-second response. A nightly batch file cannot satisfy this.",
            "<strong>Fuzzy name matching</strong> at scale, tuned to avoid both false negatives (which annoy customers) and false positives (which defeat the purpose).",
            "A <strong>durable audit record</strong> of what was shown to the payer and what they chose, retained for the life of any potential dispute."
          ]},
          { t: "callout", title: "The sanctions wrinkle", v: "The IPR also changed sanctions screening for instant payments: rather than screening every transaction in-flight, PSPs verify their own customer base against sanctions lists at least daily. This is a meaningful architectural change — it moves a latency cost out of the payment path and into a periodic data process." }
        ],
        resources: [
          { tag: "Regulator", title: "ECB — Instant Payments Regulation", url: "https://www.ecb.europa.eu/paym/integration/retail/instant_payments/html/instant_payments_regulation.en.html", note: "Authoritative dates and scope." },
          { tag: "Analysis", title: "Verification of Payee under the IPR", url: "https://legal.pwc.de/en/news/articles/verification-of-payee-requirements-vop-under-the-eus-instant-payments-regulation-ipr", note: "PwC Legal. Match / close-match / no-match and the liability shift." }
        ],
        check: [
          "State the three data-platform capabilities VoP forces, and why a nightly beneficiary file cannot satisfy it.",
          "Explain the sanctions screening change and why it is architecturally significant."
        ]
      },
      {
        id: "psd3-dora",
        title: "PSD3, PSR, FIDA and DORA",
        mins: 40,
        objective: "Hold a credible view on the European regulatory package without over-predicting the politics.",
        blocks: [
          { t: "h", v: "PSD3 and the PSR" },
          { t: "p", v: "Political agreement was reached in late November 2025; publication in the Official Journal is expected during 2026. The <strong>PSR</strong> is a regulation and applies directly, roughly 18 months after entry into force. <strong>PSD3</strong> is a directive and needs national transposition, putting realistic applicability at around Q2/Q3 2028." },
          { t: "p", v: "The substance:" },
          { t: "ul", v: [
            "<strong>Extended fraud liability</strong>, reaching in certain cases to online platforms that fail to act on known fraud after notification.",
            "<strong>Collaborative fraud-data sharing</strong> between PSPs via a dedicated mechanism — a data-sharing obligation with real architectural implications.",
            "<strong>SCA rework</strong> — clearer rules, more flexible exemptions, stronger verification for high-risk transactions.",
            "<strong>IBAN/name verification</strong> extended to all credit transfers, not just instant ones.",
            "<strong>Licensing harmonisation</strong> — e-money institutions folded into the same regime as payment institutions.",
            "<strong>Transparency</strong> — upfront disclosure of FX margins, which directly attacks one of the five revenue lines in the business-models module."
          ]},
          { t: "h", v: "FIDA" },
          { t: "p", v: "The open finance regulation sitting alongside PSD3, extending data access rights beyond payment accounts into the wider financial product estate. Where PSD2 gave third parties access to accounts, FIDA extends the principle — with compensation arrangements, which PSD2 lacked." },
          { t: "h", v: "DORA — the one that matters for your session" },
          { t: "p", v: "Already applying. DORA turns resilience from an engineering preference into an auditable obligation: ICT risk management, incident classification and reporting, third-party oversight including critical ICT providers, and threat-led penetration testing." },
          { t: "callout", title: "Why this is your bridge", v: "When you quote a 90-second recovery figure on stage, DORA is why the room cares. Resilience claims used to be a nice-to-have in a vendor deck. They are now evidence for a regulator." }
        ],
        resources: [
          { tag: "Regulator", title: "DORA — Regulation (EU) 2022/2554", url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj", note: "Read Articles 5–16 (ICT risk management) and 24–27 (resilience testing). Skim the rest." },
          { tag: "Analysis", title: "PSD3 and PSR: from provisional agreement to readiness", url: "https://www.openbankingtracker.com/guides/psd3-psr-readiness", note: "Practical readiness framing for technical audiences." }
        ],
        check: [
          "State the PSD3/PSR timeline without over-claiming certainty.",
          "Name the three DORA obligations that a payment platform architecture must directly answer."
        ]
      },
      {
        id: "digital-money",
        title: "Stablecoins and the digital euro",
        mins: 30,
        objective: "Discuss digital money credibly without drifting into price commentary or prediction.",
        blocks: [
          { t: "h", v: "Stablecoins are now regulated instruments" },
          { t: "p", v: "The <strong>GENIUS Act</strong> in the United States and <strong>MiCA</strong> in the European Union have moved stablecoins from crypto-adjacent to a bank treasury and cross-border question. The distinctions worth knowing are structural, not speculative:" },
          { t: "ul", v: [
            "<strong>Reserve requirements</strong> — what backs the token, and how liquid it must be.",
            "<strong>Redemption rights</strong> — at what price, on what notice, from whom.",
            "<strong>Who may issue</strong> — and what that means for a bank considering a tokenised deposit instead."
          ]},
          { t: "p", v: "The practical payments question is narrow and answerable: for which corridors and which settlement windows does a regulated stablecoin beat a correspondent chain? Usually the answer involves weekends, thin corridors, and counterparties who already hold the token." },
          { t: "h", v: "Tokenised deposits are the bank answer" },
          { t: "p", v: "Swift's shared ledger, live in pilot since July 2026 with 17 banks, lets institutions move funds for customers continuously before completing final settlement through existing systems. It is an orchestration layer, not a replacement rail — and describing it that way accurately will distinguish you from most commentary." },
          { t: "h", v: "The digital euro" },
          { t: "p", v: "In pilot preparation, with PSP selection running through 2026 and testing into 2027. Know the status, cite the ECB directly, and decline to predict the politics — the honest position is also the safest one." }
        ],
        resources: [
          { tag: "Regulator", title: "ECB digital euro pilot", url: "https://www.ecb.europa.eu/euro/digital_euro/pilot/html/index.en.html", note: "Current status straight from the source." },
          { tag: "Analysis", title: "How stablecoin regulation is reshaping payments", url: "https://thepaymentsassociation.org/article/how-stablecoin-regulation-is-reshaping-payments-in-2026/", note: "Industry framing rather than crypto framing." }
        ],
        check: [
          "Describe the difference between a stablecoin and a tokenised deposit in two sentences.",
          "Give one corridor where a regulated stablecoin genuinely beats correspondent banking, and one where it does not."
        ]
      }
    ]
  },

  /* ================= MODULE 5 ================= */
  {
    id: "architecture",
    n: "06",
    title: "Inside a payment hub",
    subtitle: "The deep module — this is what earns the panel seat",
    units: [
      {
        id: "hub-anatomy",
        title: "The canonical hub anatomy",
        mins: 50,
        objective: "Whiteboard a payment platform from memory and defend every box on it.",
        blocks: [
          { t: "ol", v: [
            "<strong>Channel and adapter layer</strong> — host-to-host, API, file, scheme gateways. Normalises everything into a canonical internal model, which in practice means ISO 20022 plus extensions.",
            "<strong>Validation and enrichment</strong> — format, scheme rulebook, business rules, account and routing resolution, currency and calendar/cut-off logic.",
            "<strong>Risk gauntlet</strong> — sanctions screening, fraud scoring, Verification of Payee, limits, duplicate detection. Each with its own latency budget, and each capable of parking a payment in a non-terminal state.",
            "<strong>Orchestration engine</strong> — the workflow driving the payment through those steps, per scheme and per product, with compensation paths. In IPF this is configurable flows built in IPF Studio; in Temenos and Oracle it is the payment order engine and process framework.",
            "<strong>Liquidity and settlement</strong> — position keeping, prefunding, RTGS interaction, netting, cut-off management, cover.",
            "<strong>Accounting and posting</strong> — usually the slowest, most contended, most legacy-bound integration in the platform.",
            "<strong>Operations</strong> — investigations, repairs, recalls and returns, reporting, reconciliation, scheme certification."
          ]},
          { t: "callout", title: "The sentence that wins the room", v: "\"Six thousand transactions per second in the hub meets twelve hundred in the core.\" Almost every bank's real bottleneck is posting, not payment processing. Saying so before anyone else does buys more credibility than any benchmark figure." },
          { t: "h", v: "Where state must be durable" },
          { t: "p", v: "Walk the seven layers again and mark every point where state must be durably persisted before you can acknowledge to the customer. That set of points <em>is</em> the write-path design, and it is what the distributed-architecture module is about." }
        ],
        resources: [
          { tag: "Vendor", title: "Icon Payments Framework — architecture overview", url: "https://iconsolutions.com/payments-solutions/ipf-icon-payments-framework/", note: "Your co-presenter's platform. Know its four layers and its non-functional claims by heart." },
          { tag: "Rulebook", title: "SCT Inst rulebook — timeouts and R-transactions", url: "https://www.europeanpaymentscouncil.eu/", note: "Return to this with architecture eyes. The rulebook's timing constraints <em>are</em> the system's non-functional requirements." }
        ],
        check: [
          "Whiteboard the full hub from memory, then mark every durable-persistence point.",
          "Answer: \"What breaks first when you go from 1,000 to 6,000 TPS?\" — and be right."
        ]
      },
      {
        id: "patterns",
        title: "The architectural patterns",
        mins: 50,
        objective: "Discuss the benchmark's design decisions, not just its results.",
        blocks: [
          { t: "ul", v: [
            "<strong>Event sourcing.</strong> Persist the sequence of events and derive state from them. This is why the benchmark could kill a node and rehydrate in-flight payments with zero loss. Know the trade-offs too: replay cost, schema evolution, and the need for snapshots.",
            "<strong>CQRS.</strong> Separate the write path (an event journal tuned for durable append) from the read path (an operational data store tuned for query and reporting). In the benchmark these were two separate MongoDB clusters — five shards and six shards — for exactly this reason.",
            "<strong>Idempotency and effectively-once processing.</strong> Networks retry; money must not. Idempotency keys, deduplication windows and the outbox pattern combine to give effectively-once semantics over at-least-once delivery.",
            "<strong>Back-pressure.</strong> A payment hub is only as fast as its slowest downstream. Back-pressured streams — IPF's connector framework does this — stop a slow core banking system from becoming a cascading failure.",
            "<strong>Sagas and compensation.</strong> There is no distributed transaction spanning a scheme, a core and a sanctions engine. There is a saga with reversals, and the reversals are the hard part.",
            "<strong>State machines and terminal states.</strong> Every payment must reach one. \"No payment left in limbo after a node failure\" is the claim you are on stage to defend."
          ]},
          { t: "callout", title: "The mechanism, stated properly", v: "Zero data loss on an ungraceful kill did not come from a backup. Shard rebalancing redistributed in-flight transactions, and each surviving node rebuilt payment state by replaying persisted events. State was <em>rehydrated</em>, not restored. That distinction is the whole argument, and it is the sentence to have ready." }
        ],
        resources: [
          { tag: "Pattern", title: "Event Sourcing — Martin Fowler", url: "https://martinfowler.com/eaaDev/EventSourcing.html", note: "Twenty minutes, and it gives you the vocabulary." },
          { tag: "Pattern", title: "CQRS — Martin Fowler", url: "https://martinfowler.com/bliki/CQRS.html", note: "Read alongside the above. Together they explain the benchmark's two-cluster topology." }
        ],
        check: [
          "Explain how the benchmark achieved zero data loss — mechanism, not marketing.",
          "Describe a saga in a payment flow and name the hardest compensation step in it."
        ]
      },
      {
        id: "canonical-model",
        title: "The canonical model, ISO 20022, and XML versus JSON",
        mins: 45,
        objective: "Explain why ISO 20022 is not a canonical model, and what a good one carries.",
        blocks: [
          { t: "h", v: "Why a canonical model exists at all" },
          { t: "p", v: "A payment platform speaks many formats in and many formats out. Map each input directly to each output and you have N×M mappings to build and maintain. Introduce one internal representation that everything maps into and out of, and you have N+M. That internal representation is the canonical model, and the arithmetic is the entire justification." },
          { t: "h", v: "The tempting mistake" },
          { t: "p", v: "\"We will just use ISO 20022 as our canonical model.\" It is rich, it is standard, and it is already on the wire. It is also the wrong choice, for four reasons worth being able to give quickly:" },
          { t: "ol", v: [
            "<strong>It is a message standard, not a state model.</strong> A <code>pacs.008</code> describes an instruction at a moment in time. Your platform needs lifecycle, decisions, risk scores, internal enrichment, operator actions and audit — and the message has nowhere to put any of it.",
            "<strong>There is no single ISO 20022.</strong> Every scheme publishes its own usage guideline — CBPR+, SCT Inst, FedNow, TCH — with different mandatory fields, different code lists and different length constraints. They conflict. Picking one as canonical means the others become second-class.",
            "<strong>It versions annually.</strong> You will support several releases at once, indefinitely.",
            "<strong>Not everything is ISO.</strong> ISO 8583 for cards, remaining MT traffic, proprietary bank APIs, and flat files will all outlive your project."
          ]},
          { t: "h", v: "What a good canonical document carries" },
          { t: "ul", v: [
            "<strong>Normalised common fields</strong> — the parts every payment has, whatever arrived: parties, amounts, currency, references, dates.",
            "<strong>The original payload, verbatim.</strong> Keep what actually arrived. It is the forensic record when a dispute, a regulator or an investigation asks what was really sent — and once you have discarded it, no amount of reprocessing brings it back.",
            "<strong>Mapping provenance</strong> — which rule, which version, which agent or which human produced each derived field. This is what makes an automated transformation auditable rather than merely convenient.",
            "<strong>Lifecycle state and decisions</strong> — where the payment is, what was decided, by whom, and why."
          ]},
          { t: "callout", title: "The two problems this actually solves", v: "<strong>Rich to constrained:</strong> a payment carrying structured ISO 20022 remittance data crosses onto a legacy rail that cannot hold it, and the data is silently truncated. <strong>Sparse to rich:</strong> a bandwidth-optimised ISO 8583 message from a point of sale lacks the granularity downstream ISO 20022 compliance requires. A canonical document that keeps both the original and the normalised view lets you detect the first and enrich for the second — neither of which is possible once you have flattened everything into the target format." },
          { t: "h", v: "XML versus JSON — and the claim to stop repeating" },
          { t: "p", v: "ISO 20022 is a <em>model</em>, held in a central repository. XML is its classic serialisation; JSON is an officially supported alternative syntax. So \"ISO 20022 means XML\" is simply wrong, and correcting it gently is a nice way to demonstrate you have read the standard rather than a summary of it." },
          { t: "table", head: ["", "XML", "JSON"], rows: [
            ["Validation", "XSD schema validation, namespaces, mature and strict", "JSON Schema — later to the party, now broadly sufficient"],
            ["Verbosity", "High — tag-heavy, large on the wire", "Substantially lighter"],
            ["Parse cost at volume", "Meaningful at thousands of TPS", "Lower, and closer to how services already work"],
            ["Ecosystem fit", "Deep in banking middleware and scheme tooling", "Native to APIs, and maps directly onto a document store"],
            ["Where it belongs", "On the wire, because the schemes require it", "Internally, because that is what your services and storage want"]
          ]},
          { t: "p", v: "The practical stance most modern platforms land on: <strong>XML at the boundary, document-shaped JSON inside.</strong> The mapping between them is a real cost, and it is precisely why you build the canonical model once rather than once per scheme. It is also the cleanest version of the data-platform argument — a nested, optional-heavy structure that varies by scheme and versions every year is what a document model is for. The relational alternative is a wide sparse table or a join-heavy schema, and either way each annual release becomes a migration." },
          { t: "note", v: "The failure mode to name if someone pushes back: over-normalising. A canonical model that discards what it could not classify is worse than no canonical model, because it destroys evidence while looking tidy." }
        ],
        resources: [
          { tag: "Reference", title: "Unlocking agentic power to modernise cross-border payments", url: "https://www.mongodb.com/company/blog/innovation/unlocking-agentic-power-to-modernize-cross-border-payment-systems", note: "MongoDB. The canonical-document argument in full, including the rich-to-constrained and sparse-to-rich framing. Read the two figures carefully." },
          { tag: "Standard", title: "ISO 20022 message catalogue", url: "https://www.iso20022.org/", note: "The repository itself. Look at how a message is defined before it is serialised — that is the point about model versus syntax." },
          { tag: "Standard", title: "Swift ISO 20022 resource centre", url: "https://www.swift.com/standards/iso-20022", note: "Usage guidelines and the variant problem, from the body that publishes CBPR+." }
        ],
        check: [
          "Give the four reasons ISO 20022 makes a poor canonical model, in under a minute.",
          "Explain rich-to-constrained and sparse-to-rich with a concrete example of each.",
          "Correct the statement \"ISO 20022 is an XML standard\" without being pedantic about it."
        ]
      },
      {
        id: "platforms",
        title: "IPF, Temenos and Oracle compared",
        mins: 40,
        objective: "Compare the three reference platforms without selling any of them.",
        blocks: [
          { t: "table", head: ["Platform", "Shape", "What to notice"], rows: [
            ["Icon IPF", "A framework rather than a product: orchestration engine, functional modules, SDK, cloud-native deployment layer", "Clients own the IP for flows, connectors and mappers — a deliberate anti-lock-in stance. Scheme packs (FedNow, SIC5, SEPA) as pluggable units. Akka, Kafka, Kubernetes, event sourcing and CQRS. Proven on AWS, Azure, IBM Cloud and private environments."],
            ["Temenos Payments Hub", "Packaged, broad functional coverage, ISO 20022-ready, on-premises or SaaS", "Strength is breadth of scheme coverage and packaged functionality. The architectural conversation is about extensibility and the upgrade path."],
            ["Oracle Banking Payments", "Microservices architecture on Kubernetes, part of the wider Oracle Banking stack", "Strong on integration with an existing Oracle core estate, and unusually explicit public documentation of deployment topologies and service boundaries."]
          ]},
          { t: "h", v: "The comparison that matters" },
          { t: "p", v: "You are not selling any of these. Your value on stage is being able to say what all three imply for the data layer underneath — and that is a genuinely under-argued point in the industry." },
          { t: "p", v: "All three converge on the same requirements: a canonical ISO 20022-shaped internal model, per-scheme extensibility without a core rewrite, durable state for every in-flight payment, a read path that does not contend with the write path, and 24/7 operation with no maintenance window. The difference between them is packaging and ownership, not physics." },
          { t: "note", v: "Buy-versus-build framing worth carrying: a packaged product optimises for time-to-first-scheme; a framework optimises for cost-of-the-tenth-scheme. Which one is right depends entirely on how many schemes a bank expects to run." }
        ],
        resources: [
          { tag: "Vendor", title: "Temenos Payments Hub", url: "https://www.temenos.com/wp-content/uploads/2026/03/Temenos-Payments-Hub.pdf", note: "Current datasheet — functional scope and deployment options." },
          { tag: "Docs", title: "Oracle Banking microservices architecture deployments", url: "https://docs.oracle.com/en/industries/financial-services/microservices-common/14.7.5.0.0/obaig/oracle-banking-microservices-architecture-deployments.html", note: "Free and detailed: deployment topologies, scaling units, service boundaries." },
          { tag: "Vendor", title: "Icon Payments Framework", url: "https://iconsolutions.com/payments-solutions/ipf-icon-payments-framework/", note: "The four layers, the SDK, and the IP-ownership model." }
        ],
        check: [
          "Describe each platform's shape in one sentence without recommending any of them.",
          "State the buy-versus-build heuristic and the question it depends on."
        ]
      }
    ]
  },

  /* ================= MODULE 07 — DISTRIBUTED ================= */
  {
    id: "distributed",
    n: "07",
    title: "Distributed architecture and data integrity",
    subtitle: "How horizontal scale actually works, and how you keep money correct while doing it",
    units: [
      {
        id: "sharding",
        title: "Horizontal scale and sharding",
        mins: 45,
        objective: "Explain scale-out properly, and defend a shard key choice to someone who has designed one.",
        blocks: [
          { t: "h", v: "Scale up versus scale out" },
          { t: "p", v: "Vertical scaling buys a bigger machine. It works until it doesn't: there is a largest available box, the price curve turns vicious well before that, and the whole thing remains a single failure domain. Horizontal scaling adds more machines and spreads the data across them. The ceiling moves from \"the biggest server you can buy\" to \"how many servers you are willing to run\"." },
          { t: "p", v: "This is the difference the benchmark was built to demonstrate. Going from 500 to 6,000 payments per second was not a hardware upgrade — it was adding shards and pods, with latency staying flat until peak." },
          { t: "h", v: "How sharding works" },
          { t: "ul", v: [
            "Data is partitioned across <strong>shards</strong> by a <strong>shard key</strong>. Each shard is itself a replica set, so distribution and redundancy stay separate concerns — you are not trading one for the other.",
            "Data is divided into <strong>chunks</strong> by key range, and a <strong>balancer</strong> moves chunks between shards to keep the distribution even.",
            "A query that includes the shard key is <strong>targeted</strong> to a single shard. A query that does not is <strong>scatter-gather</strong> across every shard. In a payment platform, lookups by UETR or end-to-end identifier must be targeted, or your read path degrades as you grow — which is the opposite of the point."
          ]},
          { t: "h", v: "Choosing the shard key — the decision that decides everything" },
          { t: "table", head: ["Property", "What you want", "What goes wrong"], rows: [
            ["Cardinality", "Many distinct values", "Too few values caps how far you can ever split"],
            ["Frequency", "No dominant value", "One value takes most writes and its shard becomes the bottleneck"],
            ["Monotonicity", "Non-sequential, or hashed", "A monotonically increasing key sends every new write to one shard"],
            ["Query alignment", "Present in your hot queries", "Every lookup becomes scatter-gather"]
          ]},
          { t: "callout", title: "The classic payments mistake", v: "Payment identifiers are usually sequential, and creation timestamps always are. Shard on either and every single new payment lands on the same shard — you have bought a distributed system and kept a single write bottleneck. The fixes are a hashed shard key, or a compound key with a high-cardinality prefix. Being able to name this trap unprompted is worth more than any amount of general enthusiasm for scale-out." },
          { t: "h", v: "Zone sharding and data residency" },
          { t: "p", v: "Zones pin key ranges to specific regions. Put a jurisdiction attribute in the shard key, map zones onto regions, and one logical cluster serves several jurisdictions without any customer's data leaving its own. This is the cleanest answer to European data-residency requirements, and it beats the usual alternative of running a separate stack per country." },
          { t: "p", v: "State the cost honestly when you present it: a write that must cross a region boundary pays the latency. The design question is whether the payment's write path ever needs to cross one — and for most retail flows it does not." },
          { t: "h", v: "Replica sets, and what durability means" },
          { t: "ul", v: [
            "A replica set is a primary plus secondaries. Writes go to the primary and replicate.",
            "<strong>Majority write concern</strong> means an acknowledgement only comes back once a majority of members hold the write. That is what \"zero RPO\" means in practice — not a slogan, a setting with a measurable latency cost.",
            "Failover is automatic — around five seconds in the benchmark, with payment processing continuing across it.",
            "Read preference can route reporting and analytics to secondaries so they never contend with the payment write path."
          ]},
          { t: "h", v: "The benchmark as a worked example" },
          { t: "p", v: "Two clusters, split by access pattern: a five-shard event journal, append-heavy, and a six-shard operational data store tuned for query — roughly 236,000 and 196,000 operations per second respectively, on M80-class shards of 32 vCPU and 128 GB. At peak the hot shard sat near 50% CPU and the storage engine's write queue stayed at zero." },
          { t: "note", v: "That last detail is the one to quote. Aggregate throughput hides saturation; per-shard utilisation and an empty write queue are what actually demonstrate headroom. Anyone can publish a big number — showing the per-shard curve is what makes it evidence." }
        ],
        resources: [
          { tag: "Course", title: "MongoDB University — sharding and data modelling", url: "https://learn.mongodb.com/", note: "Free. Do the shard-key selection material properly; it is the highest-leverage two hours in this module." },
          { tag: "Reference", title: "Payments modernisation solution accelerator", url: "https://www.mongodb.com/docs/atlas/architecture/current/solutions-library/payments-solution/", note: "The reference architecture, including how the read and write paths are separated." },
          { tag: "Core", title: "Scale your payments technology without sacrifice", url: "https://iconsolutions.com/whitepapers/scale-your-payments-technology-without-sacrifice", note: "Read the topology and scaling-ladder sections again with shard keys in mind." }
        ],
        check: [
          "Propose a shard key for a payment journal and defend it against the monotonicity objection.",
          "Explain zone sharding for residency, including what it costs.",
          "Say what evidence you would ask a vendor for to substantiate a linear-scaling claim."
        ]
      },
      {
        id: "integrity",
        title: "Integrity, consistency and idempotency",
        mins: 50,
        objective: "Explain how a distributed payment system stays correct — and get idempotency exactly right.",
        blocks: [
          { t: "p", v: "Money is not like other data. A lost message in most systems is an inconvenience; here it is a payment that either happened twice or never happened, and someone has to find out which. Everything below is about making that question answerable." },
          { t: "h", v: "Durability first" },
          { t: "ul", v: [
            "<strong>Majority write concern plus journaling</strong> — the write is acknowledged only once a majority of replica-set members have it durably. Survives the loss of the primary. This is the concrete meaning of RPO zero.",
            "<strong>Majority read concern</strong> — you never read data that could still be rolled back, which matters enormously when the thing you are reading decides whether to send money."
          ]},
          { t: "h", v: "Atomicity, and why the data model decides it" },
          { t: "p", v: "A single-document update is atomic. So if a payment's state lives in one document, almost every state transition needs no distributed transaction at all — the hardest problem in the system disappears by modelling. Multi-document ACID transactions are there for the cases that genuinely span documents, such as a ledger entry and a state change that must move together." },
          { t: "callout", title: "The design rule", v: "Make the atomic unit match the business unit. A payment is one thing conceptually, so make it one thing physically. This is the strongest practical argument for a document model in payments, and it is about correctness, not convenience — which is why it lands with engineers when \"flexible schema\" does not." },
          { t: "h", v: "Idempotency — four mechanisms, and one distinction" },
          { t: "p", v: "Networks retry. At-least-once delivery is all you ever get. Effectively-once processing is what you build on top of it." },
          { t: "ol", v: [
            "<strong>Idempotency key.</strong> The caller supplies a key; you store it under a unique index. On a replay you return the original result instead of re-executing. The unique index does the enforcement — the database, not the application logic, which is the point.",
            "<strong>Deduplication window on scheme identifiers.</strong> Message ID, end-to-end ID, UETR. The schemes assume you do this: FedNow rejects a resubmission that reuses a message identifier.",
            "<strong>Monotonic sequence per aggregate in the event journal.</strong> Appending event N+1 fails if N+1 already exists, so a duplicated command physically cannot append twice. Event sourcing gives you this almost for free.",
            "<strong>The outbox pattern.</strong> Write the state change and the outbound message in one atomic write, then publish separately. This is what prevents both \"posted but never sent\" and \"sent but never posted\" — the two most expensive bugs in payment engineering."
          ]},
          { t: "callout", title: "The distinction that separates people who have done this from people who have read about it", v: "Idempotency is a property of the <strong>operation</strong>, not the request. Retrying \"debit account X by 100 under key K\" is safe. Retrying \"add 100 to the balance\" can never be made safe, whatever you wrap around it. Model commands with identity, not deltas." },
          { t: "h", v: "Consistency across services" },
          { t: "ul", v: [
            "There is no distributed transaction spanning a scheme, a core banking system and a sanctions engine. There is a <strong>saga</strong>: a sequence of local transactions with compensating actions.",
            "The compensations are the hard part, because a compensation can itself fail. Every reversal path needs the same durability and idempotency guarantees as the forward path, and it usually gets a fraction of the design attention.",
            "<strong>Change streams</strong> let downstream processes react to a committed state change without polling and without dual writes — the trigger is the durable write itself, which removes a whole class of race condition."
          ]},
          { t: "h", v: "Two things to say precisely" },
          { t: "ul", v: [
            "<strong>Exactly-once does not exist on the wire.</strong> Effectively-once is achievable at the endpoint. Saying it that way marks you out; saying \"we guarantee exactly-once delivery\" marks you out too, in the other direction.",
            "<strong>Reconciliation is the backstop, not a fallback.</strong> Even with everything above, you reconcile against the scheme and the ledger, because the only real proof of correctness is agreement with the counterparty. Any design that treats reconciliation as an admission of failure has misunderstood the problem."
          ]},
          { t: "note", v: "Notice that the rulebooks arrived at the same place from the other direction: new message identifiers on resubmission, a mandatory wait before a status enquiry, a status-request message defined in the standard. The schemes are specifying idempotency and asking you to implement it. That is a good line." }
        ],
        resources: [
          { tag: "Reference", title: "Unlocking agentic power to modernise cross-border payments", url: "https://www.mongodb.com/company/blog/innovation/unlocking-agentic-power-to-modernize-cross-border-payment-systems", note: "MongoDB. The consistency and control section covers multi-document ACID, schema validation and change streams in the payments context specifically." },
          { tag: "Pattern", title: "Saga pattern", url: "https://microservices.io/patterns/data/saga.html", note: "The canonical write-up. Read the compensating-transaction section twice." },
          { tag: "Pattern", title: "Transactional outbox pattern", url: "https://microservices.io/patterns/data/transactional-outbox.html", note: "The mechanism behind \"never posted without sending, never sent without posting\"." },
          { tag: "Primer", title: "How to prevent duplicate payments", url: "https://stripe.com/resources/more/how-to-prevent-duplicate-payments", note: "Stripe. The same problem stated commercially, which is how you will need to explain it to a non-engineer." }
        ],
        check: [
          "Name the four idempotency mechanisms and say which layer each belongs in.",
          "Explain why retrying a delta is unsafe and retrying a keyed command is not.",
          "Describe what happens when a compensating transaction fails, and how you design for it.",
          "State the difference between exactly-once and effectively-once without hedging."
        ]
      }
    ]
  },

  /* ================= MODULE 6 ================= */
  {
    id: "infrastructure",
    n: "08",
    title: "Infrastructure and the data layer",
    subtitle: "Your home turf — sharpened into the language of a payments operations committee",
    units: [
      {
        id: "nfrs",
        title: "The non-functional requirements",
        mins: 40,
        objective: "State payments NFRs the way a payments COO states them.",
        blocks: [
          { t: "ul", v: [
            "<strong>Availability:</strong> 24/7/365 with no maintenance window. Instant schemes removed the batch night there was to hide in. Active-active across availability zones, and increasingly across regions because of DORA.",
            "<strong>Latency budget:</strong> the scheme gives you a total — often a handful of seconds end to end — and you decompose it across screening, fraud, orchestration, persistence and the core. The benchmark's sub-30 ms persistence at peak matters precisely because it leaves the budget to the risk checks.",
            "<strong>Throughput profile:</strong> payments are spiky. Salary dates, tax deadlines, Black Friday, scheme go-lives. Design for peak-to-mean ratio, never for average.",
            "<strong>RTO / RPO:</strong> for money movement, RPO must be zero. Say it that way — it reframes the entire database conversation from performance to correctness.",
            "<strong>Elastic scale:</strong> horizontal, in units you can add without a migration. Near-linear scaling is the claim; per-shard CPU and insert rates rising proportionally is the evidence.",
            "<strong>Data residency and sovereignty:</strong> increasingly decisive in Europe. Keeping data in-jurisdiction while running one logical platform is a differentiating capability, not a checkbox.",
            "<strong>Observability and auditability:</strong> every state transition traceable, retained, and reconstructable years later for a regulator or a dispute."
          ]},
          { t: "callout", title: "How to say it on stage", v: "Not \"MongoDB is fast\". Instead: \"For money movement RPO has to be zero, and the scheme gives you a two-second budget of which persistence should take under thirty milliseconds. That is the requirement. Everything else is implementation.\"" }
        ],
        resources: [
          { tag: "Regulator", title: "DORA — resilience testing articles", url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj", note: "Articles 24–27. This is why recovery figures now matter to a regulator, not just an architect." }
        ],
        check: [
          "State all seven NFRs from memory in operations-committee language.",
          "Decompose a two-second scheme latency budget across the risk gauntlet, orchestration, persistence and posting."
        ]
      },
      {
        id: "data-argument",
        title: "The data-platform argument",
        mins: 40,
        objective: "Make the case for a document data platform without sounding like a vendor.",
        blocks: [
          { t: "p", v: "ISO 20022 messages are deeply nested, optional-field-heavy, versioned annually and varied by scheme and jurisdiction. Modelling that relationally means either a wide sparse table or a join-heavy schema — and either way, every scheme release becomes a migration." },
          { t: "p", v: "A document model stores the message as it is, evolves without downtime, and lets the event journal and the operational data store be tuned independently. Add horizontal sharding for throughput, replica sets with majority write concern for zero-RPO durability, zone sharding for residency, and search and vector indexes in the same platform for fraud and investigation — and you have removed most of the reasons a payment platform needs four separate data stores." },
          { t: "callout", title: "The ordering matters", v: "Lead with <strong>durability</strong>, not flexibility. Flexibility sounds like a developer convenience; zero RPO under an ungraceful node kill sounds like a control. Make flexibility your second reason, never your first." },
          { t: "h", v: "The operational data layer pattern" },
          { t: "p", v: "The ODL consolidates payment state that would otherwise be scattered across the hub, the core, the screening engine and the case management system. It is what makes real-time investigation, natural-language querying and AI feature extraction possible — and it is the reason the AI module works at all." },
          { t: "h", v: "Proof points worth knowing" },
          { t: "ul", v: [
            "Wells Fargo — over 20 TB per day supporting 80+ microservices.",
            "Macquarie Bank — real-time payments platform, multi-cloud.",
            "Nexi Group — European scale with GDPR-compliant data sharding.",
            "Dojo — settlement, clearing and billing across three cloud providers."
          ]}
        ],
        resources: [
          { tag: "Reference", title: "Payments modernisation solution accelerator", url: "https://www.mongodb.com/docs/atlas/architecture/current/solutions-library/payments-solution/", note: "The reference architecture you should be able to draw. Free and public." },
          { tag: "Course", title: "MongoDB University — sharding and data modelling", url: "https://learn.mongodb.com/", note: "Free. If you are rusty on shard key selection and zone sharding, this is the highest-leverage two hours available." }
        ],
        check: [
          "Make the argument in 90 seconds, leading with durability.",
          "Explain zone sharding for data residency, and name its cost."
        ]
      },
      {
        id: "benchmark-decoded",
        title: "The benchmark, decoded",
        mins: 45,
        objective: "Justify every number in the benchmark from first principles.",
        blocks: [
          { t: "h", v: "The topology" },
          { t: "ul", v: [
            "12 application pods on Kubernetes across three availability zones in a single cloud region.",
            "Akka for concurrent, fault-tolerant processing; Kafka streaming to the operational data store.",
            "IPF's connector framework providing back-pressured streams.",
            "Event sourcing and CQRS as the persistence pattern.",
            "Two MongoDB Atlas clusters: a 5-shard event journal and a 6-shard ODS, each shard M80-class with 32 vCPU and 128 GB RAM."
          ]},
          { t: "h", v: "The results" },
          { t: "table", head: ["Measure", "Result"], rows: [
            ["Throughput ladder", "500 → 6,000 TPS, all 12 processing steps completed end to end at every level"],
            ["Scaling behaviour", "Near-linear; per-shard CPU and insert rates rose proportionally; latency flat until peak"],
            ["Mean end-to-end latency at 6,000 TPS", "0.51 seconds"],
            ["Persistence latency at peak", "Under 30 ms (MongoDB 8.3 ≈ 50% better than 8.0)"],
            ["Database operations at peak", "~430,000/sec — 236k journal, 196k ODS"],
            ["Headroom at peak", "Hot-shard CPU ~50%, pods ~60%, WiredTiger write queue at zero"],
            ["Ungraceful node kill (at 3,500 TPS)", "Recovery under 90 seconds, zero data loss, no manual intervention"],
            ["Planned node shutdown", "Recovery ~60 seconds"],
            ["Atlas primary failover", "~5 seconds, processing continued, no payment loss"]
          ]},
          { t: "callout", title: "Why the 5/6 shard split", v: "The journal and the ODS have opposite access patterns. The journal is an append-heavy write path where durability dominates; the ODS is a query-and-reporting read path. Separate clusters mean a reporting query storm cannot contend with payment persistence, and each can be scaled on its own evidence. The ratio simply reflects where the load landed — it is a tuning outcome, not a design rule." },
          { t: "h", v: "The honest limitations" },
          { t: "p", v: "Single region. No core banking system in the loop. Synthetic load. Say all three before someone else does — then reframe: the value is not the headline number, it is the <em>shape</em> of the curve. Near-linear scaling with flat latency means capacity becomes a procurement decision rather than a re-architecture. That is the property a bank should test for in its own environment, and the benchmark tells you what to measure." }
        ],
        resources: [
          { tag: "Core", title: "The benchmark — methodology and failure tests", url: "https://iconsolutions.com/whitepapers/scale-your-payments-technology-without-sacrifice", note: "Second read. Today, read only the methodology and resilience sections, and write down every number you cannot yet justify from first principles." }
        ],
        check: [
          "Justify the 5-shard journal / 6-shard ODS split. Why not one cluster?",
          "State what you would change to survive a full region loss, and what it costs in latency.",
          "Have a clean answer to \"isn't 6,000 TPS just a big cluster?\" that a sceptical engineer accepts."
        ]
      }
    ]
  },

  /* ================= MODULE 7 ================= */
  {
    id: "ai",
    n: "09",
    title: "AI and agentic AI in payments",
    subtitle: "Sibos 2026's own theme is digital finance for AI-driven economies",
    units: [
      {
        id: "ai-layers",
        title: "Three layers, kept separate",
        mins: 40,
        objective: "Discuss AI in payments specifically rather than breathlessly.",
        blocks: [
          { t: "h", v: "1 — AI <em>in</em> the payment flow" },
          { t: "ul", v: [
            "Real-time fraud scoring inside the latency budget.",
            "Sanctions-screening alert triage and false-positive reduction — often the single largest operational cost line in compliance.",
            "AML transaction monitoring with behavioural rather than purely rule-based detection.",
            "Payment repair — predicting a missing or malformed field instead of routing to a human queue."
          ]},
          { t: "p", v: "This layer is mature, measurable, and the easiest ROI story in payments. Lead with it when someone asks for something concrete." },
          { t: "h", v: "2 — AI <em>around</em> the payment flow" },
          { t: "ul", v: [
            "Investigations and exception handling. The CBPR+ migration to camt.110/111 in November 2027 makes case management structured and machine-readable for the first time — that is the opening.",
            "Reconciliation and cash forecasting.",
            "Scheme-change impact analysis: which flows does this rulebook release break?",
            "Natural-language access to payment operations data, which is where a unified operational data store pays for itself."
          ]},
          { t: "h", v: "3 — Payments <em>initiated by</em> AI" },
          { t: "p", v: "Agentic commerce: the genuinely new layer, and the one the room is least clear on. It gets its own unit." },
          { t: "note", v: "Have one AI use case you would <em>not</em> recommend today, and be able to say why. Knowing where the limits are is a stronger expertise signal than knowing where the opportunities are." }
        ],
        resources: [
          { tag: "Reference", title: "Financial crime mitigation with MongoDB Atlas", url: "https://www.mongodb.com/docs/atlas/architecture/current/solutions-library/fincrime-mitigation/", note: "Concrete architecture for the compliance half of layer one." },
          { tag: "Reference", title: "Real-time card fraud solution accelerator", url: "https://www.mongodb.com/docs/atlas/architecture/current/solutions-library/card-fraud-solution/", note: "The in-flow fraud pattern, end to end." },
          { tag: "Reference", title: "Fraud prevention and AML using vector search", url: "https://www.mongodb.com/docs/atlas/architecture/current/solutions-library/vector-search-fraud-prevention/", note: "Worth being able to describe from memory." }
        ],
        check: [
          "Give a concrete AI use case for each of the three layers.",
          "Name one you would not recommend today, and say why."
        ]
      },
      {
        id: "agentic",
        title: "The agentic payments map",
        mins: 45,
        objective: "Explain the competing protocols and, more usefully, the unsolved problems.",
        blocks: [
          { t: "h", v: "The protocols" },
          { t: "table", head: ["Protocol", "Backer", "Approach"], rows: [
            ["AP2 — Agent Payments Protocol", "Google-led", "Mandate-based: a verifiable credential expressing what the user authorised the agent to buy, under what constraints. Payment-method agnostic"],
            ["ACP — Agentic Commerce Protocol", "OpenAI / Stripe", "Merchant-side checkout for agent-driven purchases"],
            ["x402", "Crypto-native", "Revives HTTP 402 for machine-to-machine on-chain micropayments; an A2A extension exists"],
            ["Visa Intelligent Commerce", "Visa", "Agent identity, tokenised credentials and delegated authority inside the card network"],
            ["Mastercard Agent Pay", "Mastercard", "The equivalent scheme response"]
          ]},
          { t: "h", v: "The hard problems — this is what to actually talk about" },
          { t: "ul", v: [
            "<strong>Authorisation and consent that survives an audit.</strong> What exactly did the human approve, and how do you prove it two years later?",
            "<strong>Agent identity and revocation.</strong> How do you kill an agent's authority instantly, across every merchant it has transacted with?",
            "<strong>SCA with no human present.</strong> Strong Customer Authentication assumes someone is there to authenticate. PSD3/PSR's SCA rework runs headlong into this.",
            "<strong>Liability when an agent buys the wrong thing.</strong> Nobody has a settled answer, and PSR's expanded liability regime was not written with agents in mind.",
            "<strong>Dispute and chargeback semantics</strong> for a transaction no human initiated."
          ]},
          { t: "callout", title: "Your point, and it is a good one", v: "Every agentic transaction needs a durable, queryable record of intent, mandate, constraint and provenance alongside the payment itself — plus semantic search over policy and history for the agent's own decisions. That is a document-and-vector workload, and none of it fits inside the payment message. The rails are not the gap. The record is." },
          { t: "h", v: "What actually has to change in a bank" },
          { t: "ol", v: [
            "Authorisation stops being a single moment and becomes a <strong>mandate with constraints</strong> that must be stored, checked on every use, and revocable. Most PSPs have no infrastructure for this.",
            "Transaction volumes <strong>decouple from human attention</strong>, which breaks the assumptions behind both fraud models and capacity planning.",
            "Audit trails must capture <strong>why</strong> an agent acted, not just what it did."
          ]},
          { t: "p", v: "Be honest that the standards are unsettled and most of the industry is at pilot stage. That honesty is what makes the rest of the answer land." }
        ],
        resources: [
          { tag: "Spec", title: "AP2 — Agent Payments Protocol documentation", url: "https://ap2-protocol.org/", note: "Read the mandate model. It is the clearest published thinking on agent authorisation." },
          { tag: "Spec", title: "A2A x402 extension", url: "https://github.com/google-agentic-commerce/a2a-x402", note: "The crypto-native end of the spectrum, and a useful contrast to AP2's card-and-bank framing." },
          { tag: "Primer", title: "Agentic payments explained: ACP, AP2 and x402", url: "https://orium.com/blog/agentic-payments-acp-ap2-x402", note: "The fastest way to get all three straight. Twenty minutes." },
          { tag: "Event", title: "Sibos 2026 — Swift's own framing of the AI theme", url: "https://www.swift.com/news-events/events/sibos-2026-miami", note: "Echoing the host's language is free credibility." }
        ],
        check: [
          "Explain the difference between AP2 and x402 in three sentences, using the word \"blockchain\" no more than once.",
          "Answer: \"What actually has to change in a bank's payment platform before it can process agent-initiated payments safely?\""
        ]
      },
      {
        id: "agentic-cross-border",
        title: "Agentic AI on the cross-border exception path",
        mins: 45,
        objective: "Make the most concrete agentic argument available in payments today — and know why it is the exception path.",
        blocks: [
          { t: "callout", title: "Lead with this framing", v: "Straight-through processing is already automated. Nobody needs an agent for the payments that work. The value sits in the few per cent that fail, and that is also where the unstructured data lives — investigation notes, correspondent emails, free-text remittance fields, local market practice. Which is why the exception path is a retrieval and reasoning problem rather than a rules problem, and why it is the first place agents genuinely earn their keep." },
          { t: "h", v: "The problem, sized" },
          { t: "ul", v: [
            "Failed payments cost the global economy more than <strong>$100 billion a year</strong>. That is the number to have ready.",
            "Legacy cores do not natively support ISO 20022, so data is lost and humans intervene.",
            "Institutions run several standards at once — ISO 20022, ISO 8583, residual MT, local real-time APIs — each with its own schema and translation layer.",
            "Even inside ISO 20022, regional market practice and optional elements create <strong>local dialects</strong> that cause rejection and rework.",
            "Rich nested structures such as complex invoice references are destroyed when forced into rigid relational tables."
          ]},
          { t: "h", v: "Four agent patterns worth naming" },
          { t: "table", head: ["Pattern", "What the agent does", "What it needs underneath"], rows: [
            ["Repair", "Flags fields at risk of truncation, enriches sparse messages from internal profiles, transforms semi-structured data into ISO 20022", "The original payload preserved, plus similar past exceptions retrievable by meaning"],
            ["Investigation", "Embeds unstructured case notes and finds conceptually related past cases rather than keyword matches", "Vector search over operational text, alongside the payment data"],
            ["Dynamic routing", "Compares true corridor cost — fees, FX spread, on-chain gas — against policy and recommends a settlement path", "Live telemetry captured as time series, and policy the agent can read"],
            ["Mapping assistance", "Proposes field mappings between standards for a human to approve", "Mapping provenance, so every proposal is auditable"]
          ]},
          { t: "h", v: "What the data layer has to provide" },
          { t: "ul", v: [
            "<strong>A canonical document</strong> holding the native payload and the normalised fields together — the foundation from the architecture module, now doing work.",
            "<strong>Vector search</strong> over investigation notes and past exceptions, so retrieval is by conceptual similarity rather than string matching.",
            "<strong>Multi-document ACID transactions</strong>, because an agent-driven update to a ledger entry and a payment state must move together or not at all.",
            "<strong>Change streams and stream processing</strong> to trigger workflows the moment state changes, without polling and without dual writes.",
            "<strong>Global clusters and zone sharding</strong> for corridor latency and data residency.",
            "<strong>CQRS</strong> to keep the agent's read traffic off the payment write path — the referenced payment data store sustains roughly 10,000 writes per second behind 1,000 payments per second."
          ]},
          { t: "h", v: "Governance is the part that sells it" },
          { t: "p", v: "Every AI input and output logged and linked to an approval; mapping provenance recorded so any transformation can be traced to the rule, agent or human that produced it; schema validation and encryption enforcing policy. Human-in-the-loop is a design requirement here, not a disclaimer — and the audience you will be speaking to cares far more about that than about model capability." },
          { t: "p", v: "The strategic frame is worth borrowing: this is a <strong>control-preserving alternative to rip-and-replace</strong>. A bank does not have to replace its core to get here; it has to stop throwing away the data its core cannot hold. That argument works in a room full of people who have been told to modernise and have no appetite for another five-year programme." },
          { t: "note", v: "One honest caveat to carry: none of this removes the human from a payment that has already failed a regulatory check. Agents compress investigation time and improve first-time-right rates. Claiming more than that in this room will cost you." }
        ],
        resources: [
          { tag: "Core", title: "Unlocking agentic power to modernise cross-border payments", url: "https://www.mongodb.com/company/blog/innovation/unlocking-agentic-power-to-modernize-cross-border-payment-systems", note: "MongoDB. The source for this unit. Know the three pillars, the four agent patterns and the $100 billion figure cold." },
          { tag: "Primer", title: "What is agentic commerce?", url: "https://stripe.com/guides/agentic-commerce", note: "Stripe. The merchant-side view, which is a useful contrast to the bank-side view above." },
          { tag: "Primer", title: "Cross-border payments: types, uses and key players", url: "https://stripe.com/resources/more/cross-border-payments-explained", note: "Good grounding if the correspondent model still feels abstract." },
          { tag: "Reference", title: "Fraud prevention and AML using vector search", url: "https://www.mongodb.com/docs/atlas/architecture/current/solutions-library/vector-search-fraud-prevention/", note: "The retrieval mechanism behind the investigation pattern, as a concrete architecture." }
        ],
        check: [
          "Explain why agentic value in payments is on the exception path, in three sentences.",
          "Name the four agent patterns and what each needs from the data layer.",
          "State the governance requirements before anyone asks — it is what makes the argument credible in a Sibos room."
        ]
      }
    ]
  },

  /* ================= MODULE 8 ================= */
  {
    id: "stage",
    n: "10",
    title: "Stage readiness",
    subtitle: "Rehearsal, delivery and the vocabulary that signals you belong",
    units: [
      {
        id: "hard-questions",
        title: "The questions that will test you",
        mins: 40,
        objective: "Rehearse delivery, not content. Answers that open with a concession land better in this room.",
        blocks: [
          { t: "p", v: "Practise these out loud. Every one opens by conceding something true — that is what makes the rest credible." },
          { t: "qa", v: [
            { q: "\"6,000 TPS is a synthetic benchmark. What does that have to do with my bank?\"",
              a: "Concede first: controlled benchmark, single region, twelve processing steps, no core banking system in the loop. Then reframe — the value is not the headline number, it is the shape of the curve. Near-linear scaling from 500 to 6,000 with flat latency means capacity is a procurement decision, not a re-architecture. That is the property a bank should test for in its own environment, and the benchmark tells you what to measure." },
            { q: "\"Why would I put payments on a document database?\"",
              a: "Because ISO 20022 is a nested, optional-heavy, annually versioned document format, and because the write path and read path in a payment hub want opposite things. Then the durability point, which is the one that matters: replica sets with majority write concern give you zero RPO, and the ungraceful-kill test is the evidence. Do not lead with flexibility — lead with durability, and let flexibility be the second reason." },
            { q: "\"Our bottleneck is the core banking system, not the payment engine.\"",
              a: "Agree immediately and completely. This is true at almost every bank, and saying so buys more credibility than any statistic. Then the architectural answer: back-pressured streams so the hub degrades gracefully rather than cascading, an operational data store that absorbs read load the core would otherwise carry, and event sourcing so posting can be asynchronous without losing the audit trail. The hub's job is to stop being the constraint and to stop the core from becoming a single point of failure." },
            { q: "\"Isn't this just a vendor pitch?\"",
              a: "Answer with the thing you would tell a bank not to do. For example: replacing a payment engine to chase instant-payments revenue is usually a bad business case in Europe, and the defensible cases are cost-to-serve, regulatory deadlines and the ability to launch a scheme without a programme. Specific, slightly against interest, and instantly disarming." },
            { q: "\"How do you handle data residency across a multi-region deployment?\"",
              a: "Zone sharding: the shard key includes a jurisdiction attribute, zones pin ranges to regions, and one logical cluster serves multiple jurisdictions without data leaving them. Then the honest caveat — cross-region writes cost latency, so the design question is whether the payment's write path ever needs to cross a boundary, and usually it does not. Naming the cost is what makes the answer credible." },
            { q: "\"What does agentic AI actually change for a payment service provider?\"",
              a: "Two things, concretely. First, authorisation stops being a single moment and becomes a mandate with constraints that must be stored, checked and revoked — infrastructure most PSPs do not have. Second, transaction volumes decouple from human attention, which breaks the assumptions behind both fraud models and capacity planning. Then be honest that the standards are unsettled and most of the industry is at pilot stage." },
            { q: "\"Everyone claims linear scaling. Why should I believe this one?\"",
              a: "Because the evidence is per-shard, not aggregate. CPU and insert rates rose proportionally per shard across the ladder, the WiredTiger write queue stayed at zero, and there was roughly 40–50% headroom at the top of the range. Aggregate throughput numbers hide saturation; per-shard utilisation does not. Then invite the test: run the same ladder on their own topology." }
          ]}
        ],
        resources: [],
        check: [
          "Deliver all seven answers out loud, each opening with a concession.",
          "Time them. Anything over 45 seconds needs cutting."
        ]
      },
      {
        id: "ninety-seconds",
        title: "Your ninety seconds",
        mins: 30,
        objective: "Draft and rehearse the one uninterrupted stretch you will get.",
        blocks: [
          { t: "p", v: "Whatever the panel format, you get one uninterrupted stretch. This is the shape it should take. Write it in your own words and say it aloud until it stops sounding written." },
          { t: "beats", v: [
            { t: "0:00", v: "<strong>The sacrifice.</strong> For twenty years, payment platforms traded one thing for another — throughput for resilience, resilience for agility, agility for control. Name the trade the audience actually lives with." },
            { t: "0:15", v: "<strong>Why the trade is now unaffordable.</strong> Instant schemes removed the batch window. The IPR made 24/7 a legal obligation. DORA made recovery auditable. ISO 20022 multiplied the data. None of these are choices." },
            { t: "0:35", v: "<strong>The evidence.</strong> Six thousand payments a second, half a second end to end, node killed under live load, ninety seconds to recover, zero payments lost. Scale-out, not scale-up." },
            { t: "0:55", v: "<strong>The mechanism.</strong> Event sourcing and CQRS over a distributed, sharded data layer. State is rehydrated from persisted events, not restored from backup. That single design decision is what makes \"zero loss\" a property rather than a promise." },
            { t: "1:15", v: "<strong>The consequence.</strong> The same data foundation that survives failure is the one that feeds fraud models, investigations, and next, agent mandates. You do not get an AI strategy in payments without solving the data layer first." },
            { t: "1:30", v: "<strong>Hand back</strong> with a question for the panel rather than a summary. It signals confidence and keeps you in the conversation." }
          ]}
        ],
        resources: [],
        check: [
          "Write your own version. Do not deliver this one verbatim.",
          "Rehearse until you can hit each beat without looking, then cut 15 seconds."
        ]
      },
      {
        id: "glossary",
        title: "Terms of art",
        mins: 25,
        objective: "Use the vocabulary naturally. Misusing a term costs more than not using it.",
        blocks: [
          { t: "gloss", v: [
            { term: "UETR", def: "Unique End-to-end Transaction Reference — the UUID that makes a cross-border payment trackable across every intermediary." },
            { term: "pacs.008", def: "The interbank customer credit transfer. The workhorse message; know its structure." },
            { term: "camt.056", def: "Request to cancel a payment. The opening move of most investigations." },
            { term: "R-transaction", def: "SEPA's collective term for rejects, returns, refunds, reversals and revocations. Where most operational cost lives." },
            { term: "RTGS / DNS", def: "Real-time gross settlement versus deferred net settlement — individual finality versus netted cycles." },
            { term: "CSM", def: "Clearing and Settlement Mechanism. TIPS and RT1 are competing CSMs for euro instant payments." },
            { term: "One-Leg Out", def: "SEPA scheme variant for payments where one leg sits outside the EEA." },
            { term: "VoP", def: "Verification of Payee — the IBAN/name check mandated by the IPR since October 2025." },
            { term: "Cut-off", def: "The scheme or correspondent deadline after which a payment moves to the next value date. Instant rails removed it; everything else still runs on it." },
            { term: "Nostro / vostro", def: "Our account with them / their account with us. The plumbing of correspondent banking." },
            { term: "Prefunding", def: "Cash parked at the CSM so instant payments can settle outside RTGS hours. A real treasury cost, and a common objection." },
            { term: "Scheme pack", def: "A pluggable module implementing one scheme's rulebook, messages and certification. IPF's unit of extensibility." },
            { term: "ODS / ODL", def: "Operational data store or layer — the read-optimised projection of payment state. The read half of CQRS." },
            { term: "Positive pay", def: "US corporate control where issued payment files are matched before release. Comes up in US fraud conversations." },
            { term: "Straight-through rate", def: "Percentage of payments needing no human touch. The most quoted operational KPI in the industry." },
            { term: "Mandate (agentic)", def: "In AP2, the verifiable credential recording what a user authorised an agent to do. The new unit of consent." },
            { term: "Cover payment", def: "The funds movement that accompanies a payment instruction along the correspondent chain." },
            { term: "WiredTiger write queue", def: "MongoDB's storage-engine write backlog. Zero under load is the evidence that persistence is not the bottleneck." }
          ]}
        ],
        resources: [],
        check: [
          "Use six of these correctly in unscripted conversation.",
          "Identify the three you are least confident about and look them up properly."
        ]
      }
    ]
  }

  ]
};
