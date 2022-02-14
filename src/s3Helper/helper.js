// yarn add base64-arraybuffer  aws-sdk react-native-fs

//
// android configure the react-native-fs
//

// android/app/build.gradle
// -- implementation project(':react-native-fs')

// android/settings.gradle
// -- include ':react-native-fs'
// -- project(':react-native-fs').projectDir = new File(settingsDir, '../node_modules/react-native-fs/android')

// add in info.plist for ios

// <key>NSPhotoLibraryUsageDescription</key>
// <string>Photo Library Access Warning</string>
// <key>NSCameraUsageDescription</key>
// <string>This app requires access to the camera.</string>

// add pod file
// pod 'RNFS', :path => '../node_modules/react-native-fs'

import fs from 'react-native-fs';
import {decode} from 'base64-arraybuffer';
let S3 = require('aws-sdk/clients/s3');

const BUCKET_NAME = 'waspha';
const IAM_USER_KEY = 'AKIA34G5OM2JG2Q76LK4';
const IAM_USER_SECRET = '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';

const generateRandomString = function (inputs, exits) {
  var length = 10;
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * @param {object}  
    input = {
      uri: path,
      fileType: type,
    };
 * @param {string}  
    folder = "folderName"
    
 */

export const uploadImageOnS3 = async (inputs, folder) => {
  var key = generateRandomString();

  const s3bucket = new S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME,
    signatureVersion: 'v4',
  });

  let contentType = inputs.fileType;
  let contentDeposition = folder + '/' + key + contentType.replace('/', '.');
  const fPath = inputs.uri;

  const base64 = await fs.readFile(fPath, 'base64');
  //console.log(base64);

  const arrayBuffer = decode(base64);
  //console.log(arrayBuffer);
  return new Promise(function (resolve, reject) {
    s3bucket.createBucket(() => {
      const params = {
        Bucket: BUCKET_NAME,
        Key: contentDeposition,
        Body: arrayBuffer,
        ContentDisposition: contentDeposition,
        ContentType: contentType,
        ACL: 'public-read',
      };

      s3bucket.upload(params, (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data.Location);
      });
    });
  });
};
