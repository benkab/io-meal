import Item from './../imports/api/Item';

// Publish categories
Meteor.publish('items', function() {
  return Item.find({}, {sort: {createdAt: -1}});
});

// Methods
Meteor.methods({
   
  addItem(item) {
    const checkItem = Item.findOne({description: 
      { $regex: new RegExp("^" + item.description.toLowerCase(), "i") }
    });
    if(checkItem){
      return 'Existing';
    } else {
      Item.insert({
        description: item.description,
        comment: item.comment,
        category: item.category
      });  
    }
  },
  updateItem(item) {
    Item.update(item.id, {
      $set: {
        description: item.description,
        comment: item.comment,
        category: item.category
      }
    });
  },
  deleteItem(id) {
    Item.remove(id);
  }
});