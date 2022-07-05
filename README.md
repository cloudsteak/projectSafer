# Project Safer

Backup the specified directories

## <a id="config"></a>Configuration

```json
{
  "sourceDir": [
    {
      "name": "MaxForLive",
      "path": "/Users/myUser/Music/Ableton/User Library/M4L",
      "type": 0
    },
    {
      "name": "Music Projects",
      "path": "/Users/myUser/Music/Ableton/Projects",
      "type": 1
    },
    {
      "name": "Development",
      "path": "/Users/myUser/Development",
      "type": 1
    }
  ],
  "destinationDir": "/Users/myUser/Library/CloudStorage/OneDrive-Personal/BackUp/ProjectSafer/",
  "configuration": {
    "logDir": "/Users/myUser/Desktop"
  }
}
```

- **sourceDir**: Here you can define multiple sources where you can configure the backup according to the follwowings
  - **name**: Backup entry name and sub directory name under backup destination directory. (and archive name, if it is a stand alone backup)
  - **path**: Path of the files and directories
  - **type**: Type of backup
    - **0**: Stand alone backup. Save only the specified directory content recursively
    - **1**: Parent backup. Backup all directories under the directory you specified in _path_ parameter. (This backup only the first level directories. Creates archive files for each any every first level directory. The first level directories are backed up recursively)
- **destinationDir**: Backup root directory
- **configuration**: Other global configurations
  - **logDir**: Path of log file (**ProjectSafer.log**). If it is an empty string the log is located beside the backup.js file.

## Usage

1. Clone solution with git

2. Navigate to solution directory

3. Install pakages

```bash
    npm install
```

4. Configure your backup elements according to [Configuration](#config) section.

5. Run backup

```bash
    npm start
```


## Others

If you have an axisting backup file, this will rename it to bak then create a new archive.

## Donation

If you feel this is a useful tool, please [Buy Me A Coffee](https://www.buymeacoffee.com/cloudsteak). 


## License

MIT

