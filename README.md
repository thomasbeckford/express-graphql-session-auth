# express-graphql

Basic express GraphQL setup with mock data for testing graphql queries and mutations

Run development enviroment using yarn

```
NODEJS
EXPRESS
BABEL
SEQUELIZE
EXPRESS-GRAPHQL
GRAPHQL-TOOLS
PRETTIER
ESLINT
NVM
```

```
1. yarn
2. yarn dev
3. navigate: http://localhost:4000

```

```
Para que usamos .nvmrc ?
 Para poder decirle a NODE, con que version queremos correr el server.
 En este caso, estamos usando la v12.16.2, porque es la last stable version.

```

```
Para que usamos .babelrc ?
Para tener la capacidad de usar algunas funciones de JavaScript que todavia no estan en NODEJS.
```

```
Para que usamos .eslintrc ?
El linter busca los errores en el codigo, mas alla de que pueda dar un formato, se caracteriza por encontrar errores.

```

```
Para que usamos .prettierrc ?
Es la manera de darle "estilo" al codigo, para que podamos tener todo nuestro codigo utilizando el mismo formato.

```

```
GraphQL
```

`Example mutation`

`````mutation{
  createUser(input:{
    first_name: "Thomas",
    last_name: "Beckford"
    phone: "114265796"
  })
  {
    first_name
    last_name
    preferred_name
    phone
  }
}````
`````
