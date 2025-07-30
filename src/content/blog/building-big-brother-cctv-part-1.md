---
title: 'Building Big Brother CCTV - Part 1'
description: 'CCTV for Kubernetes'
pubDate: 'July 30 2025'
heroImage: '/blog/images/big-brother-cctv.svg'
---

> Work in progress..

## Intro and Architecture of My Kubernetes-Powered Home CCTV
---
### What’s this about?

Whenever I go on trips, I always worry about what my cats are up to at home. So, I wanted a DIY CCTV setup that’s flexible, scalable, and something I can fully control. That’s how Big Brother CCTV was born — a home surveillance system built with microservices, containers, and Kubernetes that lets me keep an eye on my furry friends from anywhere.

### What gear am I using?

Here’s the setup:

- A ZimaBoard running Proxmox VE, with a Debian VM inside that hosts Kubernetes via k3s — this is my main cluster node.

- Plus, a Raspberry Pi also running k3s as a worker node to expand the cluster and keep things connected.

Everything lives inside a single Kubernetes namespace, and the services talk to each other over the cluster’s internal network — so it’s fast and secure.

### Why Kubernetes and microservices?

I picked Kubernetes because:

- It scales easily — add more nodes or cameras without hassle.

- It’s resilient — services restart if something crashes.

- Helm makes deploying and updating a breeze.

- Each piece runs isolated in containers, so it’s easier to maintain and upgrade.

The whole system is split into microservices, each doing its own job but working together to keep things smooth.

### How the system works
> Diagram Puma-Placeholder!
![Diagram Placeholder](/blog/images/puma-placeholder.jpg)

#### Main parts:

- Streaming service: a Docker container running an ffmpeg script that grabs the camera feed and streams it.

- MediaMTX server: handles RTSP/RTMP streams, taking in video from ffmpeg and serving it out to clients.

- Camera management API: cameras register themselves on startup by posting their config to a PostgreSQL DB.

- Web frontend: a simple interface to watch streams, manage cameras, and check system status.

#### Basic flow

- Cameras (or ffmpeg containers pretending to be cameras) start up and register via the API.

- ffmpeg grabs the video feed and sends it to MediaMTX.

- MediaMTX distributes streams to connected clients, like the frontend.

- I can check on my cats live and manage cameras from the web.

### Why build this?

Honestly, it started as a fun personal project to learn Kubernetes and microservices — but with a practical twist: keeping an eye on my cats while I’m away. The setup is pretty flexible and could be adapted for any home or small business CCTV needs.