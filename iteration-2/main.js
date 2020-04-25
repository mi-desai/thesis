
//"Total" components are the rectangles
Vue.component('total', {
    props: {
        label: String,
        value: Number,
        visible: Boolean,
        type: String,
        x: Number,
        y: Number,
        width: Number,
        height: Number,
        textPosX: Number,
        textPosY: Number,
    },
    data: function () {
        return {
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
                "taxes": [
                    { component: ["Income Tax Benefit (Provision)", 517] }
                ],
                "total_tax_provision": 517,
                "net_income_attributable_noncontrolling_interest": 584,
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
                    "total_change_in_working_capital": -303,
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
            }
        }
    },
    computed: {

    },
    methods: {

    },
    template: `<rect :x="x" :y="y" 
    :width="width" :height="height"></rect>`
})

//Income Statement - this will contain the the v-for that creates as many "total" components as needed 
Vue.component('income-statement', {
    props: {
        totals: Array,
    },
    template: `<g><total
    v-for="(total, index) in totals"
    :key="index"
    :x="total.bar.x"
    :y="15+55*index"
    :width="total.bar.width"
    :height="35"
    :label="total.name"
    :value="total.value"
    ></total></g>`,
    data: function () {
        return {

        }
    },
    computed: {

    }
})



//root

var app = new Vue({
    el: '#finviz',
    data: {
        title: "Finviz",
        svg_height: 800,
        svg_width: window.innerWidth,
        margin: { top: 25, left: 25, bottom: 25, right: 25 },
        svg_height: 600,
        svg_width: 1000,
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
                "taxes": [
                    { component: ["Income Tax Benefit (Provision)", 517] }
                ],
                "total_tax_provision": 517,
                "net_income_attributable_noncontrolling_interest": 584,
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
                    "total_change_in_working_capital": -303,
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
            }
        },

    },
    computed: {
        width() {
            return this.svg_width - this.margin.left - this.margin.right;
        },
        height() {
            return this.svg_height - this.margin.top - this.margin.bottom;
        },
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

            console.log("Extent", d3.extent(values));
            const xScale = d3.scaleLinear().domain(d3.extent(values)).nice().rangeRound([0, this.width]);

            console.log(xScale);

            return this.finishTotals(xScale, input);
        }
    },
    methods: {
        processTotals() {
            let income_statement = this.company.income_statement;
            let results = {
                totals:
                    [
                        {
                            name: "Revenue", 'value': income_statement.total_revenue,
                            bar: {x: 0, width: 0}
                        },
                        {
                            name: "OpEx", 'value': income_statement.total_operating_costs,
                            bar: {x: 0, width: 0}
                        },
                        {
                            name: "EBIT", 'value': income_statement.operating_income,
                            bar: {x: 0, width: 0}
                        },
                        {
                            name: "Other", 'value': income_statement.total_other_income_expense,
                            bar: {x: 0, width: 0}
                        },
                        {
                            name: "Pretax", 'value': income_statement.pretax_income,
                            bar: {x: 0, width: 0}
                        },
                        {
                            name: "Taxes", 'value': income_statement.total_tax_provision,
                            bar: {x: 0, width: 0}
                        },
                    ]
            };

            if (income_statement.net_income_attributable_noncontrolling_interest !== null) {

                results.totals.push(
                    { name: "MinInt", 'value': income_statement.net_income_attributable_noncontrolling_interest, bar: {x: 0, width: 0} },
                )
            }

            results.totals.push(
                { name: "NetIncome", 'value': income_statement.net_income, bar: {x: 0, width: 0} }
            )

            return results;

        },
        finishTotals: function (xScale, input) {
            console.log(input);
            for (let i = 0; i < input.length; i++) {
                let step = input[i]
                let previous = input[i - 1]
                switch (step.name) {
                    case "Revenue":
                        step.bar.x = xScale(0);
                        step.bar.width = xScale(step.value);
                        break;

                    case "OpEx":
                        step.bar.x = xScale(previous.value) + xScale(step.value);
                        step.bar.width = xScale(step.value) * -1;
                        break;

                    case "EBIT":
                        step.bar.x = xScale(0);
                        step.bar.width = xScale(step.value);
                        break;

                    case "Other":
                    case "Taxes":
                        if (Math.sign(step.value) === 1) {
                            step.bar.x = xScale(previous.value);
                            step.bar.width = xScale(step.value);
                        }
                        else {
                            step.bar.x = xScale(previous.value) + xScale(step.value);
                            step.bar.width = xScale(Math.abs(step.value));
                        }
                        break;

                    case "Pretax":
                        step.bar.x = xScale(0);
                        step.bar.width = xScale(step.value);
                        break;

                    case "MinInt":
                        if (Math.sign(step.value) === 1) {
                            step.bar.x = xScale(previous.value);
                            step.bar.width = xScale(step.value);
                        }
                        else {
                            step.bar.x = xScale(previous.value) + xScale(input[i - 2].value) + xScale(step.value);
                            step.bar.width = xScale(Math.abs(step.value));
                        }

                        break;
                    case "NetIncome":
                        step.bar.x = xScale(0);
                        step.bar.width = xScale(step.value);

                        break;
                }
            }
            console.log(input);
            return input;
        },
    }

})

