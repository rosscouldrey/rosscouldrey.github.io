---
#layout: single
title: Fixing the workspace is in a different region error when setting up Git Integration in Fabric
date: 2023-07-06
author: Ross Couldrey
comments: true
categories: Fabric
tags: [Fabric, PowerBI]
author_profile: true
#classes: wide
toc: false
#toc_label: "Sections"
#toc_icon: "bars"
excerpt: "Resolving the error: This workspace is in a different region. Go to the workspace admin settings to enable cross-region connections."
excerpt_separator: <!--more-->

---
Resolving the error:

This workspace is in a different region. Go to the workspace admin settings to enable cross-region connections.
{: .notice--danger}


<!--more-->

The new [PowerBI Projects](https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-overview) feature (in Preview as of this writing) is an amazing new addition to the PowerBI suite, enabling collaboration and dev ops natively on top of PowerBI.  So naturally I wanted to try it out as soon as I could.

I have to say, for someone that doesn't have a devops background, the setup is very simple which I have to applaud the product team for.  That said, my experience didn't come without a few hiccups and in particular an error message that I couldn’t find any information on when I searched online.

So I decided to write a quick blog to help others that may come across this error as they start testing this feature.

Now you should know that there are 2 parts to setting up the integration.  The first part I'm simply going to refer to as "Git Integration". This is the process of saving your PBIX file as a PBIP (PowerBI Project), then using a tool like Visual Studio Code to initialize a Git repository, either locally or by leveraging an online tool like gitHub or Azure Dev Ops.

The second part, which I'll call Continuous Deployment, is where I really appreciate what the team has developed.  With a Fabric workspace you can connect it directly to a branch (likely 'main') in your git repository (At the time of writing only Azure Dev Ops is supported for Continuous Delivery).  This means that as you update your main branch by merging changes, they will be automatically deployed to your workspace.  Once you get this working, it's **AMAZING!**

However, the first time I attempted to connect my Fabric workspace with my Azure Dev Ops I got this error:

![ErrorMsg](/assets/images/FabricRegionError/ErrorMsg%20(Custom).png)

It turns out this error occurs when your Azure Dev Ops organization region is different from your Fabric Capacity region AND you don’t have the cross region tenant setting enabled.  This is documented on the Microsoft Learn site [here](https://learn.microsoft.com/en-us/fabric/admin/git-integration-admin-settings#enable-git-actions-on-workspaces-residing-in-other-geographical-locations)

I should note, the region selections for Azure Dev Ops do not align 1:1 with the regions selections for Microsoft Fabric, and so for this article I'll refer to them as "compatible regions".  To be "compatible" the regions must be in the same country.

On to our solution!  There are 3 fixes for this problem:

### 1. Enable the "cross-region connections" setting.

Currently, this is actually a tenant setting rather than a workspace setting and so you will need tenant administration rights to complete this task. 

![tenantsetting](/assets/images/FabricRegionError/TenantSetting%20(Custom).png)

However, I'm told that the product team is working on "delegation" feature which would make these types of settings available at the workspace level, so watch the Fabric updates and blogs for changes!

In the meantime, for those organizations that don't want to give this ability to everyone, consider limiting it using Azure Active Directory security groups.


### 2. Move your Azure Dev Ops organization to another region.

![ADOOrgSettingsPage](/assets/images/FabricRegionError/ADOOrgSettings.png){: .align-right}

Azure Dev Ops will default your Organization's region to your closest geography when you create it, however you have the opportunity to select it during the creation process if you choose.  Once created, you can find your organization region in the settings of your Azure Dev Ops organization as shown here.

If you need to change your Azure Dev Ops organization region, you have 2 choices.

First, you could move your existing Azure Dev Ops Organization to a new region
You can find more information on changing your Azure Dev Ops Region on [Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/change-organization-location?view=azure-devops).  There is a virtual agent available to assist you with this task.

I should note here that regional changes are not available for all regions, so this option may not be available for you depending on the region you need.  Applicable regions are documented at the above link.
{: .notice--warning}

![CreatingAnADOOrg](/assets/images/FabricRegionError/ADOChooseOrgRegion%20(Custom).png){: .align-left}
Alternately, you can create a new organization in the desired region.
When you create a new organization in Azure Dev Ops you can select the region in which you want your projects to be stored.  So another option might be to create a new Azure Dev Ops organization for your Fabric needs and put it in a compatible region.


### 3. Change the region of your Workspace

Once a Fabric Capcity is created, you are unable to change it's region.  Therefore, if you decide to move your workspace into a Fabric capacity in a region that is compatible with your Azure Dev Ops Organization, you have 2 options.

One option is t move your workspace to an existing Fabric Capacity.
If you already have a Fabric Capacity in a compatible region, you can move your workspace to this capacity using the Workspace Settings.

![ChangeYourFabricCapacity](/assets/images/FabricRegionError/FabricChangeCapacity%20(Custom).png)

However, in a scenario where you don't have an existing Fabric Capacity, you may be left with only 1 option.  Creating a new one.  When you create a Fabric capacity in Azure, you'll be asked which region to create it in.  Select a region that is compatible with your Azure Dev Ops region and then simply move your workspace to this new capacity using the Workspace Settings.
![CreateAFabricCapacity](/assets/images/FabricRegionError/FabricCreate%20(Custom).png)


**Note** <br> _As of writing there are some limitations in moving your workspace to a fabric capacity in a different region documented [here](https://learn.microsoft.com/en-us/fabric/admin/portal-workspaces).  Please review these._
{: .notice--info}


And that's it!  Now you hopefully have a fully functional Git Integration setup.  Enjoy the wonderful world of Data Ops.
