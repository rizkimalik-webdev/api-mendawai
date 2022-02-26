
<h3 align="center">Api-Mendawai</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> 🤖 restful api for mendawai app.
    <br> 
</p>


## 🎈 Usage <a name = "usage"></a>

To use the `npm`, type:

```
npm run start
```

using `yarn` this project run

```bash
yarn start
```


End with an example of getting some data out of the system or using it for a little demo.

knex migration:
```
yarn knex migrate:latest
yarn knex migrate:up/down file_name.js
```

knex seeds:
```
yarn knex seed:run
yarn knex seed:run --specific=file_name.js
```

## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


## ⛏️ Built Using <a name = "built_using"></a>

- [Node JS](https://praw.readthedocs.io/en/latest/) - Node Reddit API Wrapper
- [Express](https://www.heroku.com/) - Express hosting platform

## ✍️ Authors <a name = "authors"></a>

- [@malik](https://github.com/kylelobo) - Idea & Initial work

