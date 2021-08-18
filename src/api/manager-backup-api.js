import AxiosClient from "./axios-client";

const BackupAPI = {
  getAllBackup: () => {
    const url = "/db/all-versions";
    return AxiosClient.get(url);
  },
  requestBackup: () => {
    const url = "/db/backup";
    return AxiosClient.get(url);
  },
  restoreBackupVersion: (fileName) => {
    const url = `/db/restore?fileName=${fileName}`;
    return AxiosClient.post(url);
  },
  deleteBackup: (fileName) => {
    const url = `/db/delete-version?fileName=${fileName}`;
    return AxiosClient.delete(url);
  },
};
export const {
  getAllBackup,
  requestBackup,
  restoreBackupVersion,
  deleteBackup,
} = BackupAPI;
