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
            this.$emit('hideBar');
        }

    },
    // template: `<g><rect @click="breakout" @mouseenter="mouseenter" @mouseleave="mouseleave" :class="type" :x="start" :y="y" 
    // :width="end" :height="height"></rect>
    // <text @mouseenter="mouseenter" @mouseleave="mouseleave" :x="end+start+10" :y="y+height/1.5"> {{account}} : {{value}} </text>
    // <line v-if="label!=='NetIncome'" :x1="lineX" :x2="lineX" :y1="y+height" :y2="y+height+45" stroke="black"></line>
    // </g>`
    template: `<g><rect @click="breakout" @mouseenter="mouseenter" @mouseleave="mouseleave" :class="type" :x="start" :y="y" 
    :width="end" :height="height"></rect>
    <text @mouseenter="mouseenter" @mouseleave="mouseleave" :x="end+start+10" :y="y+height/1.5"> {{account}} : {{value}} </text>
    <path class="initial path" v-if="label!=='NetIncome'" :d="dPath" stroke="black" stroke-width="1"></path>
    </g>`,
    beforeUpdate: function () {

        d3.select('.path')
            .classed('initial', false)
            .classed('final', true);
            
    }
})

Vue.component('lollipop', {
    props: {
        total: Object
    }, 
    template: `<div id="wrapper">
    <svg :width="tip_width" :height="tip_height">

        <line></line>
        <circle></circle>
        <text></text>
        <text></text>
        <text></text>

        <line></line>

    </svg>
    </div>`,

    data: function () {
        return {
            tip_width: 500, 
            tip_height: 300,
            tip_margins: {right: 50, left: 50, top: 10, bottom: 10}
        }
    },
    computed: {
        width () {
            return this.tip_width - this.tip_margins.left - this.tip_margins.right;
        }, 

        height () {
            return this.tip_height - this.tip_margins.top - this.tip_margins.bottom;
        },

        subtotals () {
            return this.total.components;
        },

        scales () {
            let subtotals = this.subtotals;

            let labels = [];
            let values = [];
            
            for (let i = 0; i < subtotals.length; i++) {
                labels.push(subtotals[i][0]);

                if (Math.sign(subtotals[i][2]) === -1) {
                    subtotals[i][2] *= -1;
                }
                
                values.push(subtotals[i][2]);
            }

            const xScale = d3.scaleLinear().domain(d3.extent(values)).nice().range([0, this.width]);

            const yScale = d3.scaleBand().domain(labels).rangeRound([this.height, 0]);

            return {xScale, yScale};
        }
        
    },
    methods: {


    }

}) 

