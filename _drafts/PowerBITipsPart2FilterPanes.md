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

If you missed part 1 of this series on using custom backgrounds, be sure to check it out here.

## Setup
For this demo I am using the Contoso Sales for PowerBI dataset that is available for download from Microsoft's site:
<a href = "https://www.microsoft.com/en-us/download/details.aspx?id=46801" class="btn btn--info"> Get the file </a>

But you can also use your own data or report and follow along with this series as none of the enhancements we'll be making to our reports are data dependent.

## Filter Panes

To keep filters off the page


### 3. Help Menus

This tip is really about providing your users with more information about what you're showing them, or how they should be interacting with your report, or even the definition of measures in your report.

The idea here is that we provide a "help" button for users that will display information that is otherwise hidden from their site.

In this example the help button is located in the center of the navigation bar in the bottom left of the report page. By clicking the question mark button, the user is presented with some speech bubbles that contain information or instructions about the report;

![ReportHelpMenu](\assets\images\Report%20Tips%20and%20Tricks\PBI_HelpMenu.png){: .align-left}

The concept is simple, but how is it executed?  Using [bookmarks](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks?tabs=powerbi-desktop).  

{% include image-gallery.html folder="/assets/images/Report%20Tips%20and%20Tricks/helpmenupics" %}

To implement this example, we've used a single blank picture which we size to cover the entire report page.  We set the transparency to 50% to generate the "faded" look of our report in the background.

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

### 4. Custom Tooltips

Custom tooltips allow us to expand the information provided in a visual by creating a report page that will be used as the tooltip.  This provides almost endless possibilities to report developers to improve on out of the box visuals.  Provide your users with more information using custom tooltips.

### 5. Pop out visuals

Some visuals can stand on their own, almost like reports themselves; eg. Key Influencers, Q and A, or Decomposition Tree.
You can give these their own space by "popping" them into what appears to be their own window in the report.

## Resources

I could not create these wonderful solutions and blogs without the great work of others, so here's a list of resources utilized for this blog.

- [Guy in a Cube - 5 Ideas to take PowerBI reports to the NEXT LEVEL](https://www.youtube.com/watch?v=k9LGRfREuIk)
- [Create tooltips based on report pages](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-tooltips?tabs=powerbi-desktop)
- [Bookmarks in PowerBI](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks?tabs=powerbi-desktop)
- [Selection Pane in PowerBI](https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-report-display-settings?tabs=powerbi-desktop#page-view-settings)
- [Create tooltips based on report pages](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-tooltips?tabs=powerbi-desktop)