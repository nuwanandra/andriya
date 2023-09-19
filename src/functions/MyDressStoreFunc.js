import DeviceInfo from 'react-native-device-info';
import RNFS from 'react-native-fs';

export default class MyDressStoreFunc {
  RNFSDirPath = RNFS.DocumentDirectoryPath + '/MobileApp1'; //RNFS.DocumentDirectoryPath which is an internal storage directory that is only accessible by your app
  //RNFS.ExternalDirectoryPath
  //RNFS.DownloadDirectoryPath
  APIPath = 'https://apielifemobile1.azurewebsites.net/api';
  //APIPath = 'https://localhost:7189/api';

  Test() {
    // const dir = '/path/to/directory';
    // const dir2 = 'aaa/';
    // let combinedPath = dir + '/' + dir2.replace(/^\/+|\/+$/g, '');
    // console.log(combinedPath);
    // fetch(apiUrl)
    //   .then(response => {
    //     const data = response.json();
    //     const contentDisposition = response.headers.get('content-disposition');
    //     let filename = '';
    //     if (contentDisposition) {
    //       const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    //       const matches = filenameRegex.exec(contentDisposition);
    //       if (matches != null && matches[1]) {
    //         filename = matches[1].replace(/['"]/g, '');
    //       }
    //     }
    //     const filePath = dirPath + '/' + filename;
    //     console.log(filePath);
    //     return {filename, filePath, response, data};
    //   })
    //   .then(({filename, filePath, response, data}) => {
    //     return RNFS.writeFile(filePath, JSON.stringify(data), 'utf8');
    //   })
    //   .then(() => {
    //     console.log('File saved successfully');
    //   })
    //   .catch(error => {
    //     console.log('Error:', error);
    //   });
  }

  async fileExists(dirName, fileName) {
    let dirPath = this.RNFSDirPath + '/' + dirName.replace(/^\/+|\/+$/g, '');
    let filePath = dirPath + '/' + fileName;

    console.log(filePath);

    try {
      const exists = await RNFS.exists(filePath);
      if (exists) {
        console.log('File exists');
        return true;
      } else {
        console.log('File does not exist');
        return false;
      }
    } catch (error) {
      console.error('Error checking file existence:', error);
    }
  }

  async getDeviceUniqueID() {
    //UseLess. Each install Android generate new UniquID for Security Resons
    //if you need to track licencess ask to sign with gmail,facebook
    //Use gmail to save/retrive user data file from server if uninstalled.

    let uniqueId = await DeviceInfo.getUniqueId();

    //console.log(uniqueId);

    return uniqueId;
    //return 'pppp';

    //val = DeviceInfo.getUniqueId()._j;

    //return val;
    //dirPath = this.RNFSDirPath + '/Data/Devices';

    // RNFS.readDir(dirPath)
    //   .then(result => {
    //     if (result.length > 0) {
    //       //const {name, ext} = Path.parse(result[0].fileName);
    //       //console.log(result[0].name);
    //       deviceID = result[0].name.replace(/\.[^/.]+$/, ''); // const nameWithoutExtension = filename.replace(/\.[^/.]+$/, '');
    //       console.log(deviceID);
    //       return deviceID;
    //     } else {
    //       deviceID = DeviceInfo.getUniqueId()._j;
    //       console.log(`No files found in ${dirPath}`);
    //       console.log(deviceID);
    //       return deviceID;
    //     }
    //   })
    //   .catch(error => {
    //     console.log(`Error reading directory: ${error.message}`);
    //     deviceID = DeviceInfo.getUniqueId()._j;

    //     console.log(deviceID);
    //     return deviceID;
    //   });
  }

  //dirName='' will refer MobileApp1 folder. public function
  cleanDirectory = async dirName => {
    let dirPath = this.RNFSDirPath + '/' + dirName.replace(/^\/+|\/+$/g, '');

    console.log(dirPath);

    //clear cache
    await RNFS.unlink(RNFS.CachesDirectoryPath)
      .then(() => {
        console.log('RNFS cache cleared.');
      })
      .catch(error => {
        console.log('Failed to clear RNFS cache:', error);
      });

    await this.deleteFolderRecursive(dirPath);
  };

  //Private Function
  deleteFolderRecursive = async path => {
    if (await RNFS.exists(path)) {
      const stat = await RNFS.stat(path);
      if (stat.isDirectory()) {
        const files = await RNFS.readDir(path);
        for (const file of files) {
          const filePath = `${path}/${file.name}`;
          if (file.isDirectory()) {
            await this.deleteFolderRecursive(filePath);
          } else {
            await RNFS.unlink(filePath);
          }
        }
        await RNFS.unlink(path);
      } else {
        await RNFS.unlink(path);
      }
    }
  };