//"Datatip is the tooltip for the bars"
Vue.component('datatip', {
    props: {
        totals: Array,
        label: String,
        showing: Boolean,
        position: Array
    },
    //put back in v-if="showing" when ready
    template: `<div id="datatip" :style="{top:position[1] + 100, left: position[0] + 450}">

    <h3> {{ totalOfInterest.account }} </h3>

    <div v-if="checkRevenue" class="subviz">
    <lollipop :total="totalOfInterest"></lollipop>
    </div>

    <div v-else-if="checkExp" class="subviz">
    This is operating expenses.
    </div>

    <div v-else-if="checkEBIT" class="subviz">
    This is operating profit.
    </div>

    <div v-else-if="checkOther" class="subviz">
    This is other income or expense.
    </div>

    <div v-else-if="checkPretax" class="subviz">
    This is pretax income.
    </div>

    <div v-else-if="checkTax" class="subviz">
    This is taxes.
    </div>

    <div v-else-if="checkMinInt" class="subviz">
    This is minority interest.
    </div>

    <div v-else-if="checkNetIncome" class="subviz">
    This is Net Income.
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

//Data Table takes the base and current years of a company and returns a table element to the UI on the right
Vue.component('data-table', {
    props: {
        company: Object,
        base: Object
    },
    template: `<div id="dataTable"> <table id="data-table">
    <thead><tr>
    <th> </th>
    <th> {{ this.currentYear }}</th>
    <th> {{ this.baseYear }}</th>
    <th> % Change </th>
    </tr></thead>
    
    <tbody>
    <tr v-for="x in order">
    <th class="metricName"> {{ x[1] }} </th>
    <td>{{ present(metrics.current[x[0]], x[2]) }}</td>
    <td>{{ present(metrics.base[x[0]], x[2]) }}</td>
    <td>{{ present(100 * metrics.current[x[0]] / metrics.base[x[0]], 'wholeRnd') }}</td>
    </tr>
    
    </tbody>

    </table> </div>`,
    data: function () {
        return {
             order: [["gross_margin", "Gross Margin", '%rnd'],
                ["operating_margin", "Operating Margin", '%rnd'],
                ['pretax_margin', "Pretax Margin", '%rnd'],
                ['net_profit_margin', "Net Profit Margin", '%rnd'],
                ['revenue_growth', 'Revenue Growth', '%rnd'],
                ['earnings_per_share', 'Earnings Per Share', 'twoDec'],
                ['return_on_equity', 'Return on Equity', "wholeRnd"],
                ['cash_and_cash_equivalents', 'Cash', 'wholeRnd'],
                ['ebitda', 'EBITDA', 'wholeRnd'],
                ['leverage', 'Leverage', 'twoDec'],
                ['coverage', 'Coverage', 'twoDec'],
                ['return_on_assets', 'Return on Assets', '%rnd']], 
            nullval: " - "
        }
    },
    computed: {
        currentYear: function() {
            return +this.company.period.slice(-4);
        },
        baseYear: function() {
            return +this.base.period?.slice(-4);
        },
        metrics: function() {
            const current = this.company;
            const base = this.base;
            const tableValues = this.metricCalcs(current, base);

            return tableValues;
        }
    },
    methods: {
        present: function(num, format) {

            if (typeof num === "string") {
                return num;
            }

            switch(format) {
                case "%rnd":
                    num = Math.round(num * 100) / 100;
                break;

                case "twoDec":
                    num = Math.round(num * 100) / 100;
                break;

                case "wholeRnd": 
                    num = Math.round(num);
                break;
            }

            if (Number.isNaN(num)) {
                return this.nullval;
            }

            return num;
        },
        metricCalcs: function(current, base) {
            pl1 = current.income_statement;
            bs1 = current.balance_sheet;
            cfs1 = current.cash_flow_statement;

            pl2 = base.income_statement;
            bs2 = base.balance_sheet;
            cfs2 = base.cash_flow_statement;


            // return [
            //     ['a', 3, 4],
            //     ['b', 4, 5]
            // ]

            let metrics = {
                base: {
                    gross_margin: 0,
                    operating_margin: pl2.operating_income / pl2.total_revenue,
                    pretax_margin: pl2.pretax_income / pl2.total_revenue,
                    net_profit_margin: pl2.net_income / pl2.total_revenue,
                    revenue_growth: this.nullval,
                    earnings_per_share: 0,
                    return_on_equity: pl2.net_income / bs2.equity.total_equity,
                    cash_and_cash_equivalents: 0,
                    ebitda: 0,
                    leverage: 0,
                    coverage: 0,
                    return_on_assets: pl2.total_revenue / bs2.assets.total_assets
                }, 
                current: {
                    gross_margin: 0,
                    operating_margin: pl1.operating_income / pl1.total_revenue,
                    pretax_margin: pl1.pretax_income / pl1.total_revenue,
                    net_profit_margin: pl1.net_income / pl1.total_revenue,
                    revenue_growth: (pl1.total_revenue / pl2.total_revenue) - 1,
                    earnings_per_share: 0,
                    return_on_equity: pl1.net_income / bs1.equity.total_equity,
                    cash_and_cash_equivalents: 0,
                    ebitda: 0,
                    leverage: 0,
                    coverage: 0,
                    return_on_assets: pl1.total_revenue / bs1.assets.total_assets
                }
            };

            
            // //get eps
            // function getEPS(statement) {
            //     let shares = statement.shares;
            //     let eps;
            //     for (let i = 0; i < shares.length; i++) {
            //         if (shares[i].includes("Diluted EPS")) {
            //             eps = shares[i][1];
            //         }
            //     }
            //     return eps;
            // }

            //get gross margin
            // function getCOGS(statement) {
            //     let costs = statement.income_statement.operating_expenses;
            //     let cogs;

            //     for (let i = 0; i < costs.length; i++) {
            //         console.log(costs[i]);
            //         if (costs[i].startsWith("Cost of")) {
            //             cogs = costs[i][1]
            //             console.log(cogs);
            //         }
            //     } 
            // }

            //get cash

            
            //get ebitda
            //get leverage
            //get coverage


            



            return metrics;
        },
    },
        
    
    mounted: function () {
            let style = document.createElement('link');
            style.type = "text/css";
            style.rel = "stylesheet";
            style.href = 'table.css';
            document.head.appendChild(style)

        }
    
})

//a component for the zero line that will orient it self to wherever the value of zero is / i.e. wherever revenue starts
Vue.component('zero-line', {
    props: {
        x1: Number,
        x2: Number,
        y2: Number,
        label: String
    },
    data: function () {
        return { margin: { top: 50, left: 100, bottom: 50, right: 250 } }
    },
    template: `<g><line class="zero" :x1="x1" y1="20" :x2="x2" :y2="y2" stroke="black"></line>
    </g>`

})

//Income Statement - this contains the the v-for that creates as many "total" components as needed 
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
    stroke="black"
    stroke-dasharray="4"
    ></zero-line><text :x="totals[0].bar.start+3" :y="25">Zero</text></g>`,
    data: function () {
        return {
            svg_width: 900,
            margin: { top: 50, left: 100, bottom: 25, right: 250 },
            svg_height: 750,
            label: 'Zero'
        }
    },
    computed: {
        
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

//this component emits a stock ticker that is used to update the values of company and base in the root app
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
            this.$emit('companychange', event.target.value);
        }
    }
})

