---
layout: post
title: "Using Fabric Policies to Control Item Creation"
date: 2026-11-03
author: Ross Couldrey
comments: true
categories: Fabric
tags: [Microsoft Fabric, Governance, Fabric Policies, Admin]
author_profile: true
toc: true
toc_label: "Sections"
toc_icon: "bars"
excerpt: "Explore one use case for Fabric policies (preview): controlling who can create which item types, and in which workspaces, with the Allow item creation policy."
excerpt_separator: <!--more-->
---

Here's a common problem I see in the customers I work with: they want to let their data engineering team create Lakehouses and Notebooks, but only let their analytics team create Warehouses. And they only want those restrictions in production.

That's the problem I'm going to look at in this post, using the **Allow item creation** policy. It's one use case for the broader **Fabric policies (preview)** governance framework, not the extent of what policies can do.

<!--more-->

## Introduction

Fabric policies provide a framework for centrally defining and enforcing governance rules in Fabric. Item creation is one application of that framework, with more capabilities to come as it evolves.

Rather than cover every policy capability, I'm going to focus on a practical example: controlling which Fabric items different teams can create in different workspaces.

The **Users can create Fabric items** tenant setting lets you enable creation for everyone, specific security groups, or no one. Workspace roles control who can create content in a workspace, but those controls alone don't let you choose a different set of item types for each team in each workspace.

That distinction matters if you want to roll Fabric out a workload at a time, or keep production workspaces more tightly controlled than sandboxes.

For this scenario, the **Allow item creation** policy adds another layer: rules for *who* can create *which* item types, and *where*. Let's walk through an example, including an important detail about what happens to everything you haven't explicitly allowed.

