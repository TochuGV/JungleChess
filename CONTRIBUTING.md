# Contributing Guide

This is a quick guide to contribute in Jungle Chess.

## Technologies

These are the dependencies required to start working:

- Git (Any version)
- NodeJS (Latest version)
- Microsoft SQL Server (Any version)
  - Create the server with SQL Server Authentication and set the user and password to anything, preferably to root and root

## Picking a ticket

In [Trello](https://trello.com/), any of the tickets in the **To do** column are ready to be picked. To use it, assign it to yourself and then move it to the **Doing** column, and when it's done it goes in the **Ready for testing** column.

The link for the **Trello Workspace** is in the [Official Jungle Chess Discord](https://discord.gg/bJbRaCrJ3x).

## Setting up

- Clone the repository with `git clone https://github.com/TochuGV/JungleChess.git` in your terminal
- Create **.env** file inside `/api` similar contents to the following example:
```
DB_USER=root
DB_PASSWORD=root
DB_SERVER=localhost
DB_NAME=JungleChess
```
- In `Microsoft SQL Server Management Studio` run the script in /database/script.sql to initialize the database
- Run `npm install` in `/api` and `/web` to install the required dependencies
- To run the project, execute in a terminal `npm run dev` inside `/api` and in another terminal inside `/web` in that order

## Making changes

- After choosing a ticket, always remember to pull the changes from the remote repository with `git pull` before making any changes and creating commits
- Create a branch based from `origin/main` named with the following syntax:
  - TicketNumber_ShortNameForTicket
    - For example: 26_CreateGameTable
  - *In Visual Studio Code, click on Source Control > Views and More Actions... > Branch > Create Branch*
- Then change the code!
- Once all the changes are done, create a commit using the following syntax:
  - TicketNumber - Short Description
  - Longer Description
    - For example: 26 - Create Game Table
    - Create the Game table in the Database
- When all commits are done, push your changes to the current branch, and go to the Repository in GitHub to create a Pull Request with a proper description and finally ask someone to approve your changes

## Extra information

For more information, go to the [Official Jungle Chess Discord](https://discord.gg/bJbRaCrJ3x)
