
const DEBUG = true;
//"Bar" components are the rectangles
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
            return this.y + this.height + 20;
        },

        dPath: function () {
            firstPoints = [this.x1, this.y1];
            secondPoints = [this.x2, this.y2];

            return d3.line()
                .x([1, 2])
                .y([3, 4])
        }
    },
    methods: {
        breakout() {
            console.log(this.components)
            let svg = d3.select('svg');
            svg.select('.breakout-data').remove();

            let group = svg.append('g')
                .attr('class', 'breakout-data')

            const valuePos = 1;
            const bars = [0];


            for (let i = 0; i < this.components.length - 1; i++) {

                let xPos = this.start + this.components[i][valuePos];

                bars.push(this.components[i][valuePos]);

                group.append('line')
                    .attr('x1', xPos)
                    .attr('x2', xPos)
                    .attr('y1', this.y - 5)
                    .attr('y2', this.y + this.height + 5)
                    .style('stroke', "black")
            }


            bars.push(bars.reduce((a, v) => a + v) + this.components[this.components.length-1][valuePos]);
            colors = ['yellow', 'green', 'red']

            previousPosition = this.start;

            for (let i = 0; i < this.components.length; i++) {
                let width = bars[i+1] - bars[i];
                let pair = group.append('g');

                pair.append('rect')
                    .attr('x', previousPosition)
                    .attr('y', this.end)
                    .attr('width', width)
                    .attr('height', this.height)
                    .style('opacity', 0)
                    // .style('fill', colors[i])

                pair.append('text')
                        .attr('x', previousPosition + width/2 - 3)
                        .attr('y', this.end + this.height/2)
                        .attr('dy', 5)
                        .html(width > 60 ? (100*width/bars[bars.length-1]).toFixed(1) + '%' : "&#x26AC;")

                previousPosition += width;
            }
        }, 

        mouseover() {
            // d3.select('#datatip')
            //     .style('display', 'block');
            this.$emit('showBar', this.label, this.y);
        },

        mouseleave() {
            // d3.select('#datatip')
            //     .style('display', 'none');
            this.$emit('hideBar');
        }

    },
    template: `<g><rect @click="breakout" @mouseover="mouseover" @mouseleave="mouseleave" :class="type" :x="start" :y="y" 
    :width="end" :height="height"></rect>
    <text :x="end+start+10" :y="y+height/1.5"> {{account}} : {{value}} </text>
    <line :x1="lineX" :x2="lineX" :y1="y+height" :y2="y+height+20" stroke="black"></line>
    </g>`
})

Vue.component('datatip', {
    props: {
        totals: Array,
        label: String,
        showing: Boolean,
        y: Number
    },
    template: `<div id="datatip" v-if="showing" :style="{top:y+50}"> {{ totalOfInterest }}</div>`,
    data: function () {
        return {}
    },
    computed: {
        totalOfInterest: function() {
            return this.totals.find(
                total => this.label === total.name
            );
        }
    },
    methods: {
        
    },
    mounted: function () {
            let style = document.createElement('link');
            style.type = "text/css";
            style.rel = "stylesheet";
            style.href = 'datatip.css';
            document.head.appendChild(style)
        }
    
})

//a component for the zero line that will orient it self to wherever the value of zero is / i.e. wherever revenue starts
Vue.component('zero-line', {
    props: {
        x1: Number,
        x2: Number,
        y2: Number
    },
    data: function () {
        return { margin: { top: 50, left: 100, bottom: 50, right: 250 } }
    },
    template: `<line :x1="x1" y1="0" :x2="x2" :y2="y2" stroke="black"></line>`

})

