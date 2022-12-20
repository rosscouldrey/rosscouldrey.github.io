---
#layout: single
title: vCore Pooling - Understanding Premium Capacity Licensing and Deployment
date: 2022-12-19
author: Ross Couldrey
comments: true
categories: PowerBI
tags: [PowerBI, Licensing]
author_profile: true
#classes: wide
toc: true
toc_label: "Sections"
toc_icon: "bars"
excerpt_separator: <!--more-->

---

Once upon a time, in the land of PowerBI Premium, if you purchased a P1 SKU, you deployed a P1 capacity.  If you bought a P2 SKU, you deployed a P2 capacity.  Life was simple then.  At least that's what I like to think.

<!--more-->

But what if you already owned a P1 capacity license, and you needed to scale up to a P2 sized capacity?  Well, in the imaginary simple world above where you can only buy licensing in the same distinct units as you can deploy capacities, then I suppose the answer would be;
1. Decomission your P1 capacity, 
2. return your P1 license, 
3. buy a P2 license, then 
4. deploy your P2 capacity.

That's a lot of work isn't it?  Seems completely unneccessary to me.  

In a cloud world, scaling should be easy.  We should be able move from a P1 capacity to a P2 capacity quickly and easily.  It should be a matter of simply procuring more licenses and then resizing our capacity shouldn't it?  

Well it turns out that's exactly what we can do...through the magic of something called a vCore Pool.  And this article is all about understanding how it works.  

This is the second article in my PowerBI licensing simplification series, and this time, we tackle Premium Capacities and vCore Pooling.  So here we go...

## Understanding vCore Pooling

I'm going to be honest with you here, most of the confusion I see around Premium Capacity licensing stems from a simple naming convention.  

The Premium Capacity SKU you purchase (P1/P2/P3/P4/P5) has the same name(s) as the SKU you deploy.  And this can be very misleading.  Because they aren't the same.  They are however directly related.

For the moment I want you to completely separate the process of purchasing from the process of deploying in your mind.  Consider this pattern instead;

1. you buy something (ie. Purchase a license), 
2. it sits on a shelf or in storage untill you need it (ie. vCore Pool), and then 
3. you use the item (ie. Deploy Capacity).

### The Building Block Analogy

I've had a lot of success explaining this concept to my customers and colleagues using the building block analogy.  What's that?  Well I'm glad you asked.

The Building Block Analogy works like this:

1. In my simple world, there are only 5 boxes of blocks that can be purchased.  Each box has a different number of blocks inside.
- Box 1: 8 blocks for $100
- Box 2: 16 blocks for $200
- Box 3: 32 blocks for $400
- Box 4: 64 blocks for $800
- Box 5: 128 blocks for $1,600

2. Also, there are only 5 types of towers that can be built with the blocks.
- Tower 1: 8 blocks high
- Tower 2: 16 blocks high
- Tower 3: 32 blocks high
- Tower 4: 64 blocks high
- Tower 5: 128 blocks high

3) You have 1 storage box to hold your blocks and you must open each box and place the pieces your storage box as soon as you buy it.

#### The scenario

We can imagine any number of scenarios (or permutations) of purchases and tower building, but lets start simple.

I go to the store and I purchase a single box of 8 blocks for $100.  The blocks go directly in my storage box and I have 8 available blocks to build a tower.

So what towers can I build?  Well, only 1.  Its 8 blocks high.  Remember there's only 5 possible towers.

If I want a bigger tower, what can I do?  Well obviously I need more block as my storage box is currently empty.  So I go to the store and I buy another box of 8 blocks for $100.  The blocks go directly into my storage box.  And now, I have 1 tower built, and 8 blocks unused in my storage box.

With unused blocks in my storage box, I can build again.  In fact I now have 2 options.
1. I could build another 8 block tower and have 2 towers, or
2. I could add another 8 blocks to my tower and have a single 16 block tower.