Fabric policies are in preview. Details, region availability and portal labels can change, so check the [Microsoft Learn documentation](https://learn.microsoft.com/en-us/fabric/governance/fabric-policies-overview) before you build a process around them.
{: .notice--warning}

## How Fabric policies work

Before we configure our example, let's separate the shared policy concepts from the details of the policy we're using.

| Concept | What it is |
|---|---|
| **Policy set** | A Fabric item that holds policies and their rules. You pick its scope (Tenant or Capacity) when you create it, and you can't change it later. |
| **Policy** | The action being governed. For this post: *Allow item creation* (Capacity scope). |
| **Rule** | A named set of conditions. Every condition in a rule must match (logical AND). |
| **Conditions** | The criteria evaluated by a rule. Available conditions depend on the policy type. For *Allow item creation*, these are item type, security group and workspace, using *Any of* / *None of*. |
| **Activation** | Nothing is enforced until an admin of that scope activates the policy set. Capacity admins activate capacity-scoped sets. |

For our item creation example, the evaluation flow is: a user tries to create an item, Fabric loads the active policy for the scope, and checks your rules. If a rule matches, the creation is allowed. In Advanced mode, an unmatched request is **blocked**. Every evaluation is recorded in the Fabric audit logs.

## The important part: item creation uses an allow list

The **Allow item creation** policy has three modes: **Allow all**, **Blocked**, and **Advanced**. The behaviour described here is specific to this policy.

The moment you switch to **Advanced** and add an Allow rule, the policy becomes an **allow list**. Anything that doesn't match a rule is blocked. If you add one rule that allows Notebooks and Lakehouses, *every other item type is blocked immediately* once you activate.

So the design approach is: **write a rule for everything you still want people to be able to do before you activate.**
{: .notice--warning}

Also remember that item creation needs *both* controls to allow it: the applicable Fabric item creation tenant/capacity setting **and** the active item creation policy. And a policy never grants permissions. A user still needs the right workspace role to create items.

## Step-by-step: configure the item creation use case

### 1. Enable the Policies tenant setting
A Fabric administrator enables it in the **OneLake catalog → Govern → Configurations**. Filter for **Policies**, set it to **Enabled**, then choose **The entire organization** or specific security groups (you can also add exceptions). *(Hold that thought on security groups, because we'll come back to it.)*

<!-- Before publishing: add a screenshot of the Policies tenant setting. -->

### 2. Create a home for your policies
As a best practice when implementing policies, I recommend creating a central location for your policy sets rather than creating them in various workspaces. Policy sets are just Fabric items, and having them spread across workspaces could make them more difficult to find and manage.

A dedicated workspace on a Fabric capacity (for example `fabric-governance`) gives you one place to manage them. This is my recommendation, not a requirement of the feature.

Keep that workspace locked down: anyone with write access can edit the rules, even if they can't activate them. Keep the audience small and put it on a stable capacity.

### 3. Create the policy set
In the workspace: **New item → Policy set**. Give it a name (no spaces) and choose **A capacity** as the scope. The new set is inactive.

<!-- Before publishing: add a screenshot of the new policy set dialog. -->

### 4. Configure the *Allow item creation* policy
Open the policy and switch from the default (Allow all) to **Advanced**. Now add rules.

Let's pretend we're the Contoso data team. We have two production workspaces, but we also want to leave our sandbox workspaces unrestricted by this policy. We'll first use a test capacity with workspaces that represent this setup, rather than experiment in production.

Here's what we want to achieve:

1. Only data engineers can create Notebooks, Pipelines and Lakehouses in production.
2. Only analytics authors can create Warehouses in production.
3. Everything outside production stays as it is today.

For this example, "production" means the two designated workspaces on the selected capacity. The policy doesn't apply to workspaces on other capacities.

| Rule | Security groups | Workspaces | Item types |
|---|---|---|---|
| **1. Engineers build in prod** | Any of: `sg-data-engineers` | Any of: prod workspaces | Any of: Notebook, Pipeline, Lakehouse |
| **2. Analytics authors build in prod** | Any of: `sg-analytics-authors` | Any of: prod workspaces | Any of: Warehouse |
| **3. Non-prod unchanged** | *(none)* | **None of:** prod workspaces | *(none)* |

Why it works: conditions *within* a rule are ANDed, and separate rules are alternatives. A condition you leave out matches everything. Rule 3 has no group or item-type condition, so it allows anyone to create anything *outside* the production workspaces.

That last rule is easy to overlook. Without it, our sandbox users would also be blocked unless their requests matched one of the first two rules. And in production, other item types covered by this policy are intentionally blocked. If your teams need more item types, add those rules before activating.

<!-- Before publishing: add a screenshot of the three configured rules. -->

### 5. Activate on a test capacity
Creating or saving a policy doesn't enforce anything, so we need to activate it before we can test enforcement. Have a capacity admin activate the policy set on the test capacity. Only one policy set can be active per scope. After activation, manage it from the **Policies center** in the OneLake catalog.

### 6. Test both the allowed and blocked paths
Use at least three test users: one in `sg-data-engineers` only, one in `sg-analytics-authors` only, and one in neither. Give each user the workspace role and other permissions needed to create the items being tested, and confirm the applicable item creation settings allow those operations. Otherwise, a failed creation attempt might just be a permissions issue rather than evidence that our policy works.

These are the expected results, not recorded test results:

| User | Workspace | Attempt | Expected policy outcome |
|---|---|---|---|
| Data engineer only | Production | Create a Lakehouse, Notebook or Pipeline | Allow each |
| Data engineer only | Production | Create a Warehouse | Block |
| Analytics author only | Production | Create a Warehouse | Allow |
| Analytics author only | Production | Create a Lakehouse, Notebook or Pipeline | Block each |
| Neither group | Production | Create any of the four item types above | Block each |
| Neither group | Sandbox | Create any of the four item types above | Allow each |

Repeat the production checks in both designated workspaces, and check the audit logs to confirm the policy outcomes. Also test a user in both groups: the rules are alternatives, so that user should be allowed to create all four item types in production.

The sandbox check is important. We're not just proving that we can block an operation; we're also checking that we haven't accidentally restricted everything else.

<!-- Before publishing: run these checks and add screenshots of an allowed creation, a blocked attempt and the corresponding audit records. Replace or supplement the expected results with observed results. -->

### 7. Monitor
Once the test results match the intended rules, repeat the configuration for your production capacity using the production workspace IDs, review it, and have a capacity admin activate it there. Don't assume the test workspace selections carry over.

Every evaluation (allow, block or default) is recorded in the Fabric audit logs, so you can see what's being blocked and tune the rules. Check these after rollout as well as during testing.

## Rolling Fabric out gradually

One practical benefit of the item creation policy is supporting a gradual rollout. Instead of enabling every item type everywhere, you can:

- Start with a small, approved set of item types for specific teams.
- Add item types and groups as your governance, cost and architecture reviews are completed.
- Keep production workspaces tighter than sandboxes.

It's the difference between *"Dataflow Gen2 is enabled"* and *"only the data engineering group can create Dataflow Gen2 in these workspaces."*

## Who's allowed to create policy sets?

Good question, because the answer might surprise you. A policy set is just a Fabric item, and any user with the right workspace role can create one once the Policies feature is available to them. It does nothing until an admin of that scope activates it. Still, you probably don't want everyone authoring policies (or stumbling across an editable policy set in a shared workspace).

My recommendation, in order of preference:

1. **Scope the Policies tenant setting to a security group** (for example `sg-fabric-policy-authors`) instead of the entire organization. That is the documented control for who can author policies.
2. **Keep policy sets in a locked-down workspace** with a small number of Contributors/Admins.
3. **Treat activation as the real gate.** Only Fabric admins (tenant scope) and capacity admins (capacity scope) can activate.
4. **Optional: use a policy to help keep your policies centralized!** If you want to follow the best practice I suggested earlier, consider using an item creation policy to limit where policy sets can be created, rather than allowing them in every workspace.

For example, suppose you want policy sets created only in `fabric-governance`, and only by members of `sg-fabric-policy-authors`. On the capacity containing that workspace, you could use these rules in Advanced mode:

| Rule | Security groups | Workspaces | Item types |
|---|---|---|---|
| **Policy authors create in the central workspace** | Any of: `sg-fabric-policy-authors` | Any of: `fabric-governance` | Any of: Policy set |
| **Other item creation unchanged** | *(none)* | *(none)* | **None of:** Policy set |

The first rule allows your policy authors to create policy sets in the central workspace. The second allows creation of other item types, subject to existing permissions and settings, without allowing policy sets elsewhere.

This is a standalone centralization example, not a pair of rules to add unchanged to our production example. Rules are alternatives: any other rule that allows Policy set creation would also allow it outside this restriction. For example, our earlier "Non-prod unchanged" rule would need an item-type condition of **None of: Policy set**. If you're combining centralization with other item restrictions, preserve those restrictions too, rather than adding the broad "Other item creation unchanged" rule above.

Remember that item creation policies are capacity-scoped. This example only controls workspaces on the capacity where it's activated. To extend centralization across other capacities, configure their active item creation policies to exclude Policy set creation from all Allow rules, since the central workspace isn't on those capacities. This controls new creation; it doesn't move existing policy sets. Test both the allowed central-workspace path and blocked creation elsewhere before rolling it out.

## Things to check before you start

- **It's a preview.** Check Microsoft Learn for current region support and limits.
- **Check the item types you plan to govern.** The current [item creation documentation](https://learn.microsoft.com/en-us/fabric/governance/fabric-policies-item-creation) includes Reports and Semantic models in an example. Before relying on enforcement for those or other item types, verify the current preview behaviour in your environment. This walkthrough focuses on Lakehouses, Notebooks, Pipelines and Warehouses.
- **Limits:** one active policy set per scope, and up to 50 rules per capacity-scoped policy.
- **Deleted or paused capacities:** policy editing and evaluation depend on the capacity being available. Evaluations fail closed, which means a deny. Host your policies on a stable capacity.
- **Treat policies like code.** Policy sets support the public REST APIs, Git integration and CI/CD. Activation, however, can't be done through Git.

## Conclusion

Controlling item creation is one way to put Fabric policies to work. In this example, the **Allow item creation** policy lets us govern creation by team, item type and workspace, rather than relying on a broad creation setting alone.

For this particular policy, the key takeaway is that **Advanced mode is an allow list**. It's not enough to add a rule for the one thing you want to restrict. You also need to account for everything you want to keep working.

Start on a test capacity, check both the allowed and blocked paths, and don't forget the sandbox! That last check is what tells us we've kept the restrictions where we intended them.

The broader Fabric policies framework goes beyond this example, with more capabilities to come. As you explore other policy types, check their supported scopes, conditions and enforcement behaviour rather than assuming they work exactly like item creation.

## Further Reading and Resources

- [What are Microsoft Fabric policies (preview)?](https://learn.microsoft.com/en-us/fabric/governance/fabric-policies-overview)
- [Get started with Fabric policies](https://learn.microsoft.com/en-us/fabric/governance/fabric-policies-get-started)
- [Allow item creation policy](https://learn.microsoft.com/en-us/fabric/governance/fabric-policies-item-creation)
- [Fabric Policies: Granular governance at scale (Preview) – Fabric Updates Blog](https://community.fabric.microsoft.com/blog/fbc_fabricupdatesblogs/fabric-policies-granular-governance-at-scale-preview/5368144)
