---
#layout: post
title: Demystifying PowerBI Licensing Part 1 - The Main Concepts
date: 2022-11-03
author: Ross Couldrey
comments: true
categories: [PowerBI]
tags: [PowerBI, Licensing]
#author_profile: true
#classes: wide
toc: true
toc_label: "Sections"
toc_icon: "bars"
excerpt_separator: <!--more-->
---

Why does licensing have to be so complicated?  When I am asked that question, I often respond with

**It's not "complicated" ... it's "flexible"!**
{: .notice--info .text-center}

And while this is a bit tongue in cheek, when you think about it, it's true.

<!--more-->

When you're dealing with millions of customers, each with their own usage patterns and needs, and you want to make your products available to each of them, at costs that appropriately represent their needs and usage ... Well, its really hard to NOT be "complicated".

So I'm going to try to simplify this as best as I can and hopefully in just about 10 minutes, you'll understand how to license your organization for PowerBI.

Before we dive in, please understand; this topic can expand quickly. So, to keep things simple for this blog the following topics are not covered:
- **Total Cost of Ownership**  The reader is encouraged to explore for themselves with [Total Economic Impact (TEI) study on PowerBI from Forrester Consulting](https://info.microsoft.com/ww-landing-Explore-the-Total-Economic-Impact-Of-Microsoft-Power-BI.html?Lcid=EN-US).
- **External users**  Much of the information in this blog applies to external users as well, however there are some differences and/or options for these users which are not covered in detail.  I will try to complete a blog on this in the future.
- **Premium Sizing** The differences between the sizes of Premium Capacities and/or how to determine the appropriate size capacity for your organization is out of scope for this blog.

Additionally, throughout this blog I'll be making a number of simplifications and skipping some intricacies for the sake of simplicity and understanding.  The purpose here is to provide you with enough knowledge about licensing to remove much of the confusion and allow you to further understand your unique requirements.  It is NOT intended to be an all-encompassing document about all the potential licensing scenarios and pitfalls that could exist.

With that said. Let us dive in....

## The Basics

There's a few concepts that I'd like you to grasp before we continue to be sure you have the right context to the rest of the discussion.

### Workspaces and Capacities

Every artifact (report, dataset, dataflow, etc.) exists inside a [Workspace](https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-new-workspaces).  An artifact cannot exist inside multiple workspaces at the same time, however artifacts can be duplicated, copied, or even moved across workspaces.  Additionally, artifacts (such as reports) can reference artifacts from other workspaces.

| Workspace Type | Description |
|-----------|------------|
| App Workspace | These are the suggested workspaces for sharing organizational content.|
| My Workspace | This is a personal workspace meant for development, testing, and possibly reports that you do not intend to share with the organization.  For reasons outside the scope of this blog, it is not recommended to use these workspaces to share content with your organization.|

Every workspace exists inside a single capacity.  A workspace cannot exist in multiple capacities at the same time.  Workspaces can be moved (quite easily) between the distinct types of capacities. There are currently 3 types of capacities;

|Capacity Type|Description| 
|-------------------|-----------|
|Shared Capacity  (or Pro Capacity) | This is the main capacity provided and managed by Microsoft.  Workspaces that are not assigned to either a Premium Per User (PPU) capacity or a Premium Capacity will reside in the Shared Capacity|
|![PremiumWorkspace](\assets\images\Premium_grey.png) Premium Capacity | This is an additional licensing cost (explained in more detail later) which provides improved features and performance. It is licensed in units of P (e.g. P1, P2, ... P5).  P simply stands for "Premium" (I think) and, is just 8 vCores (more on this later). Workspaces that are assigned to a Premium Capacity are denoted with a diamond next to their name. |
 ![PremiumPerUserWorkspace](\assets\images\Premium-Per-User_grey.png) Premium Per User (PPU) Capacity | In a sense you can think of this as a mix of the two above mentioned capacities.  This is a Microsoft managed capacity (i.e. Shared) that offers premium features and improved performance. It is licensed per user as we'll see shortly. Workspaces inside this capacity are denoted with a person imposed on the diamond.|

Let's finish this section with a diagram that helps illustrate these concepts.

![Workspaces in Capacities](\assets\images\WorkspacesCapacityRelation.png)

### PowerBI Desktop

PowerBI Desktop is the main authoring tool for PowerBI reports and datasets and it's completely free.  Download it from the Microsoft Store or the Microsoft Website, and as of September 2022, you can also get it through the Office installer!

[Download the MSI](https://www.microsoft.com/en-us/download/details.aspx?id=58494){: .btn .btn--success} [Get it from the Store](https://aka.ms/pbidesktopstore){: .btn .btn--info}

Anyone with a PC is free to download the Desktop client, ingest data, visualize data, and save their work...all without requiring licensing. This is the exact same product, with essentially all features and capabilities, that you would use if you were fully licensed.

**Note:** _there are some features that are restricted to premium licensing only, such as AI Insights, which will not be available in the downloaded client without licensing._
{: .notice--warning}

**PowerBI Desktop is not available for MacOS.**  _If you are a Mac user, you will either need the ability to run windows applications on your Mac (e.g. Parallels) or access to a PC through a virtualized environment like Citrix, or a Virtual Machine._
{: .notice--danger}

## Licensing
### PowerBI Service

The PowerBI service is the Software as a Service (SaaS) offering for PowerBI.  It is a web-based portal for sharing and collaboration of PowerBI reports and other artifacts.  The service also opens up other features and functionality of PowerBI including things like; Dataflows, Datamarts, XMLA endpoints, PowerBI Mobile, and much more.

While utilizing the PowerBI Desktop client is free, using the PowerBI Service generally comes with a licensing fee.  I find the easiest way to understand the licensing requirements is to split the concept of User Licensing from Capacity Licensing (although as you'll soon see the two work together to form a complete licensing picture).

#### User Licensing

Its important to note that **EVERY** user that interacts with the PowerBI service has a user license, its just that not all user licenses cost money... 

Each user will have one of three license types:

| License Type | Explanation | MSRP |
|------------|-----------|-----|
|[PowerBI Free](https://learn.microsoft.com/en-us/power-bi/fundamentals/service-features-license-type#free-per-user-license)| These licenses are granted automatically to users in your AAD who log in to PowerBI, either by going to the service themselves or by following a Share link they receive.   Free users are given a "My Workspace" where they can upload/publish reports for learning and testing purposes which only they can access, but in general, Free users cannot edit or publish reports for organizational use (i.e. into App Workspaces). | Free|
|[PowerBI Pro](https://learn.microsoft.com/en-us/power-bi/fundamentals/service-features-license-type#pro-license)| Pro users have the ability to publish reports to App Workspaces, edit reports, create dataflows and datamarts, etc.  Anyone in your organization that should be creating or editing content that will be shared with others will require a Pro (or PPU) license. | $9.99|
|[PowerBI Premium Per User (PPU)](https://learn.microsoft.com/en-us/power-bi/fundamentals/service-features-license-type#premium-per-user-ppu-license)| PPU users are similar to pro users in their capabilities (publish, share, edit, etc.), however they also have access to premium features which would including things like; AI functions, larger models, Enhanced Compute Engine, deployment pipelines and more.  Premium Per User licensed users can edit/publish/save/etc. all reports they have access to in **ANY** type of workspace. | $20 (or Pro plus a $10 addon)|

_Source: [PowerBI Pricing](https://powerbi.microsoft.com/en-us/pricing/)_

PowerBI Pro is also available through Microsoft 365 license bundles. 
{: .notice--success}

Don't have a user license but want to trial PowerBI to see what its all about?  Great news!  There's a [60 day free trial](https://learn.microsoft.com/en-us/power-bi/fundamentals/service-self-service-signup-for-power-bi#use-self-service-sign-up-to-get-an-individual-power-bi-license) available to all new users as well.

We will see shortly how the user license maps to what they can view in the service.  But first, let's talk about what PowerBI Premium can offer.

#### PowerBI Premium Licensing

There are two ways to license PowerBI premium, by user (PowerBI Premium Per User) and by Capacity.

##### PowerBI Premium Per User (PPU)
I've briefly mentioned PPU licensing in the User Licensing section above.  Effectively you can think of this as a "per user" way to get access to Premium features.  I see this used a lot in smaller organizations, or for development environments.  For the sole reason that in these cases, this can be a much more cost effective way of getting access to Premium features.  Just make sure you understand that only users with a PPU license will be able to access these artifacts.

Additionally, not all Premium features are supported in PPU.  For example, Multi-Geo support and the ability to leverage a PowerBI Report Server (on premise) are not covered with PPU licenses.

You can find more details on PPU [here](https://learn.microsoft.com/en-us/power-bi/enterprise/service-premium-per-user-faq#using-premium-per-user--ppu-)

##### PowerBI Premium Capacity
The easiest way to think of Premium Capacity licensing is in terms of dedicated compute.  In fact, in the first generation of Premium (Gen1) this is basically what it was.  However with the evolution of Premium into the Gen2 architecture, behind the scenes, this isn't really dedicated compute anymore.  For those eager beavers that love architecture and want to understand what I mean by this, please refer to [Microsoft's doc on Gen2 architecture](https://learn.microsoft.com/en-us/power-bi/enterprise/service-premium-architecture)

But back to licensing.  For licensing I think its easiest to just envision Premium as dedicated compute.  Meaning you are simply licensing hardware.

Microsoft offers varying levels of Premium capacity, starting at P1 and extending up to P5.  In fact, each P level is exactly twice the level before it.  

A P2 is twice the size of a P1, a P3 is twice the size of a P2, and so on.  You should be happy to know that pricing for these offering scales accordingly.  A P2 is twice as expensive as a P1, a P3 is twice as expensive as a P2, and so on.

For a full list of Capacity sizes and associated hardware equivalence see [Microsoft's Gen2 Capacity and SKUs chart](https://learn.microsoft.com/en-us/power-bi/enterprise/service-premium-gen2-what-is#capacities-and-skus).

To simplify the discussion I am providing a smaller but relevant table of sizes.

| Capacity Size | Total vCores (ie. CPU Power) | Max RAM per dataset (GB) | P1 Equivalence|
|----|----|----|----|
| P1 | 8 | 25 | 1 |
| P2 | 16 | 50 | 2 |
| P3 | 32 | 100 | 4 | 
| P4 | 64 | 200 | 8 |
| P5 | 128 | 400 | 16 |

_The importance of understanding the "P1 equivalence" will be apparent if you read my blog on vCore pooling._

**Note:** _I want to pause and mention that in fact there are also A SKUs and EM SKUs involved in a more detailed licensing discussion, however these are rare scenarios which are usually only relevant to Independent Software Vendors (ISVs) and so I have omitted tehm from this simplification_
{: .notice--warning}

##### Why would you need Premium?
So let's talk about why a customer would want Premium licensing.  I break this into 3 reasons:

**1. Performance**  
As mentioned, you can think of Premium as being dedicated hardware (even though its actually not).  As a result, you can expect to receive better performance of your reports and other artifacts using Premium than if you were to use the shared "pro" environment.  

**Caveat** _You must manage the capacity and ensure the resources are not being exhausted. If you exhaust your Premium resources you could in fact see WORSE performance than if you used the shared environment._
{: .notice--info}

**2. Features**  
Premium licensing provides access to features that are simply not available in the shared environment.  The list of these features continues to grow, but at time of writing, some of the more popular ones include
- Large Models (up to 400GB)
- More frequent dataset refresh rates (48x per day)
- Enhanced Compute Engine for Dataflows
- Datamarts
- Multi Geo support _(except Premium Per User)_
- Deployment Pipelines
- XMLA read/write endpoints.

Interested in the full list? [Complete list of Premium Features](https://learn.microsoft.com/en-us/power-bi/enterprise/service-premium-features)

**3. User Scale (Capacity Licensing only - excludes PPU)**
Although this could probably fall under a "feature", and I think it does in much of Microsoft's documentation, I generally break this into its own topic.  The concept here is that with a Premium Capacity, you can consume content with PowerBI Free licenses.

This means, if you want to scale your PowerBI environment to an entire organization (or even beyond using Business to Business, B2B, capabilities) you wont have to pay for individual user licenses.  Users that are not creating content, but simply consuming content, can do so using a PowerBI Free license.

Thus, with Premium Capacities, you can scale your "read only" users up without incurring further user licensing costs.

### Bringing it back together

Ok so let us recap.

1. All users have a license, albeit it may come without cost. (PowerBI Free)
2. Premium Capacities provide you with additional features, better performance, and user scalability.
3. Premium Per User licensing gives users access to Premium features without the need to procure capacity licenses.

So how do these licenses interact?  This is where the simplicity magic happens:

![LicensingMatrix](\assets\images\PBI%20LIcensing%20Matrix.png)

## Conclusion

So, what should you take from this?

1. Free users can only access content in Premium Capacities and they only get 'read' rights.
2. Premium Per User licenses allow access to any workspace, in any type of capacity.  It is a superset of the Pro license.
3. You must have at least a Pro licenses to publish or edit content in App Workspaces.
4. Premium Capacities, while not actually dedicated hardware, can be thought of in this manner for licensing purposes.

You should also know that most customer environments I deal with have a mix of these options, but a general pattern follows this;

1. A premium capacity (or multiple capacities) for key business analytic workloads and reports
2. PowerBI Pro licensing for all internal users that require edit/create rights.  I often find this is licensed through M365 bundles.
3. PowerBI Premium Per User licenses for a select set of PowerBI developers.  Usually the BI team, or similar, who are creating the business critical reports that will reside on the Premium Capacity in production.

For those that want to get a little deeper, check out my blog on [vCore pooling and PowerBI Premium capacities](https://rosscouldrey.github.io/powerbi/2022/12/19/vCore-Pooling.html).

## Resources

I could not create these wonderful solutions and blogs without the great work of others, so here's a list of resources utilized for this blog.

- [Licensing the Power BI service for users in your organization](https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-licensing-organization)
- [Power BI pricing](https://powerbi.microsoft.com/en-us/pricing/)
- [What is Power BI Premium Gen2?](https://learn.microsoft.com/en-us/power-bi/enterprise/service-premium-gen2-what-is)