//this component emits an event that increases the current year by one
Vue.component('next-button', {
    props: {
        company: Object
    },
    template: `<button @click="incrementYear" 
    class="button" type="button">Next Year &#x2192;</button>`,
    computed: {
        currentYear: function() {
            return +this.company.period.slice(-4);
        }
    },
    methods: {
        incrementYear: function(event) {
            currentYear = this.currentYear;
            if (currentYear === 2019) {
                console.log("no change emitted...");
            } else {
                currentYear++;
                this.$emit('incrementyear', currentYear);
            }
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

//this component emits an event that decreases the current year by one
Vue.component('previous-button', {
    props: {
        company: Object
    },
    template: `<button @click="decrementYear" class="button"
    type="button">&#x2190; Prior Year</button>`,
    computed: {
        currentYear: function() {
            return +this.company.period.slice(-4);
        }
    },
    methods: {
        decrementYear: function(event) {
            currentYear = this.currentYear;
            if (currentYear === 2015) {
                console.log("no change emitted...");
            } else {
                currentYear--;
                this.$emit('decrementyear', currentYear);

                d3.select('.path')
                    .classed('initial', true)
                    .classed('final', false);

            }
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

//this component contains some data taken from the current company object
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
    template: `<div id="top">
        <div class="company">
            <div class="column">
                <div>{{ company.entity_name }} /Ticker: {{company.ticker}}</div> 
                <div class="subtitle"> {{company.period.slice(-4)}} Income Statement </div>
            </div>
        </div>
    </div>`
})

//this component emits the value of the checkboxes to enable or disable certain events
Vue.component('options-menu', {
    props: {
        
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
    methods: {
        toggleTable: function() {
            this.$emit('toggletable');
        }
    },
    computed: {
    
    },
    template: `<div class="options">Toggle Functionality:<br><br>
    <label class="container">Margins
        <input type="checkbox">
        <span class="checkmark"></span>
        </label><br>
        <label class="container">Annotate
        <input type="checkbox">
        <span class="checkmark"></span>
        </label><br>
        <label class="container">Table
        <input id="tableCheck" type="checkbox" @change="toggleTable">
        <span class="checkmark"></span>
        </label><br>
        <label class="container">Spotlight
        <input type="checkbox">
        <span class="checkmark"></span>
        </label><br>
    </div>`
})

//this allows for the base year to be set
Vue.component('year-selectors', {
    props: {
        currentsel: Number, 
        basesel: Number
    },

    template: `<div class="select">Select current year:<br> 

    <select @change="changeCurrentYear" id="current-year">
    <option v-for="year in current.years" :value="year" :selected="true"> {{ year }} </option>
        </select><br><br>Select base year:<br>
        
        <select @change="changeBaseYear" id="base-year">
        <option v-for="year in base.years" :value="year"> {{ year }} </option>
        </select><br><br>
        </div>`,
    data: function () {
        return {
            current: {
                years: [2019, 2018, 2017, 2016, 2015],
                selected: this.currentsel
            },
            base: {
                years: [2019, 2018, 2017, 2016, 2015],
                selected: this.basesel
            }
        }
    },
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
        title: "Visual Value",
        svg_width: 900,
        margin: { top: 50, left: 50, bottom: 25, right: 500 },
        svg_height: 750,
        //right now this is what contains all the data being rendered, it has a default return in there already
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
        base: {},
        label: '',
        position: [],
        showing: false,
        tableVisible: false,
        zero: 'Zero',
        currentsel: 2019,
        basesel: 2018
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

        //this returns a lower-case ticker
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

        //this computes the totals needed to produce the bars in the main visualization
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
                        //for each connection, if the next connection is positive or negative, needs a case
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
                        );

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

        useLabel: function(label, position) {
            this.label = label;
            this.position = position;
            this.showing = true;
        },

        unuseLabel: function() {
            this.showing = false;
        },

        toggleTable: function() {
            if (Object.keys(this.base).length === 0) {
                this.tableVisible = false;
            } else {
                this.tableVisible = !this.tableVisible;
            }
        }, 

        handleNext: function(year) {
            this.realUpdate(year, this.currentTicker, "company");
        },

        handlePrev: function(year) {
            console.log("received", year);
            
            this.currentsel = year-1;

            this.realUpdate(year, this.currentTicker, "company");

        }
    }

})