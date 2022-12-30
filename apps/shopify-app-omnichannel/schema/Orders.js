cube(`Orders`, {
  refreshKey: {
    every: `5 minute`,
  },
  sql: `SELECT *, sum(subTotal) as sumSubTotal FROM 'order' where state='PaymentAuthorized' GROUP BY strftime('%Y-%m-%d', createdAt)`,
  // joins: {
  //   Users: {
  //     sql: `${CUBE}.user_id = ${Users}.id`,
  //     relationship: `belongsTo`
  //   },
  //   Products: {
  //     sql: `${CUBE}.product_id = ${Products}.id`,
  //     relationship: `belongsTo`
  //   }
  // },
  measures: {
    totalOrder: {
      sql: `subTotal`,
      type: `number`,
    },
    sumSubTotal: {
      sql: `sumSubTotal`,
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
