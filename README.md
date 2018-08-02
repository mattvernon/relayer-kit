![Dharma Relayer Kit](public/dharma_relayer_banner.png)

The Dharma Relayer Kit is the definitive starting point for building a business on top of [Dharma Protocol](https://dharma.io/). 
The Kit lets anyone become a crypto entrepreneur with the press of a button. No bank account required.

Features include:

-   :money_with_wings: Collect real cryptocurrency through relayer fees
-   :rocket: Deploy to Heroku instantly
-   :art: Define your own style with our unopinionated React components
-   :computer: Hack using the world's most accessible programming language: JavaScript

The Dharma Relayer Kit allows you &mdash; the entrepreneur &mdash; to focus on your business, and not the blockchain.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

# Table of Contents

-   [Getting Started](#getting-started)
    -   [Clone](#clone)
    -   [Dependencies](#dependencies)
    -   [Blockchain](#blockchain)
    -   [Backend](#backend)
    -   [Frontend](#frontend)
-   [Running on Kovan](#running-on-kovan)
    -   [Backend](#backend-1)
    -   [Frontend](#frontend-1)
-   [Deployment](#deployment)
    -   [Create a new Heroku app:](#create-a-new-heroku-app)
    -   [Set which network you want to deploy to:](#set-which-network-you-want-to-deploy-to)
    -   [Overwrite the app's files with your relayer kit:](#overwrite-the-apps-files-with-your-relayer-kit)
    -   [Open your new relayer on Heroku:](#open-your-new-relayer-on-heroku)
-   [FAQ](#faq)
    -   [What is Dharma?](#what-is-dharma)
    -   [What is a Dharma Relayer?](#what-is-a-dharma-relayer)
    -   [Why start a Dharma Relayer?](#why-start-a-dharma-relayer)
    -   [How does a Dharma Relayer generate revenue?](#how-does-a-dharma-relayer-generate-revenue)
    -   [What is the approval process for becoming a Dharma Relayer?](#what-is-the-approval-process-for-becoming-a-dharma-relayer)
    -   [What technical skills are required to operate a Dharma Relayer?](#what-technical-skills-are-required-to-operate-a-dharma-relayer)
    -   [Do I need to conform to any specific branding when launching a Dharma relayer?](#do-i-need-to-conform-to-any-specific-branding-when-launching-a-dharma-relayer)
-   [Troubleshooting](#troubleshooting)
    -   [I'm getting an error that blockchain failed to start](#blockchain-failed)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Getting Started

We made getting started fast, simple and fun.

## Clone

Clone the repo to your workstation:

```
git clone https://github.com/dharmaprotocol/relayer-starter-kit.git
```

## Dependencies

To run the project, you'll first need to install the dependencies:

```
yarn
```

## Blockchain

And launch a local blockchain via:

```
yarn blockchain
```

## Backend

And launch the server via:

```
yarn server
```

## Frontend

And launch the React frontend via:

```
yarn start
```

# Running on the Kovan Testnet

Kovan is a test blockchain (referred to as a "testnet") for Ethereum contracts. The Dharma team has deployed our contracts to
the Kovan testnet, so that we, and developers building on top of Dharma, can test our tools and 
products in a way that is similar to mainnet, but without using real tokens.

To get access to Kovan tokens for testing your relayer, please visit [https://wallet.dharma.io](https://wallet.dharma.io), 
and set your Metamask to Kovan mode. This will allow you to get Kovan test tokens for Dharma
contracts.

There is no need for running a local blockchain when developing against a testnet, so we skip
the step of running a blockchain here.

## Backend

We use an environment variable to allow the server to specify a different database for your
Kovan Loan Requests - since Loan Requests for one blockchain will not be valid for another. The environment variable we modify is `NETWORK=kovan` (and
likewise `NETWORK=mainnet` for mainnet.) An example of running this on your command line would be:

```
NEWORK=kovan yarn server
```

Note: If you are deploying your server to a hosted environment such as Heroku or AWS, you'll
want to set the environment variables there.

## Frontend

Similarly to how the backend server would be configured for Kovan or mainnet, we need to tell
our react app whether to communicate with our local blockchain or to use Metamask. We do this
by specifying an environment variable for our react app (`REACT_APP_NETWORK=kovan` or 
`REACT_APP_NETWORK=mainnet`). An example of running this on your command line would be:
                              
```
REACT_APP_NETWORK=kovan yarn start
```

# Deployment

Everything you need to deploy to Heroku is baked into this repo.

In your command line, make sure you're logged into heroku, and then enter the following commands:

## Create a new Heroku app

If you are logged into Heroku on your command line, you can simply run:

`heroku create`

Otherwise, follow the instructions Heroku provides for [creating a new Heroku app](https://devcenter.heroku.com/articles/creating-apps).

## Overwrite the app's files with your relayer kit

`git push -f heroku master`

## Open your new relayer on Heroku

`heroku open`

# FAQ

## What is Dharma?

Dharma is an open, permissionless protocol that enables anyone to engage in credit-based transactions on the Ethereum blockchain. Read more <a href="https://dharma.io/" target="_blank">here</a>.

## What is a Dharma Relayer?

A Relayer is a source of liquidity on the Dharma network. It connects borrowers with lenders.

You can think of it as a bulletin board where individuals connected on the Internet can post requests to borrow money.

## Why start a Dharma Relayer?

We imagine a world in which the majority of financial transactions occur on globally accessible blockchains.

In this new world, being a Relayer is akin to an early internet entrepreneur, providing a valuable service on the frontiers of the new economy.

## How does a Dharma Relayer generate revenue?

Relayers earn a fee everytime a loan is filled on their site. The fee is some percentage of the principal amount as determined by the Relayer. Once the loan has been recorded on the blockchain, the protocol transfers the fee to the Relayer's address.

## What is the approval process for becoming a Dharma Relayer?

There is no approval process for launching a Dharma Relayer. You can launch whenever you want. Dharma is **live** on the Ethereum mainnet today.

## What technical skills are required to operate a Dharma Relayer?

To build a Relayer, the only programming language necessary is JavaScript.

## Do I need to conform to any specific branding when launching a Dharma relayer?

In designing the Relayer Kit, we intentionally left out any opinionated branding so that you, the entrepreneur, can conceive of and implement your own brand.

We imagine there being many relayers &mdash; each differentiated by the market they serve and the brand they build.

# Troubleshooting

You can use this section to debug any problems you might run into while setting up your relayer.

## I'm getting an error that blockchain failed to start

In order to run a local blockchain (via `yarn blockchain`), we use a tool called [Ganache-CLI](https://github.com/trufflesuite/ganache-cli), and we boot it up with all 
of the Dharma Protocol contracts pre-installed.

This requires that we install Ganache-CLI first, which sometimes requires extra permissions
(depending on your computer's setup).

Note: There is no strict requirement to use our blockchain setup - if you like, you can do all of your
development against Kovan, where our contracts are deployed. The preconfigured local blockchain is
just for quicker development.

If you're having trouble with running the local blockchain, I would consult the Ganache-CLI setup
page (https://github.com/trufflesuite/ganache-cli) and try to get that running first, and then try running `yarn blockchain` in your relayer
project again.

If you're comfortable doing so, then to get around the permissions problem you might end up using your 
computer's "root" permissions to install Ganache-CLI, by running: 

`sudo npm install -g ganache-cli@6.1.3`.