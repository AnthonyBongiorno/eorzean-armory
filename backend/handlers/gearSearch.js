const XIVAPI = require('@xivapi/js');
const xiv = new XIVAPI();

const searchItems = async () => {
  try {

    const items = await xiv.search({
      indexes: ['item'],
      body: {
        query: {
          bool: {
            must: [
                { term: { "ItemUICategoryTargetID": 34 } },
              { range: { "LevelItem": { gte: 630, lte: 665 } } }
            ]
          }
        },
        from: 0,
        size: 45,
        sort: [{ "LevelItem": "desc" }]
      }
    });

    console.log(items);
  } catch (error) {
    console.error('Error:', error);
  }
};

searchItems();