cube(`LineItems`, {
  refreshKey: {
    every: `5 minute`,
  },
  sql: `SELECT * FROM order_item`,
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
    lineId: {
      sql: `id`,
      type: `count`,
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
    },
    status: {
      sql: `status`,
      type: `string`,
    },
    createdAt: {
      sql: `createdAt`,
      type: `time`,
    },
  },
});