And lets say I take option 2 and build a 16 block tower. 

Lets pause for a second and mention pricing here as well.  I now have a 16 block tower which cost me $200 ($100 x 2)  But what if I had bought 1 box of 16 blocks in the first place instead of buying 2 boxes of 8 blocks? That would also have cost me $200.  The same happens with Premium Capacities.

#### Putting blocks back in the storage box

But what happens if I don't need my 16 block tower anymore?  

I could destroy it and put all 16 blocks back in my storage box, or I could choose to reduce the size of my tower to 8 blocks and put only 8 blocks back in my storage box.

In both cases, I'd have more blocks available to build new towers.  And notice that I don't need to go back to the store since I already own all of these blocks.

We can scale this analogy to various scenarios, but the key to remember is:

1. You buy blocks in predetermined quantities (of which there are currently 5,and they are multiples of 8), but they all accumulate in the storage box awaiting use.
2. You can construct towers of predefined sizes based on the blocks you have available in your storage box.  Currently there are 5 tower sizes available also in multiples of 8.
3. When you destory towers, the blocks simply go back into the storage box for reuse in another tower later.

So how does that map to PowerBI Premium Capacities?  I hope you can see it already....

vCores can be thought of as the bulding blocks.
The vCore pool is simply a storage bin that holds blocks you have purchased but are not currently in use in any tower constuction.
And the towers, they represent the Premium Capacities (available in 5 sizes).

Simple right?

### A "Real" Customer Example

Lets apply the pattern to an example customer Contoso who purchased the following SKUs from Microsoft;
1. 2x P1 SKU (8 vCores each, total of 16 vCores)
2. 1x P3 SKU (32 vCores)

So Contoso now has 48 vCores in their vCore pool which they can use to deploy Premium Capacities.

![vCore Pooling Picture](/assets/images/vCorePoolPic.png)

Now, with a vCore pool of 48 vCores, Contoso can deploy a number of different configurations of Premium Capacities.

In this example, they have deployed a single P1 capacity (which requires 8 vCores), and a single P2 capacity (which requires 16 vCores).  They have deployed 24 of their 48 vCores, and the pool has 24 remaining vCores with which Contoso can deploy more Premium Capacities, or simply use them to increase the size of existing capacities.

For example, with the remaining vCores Contoso could;

1. Scale up their P1 to a P2, by applying 8 more vCores from the pool
2. Scale up their P2 to a P3, by applying 16 more vCores from the pool.
3. Create a new P2 capacity, by applying 16 more vCores from the pool

And many many other possible permutations using those vCores.

## Conclusion

The simplest way to think of Premium Capacity licensing is using the building block analogy and the following pattern.

- You procure blocks (vCores) in predefined packages of 8.
- Blocks immediately go in your storage box (vCore Pool) until they are used to build a tower (Capacity).
- When towers (Capacities) are down-sized or destroyed (deleted), the blocks (vCores) simply go back in to the storage box (vCore Pool).
- You are free to build any permutation of towers (Capacities) that can construct utilizing the blocks (vCores) you have purchased with the following constraints:
1. You can only build towers (Capacities) in sizes of 8.
2. There are only 5 sizes that can be built; 8, 16, 32, 64, and 128

And finally, the cost should remain consistent.  No matter what permutation of purchases you make to create your vCore pool, the cost to deploy a given capacity should remain the same.

And that's basically all you need to know to understand how the licensing for Premium Capacities (P SKUs) works...well unless you want to talk about EM SKUs...but we'll leave that for another post.

## Resources

I could not create these wonderful solutions and blogs without the great work of others, so here's a list of resources utilized for this blog.

- [Managing Premium Gen2 Capacities](https://learn.microsoft.com/en-us/power-bi/enterprise/service-premium-capacity-manage-gen2)
- [Guy in a Cube - What is vCore Pooling?](https://guyinacube.com/2019/09/12/power-bi-premium-what-is-v-core-pooling/)
