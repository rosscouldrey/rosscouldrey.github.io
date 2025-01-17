---
#layout: single
title: Hidden Secrets of the PowerBI User Activity Logs - Template Apps
date: 2025-01-15
author: Ross Couldrey
comments: true
categories: PowerBI
tags: [PowerBI, Admin]
author_profile: true
#classes: wide
toc: true
toc_label: "Sections"
toc_icon: "bars"
excerpt_separator: <!--more-->

---
<style>
.yellow {
  color: yellow;
}
.red {
  color: red;
}
.green {
  color: green;
}

</style>

Ever seen the same report ID show up multiple time in the same tenant when reviewing your Activity Logs?  
- How can that be?  
- Aren't report IDs unique?  

Well it turns out there are some nuances with how these are reported.  I explain how Template Apps play a role in this phenomenon in this blog post!  

Read on.
<!--more-->

### Introduction
Recently I worked with a customer that was exporting the User Activity logs from PowerBI for long term storage.  One of the many things they leveraged these logs for was to determine historic usage of reports and use this information to delete unused items.

Before we go any further, I want to highlight that if you are looking for an easy way to identify unused items, Microsoft has an API that you can use.  It’s called the [“GetUnusedArtifactsAsAdmin”](https://learn.microsoft.com/en-us/rest/api/power-bi/admin/groups-get-unused-artifacts-as-admin) API and will return the artifacts in a workspace that haven’t been used in the last 30 days.  But I digress...
{: .notice--info}

The reason I’m writing this blog is that this customer came across an interesting phenomenon in the User Activity logs and I wanted to share this with others in case you come across the same.

### What did they discover?
When they filtered their long-term logs on Report ID, to their amazement, they saw the same report ID existing in multiple workspaces (dozens in their case).  What was even more strange was that they saw this happen even with the CreateReport activity.  This was a very unexpected result since its well known that ReportIds are unique in the PowerBI service.

### So what happened?
The root of their issue was users installing Apps from the store and a subsequent misunderstanding of the returned fields from the User Activity logs.
As the customer was collecting and storing their logs, they were using the ReportId field returned by the User Activities and storing it in a ReportId field in their storage.   On the surface this seems logical.  

However, this is an incorrect way to interpret the logs for these installed Apps.

Let me explain;

When an app creator creates a template app for distribution through the service, they provide a report (or many reports) as part of their app.  When you install an app, the service uses that template report to create a new copy of the report for this instance of the app.  Pay attention to the wording “this instance”.

Great.  So, what does that mean for the User Activities Log?
As it turns out – a lot. 

Let’s start by installing the GitHub app in our tenant.  The resulting Ids are below:

>WorkspaceId| 542cab33-XXXX-XXXX-XXXX-ad29c038e923

>ReportId| 3c884126-XXXX-XXXX-XXXX-44478a3a3b63

>AppId| 12d287c9-XXXX-XXXX-XXXX-667d5593cff8 

These are the IDs we would expect to see in our activity log for actions like “ViewReport”.
There are 2 ways a user can view this report;

1.	Through the App itself
2.	By navigating to the workspace and opening the report directly.

And as we discovered … it matters which you opt to do.  So lets investigate these two methods.

In the below activity a user has accessed a report from within the app.

![viewreportfromapp](/assets/images/ActivityTrackingAppID/ViewReportFromApp.png)

This looks great!  The WorkspaceId, the ReportId, and the AppId are as we expected. 

One thing I’ll point out here is that the presence of the AppID field tells us that the user accessed the report from the App rather than directly in the workspace.  In the next screenshot notice that it's missing.
{: .notice--warning}

But what if the user accessed the report from the workspace instead of the App?   Well it turns out, the Ids change a little bit…lets look at what happens:

![viewreportfromworkspace](/assets/images/ActivityTrackingAppID/ViewReportFromWorkspace.png)

Now we see the _ReportId_ that we expected is reported in the **AppReportId** field, instead of the **ReportId** field.

Ok. But then what is ID in the ReportId field?  

As far as I can tell that ID references the template report that was used to build the app.  I’ve confirmed this ID will be the same across all installs of the App, not only within your tenant, but even across tenants.  You can do the same by installing the Github app in your tenant and checking the logs.  You should see the ID: 
>11deec96-d80b-4130-b9ce-03de217d87a7 

But back to my customer.

What was happening in this customer’s case was that they had multiple people in their organization installing the same App from the store for their own uses.  Many of those users simply clicked on the report, rather than the App, to view the report.  Whenever a user did this, the ReportId contained the ID of the original template report which meant it appeared as though the same ReportId existed in different workspaces at the same time, when in fact, it didn’t really exist at all.

So, when the customer did a historical report on the usage, they pivoted by ReportId and found what they believed to be the same report in dozens of workspaces.

### How do you solve this issue? 
There are a few things you could do to resolve this.  But the key is understanding what action generated the activity and how ID fields may change as a result.  

You could do this when you capture the logs, or you could do this when you report on the logs.  So now you know.  And GI Joe used to say when i was a kid; 
>**“Knowing is half the battle”**

So, are we done?  Well we could be.  But...

If you recall, I started out by saying they also saw multiple CreateReport activities which demonstrated a similar behaviour.  Of course, the root case was the same, but I wanted to look at these for some fun and further evidence of what was happening.

With the help of my colleague Jocelyn Zastrow we reproduced this in our own tenant.  Here are the results of the two of us installing the GitHub app in the same tenant.  You can see they get installed into two different workspaces, yet the ReportId is the same for both.
 
![Createreport](/assets/images/ActivityTrackingAppID/CreateReportRC.png)

![Createreport2](/assets/images/ActivityTrackingAppID/CreateReportJZ.png)

Check out the green boxes in those screenshots.  The ReportID is the same, despite being in different workspaces!
{: .notice--success}

So when using the CreateReport activity, if you want the reportId that exists in the workspace, you’ll need to look at the AppReportId field (which you’ll note is indeed unique between the two), not the ReportId field.

### Conclusion
If you are extracting logs from PowerBI for long term storage, be sure you are collecting data from the correct field (or collect everything and sort it out later).  Otherwise, you may end up with surprising results when you review your logs!

Well, that’s fine and dandy for Template Apps, but what about Workspace Apps and Org Apps?  Well to be honest, I haven’t looked at those yet, but if I get a chance and I find something interesting, I’ll be sure to write it up in another blog post! 

### Further Reading and Resources
[Get-PowerBIActivityEvent](https://learn.microsoft.com/en-us/powershell/module/microsoftpowerbimgmt.admin/get-powerbiactivityevent?view=powerbi-ps)

[Track user activities in Power BI - Power BI](https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-auditing)

[Access the Power BI activity log - Power BI](https://learn.microsoft.com/en-us/power-bi/guidance/admin-activity-log)

[Operation list - Microsoft Fabric](https://learn.microsoft.com/en-us/fabric/admin/operation-list?source=recommendations)
