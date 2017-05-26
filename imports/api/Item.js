import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// Defining items table
const Item = new Mongo.Collection('items');

// Allow actions
Item.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

// Define the scheama
const ItemSchema = new SimpleSchema({
  description: {
    type: String,
    optional: true
  },
  category: {
    type: String,
    optional: true
  },
  comment: {
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
Item.attachSchema(ItemSchema);

// Export the collection
export default Item;
