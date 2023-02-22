---
#layout: single
title: Simple ways to enhance your reports - Part 3 - Help Menus
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

Welcome to the third installment of this multi-part blog series on simple tricks to increase the usability of your PowerBI reports. In this blog I'm going to demonstrate how to build custom help menus for your report which you can use to increase the end user experience!

<!--more-->

If you missed any of the earlier installments of this series you can find links to them at the end of this post.

## Setup
For this demo I am using the Contoso Sales for PowerBI dataset that is available for download from Microsoft's site:
<a href = "https://www.microsoft.com/en-us/download/details.aspx?id=46801" class="btn btn--info"> Get the file </a>

But you can also use your own data or report and follow along with this series as none of the enhancements we'll be making to our reports are data dependent.

## Help Menus

This tip is really about providing your users with more information;
- further details or explanations about what you're showing them with a visual, helping to tell a story
- how they should be interacting with your report (eg. "Right click and item to drill to details")
- definitions of measures in your visual/report
- or anything else you'd want to inform your users about

Once again we're focused on providing a maximum amount of information without having to spend valuable canvas space to do it.

There's actually a couple ways of accomplishing this which I'll cover here.

### Built in visual help buttons

If you aren't already aware, PowerBI has a built in functionality that allows you to add help options to visuals using the visual toolbar.  There's actually a lot of options for the toolbar, so be sure to check out all the other toggle switches as you're exploring this option.

There benefits of using this method are:
1. Built in, no development required
2. Consistent experience across all PowerBI reports

But there's also a few drawbacks to this method:
1. Little customization available
2. Only avialable on the visual itself
3. 

### Custom help displays

Obviously with custom options like this, you're looking at a little more development work. But I much prefer this method to the built-in method because it provides a lot of flexibility and customization which lets me really make the reports my own.

For this example I've located the help button in the center of the navigation bar in the bottom left of the report page. Once again this is an icon in my background image and I simply place a blank button on top of it to make it appear as a clickable object.

By clicking the question mark button, my user is presented with some speech bubbles that contain information or instructions about the report as demonstrated here;

![ReportHelpMenu](\assets\images\Report%20Tips%20and%20Tricks\PBI_HelpMenu.png){: .align-left}

The concept is simple, but how is it executed?  Once again its [bookmarks](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks?tabs=powerbi-desktop) to the rescue.  If you're reading these posts in order, you've probably started to notice a pattern by now.  

{% include image-gallery.html folder="/assets/images/Report%20Tips%20and%20Tricks/helpmenupics" %}

To implement this example, we've used a single blank picture which we size to cover the entire report page.  We set the transparency to 50% to generate the "faded" or "blurred" look of our report in the background.

Next, we create 3 new shapes in PowerBI (here we've used the callout shape) and add the text we want to these shapes.

Finally, we create a blank button and strech it over the entire report page.  We do this to enable the user to exit the help menu view by clicking anywhere on the canvas.

At this point I will also suggest you group your visuals in the selection pane.  This makes showing/hiding visuals much easier as you can do it at the group level instead of the individual visual level.  In this example I've created a few groups; 
- **HelpPage**: which contains all the visuals to display when a user cliks the help menu
- **FilterPane**: which contains all the visuals to display the filter pane
- **Key Influencers**: which contains all the visuals to display the key influencers popout

Now we need to create 2 bookmarks in our report;
- [x] The first one will display our main page (or the non-help view).  In this bookmark we'll simply hide all of the items we just added. 
- [x] The second one will display our help page.  This bookmark should make visible all of the items we just added (using the group, we can simply make our HelpPage group visible)

The final step is simply to create a blank button over top of our "help" button (which is part of our background) and connect that button to our Help Menu bookmark via the actions format option.

And **VOILA** we now have a handy help button that our users can interact with to get a more detailed understanding of our report.

## Resources

I could not create these wonderful solutions and blogs without the great work of others, so here's a list of resources utilized for this blog.

- [Guy in a Cube - 5 Ideas to take PowerBI reports to the NEXT LEVEL](https://www.youtube.com/watch?v=k9LGRfREuIk)
- [Create tooltips based on report pages](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-tooltips?tabs=powerbi-desktop)
- [Bookmarks in PowerBI](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks?tabs=powerbi-desktop)
- [Selection Pane in PowerBI](https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-report-display-settings?tabs=powerbi-desktop#page-view-settings)
- [Create tooltips based on report pages](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-tooltips?tabs=powerbi-desktop)