# base
FROM node:16

# shell
SHELL ["/bin/bash", "-c"]

# env
ENV TZ Asia/Tokyo
ENV LANG C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

# apt update
RUN apt update && \
    apt-get update -qq && \
    apt-get install -y autoconf sudo wget unzip curl vim bzip2 build-essential bison git tzdata cmake

# lib
RUN apt-get install -y \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 \
    libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 \
    libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 \
    libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 \
    libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 \
    libxcb1 libxcomposite1 libxcursor1 libxdamage1 \
    libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 \
    libxss1 libxtst6 ca-certificates fonts-liberation \
    libappindicator1 libnss3 libdrm-dev libdrm2 \
    libgbm-dev libgbm1 libasound2 libasound2-dev libxshmfence1 libxshmfence-dev && \
    apt-get clean && \
    rm -rf /var/cache/apt

# ユーザーを作成
RUN useradd -m app
RUN echo 'app:ampassword' |chpasswd
RUN echo "app ALL=NOPASSWD: ALL" >> /etc/sudoers
USER app

# ホームディレクトリ及び作業ディレクトリ設定
ENV HOME /home/app
RUN mkdir -p $HOME/backend
WORKDIR /home/app/backend
