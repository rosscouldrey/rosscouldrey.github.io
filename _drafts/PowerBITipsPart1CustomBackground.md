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
In this multi-part blog series I'm going to walk through some of my favourite quick and simple tricks that can help you increase the usability of your PowerBI reports without cluttering your canvas! 

My final sample file is available in my GitHub site for your reference.

<div style="text-align: center;">
<a href = "https://github.com/rosscouldrey/PBIDemos/blob/main/Report%20Design/NextLevelReport.pbix" class="btn btn--success">Get the Sample</a>
</div>

Special shout outs to:
- Chris Hamill at [Alluring Analytics](https://alluringbi.com/) where I got my background for this demo.
- Adam Saxton at [Guy In a Cube](https://www.youtube.com/watch?v=k9LGRfREuIk)

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

So what's the result of this simple trick?  Check out the "before and after" of this report with 5 visuals on it!

![ReportBeforeAfter](\assets\images\Report%20Tips%20and%20Tricks\PBI_addedBG_example.png)

### How To

Ok so how do you go about making this happen?  In 3 simple steps really; 
- first design a background (or multiple as is usually the need) then 
- save your designs as PNGs and finally 
- import them as backgounds in PowerBI.

#### Design a Background

Obviously the first thing we need to do to employ this method is to have a background to use.  There's a number of ways you can achieve this. Personally, I like to use PowerPoint for this part, but you can use any design tool that will allow you to create great looking backgrounds.

Why Powerpoint?  A few key reasons:

1. It's a fairly standard productivity tool that almost everyone has access to.  As a result most people are familiar with this tool and have built a few slides over the years.
2. PowerPoint has a number of really helpful design tools to support your creativity:
    - Built in tools like shapes, icons, images (both local and online), themes, and alignment tools like gridlines, rulers and snap to grid.
    - A Slide Master to help duplication of core concepts like headers, footers, logos, etc.  [Explore Slide Master](https://support.microsoft.com/en-us/office/what-is-a-slide-master-b9abb2a0-7aef-4257-a14e-4329c904da54)
    - And my favourite feature; [design ideas](https://support.microsoft.com/en-us/office/video-get-design-ideas-for-slides-6f0ec776-cc58-4d0c-baab-051ba837b7a0).
3. Usually companies already have branded PowerPoint presentations that can be re-used for these backgrounds (or changed slightly to fit the need) resulting in great results with limited effort.
4. And finally you can find a lot of pre-existing examples and templates to get you started.  Check out the stuff at [AlluringBI](https://alluringbi.com/gallery/) or [PowerBI.tips](https://powerbi.tips/tools/scrims/) for example.

#### Save your design as a PNG (or JPG or other type)
PowerBI will allow you to import pretty much any image filetype, but I tend to stick to PNG for simplicity.  If you want to use JPG, or SVG, or TIFF, or other, you're free to do so.

In PowerPoint, simply select File > Save a Copy and then change the type to PNG.  When you click "Save" it will prompt you if you'd like to save all slide, or just the current one.  If you select "All Slides" it will create a folder and save each slide as a seperate image.  This is very handy to create a bunch of backgounds at a time.  You can also select "Just This One" which will create a single file with your background.

![ExportSlidesAsPNG](\assets\images\Report%20Tips%20and%20Tricks\SavePPTasPNG.png)

#### Add the background to your PowerBI Report

Now for the fun part ... Adding our background to our PowerBI file.

Simply click anywhere on your canvas (make sure its on the canvas and not on an existing visual).  Then in the format pane look for "Canvas background".  Select "Browse" and navigate to your saved image and click "Open".  Finally make sure your Transparency is set to 0% (or a higher value if you want to have a slightly transparent background).

Depending on your background design you can play around with the Image fit as well, but I find that "Normal" works quite well for a standard size canvas.

![How to Set Your Background](\assets\images\Report%20Tips%20and%20Tricks\BackgroundFormatOptions.png)

And that's it.  You're done.

Wanna see it in action?  Watch the video (link to Youtube Video).


## Conclusion
In this blog we looked at how to leverage PowerPoint to create custom backgrounds from your PowerBI reports.  Not only can you leverage some of PowerPoint's great features to help you, but you'll also save time for your users as your report will be more perfomant than if you build all the visuals inside PowerBI.

If you liked this blog, stay tuned for part 2 where I'll show you how to declutter your canvas by using filter panes to hold your slicers!

## Resources

Check out some of these great resources for more info, ideas, and templates!

- [Guy in a Cube - 5 Ideas to take PowerBI reports to the NEXT LEVEL](https://www.youtube.com/watch?v=k9LGRfREuIk)
- Use the [PowerBI Themes Gallery](https://community.powerbi.com/t5/Themes-Gallery/bd-p/ThemesGallery) for inspiration!
- Get some really great prebuilt backgrounds at AlluringBI! [AlluringBI Background Gallery](https://alluringbi.com/gallery/).
- [PowerBI.tips website](https://powerbi.tips/tools/scrims/) refers to custom backgrounds as scrims, and has a really great set of free and paid scrims for you to use.