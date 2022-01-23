# Yarn install

[INICIO DA README](../README.md)

## Add key

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
```

## Add repository

```bash
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

## Update system

```bash
sudo apt-get update
```

## Install yarn

```bash
sudo apt-get install yarn
```

## Insert config in .zsh

```bash
nano ~/.zshrc

# export PATH="$HOME/.yarn/bin:$PATH"
```

```bash
sudo apt-get install yarn
```

## Check version

```bash
yarn -v
```
