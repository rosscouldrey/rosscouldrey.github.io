---
#layout: single
title: Unlocking Power BI Insights - Connecting Log Analytics to Capacity Metrics for Enhanced Troubleshooting
date: 2024-09-09
author: Ross Couldrey
comments: true
categories: PowerBI
tags: [PowerBI, Optimization, Administration]
author_profile: true
#classes: wide
toc: true
toc_label: "Sections"
toc_icon: "bars"
excerpt_separator: <!--more-->
teaser: Are you struggling to pinpoint which activities and queries are consuming the most capacity units in your Power BI environment? My latest blog post dives into the seamless integration of Power BI logs from Log Analytics with the Capacity Metrics app. Discover how this powerful connection can provide unparalleled transparency and empower you to troubleshoot more effectively, ensuring optimal performance and resource utilization. We'll cover the steps to unlock these insights and take your Power BI troubleshooting to the next level!  Lets Go!

---
Are you struggling to pinpoint which activities and queries are consuming the most capacity units in your Power BI environment? My latest blog post dives into the seamless integration of Power BI logs from Log Analytics with the Capacity Metrics app. Discover how this powerful connection can provide unparalleled transparency and empower you to troubleshoot more effectively, ensuring optimal performance and resource utilization. We'll cover the steps to unlock these insights and take your Power BI troubleshooting to the next level!  Lets Go!
<!--more-->

## Introduction
I've worked with many customers on optimizing their data models and reports.  The need for optimization is often overlooked until a capacity is overworked and starting to throttle jobs, causing user impact (ie. slowness).

While I still believe the best solution is a proactive one, whereby perfomance is built into the initial model and report, tested and optimized prior to pushing the items to production.  It's naive to think this will always happen. Especially in a world of self service business intelligence.  Thus, its likely that as a capacity administrator or PowerBI administrator you will come across this problem at some point.  So I'll leave the proactive approaches to another post and focus on reactive here.

In a reactive world, the typical process for identifying the cause and resolving issues would be something like this:
1) Use the capacity metrics app to understand when problems are occuring.
2) Using the same app, drill through to the relevant time periods (i.e. overloaded period) to understand which items are using the most Capacity Units (CUs), thus the biggest contributors to capacity utilization.
3) Head to the source.  Investigate the report(s), model(s), or other(s) that is/are heaviliy leveraging CUs and start to optimize them.

Easy right?  Well, not always.  Despite identifying the semantic model that is consuming your CUs, it may not be immediately evident HOW that model is consuming them.  For example, suppose you have an enterprise shared model that's leveraged by hundreds of reports.  How will you know which report developer to contact for the next stage in optimization?  And what will you ask of them?  

Wouldn't it be great if you could see the performance of individual visuals (i.e. DAX queries)?  Well with a little work and help from the Log Analytics integration feautre, you can.  And that's what I'm going to show you in this post.

So lets go!

## Tools

To enable this level of enhanced troubleshooting we're going to need two tools.

- [Log Analytics](https://learn.microsoft.com/en-us/power-bi/transform-model/log-analytics/desktop-log-analytics-overview) 
- [Fabric Capacity Metrics App](https://learn.microsoft.com/en-us/fabric/enterprise/metrics-app)

I am not going to walk through the setup of these tools here. The links above provide the required steps to configure/install these tools.

Why do we need Log Analytics? Because it logs all of the Analysis Services (AS) events that are happening in your workspace, and thus you'll be able to use these logs to see what's happening "under the hood".  

Just a friendly note to the cost concious: the log analytics integration generates a LOT of logs.  And since Log Analytics charges money for ingestion, I would generally recommend you use this integration sparingly. {: .notice--warning}

### Capacity Metrics App

If you're not familiar with this app, this is the best source of information for what's happening on your capacity at any time.  If you find your capacity is running slowly or jobs/reports are failing, this is the first place you should check to see if there is any over usage (and a result throttling) occuring.  I'm going to assume you're familiar with the app, and if not, I would encourage you to review the documentation on how it works.

[Understand the metrics app compute page](https://learn.microsoft.com/en-us/fabric/enterprise/metrics-app-compute-page)

### Log Analytics

The second tool we're going to employ here is [Log Analytics](https://learn.microsoft.com/en-us/power-bi/transform-model/log-analytics/desktop-log-analytics-overview) and specifically the integration between your Fabric workspace and Log Analytics.  With this properly configured, the Analysis Services logs will be sent and stored in a Log Analytics Workspace (LAW) which will provide the ability to query these detailed logs and align them to what we see in our Capacity Metrics App.

## The Process

Quite simply the process is this:
1) Identify the time period of interest (ie. when your capacity is throttled or usage is peaking)
2) Drill into the time period details
3) Sort the interactive queries by CU consumption (greatest to least)
4) Use the available details to identify the relevant query in Log Analytis
5) Extract the query details from Log Analytics
6) Act on your findings

### Using the Metrics App
The first 3 steps are accomplished in the Metrics App.  Feel free to follow along in your own app with your own data:
1) Identify a timepoint of interest.  This is when you see a spike in capacity usage, or throttling is occuring.
2) Drill into our timepoint using the "Explore" button or right clicking and selecting "drill through to timepoint detail" 
3) Now we see query level detail relating to all the queries that have Capacity Unit utilization for the time period selected.  Both Interactive (eg. report or visual rendering) and Background activities are shown in different tables.  We're concerned with the Interactive queries for this blog.  I will post a link in the resources section that details which activities are considered interactive and background.

Let's pause for minute in case this is your first time looking into the Metrics App, or you aren't familiar with how the app displays data.  The queries you see in the table are not necessarily the queries that exectued during the time period you're looking at, but rather the queries that contribute to the CUs consumed during the time period.  This is because Fabric spreads out the compute cost of your activties to minimize spikes in consumption.  This smoothing process helps ensure you can plan for average usage vs peak usage.  The "smoothing window" (as its called) for Interactive queries is 5 minutes (or 10 intervals - since each measured interval is 30s), and the smoothing window for Background queries is 24 hours (or 2,880 intervals)

Now that we can see the queries that contributed to the CU consumption during this period we will want to sort them by the "Total CU (s)" column to see which queries had the largest impact on our CU consumption.

For simplicity I've also filtered my report by Operation = "Query" to remove interactive operations that I'm not interested in for this demonstration. {: .notice--warning}

In the below screenshot we see that there were 3 queries that finished at 7:35:16 UTC 
Know Your Parameters: If you've changed the parameter in your app you may or may not be looking at UTC!  You'll need to know this when searching the log analytics.{: .notice--error}

![CapacityMetricsApp](\assets\images\FabricMetricsLogAnalytics\MetricsAppScreenshot.png){: .align-left}

### Query Log Analytics to find query details

