---
#layout: single
title: vCore Pooling - converting licenses to deployments
date: 2022-11-15
author: Ross Couldrey
comments: true
categories: PowerBI
tags: [PowerBI, Reports]
author_profile: true
#classes: wide
toc: true
toc_label: "Sections"
toc_icon: "bars"
excerpt_separator: <!--more-->

---

Once upon a time, in the land of PowerBI, when you bought a P1 SKU, you deployed a P1 sized capacity.  When you bought a P2 SKU, you deployed a P2 sized capacity.  Life was simple then.  Simple...but rigid.

<!--more-->

If you read my last blog on PowerBI licensing you'll know that I generally believe with licensing flexibility comes licensing complexity.

What if a customer already owned a P1 capacity license, but they needed to scale to a P2 sized capacity?  Well, if you can only buy licensing in the same distinct units as you can deploy capacities, then I suppose the answer would be;
1. Decomission your P1 capacity, 
2. return your P1 license, 
3. buy a P2 license, then 
4. deploy your P2 capacity"

I hope you can see the unnecessary amount of steps in this process.  In a cloud world, scaling should be easy.  Customer's should be able move from a P1 to a P2 quickly and easily, by simply procuring more licenses and then resizing their capacity right?  Well it turns out that's exactly what they can do...through something called a vCore Pool.

### Understanding vCore Pooling

In all honesty, most of the confusion I see around Premium Capacity licensing stems from a simple naming convention.  The SKU you purchase has the same name(s) as the SKU you deploy (eg. P1), but they aren't the same...they are however directly related.

For the moment I want you to completely separate the process of purchasing from the process of deploying.  Consider this pattern instead;

1. you buy something (ie. Purchase a license), 
2. it sits on a shelf or in storage untill you need it (ie. vCore Pool), and then 
3. you use the item (ie. Deploy Capacity).

We can tranlsate that pattern into an example customer Contoso who purchased the following SKUs from Microsoft;
1. 2x P1 SKU (8 vCores each, total of 16 vCores)
2. 1x P3 SKU (32 vCores)

So Contoso now has 48 vCores in their vCore pool which they can use to deploy Premium Capacities.

![vCore Pooling Picture](/assets/images/vCorePoolPic.png)

Now, with a vCore pool of 48 vCores, Contoso can deploy a number of different configurations of Premium Capacity.

In this example, they have deployed a single P1 capacity (which requires 8 vCores), and a single P2 capacity (which requires 16 vCores).  They have deployed 24 of their 48 vCores, and the pool has 24 remaining vCores with which Contoso can deploy more Premium Capacities, or simply use them to increase the size of existing capacities.

For example, with the remaining vCores Contoso could;

1. Scale up their P1 to a P2, by applying 8 more vCores from the pool
2. Scale up their P2 to a P3, by applying 16 more vCores from the pool.
3. Create a new P2 capacity, by applying 16 more vCores from the pool

Any many many other possible permutations of using those vCores.

Ok, so now we know how the vCore Pool works, the only missing piece is how to know how many vCores things "cost"
