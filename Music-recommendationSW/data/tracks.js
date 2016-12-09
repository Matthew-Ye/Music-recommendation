const mongoCollections = require("../config/mongoCollections");
const tracks = mongoCollections.tracks;


let exportedMethods = {
    getTrackById(id) {
        return tracks().then((trackCollection) => {
            console.log("hahhaID");
            return trackCollection.findOne({
                id: id
            }).then((track) => {
                if (!track) throw "Track not found";

                return track;
            });
        });
    },
    getTrackByInsertId(id) {
        return tracks().then((trackCollection) => {
            return trackCollection.findOne({
                _id: id
            }).then((track) => {
                if (!track) throw "Track not found";

                return track;
            });
        });
    },
    getSeveralTracks(num) {
        return tracks().then((trackCollection) => {
            return trackCollection.find({}).limit(num).toArray();
        });

    },
    getAllTracks() {
        return tracks().then((trackCollection) => {
            return trackCollection.find({}).toArray();
        });

    },
    addTrack(data) {
        return tracks().then((trackCollection) => {
            console.log("hahha");

            return trackCollection.insertOne(data).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getTrackByInsertId(newId);
            });
        });
    },
    addAllTracks(arr) {
        return tracks().then((trackCollection) => {
            return trackCollection.insertMany(arr);
            // .then((newInsertInformations) => {
            //     return newInsertInformations.insertedId;
            // }).then((newId) => {
            //     return this.getArtistById(newId);
            // });
        });
    }

}
module.exports = exportedMethods;