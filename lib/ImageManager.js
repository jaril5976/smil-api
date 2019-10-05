//LIB IMPORTS
const FileSystem = require('lib/FileStorage');
const path = require('path');
const guid = require('./Guid');
const db = require('server/models/index.js');

//CLASS IMAGEMANAGER
class ImageManager{

    //SAVE FUNCTION
	async save(file){
		var fs = new FileSystem;
        const ext = path.extname(file);
		if((ext != '.jpg') && (ext != '.jpeg') && (ext != '.png')){
            throw new Error("invalid file")
        }
        const hash = guid();
        const imageName = hash + ext;
        var URL = await fs.save(file,imageName);
        await this.saveInDb(URL,imageName, 'ORIGINAL');
        return URL;
    }

    //SAVE IN DB FUNCTION
    async saveInDb(url,imageName,size){
        const __record = await db.image.create({
            name:imageName,
            url:url,
            size:size
        })
    }
}
module.exports = ImageManager;