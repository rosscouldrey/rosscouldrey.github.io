---
#layout: single
title: Simple ways to enhance your reports - Part 2 - Filter Panes
date: 2023-01-08
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

In the second part of this multi-part blog series on simple tricks to increase the usability of your PowerBI reports, I'm going to show how to utilize filter panes to remove slicers from your canvas, freeing up valuable space and making your report feel a little more polished.

<!--more-->

If you missed part 1 of this series on using custom backgrounds, be sure to check it out here (INSERT LINK).

## Setup
For this demo I am using the Contoso Sales for PowerBI dataset that is available for download from Microsoft's site:
<a href = "https://www.microsoft.com/en-us/download/details.aspx?id=46801" class="btn btn--info"> Get the file </a>

But you can also use your own data or report and follow along with this series as none of the enhancements we'll be making to our reports are data dependent.

## How to enable users with more filter options while saving precious canvas space.

Ok so we've all been in this position; our users want to be able to slice (or filter) by a thousand different things (ok, maybe not a thousand, but it definitely feels that way when you're writing out the requirements!).  

The issue is obviously space.  

Our canvas is small, we only have so much real estate available for our visuals, and now our users want us to use up all that valuable space for slicers!!  

There's a few options that we can leverage to help in this scenario;

#### Use visuals for filters
This is the simplest and most obvious answer to the requirement.  Use the product as it was intended.  PowerBI enables cross filtering and highligthing of visuals, meaning by clicking on an element in one visual, we can filter or cross-highlight the other visuals on our page.m  By strategically creating visuals, we can ensure users have the ability to "slice and dice" on a wide variety of options.  This is often the best solution because it leverages the inbuilt product features and will minimize development effort.

But it doesnt fit every solution.  For one, you may need to filter on items that don't lend themselves well to a visual (for example product ID).  Or there may be just too many filter needs; and adding visuals solely to act as filters would be ill-advised as it will adversely affect performance.

So lets look at some other options.

#### Increase the canvas size.  
I generally dont recommend this, however when done properly it can be a good solution.  

Why don't I recommend it?  Because it can get out of control.  

As a developer we need to understand that EVERY visual we load will take time to load.  And the more visuals we have, the more time it will take our report to load.  This includes visuals that aren't even visible to the user if we've expanded our canvas size and added scroll bars.  So take caution if you use this approach to ensure the performance of your report is not impacted negatively.

#### Use the "dropdown" option for your slicers.
This is a very good solution, but it still takes up some space.  So while we can minimize the space the our slicers take using this option, we still need to dedicate space to slicer box, and with a lot of slicers, this can still take up a lot of space.

But there's another reason this is a good solution.  Performance.  In fact, whenever you're using slicers, opt for the dropdown option if possible.  Why?

The slicer needs to run a DAX query to return the values to display.  While its a simple query, its still a query.  And the more of these we have the more queries we'll need to issue.  So what's special about the dropdown format of a slicer?  It turns out it ONLY submits a query when the user selects it.  It doesn't need to know what options are available until a user asks to see them!

So by leveraging this option, we get some space back, but also increase performance.  Double Rainbow!

#### Use filter panes.
And now we get to the best solution in my opinion.  Filter Panes!  This solution achieves the desired result on both fronts; space and performance.

So how do we make it happen?  Bookmarks of course.

Here's the steps:

1. Create an image to use as your filter pane background and add it to your report.  I suggest using PowerPoint for this (see my previous blog on custom backgrounds)
2. OPTIONAL - create a blank image that you can use to blur out the rest of the report to make it more obvious the user is in the filter pane experience.
3. Place your required slicers on the filter pane that you created above.
4. Create a button that can be used to close the filter pane.
5. Open the Selection Pane and the Bookmarks pane
6. Create a new bookmark called "ShowFilters".  Ensure your filter pane image, your blurred image, the close button, and your slicers are visible.  Update the bookmark.
7. Create a new bookmark called "MainView".  Hide all the above elements and update the bookmark.
8. Create a button to show your filter pane.  I suggest using custom backgrounds and including an icon for a filter pane in your background. With this method, you simply create a blank button and place it on top of your filter icon.
9. Create actions to show bookmarks for your buttons.


And that's it.  You now have a beautiful report that's performant and provides extra functionality and capabilities for your users.

Give it a try with your next report!

## Resources

I could not create these wonderful solutions and blogs without the great work of others, so here's a list of resources utilized for this blog.

- [Guy in a Cube - 5 Ideas to take PowerBI reports to the NEXT LEVEL](https://www.youtube.com/watch?v=k9LGRfREuIk)
- [Create tooltips based on report pages](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-tooltips?tabs=powerbi-desktop)
- [Bookmarks in PowerBI](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks?tabs=powerbi-desktop)
- [Selection Pane in PowerBI](https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-report-display-settings?tabs=powerbi-desktop#page-view-settings)
- [Create tooltips based on report pages](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-tooltips?tabs=powerbi-desktop)