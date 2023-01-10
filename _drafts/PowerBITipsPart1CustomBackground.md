---
#layout: single
title: Simple ways to enhance your reports - Part 1 - Custom Backgrounds
date: 2022-01-08
author: Ross Couldrey
comments: true
categories: PowerBI
tags: [PowerBI, Reports, Design]
author_profile: true
#classes: wide
toc: true
toc_label: "Sections"
toc_icon: "bars"
excerpt_separator: <!--more-->

---

Presenting useful data is as much art as it is science.  As an analyst we want our reports to be attractive, relevant, trustworthy and ultimately useful for all readers.
<!--more-->
In this multi-part blog series I'm going to walk through some quick and simple tricks that can help you increase the usability of your PowerBI reports without cluttering your canvas! 

My final sample file is available in my GitHub site for your reference.

<div style="text-align: center;">
<a href = "https://github.com/rosscouldrey/PBIDemos/blob/main/Report%20Design/NextLevelReport.pbix" class="btn btn--success">Get the Sample</a>
</div>

## Set Up
For this demo I am using the Contoso Sales for PowerBI dataset that is available for download from Microsoft's site:
<a href = "https://www.microsoft.com/en-us/download/details.aspx?id=46801" class="btn btn--info"> Get the file </a>

But you can also use your own data or report and follow along with this series as none of the enhancements we'll be making to our reports are data dependent.

I'm also leveraging the Microsoft Skateboard Store background developed by Miguel Myers and [available here](https://alluringanalytics.files.wordpress.com/2019/12/sales-sample-bg.pptx?force_download=true)

## Custom Backgrounds

Custom backgrounds is probably my favourite tip for beautifying your PowerBI reports.  Over the years, I've seen so many amazing reports that look like they've been formatted by a professional artist.  And when I first started with PowerBI, I tried to recreate some of these in PowerBI using the lines, shapes, and images options.  

A word to the wise here ... Don't try that.  

Not only can designing in PowerBI be quite difficult, but it can also cause performance issues with your report.  Have you ever opened a report to see a hundred spinning circles while visuals load?  This is because there's just too many visuals on that page and PowerBI cannot load them all in parallel.  And when I say "visual", I don't just mean charts and graphs.  A visual includes everything that needs to be rendered; shapes, lines, text boxes, buttons ... everything.

So the best way I've found of dealing with this is to create backgrounds outside of PowerBI, save them as .PNG or .JPG files and import them as a custom backgroud into your reports.  This has two main benefits:
1. A background is a single visual component.  You can have dozens of lines and shapes, etc in your background and they will all be loaded as a single item!  Performance Boost!
2. You can design your reports in a software program meant for design, instead of one meant for data visualization.

Personally, I use PowerPoint for this, and the handy [design ideas](https://support.microsoft.com/en-us/office/video-get-design-ideas-for-slides-6f0ec776-cc58-4d0c-baab-051ba837b7a0) feature to help me make quick and easy designs.  I also tend to leverage the [Slide Master](https://support.microsoft.com/en-us/office/what-is-a-slide-master-b9abb2a0-7aef-4257-a14e-4329c904da54) templates to make replicating and changing slides much more streamlined.

So what's the result of this simple trick?  Check out the "before and after" of this report with 5 visuals on it!

![ReportBeforeAfter](\assets\images\Report%20Tips%20and%20Tricks\PBI_addedBG_example.png)

### Video

Wanna see it in action?  Watch these videos.

<insert videos>

If you liked this blog, be sure to check out part 2 where I'll show you how to declutter your canvas using filter panes for your slicers!

## Resources

Check out some of these great resources for more info, ideas, and templates!

- [Guy in a Cube - 5 Ideas to take PowerBI reports to the NEXT LEVEL](https://www.youtube.com/watch?v=k9LGRfREuIk)
- Use the [PowerBI Themes Gallery](https://community.powerbi.com/t5/Themes-Gallery/bd-p/ThemesGallery) for inspiration!
- Get some really great prebuilt backgrounds at AlluringBI! [AlluringBI Background Gallery](https://alluringbi.com/gallery/).
- [PowerBI.tips website](https://powerbi.tips/tools/scrims/) refers to custom backgrounds as scrims, and has a really great set of free and paid scrims for you to use.