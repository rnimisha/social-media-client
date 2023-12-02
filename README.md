# Connectify - Meet new people 🌐

A social media platform built with React.js to meet and connect with people. API for the project built with Nest.js available at the [repo here](https://github.com/rnimisha/social-media-api).

<div align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
  <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" alt="React Query">
  <img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white" alt="React Hook Form">
  <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" alt="Redux">
  <img src="https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white" alt="Chakra">
  <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101" alt="Socket.io">
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
</div>

## Features

- User can register and login to their account.
- User can manage their profile.
- User can follow or unfollow other profiles.
- User can post multiple pictures with caption in a post.
- User can check posts of their following in the feed.
- User can like and comment on posts.
- User can send messages to other profiles.

### Create an Account

![Authentication Demo](https://raw.githubusercontent.com/rnimisha/social-media-client/main/public/register.gif)

### Follow / Unfollow Users

![Follow Unfollow Demo](https://raw.githubusercontent.com/rnimisha/social-media-client/main/public/follow.gif)

### Feed with post of followed users

![Messaging Demo](https://raw.githubusercontent.com/rnimisha/social-media-client/main/public/feed.gif)

### Change proile image

![Messaging Demo](https://raw.githubusercontent.com/rnimisha/social-media-client/main/public/changeprofile.gif)

### Add new post

![Messaging Demo](https://raw.githubusercontent.com/rnimisha/social-media-client/main/public/addpost.gif)

### Send Messages

![Messaging Demo](https://raw.githubusercontent.com/rnimisha/social-media-client/main/public/chat.gif)

### Like and Comment Post

![Messaging Demo](https://raw.githubusercontent.com/rnimisha/social-media-client/main/public/comment.gif)

## Run Locally

### Prerequisite

- Docker
- Git

1. Clone the project

```bash
  git clone https://github.com/rnimisha/social-media-client.git
```

2. Go to the project directory

```bash
  cd social-media-client
```

3. Run the script to build image and run containers

```bash
  bash run.sh
```
