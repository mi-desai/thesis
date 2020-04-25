

totals = {
    totals: [
        {
            name: "Revenue", value: 9730,
            bar: { x: 0, width: 0 },
            text: { x: 0, yConst: 0 }
        },
        {
            name: "OpEx", value: -7369,
            bar: { x: 0, width: 0 },
            text: { x: 0, yConst: 0 }
        },
        {
            name: "EBIT", value: 2361,
            bar: { x: 0, width: 0 },
            text: { x: 0, yConst: 0 }
        },
        {
            name: "Other", value: -1646,
            bar: { x: 0, width: 0 },
            text: { x: 0, yConst: 0 }
        },
        {
            name: "Pretax", value: 715,
            bar: { x: 0, width: 0 },
            text: { x: 0, yConst: 0 }
        },
        {
            name: "Taxes", value: 517,
            bar: { x: 0, width: 0 },
            text: { x: 0, yConst: 0 }
        },
        {
            name: "MinInt", value: -584,
            bar: { x: 0, width: 0 },
            text: { x: 0, yConst: 0 }
        },
        {
            name: "NetIncome", value: 648,
            bar: { x: 0, width: 0 },
            text: { x: 0, yConst: 0 }
        }
    ]
}

function getDomains(totals) {
    const xDomain = getXDomain(totals);
    const yDomain = getYDomain(totals);
    return { xDomain, yDomain }
}

function getXDomain(processed) {
    let values = [];
    let maxArray = [];
    for (let i = 0; i < processed.totals.length; i++) {
        if (processed.totals[i].name === "EBIT" || processed.totals[i].name === "Pretax" || processed.totals[i].name == "NetIncome") {
            let found = processed.totals[i].value;
            values.push(found);
        }
        maxArray.push(processed.totals[i].value);
    }

    let maxPosVal = d3.max(maxArray);
    let zero = 0;
    values.push(maxPosVal, zero);

    return values;
}

function getYDomain(processed) {
    let keys = [];
    for (let i = 0; i < processed.totals.length; i++) {
        let key = processed.totals[i].name;
        keys.push(key);
    }
    return keys;
}

let domains = getDomains(totals);

const xScale = d3.scaleLinear().domain(d3.extent(domains.xDomain)).nice().rangeRound([0, 1000]);
const yScale = d3.scaleBand().domain(domains.yDomain).rangeRound([0, 600]);

// console.log("This is the X Domain", domains.xDomain);
// console.log("This is the Y Domain", domains.yDomain);

function computeRects(input) {

    for (let i = 0; i < input.totals.length; i++) {
        let step = input.totals[i]
        let previous = input.totals[i - 1]
        if (step.name === "Revenue") {
            step.bar.x = xScale(0);
            step.bar.width = xScale(step.value);
            step.text.x = step.bar.width / 2;
            step.text.yConst = 20;
        }
        if (step.name === "OpEx") {
            step.bar.x = xScale(previous.value) + xScale(step.value);
            step.bar.width = xScale(step.value) * -1;
            step.text.x = (step.bar.x + step.bar.width) / 3;
        }
        if (step.name === "EBIT") {
            step.bar.x = xScale(0);
            step.bar.width = xScale(step.value);
            step.text.x = step.bar.width / 3;
        }
        if (step.name == "Other") {
            if (Math.sign(step.value) === 1) {
                step.bar.x = xScale(previous.value);
                step.bar.width = xScale(step.value);
                step.text.x = step.bar.width / 3; 
            }
            else {
                step.bar.x = xScale(previous.value) + xScale(step.value);
                step.bar.width = xScale(Math.abs(step.value));
                step.text.x = step.bar.width / 2;
            }
        }
        if (step.name === "Pretax") {
            step.bar.x = xScale(0);
            step.bar.width = xScale(step.value);
            step.text.x = step.bar.width / 2;
        }
        if (step.name == "Taxes") {
            if (Math.sign(step.value) === 1) {
                step.bar.x = xScale(previous.value);
                step.bar.width = xScale(step.value);
                step.text.x = step.bar.width / 2;
            }
            else {
                step.bar.x = xScale(previous.value) + xScale(step.value);
                step.bar.width = xScale(Math.abs(step.value));
                step.text.x = step.bar.width / 2;
            }
        }
        if (step.name == "MinInt") {
            if (Math.sign(step.value) === 1) {
                step.bar.x = xScale(previous.value);
                step.bar.width = xScale(step.value);
                step.text.x = step.bar.width / 2;
            }
            else {

                step.bar.x = xScale(previous.value) + xScale(input.totals[i - 2].value) + xScale(step.value);
                step.bar.width = xScale(Math.abs(step.value));
                step.text.x = step.bar.width / 2;
            }
        }
        if (step.name === "NetIncome") {
            step.bar.x = xScale(0);
            step.bar.width = xScale(step.value);
            step.text.x = step.bar.width / 2;
        }

    }
    return input;
}

rects = computeRects(totals);
console.log("These are the rects", rects);