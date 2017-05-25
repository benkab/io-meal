import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// Defining categories table
const Category = new Mongo.Collection('categories');

// Allow actions
Category.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

// Define the scheama
const CategorySchema = new SimpleSchema({
  description: {
    type: String,
    optional: true
  },
  createdAt: {
  	type: Date,
  	optional: true,
  	autoValue: function() {
      if ( this.isInsert ) {
        return new Date;
      } 
    }
  },
  updatedAt: {
  	type: Date,
  	optional: true,
  	autoValue: function() {
      if ( this.isUpdate ) {
        return new Date;
      } 
    }
  }
});

// Attach the scheama
Category.attachSchema(CategorySchema);

// Export the collection
export default Category;