  async deleteFile(dirName, fileName) {
    let dirPath = this.RNFSDirPath + '/' + dirName.replace(/^\/+|\/+$/g, '');
    let filePath = dirPath + '/' + fileName;

    //clear cache
    await RNFS.unlink(RNFS.CachesDirectoryPath)
      .then(() => {
        console.log('RNFS cache cleared.');
      })
      .catch(error => {
        console.log('Failed to clear RNFS cache:', error);
      });

    await RNFS.unlink(filePath)
      .then(() => {
        console.log('File deleted');
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  async viewItemsInDirectory(dirName) {
    let dirPath = this.RNFSDirPath + '/' + dirName.replace(/^\/+|\/+$/g, '');

    console.log(dirPath);
    await RNFS.readDir(dirPath)
      .then(result => {
        // Loop through the array and log the name of each file
        result.forEach(file => {
          console.log(file.name, file.size);
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  async getJsonValueFromFile(dirName, fileName, key) {
    let dirPath = this.RNFSDirPath + '/' + dirName.replace(/^\/+|\/+$/g, '');
    let filePath = dirPath + '/' + fileName;
    let retVal = '';

    await RNFS.readFile(filePath, 'utf8')
      .then(contents => {
        let userOb = JSON.parse(contents);
        //console.log(userOb[key]);
        retVal = userOb[key];
      })
      .catch(error => {
        console.log(error.message);
        retVal = '';
      });

    return retVal;
  }

  async updateJsonValueInFile(dirName, fileName, key, value) {
    let dirPath = this.RNFSDirPath + '/' + dirName.replace(/^\/+|\/+$/g, '');
    let filePath = dirPath + '/' + fileName;

    // read the file content
    await RNFS.readFile(filePath)
      .then(content => {
        // parse the content as JSON
        const data = JSON.parse(content);
        // update the data

        if (Array.isArray(data[key])) {
          // Push a new element into the array
          data[key].push(value);
        } else {
          data[key] = value;
        }

        // write the updated data back to the file
        const updatedContent = JSON.stringify(data);
        console.log('updated:', updatedContent);

        return RNFS.writeFile(filePath, updatedContent, 'utf8');
      })
      .then(() => {
        console.log('JSON file updated successfully!');
      })
      .catch(error => {
        console.log('Error updating JSON file: ', error);
      });
  }

  async readJsonFileString_Storage(dirName, fileName) {
    let dirPath = this.RNFSDirPath + '/' + dirName.replace(/^\/+|\/+$/g, '');
    let filePath = dirPath + '/' + fileName;

    console.log(filePath);
    let retVal = '';

    await RNFS.readFile(filePath, 'utf8')
      .then(contents => {
        //let userOb = JSON.parse(contents);
        console.log(contents);
        retVal = contents;
      })
      .catch(error => {
        console.log(error.message);
        retVal = '';
      });

    return retVal;
  }

  async readImageArrayString_Storage(dirName, setFolderName, fileName) {
    let dirPath = this.RNFSDirPath + '/' + dirName.replace(/^\/+|\/+$/g, '');
    let filePath = dirPath + '/' + fileName;

    let retVal = '';

    await RNFS.readFile(filePath, 'utf8')
      .then(content => {
        const jStr = JSON.parse(content).imageData.find(
          item => item.folder === setFolderName,
        );

        retVal = jStr.images;
        //console.log(retVal);
      })
      .catch(error => {
        console.log(error.message);
        retVal = '';
      });

    return retVal;
  }

  async createDirectory(dirName) {
    let dirPath = this.RNFSDirPath + '/' + dirName.replace(/^\/+|\/+$/g, '');

    await RNFS.mkdir(dirPath, {
      NSURLIsExcludedFromBackupKey: true,
      intermediates: true,
    })
      .then(() => {
        console.log('Directory created at:', dirPath);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  //Can use 1.downloadFile || 2.writeContentFromAPI || 3.downloadLargeFile. Same Result.
  async downloadFile(dirName, saveFileName, apiUrlPart) {
    let dirPath = this.RNFSDirPath + '/' + dirName.replace(/^\/+|\/+$/g, '');
    let savePath = dirPath + '/' + saveFileName;

    //'https://apielifemobile1.azurewebsites.net/api/getDevice/deviceId001'
    let apiUrl = this.APIPath + '/' + apiUrlPart.replace(/^\/+|\/+$/g, '');

    //console.log('11111111111111111', apiUrl);

    //console.log(savePath);
    //console.log(apiUrl);

    await RNFS.downloadFile({
      fromUrl: apiUrl,
      toFile: savePath,
      overwrite: true,
    }).promise.then(() => {
      //setImagePath(`file://${downloadPathJson}`);
      console.log('Download Completed. ' + savePath);
    });

    return savePath;
  }

  //Use when API return content is jason and save file name "fileName" Inside jason content
  async writeContentFromAPI(dirName, saveFileName, apiUrlPart) {
    let dirPath = this.RNFSDirPath + '/' + dirName.replace(/^\/+|\/+$/g, '');
    let savePath = dirPath + '/' + saveFileName;

    //'https://apielifemobile1.azurewebsites.net/api/getDevice/deviceId001'
    let apiUrl = this.APIPath + '/' + apiUrlPart.replace(/^\/+|\/+$/g, '');
    //console.log('3333333333333' + apiUrl);

    await fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        RNFS.writeFile(
          saveFileName === '' ? dirPath + '/' + data.fileName : savePath,
          JSON.stringify(data),
          'utf8',
        )
          .then(() => {
            //console.log(JSON.stringify(data));

            console.log('Content saved successfully.');
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

  async sendDataToAPI(key, value) {
    //let dirPath = this.RNFSDirPath + '/' + dirName.replace(/^\/+|\/+$/g, '');
    //let savePath = dirPath + '/' + saveFileName;

    let apiUrl = this.APIPath + '/sendDataToAPI'; //Use Published API Url. debug Localhost calls not working POST.
    const dataExchangeOb = new DataExchangeClass(
      this.getDeviceUniqueID(),
      key,
      value,
    );
    //console.log(apiUrl);

    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataExchangeOb),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  //imageName= with extension
  getImageData(imageName, deviceId) {
    //deviceId001~set001~05~private.jpg, deviceId001~set001~04.jpg, deviceId001~profile~002.jpg

    const valArray = imageName.split('~').map(n => n.trim());
    const deviceIdModel = valArray[0].trim();
    const setNo = valArray[1].trim();

    let type = 'public';
    let folderPathStorage = '';
    let apiUrl = '';
    let filePathStorage = '';

    folderPathStorage =
      this.RNFSDirPath + '/Images/' + deviceIdModel + '/' + setNo;
    if (imageName.toLowerCase().includes('private')) {
      type = 'private';
    } else if (imageName.toLowerCase().includes('profile')) {
      type = 'profile';
      folderPathStorage = this.RNFSDirPath + '/' + deviceIdModel + '/profile';
    }

    apiUrl = this.APIPath + '/getImage/' + deviceId + '/' + imageName;
    filePathStorage = folderPathStorage + '/' + imageName;

    //download image if not exists
    // this.fileExists('/Images/' + deviceIdModel + '/' + setNo, imageName).then(
    //   content => {
    //     if (content == false) {
    //       console.log(content);
    //       this.createDirectory('/Images/' + deviceIdModel + '/' + setNo).then(
    //         this.downloadFile(
    //           '/Images/' + deviceIdModel + '/' + setNo,
    //           imageName,
    //           '/getImage/' + deviceId + '/' + imageName,
    //         ),
    //       );
    //     }
    //   },
    // );

    const imageDataOb = new ImageData(
      imageName,
      type,
      folderPathStorage,
      apiUrl,
      filePathStorage,
    );

    return imageDataOb;
  }

  async downloadImages(imageArrayStr, deviceId) {
    //apiUrl = this.APIPath + '/getImage/' + deviceId + '/' + imageName;

    await imageArrayStr.forEach(imageName => {
      const valArray = imageName.split('~').map(n => n.trim());
      const deviceIdModel = valArray[0].trim();
      const setNo = valArray[1].trim();

      const apiUrl = this.APIPath + '/getImage/' + deviceId + '/' + imageName;

      this.fileExists('/Images/' + deviceIdModel + '/' + setNo, imageName).then(
        content => {
          if (content == false) {
            //console.log(content);
            this.createDirectory('/Images/' + deviceIdModel + '/' + setNo).then(
              this.downloadFile(
                '/Images/' + deviceIdModel + '/' + setNo,
                imageName,
                '/getImage/' + deviceId + '/' + imageName,
              ),
            );
          }
        },
      );
    });
  }

  copyFileFromAssets = async (dirName, saveFileName) => {
    const assetFilePath = 'assets://' + saveFileName; // Replace with the path to your asset file
    //const destinationPath = RNFS.DocumentDirectoryPath + '/file.txt'; // Replace with the desired destination path

    let dirPath = this.RNFSDirPath + '/' + dirName.replace(/^\/+|\/+$/g, '');
    let destinationPath = dirPath + '/' + saveFileName;

    try {
      await RNFS.copyFileAssets(assetFilePath, destinationPath);
      console.log('File copied successfully!');
    } catch (error) {
      console.error('Error copying file:', error);
    }
  };
}

export class DataExchangeClass {
  constructor(deviceId, key, value) {
    this.deviceId = deviceId;
    this.key = key;
    this.value = value;
  }
}

export class ImageData {
  constructor(name, type, folderPathStorage, apiUrl, filePathStorage) {
    this.name = name;
    this.type = type;
    this.folderPathStorage = folderPathStorage;
    this.apiUrl = apiUrl;
    this.filePathStorage = filePathStorage;
  }
}
