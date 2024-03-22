# UTN - Expense

> DESARROLLO

## Inicio

1. [Descripcion](#descripcion)
2. [Entorno](#entorno)
3. [Librerias](#librerias)
4. [Instalacion](#instalacion)
5. [Despliegue](#despliegue)

## Descripcion

UTN Expense es una aplicación web que te permite hacer un seguimiento y gestion de gastos personales de forma rápida y sencilla.

## Entorno

Este proyecto esta estructurado para trabajar con node, por consecuente es mandatorio:

- [Node](https://nodejs.org)

## Librerias

**Este proyecto esta desarrollado con TypeScript +5 como capa de JavaScript +ES6**

Para la instalacion de las mismas, utilizar NPM.

Incluidas en el paquete de produccion.

- [ChartJS](https://www.npmjs.com/package/chart.js)

No incluidas en el paquete de produccion pero necesarias para desarrollo.

- [TypeScript](https://www.npmjs.com/package/typescript)
- [Vite](https://www.npmjs.com/package/vite)

## Instalacion

**Clonar repositorio:**

```bash
git clone https://github.com/rdbustamante/utn-expense.git
```

**Agregar dependencias locales:**

Sobre el directorio raiz, utilizar el siguiente comando:

```bash
npm install
```

**Iniciar ambiente de desarrollo:**

Luego, utilizar el siguiente comando:

```bash
npm run start
```

**Para ver el entorno de desarrollo:**

[http://localhost:9090/](http://localhost:9090/)

## Despliegue

**Iniciar ambiente de produccion:**

Construir los paquetes con el comando:

```bash
npm run build
```

**Para ver el entorno de produccion:**

[https://utn-expense.vercel.app/](https://utn-expense.vercel.app/)
