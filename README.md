# Code Peer
Code Peer is a peer-to-peer, collaborative web code editor with built in video and voice conferencing. Users can create rooms to code with peers and chat with them as well. 

*Deployed application available at [https://codepeer.dev](http://codepeer.dev)*
***
## Table of Contents
  - [Motivation](#motivation)
  - [How to Run Locally](#how-to-run-locally)
  - [Technological Issues and Solutions](#technological-issues-and-solutions)
      - [Collaborative Editing](#collaborative-editing)
      - [Data Persistence](#data-persistence)
      - [Video Conferencing](#video-conferencing)
  - [Areas for Future Development and Improvement](#areas-for-future-development-and-improvement)
***
<a name="motivation"/>

## Motivation
Code Peer's development came as the result of need for an all-in-one solution for developers and their friends to quickly pair code. Other similar solutions such as [https://collabedit.com](https://collabedit.com) and Google Docs requires users to separately call each other. Code Peer offers both live collaboration and communication.
***
<a name="how-to-run-locally"><a/>

## How to Run Locally
**Front End**
```
1. cd into ./client from root of the directory
2. run npm install
3. run npm start to run the development server on http://localhost:3000
```
**Back End**
```
1. cd into ./server from root of the directory
2. npm install
3. run npm run dev to run the server on http://localhost:8080
```
***
<a name="technological-issues-and-solutionsy"/>

## Technological Issues and Solutions
<a name="collaborative-editing/>

1. Collaborative text editing: **Operational Transform (OT)** vs **Conflict-Free Replicated Data Types (CRDT)**
   1. Operational Transform
      - Requires a central server to host the document that acts as a "single source of truth."
      - Treats changes to the document as individual operations i.e. *insert, delete, etc.*
      - A record of operations is kept to evaluate concurrent operations. Concurrent operations are then transformed to adjust for prior adjustments to the document.
   2. Conflict Free Replicated Data Types
      1. Does not require a central server and can instead be implemented using peer-to-peer technology.
      2. Treats individual characters as globally unique items with unique identifiers. Operations on these items are then conflict-free.

*Code Peer utilizes CRDT technology to achieve its collaborative editing. Its peer-to-peer capabilities aligns with the application's vision of keeping server requirements minimal. CRDT is highly scalable as connections are made from client to client.*
<a name="data-persistence"/>

2. Data Persistence: **Traditional Database** vs. **In-Memory Data Store (Redis)**
    - Code Peer requires room information to be stored serverside for room validation. Information such as room ID, number of members, and chat message history is stored.
    - Throughput tests were conducted to accurately analyze response time variations between a relational database and a Redis data store. 
      - Tests indicated an 80% response time decrease when a Redis data store was used.
      - Additionally, the Redis data store provided near-constant response times as loads and data increased.

*Code Peer utilizes a Redis, in-memory data store as its data persistence layer. The data, by nature, expires 24 hours after its creation, thus making long-term persistence a non-issue. Additionally, the drastically lower response times aligns with Code Peer's emphasis on speed.*
<a name="video-conferencing"/>

3. Video Conferencing and Media Streaming: **Peer-to-peer** vs. **Media Servers**

*Code Peer utilizes peer-to-peer WebRTC technology as its medium for video conferencing. This aligns with the decision to use a peer-to-peer CRDT solution for collaborative editing.*

***
<a name="future"/>

## Areas for Future Development and Improvement
1. Add a feature that allows users to execute written code. Sites such as [https://leetcode.com](leetcode) and [https://replit.com/](replit) have such a feature.
2. Full functionality on mobile devices.
3. Add features allowing users to control individual stream volume.
