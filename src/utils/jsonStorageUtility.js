import RNFS from 'react-native-fs';
import DeviceInfo from 'react-native-device-info';

const getUniqueId = async () => {
  return await DeviceInfo.getUniqueId();
};

const getFilePath = async () => {
  const uniqueId = await getUniqueId();
  return `${RNFS.DocumentDirectoryPath}/counters_${uniqueId}.json`;
};

export const saveCounters = async counters => {
  try {
    const filePath = await getFilePath();
    await RNFS.writeFile(filePath, JSON.stringify(counters), 'utf8');
  } catch (error) {
    console.error('Error saving counters:', error);
  }
};

export const loadCounters = async () => {
  try {
    const filePath = await getFilePath();
    const fileExists = await RNFS.exists(filePath);
    if (!fileExists) {
      await RNFS.writeFile(filePath, JSON.stringify([]), 'utf8');
      return [];
    }
    const contents = await RNFS.readFile(filePath, 'utf8');
    return JSON.parse(contents);
  } catch (error) {
    console.error('Error loading counters:', error);
    return [];
  }
};
