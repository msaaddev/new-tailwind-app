![cover](img/cover.jpg)

<div align="center">
	<img src="https://img.shields.io/npm/v/new-tailwind-app?color=%2317BCB8" alt="version">
	<img src="https://img.shields.io/npm/l/new-tailwind-app?color=%2317BCB8" alt="license">
	<img src="https://img.shields.io/npm/dt/new-tailwind-app?color=%2317BCB8" alt="downloads">
</div>
<br>

<p align="center">
<strong>A zero-configuration cross-platform Node.js based CLI that generates boilerplate code for different tailwind web applications.</strong>
</p>

![separator](img/separate.jpeg)

- **Simple**: One command setup for all your Tailwind CSS web applications
- **Cross-platform**: Works on all available operating systems including Linux, macOS, and Windows
- **Support**: Five different web frameworks available with Tailwind CSS integration
- **Prettier**: Integrate prettier in Next.js, React.js, Gatsby.js & Vue3 with `--prettier` flag and then easily format the code with `npm run format`
- **MIT Licensed**: Free to use for personal and commercial use.


>Note: If you are on Windows, make sure to either use Command Prompt or Windows Powershell to run the CLI.

## 🚀 Supported Frameworks & Libraries

- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- [Gatsby.js](https://www.gatsbyjs.com/)
- [Vue3](https://v3.vuejs.org/)
- [Laravel](https://laravel.com/)

>You can also generate simple HTML, CSS, and JavaScript application with Tailwind integration using new-tailwind-app.

## 📦 Installation

```sh
# install the CLI globally
npm install -g new-tailwind-app

# use it with npx (recommended)
npx new-tailwind-app [app_name] --flag
```

## 🚀 Usage

Navigate to the folder you want to have your tailwind web app.

```sh
# help section
npx new-tailwind-app --help

# create a basic tailwind app
npx new-tailwind-app [app_name] --basic

# create a next.js tailwind app
npx new-tailwind-app [app_name] --next

# create a next.js tailwind app with prettier
npx new-tailwind-app [app_name] --next --prettier

# create a react.js tailwind app
npx new-tailwind-app [app_name] --react

# create a react.js tailwind app with prettier
npx new-tailwind-app [app_name] --react --prettier

# create a gatsby.js tailwind app
npx new-tailwind-app [app_name] --gatsby

# create a gatsby.js tailwind app with prettier
npx new-tailwind-app [app_name] --gatsby --prettier

# create a vue3 tailwind app
npx new-tailwind-app [app_name] --vue3

# create a vue3 tailwind app with prettier
npx new-tailwind-app [app_name] --vue3 --prettier

# create a laravel tailwind app
npx new-tailwind-app [app_name] --laravel

# if installed globally
new-tailwind-app [app_name] --flag

```

![help section](img/help.png)

## 🎩 Demo

```sh
# if you have installed globally
new-tailwind-app
```

![creates tailwind app](img/usage-1.gif)

```sh
# set up a basic tailwind app using npx
npx new-tailwind-app@latest [app_name] --basic
```

![creates tailwind app](img/usage-2.gif)

```sh
# sets up next.js tailwind app using npx
npx new-tailwind-app@latest [app_name] --react
```

![creates next.js tailwind app](img/usage-3.gif)

## 👨🏻‍💻 Contributing

Make sure you read the [contributing guidelines](https://github.com/msaaddev/new-tailwind-app/blob/master/contributing.md) before opening a PR. If you want something else to **integrate** with the CLI, open an issue in the repository and I will get back to it.

## 🔑 License & Conduct

- MIT © [Saad Irfan](https://github.com/msaaddev)
- [Code of Conduct](https://github.com/msaaddev/new-tailwind-app/blob/master/code-of-conduct.md)
