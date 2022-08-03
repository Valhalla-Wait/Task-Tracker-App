# Учебный репозиторий LAD_Interships_2022

# Task-tracker

## Группа №1

- Широков Алексей (maintainer)
- Сергей Семенов (developer)
- Александр Белов (developer)
- Денис Чиликин (developer)
- Михайл Зайцев (developer)

## Необходимые расширения для разработки VS-code

- [ESLint]
- [Prettier]

### Установка зависимостей

```bash
npm i
npm run prepare
```

### Запуск приложения в режиме разработки (development - режим у webpack)

```bash
npm run dev
```

### Сборка приложения в папку build (production - режим у webpack)

```bash
npm run build
```

### Запуск собранного приложения (production - режим у webpack)

```bash
npm run prod
```

## Контуры с развернутыми репликами приложения

- [Development]
- [Production]

## GIT-FLOW

Разработку ведем по [git-flow]. При создании merge-request в качестве target ветки выбираем ветку dev и отправляем merge-request.

[git-flow]: https://www.atlassian.com/ru/git/tutorials/comparing-workflows/gitflow-workflow#:~:text=Git%2Dflow%20%E2%80%94%20%D0%B0%D0%BB%D1%8C%D1%82%D0%B5%D1%80%D0%BD%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%B0%D1%8F%20%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D1%8C%20%D0%B2%D0%B5%D1%82%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F,%D0%92%D0%B8%D0%BD%D1%81%D0%B5%D0%BD%D1%82%D0%BE%D0%BC%20%D0%94%D1%80%D0%B8%D1%81%D1%81%D0%B5%D0%BD%D0%BE%D0%BC%20%D0%BD%D0%B0%20%D1%81%D0%B0%D0%B9%D1%82%D0%B5%20nvie.
[development]: https://lad-intersips-2022-group-1-git-dev-ukonsas28.vercel.app/
[production]: https://lad-intersips-2022-group-1.vercel.app/
[eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
