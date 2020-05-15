# Visual Value - Proposing a UI for Exploring Income Statements
## Parsons School of Design - MS of Data Visualization - Michael Desai - Class of 2020

### Created, scraped, and developed by Michael Desai
#### (Special thanks to George Sieniawski, Daniel Sauter, Aaron Hill, and Neil Oliver)


![App Preview](https://github.com/mi-desai/thesis/blob/master/preview.png)<br/>

# Abstract

This project was created to transform accounting statements away from their principally tabular form to a visual interface designed in accordance with principles of information design. The end objective is to reduce time that financial analysts spend reading through tabular data and trying to find additional on performance data within US Securitities and Exchange Commission documentation like Form-10-K's and Form-10'Q's.  

The tool allows users to explore five years of four companies' data:

<ul>
    <li><b>Cheniere Energy Inc</b> - largest US-based exporter of liquefied natural gas. </li>
    <li><b>Tesla Inc</b> - produces electric cars, batteries, and altenative energy solutions. </li>
    <li><b>Facebook Inc</b> - the dominant social media presence on the web. </li>
    <li><b>Alphabet Inc</b> - the parent company of Google, search engine and advertising colossus. </li>
    <li><b>Netflix Inc</b> - streaming video platform and media producer. </li>
</ul>

Data on these companies was obtained from the SEC, where it is available for the entire public to access, and where all publicly traded entities on US exchanges file financial performance data. Using the work of Rolf Hichert as a starting point, the project applies Hichert's work on International Business Communication Standards to corporate income statements, one of the main sources of company financial data. 

# Resources Used

<ul>
    <li><b>Vue.js</b> - open-source JavaScript framework for building user interfaces.</li>
    <li><b>D3.js</b> - open-source JavaScript library for creating visual web elements.</li>
    <li><b>Scrapy</b> - Python library for parsing and scraping files from the SEC.</li>
    <li><b>Node.js</b> - Javascript server-side scripting language, which was used for scraping from files.</li>
    <li><b>xml2json</b> - Node.js extension for converting DOM-like structure of XML to JSON.</li>
    <li><b>JQ</b> - Command-line utility for manipulating jsons.</li>
    <li><b>GSAP</b> - Greensock is a library for animating transitions between states of data.</li>
</ul>

# Early Designs

(Inspired by Rolf Hichert's horizontal waterfall chart)

Adobe XD Design: https://xd.adobe.com/view/c3859393-6962-4bd4-5898-a8dbaf23c9cd-b5b4/

P&L Page
![Design 1](https://github.com/mi-desai/thesis/blob/master/design/P%26L%20Page%20Wireframe.png)<br/>


# 1 - Obtaining the Data - XBRL or Manual Input?

SEC Filing Data is typically obtained manaully, via their online database <a href="https://www.sec.gov/edgar/searchedgar/companysearch.html">EDGAR</a>. Institutions have developed their own methods for obtaining and organizing this data to reduce time spent by analysts, traders, or algorithms waiting for company data to be delivered in a processed form. The only method available to the general public is manually parsing the texts of these filings. The data used for this project was found in company <a href="https://www.sec.gov/files/form10-k.pdf">Form 10-K's</a>. 

The SEC developed an XML reporting format called XBRL to encode reporting data. It is a massive framework but one that allows for structured retrieval of corporate performance documents and data. Because this process is one I wish to develop further and may have some commercial value, I will only disclose the broad strokes of what I did here. 

Using Scrapy in Python, I looked up company CIK (Central Index Keys) on EDGAR and added them to a CSV. Scrapy would request the correct URL using the appropriate CIK, navigate to the appropriate document, and download it to a directory. This directory, containing the raw XBRL, would then have a script running a Node.js package, xml2json that converted the XML structure to a JSON. A separate script in Node would parse the JSON and extract the financial data for that year. Each script would run five times to get the past five Form 10-K's. Each company required a dictionary of specific tags to look for, based on industry terms. Being more familiar with energy and tech XBRL tags, I stuck with those companies as the focus of the data. 

# 2 - Creating a data structure for company accounting data

I created a bespoke JSON data structure containing the data for each year of each company. This structure matches the structure of the financial statements they are encoding, as well as some of the text. Using Node.js, and the JQ command line interface, I scraped and cleaned five years for the five companies listed above. With more work done on the scraping end, I believe it would be possible to expand this process to quarterly reports (Form 10-Q's) and across many hundreds of company documents.

```javascript
company: {
                "entity_name": "Cheniere Energy Inc",
                "ticker": "LNG",
                "period": "12_31_2019",
                "scale": 1000000,
                "shares": [
                    {"component": ["Outstanding Shares", 254084493]},
                    {"component":["Basic EPS", 2.53]},
                    {"component":["Diluted EPS", 2.51]},
                    {"component":["Weighted Average Shares Outstanding", 256.2]},
                    {"component":["Diluted Weighted Average Shares Outstanding", 258.1]}
                ],
                "balance_sheet": {
                    "assets": {
                        "current_assets": [
                            {"component": ["Cash and Cash Equivalents", 2474]},
                            {"component": ["Restricted Cash", 520]},
                            {"component":["Accounts and other receivables", 491]},
                            {"component":["Inventory", 312]},
                            {"component":["Derivative Assets", 323]},
                            {"component":["Other Current Assets", 92]}
                        ],
                        "total_current_assets": 4212,
                        "non_current_assets": [
                            {"component":["Property Plant and Equipment, Net", 29673]},
                            {"component":["Non-current Derivative Assets", 174]},
                            {"component":["Goodwill", 77]},
                            {"component":["Deferred Tax Assets", 529]},
                            {"component":["Operating Lease Assets", 439]},
                            {"component":["Other non-current assets, net", 388]}
                        ],
                        "total_non_current_assets": 31280,
                        "total_assets": 35492
                    },
                    "liabilities": {
                        "current_liabilities": [
                            {"component": ["Accounts Payable", 66]},
                            {"component": ["Accrued Liabilities", 1281]},
                            {"component": ["Current Debt", 0]},
                            {"component": ["Deferred Revenue", 161]},
                            {"component": ["Derivative Liabilities", 117]},
                            {"component": ["Current Operating Lease Liabilities", 236]},
                            {"component": ["Other Current Liabilites", 13]}
                        ],
                        "total_current_liabilities": 1874,
                        "non_current_liabilities": [
                            {"component": ["Long-term debt, net", 30774]},
                            {"component": ["Non-current operating lease liabilities", 189]},
                            {"component": ["Non-current finance lease liabilities", 58]},
                            {"component": ["Non-current derivative liabilities", 151]},
                            {"component": ["Other non-current liabilities", 11]}
                        ],
                        "total_non_current_liabilities": 31189,
                        "total_liabilities": 33057
                    },
                    "equity": {
                        "stock": [
                            {"component": ["Common Stock", 1]},
                            {"component": ["Treasury Stock", -674]},
                            {"component": ["Additional Paid In Capital", 4167]},
                            {"component": ["Retained Earnings", -3508]}
                        ],
                        "preferred_stock": [{"component":["Preferred Stock", 0]}],
                        "minority_interest": 2449,
                        "total_equity": 2435
                    }
                },
                "income_statement": {
                    "revenue": [
                        { "component": ["LNG Contract Revenues", 8817] },
                        { "component": ["Regasification Revenues", 266] },
                        { "component": ["Other Revenues & Derivative Gains and Losses", 647] }
                    ],
                    "total_revenue": 9730,
                    "operating_expenses": [
                        { "component": ["Cost of Sales", 5079] },
                        { "component": ["Operating and Maintenance Expense", 1154] },
                        { "component": ["Development Expense", 9] },
                        { "component": ["Selling, General Administrative_expense", 310] },
                        { "component": ["Depreciation and Amortization Expense", 794] },
                        { "component": ["Restructuring Expense", 0] },
                        { "component": ["Impairment Expense and Loss on Disposal of Assets", 23] }
                    ],
                    "total_operating_costs": -7369,
                    "operating_income": 2361,
                    "other_income_expense": [
                        { "component": ["Interest Expense, net of capitalized interest", -1432] },
                        { "component": ["Loss on modification or extinguishment of debt", -55] },
                        { "component": ["Derivative Gain (Loss), net", -134] },
                        { "component": ["Other income (expense)", -25] }
                    ],
                    "total_other_income_expense": -1646,
                    "pretax_income": 715,
                    "total_tax_provision": 517,
                    "net_income_attributable_noncontrolling_interest": -584,
                    "net_income": 1232,
                    "net_income_post_minority_interest": 648
                },
                "cash_flow_statement": {
                    "operating_cash_flows": {
                        "reconciliation_adjustments": [
                            { "component": ["Depreciation and Amortization Expense", 794] },
                            { "component": ["Share-based compensation expense", 131] },
                            { "component": ["Non-cash interest expense", 143] },
                            { "component": ["Amortization of debt issuance costs, deferred commitment fees, premium and discount", 103] },
                            { "component": ["Non-cash operating lease costs", 350] },
                            { "component": ["Loss on modification or extinguishment of debt", 55] },
                            { "component": ["Total losses (gains) on derivatives, net", -400] },
                            { "component": ["Net cash provided by (used for) settlement of derivative instruments", 138] },
                            { "component": ["Impairment expense and loss on disposal of assets", 23] },
                            { "component": ["Impairment or loss on equity method investments", 88] },
                            { "component": ["Deferred Taxes", -521] },
                            { "component": ["Other", 0] }
                        ],
                        "total_reconciliation_adjustments": 904,
                        "working_capital_changes": [
                            { "component": ["Accounts and other receivables", 1] },
                            { "component": ["Inventory", 11] },
                            { "component": ["Other current assets", -18] },
                            { "component": ["Accounts payable and accrued liabilities", 52] },
                            { "component": ["Deferred revenue", 22] },
                            { "component": ["Operating lease liabilities", -366] },
                            { "component": ["Finance lease liabilities", 1] },
                            { "component": ["Other, net", -6] }
                        ],
                        "total_change_in_working_capital": -303
                    },
                    "total_operating_cash_flows": 1833,
                    "investing_cash_flows": [
                        { "component": ["Property, plant and equipment, net", -3056] },
                        { "component": ["Investment in equity method investment", -105] },
                        { "component": ["Other", -2] }
                    ],
                    "total_investing_cash_flows": -3163,
                    "financing_cash_flows": [
                        { "component": ["Proceeds from the issuance of debt", 6434] },
                        { "component": ["Repayments of Debt", -4346] },
                        { "component": ["Debt issuance and deferred financing costs", -51] },
                        { "component": ["Debt extinguishment costs", -15] },
                        { "component": ["Distributions and dividends to non-controlling interest", -590] },
                        { "component": ["Payments related to tax withholdings for share-based compensation", -19] },
                        { "component": ["Repurchase of common stock", -249] },
                        { "component": ["Other", 4] }
                    ],
                    "total_financing_cash_flows": 1168,
                    "change_in_cash": -162,
                    "beginning_cash_balance": 3156,
                    "ending_cash_balance": 2994
                }, 
                "mda": [
                    {"paragraph": "Cheniere, a Delaware corporation, is a Houston-based energy infrastructure company primarily engaged in LNG-related businesses. We provide clean, secure and affordable LNG to integrated energy companies, utilities and energy trading companies around the world. We aspire to conduct our business in a safe and responsible manner, delivering a reliable, competitive and integrated source of LNG to our customers. We own and operate the Sabine Pass LNG terminal in Louisiana, one of the largest LNG production facilities in the world, through our ownership interest in and management agreements with Cheniere Partners, which is a publicly traded limited partnership that we created in 2007. As of December 31, 2019, we owned 100% of the general partner interest and 48.6% of the limited partner interest in Cheniere Partners. We also own and operate the Corpus Christi LNG terminal in Texas, which is wholly owned by us."},
                    {"paragraph": "The Sabine Pass LNG terminal is located in Cameron Parish, Louisiana, on the Sabine-Neches Waterway less than four miles from the Gulf Coast. Cheniere Partners, through its subsidiary SPL, is currently operating five natural gas liquefaction Trains and is constructing one additional Train for a total production capacity of approximately 30 mtpa of LNG (the “SPL Project”) at the Sabine Pass LNG terminal. The Sabine Pass LNG terminal has operational regasification facilities owned by Cheniere Partners’ subsidiary, SPLNG, that include pre-existing infrastructure of five LNG storage tanks with aggregate capacity of approximately 17 Bcfe, two marine berths that can each accommodate vessels with nominal capacity of up to 266,000 cubic meters and vaporizers with regasification capacity of approximately 4 Bcf/d. Cheniere Partners also owns a 94-mile pipeline through its subsidiary, CTPL, that interconnects the Sabine Pass LNG terminal with a number of large interstate pipelines."},
                    {"paragraph": "We also own the Corpus Christi LNG terminal near Corpus Christi, Texas, and are currently operating two Trains and are constructing one additional Train for a total production capacity of approximately 15 mtpa of LNG. Additionally, we are operating a 23-mile natural gas supply pipeline that interconnects the Corpus Christi LNG terminal with several interstate and intrastate natural gas pipelines (the “Corpus Christi Pipeline” and together with the Trains, the “CCL Project”) through our subsidiaries CCL and CCP, respectively. The CCL Project, once fully constructed, will contain three LNG storage tanks with aggregate capacity of approximately 10 Bcfe and two marine berths that can each accommodate vessels with nominal capacity of up to 266,000 cubic meters."},
                    {"paragraph": "We have contracted approximately 85% of the total production capacity from the SPL Project and the CCL Project (collectively, the “Liquefaction Projects”) on a term basis. This includes volumes contracted under SPAs in which the customers are required to pay a fixed fee with respect to the contracted volumes irrespective of their election to cancel or suspend deliveries of LNG cargoes, as well as volumes contracted under integrated production marketing (“IPM”) gas supply agreements."},
                    {"paragraph": "Additionally, separate from the CCH Group, we are developing an expansion of the Corpus Christi LNG terminal adjacent to the CCL Project (“Corpus Christi Stage 3”) through our subsidiary CCL Stage III for up to seven midscale Trains with an expected total production capacity of approximately 10 mtpa of LNG. We received approval from FERC in November 2019 to site, construct and operate the expansion project."},
                    {"paragraph": "We remain focused on operational excellence and customer satisfaction. Increasing demand of LNG has allowed us to expand our liquefaction infrastructure in a financially disciplined manner. We hold significant land positions at both the Sabine Pass LNG terminal and the Corpus Christi LNG terminal which provide opportunity for further liquefaction capacity expansion. The development of these sites or other projects, including infrastructure projects in support of natural gas supply and LNG demand, will require, among other things, acceptable commercial and financing arrangements before we can make a final investment decision (“FID”)."}
                ]
        }
```


# 3 - Transforming the data structure for the front-end


With the data scraped and organized into a JSON format, once the data is loaded into Vue, it has to again be re-organized to visually represent the bars that appear on screen. To accomplish this, I relied heavily on Vue "computed" properties in both the root instance and all the components. 

I considered the idea of further preprocessing the json structure above into something that would make translating it into SVG and HTML elements in Vue easier, but this forced me back into scraping SEC data and away from visualization work. Additionally, with the JSON structure above, it becomes easier to store in a database that is directly comparable with prior years. Since each year's financial statements are always slightly different from the last, apart from main total categories, storing this data in a CSV or some other SQL schema would have been difficult. 

Because of the continual refinement of the scrape, I decided to forego using a database for the project, since 25 documents is more of a "proof-of-concept" than a full-scale application. 

To create the line graphs, since multiple years of data was needed, I used a Node.js script that I included in the data folder called summarize.js, which produced a smaller JSON called summary.js. This aggregates data for the line graphs for each company, by year. 

Summarize.js: 

```javascript
let fs = require('fs');

let summary = {};

let files = fs.readdirSync('.');

files.forEach(
    file => {

        if (file !== 'summary.json' && file.match(/\.json$/)) {

            data = fs.readFileSync(file);

            let json = JSON.parse(data);

            let yr = json.period.slice(-4);
            let tkr = json.ticker.toLowerCase();

            if (summary[tkr] === undefined) {
                summary[tkr] = {};
            }

            if (summary[tkr][yr] === undefined) {
                summary[tkr][yr] = {};
            }

            let top = summary[tkr][yr];

            top.operating_income = json.income_statement.operating_income;
            top.other_income_expense = json.income_statement.total_other_income_expense;
            top.pretax_income = json.income_statement.pretax_income;
            top.taxes = json.income_statement.total_tax_provision;
            top.minority_interest = json.income_statement.net_income_attributable_noncontrolling_interest;
            top.net_income = json.income_statement.net_income;
            top.net_income_post_minority_interest = json.income_statement.net_income_post_minority_interest;

        }
    });

fs.writeFileSync('summary.json', JSON.stringify(summary, null, 4));
```

# 4 - Creating the bars in Vue

In the root instance of Vue, I used several computed properties to return processed data from my data{} object, which contains the default company and year, Cheniere Energy 2019. As seen here, this code calls a method, processTotals(), and then uses the returned values to create an xScale using d3.js, since the bars are horizontal, and only the starting x position and width of these horizontal bars is meaningful. To compute the xScale, the domain had to comprise only the top Revenue bar and the grey bars (EBIT, Pretax Income, and Net Income) - this is because Revenue usually defines the farthest positive X value, and all negative values add up to EBIT, Pretax Income, and Net Income. Using large negative numbers like those found in Operating Expenses or Other Income / Expense scaled the graph incorrectly because of this. So values is redefined to include only those four values and then using d3.extent() on these values returns the proper domain for the xScale. 

A yScale was not used since there would always be 7 or 8 bars for every company. In the case of some companies which are partially owned by other entities, their income does not accrue to shareholders and is subtracted out of Net Income. This is referred to as "Minority Interest" or as "MinInt" within the code. 

```javascript
totals: function () {
            const input = this.processTotals().totals;
            const xDomain = input.map(item => item.value);

            const values = [
                input.find(item => item.name === "EBIT").value,
                input.find(item => item.name === "Pretax").value,
                input.find(item => item.name === "NetIncome").value,
                d3.max(xDomain),
                0
            ];

            let range = d3.extent(values);

            const xScale = d3.scaleLinear().domain(d3.extent(values)).nice().range([0, this.width]);

            console.log("Totals returned to components", this.finishTotals(xScale, input));

            return this.finishTotals(xScale, input);
        }
```

The processTotals() method calls another method, finishTotals(), which is where data is actually mapped to the scale. 

Again, every company will have 7 or 8 bars, depending on if they are partially owned by another entity other than common shareholders. The method finishTotals() is, on a case-by-case basis, computing the x position and width of each svg rect element. To accomplish this, certain "total" bars - Revenue, EBIT, Pretax Income, and Net Income have to be computed first, since their x positions can only be at one of two points. 

If Revenue, EBIT, Pretax, or Net Income is positive, then its starting point is always zero. However, it will be the POSITION OF ZERO WITHIN THE X DOMAIN. So it must be mapped to an xScale(0) which will translate to a pixel value. 

If Revenue, EBIT, Pretax, or Net Income is negative, then their starting points must be below the xScale(0) or the position of zero. It must start at the position where xScale(0) - xScale(value). Its endpoint is then fixed to xScale(0).

What is the idea behind this? Why all the complexity for such simple bars?

The issue is that companies will often post negative financial results or totals. This waterfall chart is only useful insofar as it covers all of these "loss-first accounting" scenarios where companies can have quite drastically poor performances represented as well as excellent financial results. 

Thus, it is necessary to create a system of cases and subcases. Since accounting rules for income statements require the categories of: 

<ul>
    <li>Revenues</li>
    <li>Operating Expenses</li>
    <li>Operating Income (EBIT)</li>
    <li>Other Income / Expense</li>
    <li>Pretax Income</li>
    <li>Income Taxes</li>
    <li>Minority Interest</li>
    <li>Net Income</li>
</ul>


Each of these categories is its own case, which is why a switch() statement was used. With these cases, one case where the value is negative, and one case where the value is negative must be constructed, which is why within each case, there are many if statements for if(Math.sign(value) === -1) { expression }. 

Additionally, the categories of totals can be constructed in isolation - meaning they do not need to know about the positions of the other bars in order to position themselves. However, the other bars in between these totals need those positions of the totals in order to position themselves. So, Revenue, EBIT, Pretax, and Net Income are "ignorant" positions. The others need the ignorant values in order to calculate themselves. 

Realizing this, I constructed two loops. The first builds the bar positions for all values that are ignorant. The second uses those igorant values to calculate their positions. 

The second loop also includes many more cases, based on if the position of zero (xScale(0)) is not actually zero, but some positive pixel value. This requires all values to be shifted around the central axis. Within each case for the zero Position, there are cases for if the value of the total is positive or negative, and differing rules based on those values. 

But largely, the complexity of this main graph boils down to: 

<ul>
    <li>The non-zero position of zero in the domain of xScale()</li>
    <li>If the accounting value is negative, x position and width calculations are reversed from the positive calculations. (i.e. for a negative value, ithe rect's x position will start at 0 - accounting value, and the width will be the position of zero.</li>
    <li>If the accounting value is positive, x positions and width calculations follow the "normal" set of rules for a graph.</li>
    <li>Combinations of the above.</li>
</ul>

It was crucial to get this part right in order for the information design of the income statement visualization to work correctly. 

```javascript
//process totals gets the main bars into the object format that will be returned to the components
        processTotals() {
            let income_statement = this.company.income_statement;
            let results = {
                totals:
                    [
                        {
                            name: "Revenue", 'value': income_statement.total_revenue,
                            bar: { start: 0, end: 0, range: 0 }, class: "", text: { x: 0, y: 0 },
                            account: "Total Revenue",
                            connections: { x1: 0, x2: 0, y1: 0, y2: 0 }, line: ""
                        },
                        {
                            name: "OpEx", 'value': income_statement.total_operating_costs,
                            bar: { start: 0, end: 0, range: 0 }, class: "", text: { x: 0, y: 0 },
                            account: "Operating Expenses",
                            connections: { x1: 0, x2: 0, y1: 0, y2: 0 }, line: ""
                        },
                        {
                            name: "EBIT", 'value': income_statement.operating_income,
                            bar: { start: 0, end: 0, range: 0 }, class: "", text: { x: 0, y: 0 },
                            account: "Operating Income",
                            connections: { x1: 0, x2: 0, y1: 0, y2: 0 }, line: ""
                        },
                        {
                            name: "Other", 'value': income_statement.total_other_income_expense,
                            bar: { start: 0, end: 0, range: 0 }, class: "", text: { x: 0, y: 0 },
                            account: "Other Income / Expense",
                            connections: { x1: 0, x2: 0, y1: 0, y2: 0 }, line: ""
                        },
                        {
                            name: "Pretax", 'value': income_statement.pretax_income,
                            bar: { start: 0, end: 0, range: 0 }, class: "", text: { x: 0, y: 0 },
                            account: "Pretax Income",
                            connections: { x1: 0, x2: 0, y1: 0, y2: 0 }, line: ""
                        },
                        {
                            name: "Taxes", 'value': income_statement.total_tax_provision,
                            bar: { start: 0, end: 0, range: 0 }, class: "", text: { x: 0, y: 0 },
                            account: "Income Tax Provision",
                            connections: { x1: 0, x2: 0, y1: 0, y2: 0 }, line: ""
                        },
                    ]
            };

            if (income_statement.net_income_attributable_noncontrolling_interest !== null) {

                results.totals.push(
                    {
                        name: "MinInt", 'value': income_statement.net_income_attributable_noncontrolling_interest,
                        bar: { start: 0, end: 0, range: 0 }, class: "", text: { x: 0, y: 0 },
                        account: "Minority Interest",
                        connections: { x1: 0, x2: 0, y1: 0, y2: 0 }, line: ""
                    },
                    {
                        name: "NetIncome", 'value': income_statement.net_income_post_minority_interest,
                        bar: { start: 0, end: 0, range: 0 }, class: "", text: { x: 0, y: 0 },
                        account: "Net Income after Minority Interest",
                        connections: { x1: 0, x2: 0, y1: 0, y2: 0 }
                    }
                )
            } else {
                results.totals.push(
                    {
                        name: "NetIncome", 'value': income_statement.net_income,
                        bar: { start: 0, end: 0, range: 0 }, class: "", text: { x: 0, y: 0 },
                        account: "Net Income",
                        connections: { x1: 0, x2: 0, y1: 0, y2: 0 }
                    }
                )
            }

            return results;

        },

        //finish totals actually calculates the scaled values and positions needed by visual components
        finishTotals: function (xScale, input) {
            let zeroPos = xScale(0);

            //accounting totals have constant starting and ending points for their rectangles, depending on if their values are positive or negative.
            //therefore, the calculation of these values are considered "ignorant" of any other values. 
            let ignorant = [];
            
            //first loop through, we are building just revenue and totals.
            //these values' rect dimensions are computed first since they can be ignorant of each other.
            for (let i = 0; i < input.length; i++) {
                let step = input[i];
                step.class = step.name;

                switch (step.name) {
                    case "Revenue": 

                        //if account is positive, start at zero, and end at value
                        if (Math.sign(step.value) === 1) {
                            start = 0;
                            end = step.value;
                            step.bar.start = xScale(start);
                            step.bar.end = xScale(end);
                            step.bar.range = xScale(end) - xScale(start);
                        }
                        
                        //if account is negative, start at the value
                        //end cannot just be zero, it has to be the distance to zero in pixels, which is the range.
                        if (Math.sign(step.value) === -1) {
                            start = step.value;
                            end = 0;
                            step.bar.start = xScale(start);
                            step.bar.end = xScale(end);
                            step.bar.range = xScale(end) - xScale(start);
                        }

                        //line connections, all it needs is the x position
                        //for each connection, if the next connection is positive or negative, needs a case
                        step.connections.x1 = zeroPos + step.bar.end;


                        //get components out and scale them
                        step.components = this.company.income_statement.revenue.map(
                            component => [...component.component]
                        );

                        step.components = step.components.map(
                            subtotals => [subtotals[0], xScale(subtotals[1]), subtotals[1]]
                        ).sort(this.arrangeComponents);

                        //push the total to a structure called ignorant to assist with other rect calcs
                        ignorant.push({
                            revenue_start: step.bar.start,
                            revenue_end: step.bar.end,
                            revenue_range: step.bar.range
                        });
                        

                    break;
                    
                    case "EBIT": 
                        
                         //if account is positive, start at zero, and end at value
                         
                         if (Math.sign(step.value) === 1) {
                            start = 0;
                            end = step.value;
                            step.bar.start = xScale(start);
                            step.bar.end = xScale(end);
                            step.bar.range = xScale(end) - xScale(start);
                            step.connections.x1 = zeroPos + step.bar.end;
                        }
                        
                        //if account is negative, start at the value
                        //end cannot just be zero, it has to be the distance to zero in pixels, which is the range.

                        if (Math.sign(step.value) === -1) {
                            start = step.value;
                            end = 0;
                            step.bar.start = xScale(start);
                            step.bar.end = xScale(end) - xScale(start);
                            step.bar.range = xScale(end) - xScale(start);
                            step.connections.x1 = step.bar.start;
                        }

                        ignorant.push({
                            ebit_start: step.bar.start,
                            ebit_end: step.bar.end,
                            ebit_range: step.bar.range
                        });
                        

                    break;
                    
                    case "Pretax": 
                        
                         //if account is positive, start at zero, and end at value
                         if (Math.sign(step.value) === 1) {
                            start = 0;
                            end = step.value;
                            step.bar.start = xScale(start);
                            step.bar.end = xScale(end) - xScale(start);
                            step.bar.range = xScale(end) - xScale(start);
                            step.connections.x1 = zeroPos + step.bar.end;
                        }
                        
                        //if account is negative, start at the value
                        //end cannot just be zero, it has to be the distance to zero in pixels, which is the range.

                        if (Math.sign(step.value) === -1) {
                            start = step.value;
                            end = 0;
                            step.bar.start = xScale(start)
                            step.bar.end = xScale(end) - xScale(start);
                            step.bar.range = xScale(end) - xScale(start);
                            step.connections.x1 = step.bar.start;
                        }

                        ignorant.push({
                            pretax_start: step.bar.start,
                            pretax_end: step.bar.end,
                            pretax_range: step.bar.range
                        });

                    break;

                    case "NetIncome": 
                        
                         //if account is positive, start at zero, and end at value
                         if (Math.sign(step.value) === 1) {
                            start = 0;
                            end = step.value;
                            step.bar.start = xScale(start);
                            step.bar.end = xScale(end);
                            step.bar.range = xScale(end) - xScale(start);
                        }
                        
                        //if account is negative, start at the value
                        //end cannot just be zero, it has to be the distance to zero in pixels, which is the range.

                        if (Math.sign(step.value) === -1) {
                            start = step.value;
                            end = 0;
                            step.bar.start = xScale(start)
                            step.bar.end = xScale(end) - xScale(start);
                            step.bar.range = xScale(end) - xScale(start);
                        }

                        ignorant.push({
                            ni_start: step.bar.start,
                            ni_end: step.bar.end,
                            ni_range: step.bar.range
                        });

                    break;
                }

                step.ticker = this.currentTicker;
                step.year = this.currentDisplay;

            }

            //second loop, these values are NONIGNORANT
            //this means they require the use of totals to calculate their positions correctly.
            for (let i = 0; i < input.length; i++) {
                let step = input[i];
                let next = input[i+1];
                let prior = input[i-1];
                step.class = step.name;

                switch (step.name) {
                    case "OpEx": 

                        //this account is always negative and to convert properly it needs to be positive
                        step.value *= -1;

                        //compute the start by taking the next bar's start position + any displacement from where zero is scaled
                        start = ignorant[1].ebit_end + zeroPos;

                        //compute the end by taking the scaled value of the account and subtract the displacement of zero
                        end = xScale(step.value) - zeroPos;

                        step.bar.start = start;
                        step.bar.end = end;
                        step.bar.range = end - start;
                        step.connections.x1 = step.bar.start;

                        //getting components out
                        step.components = this.company.income_statement.operating_expenses.map(
                            component => [...component.component]
                        );

                        step.components = step.components.map(
                            subtotals => [subtotals[0], xScale(subtotals[1]), subtotals[1]]
                        ).sort(this.arrangeComponents);

                        //if the next bar's position is less than the zero position, the bar will draw incorrectly
                        //here, use the start of the next bar, instead of the end to compute the starting position
                        //the end is just the value, with no adjustment from zero
                        if (ignorant[1].ebit_start < zeroPos) {

                            start = ignorant[1].ebit_start;
                            end = xScale(step.value);

                            step.bar.start = start;
                            step.bar.end = end;
                            step.bar.range = end - start;
                            step.connections.x1 = step.bar.start;
                        }

                            //switching it back to original value
                            step.value *= -1;

                            step.class += " negative";

                    break;

                    case "Other": 

                        step.components = this.company.income_statement.other_income_expense.map(
                            component => [...component.component]
                        );

                        step.components = step.components.map(
                            subtotals => [subtotals[0], xScale(subtotals[1]), subtotals[1]]
                        );
                        
                        //conversion to positive if negative for calculation of rect positions
                        checkNeg = 0;
                        if (Math.sign(step.value) === -1) {
                            step.class += " negative";
                            step.value *= -1;
                            checkNeg++;
                        }

                        //rules for if Other is positive
                        //it needs a special case within for if the next bar is less than the zeroPos
                        if (checkNeg === 0) {
                            start = ignorant[1].ebit_end + zeroPos;
                            end = xScale(step.value);
                            step.connections.x1 = start + end;

                            //if the next bar is less than the position of zero, need to start the current bar in a different place
                            if (ignorant[2].pretax_start < zeroPos) {
                                start = ignorant[2].pretax_start;
                                end = xScale(step.value) - zeroPos;
                                step.connections.x1 = start + end;
                            }
                        }

                        //rules for if Other is negative
                        //it needs a special case within for if the next bar is less than the zeroPos
                        if (checkNeg != 0) {
                            start = ignorant[2].pretax_end + zeroPos;
                            end = xScale(step.value);
                            step.connections.x1 = start;

                            //if the next bar is less than the position of zero, need to start the current bar in a different place
                            if (ignorant[2].pretax_start < zeroPos) {
                                start = ignorant[2].pretax_start;
                                end = xScale(step.value) - zeroPos;
                                step.connections.x1 = start;
                            }
                        }

                        step.bar.start = start;
                        step.bar.end = end;
                        step.bar.range = end - start;


                        //conversion back to negative if changed to positive
                        if (checkNeg != 0) {
                            step.value *= -1;
                        }

                    break;

                    case "Taxes":  
        
                        checkNeg = 0; 

                        //if account is negative, then checkNeg will be 1, if not, it will be 0
                        if (Math.sign(step.value) === -1) {
                            step.class += " negative";
                            step.value *= -1;
                            checkNeg++;
                        }

                        //if positive, define start and end
                        if (checkNeg === 0) {
                            start = xScale(prior.value) + zeroPos;
                            end = xScale(step.value);
                            step.connections.x1 = start + end;

                            //special case if the value of the account is 0, it shouldn't be scaled to the position of 0. 
                            if (step.value === 0) {
                                start = prior.bar.start;
                                end = 0.25;
                                step.connections.x1 = start + end;
                            }

                        }

                        // if negative, define start and end
                        if (checkNeg != 0) {
                            start = ignorant[2].pretax_range - (xScale(step.value) + zeroPos);
                            end = Math.abs(zeroPos - xScale(step.value));
                            step.connections.x1 = start;


                        // special case for what to do if zeroPos is not zero
                            if (zeroPos != 0) {
                                end = Math.abs(zeroPos - xScale(step.value));
                                start = (ignorant[2].pretax_end + zeroPos) - Math.abs(zeroPos - xScale(step.value));
                                step.connections.x1 = start;
                            }

                        //if the start of the prior total is less than the zero position, need another way to calculate
                            if (ignorant[2].pretax_start < zeroPos) {

                                //needs to start behind the value of pretax start if it's a negative
                                start = ignorant[2].pretax_start - Math.abs(zeroPos - xScale(step.value));
                                end = Math.abs(zeroPos - xScale(step.value));
                                step.connections.x1 = start;
                            }
                            
                        }

                        step.bar.start = start;
                        step.bar.end = end;
                        step.bar.range = end - start;


                        if (checkNeg != 0) {
                            step.value *= -1;
                        }

                    break;

                    case "MinInt":
                
                        checkNeg = 0;

                        //changing negative values to positive for scale calculations while still keeping track of if a value is positive or negative
                        if (Math.sign(step.value) === -1) {
                            step.class += " negative";
                            step.value *= -1;
                            checkNeg++;
                        }

                        //positive cases
                        if (checkNeg === 0) {
                            //there really should not be any positive cases for when net income is positive
                            //would need to come back here if there were cases


                            //there are cases when net income is negative that minority interest provides a benefit.
                            //positive reversal case
                            if (ignorant[3].ni_start < zeroPos) {
                                end = xScale(step.value) - zeroPos;
                                start = ignorant[3].ni_start - end;
                                step.connections.x1 = start + end;
                            }

                        }

                        //negative cases
                        if (checkNeg != 0) {
                            //standard negative case where net income is positive at the end.
                            start = ignorant[3].ni_end + zeroPos;
                            end = zeroPos + xScale(step.value);
                            step.connections.x1 = start;

                            //need another case for when net income is negative, since its starting and ending positions will be reversed
                            if (ignorant[3].ni_start < zeroPos) {
                                start = ignorant[3].ni_start;
                                end = xScale(step.value) - zeroPos;
                                step.connections.x1 = start;
                            }
                        }

                        step.bar.start = start;
                        step.bar.end = end;
                        step.bar.range = end - start;

                        //conversion of value back to positive if changed.
                        if (checkNeg != 0) {
                            step.value *= -1;
                        }

                    break;
                }
            }
        
            
            return input;
        },
```
After the totals were calculated and returned to Vue, it then became a simple matter of creating components!

I created one component, called "income-statement" that in turn created as many "bar" components as necessary, and a "zero-line" component for the axis. 

In the HTML:

```html
<svg :height="svg_height" :width="svg_width">
    <income-statement :totals="totals" :company="company" @showbar="useLabel"@hidebar="unuseLabel"></income-statement>
</svg>
```

The income-statement component:

```javascript
Vue.component('income-statement', {
    props: {
        totals: Array,
        company: Object
    },
    template: `<g><bar
    v-for="(total, index) in totals"
    @showBar="showBar"
    @hideBar="hideBar"
    :key="index"
    :start="total.bar.start"
    :y="50+90*index"
    :end="total.bar.end"
    :height="45"
    :label="total.name"
    :value="total.value"
    :class="total.class"
    :account="total.account"
    :components="total.components"
    :lineX="total.connections.x1"
    ></bar>    
    <zero-line
    :x1="totals[0].bar.start"
    :y1="20"
    :x2="totals[0].bar.start"
    :y2="this.svg_height - 10"
    :label="this.label"
    ></zero-line><text :x="totals[0].bar.start" :y="30">&#8592; Loss / Profit &#8594;</text></g>`,
    data: function () {
        return {
            svg_width: 900,
            margin: { top: 50, left: 100, bottom: 25, right: 250 },
            svg_height: 750,
            label: 'Zero'
        }
    },
    computed: {
        moneyScale: function () {

        }
    },
    methods: {
        showBar: function(label, position) {
            this.$emit('showbar', label, position);
        }, 
        hideBar: function() {
            this.$emit('hidebar');
        }

    },
    mounted: function () {
        let style = document.createElement('link');
        style.type = "text/css";
        style.rel = "stylesheet";
        style.href = 'income_statement.css';
        document.head.appendChild(style)
    }
})
```
As seen above, income-statement creates a bar component using v-for. The bar components, which contain the actual rects, labels, and connecting lines is what is actually drawn for the viz. 

All lines in bar and zero-line components were converted to paths so that they can follow the same CSS transition as the rects. Containing tags for all the component templates within the SVG are g tags.

```javascript
Vue.component('bar', {
    props: {
        label: String,
        value: Number,
        visibility: Boolean,
        start: Number,
        y: Number,
        end: Number,
        height: Number,
        type: String,
        account: String,
        components: Array, 
        lineX: Number,
    },
    data: function () {
        return {
            svg_width: 900,
            margin: { top: 50, left: 150, bottom: 50, right: 200 },
            svg_height: 600,
        }
    },
    computed: {
        x1: function() {
            return this.lineX;
        }, 

        x2: function() {
            return this.lineX;
        },

        y1: function() {
            return this.y + this.height;
        }, 

        y2: function() {
            return this.y + this.height + 45;
        },

        dPath: function () {
        
            let data = [{x: this.x1, y: this.y1}, {x: this.x2, y: this.y2}]

            let line = d3.line()
                .x(function(d) {return d.x})
                .y(function(d) {return d.y});
            
            let result = line(data);
        
            return result;
        }
    },
    methods: {
        breakout() {}, 

        mouseenter() {
            this.$emit('showBar', this.label, [this.end + 300, this.y]);
        },

        mouseleave() {
            // this.$emit('hideBar');
        }

    },
    template: `<g><rect @click="breakout" @mouseenter="mouseenter" @mouseleave="mouseleave" :class="type" :x="start" :y="y" 
    :width="end" :height="height"></rect>
    <text @mouseenter="mouseenter" @mouseleave="mouseleave" :x="end+start+10" :y="y+height/1.5"> {{account}} : {{value}} </text>
    <path v-if="label!=='NetIncome'" :d="dPath" stroke="black" stroke-width="1"></path>
    </g>`,
})
```


# 5 - Tooltips

To satisfy the desire of financial analysts to peel back layers on the numbers, I included a tooltip component as well within the elements of the income statement. On the hover event, another sub-SVG appears. Within it is a visualization specific to the bar being hovered over. This was accomplished in the template using v-if and v-else-if, and in the event handler by passing it the name of the bar and creating v-if cases based on it. 

```javascript
//"Datatip is the tooltip for the bars"
Vue.component('datatip', {
    props: {
        totals: Array,
        label: String,
        showing: Boolean,
        position: Array
    },

    //put back in v-if="showing" when ready // IMPORTANT IMPORTANT 
    template: `<div id="datatip" v-if="showing" :style="{top:position[1] + 100, left: position[0] + 600}">

    <h2 class="subviztitle"> {{ totalOfInterest.account }}: \$\ {{ totalOfInterest.value }} </h2>

    <div v-if="checkRevenue" class="subviz">
    <lollipop :total="totalOfInterest"></lollipop>
    </div>

    <div v-else-if="checkExp" class="subviz">
    <lollipop :total="totalOfInterest"></lollipop>
    </div>

    <div v-else-if="checkEBIT" class="subviz">
    <line-chart :total="totalOfInterest"></line-chart>
    </div>

    <div v-else-if="checkOther" class="subviz">
    <line-chart :total="totalOfInterest"></line-chart>
    </div>

    <div v-else-if="checkPretax" class="subviz">
    <line-chart :total="totalOfInterest"></line-chart>
    </div>

    <div v-else-if="checkTax" class="subviz">
    <line-chart :total="totalOfInterest"></line-chart>
    </div>

    <div v-else-if="checkMinInt" class="subviz">
    <line-chart :total="totalOfInterest"></line-chart>
    </div>

    <div v-else-if="checkNetIncome" class="subviz">
    <line-chart :total="totalOfInterest"></line-chart>
    </div>

    <div v-else>
    This is something else.
    </div>
    
    </div>`,
    
    data: function () {
        return {
            tip_width: 400, 
            tip_height: 200,
            tip_margins: {right: 20, left: 20, top: 20, bottom: 20}
        }
    },
    computed: {
        totalOfInterest: function() {
            return this.totals.find(
                total => this.label === total.name
            );
        }, 

        check: function () {
            return this.checkRevenue();
        },

        checkRevenue: function() {
            if (this.totalOfInterest.name === "Revenue") {
                return true;
            } else {
                return false;
            }
        },

        checkExp: function() {
            if (this.totalOfInterest.name === "OpEx") {
                return true;
            } else {
                return false;
            }
        },

        checkEBIT: function() {
            if (this.totalOfInterest.name === "EBIT") {
                return true;
            } else {
                return false;
            }
        }, 

        checkOther: function() {
            if (this.totalOfInterest.name === "Other") {
                return true;
            } else {
                return false;
            }
        },

        checkPretax: function() {
            if(this.totalOfInterest.name === "Pretax") {
                return true;
            } else {
                return false;
            }
        },

        checkTax: function() {
            if(this.totalOfInterest.name === "Taxes") {
                return true;
            } else {
                return false;
            }
        },

        checkMinInt: function() {
            if (this.totalOfInterest.name === "MinInt") {
                return true;
            } else {
                return false;
            }
        }, 

        checkNetIncome: function() {
            if (this.totalOfInterest.name === "NetIncome") {
                return true;
            } else {
                return false;
            }
        }

    },

    mounted: function () {
            let style = document.createElement('link');
            style.type = "text/css";
            style.rel = "stylesheet";
            style.href = 'datatip.css';
            document.head.appendChild(style)
        }
    
})
```

In turn, the tooltip references additional components based on which bar is being hovered over. For Revenue and Expeneses, lollipops are created to show components. For the others, line graphs showing trends over time are created.

Lollipops simply use properties passed to it by Vue, and consist of paths and circles created within the component. 

The line chart references data in summary.json, which was loaded in as a non-Vue data object. I chose to use this workaround instead of passing it through the various Vue components to be able to use the summary data natively in Vue. In future updates, I plan to use Vuex store and async data in Nuxt to be able to load in both the summary and any company-specific data I may need. 


# 6 - Table

Analysts still want to see the wide variety of metrics that are calculated from accounting data. Drawing on my past experience as an analyst, I identified twelve key metrics that could benefit from being shown alongside the waterfall chart in a table.

<ul>
    <li>Gross Margin - the percentage of sales that it costs to acquire the goods being sold. Formula is COGS / Revenue. </li>
    <li>Operating Margin - the percentage of profit per unit of revenue. Formula is Operating Profit / Revenue. Higher margins generally indicate more attractive businesses. </li>
    <li>Pretax Margin - the percentage of pretax profits per unit of revenue. Formula is Pretax Profit / Revenue.</li>
    <li>Net Profit Margin - net income per unit of revenue as a percentage. Formula is Net Income / Revenue.</li>
    <li>Revenue Growth - change in Revenue as a % from one period to another.</li>
    <li>Earnings Per Share - Net Income per outstanding share of common stock, a common indication of how valuable the equity of a publicly traded company is.</li>
    <li>Return on Equity - the amount of capital earned per dollar invested.</li>
    <li>Cash and Cash Equivalents - an asset account for the cash holdings of the business, and is a useful indication of its overall liquidity and flexibility.</li>
    <li>EBITDA - Earnings before interest, taxes, depreciation and amortization - a common profitability metric used by investors and corporate finance planners.</li>
    <li>Leverage - many different definitions, but the one used here is Total Debt divided by EBITDA, which represents the overall multiple of debt over profitability. Can also be thought of as a payback period.</li>
    <li>Coverage - again, many different definitions, but is a common metric for assessing credit quality, here calculated as EBITDA / Interest Expense.</li>
    <li>Return on Assets - the ratio of assets to sales, which represents how well the company's assets are converted into revenue.</li>
</ul>

The table's rows are created dynamically using v-for. There are only three columns with the current year's metrics and base year's metrics, as well as a year summarizing the change. In the future, it may make sense to use a Vuetify table instead of one coded from scratch. 

# 7 - Annotations

Since the SEC documents include a huge amount of text, from risk factors to notes to the financial statements, to management discussion and analysis, the app also incorporates the basics of a company's description of itself. This is usually contained in the MD&A (Management's Discussion & Analysis) and as the business expands or undergoes a merger or an acquisition, the description will change. 

This data was scraped from the document using punctutation to split the MD&A into paragraphs and ignoring and removing bullet points. A v-for takes care of the rest, with a v-if that allows the annotation and description to be hidden from view depending on the UI input. 

# Using the UI

Currently, users are expected to use the drop-downs and text-boxes in the navbar on the left to create and explore the income statements.

They can then use the Next / Prior buttons to go from year to year. Additionally, they can hover on each bar to show that particular bar in the context of a time series or a lollipop chart, which stay up and will change when different years are selected. 

They can also pull up annotations to see a description of the business in the management team's own words, as well as a table to show them important investing metrics. 


# Proposed Applications

Analysts needing to get up to speed on the historical performance of one of these companies would be able to very quickly gauge the performance and identify areas to investigate (why are operating expenses so high in this year? why did other income/ expense swing positive?). Additionally, being able to identify and investigate within the UI rather than using the document at all is an advantage since it keeps the analyst focused on the performance figures. 