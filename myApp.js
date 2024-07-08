require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] }
});

// Create the Person model
const Person = mongoose.model('Person', personSchema);

// CRUD operations
const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Sushi']
  });

  person.save((err, data) => {
    if (err) return done(err); // Return error if saving failed
    done(null, data); // Pass back saved data if successful
  });
};


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err); // Return error if creation failed
    done(null, data); // Pass back created data if successful
  });
};


const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err); // Return error if query failed
    done(null, data); // Pass back query results if successful
  });
};


const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err); // Return error if query failed
    done(null, data); // Pass back query result if successful
  });
};


const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err); // Return error if query failed
    done(null, data); // Pass back query result if successful
  });
};


const findEditThenSave = (personId, done) => {
  // Find the person by _id
  Person.findById(personId, (err, person) => {
    if (err) return done(err); // Return error if query failed

    // Modify the person's favoriteFoods
    person.favoriteFoods.push("hamburger");

    // Save the updated person document
    person.save((err, updatedPerson) => {
      if (err) return done(err); // Return error if save failed
      done(null, updatedPerson); // Pass back updated person if successful
    });
  });
};


const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName }, // Search criteria
    { age: 20 }, // Update age to 20
    { new: true }, // Options to return the updated document
    (err, updatedPerson) => {
      if (err) return done(err); // Return error if update failed
      done(null, updatedPerson); // Pass back updated person if successful
    }
  );
};


const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return done(err); // Return error if deletion failed
    done(null, removedPerson); // Pass back removed person if successful
  });
};


const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err); // Return error if deletion failed
    done(null, result); // Pass back deletion result if successful
  });
};


const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return done(err); // Return error if query failed
      done(null, data); // Pass back query results if successful
    });
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
