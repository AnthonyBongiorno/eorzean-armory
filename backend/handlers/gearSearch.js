const XIVAPI = require('@xivapi/js');
const xiv = new XIVAPI();

const searchItems = async (req, res) => {
  try {
    const { minLevelItem, maxLevelItem, itemUICategoryId } = req.query;

    // First search: Get items based on the specified criteria
    const query1 = {
      indexes: 'item',
      body: {
        query: {
          bool: {
            filter: [
              {
                range: {
                  'LevelItem': {
                    gte: minLevelItem,
                    lte: maxLevelItem
                  }
                }
              },
              {
                term: {
                  'ItemUICategory.ID': itemUICategoryId
                }
              }
            ]
          }
        },
        size: 45
      }
    };

    const results1 = await xiv.search(query1);

    // Extract the IDs of the items
    const itemIds = results1.Results.map(item => item.ID);

    // Second search: Get the items sorted by ClassJobCategory.ID
    const query2 = {
      indexes: 'item',
      body: {
        query: {
          bool: {
            filter: [
              {
                terms: {
                  'ID': itemIds
                }
              }
            ]
          }
        },
        sort: [
          {
            'ClassJobCategory.ID': 'asc'
          }
        ],
        size: 50
      }
    };

    const results2 = await xiv.search(query2);
    console.log(results2);

    res.json(results2); // Send the results as JSON response
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
  }
};
module.exports = { searchItems };