//Income Statement - this will contain the the v-for that creates as many "total" components as needed 
Vue.component('income-statement', {
    props: {
        totals: Array,
    },
    template: `<g><bar
    v-for="(total, index) in totals"
    @showBar="showBar"
    @hideBar="hideBar"
    :key="index"
    :start="total.bar.start"
    :y="30+55*index"
    :end="total.bar.end"
    :height="35"
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
    :y2="this.svg_height - 5"
    stroke="black"
    stroke-dasharray="4"
    ></zero-line></g>`,
    data: function () {
        return {
            svg_width: 800,
            margin: { top: 50, left: 100, bottom: 25, right: 250 },
            svg_height: 460,
        }
    },
    computed: {
        
    },
    methods: {
        showBar: function(label, y) {
            console.log("income statement", label);
            this.$emit('showbar', label, y);
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

Vue.component('company-selector', {
    props: {},
    template: `<div class="select">
    Select Company: <br>
    <select @change="changeCompany" id="company">
        <option value="lng">Cheniere Energy Inc</option>
        <option value="goog">Alphabet Inc</option>
        <option value="aapl">Apple Inc</option>
        <option value="fb">Facebook Inc</option>
        <option value="kmi">Kinder Morgan Inc</option>
    </select></div>`,
    data: function () {
        return {}
    },
    mounted: function () {
        let style = document.createElement('link');
        style.type = "text/css";
        style.rel = "stylesheet";
        style.href = 'dropdowns.css';
        document.head.appendChild(style)
    }, 
    methods: {
        changeCompany: function (event) {
            console.log(event.target.value);
            this.$emit('companychange', event.target.value);
        }
    }
})

Vue.component('next-button', {
    props: {
        year: Number
    },
    template: `<button :year="year" v-on:click="incrementYear" 
    class="button" type="button">Next Year &#x2192;</button>`,
    methods: {
        incrementYear() {
            console.log("Year incremented!!");
            console.log(this.year);
        },

        mounted: function () {
            let style = document.createElement('link');
            style.type = "text/css";
            style.rel = "stylesheet";
            style.href = 'buttons.css';
            document.head.appendChild(style)
        }

    }
})

Vue.component('previous-button', {
    props: {
        year: Number
    },
    template: `<button :year="year" v-on:click="decrementYear" class="button"
    type="button">&#x2190; Prior Year</button>`,
    methods: {
        decrementYear() {
            console.log("Year decreased!!!")
        }
    },
    mounted: function () {
        let style = document.createElement('link');
        style.type = "text/css";
        style.rel = "stylesheet";
        style.href = 'buttons.css';
        document.head.appendChild(style)
    }
})

Vue.component('top-menu', {
    props: {
        company: Object
    },
    data: function () {
        return {
            
        }
    },
    mounted: function () {
        let style = document.createElement('link');
        style.type = "text/css";
        style.rel = "stylesheet";
        style.href = 'top.css';
        document.head.appendChild(style)
    },
    template: `<div id="top"><div id="logo"> <div class="column"><div class="maintitle">Visual Value</div><br> 
    <div class="mainsub">Exploring Financial Statements</div></div></div>
    <div class="company"><div class="column">{{ company.entity_name }} /
    Ticker: {{company.ticker}} </div><br>
    <div class="subtitle"> {{company.period.slice(-4)}} Income Statement </div></div></div>`
})

Vue.component('options-menu', {
    props: {
        totals: Array
    },
    data: function () {
        return {}
    },
    mounted: function () {
        let style = document.createElement('link');
        style.type = "text/css";
        style.rel = "stylesheet";
        style.href = 'options.css';
        document.head.appendChild(style)
    },
    template: `<div class="options">Toggle View:<br><br>
    <label class="container">Comparison
        <input type="checkbox">
        <span class="checkmark"></span>
        </label><br>
        <label class="container">Breakout
        <input type="checkbox">
        <span class="checkmark"></span>
        </label><br>
        <label class="container">Table
        <input type="checkbox">
        <span class="checkmark"></span>
        </label><br>
        <label class="container">Spotlight
        <input type="checkbox">
        <span class="checkmark"></span>
        </label><br>
    </div>`
})

Vue.component('year-selectors', {
    props: {
        
    },
    template: `<div class="select">Select current year:<br> 
    <select @change="changeCurrentYear" id="current-year">
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
        <option value="2016">2016</option>
        <option value="2015">2015</option>
        </select><br><br>Select base year:<br>
        <select @change="changeBaseYear" id="base-year">
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
        <option value="2016">2016</option>
        <option value="2015">2015</option>
        </select><br><br>
        </div>`,

    mounted: function () {
        let style = document.createElement('link');
        style.type = "text/css";
        style.rel = "stylesheet";
        style.href = 'dropdowns.css';
        document.head.appendChild(style);
    }, 
    methods: {
        changeCurrentYear: function (event) {
            this.$emit('currentyearchange', event.target.value);
        }, 
        
        changeBaseYear: function(event) {
            this.$emit('baseyearchange', event.target.value);
        }
    }
})

//root

var app = new Vue({
    el: '#finviz',
    data: {
        title: "Finviz",
        svg_width: 900,
        margin: { top: 50, left: 50, bottom: 25, right: 500 },
        svg_height: 550,
        //right now this is what contains all the data being rendered
        company: {
            "entity_name": "Cheniere Energy Inc",
            "ticker": "LNG",
            "period": "12_31_2019",
            "scale": 1000000,
            "shares": [
                ["Outstanding Shares", 254084493],
                ["Basic EPS", 2.53],
                ["Diluted EPS", 2.51],
                ["Weighted Average Shares Outstanding", 256.2],
                ["Diluted Weighted Average Shares Outstanding", 258.1]
            ],
            "balance_sheet": {
                "assets": {
                    "current_assets": [
                        ["Cash and Cash Equivalents", 2474],
                        ["Restricted Cash", 520],
                        ["Accounts and other receivables", 491],
                        ["Inventory", 312],
                        ["Derivative Assets", 323],
                        ["Other Current Assets", 92]
                    ],
                    "total_current_assets": 4212,
                    "non_current_assets": [
                        ["Property Plant and Equipment, Net", 29673],
                        ["Non-current Derivative Assets", 174],
                        ["Goodwill", 77],
                        ["Deferred Tax Assets", 529],
                        ["Operating Lease Assets", 439],
                        ["Other non-current assets, net", 388]
                    ],
                    "total_non_current_assets": 31280,
                    "total_assets": 35492
                },
                "liabilities": {
                    "current_liabilities": [
                        ["Accounts Payable", 66],
                        ["Accrued Liabilities", 1281],
                        ["Current Debt", 0],
                        ["Deferred Revenue", 161],
                        ["Derivative Liabilities", 117],
                        ["Current Operating Lease Liabilities", 236],
                        ["Other Current Liabilites", 13]
                    ],
                    "total_current_liabilities": 1874,
                    "non_current_liabilities": [
                        ["Long-term debt, net", 30774],
                        ["Non-current operating lease liabilities", 189],
                        ["Non-current finance lease liabilities", 58],
                        ["Non-current derivative liabilities", 151],
                        ["Other non-current liabilities", 11]
                    ],
                    "total_non_current_liabilities": 31189,
                    "total_liabilities": 33057
                },
                "equity": {
                    "stock": [
                        ["Common Stock", 1],
                        ["Treasury Stock", -674],
                        ["Additional Paid In Capital", 4167],
                        ["Retained Earnings", -3508]
                    ],
                    "preferred_stock": [["Preferred Stock", 0]],
                    "minority_interest": 2449,
                    "total_equity": 2435
                }
            },
            "income_statement": {
                "revenue": [
                    { component: ["LNG Contract Revenues", 8817] },
                    { component: ["Regasification Revenues", 266] },
                    { component: ["Other Revenues & Derivative Gains and Losses", 647] }
                ],
                "total_revenue": 9730,
                "operating_expenses": [
                    { component: ["Cost of Sales", 5079] },
                    { component: ["Operating and Maintenance Expense", 1154] },
                    { component: ["Development Expense", 9] },
                    { component: ["Selling, General Administrative_expense", 310] },
                    { component: ["Depreciation and Amortization Expense", 794] },
                    { component: ["Restructuring Expense", 0] },
                    { component: ["Impairment Expense and Loss on Disposal of Assets", 23] }
                ],
                "total_operating_costs": -7369,
                "operating_income": 2361,
                "other_income_expense": [
                    { component: ["Interest Expense, net of capitalized interest", -1432] },
                    { component: ["Loss on modification or extinguishment of debt", -55] },
                    { component: ["Derivative Gain (Loss), net", -134] },
                    { component: ["Other income (expense)", -25] }
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
                        { component: ["Depreciation and Amortization Expense", 794] },
                        { component: ["Share-based compensation expense", 131] },
                        { component: ["Non-cash interest expense", 143] },
                        { component: ["Amortization of debt issuance costs, deferred commitment fees, premium and discount", 103] },
                        { component: ["Non-cash operating lease costs", 350] },
                        { component: ["Loss on modification or extinguishment of debt", 55] },
                        { component: ["Total losses (gains) on derivatives, net", -400] },
                        { component: ["Net cash provided by (used for) settlement of derivative instruments", 138] },
                        { component: ["Impairment expense and loss on disposal of assets", 23] },
                        { component: ["Impairment or loss on equity method investments", 88] },
                        { component: ["Deferred Taxes", -521] },
                        { component: ["Other", 0] }
                    ],
                    "total_reconciliation_adjustments": 904,
                    "working_capital_changes": [
                        { component: ["Accounts and other receivables", 1] },
                        { component: ["Inventory", 11] },
                        { component: ["Other current assets", -18] },
                        { component: ["Accounts payable and accrued liabilities", 52] },
                        { component: ["Deferred revenue", 22] },
                        { component: ["Operating lease liabilities", -366] },
                        { component: ["Finance lease liabilities", 1] },
                        { component: ["Other, net", -6] }
                    ],
                    "total_change_in_working_capital": -303
                },
                "total_operating_cash_flows": 1833,
                "investing_cash_flows": [
                    { component: ["Property, plant and equipment, net", -3056] },
                    { component: ["Investment in equity method investment", -105] },
                    { component: ["Other", -2] }
                ],
                "total_investing_cash_flows": -3163,
                "financing_cash_flows": [
                    { component: ["Proceeds from the issuance of debt", 6434] },
                    { component: ["Repayments of Debt", -4346] },
                    { component: ["Debt issuance and deferred financing costs", -51] },
                    { component: ["Debt extinguishment costs", -15] },
                    { component: ["Distributions and dividends to non-controlling interest", -590] },
                    { component: ["Payments related to tax withholdings for share-based compensation", -19] },
                    { component: ["Repurchase of common stock", -249] },
                    { component: ["Other", 4] }
                ],
                "total_financing_cash_flows": 1168,
                "change_in_cash": -162,
                "beginning_cash_balance": 3156,
                "ending_cash_balance": 2994
            }
        },
        //these will be the updated values that react to the interface selectioms
        intervening: {},
        base: {},
        label: '',
        y: 0,
        showing: false
    },

    //this sets the default styles for the page and might be where I put in default values for current and base
    mounted: function () {

        let style = document.createElement('link');
        style.type = "text/css";
        style.rel = "stylesheet";
        style.href = 'default.css';
        document.head.appendChild(style)
    },

    computed: {
        //this returns the whatever the current year is to pass to the buttons
        currentDisplay: function () {
            let currentYear = parseInt(this.company.period.slice(-4)); 
            return currentYear;
        },

        currentTicker: function () {
            return this.company.ticker.toLowerCase();
        },

        //this computes the width based on the margins
        width() {
            return this.svg_width - this.margin.left - this.margin.right;
        },

        //this computes the height based on the margins
        height() {
            return this.svg_height - this.margin.top - this.margin.bottom;
        },

        //this computes the totals needed to produce the main bars
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
        },

    },
    methods: {
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
                        step.connections.x1 = zeroPos + step.bar.end;


                        //get components out and scale them
                        step.components = this.company.income_statement.revenue.map(
                            component => [...component.component]
                        );

                        step.components = step.components.map(
                            subtotals => [subtotals[0], xScale(subtotals[1]), subtotals[1]]
                        );

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
                        }
                        
                        //if account is negative, start at the value
                        //end cannot just be zero, it has to be the distance to zero in pixels, which is the range.

                        if (Math.sign(step.value) === -1) {
                            start = step.value;
                            end = 0;
                            step.bar.start = xScale(start);
                            step.bar.end = xScale(end) - xScale(start);
                            step.bar.range = xScale(end) - xScale(start);
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

                        //if the next bar's position is less than the zero position, the bar will draw incorrectly
                        //here, use the start of the next bar, instead of the end to compute the starting position
                        //the end is just the value, with no adjustment from zero
                        if (ignorant[1].ebit_start < zeroPos) {

                            start = ignorant[1].ebit_start;
                            end = xScale(step.value);

                            step.bar.start = start;
                            step.bar.end = end;
                            step.bar.range = end - start;
                        }

                            //switching it back to original value
                            step.value *= -1;

                            step.class += " negative";

                    break;

                    case "Other": 
                        
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

                            //if the next bar is less than the position of zero, need to start the current bar in a different place
                            if (ignorant[2].pretax_start < zeroPos) {
                                start = ignorant[2].pretax_start;
                                end = xScale(step.value) - zeroPos;
                            }
                        }

                        //rules for if Other is negative
                        //it needs a special case within for if the next bar is less than the zeroPos
                        if (checkNeg != 0) {
                            start = ignorant[2].pretax_end + zeroPos;
                            end = xScale(step.value);

                            //if the next bar is less than the position of zero, need to start the current bar in a different place
                            if (ignorant[2].pretax_start < zeroPos) {
                                start = ignorant[2].pretax_start;
                                end = xScale(step.value) - zeroPos;
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
                            console.log("positive case");
                            start = xScale(prior.value) + zeroPos;
                            end = xScale(step.value);

                            //special case if the value of the account is 0, it shouldn't be scaled to the position of 0. 
                            if (step.value === 0) {
                                console.log("special zero case....");
                                end = 0;
                            }

                        }

                        // if negative, define start and end
                        if (checkNeg != 0) {
                            console.log("negative case");
                            start = ignorant[2].pretax_range - (xScale(step.value) + zeroPos);
                            end = Math.abs(zeroPos - xScale(step.value));


                        // special case for what to do if zeroPos is not zero
                            if (zeroPos != 0) {
                                console.log("special negative case 1...");
                                end = Math.abs(zeroPos - xScale(step.value));
                                start = (ignorant[2].pretax_end + zeroPos) - Math.abs(zeroPos - xScale(step.value));
                            }

                        //if the start of the prior total is less than the zero position, need another way to calculate
                            if (ignorant[2].pretax_start < zeroPos) {
                                console.log("special negative case 2.....");

                                //needs to start behind the value of pretax start if it's a negative
                                start = ignorant[2].pretax_start - Math.abs(zeroPos - xScale(step.value));
                                end = Math.abs(zeroPos - xScale(step.value));
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
                            }

                        }

                        //negative cases
                        if (checkNeg != 0) {
                            //standard negative case where net income is positive at the end.
                            start = ignorant[3].ni_end + zeroPos;
                            end = zeroPos + xScale(step.value);

                            //need another case for when net income is negative, since its starting and ending positions will be reversed
                            if (ignorant[3].ni_start < zeroPos) {
                                start = ignorant[3].ni_start;
                                end = xScale(step.value) - zeroPos;
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

        //this gets the value of the current year selector and passes it to realUpdate.
        getNewCurrent: function (year) {
            this.realUpdate(year, this.currentTicker, "company");
        },

        //this gets the value of the base year selector and passes it to realUpdate.
        getNewBase: function (year) {
            this.realUpdate(year, this.currentTicker, "base");
        },

        //this gets the value of the company selector and passes it to realUpdate.
        updateCompany: function (ticker) {
            this.realUpdate(this.currentDisplay, ticker, "company");
        },

        //this reloads the data used in the root Vue instance and passes it again to all components.
        realUpdate: function (year, ticker, target) {

            console.log('Get New Company and Years: ', ticker, year);
            d3.json(`data/${ticker}${year}.json`).then((response) => {

                if (target === "company") {
                    this.company = response;
                } else if (target === "base") {
                    this.base = response;
                } else {
                    console.error("No known target for real update....")
                }

            });
        
        }, 

        useLabel: function(label, y) {
            this.label = label;
            this.y = y;
            this.showing = true;
        },

        unuseLabel: function() {
            this.showing = false;
        }
    }

})