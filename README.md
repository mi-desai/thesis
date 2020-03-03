# Thesis
MS of Data Visualization - Thesis 2020 - Michael Desai

# Assignment 3: Prototype - March 3, 2020

Design 1: https://xd.adobe.com/view/c3859393-6962-4bd4-5898-a8dbaf23c9cd-b5b4/

Design 2: 

Landing Page
![Data Structure](https://github.com/mi-desai/thesis/blob/master/Landing%20Page.png)<br/><br/>

P&L Page
![Data Structure](https://github.com/mi-desai/thesis/blob/master/P%26L%20Page%20Wireframe.png)<br/><br/>

Balance Sheet
![Data Structure](https://github.com/mi-desai/thesis/blob/master/Balance%20Sheet%20Wireframes.png)<br/><br/>

What Statements Actually Look Like: 

![Data Structure](https://github.com/mi-desai/thesis/blob/master/SEC%20Tabular%20Example%201.PNG)<br/><br/>
![Data Structure](https://github.com/mi-desai/thesis/blob/master/SEC%20Tabular%20Example%202.PNG)<br/><br/>
![Data Structure](https://github.com/mi-desai/thesis/blob/master/SEC%20Tabular%20Example%203.PNG)<br/><br/>


# Assignment 2: Form - February 18, 2020

### Reminder - My research question is as follows: Can visualization and common visual notation aid in understanding of financial disclosures and corporate performance? How effective is it in avoiding misinterpretation of financial data and pointing out potential misrepresentation?

I've worked on several mock-ups of my design for this project so far, with the intention of creating a series of visualizations and accompanying UI that makes this difficult to understand topic much easier to understand. But for whom? And what is a user expected to know or understand ahead of time? Can users learn and take away something from the visual experience?

It is best to first start with the designs, which are posted below. 

## Profit and Loss Statement
(Inspired by Rolf Hichert's horizontal waterfall chart)

Version 1.1
![Data Structure](https://github.com/mi-desai/thesis/blob/master/Income%20Statement%20Version%201.1.jpg)<br/><br/>

Version 1.2
![Data Structure](https://github.com/mi-desai/thesis/blob/master/P%26L%20Page%20Wireframe.png)<br/><br/>

## Balance Sheet

Version 1.1
![Data Structure](https://github.com/mi-desai/thesis/blob/master/Balance%20Sheet%20Version%201.1.jpg)<br/><br/>

## Cash Flow Statement

Version 1.2
![Data Structure](https://github.com/mi-desai/thesis/blob/master/CFS%20Version%201.2.jpg)<br/><br/>

## Company Comparative Analysis Chart
(Inspired by Adrian Crockett's Bump Chart Visualization for Investment Banking Comps)

Version 1.2
![Data Structure](https://github.com/mi-desai/thesis/blob/master/Comps%20Version%201.1.JPG)<br/><br/>

## Background

First, some background is in order. Financial disclosures of corporate performance involve three main accounting statements, which form of the backbone of understanding how money is made and raised in any company, no matter how large or small. The first of the three statements is the income statement, which shows profits generated over a particular period of time, usually a quarter of a year or a full year. The second is the balance sheet, sometimes also called the statement of financial position, and it shows the firm's assets, or property that is expected to be worth money either right now or in the future, liabilities, which show how much a firm owes to other entities at this particular point in time, and equity, which is the surplus of assets over liabilities. The balance sheet is a snapshot of a firm at one particular point in time, unlike the income statement. The last of the main statements is the cash flow statement, which reconciles the profits reported by the income statement to actual cash earned by the firm, invested by the firm, and raised by the firm over a particular period of time, which is once again, usually a quarter or a year.

There are other statements used to understand accounting rules, but they are for the most part much less important than these three.

## Audience

At first, I wanted to make a series of visualizations with accompanying UI that would be accessible to everyone. Designing these statement visualizations has made me reassess this, as the problem is not necessarily the quantities of each of the accounts in the statements themslves, nor is it the change over time, but what each account specifically MEANS. Even in a visual format, users without any training at all in accounting would find the significance of many accounting items hard to understand, even if they did grasp that amounts were rising, or falling, or if the latest change was more or less than the prior year. 

Thus, I think it might be better to target my visualizations and UI at financial professionals, journalists, and policy-makers with some training already, specifically those who are hard-pressed to read through an entire company's performance record the "old-fashioned way" - i.e. to actually read the forms filed with the SEC. As this was essentially my job in the past, I can attest that is very inefficient and easy to make mistakes.

In order to impart more MEANING on this visualization of accounting information, I think it would be prudent to present a storytelling narrative to drive home how the visualization and data can be used. In this way, the user can see how they might be able to use it for their own needs. The subjects of this storytelling narrative would have to fulfill a range of use cases - one for a company that experienced a lot of growth over a short period of time, another for a successful company undergoing a major investigation or transition, etc. 

## User Media and Interface

The current design revolves around the use of scroll and click/touch. Limited hover functionality may be included in a desktop version, but since so much of the financial audience uses their phones to obtain information, it is inadvisable to separate out functionality too much. 

The interface I have planned out is pretty packed already, and thus it might make sense to include additional tabs and UI elements for multiple layers. 

## User Experience

I want users to be able to not only see the narratives of the company use cases and the visualizations at the end, but also to be able to interact with each piece of data on the screen. 

Corporate financial data is very unique in that it all comes from the same uniform sources (or mostly does) but a huge amount of additional calculation is performed on it to incorporate it into unique metrics that are not especially uniform. 

For instance, many companies are compared on the basis of metrics called EBITDA (Earnings Before Interest Taxes Depreciation Amortization) and FCF (Free Cash Flow, which can be either to the firm, or to equity, which changes its calculation significantly). 

One idea that I had to be able to entice users to think about they interact with performance data is to include a "Metric Builder" which would involve clicking or touching a number of bar in the visualization and adding it to a metric or ratio that gets built as the user progresses through the visualization. 


## Potential App Structure and Data Flow...?

![Data Structure](https://github.com/mi-desai/thesis/blob/master/App%20Structure.png)<br/><br/>





<br><br><br>

# Assignment 1: Research Question and Outline - January 2020

![Data Structure](https://github.com/mi-desai/thesis/blob/master/Thesis%20Outline.png)<br/><br/>

Outline: 

# Research Question: Financial Statement Visualization. Can visual notation aid in the understanding of regulatory disclosures related to corporate financial performance and provide a method to avoid misinterpretation of financial data and point out misrepresentation?

## Premise: Financial Statements require significant professional training to read and interpret correctly.

## Claims/Arguments 1: Most financial models that are built off of financial statements use Excel or spreadsheet-based technology.

### Spreadsheet error is a rampant problem that causes misinterpretation of data.
Panko, Reinhardt, Rogoff Research demonstrate the scale of the problem.
Impact: Austerity measures were implemented in various Eurozone countries that were based on the incorrect entry of data into certain spreadsheet cells, impacting the livelihoods of millions.


### There are now alternatives to just using spreadsheets thanks to regulatory bodies like the SEC enforcing new standardization.
The US SEC has created an In-line XML Schema for Web Documents for Publicly-Traded Companies called XBRL (eXtensible Business Reporting Language), making it far easier to scrape these data.
Other countries are using their own XML Schema to mark-up their countries' financial regulatory filings, creating a new standard that can sidestep problems of spreadsheet error.
Impact: XML and XBRL may form the basis for more structured data that makes more data visualization possible.


### Financial data visualization has barely evolved beyond the tabular format.
International Business Communication Standards (Hichert), which create a visual notation for the effective communication of business reporting and insights.


## Claims/Arguments 2: Financial Reports can be easy to misinterpret, which can be caused by:

### Replication Crisis (which may be due to spreadsheet error and limitations of spreadsheets).
Structured markup language and technology make it more difficult to introduce cell error into reporting and visualization.

### Heuristics (mental assumptions) about what data means, that are often incorrect.
Can visualizations and presentation format improve retention, accuracy, and correct interpretation? Yes.
Kanehman: System 1 Intuitive Thinking
Visual versions of the same financial disclosures can improve speed absorbing the disclosure information, while not sacrificing any accuracy.
International Business Communication Standards (Hichert), which create a visual notation for the effective communication of business reporting and insights.
Impact: Faster and more accurate interpretation of corporate financial data may lead to better decision making by corporate stake holders, and more input from the public on corporate governance and responsibility.
Kanehman: System 2 Deliberative Thinking
Current financial disclosures require heavy cognitive load via System 2 Deliberative Thinking.
Impact: Analysts, Students, Public with training have high cognitive load demands while reading company disclosures, limiting absorption of information.Those without training to interpret current formats are without recourse.
Incorporate Gestalt Principles: Common, often visual heuristics that aid understanding of a concept or dataset.
Figure-Ground (i.e. foreground or background?)
Similarity (e.g. similarities in symbology often are trying to communicate a similar function)
Proximity (things closer together are more related than things farther apart)
Common Region (if objects are grouped within a similar closed region, they are perceived as grouped together.)
Continuity (e.g. forming dots into a line)
Closure (complex visual arrangements tend to make people want to look for a single recognizable pattern)
Focal Point (whatever stands out visually will capture and hold the viewer's attention first).

### Cognitive Biases
Biases can be established or removed via presentation format.
Impact: This drives away stakeholders who may be impacted by corporate financial performance because of the difficulties of current presentation format.
Impact: This can misinform stakeholders who do pay attention or can read financial regulatory disclosures.

## Claims/Arguments 3: Financial Reports may be misrepresented.

### Incorporation of visual notation to point out common financial reporting misrepresentations or points of confusion.

<ul>
<li>Accrual Versus Cash Accounting.</li>
<li>Revenue and Expense Matching.</li>
<li>Off-Balance Sheet Liabilities.</li>
<li>Goodwill in Mergers and Acquisitions.</li>
</ul>

# Literature Review

## Texts

Hichert, Rolf and Faisst, Jurgen. “Solid, Outlined, Hatched: How Visual Consistency Helps Better Understand Reports, Presentations, and Dashboards.” IBCS Media. 2019.

Hichert, Rolf and Faisst, Jurgen. “International Business Communication Standards: Conceptual, Perceptual, and Semantic Design of Comprehensible Business Reports, Presentations, and Dashboards.” 2017. ICBS Association. 

Higgins, Robert C. “Analysis for Financial Management, Tenth Edition.” 2012. The McGraw-Hill Companies, Inc. 

Kahneman, Daniel. “Thinking, Fast and Slow.” 2011. Farrar, Straus and Giroux. 

Pedersen, Lars Heje. “Efficiently Inefficient: How Smart Money Invests and Market Prices are Determined.” 2015. Princeton University Press. 

Schlict, Howard. “Financial Shenanigans: How to Detect Accounting Gimmicks & Fraud in Financial Reports.” 2002. The McGraw-Hill Companies, Inc. 

Ourossof, Alexandra. "Wall Street at War: The Secret STruggle for the Global Economy." 2012. 

## Papers

Marshall, Byron and Mortenson, Kristian and Bourne, Amy and Price, Kevin. “Visualizing Basic Accounting Flows: Does XBRL + Model + Animation = Understanding?” The International Journal of Digital Accounting Research, Volume 10: pp. 27-54. Oregon State University. 

https://arxiv.org/ftp/arxiv/papers/1602/1602.02601.pdf

https://cslu.ohsu.edu/~bedricks/courses/conj_610/pdf/lec_2_part_2.pdf

http://www.isys.uni-klu.ac.at/PDF/2003-0175-MC.pdf

https://qz.com/79051/thomas-herndon-the-grad-student-who-exposed-reinhart-and-rogoff-they-still-cant-get-their-facts-straight/

https://www.csc2.ncsu.edu/faculty/healey/PP/index.html#Preattentive

https://core.ac.uk/reader/10886927

https://pdfs.semanticscholar.org/a813/80fc33471570048f1aeec19939f409cbe6aa.pdf

https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.118.3504&rep=rep1&type=pdf

https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.15.2167&rep=rep1&type=pdf

https://journals.sagepub.com/doi/abs/10.1177/107769908706400217?journalCode=jmqb&

