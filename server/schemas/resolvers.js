const { Tech, Matchup } = require('../models');

const resolvers = {
  Query: {
    getAllTech: async () => {
      const allTech = await Tech.find({});

      if (!allTech) {
        throw new Error({ message: 'No technologies found' });
      }
      return allTech;
    },
    getAllMatchups: async () => {
      const allMatchups = await Matchup.find({});

      if (!allMatchups) {
        throw new Error({ message: 'No matchups found' });
      }
      return allMatchups;
    },
    getMatchup: async (parent, { _id }) => {
      const matchup = await Matchup.findOne({ _id: _id });

      if (!matchup) {
        throw new Error({ message: 'No matchup found by that id' });
      }

      return matchup;
    },

  },
  Mutation: {
    createMatchup: async (parent, { tech1, tech2 }) => {
      const matchup = await Matchup.create({ tech1, tech2 });

      return matchup
    },
    // createVote: async (parent, { _id, techNum }) => {
    //   const vote = await Matchup.findOneAndUpdate(
    //     { _id: _id },
    //     { $inc: { [`tech${techNum}_votes`]: 1 } },
    //     { new: true }
    //   );

    //   return vote;
    // },
    createVote: async (parent, { _id, techNum }) => {
      if (techNum === 1) {
        const vote = await Matchup.findOneAndUpdate(
          { _id: _id },
          { $inc: { tech1_votes: 1 } },
          { new: true }
        );
        return vote;

      } else {
        const vote = await Matchup.findOneAndUpdate(
          { _id: _id },
          { $inc: { tech2_votes: 1 } },
          { new: true }
        );
        return vote;
      }
    },
  }
};

module.exports = resolvers;
