cube(`CountOrders`, {
  refreshKey: {
    every: `5 minute`,
  },
  sql: `SELECT *, count(strftime('%Y-%m-%d', createdAt)) AS countOrder FROM 'order' where state='PaymentAuthorized' GROUP BY strftime('%Y-%m-%d', createdAt)`,

  measures: {
    countOrder: {
      sql: `countOrder`,
      type: `number`,
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
    },
    createdAt: {
      sql: `createdAt`,
      type: `time`,
    },
  },
  // refreshKey: {
  //   sql: `SELECT sum(subTotal) as sumSubTotal FROM 'order' where state='PaymentAuthorized' GROUP BY strftime('%Y-%m-%d', createdAt)`,
  // },
});
