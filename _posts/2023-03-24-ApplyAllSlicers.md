---
#layout: single
title: Minimizing Source Queries in PowerBI
date: 2023-03-09
author: Ross Couldrey
comments: true
categories: PowerBI
tags: [PowerBI, Features]
author_profile: true
#classes: wide
#toc: true
#toc_label: "Sections"
#toc_icon: "bars"
excerpt_separator: <!--more-->

---
![MainImage](/assets/images/MinSourceQuery/MinimizeSourceQueries_TitlePage.png)

If you've ever worked with big data in PowerBI (and I mean __BIG__ data) you'll know the pain that can arise from having many slicer options for your users.

Each time a slicer element is selected, the queries run to refresh the visuals, and this takes time...

Exactly how much time it takes will depend on a few factors: 
- how big your data is, 
- how well you've optimized your model,
- how efficient your report design is, 
- your capability as a DAX developer, and finally, 
- your chosen dataset mode (Import vs Direct Query). 

Also, if you're leveraging a Direct Query model, this multiple slicer problem may extend beyond Power BI as each query issued could be sent to your backend systems for processing (and there's likely at least one query for each visual on the page).

And you know what makes this problem even worse? 
In many cases, __nobody wants the results of all these queries!__

They are simply executing as the end user clicks through all their selections to get their final set of combined filters they're interested in! Talk about overhead!

With the introduction of the "Apply All Slicers" feature we can finally say "buh-bye" to all this needless querying! 

*wait... was that a David Spade SNL reference circa 1994?*<br>[Find out here...](https://youtu.be/wg5lIpQkoOg)
{: .notice}

Now that you're back from that trip down memory lane, lets continue...

You can find this feature under the Optimize menu, or under the ever-growing list of options when you insert a Button element as shown in the screenshot.

![WhereToFindTheFeature](\assets\images\MinSourceQuery\ApplyAllSlicersOptions.png)

To see how this new feature can help minimize queries I created a Direct Query model to my local SQL instance and built a simple report on top. 

Let’s see what happens...

Here's my sample report. As you can see there are 8 visuals on the canvas with 6 slicers allowing users to "slice and dice" in various ways.

![SampleReport](\assets\images\MinSourceQuery\Report.png)

So now I start my SQL profiler (tracing SQL Batch Completed activity only) on the source to capture the SQL queries. I can then select various items in the slicers to see how many queries are issued to the backend in response to what I would consider "typical" user activity, namely selecting a value from each of the slicers.

 ![SQLProfile Without ApplyAll](\assets\images\MinSourceQuery\QueriesWOapplyall.png)
 
As you can see there are **59 rows** in our profiler result which translates to **57 SQL queries issued** (1 row is trace start and 1 row is trace end).
That's a lot more queries than you might expect for 8 visuals! And this happens because as the user is selecting slicer values, Power BI responds immediately, rather than waiting for all values to be entered.

So now let’s check what happens with the new "Apply All Slicers" button feature.

![SQLProfile with ApplyAll](\assets\images\MinSourceQuery\QueriesWapplyall.png)
 
With the same user behaviour, **only 8 queries are issued!** 

This is much closer to what you'd expect to see for 8 visuals.

**That's great right?**

The number of queries that Power BI is sending to the backend is cut significantly which is going to keep our DBAs happy (a 7-fold decrease in this example). Furthermore, our users get a much more seamless experience while selecting from multiple slicers, since the report won't be trying to update as they're clicking around, so we have happier users too!

__BONUS FEATURE__ - Along with this feature, Power BI also introduced the opposite _"Clear All Slicers"_ button, which many developers had previously implemented using bookmarks. It's now a little easier to give your users an "erase all selections" option in your report! And the two don't need to be used together either (although they can be).
{: .notice--info}


### **So, what's the catch?**
There's always a catch isn't there? In my experiments, the biggest one I've noted is that this new feature breaks cascading slicers (that is, slicers that filter other slicers) which can lead a user to accidentally create conflicting slicers ultimately displaying no data (or BLANKs).

Why?

Since the new feature delays the application of the initial slicer selection until the user "applies" it, that means any subsequent slicers the user interacts with will not have the context of the original selection.

An example will help demonstrate:

![Example of Broken Cascading Slicers](\assets\images\MinSourceQuery\cascadingSlicers.png)
 

>BUT ... What if I use drop down slicers instead of vertical lists? Since the data for drop down filters is only loaded when a user selects them (i.e., drops them down), it follows that the existing slicer elements (previously selected slicers) could be leveraged in the query, and we could preserve the cascade!


Unfortunately (for this use case anyways) Power BI leverages a visual cache to hold the values and further minimize required queries. Thus, only the first time a user expands the drop down is the query issued. Each time after that, the visual cache is leveraged and thus prevents the slicer selections from cascading. Perhaps in the future the engineering team will alter this behaviour and allow slicer cascades for this use case, but for now, just know that it doesn't work.

Ultimately, I believe the performance benefits, user experience improvements, and decreased backend queries provided by this feature are likely to outweigh any negative impact of things like cascading slicers, but as usual, its up to the developer to make those decisions!

## Conclusion
So that's it. "Apply All Slicers" is a new, easy to implement, feature in Power BI that helps developers improve performance and user experience, especially when dealing with Big Data.
