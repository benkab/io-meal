import Category from './../imports/api/Category';

// Publish categories
Meteor.publish('categories', function() {
  return Category.find({}, {sort: {createdAt: -1}});
});

// Methods
Meteor.methods({
   
  addCategory(category) {
    const checkCategory = Category.findOne({description: 
      { $regex: new RegExp("^" + category.description.toLowerCase(), "i") }
    });
    if(checkCategory){
      return 'Existing';
    } else {
      Category.insert({
        description: category.description
      });  
    }
  },
  updateCategory(category) {
    Category.update(category.id, {
      $set: {
        description: category.description
      }
    });
  },
  deleteCategory(id) {
    Category.remove(id);
  }
});
